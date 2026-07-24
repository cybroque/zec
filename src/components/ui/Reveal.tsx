"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  once?: boolean;
}

export default function Reveal({
  children,
  delay = 0,
  duration = 0.4,
  direction = "up",
  className = "",
  once = true,
}: RevealProps) {
  // Define variants based on direction
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 16 : direction === "down" ? -16 : 0,
      x: direction === "left" ? 16 : direction === "right" ? -16 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98] as const,
      },
    },
  };

  if (direction === "none") {
    variants.hidden = { opacity: 0, y: 0, x: 0 };
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.05, margin: "0px 0px -40px 0px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
