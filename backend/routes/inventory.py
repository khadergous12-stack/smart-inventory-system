"""
routes/inventory.py — Inventory management endpoints.

GET    /items              → List items (paginated) — authenticated
POST   /items              → Add item (JSON or multipart/form-data) — admin only
PUT    /items/<item_id>    → Update item — admin only
DELETE /items/<item_id>    → Delete item — admin only
GET    /items/<item_id>    → Get single item — authenticated
POST   /items/<item_id>/image → Upload cover image — admin only
"""
import logging
import os
import uuid
from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
from models import item as item_model
from utils.decorators import token_required, admin_required, roles_required

logger = logging.getLogger(__name__)
inventory_bp = Blueprint("inventory", __name__, url_prefix="/items")

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif", "webp"}


# ── Helpers ───────────────────────────────────────────────────────────────────

def _allowed_file(filename: str) -> bool:
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def _parse_pagination() -> tuple[int, int]:
    try:
        page = max(1, int(request.args.get("page", 1)))
    except (TypeError, ValueError):
        page = 1
    try:
        limit = min(max(1, int(request.args.get("limit", 10))), 100)
    except (TypeError, ValueError):
        limit = 10
    return page, limit


def _validate_item_fields(data: dict) -> str | None:
    """Return an error message string, or None if valid."""
    name = (data.get("name") or "").strip()
    if not name:
        return "Item name must not be empty"
    quantity = data.get("quantity")
    if quantity is None:
        return "Quantity is required"
    try:
        qty = int(quantity)
    except (TypeError, ValueError):
        return "Quantity must be a numeric value"
    if qty < 0:
        return "Quantity must be non-negative"
    return None


def _save_image(file) -> str:
    """Save uploaded file and return the relative URL path."""
    upload_folder = current_app.config.get("UPLOAD_FOLDER", "uploads")
    os.makedirs(upload_folder, exist_ok=True)
    ext = file.filename.rsplit(".", 1)[1].lower()
    filename = f"{uuid.uuid4().hex}.{ext}"
    file.save(os.path.join(upload_folder, filename))
    return f"/uploads/{filename}"


# ── GET /items ────────────────────────────────────────────────────────────────

@inventory_bp.route("", methods=["GET"])
@token_required
def list_items(current_user):
    page, limit = _parse_pagination()
    items, total = item_model.find_all(page, limit)
    return jsonify({
        "items": items,
        "pagination": {
            "page": page,
            "limit": limit,
            "total": total,
            "pages": (total + limit - 1) // limit,
        },
    }), 200


# ── GET /items/<item_id> ──────────────────────────────────────────────────────

@inventory_bp.route("/<item_id>", methods=["GET"])
@token_required
def get_item(item_id, current_user):
    item = item_model.find_by_id(item_id)
    if not item:
        return jsonify({"error": "Item not found"}), 404
    return jsonify({"item": item}), 200


# ── POST /items ───────────────────────────────────────────────────────────────
# Accepts both:
#   • application/json  (no image)
#   • multipart/form-data (with optional image file field "image")

@inventory_bp.route("", methods=["POST"])
@roles_required("admin", "manager", "employee")
def add_item(current_user):
    # Multipart form-data (image upload)
    if request.content_type and "multipart/form-data" in request.content_type:
        data = request.form.to_dict()
        image_url = ""
        file = request.files.get("image")
        if file and file.filename and _allowed_file(file.filename):
            image_url = _save_image(file)
    else:
        data = request.get_json(silent=True) or {}
        image_url = (data.get("image_url") or "").strip()

    error = _validate_item_fields(data)
    if error:
        return jsonify({"error": error}), 400

    name = data["name"].strip()
    quantity = int(data["quantity"])
    description = (data.get("description") or "").strip()
    author = (data.get("author") or "").strip()

    item_id = item_model.insert_item(name, quantity, description, author, image_url)
    logger.info("Item added | id=%s name=%s qty=%d by user=%s", item_id, name, quantity, current_user["user_id"])
    return jsonify({"message": "Item added successfully", "item_id": item_id}), 201


# ── POST /items/<item_id>/image ───────────────────────────────────────────────

@inventory_bp.route("/<item_id>/image", methods=["POST"])
@roles_required("admin", "manager", "employee")
def upload_image(item_id, current_user):
    if not item_model.find_raw_by_id(item_id):
        return jsonify({"error": "Item not found"}), 404

    file = request.files.get("image")
    if not file or not file.filename:
        return jsonify({"error": "No image file provided"}), 400
    if not _allowed_file(file.filename):
        return jsonify({"error": "File type not allowed. Use png, jpg, jpeg, gif, or webp"}), 400

    image_url = _save_image(file)
    item_model.update_item(item_id, {"image_url": image_url})
    logger.info("Image uploaded | id=%s url=%s by user=%s", item_id, image_url, current_user["user_id"])
    return jsonify({"message": "Image uploaded", "image_url": image_url}), 200


# ── PUT /items/<item_id> ──────────────────────────────────────────────────────

@inventory_bp.route("/<item_id>", methods=["PUT"])
@roles_required("admin", "manager", "employee")
def update_item(item_id, current_user):
    if not item_model.find_raw_by_id(item_id):
        return jsonify({"error": "Item not found"}), 404

    # Multipart
    if request.content_type and "multipart/form-data" in request.content_type:
        data = request.form.to_dict()
        existing = item_model.find_by_id(item_id)
        image_url = existing.get("image_url", "") if existing else ""
        file = request.files.get("image")
        if file and file.filename and _allowed_file(file.filename):
            image_url = _save_image(file)
    else:
        data = request.get_json(silent=True) or {}
        existing = item_model.find_by_id(item_id)
        image_url = (data.get("image_url") or (existing.get("image_url", "") if existing else "")).strip()

    error = _validate_item_fields(data)
    if error:
        return jsonify({"error": error}), 400

    fields = {
        "name": data["name"].strip(),
        "quantity": int(data["quantity"]),
        "description": (data.get("description") or "").strip(),
        "author": (data.get("author") or "").strip(),
        "image_url": image_url,
    }
    updated = item_model.update_item(item_id, fields)
    if not updated:
        return jsonify({"error": "Update failed"}), 500

    logger.info("Item updated | id=%s by user=%s", item_id, current_user["user_id"])
    return jsonify({"message": "Item updated successfully"}), 200


# ── DELETE /items/<item_id> ───────────────────────────────────────────────────

@inventory_bp.route("/<item_id>", methods=["DELETE"])
@roles_required("admin", "manager", "employee")
def delete_item(item_id, current_user):
    if not item_model.find_raw_by_id(item_id):
        return jsonify({"error": "Item not found"}), 404

    deleted = item_model.delete_item(item_id)
    if not deleted:
        return jsonify({"error": "Delete failed"}), 500

    logger.info("Item deleted | id=%s by user=%s", item_id, current_user["user_id"])
    return jsonify({"message": "Item deleted successfully"}), 200
