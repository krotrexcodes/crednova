'use client';

import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { slideUp, scaleIn } from '@/lib/animations';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'sm' | 'md' | 'lg';
  hasGlow?: boolean;
  animate?: boolean;
  delay?: number;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      children,
      className,
      variant = 'md',
      hasGlow = true,
      animate = true,
      delay = 0,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      sm: 'backdrop-blur-[10px] rounded-lg p-4 border border-white/10',
      md: 'backdrop-blur-[16px] rounded-xl p-6 border border-white/10',
      lg: 'backdrop-blur-[20px] rounded-2xl p-8 border border-white/10',
    };

    const baseStyles =
      'bg-gradient-to-br from-white/[0.08] to-white/[0.02] shadow-lg';

    const glowStyles = hasGlow ? 'shadow-lg shadow-purple-500/20' : '';

    const combinedClassName = cn(baseStyles, variantStyles[variant], glowStyles, className);

    if (!animate) {
      return (
        <div ref={ref} className={combinedClassName} {...props}>
          {children}
        </div>
      );
    }

    return (
      <motion.div
        ref={ref}
        className={combinedClassName}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-100px' }}
        variants={slideUp}
        transition={{ delay }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = 'GlassCard';
