import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User as UserIcon, Loader2 } from "lucide-react";
import api from "@/lib/api";

interface Message {
  id: string;
  content: string;
  senderId: string;
  createdAt: string;
  sender: { name: string; role: string };
}

interface AdminChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string | null;
  userName: string | null;
}

export default function AdminChatPanel({ isOpen, onClose, userId, userName }: AdminChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchChat = async () => {
    if (!userId) return;
    try {
      const res = await api.get(`/chat/admin/${userId}`);
      if (res.data.data.chat?.messages) {
        setMessages(res.data.data.chat.messages);
      }
    } catch (error) {
      console.error("Failed to fetch chat:", error);
    }
  };

  useEffect(() => {
    if (isOpen && userId) {
      setIsLoading(true);
      fetchChat().finally(() => setIsLoading(false));
      
      const interval = setInterval(fetchChat, 3000);
      return () => clearInterval(interval);
    }
  }, [isOpen, userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !userId) return;

    setIsSending(true);
    try {
      const res = await api.post(`/chat/admin/${userId}`, { content: input });
      setMessages((prev) => [...prev, res.data.data.message]);
      setInput("");
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full md:w-[400px] bg-white border-l border-border shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <UserIcon size={20} />
                </div>
                <div>
                  <h3 className="font-black text-near-black">{userName || "Worker Chat"}</h3>
                  <p className="text-xs font-semibold text-muted">Direct Message</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors text-muted hover:text-near-black"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-bg-page/50">
              {isLoading ? (
                <div className="h-full flex items-center justify-center">
                  <Loader2 className="animate-spin text-muted" size={24} />
                </div>
              ) : messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-muted">
                  <UserIcon size={48} className="opacity-20 mb-3" />
                  <p className="text-sm font-semibold">No messages yet.</p>
                  <p className="text-xs">Send a code or instruction to start the chat.</p>
                </div>
              ) : (
                messages.map((msg) => {
                  const isAdmin = msg.sender.role === "ADMIN";
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col max-w-[85%] ${
                        isAdmin ? "ml-auto items-end" : "mr-auto items-start"
                      }`}
                    >
                      <span className="text-[10px] font-bold text-muted mb-1 px-1 uppercase">
                        {isAdmin ? "You" : msg.sender.name}
                      </span>
                      <div
                        className={`p-3 rounded-2xl text-sm font-medium ${
                          isAdmin
                            ? "bg-near-black text-white rounded-br-none"
                            : "bg-white border border-border text-near-black rounded-bl-none shadow-sm"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-border">
              <form onSubmit={handleSend} className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message or code..."
                  className="flex-1 bg-slate-50 border border-border rounded-full py-3 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-near-black"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isSending}
                  className="w-12 h-12 bg-near-black hover:bg-black text-white rounded-full flex items-center justify-center transition-colors disabled:opacity-50 cursor-pointer shrink-0 shadow-md"
                >
                  {isSending ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} className="ml-1" />}
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
