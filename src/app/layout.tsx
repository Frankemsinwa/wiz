import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppWrapper } from "@/components/AppWrapper";
import MainLayout from "@/components/MainLayout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aureus | Modern Financial Cloud & Multi-Currency Banking",
  description: "Next-generation institutional-grade multi-currency banking platform, treasury management, and corporate cards.",
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
      suppressHydrationWarning
    >
      <body className="min-h-full bg-bg-page text-near-black">
        <AppWrapper>
          <MainLayout>
            {children}
          </MainLayout>
        </AppWrapper>
      </body>
    </html>
  );
}
