"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useAuthStore } from "@/lib/store";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Personal", href: "#features" },
    { label: "Business", href: "#features" },
    { label: "Multi-Currency", href: "#services" },
    { label: "Transfers", href: "#payments" },
    { label: "Security", href: "#security" },
    { label: "About Us", href: "#about" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-[#fafaf7]/90 backdrop-blur-md border-b border-[#0e0f0c]/08 shadow-sm py-3.5"
          : "bg-[#fafaf7] py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <img
            src="/logo.png"
            alt="Aureus Logo"
            className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter text-[#0e0f0c] leading-none">
              Aureus<span className="text-amber-500">.</span>
            </span>
            <span className="text-[10px] font-bold tracking-widest text-amber-600 uppercase">
              Banking
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-bold text-[#0e0f0c]/80">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-amber-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-4">
          {isAuthenticated ? (
            <Link
              href="/dashboard"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-near-black font-black text-sm transition-all duration-200 flex items-center gap-1.5 shadow-md shadow-amber-500/20"
            >
              View Dashboard <ArrowRight size={15} />
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-bold text-[#0e0f0c] hover:text-amber-600 transition-colors px-2 py-1"
              >
                Log In
              </Link>
              <Link
                href="/login"
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-near-black font-black text-sm flex items-center gap-1.5 transition-all duration-200 shadow-md shadow-amber-500/25 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Open Account</span>
                <ArrowRight size={15} />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-[#0e0f0c] hover:bg-black/5"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#fafaf7] border-b border-[#0e0f0c]/10 px-6 py-5 overflow-hidden"
          >
            <div className="flex flex-col gap-3 mb-5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-bold text-[#0e0f0c] py-2"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-3 pt-3 border-t border-[#0e0f0c]/10">
              {isAuthenticated ? (
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 text-center rounded-full bg-amber-500 text-near-black font-black text-sm flex items-center justify-center gap-2"
                >
                  View Dashboard <ArrowRight size={15} />
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-3 text-center rounded-full bg-white border border-[#0e0f0c]/15 text-[#0e0f0c] font-bold text-sm"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-3 text-center rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-near-black font-black text-sm flex items-center justify-center gap-2 shadow-md shadow-amber-500/30"
                  >
                    Open Account <ArrowRight size={15} />
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
