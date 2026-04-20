"use client";

import React, { useState, useEffect } from "react";
import { Download, PieChart, FileText, BarChart2, ShieldAlert } from "lucide-react";
import { isStaff, downloadFile } from "@/lib/api";

export default function ReportsPage() {
  const [canView, setCanView] = useState(false);
  const [downloadingCsv, setDownloadingCsv] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  useEffect(() => {
    setCanView(isStaff());
  }, []);

  if (!canView) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-brand-bg relative z-10">
        <div className="w-16 h-16 bg-brand-danger/10 text-brand-danger border border-brand-danger/20 rounded-2xl flex items-center justify-center mb-6">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
        <p className="text-slate-400 max-w-md">
          You do not have the required permissions to view stock reports.
          Please contact an administrator if you believe this is an error.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto relative z-10 px-8 py-6">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b border-brand-border">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
            <span>Stockline</span>
            <span className="text-slate-600">/</span>
            <span className="text-white font-medium text-gradient">Reports</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight mt-1">Analytics & Reporting</h2>
        </div>
        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          <button 
            disabled={downloadingPdf}
            onClick={async () => {
              setDownloadingPdf(true);
              try { await downloadFile("/reports/export/inventory/pdf", "inventory_report.pdf"); }
              catch (err) { alert("Failed to download PDF"); }
              finally { setDownloadingPdf(false); }
            }}
            className="flex flex-1 sm:flex-none items-center justify-center gap-2 px-5 py-2.5 bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors rounded-lg text-white font-medium text-sm disabled:opacity-50"
          >
            <PieChart className="w-4 h-4 text-[#4a9eff]" />
            {downloadingPdf ? "Generating..." : "Generate PDF"}
          </button>
          <button 
            disabled={downloadingCsv}
            onClick={async () => {
              setDownloadingCsv(true);
              try { await downloadFile("/reports/export/inventory/csv", "inventory_report.csv"); }
              catch (err) { alert("Failed to download CSV"); }
              finally { setDownloadingCsv(false); }
            }}
            className="flex flex-1 sm:flex-none items-center justify-center gap-2 px-5 py-2.5 bg-gradient-primary rounded-lg text-white font-semibold text-sm btn-glow hover:scale-[1.02] active:scale-95 transition-transform disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            {downloadingCsv ? "Exporting..." : "Export CSV"}
          </button>
        </div>
      </header>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Report Card 1 */}
        <div className="bg-brand-card border border-brand-border rounded-xl p-6 glow-hover flex flex-col cursor-pointer hover:-translate-y-1 transition-transform">
          <div className="w-12 h-12 rounded-full bg-[#4a9eff]/10 border border-[#4a9eff]/20 flex items-center justify-center mb-4">
            <BarChart2 className="w-6 h-6 text-[#4a9eff]" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Monthly Stock Usage</h3>
          <p className="text-sm text-slate-400 flex-1 mb-4 leading-relaxed">
            A comprehensive report outlining the distribution and usage pattern of inventory assets across the current month.
          </p>
          <div className="pt-4 border-t border-brand-border/50 text-xs font-semibold text-[#4a9eff] uppercase tracking-widest hover:text-white transition-colors">
            View Analytics →
          </div>
        </div>

        {/* Report Card 2 */}
        <div className="bg-brand-card border border-brand-border rounded-xl p-6 glow-hover flex flex-col cursor-pointer hover:-translate-y-1 transition-transform">
          <div className="w-12 h-12 rounded-full bg-brand-warning/10 border border-brand-warning/20 flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-brand-warning" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Low Stock Alerts</h3>
          <p className="text-sm text-slate-400 flex-1 mb-4 leading-relaxed">
            Report on all inventory items currently at or below minimum threshold requirements, aiding in rapid reordering execution.
          </p>
          <div className="pt-4 border-t border-brand-border/50 text-xs font-semibold text-brand-warning uppercase tracking-widest hover:text-white transition-colors">
            View Analytics →
          </div>
        </div>

        {/* Report Card 3 */}
        <div className="bg-brand-card border border-brand-border rounded-xl p-6 glow-hover flex flex-col cursor-pointer hover:-translate-y-1 transition-transform">
          <div className="w-12 h-12 rounded-full bg-[#7c3aed]/10 border border-[#7c3aed]/20 flex items-center justify-center mb-4">
            <PieChart className="w-6 h-6 text-[#7c3aed]" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">User Activity Audit</h3>
          <p className="text-sm text-slate-400 flex-1 mb-4 leading-relaxed">
            Detailed breakdown of who requested and returned what, measuring productivity and resource spending tracking.
          </p>
          <div className="pt-4 border-t border-brand-border/50 text-xs font-semibold text-[#7c3aed] uppercase tracking-widest hover:text-white transition-colors">
            View Analytics →
          </div>
        </div>

      </div>
      
      {/* Visual Placeholder for expanded charts inside reports page */}
      <div className="flex-1 bg-brand-card border border-brand-border border-dashed rounded-xl flex items-center justify-center opacity-50 relative overflow-hidden group min-h-[300px]">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#4a9eff]/5 to-[#7c3aed]/5" />
        <div className="flex flex-col items-center gap-3">
          <FileText className="w-8 h-8 text-slate-500 group-hover:text-white transition-colors" />
          <span className="text-sm font-semibold text-slate-400 tracking-wide uppercase group-hover:text-[#4a9eff] transition-colors">
            Select A Report Template to Visualize
          </span>
        </div>
      </div>
      
    </div>
  );
}
