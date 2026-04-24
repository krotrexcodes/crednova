/**
 * Design system constants and tokens
 */

// Color Palette
export const COLORS = {
  bg: {
    primary: '#0f0f1e',
    secondary: '#1a1a2e',
    tertiary: '#252541',
  },
  accent: {
    purple: '#a855f7',
    purpleLight: '#c084fc',
    blue: '#3b82f6',
    blueLight: '#60a5fa',
    cyan: '#06b6d4',
  },
  text: {
    primary: '#ffffff',
    secondary: '#a0aec0',
    tertiary: '#718096',
  },
  glow: {
    purple: 'rgba(168, 85, 247, 0.3)',
    purpleStrong: 'rgba(168, 85, 247, 0.5)',
    blue: 'rgba(59, 130, 246, 0.3)',
  },
} as const;

// Gradients
export const GRADIENTS = {
  primary: 'linear-gradient(135deg, #a855f7, #3b82f6)',
  primaryHover: 'linear-gradient(135deg, #c084fc, #60a5fa)',
  text: 'linear-gradient(90deg, #a855f7, #3b82f6)',
} as const;

// Shadows
export const SHADOWS = {
  sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
  md: '0 4px 12px rgba(0, 0, 0, 0.15)',
  lg: '0 12px 24px rgba(0, 0, 0, 0.2)',
  glow: '0 0 20px rgba(168, 85, 247, 0.3)',
  glowStrong: '0 0 30px rgba(168, 85, 247, 0.5)',
} as const;

// Spacing
export const SPACING = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '40px',
} as const;

// Border Radius
export const RADIUS = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
} as const;

// Animation Duration (in milliseconds)
export const ANIMATION_DURATION = {
  fast: 150,
  base: 300,
  slow: 500,
  slower: 800,
} as const;

// Easing Functions
export const EASING = {
  easeOut: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  linear: 'linear',
} as const;

// Credit Score Ranges
export const CREDIT_SCORE_RANGES = {
  min: 300,
  max: 900,
  excellent: { min: 800, max: 900, label: 'Excellent' },
  good: { min: 700, max: 799, label: 'Good' },
  fair: { min: 600, max: 699, label: 'Fair' },
  poor: { min: 300, max: 599, label: 'Poor' },
} as const;

// Risk Level Colors
export const RISK_COLORS = {
  excellent: '#10b981',
  good: '#3b82f6',
  fair: '#f59e0b',
  poor: '#ef4444',
} as const;

// Navigation Items
export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
  { id: 'insights', label: 'Insights', href: '/insights', icon: 'BarChart3' },
  { id: 'simulator', label: 'Simulator', href: '/simulator', icon: 'Zap' },
  { id: 'settings', label: 'Settings', href: '/settings', icon: 'Settings' },
] as const;

// Suggested Loan Amounts
export const LOAN_SUGGESTIONS = [
  { amount: 50000, tenure: '12 months', emi: 4583 },
  { amount: 100000, tenure: '24 months', emi: 4583 },
  { amount: 250000, tenure: '36 months', emi: 7639 },
] as const;

// Gamification Levels
export const GAMIFICATION_LEVELS = [
  { level: 1, title: 'Newcomer', xp: 0, badge: '🌱' },
  { level: 2, title: 'Explorer', xp: 100, badge: '🔍' },
  { level: 3, title: 'Builder', xp: 300, badge: '🏗️' },
  { level: 4, title: 'Master', xp: 500, badge: '👑' },
] as const;

// Animation Presets for Reuse
export const ANIMATION_PRESETS = {
  countUpDuration: 1.5,
  circleProgressDuration: 1.5,
  barAnimationStagger: 0.1,
  containerDelayChildren: 0.2,
  containerStaggerChildren: 0.1,
} as const;

// Breakpoints (Tailwind defaults)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// API Endpoints (for future backend integration)
export const API_ENDPOINTS = {
  auth: '/api/auth',
  login: '/api/auth/login',
  verify: '/api/auth/verify',
  logout: '/api/auth/logout',
  score: '/api/score',
  insights: '/api/insights',
  suggestions: '/api/suggestions',
} as const;

// Feature Flags
export const FEATURES = {
  ruralMode: true,
  voiceGuide: true,
  darkModeOnly: true,
  mockData: true,
} as const;
