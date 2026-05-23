"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "@/lib/store";
import { Lock, Mail, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error: authError, isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
    } catch (err) {
      // Error is handled by the store
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    }
  }, [isAuthenticated, user, router]);

  return (
    <div className="fixed inset-0 bg-near-black z-50 flex items-center justify-center p-6">
      {/* Premium Background Accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-wise-green/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] bg-white/5 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[32px] p-8 md:p-10 shadow-2xl relative z-10"
      >
        <div className="mb-12 text-center">
          <h1 className="text-wise-green text-5xl font-black tracking-tighter mb-4">Wiz.</h1>
          <p className="text-muted font-bold text-lg">Money without borders</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {authError && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-negative/10 text-negative p-4 rounded-xl font-bold text-sm text-center"
            >
              {authError}
            </motion.div>
          )}
          
          <div className="space-y-2">
            <label className="text-near-black font-bold ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-bg-page border border-border rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-wise-green font-bold text-lg transition-all"
                placeholder="Enter email address"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-near-black font-bold ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-bg-page border border-border rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-wise-green font-bold text-lg transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full wise-pill wise-pill-primary py-4 text-xl mt-4 flex items-center justify-center gap-2 disabled:opacity-70 active:scale-[0.98] transition-transform"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              "Access Account"
            )}
          </button>
        </form>

        <p className="text-center text-muted font-semibold mt-8 text-sm">
          Secured by Wiz Enterprise Encryption
        </p>
      </motion.div>
    </div>
  );
}
