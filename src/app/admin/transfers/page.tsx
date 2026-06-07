'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';

interface Transfer {
  id: string;
  amount: number;
  currency: string;
  feeAmount: number | null;
  transferCode: string | null;
  status: string;
  createdAt: string;
  user: { name: string; email: string };
  account: { currency: string };
  recipient: { name: string; accountNumber: string; bankName: string } | null;
}

export default function AdminTransfersPage() {
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [loading, setLoading] = useState(true);
  const [feeInputs, setFeeInputs] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchTransfers();
  }, []);

  const fetchTransfers = async () => {
    try {
      const res = await api.get('/admin/pending-transfers');
      setTransfers(res.data.data.transactions);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSetFee = async (id: string) => {
    const fee = parseFloat(feeInputs[id]);
    if (!fee || fee <= 0) return alert("Enter a valid fee");
    try {
      await api.post(`/admin/transactions/${id}/set-fee`, { feeAmount: fee });
      fetchTransfers();
    } catch (error) {
      console.error(error);
      alert("Failed to set fee");
    }
  };

  const handleGenerateCode = async (id: string) => {
    try {
      await api.post(`/admin/transactions/${id}/generate-code`);
      fetchTransfers();
    } catch (error) {
      console.error(error);
      alert("Failed to generate code");
    }
  };

  if (loading) return <div className="p-6 font-bold text-muted">Loading Secure Admin Portal...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-black mb-2 text-near-black">Transfer Gas Fees & Auth Codes</h1>
      <p className="text-muted mb-8 font-semibold">Manage pending transfers, set fees, and generate authorization codes.</p>
      
      <div className="space-y-6">
        {transfers.length === 0 && (
          <div className="bg-white p-8 rounded-2xl border text-center text-muted font-bold shadow-sm">
            No pending transfers requiring attention.
          </div>
        )}

        {transfers.map((tx) => (
          <div key={tx.id} className="bg-white border border-border p-6 rounded-2xl shadow-sm flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
            
            {/* User Info */}
            <div className="space-y-1 flex-1">
              <h3 className="font-bold text-lg text-near-black">{tx.user.name}</h3>
              <p className="text-sm text-muted">{tx.user.email}</p>
              <div className="mt-4 text-xs bg-bg-page p-3 rounded-xl border border-border">
                <span className="font-bold text-muted block mb-1.5 uppercase tracking-wider text-[10px]">Transfer Details</span>
                <span className="font-black text-sm text-near-black">{tx.amount} {tx.currency}</span> <br/>
                {tx.recipient && (
                  <span className="text-muted font-semibold">To: {tx.recipient.name} ({tx.recipient.bankName} - {tx.recipient.accountNumber})</span>
                )}
                {!tx.recipient && <span className="text-muted font-semibold">To: External Crypto/Wallet</span>}
              </div>
              <p className="text-[10px] text-muted mt-3 font-bold uppercase tracking-wider">Started: {new Date(tx.createdAt).toLocaleString()}</p>
            </div>

            {/* Status & Actions */}
            <div className="w-full md:w-[320px] md:border-l border-border md:pl-6 space-y-4 shrink-0">
              
              {/* STATUS: AWAITING FEE */}
              {tx.status === 'AWAITING_FEE' && (
                <div className="space-y-3">
                  <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-[10px] font-black rounded-full uppercase tracking-widest border border-amber-200">
                    Needs Fee Assessment
                  </span>
                  <div className="flex gap-2">
                    <input 
                      type="number"
                      placeholder="Fee ($)"
                      value={feeInputs[tx.id] || ''}
                      onChange={(e) => setFeeInputs({ ...feeInputs, [tx.id]: e.target.value })}
                      className="border border-border p-3 rounded-xl text-sm w-full font-black focus:outline-none focus:border-amber-500 bg-bg-page"
                    />
                    <button 
                      onClick={() => handleSetFee(tx.id)}
                      className="bg-near-black text-white px-5 py-3 rounded-xl text-sm font-black hover:bg-black whitespace-nowrap shadow-md transition-colors"
                    >
                      Set Fee
                    </button>
                  </div>
                </div>
              )}

              {/* STATUS: PENDING FEE PAYMENT */}
              {tx.status === 'PENDING_FEE_PAYMENT' && (
                <div className="space-y-2">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-[10px] font-black rounded-full uppercase tracking-widest border border-blue-200">
                    Waiting for Payment
                  </span>
                  <p className="text-sm font-semibold text-muted">Fee Set: <span className="font-black text-near-black">${tx.feeAmount}</span></p>
                  <p className="text-[11px] text-muted font-bold leading-normal bg-bg-page p-2 rounded-lg border border-border">
                    User must click "I have paid" on their dashboard after sending BTC.
                  </p>
                </div>
              )}

              {/* STATUS: AWAITING CODE */}
              {tx.status === 'AWAITING_CODE' && (
                <div className="space-y-3">
                  <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-[10px] font-black rounded-full uppercase tracking-widest border border-amber-200">
                    User Claims Paid
                  </span>
                  <p className="text-[11px] font-bold text-muted leading-normal">
                    Verify the BTC payment of <strong className="text-near-black">${tx.feeAmount}</strong> then generate the authorization code.
                  </p>
                  
                  {!tx.transferCode ? (
                    <button 
                      onClick={() => handleGenerateCode(tx.id)}
                      className="bg-amber-600 text-white px-4 py-3.5 rounded-xl text-sm font-black w-full hover:bg-amber-700 shadow-md transition-colors"
                    >
                      Generate 4-Digit Code
                    </button>
                  ) : (
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-center space-y-1 shadow-inner">
                      <p className="text-[10px] text-amber-700 font-black uppercase tracking-widest">Code Generated</p>
                      <p className="text-4xl font-black text-amber-900 tracking-[0.3em] py-2">{tx.transferCode}</p>
                      <p className="text-[11px] text-amber-700 pt-1 font-bold">Copy this code and send it to the user.</p>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
