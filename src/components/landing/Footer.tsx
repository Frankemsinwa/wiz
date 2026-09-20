"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#fafaf7] border-t border-[#0e0f0c]/08 text-[#0e0f0c] text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-[#0e0f0c]/08">
          {/* Brand Col */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="Aureus" className="h-7 w-auto" />
              <span className="text-2xl font-black tracking-tighter text-[#0e0f0c]">
                Aureus<span className="text-amber-500">.</span>
              </span>
            </Link>
            <p className="text-xs font-semibold text-[#6b6964] leading-relaxed max-w-sm mb-6">
              Banking solutions that empower you to achieve more every day. Multi-currency holding, international wire transfers, and crypto funding.
            </p>
            <div className="flex items-center gap-3 text-amber-600">
              <span className="w-8 h-8 rounded-full bg-white border border-[#0e0f0c]/10 flex items-center justify-center font-bold text-xs hover:bg-amber-500/10 cursor-pointer transition-colors">
                f
              </span>
              <span className="w-8 h-8 rounded-full bg-white border border-[#0e0f0c]/10 flex items-center justify-center font-bold text-xs hover:bg-amber-500/10 cursor-pointer transition-colors">
                𝕏
              </span>
              <span className="w-8 h-8 rounded-full bg-white border border-[#0e0f0c]/10 flex items-center justify-center font-bold text-xs hover:bg-amber-500/10 cursor-pointer transition-colors">
                in
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-black text-[#0e0f0c] uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 font-semibold text-[#6b6964]">
              <li><Link href="/dashboard" className="hover:text-amber-600 transition-colors">Personal Banking</Link></li>
              <li><Link href="/transfers" className="hover:text-amber-600 transition-colors">Money Transfers</Link></li>
              <li><Link href="/receive" className="hover:text-amber-600 transition-colors">Crypto Deposit</Link></li>
              <li><Link href="/cards" className="hover:text-amber-600 transition-colors">Debit Cards</Link></li>
              <li><Link href="/login" className="hover:text-amber-600 transition-colors">About Aureus</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-black text-[#0e0f0c] uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 font-semibold text-[#6b6964]">
              <li><Link href="/messages" className="hover:text-amber-600 transition-colors">Help Center</Link></li>
              <li><a href="#services" className="hover:text-amber-600 transition-colors">FAQs</a></li>
              <li><a href="#security" className="hover:text-amber-600 transition-colors">Security Standards</a></li>
              <li><a href="#payments" className="hover:text-amber-600 transition-colors">Currency Rates</a></li>
              <li><Link href="/messages" className="hover:text-amber-600 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-black text-[#0e0f0c] uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-2.5 font-semibold text-[#6b6964]">
              <li className="text-amber-600 font-black">● Live Support Online</li>
              <li>In-App Direct Messages</li>
              <li>Automated Gas Fee Help</li>
              <li>support@aureus.bank</li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[#6b6964] font-medium gap-4">
          <p>© {new Date().getFullYear()} Aureus Bank. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-amber-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-amber-600 transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
