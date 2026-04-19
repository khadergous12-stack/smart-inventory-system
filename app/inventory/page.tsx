"use client";

import React, { useState } from "react";
import { Plus, Search, Edit2, ArrowUpRight } from "lucide-react";

const inventoryItems = [
  { id: "PRD-001", name: "GMIT Record Book", category: "Record Books", qty: 2, price: "₹45.00", status: "LOW STOCK" },
  { id: "PRD-002", name: "GMIT Assignment", category: "Assignment Books", qty: 5, price: "₹45.00", status: "LOW STOCK" },
  { id: "PRD-045", name: "Engineering Drawing Kit", category: "Stationery", qty: 142, price: "₹250.00", status: "IN STOCK" },
  { id: "PRD-112", name: "A4 Copy Paper (Ream)", category: "Office Supplies", qty: 18, price: "₹200.00", status: "LOW STOCK" },
  { id: "PRD-123", name: "Lab Coat", category: "Equipment", qty: 85, price: "₹450.00", status: "IN STOCK" },
];

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Saved successfully! (API Integration coming soon)");
    setIsAddModalOpen(false);
    setEditingItem(null);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto relative z-10 px-8 py-6">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b border-brand-border">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
            <span>Stockline</span>
            <span className="text-slate-600">/</span>
            <span className="text-white font-medium text-gradient">Inventory</span>
          </div>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold tracking-tight">Inventory Details</h2>
            <div className="px-3 py-1 bg-slate-800/80 border border-slate-700/50 rounded-full text-xs font-semibold text-slate-300">
              {inventoryItems.length} items
            </div>
          </div>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="hidden sm:flex items-center gap-2 px-6 py-3 bg-gradient-primary rounded-lg text-white font-semibold text-sm btn-glow mt-4 sm:mt-0 transition-transform hover:scale-105 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          ADD INVENTORY
        </button>
      </header>

      {/* Inventory Table */}
      <div className="bg-brand-card border border-brand-border rounded-xl flex flex-col glow-hover mb-8 overflow-hidden border-gradient-top">
        <div className="p-6 border-b border-brand-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-brand-bg/20">
          <h3 className="text-lg font-semibold">Manage Inventory</h3>
          <div className="relative w-full sm:w-auto">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search items or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 flex-grow bg-[#080b14] border border-brand-border rounded-lg text-sm focus:outline-none focus:border-[#4a9eff] focus:ring-1 focus:ring-[#4a9eff] transition-all w-full sm:w-64"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-bg/40">
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-widest border-b border-brand-border">Product Details</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-widest border-b border-brand-border">SKU / ID</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-widest border-b border-brand-border">Category</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-widest border-b border-brand-border text-right">Price</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-widest border-b border-brand-border text-right">Stock Level</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-widest border-b border-brand-border text-center">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-widest border-b border-brand-border text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/50 text-sm">
              {inventoryItems.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.id.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
                <tr key={item.id} className="hover:bg-brand-bg/60 transition-colors group">
                  <td className="px-6 py-4 font-semibold text-slate-200">{item.name}</td>
                  <td className="px-6 py-4 font-mono text-slate-400 group-hover:text-[#4a9eff] transition-colors">{item.id}</td>
                  <td className="px-6 py-4 text-slate-400">
                    <span className="px-2.5 py-1 bg-slate-800 border border-slate-700 text-slate-300 rounded-md text-[11px] font-medium tracking-wide">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono font-medium text-right text-slate-300">{item.price}</td>
                  <td className="px-6 py-4 font-mono font-bold text-right text-white">{item.qty}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wide border ${
                      item.status === 'IN STOCK' 
                        ? 'bg-brand-success/10 text-brand-success border-brand-success/20' 
                        : 'bg-brand-danger/10 text-brand-danger border-brand-danger/20'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => setEditingItem(item.name)}
                        className="p-1.5 text-slate-400 hover:text-[#7c3aed] hover:bg-[#7c3aed]/10 rounded-lg transition-all border border-transparent hover:border-[#7c3aed]/30"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-brand-border bg-brand-bg/40 flex justify-between items-center text-xs text-slate-400 font-medium">
          <p>Showing 1 to {inventoryItems.length} of {inventoryItems.length} items</p>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 hover:text-white transition-colors disabled:opacity-50">Previous</button>
            <button className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 hover:text-white transition-colors disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>

      {/* Modal Components */}
      {(isAddModalOpen || editingItem) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="bg-brand-card border border-brand-border rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border-gradient-top">
            <div className="px-6 py-4 border-b border-brand-border flex justify-between items-center bg-brand-bg/60">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                {editingItem ? <Edit2 className="w-4 h-4 text-[#4a9eff]" /> : <Plus className="w-5 h-5 text-[#4a9eff]" />}
                {editingItem ? `Edit Item` : "Add New Inventory Item"}
              </h3>
              <button 
                onClick={() => { setIsAddModalOpen(false); setEditingItem(null); }}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Product Name</label>
                  <input 
                    type="text" 
                    defaultValue={editingItem ? editingItem : ""}
                    className="w-full px-4 py-2.5 bg-brand-bg border border-brand-border rounded-lg text-sm text-white focus:outline-none focus:border-[#4a9eff] focus:ring-1 focus:ring-[#4a9eff] transition-all"
                    placeholder="e.g. Lab Coat"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">SKU / ID</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2.5 bg-brand-bg border border-brand-border rounded-lg text-sm text-white focus:outline-none focus:border-[#4a9eff] focus:ring-1 focus:ring-[#4a9eff] transition-all font-mono"
                    placeholder="e.g. PRD-123"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Category</label>
                  <select className="w-full px-4 py-2.5 bg-brand-bg border border-brand-border rounded-lg text-sm text-white focus:outline-none focus:border-[#4a9eff] focus:ring-1 focus:ring-[#4a9eff] transition-all appearance-none cursor-pointer">
                    <option>Stationery</option>
                    <option>Books</option>
                    <option>Office Supplies</option>
                    <option>Equipment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Price (₹)</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2.5 bg-brand-bg border border-brand-border rounded-lg text-sm text-white focus:outline-none focus:border-[#4a9eff] focus:ring-1 focus:ring-[#4a9eff] transition-all font-mono"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Stock Level</label>
                  <input 
                    type="number" 
                    className="w-full px-4 py-2.5 bg-brand-bg border border-brand-border rounded-lg text-sm text-white focus:outline-none focus:border-[#4a9eff] focus:ring-1 focus:ring-[#4a9eff] transition-all font-mono"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => { setIsAddModalOpen(false); setEditingItem(null); }}
                  className="flex-1 px-4 py-2.5 border border-brand-border bg-slate-800/50 hover:bg-slate-800 text-white rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-gradient-primary text-white rounded-lg font-semibold btn-glow transition-transform hover:scale-[1.02] active:scale-95"
                >
                  {editingItem ? "Save Changes" : "Create Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
