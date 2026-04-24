import { Variants } from 'framer-motion';

/**
 * Reusable Framer Motion animation presets for consistent motion across the app
 */

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

export const slideUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export const slideDown: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export const slideLeft: Variants = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export const slideRight: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

export const scaleInLarge: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export const pageTransition: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

export const buttonHover = {
  scale: 1.05,
  transition: {
    duration: 0.2,
  },
};

export const buttonTap = {
  scale: 0.95,
  transition: {
    duration: 0.1,
  },
};

export const glowPulse: Variants = {
  initial: {
    boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)',
  },
  animate: {
    boxShadow: [
      '0 0 20px rgba(168, 85, 247, 0.3)',
      '0 0 40px rgba(168, 85, 247, 0.6)',
      '0 0 20px rgba(168, 85, 247, 0.3)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
    },
  },
};

export const rotateIn: Variants = {
  hidden: {
    opacity: 0,
    rotate: -10,
  },
  visible: {
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export const flipIn: Variants = {
  hidden: {
    opacity: 0,
    rotateY: 90,
  },
  visible: {
    opacity: 1,
    rotateY: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

/**
 * Bar animation for chart/list items - width animation from 0 to 100%
 */
export const barAnimationVariants = (index: number): Variants => ({
  hidden: {
    width: 0,
    opacity: 0,
  },
  visible: {
    width: '100%',
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      delay: index * 0.1,
    },
  },
});

/**
 * Circle progress animation for circular progress meters
 */
export const circleProgressVariants: Variants = {
  hidden: {
    strokeDashoffset: 502,
  },
  visible: {
    strokeDashoffset: 0,
    transition: {
      duration: 1.5,
      ease: 'easeOut',
    },
  },
};

/**
 * Number counter animation - use with useMotionValue and useTransform
 */
export const numberCounterVariants = (duration: number = 1.5): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration,
      ease: 'easeOut',
    },
  },
});

/**
 * Staggered list animation for lists of items
 */
export const staggeredListVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggeredItemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

/**
 * Tooltip/popover animation
 */
export const popoverVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: -10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};

/**
 * Modal/dialog animation
 */
export const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

/**
 * Loading spinner animation
 */
export const spinnerVariants: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

/**
 * Pulse animation for loading states
 */
export const pulseVariants: Variants = {
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/**
 * Shimmer animation for skeleton loaders
 */
export const shimmerVariants: Variants = {
  animate: {
    backgroundPosition: ['200% 0%', '-200% 0%'],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};
