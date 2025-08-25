"use client";
import React from "react";
import { motion } from "framer-motion";

const itemVariants = [
  {
    initial: { opacity: 0, x: -40, rotate: -4 },
    animate: { opacity: 1, x: 0, rotate: 0 },
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
  {
    initial: { opacity: 0, y: 40, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.6, ease: "easeOut" as const, delay: 0.05 },
  },
  {
    initial: { opacity: 0, x: 40, rotate: 4 },
    animate: { opacity: 1, x: 0, rotate: 0 },
    transition: { duration: 0.6, ease: "easeOut" as const, delay: 0.1 },
  },
];

export default function ThreeColMotion({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const items = React.Children.toArray(children);
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${className}`}>
      {items.slice(0, 3).map((child, idx) => {
        const v = itemVariants[idx] ?? itemVariants[1];
        return (
          <motion.div
            key={idx}
            initial={v.initial}
            whileInView={v.animate}
            transition={v.transition}
            viewport={{ once: true, amount: 0.3 }}
          >
            {child}
          </motion.div>
        );
      })}
      {items.slice(3).map((child, idx) => (
        <motion.div
          key={`rest-${idx}`}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" as const, delay: 0.05 * (idx + 1) }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
} 