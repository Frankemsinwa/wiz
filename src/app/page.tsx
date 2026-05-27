"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Bell, ChevronRight, ArrowUpRight, ArrowDownLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import NotificationPanel from "@/components/NotificationPanel";
import AccountCard from "@/components/AccountCard";
import { useAuthStore } from "@/lib/store";
import api from "@/lib/api";

interface Account {
  id: string;
  currency: string;
  balance: number;
  label?: string;
  flag?: string;
}

interface Transaction {
  id: string;
  amount: number;
  currency: string;
  type: "TRANSFER_IN" | "TRANSFER_OUT" | "DEPOSIT" | "WITHDRAWAL";
  status: string;
  createdAt: string;
  reference?: string;
  recipient?: { name: string };
}

export default function Home() {
  const { user } = useAuthStore();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      setIsLoading(true);
      try {
        const [accountsRes, transactionsRes] = await Promise.all([
          api.get("/accounts"),
          api.get("/accounts/transactions")
        ]);
        setAccounts(accountsRes.data.data.accounts);
        setTransactions(transactionsRes.data.data.transactions);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);
  
  if (!user || isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 className="animate-spin text-wise-green" size={48} />
      </div>
    );
  }

  const initials = user.name.substring(0, 2).toUpperCase();
  // Ensure totalBalance is a number and format it
  const totalBalance = accounts.reduce((acc, curr) => acc + Number(curr.balance), 0);

  const getFlag = (currency: string) => {
    const flags: Record<string, string> = {
      GBP: "🇬🇧",
      USD: "🇺🇸",
      EUR: "🇪🇺",
      JPY: "🇯🇵",
      CAD: "🇨🇦",
      AUD: "🇦🇺"
    };
    return flags[currency] || "🏳️";
  };

  const getLabel = (currency: string) => {
    const labels: Record<string, string> = {
      GBP: "British Pound",
      USD: "US Dollar",
      EUR: "Euro",
      JPY: "Japanese Yen",
      CAD: "Canadian Dollar",
      AUD: "Australian Dollar"
    };
    return labels[currency] || currency;
  };

  return (
    <div className="p-6 md:p-12 max-w-6xl mx-auto">
      {/* Header */}
      <header className="hidden md:flex items-center justify-between mb-16 gap-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            className="w-full bg-white border border-border rounded-full py-3 pl-12 pr-6 focus:outline-none focus:ring-2 focus:ring-wise-green transition-all font-semibold"
          />
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-full hover:bg-black/5 transition-colors"
          >
            <Bell size={24} />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-negative rounded-full border-2 border-white" />
          </button>
          {showNotifications && <NotificationPanel onClose={() => setShowNotifications(false)} />}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-near-black flex items-center justify-center text-wise-green font-black">
              {initials}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mb-12 md:mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-muted font-bold uppercase tracking-widest text-[10px] md:text-sm mb-2 md:mb-4 block text-center md:text-left">Total Balance (Calculated)</span>
          <h1 className="font-billboard mb-8 flex flex-col md:flex-row items-center md:items-baseline gap-1 md:gap-4 text-center md:text-left text-5xl sm:text-7xl md:text-8xl break-words">
            {totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-xl md:text-4xl text-muted font-bold uppercase tracking-widest">USD</span>
          </h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/transfers" className="wise-pill wise-pill-primary px-8 py-4 text-xl w-full sm:w-auto text-center">
              Send money
            </Link>
            <Link href="/receive" className="wise-pill wise-pill-secondary px-8 py-4 text-xl w-full sm:w-auto text-center">
              Add money
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Accounts */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-section text-3xl">Accounts</h2>
          <button className="text-wise-green font-bold flex items-center gap-1 hover:underline">
            View all <ChevronRight size={20} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((acc, i) => (
            <motion.div
              key={acc.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <AccountCard 
                currency={acc.currency} 
                amount={Number(acc.balance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} 
                symbol={acc.currency === 'GBP' ? '£' : acc.currency === 'EUR' ? '€' : '$'} 
                label={getLabel(acc.currency)} 
                flag={getFlag(acc.currency)} 
              />
            </motion.div>
          ))}
          {accounts.length === 0 && (
            <div className="col-span-full py-12 text-center bg-white rounded-3xl border border-dashed border-border">
              <p className="text-muted font-bold">No accounts found. Create your first one!</p>
            </div>
          )}
        </div>
      </section>

      {/* Transactions */}
      <section>
        <h2 className="font-section text-3xl mb-8">Recent activity</h2>
        <div className="bg-white rounded-3xl border border-border overflow-hidden">
          {transactions.map((tx, i) => {
            const isOut = tx.type === "TRANSFER_OUT" || tx.type === "WITHDRAWAL";
            return (
              <div 
                key={tx.id}
                className={`flex items-center justify-between p-6 transition-colors hover:bg-black/5 cursor-pointer ${
                  i !== transactions.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    !isOut ? "bg-bg-mint text-positive" : "bg-red-50 text-negative"
                  }`}>
                    {!isOut ? <ArrowDownLeft size={24} /> : <ArrowUpRight size={24} />}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{tx.recipient?.name || (isOut ? "Payment" : "Deposit")}</h4>
                    <p className="text-muted font-semibold">{new Date(tx.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-black text-lg ${
                    !isOut ? "text-positive" : "text-near-black"
                  }`}>
                    {isOut ? "-" : "+"}{Number(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {tx.currency}
                  </p>
                  <p className="text-muted font-semibold capitalize">{tx.status.toLowerCase()}</p>
                </div>
              </div>
            );
          })}
          {transactions.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted font-bold">No transactions yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
