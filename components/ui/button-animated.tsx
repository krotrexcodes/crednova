'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export function ButtonAnimated({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  fullWidth = false,
  disabled = false,
  onClick,
  className = '',
}: ButtonProps) {
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const variants = {
    primary:
      'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg hover:shadow-purple-500/40',
    secondary:
      'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20',
    outline:
      'border border-purple-400 text-purple-400 hover:bg-purple-500/10',
    ghost:
      'text-gray-300 hover:bg-white/10',
    danger:
      'bg-red-500 text-white hover:bg-red-600',
    success:
      'bg-green-500 text-white hover:bg-green-600',
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={`
        ${sizes[size]} 
        ${variants[variant]} 
        ${fullWidth ? 'w-full' : ''}
        flex items-center justify-center gap-2
        rounded-full font-semibold transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {icon && <span>{icon}</span>}
      {children}
    </motion.button>
  );
}
