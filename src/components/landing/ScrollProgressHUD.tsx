"use client";

import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollProgressHUD() {
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setShowBackToTop(latest > 350);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Pinned Top Golden Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-black/10 pointer-events-none">
        <motion.div
          style={{ scaleX }}
          className="h-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 origin-left shadow-[0_0_12px_rgba(245,158,11,0.6)]"
        />
      </div>

      {/* Floating Scroll to Top Pill */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-[#0e0f0c]/90 text-amber-400 border border-amber-500/30 backdrop-blur-md shadow-2xl hover:bg-[#181914] hover:scale-110 hover:border-amber-400 active:scale-95 transition-all group"
          >
            <ArrowUp size={18} className="group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
