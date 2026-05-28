"use client";

import { useState, useEffect } from "react";
import { Loader2, User, MessageSquare, ChevronLeft } from "lucide-react";
import api from "@/lib/api";
import ChatWindow from "@/components/ChatWindow";

interface Chat {
  id: string;
  userId: string;
  user: {
    name: string;
    email: string;
    role: string;
  };
  messages: {
    content: string;
    createdAt: string;
  }[];
  updatedAt: string;
}

export default function AdminChatPage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileChat, setShowMobileChat] = useState(false);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        setIsLoading(true);
        const res = await api.get("/chat/admin/all");
        setChats(res.data.data.chats);
        // On desktop, select the first chat if none selected
        if (typeof window !== 'undefined' && window.innerWidth >= 768 && res.data.data.chats.length > 0 && !selectedChatId) {
          setSelectedChatId(res.data.data.chats[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch chats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChats();
    const interval = setInterval(fetchChats, 10000); // Refresh list every 10 seconds
    return () => clearInterval(interval);
  }, [selectedChatId]);

  const handleSelectChat = (id: string) => {
    setSelectedChatId(id);
    setShowMobileChat(true);
  };

  if (isLoading && chats.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-wise-green" size={48} />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-bg-page overflow-hidden relative">
      {/* Chat List - Hidden on mobile when chat is open */}
      <div className={`w-full md:w-1/3 border-r border-border flex flex-col bg-white transition-all duration-300 ${
        showMobileChat ? "hidden md:flex" : "flex"
      }`}>
        <div className="p-4 md:p-6 border-b border-border flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-black">Customer Care</h1>
        </div>
        <div className="flex-1 overflow-y-auto">
          {chats.length === 0 ? (
            <div className="p-8 text-center text-muted font-bold">
              No active chats found.
            </div>
          ) : (
            chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => handleSelectChat(chat.id)}
                className={`w-full text-left p-4 md:p-6 border-b border-border transition-colors hover:bg-bg-page ${
                  selectedChatId === chat.id ? "bg-bg-mint" : ""
                }`}
              >
                <div className="flex items-center gap-3 md:gap-4 mb-2">
                  <div className="w-10 h-10 rounded-full bg-near-black flex items-center justify-center text-wise-green font-black flex-shrink-0">
                    {chat.user.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base md:text-lg truncate">{chat.user.name}</h3>
                    <p className="text-xs md:text-sm text-muted font-semibold truncate">{chat.user.email}</p>
                  </div>
                </div>
                {chat.messages.length > 0 && (
                  <p className="text-sm font-semibold text-near-black line-clamp-1 opacity-70">
                    {chat.messages[0].content}
                  </p>
                )}
                <p className="text-[10px] uppercase tracking-widest font-bold text-muted mt-2">
                  {new Date(chat.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Chat Area - Full screen on mobile when active */}
      <div className={`flex-1 flex flex-col bg-bg-page transition-all duration-300 ${
        !showMobileChat ? "hidden md:flex" : "flex"
      }`}>
        {selectedChatId ? (
          <div className="flex-1 flex flex-col h-full relative">
            {/* Mobile Back Button Overlay */}
            <button 
              onClick={() => setShowMobileChat(false)}
              className="md:hidden absolute top-4 left-4 z-[60] bg-near-black/50 hover:bg-near-black/70 p-1 rounded-full text-white backdrop-blur-sm"
            >
              <ChevronLeft size={24} />
            </button>
            <ChatWindow chatId={selectedChatId} isAdmin={true} />
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 md:p-12">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-bg-mint rounded-full flex items-center justify-center text-wise-green mb-6">
              <MessageSquare size={40} />
            </div>
            <h2 className="text-2xl md:text-3xl font-black mb-4">No chat selected</h2>
            <p className="text-lg md:text-xl text-muted font-semibold max-w-md">
              Select a conversation from the left to start replying to customer queries.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
