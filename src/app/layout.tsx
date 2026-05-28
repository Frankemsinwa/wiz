import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import MobileHeader from "@/components/MobileHeader";
import { AppWrapper } from "@/components/AppWrapper";
import ChatFAB from "@/components/ChatFAB";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wiz | Money without borders",
  description: "Personal multi-currency bank account",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg-page text-near-black">
        <AppWrapper>
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
        </AppWrapper>
      </body>
    </html>
  );
}
