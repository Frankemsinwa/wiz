"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "@/lib/store";
import { Plus, Search, Shield, Activity, Loader2 } from "lucide-react";
import CreateAccountModal from "@/components/CreateAccountModal";
import api from "@/lib/api";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  accountNumber?: string;
  balance?: number;
  currency?: string;
}

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/admin/users");
      setUsers(response.data.data.users);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateBalance = async (id: string, amount: number) => {
    try {
      await api.post(`/admin/users/${id}/balance`, { amount });
      fetchUsers();
    } catch (error) {
      console.error("Failed to update balance:", error);
      alert("Failed to update balance");
    }
  };

  const workers = users.filter(u => u.role === "WORKER");
  
  const filteredWorkers = workers.filter(w => 
    w.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (w.accountNumber && w.accountNumber.includes(searchQuery))
  );

  const totalFunds = workers.reduce((sum, w) => sum + (w.balance || 0), 0);

  const handleAdjustBalance = (id: string, currentBalance: number) => {
    const amountStr = prompt(`Enter amount to add (positive) or deduct (negative) for this account.\nCurrent balance: ${currentBalance}`);
    if (amountStr) {
      const amount = parseFloat(amountStr);
      if (!isNaN(amount)) {
        updateBalance(id, amount);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-bg-page">
        <Loader2 className="animate-spin text-wise-green" size={48} />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-12 max-w-6xl mx-auto">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <span className="text-negative font-bold uppercase tracking-widest text-[10px] md:text-sm mb-2 flex items-center gap-2">
            <Shield size={16} /> Admin Command Center
          </span>
          <h1 className="font-billboard text-5xl md:text-7xl">Master Ledger</h1>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="wise-pill wise-pill-primary px-8 py-4 text-lg flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(159,232,112,0.3)] hover:shadow-[0_0_30px_rgba(159,232,112,0.5)]"
        >
          <Plus size={24} /> New Sub-Account
        </button>
      </header>

      {/* Global Stats */}
      <section className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-near-black text-white p-8 rounded-[32px] border border-border"
        >
          <p className="text-white/60 font-bold uppercase tracking-widest text-xs mb-2">Total Managed Funds</p>
          <h2 className="font-billboard text-4xl md:text-5xl text-wise-green">
            ${totalFunds.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h2>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white p-8 rounded-[32px] border border-border"
        >
          <p className="text-muted font-bold uppercase tracking-widest text-xs mb-2">Active Sub-Accounts</p>
          <h2 className="font-billboard text-4xl md:text-5xl text-near-black">
            {workers.length}
          </h2>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white p-8 rounded-[32px] border border-border flex flex-col justify-center"
        >
           <p className="text-muted font-bold uppercase tracking-widest text-xs mb-2 flex items-center gap-2">
            <Activity size={16} /> System Status
          </p>
          <p className="font-bold text-xl text-positive flex items-center gap-2">
             <span className="w-3 h-3 rounded-full bg-positive animate-pulse" /> Operational
          </p>
        </motion.div>
      </section>

      {/* Workers Ledger */}
      <section>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h2 className="font-section text-3xl">Active Ledgers</h2>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
            <input 
              type="text" 
              placeholder="Search by name or acc number..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-border rounded-full py-3 pl-12 pr-6 focus:outline-none focus:ring-2 focus:ring-wise-green transition-all font-semibold"
            />
          </div>
        </div>

        <div className="bg-white rounded-[32px] border border-border overflow-hidden shadow-sm">
          {filteredWorkers.length === 0 ? (
            <div className="p-12 text-center text-muted font-bold text-lg">
              No sub-accounts found. Create one to get started.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border bg-bg-page/50 text-muted uppercase tracking-widest text-xs">
                    <th className="p-6 font-bold">Worker</th>
                    <th className="p-6 font-bold">Account No.</th>
                    <th className="p-6 font-bold text-right">Current Balance</th>
                    <th className="p-6 font-bold text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredWorkers.map((worker) => (
                    <motion.tr 
                      key={worker.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-b border-border hover:bg-black/5 transition-colors group"
                    >
                      <td className="p-6 font-bold text-lg">{worker.name}</td>
                      <td className="p-6 font-mono font-semibold text-muted tracking-widest">{worker.accountNumber || 'N/A'}</td>
                      <td className="p-6 text-right">
                        <span className="font-black text-xl">
                          {worker.balance?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                        <span className="text-muted ml-1 font-bold">{worker.currency}</span>
                      </td>
                      <td className="p-6 text-center">
                        <button 
                          onClick={() => handleAdjustBalance(worker.id, worker.balance || 0)}
                          className="bg-bg-page border border-border rounded-full px-4 py-2 font-bold text-sm hover:bg-wise-green hover:border-wise-green hover:text-dark-green transition-colors"
                        >
                          Adjust Funds
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      <CreateAccountModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); fetchUsers(); }} />
    </div>
  );
}
