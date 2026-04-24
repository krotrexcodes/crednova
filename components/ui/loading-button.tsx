'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface LoadingButtonProps {
  loading: boolean;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function LoadingButton({
  loading,
  children,
  onClick,
  disabled = false,
  className = '',
}: LoadingButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled || loading ? 1 : 1.05 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
      className={`px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white flex items-center justify-center gap-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all ${className}`}
    >
      {loading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, easing: 'linear' }}
          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
        />
      )}
      {children}
    </motion.button>
  );
}
