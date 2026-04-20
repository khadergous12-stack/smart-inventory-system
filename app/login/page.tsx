"use client";

import React, { useState } from "react";
import { LogIn, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth, saveSession } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data, error: apiError } = await auth.login(email, password);
      if (apiError || !data) throw new Error(apiError || "Login failed");
      saveSession(data.token, data.user);
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-brand-bg overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4a9eff]/6 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#7c3aed]/6 blur-[120px] rounded-full pointer-events-none" />

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
            <div className="w-12 h-12 rounded-xl bg-[#4a9eff]/10 border border-[#4a9eff]/20 flex items-center justify-center mb-4">
              <LogIn className="w-5 h-5 text-[#4a9eff]" />
            </div>
            <h2 className="text-xl font-bold text-white">Welcome Back</h2>
            <p className="text-sm text-slate-400 mt-1">Sign in to your account</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 px-4 py-3 bg-brand-danger/10 border border-brand-danger/20 rounded-xl text-sm text-brand-danger font-medium">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#4a9eff] focus:ring-1 focus:ring-[#4a9eff] transition-all"
                placeholder="admin@stockline.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
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

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-200 transition-colors">
                <input type="checkbox" className="w-3.5 h-3.5 rounded border-brand-border bg-brand-bg accent-[#4a9eff]" />
                Remember me
              </label>
              <a href="#" className="font-medium text-[#4a9eff] hover:text-white transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-1 py-3 bg-gradient-primary hover:opacity-90 rounded-xl font-bold text-white text-sm btn-glow transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-slate-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-[#4a9eff] hover:text-white font-semibold transition-colors ml-0.5">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
