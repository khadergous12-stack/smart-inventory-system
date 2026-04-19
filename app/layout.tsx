import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { LayoutDashboard, Package, ArrowLeftRight, FileText, Users, Calendar, Database } from "lucide-react";
import Link from "next/link";
import TopHeader from "./TopHeader";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stockline | Smart Stock, Zero Chaos",
  description: "Smart inventory management dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakartaSans.variable} h-full antialiased`}>
      <body className="min-h-full flex bg-brand-bg text-white h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="w-[220px] shrink-0 border-r border-brand-border bg-brand-card flex flex-col justify-between hidden md:flex z-10 relative">
          <div>
            <div className="h-20 flex flex-col justify-center border-b border-brand-border px-6">
              <h1 className="text-2xl font-black tracking-tighter text-gradient w-full">Stockline</h1>
              <span className="text-[10px] text-slate-400 w-full font-medium uppercase tracking-widest mt-0.5">Smart Stock, Zero Chaos</span>
            </div>
            
            <nav className="p-4 space-y-2 mt-4">
              <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium nav-active transition-colors">
                <LayoutDashboard className="w-5 h-5" />
                Dashboard
              </Link>
              <Link href="/inventory" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors">
                <Package className="w-5 h-5" />
                Inventory
              </Link>
              <Link href="/pre-booking" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors">
                <Calendar className="w-5 h-5" />
                Pre-Booking
              </Link>
              <Link href="/stock-management" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors">
                <Database className="w-5 h-5" />
                Stock Management
              </Link>
              <Link href="/transactions" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors">
                <ArrowLeftRight className="w-5 h-5" />
                Transactions
              </Link>
              <Link href="/reports" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors">
                <FileText className="w-5 h-5" />
                Reports
              </Link>
              <Link href="/users" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors">
                <Users className="w-5 h-5" />
                Users
              </Link>
            </nav>
          </div>
          
          <div className="p-4 border-t border-brand-border">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-800/30 border border-brand-border mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-sm font-bold shadow-lg">
                AD
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Admin User</span>
                <span className="text-xs text-brand-success flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-success"></div> Active
                </span>
              </div>
            </div>
            
            <Link href="/login" className="flex items-center justify-center gap-2 w-full py-2 bg-brand-danger/10 hover:bg-brand-danger/20 text-brand-danger rounded-lg text-xs font-bold uppercase tracking-widest transition-colors border border-brand-danger/20">
              Sign Out
            </Link>
          </div>
        </aside>

        {/* Main Content Container */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden bg-brand-bg relative z-0">
          {/* Subtle Ambient Gradients */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4a9eff]/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#7c3aed]/5 blur-[120px] rounded-full pointer-events-none" />
          
          {/* Functional Top Header */}
          <TopHeader />

          {/* Page Content */}
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
