"use client";

import { Bell } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/lib/store";

export default function MobileHeader() {
  const { user } = useAuthStore();
  
  if (!user) return null;
  
  const initials = user.name.substring(0, 2).toUpperCase();

  return (
    <header className="md:hidden flex items-center justify-between p-6 bg-bg-page sticky top-0 z-40">
      <Link href="/" className="text-near-black text-3xl font-black tracking-tighter">
        Wiz.
      </Link>
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-black/5 transition-colors">
          <Bell size={24} />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-negative rounded-full border-2 border-white" />
        </button>
        <div className="w-10 h-10 rounded-full bg-near-black flex items-center justify-center text-wise-green font-black">
          {initials}
        </div>
      </div>
    </header>
  );
}
