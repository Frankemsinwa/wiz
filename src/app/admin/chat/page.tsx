"use client";

import { useState, useEffect } from "react";
import { Loader2, User, MessageSquare } from "lucide-react";
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

  useEffect(() => {
    const fetchChats = async () => {
      try {
        setIsLoading(true);
        const res = await api.get("/chat/admin/all");
        setChats(res.data.data.chats);
        if (res.data.data.chats.length > 0 && !selectedChatId) {
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

  if (isLoading && chats.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-wise-green" size={48} />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-bg-page overflow-hidden">
      {/* Chat List */}
      <div className="w-1/3 border-r border-border flex flex-col bg-white">
        <div className="p-6 border-b border-border">
          <h1 className="text-3xl font-black">Customer Care</h1>
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
                onClick={() => setSelectedChatId(chat.id)}
                className={`w-full text-left p-6 border-b border-border transition-colors hover:bg-bg-page ${
                  selectedChatId === chat.id ? "bg-bg-mint" : ""
                }`}
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 rounded-full bg-near-black flex items-center justify-center text-wise-green font-black">
                    {chat.user.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg truncate">{chat.user.name}</h3>
                    <p className="text-sm text-muted font-semibold truncate">{chat.user.email}</p>
                  </div>
                </div>
                {chat.messages.length > 0 && (
                  <p className="text-sm font-semibold text-near-black line-clamp-1 opacity-70">
                    {chat.messages[0].content}
                  </p>
                )}
                <p className="text-[10px] uppercase tracking-widest font-bold text-muted mt-2">
                  Last active: {new Date(chat.updatedAt).toLocaleTimeString()}
                </p>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChatId ? (
          <ChatWindow chatId={selectedChatId} isAdmin={true} />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
            <div className="w-24 h-24 bg-bg-mint rounded-full flex items-center justify-center text-wise-green mb-6">
              <MessageSquare size={48} />
            </div>
            <h2 className="text-3xl font-black mb-4">No chat selected</h2>
            <p className="text-xl text-muted font-semibold max-w-md">
              Select a conversation from the left to start replying to customer queries.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
