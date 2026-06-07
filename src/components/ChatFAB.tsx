"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ChatWindow from "./ChatWindow";
import { useAuthStore } from "@/lib/store";
import api from "@/lib/api";

export default function ChatFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated } = useAuthStore();
  const [hasUnread, setHasUnread] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || user?.role === "ADMIN") return;

    const checkForUnread = async () => {
      try {
        const res = await api.get("/chat/my-chat");
        const messages = res.data.data.chat?.messages;
        if (messages && messages.length > 0) {
          const lastMsg = messages[messages.length - 1];
          const lastReadId = localStorage.getItem("aureus_last_read_msg");

          // If the last message is from Admin and we haven't read it yet
          if (lastMsg.sender.role === "ADMIN" && lastMsg.id !== lastReadId) {
            setHasUnread(true);
          }
        }
      } catch (error) {
        // Silently fail polling
      }
    };

    checkForUnread();
    const interval = setInterval(checkForUnread, 5000);
    return () => clearInterval(interval);
  }, [isAuthenticated, user?.role, isOpen]);

  // When opening the chat, clear the unread indicator
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      // Mark as read by fetching latest and saving ID
      api.get("/chat/my-chat").then((res) => {
        const messages = res.data.data.chat?.messages;
        if (messages && messages.length > 0) {
          localStorage.setItem("aureus_last_read_msg", messages[messages.length - 1].id);
        }
      });
    }
  }, [isOpen]);

  // Don't show for admins or if not logged in
  if (!isAuthenticated || user?.role === "ADMIN") return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-2"
          >
            <ChatWindow onClose={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-amber-500 text-amber-950 p-4 rounded-full shadow-2xl flex items-center justify-center relative cursor-pointer"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
        
        {/* Pulsing Red Dot for Unread Messages */}
        {hasUnread && !isOpen && (
          <span className="absolute top-0 right-0 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-600 border-2 border-near-black"></span>
          </span>
        )}
      </motion.button>
    </div>
  );
}
