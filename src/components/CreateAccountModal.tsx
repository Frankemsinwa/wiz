"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, DollarSign, Loader2, Shield, Copy, Check, Camera, Image as ImageIcon } from "lucide-react";
import api from "@/lib/api";

interface CreateAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void | Promise<void>;
}

export default function CreateAccountModal({ isOpen, onClose, onSuccess }: CreateAccountModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [balance, setBalance] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    name: string, 
    account: string,
    email: string,
    pass: string
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError("");

    try {
      // 1. Get signature from backend
      const sigResponse = await api.get("/admin/cloudinary-signature");
      const { signature, timestamp, cloudName, apiKey, folder } = sigResponse.data.data;

      // 2. Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
      formData.append("folder", folder);

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await uploadResponse.json();
      if (data.secure_url) {
        setProfilePic(data.secure_url);
      } else {
        throw new Error("Upload failed");
      }
    } catch (err) {
      setError("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    try {
      const response = await api.post("/admin/users", {
        name,
        email,
        password,
        role: "WORKER",
        initialBalance: parseFloat(balance) || 0,
        currency,
        profilePic
      });
      
      const { user: newUser, account, credentials } = response.data.data;
      setSuccessData({
        name: newUser.name,
        account: account.id,
        email: credentials.email,
        pass: credentials.password
      });
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create sub-account");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setPassword("");
    setBalance("");
    setCurrency("USD");
    setProfilePic(null);
    setError("");
    setSuccessData(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-near-black/60 backdrop-blur-sm" onClick={successData ? undefined : onClose} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-[32px] w-full max-w-lg shadow-2xl overflow-hidden relative z-10"
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-section text-2xl">Create Sub-Account</h2>
          {!successData && (
            <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
              <X size={24} />
            </button>
          )}
        </div>

        <div className="p-6 md:p-8">
          {error && (
            <div className="mb-6 p-4 bg-negative/10 text-negative rounded-xl font-bold text-sm text-center">
              {error}
            </div>
          )}

          {successData ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-positive/20 text-positive rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield size={32} />
              </div>
              <h3 className="text-3xl font-black mb-1">Account Created</h3>
              <p className="text-muted font-bold mb-6">Securely hand these credentials to {successData.name}.</p>
              
              <div className="bg-bg-page border border-border rounded-2xl p-5 mb-8 text-left space-y-4">
                <div className="relative group">
                  <label className="text-muted font-bold text-[10px] uppercase tracking-widest block mb-0.5">Account ID</label>
                  <p className="font-mono text-sm font-black break-all pr-8">{successData.account}</p>
                  <button onClick={() => handleCopy(successData.account, 'id')} className="absolute right-0 bottom-0 p-1 text-muted hover:text-amber-500">
                    {copied === 'id' ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
                <div className="h-px bg-border" />
                <div className="relative group">
                  <label className="text-muted font-bold text-[10px] uppercase tracking-widest block mb-0.5">Email Address</label>
                  <p className="font-bold text-lg pr-8">{successData.email}</p>
                  <button onClick={() => handleCopy(successData.email, 'email')} className="absolute right-0 bottom-1 p-1 text-muted hover:text-amber-500">
                    {copied === 'email' ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
                <div className="relative group">
                  <label className="text-muted font-bold text-[10px] uppercase tracking-widest block mb-0.5">Password</label>
                  <p className="font-mono font-black text-lg tracking-wider pr-8">{successData.pass}</p>
                  <button onClick={() => handleCopy(successData.pass, 'pass')} className="absolute right-0 bottom-1 p-1 text-muted hover:text-amber-500">
                    {copied === 'pass' ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>

              <button 
                onClick={handleReset}
                className="w-full wise-pill wise-pill-primary py-4 text-xl"
              >
                Done
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Profile Pic Upload */}
              <div className="flex flex-col items-center gap-3 mb-6">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-24 h-24 rounded-full bg-bg-page border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:border-amber-500 transition-all relative overflow-hidden group"
                >
                  {profilePic ? (
                    <img src={profilePic} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center text-muted group-hover:text-amber-500">
                      {isUploading ? <Loader2 className="animate-spin" size={24} /> : <Camera size={24} />}
                      <span className="text-[10px] font-bold mt-1">Upload Photo</span>
                    </div>
                  )}
                  {profilePic && !isUploading && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="text-white" size={20} />
                    </div>
                  )}
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  className="hidden" 
                  accept="image/*"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-near-black font-bold text-sm ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-bg-page border border-border rounded-2xl py-3.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-amber-500 font-bold text-base"
                    placeholder="e.g. John Doe"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-near-black font-bold text-sm ml-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-bg-page border border-border rounded-2xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-amber-500 font-bold text-base"
                  placeholder="worker@aureus.com"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-near-black font-bold text-sm ml-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-bg-page border border-border rounded-2xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-amber-500 font-bold text-base"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-near-black font-bold text-sm ml-1">Initial Balance</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted font-bold text-lg">$</span>
                  <input
                    type="number"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    className="w-full bg-bg-page border border-border rounded-2xl py-3.5 pl-11 pr-24 focus:outline-none focus:ring-2 focus:ring-amber-500 font-bold text-base"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                  />
                  <select 
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent font-bold text-near-black focus:outline-none cursor-pointer text-sm"
                  >
                    <option value="USD">USD</option>
                    <option value="GBP">GBP</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full wise-pill wise-pill-primary py-4 text-lg mt-2 flex items-center justify-center gap-2"
              >
                {isSubmitting ? <Loader2 className="animate-spin" size={22} /> : "Provision Account"}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
