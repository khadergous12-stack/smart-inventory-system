"use client";

import React, { useState } from "react";
import { Search, Download, ArrowDownLeft, ArrowUpRight } from "lucide-react";

// Dummy transactions data
const transactionsList = [
  { id: "TXN-1042", user: "Alice Walker", item: "GMIT Record Book", type: "ISSUED", date: "Oct 24, 2026", time: "10:30 AM", status: "COMPLETED" },
  { id: "TXN-1043", user: "John Doe", item: "Engineering Drawing Kit", type: "RETURNED", date: "Oct 24, 2026", time: "11:15 AM", status: "COMPLETED" },
  { id: "TXN-1044", user: "Sarah Smith", item: "Lab Coat", type: "ISSUED", date: "Oct 24, 2026", time: "01:20 PM", status: "PENDING" },
  { id: "TXN-1045", user: "Michael Chen", item: "A4 Copy Paper (Ream)", type: "ISSUED", date: "Oct 23, 2026", time: "09:45 AM", status: "COMPLETED" },
  { id: "TXN-1046", user: "Emma Wilson", item: "GMIT Assignment", type: "RETURNED", date: "Oct 23, 2026", time: "03:10 PM", status: "COMPLETED" },
];

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto relative z-10 px-8 py-6">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b border-brand-border">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
            <span>Stockline</span>
            <span className="text-slate-600">/</span>
            <span className="text-white font-medium text-gradient">Transactions</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight mt-1">Transaction Log</h2>
        </div>
        <button className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-slate-800 border border-slate-700 hover:border-[#4a9eff]/50 hover:text-[#4a9eff] transition-colors rounded-lg text-white font-medium text-sm mt-4 sm:mt-0">
          <Download className="w-4 h-4" />
          Export Log
        </button>
      </header>

      <div className="bg-brand-card border border-brand-border rounded-xl flex flex-col glow-hover mb-8 overflow-hidden border-gradient-top">
        <div className="p-6 border-b border-brand-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-brand-bg/20">
          <h3 className="text-lg font-semibold">Recent Activity</h3>
          <div className="relative w-full sm:w-auto">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search user, item, or TXN..." 
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
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-widest border-b border-brand-border">Transaction ID</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-widest border-b border-brand-border">Type</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-widest border-b border-brand-border">Item Issued/Returned</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-widest border-b border-brand-border">User</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-widest border-b border-brand-border">Date & Time</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-widest border-b border-brand-border text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/50 text-sm">
              {transactionsList
                .filter(record => 
                  record.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
                  record.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  record.id.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((record) => (
                <tr key={record.id} className="hover:bg-brand-bg/60 transition-colors group">
                  <td className="px-6 py-4 font-mono text-slate-400 group-hover:text-[#4a9eff] transition-colors">{record.id}</td>
                  <td className="px-6 py-4">
                    {record.type === "ISSUED" ? (
                      <span className="flex items-center gap-2 text-[#4a9eff]">
                        <ArrowUpRight className="w-4 h-4" /> <span className="font-semibold text-xs tracking-wide">ISSUED</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-brand-success">
                        <ArrowDownLeft className="w-4 h-4" /> <span className="font-semibold text-xs tracking-wide">RETURNED</span>
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-200">{record.item}</td>
                  <td className="px-6 py-4 text-slate-300">{record.user}</td>
                  <td className="px-6 py-4 text-slate-400">
                    <div className="flex flex-col">
                      <span className="text-white font-medium">{record.date}</span>
                      <span className="text-[11px] uppercase tracking-wider">{record.time}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wide border ${
                      record.status === 'COMPLETED' 
                        ? 'bg-brand-success/10 text-brand-success border-brand-success/20' 
                        : 'bg-brand-warning/10 text-brand-warning border-brand-warning/20'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
