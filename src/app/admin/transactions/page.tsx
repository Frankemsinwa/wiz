'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';

interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: string;
  user: { name: string; email: string };
  reference: string;
  createdAt: string;
}

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    try {
      const res = await api.get('/admin/pending-deposits');
      setTransactions(res.data.data.transactions);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: 'COMPLETED' | 'FAILED') => {
    try {
      await api.patch(`/admin/transactions/${id}/status`, { status });
      fetchPending();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Pending Deposits</h1>
      
      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {transactions.map((tx) => (
          <div key={tx.id} className="border p-4 rounded-xl shadow-sm bg-white">
            <div className="flex justify-between mb-2">
              <span className="font-bold">{tx.user.name}</span>
              <span className="font-mono text-sm">{tx.amount} {tx.currency}</span>
            </div>
            <div className="text-sm text-muted mb-2">{tx.user.email}</div>
            <div className="text-xs mb-4 bg-gray-50 p-2 rounded break-all">
              <span className="font-bold block uppercase mb-1">Proof:</span>
              {tx.reference}
            </div>
            <div className="flex gap-2 justify-end">
              <button 
                onClick={() => handleUpdateStatus(tx.id, 'COMPLETED')}
                className="bg-green-500 text-white px-4 py-2 rounded text-sm"
              >Approve</button>
              <button 
                onClick={() => handleUpdateStatus(tx.id, 'FAILED')}
                className="bg-red-500 text-white px-4 py-2 rounded text-sm"
              >Deny</button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">User</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Proof</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <td className="border p-2">{tx.user.name} <br/><span className="text-xs text-muted">{tx.user.email}</span></td>
                <td className="border p-2">{tx.amount} {tx.currency}</td>
                <td className="border p-2 font-mono text-xs max-w-[200px] break-all">{tx.reference}</td>
                <td className="border p-2">{new Date(tx.createdAt).toLocaleDateString()}</td>
                <td className="border p-2 flex gap-2 justify-center">
                  <button 
                    onClick={() => handleUpdateStatus(tx.id, 'COMPLETED')}
                    className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                  >Approve</button>
                  <button 
                    onClick={() => handleUpdateStatus(tx.id, 'FAILED')}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                  >Deny</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
