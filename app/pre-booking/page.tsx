"use client";

import React, { useState } from "react";
import { Plus, Search, Calendar, Check, X } from "lucide-react";

export default function PreBookingPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const bookingsList = [
    { id: "RES-209", item: "Logitech MX Master 3", user: "Ravi Kumar", date: "Nov 02, 2026", qty: 2, status: "PENDING" },
    { id: "RES-210", item: "Herman Miller Aeron", user: "Emma Wilson", date: "Nov 05, 2026", qty: 1, status: "APPROVED" },
  ];

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto relative z-10 px-8 py-6">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b border-brand-border">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
            <span>Stockline</span>
            <span className="text-slate-600">/</span>
            <span className="text-white font-medium text-gradient">Pre-Booking</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight mt-1">Reservations</h2>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Form Section */}
        <div className="lg:col-span-1 bg-brand-card border border-brand-border rounded-xl p-6 glow-hover border-gradient-top flex flex-col h-fit">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#4a9eff]" />
            New Reservation
          </h3>
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Product ID / Name</label>
              <input type="text" className="w-full px-4 py-2.5 bg-brand-bg border border-brand-border rounded-lg text-sm text-white focus:outline-none focus:border-[#4a9eff] focus:ring-1 focus:ring-[#4a9eff] transition-all" placeholder="e.g. PRD-8821" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Customer Name</label>
              <input type="text" className="w-full px-4 py-2.5 bg-brand-bg border border-brand-border rounded-lg text-sm text-white focus:outline-none focus:border-[#4a9eff] focus:ring-1 focus:ring-[#4a9eff] transition-all" placeholder="Jane Smith" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Quantity Requested</label>
              <input type="number" className="w-full px-4 py-2.5 bg-brand-bg border border-brand-border rounded-lg text-sm text-white font-mono focus:outline-none focus:border-[#4a9eff] focus:ring-1 focus:ring-[#4a9eff] transition-all" min="1" defaultValue={1} />
            </div>
            <button className="w-full py-3 mt-2 bg-gradient-primary text-white rounded-lg font-semibold btn-glow transition-transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              Submit Pre-booking
            </button>
          </form>
        </div>

        {/* List Section */}
        <div className="lg:col-span-2 bg-brand-card border border-brand-border rounded-xl flex flex-col glow-hover overflow-hidden border-gradient-top">
          <div className="p-6 border-b border-brand-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-brand-bg/20">
            <h3 className="text-lg font-semibold">Active Pre-bookings</h3>
            <div className="relative w-full sm:w-auto">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search reservations..." 
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
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-widest border-b border-brand-border">Reservation ID</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-widest border-b border-brand-border">Item & User</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-widest border-b border-brand-border text-center">Date / Qty</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-widest border-b border-brand-border text-center">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-widest border-b border-brand-border text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/50 text-sm">
                {bookingsList
                  .filter(res => res.user.toLowerCase().includes(searchTerm.toLowerCase()) || res.item.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((res) => (
                  <tr key={res.id} className="hover:bg-brand-bg/60 transition-colors group">
                    <td className="px-6 py-4 font-mono text-slate-400 group-hover:text-[#4a9eff] transition-colors">{res.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-200">{res.item}</span>
                        <span className="text-xs text-slate-400">By {res.user}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                       <div className="flex flex-col items-center">
                        <span className="text-white font-medium">{res.date}</span>
                        <span className="text-[11px] font-mono text-slate-400 mt-0.5">Qty: {res.qty}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wide border ${
                        res.status === 'APPROVED' 
                          ? 'bg-brand-success/10 text-brand-success border-brand-success/20' 
                          : 'bg-brand-warning/10 text-brand-warning border-brand-warning/20'
                      }`}>
                        {res.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button className="p-1.5 text-brand-success hover:bg-brand-success/10 rounded-lg transition-all border border-transparent hover:border-brand-success/30" title="Approve">
                          <Check className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-brand-danger hover:bg-brand-danger/10 rounded-lg transition-all border border-transparent hover:border-brand-danger/30" title="Reject">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
        </div>
      </div>
    </div>
  );
}
