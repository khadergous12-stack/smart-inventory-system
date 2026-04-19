"use client";

import React, { useState } from "react";
import { UserPlus, Search, Mail, Shield } from "lucide-react";

const usersList = [
  { id: "USR-001", name: "Alfonso Davies", email: "alfonso@gmit.edu.in", role: "Admin", status: "ACTIVE" },
  { id: "USR-002", name: "Sophia Martinez", email: "smartinez@gmit.edu.in", role: "Manager", status: "ACTIVE" },
  { id: "USR-003", name: "Ravi Kumar", email: "rkumar@student.edu", role: "User", status: "ACTIVE" },
  { id: "USR-004", name: "Aisha Patel", email: "apatel@student.edu", role: "User", status: "INACTIVE" },
  { id: "USR-005", name: "Ethan Hunt", email: "ehunt@gmit.edu.in", role: "Manager", status: "ACTIVE" },
];

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto relative z-10 px-8 py-6">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b border-brand-border">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
            <span>Stockline</span>
            <span className="text-slate-600">/</span>
            <span className="text-white font-medium text-gradient">Users</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight mt-1">User Management</h2>
        </div>
        <button className="hidden sm:flex items-center gap-2 px-6 py-3 bg-gradient-primary rounded-lg text-white font-semibold text-sm btn-glow mt-4 sm:mt-0 transition-transform hover:scale-[1.02] active:scale-95">
          <UserPlus className="w-4 h-4" />
          INVITE USER
        </button>
      </header>

      <div className="bg-brand-card border border-brand-border rounded-xl flex flex-col glow-hover mb-8 overflow-hidden border-gradient-top">
        <div className="p-6 border-b border-brand-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-brand-bg/20">
          <h3 className="text-lg font-semibold">Active Members</h3>
          <div className="relative w-full sm:w-auto">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
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
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-widest border-b border-brand-border">User Profile</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-widest border-b border-brand-border">User ID</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-widest border-b border-brand-border">System Role</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-widest border-b border-brand-border text-center">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-widest border-b border-brand-border text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/50 text-sm">
              {usersList
                .filter(user => 
                  user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                  user.email.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((user) => (
                <tr key={user.id} className="hover:bg-brand-bg/60 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shadow-sm ${
                        user.role === 'Admin' ? 'bg-[#7c3aed] text-white' : 
                        user.role === 'Manager' ? 'bg-[#4a9eff] text-white' : 
                        'bg-slate-700 text-white'
                      }`}>
                        {user.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-200">{user.name}</span>
                        <span className="text-xs text-slate-400">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-400 group-hover:text-[#4a9eff] transition-colors">{user.id}</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      {user.role === 'Admin' ? <Shield className="w-3.5 h-3.5 text-[#7c3aed]" /> : null}
                      <span className="font-medium tracking-wide">{user.role}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wide border ${
                      user.status === 'ACTIVE' 
                        ? 'bg-brand-success/10 text-brand-success border-brand-success/20' 
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-[#4a9eff] hover:bg-[#4a9eff]/10 rounded-lg transition-all border border-transparent hover:border-[#4a9eff]/30">
                        <Mail className="w-4 h-4" />
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
  );
}
