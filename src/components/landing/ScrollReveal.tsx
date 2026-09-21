"use client";

import { motion, type Variants } from "framer-motion";
import React from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  scale?: number;
  blur?: boolean;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  direction = "up",
  distance = 36,
  scale = 1,
  blur = true,
  once = true,
}: ScrollRevealProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: distance };
      case "down":
        return { y: -distance };
      case "left":
        return { x: distance };
      case "right":
        return { x: -distance };
      case "none":
      default:
        return {};
    }
  };

  const variants: Variants = {
    hidden: {
      opacity: 0,
      scale: scale < 1 ? scale : 0.98,
      filter: blur ? "blur(6px)" : "blur(0px)",
      ...getInitialPosition(),
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Luxury cubic-bezier
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15, margin: "0px 0px -40px 0px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Staggered Container for child items (e.g. grids of cards)
export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
  delayChildren = 0.1,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
  once?: boolean;
}) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Staggered Item
export function StaggerItem({
  children,
  className = "",
  direction = "up",
  distance = 28,
  duration = 0.7,
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
}) {
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: distance };
      case "down":
        return { y: -distance };
      case "left":
        return { x: distance };
      case "right":
        return { x: -distance };
      case "none":
      default:
        return {};
    }
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.96,
      filter: "blur(4px)",
      ...getInitialPosition(),
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
