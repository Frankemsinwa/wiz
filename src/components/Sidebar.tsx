"use client";

import { Home, ArrowLeftRight, ArrowDownLeft, CreditCard, Users, PieChart, Settings, LogOut, Menu, X, Shield } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/lib/store";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const workerItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: ArrowLeftRight, label: "Send", href: "/transfers" },
    { icon: ArrowDownLeft, label: "Receive", href: "/receive" },
    { icon: CreditCard, label: "Cards", href: "/cards" },
    { icon: Users, label: "Recipients", href: "/recipients" },
    { icon: PieChart, label: "Analytics", href: "/analytics" },
  ];

  const adminItems = [
    { icon: Shield, label: "Dashboard", href: "/admin" },
    { icon: ArrowLeftRight, label: "Transactions", href: "/admin/transactions" },
  ];

  const currentMenuItems = user.role === "ADMIN" ? adminItems : workerItems;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-[280px] bg-near-black h-screen sticky top-0 flex-col p-8 text-white shrink-0">
        <div className="mb-12">
          <h2 className="text-wise-green text-3xl font-black tracking-tighter">Wiz.</h2>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          {currentMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? "bg-wise-green text-dark-green" 
                    : "hover:bg-white/10 text-white/70 hover:text-white"
                }`}
              >
                <Icon size={22} strokeWidth={isActive ? 3 : 2} className="transition-transform group-hover:scale-110" />
                <span className="font-semibold text-lg">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex flex-col gap-2 mt-auto border-t border-white/10 pt-8">
          <Link
            href="/settings"
            className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/10 text-white/70 hover:text-white transition-all group"
          >
            <Settings size={22} className="group-hover:rotate-45 transition-transform" />
            <span className="font-semibold text-lg">Settings</span>
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-negative/20 text-negative transition-all group">
            <LogOut size={22} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold text-lg">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-near-black border-t border-white/10 px-4 py-2 flex justify-around items-center z-50">
        {currentMenuItems.slice(0, 4).map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                isActive ? "text-wise-green" : "text-white/60"
              }`}
            >
              <Icon size={24} strokeWidth={isActive ? 3 : 2} />
              <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
            </Link>
          );
        })}
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex flex-col items-center gap-1 p-2 text-white/60"
        >
          <Menu size={24} />
          <span className="text-[10px] font-bold uppercase tracking-widest">More</span>
        </button>
      </nav>

      {/* Mobile Full Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="md:hidden fixed inset-0 bg-near-black text-white z-[60] p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-wise-green text-3xl font-black tracking-tighter">Wiz.</h2>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-white/10 rounded-full">
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col gap-4">
              {currentMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-6 p-4 rounded-2xl text-2xl font-black ${
                      isActive ? "text-wise-green" : "text-white"
                    }`}
                  >
                    <Icon size={32} strokeWidth={3} />
                    {item.label}
                  </Link>
                );
              })}
              <div className="h-px bg-white/10 my-4" />
              <Link
                href="/settings"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-6 p-4 text-2xl font-black text-white"
              >
                <Settings size={32} />
                Settings
              </Link>
            </nav>

            <button onClick={handleLogout} className="mt-auto p-6 bg-negative/20 text-negative rounded-2xl text-xl font-black flex items-center justify-center gap-4">
              <LogOut size={24} /> Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
