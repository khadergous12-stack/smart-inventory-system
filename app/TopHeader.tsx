"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, Bell, User, Settings, LogOut } from "lucide-react";
import Link from "next/link";

export default function TopHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 flex items-center justify-between px-8 border-b border-brand-border/50 shrink-0 z-10 w-full bg-brand-bg/80 backdrop-blur-md">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search resources..." 
            className="w-full pl-10 pr-4 py-2 bg-[#080b14] border border-brand-border rounded-full text-sm text-white focus:outline-none focus:border-[#4a9eff] focus:ring-1 focus:ring-[#4a9eff] transition-all"
          />
        </div>
      </div>
      <div className="flex items-center gap-5 ml-4">
        <button className="relative text-slate-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-slate-800 focus:outline-none">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1.5 w-2 h-2 bg-brand-danger rounded-full border border-brand-bg" />
        </button>
        
        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4a9eff] to-[#7c3aed] flex items-center justify-center overflow-hidden shadow-lg border border-brand-border hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-[#4a9eff] focus:ring-offset-2 focus:ring-offset-brand-bg"
            aria-expanded={isOpen}
            aria-haspopup="true"
          >
            <User className="w-5 h-5 text-white" />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-[#161f33] border border-brand-border rounded-xl shadow-2xl overflow-hidden z-50 flex flex-col origin-top-right animate-in fade-in zoom-in duration-200">
              <div className="px-4 py-3 border-b border-brand-border bg-[#0b1121]/50">
                <p className="text-sm font-semibold text-white">Alex User</p>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-success"></span> Active Session
                </p>
              </div>
              <div className="py-1">
                <Link href="/users" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-[#4a9eff]/10 transition-colors">
                  <User className="w-4 h-4" />
                  My Profile
                </Link>
                <button onClick={() => setIsOpen(false)} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-[#4a9eff]/10 transition-colors">
                  <Settings className="w-4 h-4" />
                  Account Settings
                </button>
              </div>
              <div className="py-1 border-t border-brand-border">
                <Link href="/login" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-brand-danger hover:bg-brand-danger/10 transition-colors">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
