"use client";

import React, { useState } from "react";
import { UserPlus, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data, error: apiError } = await auth.register(name, email, password, role);
      if (apiError || !data) throw new Error(apiError || "Registration failed.");
      router.push("/login");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-brand-bg overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#7c3aed]/6 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#4a9eff]/6 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative w-full max-w-[420px] mx-4">
        {/* Logo above card */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black tracking-tight text-gradient">Stockline</h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-medium mt-1">Smart Stock, Zero Chaos</p>
        </div>

        {/* Card */}
        <div className="bg-brand-card border border-brand-border rounded-2xl shadow-2xl p-8 border-gradient-top">
          {/* Icon + Title */}
          <div className="flex flex-col items-center mb-7">
            <div className="w-12 h-12 rounded-xl bg-brand-success/10 border border-brand-success/20 flex items-center justify-center mb-4">
              <UserPlus className="w-5 h-5 text-brand-success" />
            </div>
            <h2 className="text-xl font-bold text-white">Create an Account</h2>
            <p className="text-sm text-slate-400 mt-1">Join Stockline to manage inventory</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 px-4 py-3 bg-brand-danger/10 border border-brand-danger/20 rounded-xl text-sm text-brand-danger font-medium">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2" htmlFor="name">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#4a9eff] focus:ring-1 focus:ring-[#4a9eff] transition-all"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2" htmlFor="reg-email">
                Email Address
              </label>
              <input
                id="reg-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#4a9eff] focus:ring-1 focus:ring-[#4a9eff] transition-all"
                placeholder="john@example.com"
              />
            </div>

            <div className="relative">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2" htmlFor="role">
                Role
              </label>
              <select
                id="role"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-xl text-sm text-white focus:outline-none focus:border-[#4a9eff] focus:ring-1 focus:ring-[#4a9eff] transition-all appearance-none cursor-pointer"
              >
                <option value="user">User</option>
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 mt-7 pointer-events-none">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2" htmlFor="reg-password">
                Password
              </label>
              <div className="relative">
                <input
                  id="reg-password"
                  type={showPwd ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-11 bg-brand-bg border border-brand-border rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#4a9eff] focus:ring-1 focus:ring-[#4a9eff] transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  tabIndex={-1}
                >
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 bg-gradient-primary hover:opacity-90 rounded-xl font-bold text-white text-sm btn-glow transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="text-[#4a9eff] hover:text-white font-semibold transition-colors ml-0.5">
              Sign in instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
