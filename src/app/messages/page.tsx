"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User as UserIcon, Loader2, ShieldCheck, MessageSquare } from "lucide-react";
import api from "@/lib/api";
import { useAuthStore } from "@/lib/store";

interface Message {
  id: string;
  content: string;
  senderId: string;
  createdAt: string;
  sender: { name: string; role: string };
}

export default function MessagesPage() {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchChat = async () => {
    try {
      const res = await api.get("/chat");
      if (res.data.data.chat?.messages) {
        setMessages(res.data.data.chat.messages);
      }
    } catch (error) {
      console.error("Failed to fetch chat:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChat();
    const interval = setInterval(fetchChat, 3000); // Real-time polling
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsSending(true);
    try {
      const res = await api.post("/chat", { content: input });
      setMessages((prev) => [...prev, res.data.data.message]);
      setInput("");
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-120px)] md:h-[calc(100vh-80px)] flex flex-col pt-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex items-center justify-between"
      >
        <div>
          <h1 className="font-section text-3xl md:text-4xl font-black text-near-black flex items-center gap-3">
            <MessageSquare className="text-amber-500" size={36} />
            Messages
          </h1>
          <p className="text-muted font-medium mt-1">
            Direct secure communication with Admin Support.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex-1 bg-white rounded-[32px] border border-border shadow-sm flex flex-col overflow-hidden relative"
      >
        {/* Chat Header */}
        <div className="p-4 border-b border-border bg-slate-50 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h3 className="font-black text-near-black text-lg">Admin Support</h3>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-green-600">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Online
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-bg-page/30">
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <Loader2 className="animate-spin text-muted" size={32} />
            </div>
          ) : messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-muted">
              <ShieldCheck size={64} className="opacity-20 mb-4" />
              <p className="text-lg font-black text-near-black">Start a conversation</p>
              <p className="text-sm font-semibold max-w-sm text-center mt-2">
                Send a message to Support or wait for instructions/transfer codes.
              </p>
            </div>
          ) : (
            messages.map((msg) => {
              const isMe = msg.sender.role === "USER";
              return (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id}
                  className={`flex flex-col max-w-[80%] ${
                    isMe ? "ml-auto items-end" : "mr-auto items-start"
                  }`}
                >
                  <span className="text-[11px] font-bold text-muted mb-1 px-1 uppercase tracking-wider">
                    {isMe ? "You" : "Admin Support"}
                  </span>
                  <div
                    className={`p-4 rounded-[20px] text-[15px] font-medium leading-relaxed ${
                      isMe
                        ? "bg-amber-500 text-amber-950 rounded-br-none shadow-sm border border-green-200"
                        : "bg-white border border-border text-near-black rounded-bl-none shadow-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                  <span className="text-[9px] font-bold text-muted/60 mt-1 px-1">
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </motion.div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-border">
          <form onSubmit={handleSend} className="flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-slate-50 border border-border rounded-full py-4 px-6 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || isSending}
              className="w-14 h-14 bg-near-black hover:bg-black text-white rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 cursor-pointer shadow-md shrink-0"
            >
              {isSending ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} className="ml-1" />}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
