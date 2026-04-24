'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlowButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function GlowButton({ children, onClick, className = '' }: GlowButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      animate={{
        boxShadow: [
          '0 0 8px #7c3aed',
          '0 0 20px #3b82f6',
          '0 0 8px #7c3aed',
        ],
      }}
      transition={{ repeat: Infinity, duration: 2 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      className={`px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold transition-all ${className}`}
    >
      {children}
    </motion.button>
  );
}
