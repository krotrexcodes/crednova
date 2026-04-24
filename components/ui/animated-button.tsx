'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  hasGlow?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const AnimatedButton = React.forwardRef<
  HTMLButtonElement,
  AnimatedButtonProps
>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      hasGlow = true,
      icon,
      iconPosition = 'left',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed gap-2';

    const variantStyles = {
      primary: `bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg ${
        hasGlow ? 'shadow-lg shadow-purple-500/30' : ''
      }`,
      secondary:
        'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20',
      outline:
        'border-2 border-purple-500 text-purple-300 hover:bg-purple-500/10',
      ghost: 'text-gray-300 hover:bg-white/10',
      danger: 'bg-red-500 text-white hover:bg-red-600 hover:shadow-red-500/30',
      success: 'bg-green-500 text-white hover:bg-green-600 hover:shadow-green-500/30',
      glow: 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/50',
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        whileHover={!disabled ? { scale: 1.05 } : {}}
        whileTap={!disabled ? { scale: 0.95 } : {}}
        animate={variant === 'glow' ? {
          boxShadow: [
            '0 0 8px #7c3aed',
            '0 0 20px #3b82f6',
            '0 0 8px #7c3aed',
          ],
        } : {}}
        transition={variant === 'glow' ? { repeat: Infinity, duration: 2 } : {}}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <motion.div
              className='w-4 h-4 border-2 border-current border-t-transparent rounded-full'
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, linear: true }}
            />
            <span className='opacity-70'>Loading...</span>
          </>
        ) : (
          <>
            {icon && iconPosition === 'left' && (
              <motion.span
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {icon}
              </motion.span>
            )}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.span>
            {icon && iconPosition === 'right' && (
              <motion.span
                initial={{ opacity: 0, x: 4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {icon}
              </motion.span>
            )}
          </>
        )}
      </motion.button>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';
