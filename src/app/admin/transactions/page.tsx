'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';

interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: string;
  user: { name: string; email: string };
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
      <h1 className="text-2xl font-bold mb-4">Pending Deposits</h1>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">User</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id}>
              <td className="border p-2">{tx.user.name} ({tx.user.email})</td>
              <td className="border p-2">{tx.amount} {tx.currency}</td>
              <td className="border p-2">{new Date(tx.createdAt).toLocaleDateString()}</td>
              <td className="border p-2 flex gap-2">
                <button 
                  onClick={() => handleUpdateStatus(tx.id, 'COMPLETED')}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >Approve</button>
                <button 
                  onClick={() => handleUpdateStatus(tx.id, 'FAILED')}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >Deny</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
