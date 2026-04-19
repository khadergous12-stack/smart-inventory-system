"use client";

import React from "react";
import { Plus, BookOpen, AlertTriangle, PlusCircle, Users, ArrowUp, ArrowRight } from "lucide-react";

export default function Home() {
  const criticalItems = [
    { id: "PRD-001", name: "GMIT Record Book", left: 2, unit: "books" },
    { id: "PRD-045", name: "Engineering Drawing Kit", left: 5, unit: "kits" },
    { id: "PRD-112", name: "A4 Copy Paper (Ream)", left: 8, unit: "reams" },
  ];

  const trendingItems = [
    { rank: 1, name: "Advanced Mathematics", requests: "+45 requests" },
    { rank: 2, name: "Physics Lab Manual", requests: "+32 requests" },
    { rank: 3, name: "CS Data Structures", requests: "+28 requests" },
  ];

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto relative z-10 px-8 py-6">

      {/* Header Section */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4">
        <div>
          <span className="inline-block px-3 py-1 bg-brand-success/10 border border-brand-success/20 text-brand-success text-[10px] font-bold uppercase tracking-widest rounded-full mb-3">
            Senior Registrar
          </span>
          <h2 className="text-4xl font-black tracking-tight text-white mb-2">Welcome back, Alex.</h2>
          <p className="text-sm text-slate-400">Here is your morning briefing for Central Campus Inventory.</p>
        </div>
        <button className="hidden sm:flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-slate-200 rounded-xl font-bold text-sm transition-transform hover:scale-105 active:scale-95 mt-4 sm:mt-0 shadow-lg shadow-white/10">
          <Plus className="w-4 h-4" />
          Quick Stock Entry
        </button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Books */}
        <div className="bg-brand-card border border-brand-border rounded-xl p-5 border-gradient-top glow-hover relative overflow-hidden group flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-4 h-4 text-indigo-400" />
            </div>
            <span className="text-[11px] font-bold text-brand-success">+12% this month</span>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-slate-400 mb-1">Total Books</h3>
            <span className="text-3xl font-bold font-mono text-white tracking-tight">12,408</span>
          </div>
        </div>

        {/* Low Stock Items */}
        <div className="bg-brand-card border border-brand-border rounded-xl p-5 border-gradient-top glow-hover relative overflow-hidden group flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <div className="w-8 h-8 rounded-lg bg-brand-danger/10 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-4 h-4 text-brand-danger" />
            </div>
            <span className="text-[11px] font-bold text-brand-danger">Requires Attention</span>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-slate-400 mb-1">Low Stock Items</h3>
            <span className="text-3xl font-bold font-mono text-white tracking-tight">04</span>
          </div>
        </div>

        {/* Items Added Today */}
        <div className="bg-brand-card border border-brand-border rounded-xl p-5 border-gradient-top glow-hover relative overflow-hidden group flex flex-col justify-between h-32">
          <div className="flex items-start">
            <div className="w-8 h-8 rounded-lg bg-[#4a9eff]/10 flex items-center justify-center flex-shrink-0">
              <PlusCircle className="w-4 h-4 text-[#4a9eff]" />
            </div>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-slate-400 mb-1">Items Added Today</h3>
            <span className="text-3xl font-bold font-mono text-white tracking-tight">34</span>
          </div>
        </div>

        {/* Total Active Users */}
        <div className="bg-gradient-primary rounded-xl p-5 shadow-lg glow-hover relative overflow-hidden group flex flex-col justify-between h-32 border border-white/10">
          <div className="absolute inset-0 bg-black/10" />
          <div className="flex items-start relative z-10">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
              <Users className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="relative z-10">
            <h3 className="text-xs font-semibold text-white/80 mb-1">Total Active Users</h3>
            <span className="text-3xl font-bold font-mono text-white tracking-tight">1,204</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

        {/* Critical Low Stock */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">Critical Low Stock</h3>
            <button className="text-xs font-bold text-[#4a9eff] hover:text-white transition-colors">View All Inventory</button>
          </div>
          <div className="space-y-3">
            {criticalItems.map((item, idx) => (
              <div key={idx} className="bg-brand-card/50 border border-brand-border rounded-xl p-4 flex items-center justify-between hover:bg-brand-bg/60 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-danger/10 flex items-center justify-center border border-brand-danger/20 group-hover:scale-105 transition-transform">
                    <BookOpen className="w-5 h-5 text-brand-danger" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-white">{item.name}</span>
                    <span className="text-xs font-mono text-slate-400 mt-0.5">ID: {item.id}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-danger animate-pulse" />
                  <span className="font-bold text-brand-danger text-sm">{item.left} {item.unit} left</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending This Week */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-bold text-white mb-4">Trending This Week</h3>
          <div className="bg-brand-card border border-brand-border rounded-xl p-5 border-gradient-top h-full flex flex-col">
            <div className="space-y-6 flex-1">
              {trendingItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 group">
                  <div className="w-8 h-8 rounded-full bg-[#4a9eff]/10 text-[#4a9eff] flex items-center justify-center font-bold text-sm border border-[#4a9eff]/20 group-hover:bg-[#4a9eff] group-hover:text-white transition-colors">
                    {item.rank}
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="font-bold text-sm text-slate-200 group-hover:text-white transition-colors">{item.name}</span>
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 mt-0.5">{item.requests}</span>
                  </div>
                  <ArrowUp className="w-4 h-4 text-brand-success" />
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-brand-border">
              <button className="w-full text-center text-xs font-bold text-[#4a9eff] flex items-center justify-center gap-1 hover:text-white transition-colors">
                See full trend report <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
