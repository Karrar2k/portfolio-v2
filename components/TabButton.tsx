"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";

type TabButtonProps = {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
};

export default function TabButton({ active, onClick, children }: TabButtonProps) {  return (
    <button
      onClick={onClick}
      className={`relative px-6 py-3 text-lg instrument-sans transition-colors ${
        active 
          ? "text-white" 
          : "text-gray-400 dark:hover:text-gray-300 hover:text-fuchsia-300"
      }`}
    >
      {children}
      
      {/* Underline animation */}
      {active && (
        <motion.div
          layoutId="activeTab"
          className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--accent-color)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </button>
  );
}
