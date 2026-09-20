"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import MobileHeader from "@/components/MobileHeader";
import ChatFAB from "@/components/ChatFAB";

const standaloneRoutes = ["/", "/login", "/register"];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStandalone = standaloneRoutes.includes(pathname);

  if (isStandalone) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <MobileHeader />
        <main className="flex-1 overflow-y-auto pb-24 md:pb-0">
          {children}
        </main>
      </div>
      <ChatFAB />
    </div>
  );
}
