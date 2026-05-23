"use client";

import { motion } from "framer-motion";
import { User, Bell, Shield, Smartphone, Globe, HelpCircle } from "lucide-react";

const sections = [
  { icon: User, label: "Personal Information", desc: "Manage your profile and account details" },
  { icon: Bell, label: "Notifications", desc: "Choose what you want to be notified about" },
  { icon: Shield, label: "Privacy & Security", desc: "Control your data and account safety" },
  { icon: Smartphone, label: "Connected Devices", desc: "Manage devices where you are logged in" },
  { icon: Globe, label: "Language & Region", desc: "Set your preferred language and currency" },
  { icon: HelpCircle, label: "Help & Support", desc: "Get in touch with our team" },
];

export default function SettingsPage() {
  return (
    <div className="p-12 max-w-4xl mx-auto">
      <h1 className="font-section mb-16">Settings</h1>

      <div className="flex flex-col gap-4">
        {sections.map((section, i) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={section.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="wise-card flex items-center justify-between hover:bg-black/5 cursor-pointer group"
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-bg-mint flex items-center justify-center text-dark-green group-hover:scale-110 transition-transform">
                  <Icon size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-xl">{section.label}</h3>
                  <p className="text-muted font-semibold">{section.desc}</p>
                </div>
              </div>
              <ChevronRight size={24} className="text-muted group-hover:translate-x-1 transition-transform" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function ChevronRight({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
