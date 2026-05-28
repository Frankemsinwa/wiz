"use client";

import { useState, useEffect, useRef } from "react";
import { Send, X, Loader2, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/api";
import { useAuthStore } from "@/lib/store";

interface Message {
  id: string;
  content: string;
  senderId: string;
  createdAt: string;
  sender: {
    name: string;
    role: string;
  };
}

interface ChatWindowProps {
  chatId?: string;
  isAdmin?: boolean;
  onClose?: () => void;
}

export default function ChatWindow({ chatId, isAdmin = false, onClose }: ChatWindowProps) {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(chatId || null);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchChat = async () => {
      try {
        setIsLoading(true);
        if (isAdmin && chatId) {
          const res = await api.get(`/chat/${chatId}/messages`);
          setMessages(res.data.data.messages);
          setActiveChatId(chatId);
        } else if (!isAdmin) {
          const res = await api.get("/chat/my-chat");
          setMessages(res.data.data.chat.messages);
          setActiveChatId(res.data.data.chat.id);
        }
      } catch (error) {
        console.error("Failed to fetch chat:", error);
      } finally {
        setIsLoading(false);
        setTimeout(scrollToBottom, 100);
      }
    };

    fetchChat();

    // Poll for new messages every 5 seconds
    const interval = setInterval(async () => {
      if (!activeChatId) return;
      try {
        const res = await api.get(`/chat/${activeChatId}/messages`);
        setMessages(res.data.data.messages);
      } catch (error) {
        console.error("Failed to poll messages:", error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [chatId, isAdmin, activeChatId]);

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChatId || isSending) return;

    try {
      setIsSending(true);
      const res = await api.post(`/chat/${activeChatId}/messages`, {
        content: newMessage.trim()
      });
      setMessages([...messages, res.data.data.message]);
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className={`flex flex-col bg-white border border-border shadow-2xl overflow-hidden ${isAdmin ? "h-full rounded-none" : "w-[350px] h-[500px] rounded-3xl"}`}>
      {/* Header */}
      <div className="bg-near-black p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-wise-green flex items-center justify-center text-dark-green">
            <User size={18} />
          </div>
          <span className="text-white font-bold">{isAdmin ? "Customer Support" : "Wiz Support"}</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
            <X size={20} />
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-bg-page">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <Loader2 className="animate-spin text-wise-green" />
          </div>
        ) : (
          <>
            {messages.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted font-semibold">How can we help you today?</p>
              </div>
            )}
            {messages.map((msg) => {
              const isMe = msg.senderId === user?.id;
              return (
                <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl font-semibold text-sm ${
                    isMe
                      ? "bg-wise-green text-dark-green rounded-tr-none"
                      : "bg-white border border-border text-near-black rounded-tl-none"
                  }`}>
                    {!isMe && <p className="text-[10px] uppercase tracking-wider opacity-60 mb-1">{msg.sender.name}</p>}
                    {msg.content}
                    <p className={`text-[10px] mt-1 opacity-60 ${isMe ? "text-right" : "text-left"}`}>
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-border flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-bg-page border border-border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-wise-green font-semibold text-sm"
        />
        <button
          type="submit"
          disabled={!newMessage.trim() || isSending}
          className="bg-wise-green text-dark-green p-2 rounded-full disabled:opacity-50 hover:scale-110 transition-transform"
        >
          {isSending ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
        </button>
      </form>
    </div>
  );
}
