/**
 * Mock dashboard data
 */

export interface ScoreData {
  score: number;
  range: { min: number; max: number };
  riskLevel: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  aiConfidence: number;
  lastUpdated: string;
}

export interface Factor {
  factor: string;
  weight: number;
  impact: number;
}

export interface ScoreFactors {
  positive: Factor[];
  negative: Factor[];
}

export interface MonthlyData {
  month: string;
  score: number;
  timestamp: string;
}

export interface TrustScoreData {
  score: number;
  factors: {
    label: string;
    value: number;
    percentage: number;
  }[];
}

export interface UserProfile {
  name: string;
  income: number;
  incomeType: string;
  riskCategory: string;
  lastUpdated: string;
}

export interface ActivityEvent {
  id: string;
  action: string;
  timestamp: string;
  description: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'success' | 'warning' | 'info';
}

// Mock score data
export const MOCK_SCORE_DATA: ScoreData = {
  score: 745,
  range: { min: 300, max: 900 },
  riskLevel: 'Good',
  aiConfidence: 92,
  lastUpdated: new Date().toISOString(),
};

// Mock user profile
export const MOCK_USER_PROFILE: UserProfile = {
  name: 'Rajesh Kumar',
  income: 35000,
  incomeType: 'Self-employed',
  riskCategory: 'Low-Medium',
  lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
};

// Mock activity timeline
export const MOCK_ACTIVITY: ActivityEvent[] = [
  {
    id: '1',
    action: 'Score Checked',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    description: 'Your credit score was reviewed by AI engine',
  },
  {
    id: '2',
    action: 'Simulation Run',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    description: 'What-if scenario was executed',
  },
  {
    id: '3',
    action: 'Profile Updated',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Financial details were updated',
  },
  {
    id: '4',
    action: 'Loan Applied',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'New loan eligibility check performed',
  },
];

// Mock notifications
export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'Score Improved',
    message: 'Your credit score improved by 15 points this month!',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    read: false,
    type: 'success',
  },
  {
    id: '2',
    title: 'New Suggestion',
    message: 'You are now eligible for premium loans up to ₹50,000',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    read: false,
    type: 'info',
  },
  {
    id: '3',
    title: 'Action Required',
    message: 'Update your income details to get a more accurate score',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    type: 'warning',
  },
];

// Mock score factors
export const MOCK_SCORE_FACTORS: ScoreFactors = {
  positive: [
    { factor: 'Regular Income', weight: 25, impact: 8 },
    { factor: 'Payment History', weight: 20, impact: 7 },
    { factor: 'Account Age', weight: 15, impact: 5 },
    { factor: 'Low Debt Ratio', weight: 12, impact: 4 },
    { factor: 'Transaction Frequency', weight: 10, impact: 3 },
  ],
  negative: [
    { factor: 'High Spending', weight: 15, impact: -5 },
    { factor: 'Occasional Delays', weight: 8, impact: -3 },
    { factor: 'Credit Inquiries', weight: 5, impact: -2 },
  ],
};

// Mock monthly score history
export const MOCK_SCORE_HISTORY: MonthlyData[] = [
  { month: 'Jan', score: 680, timestamp: '2024-01-01' },
  { month: 'Feb', score: 695, timestamp: '2024-02-01' },
  { month: 'Mar', score: 710, timestamp: '2024-03-01' },
  { month: 'Apr', score: 725, timestamp: '2024-04-01' },
  { month: 'May', score: 738, timestamp: '2024-05-01' },
  { month: 'Jun', score: 745, timestamp: '2024-06-01' },
];

// Mock income vs expenses data
export const MOCK_INCOME_VS_EXPENSES = [
  { month: 'Jan', income: 45000, expenses: 32000 },
  { month: 'Feb', income: 45000, expenses: 33500 },
  { month: 'Mar', income: 48000, expenses: 31000 },
  { month: 'Apr', income: 45000, expenses: 34500 },
  { month: 'May', income: 50000, expenses: 33000 },
  { month: 'Jun', income: 45000, expenses: 32000 },
];

// Mock trust score
export const MOCK_TRUST_SCORE: TrustScoreData = {
  score: 78,
  factors: [
    { label: 'Verification', value: 95, percentage: 95 },
    { label: 'History', value: 85, percentage: 85 },
    { label: 'Stability', value: 72, percentage: 72 },
    { label: 'Compliance', value: 65, percentage: 65 },
  ],
};

// Mock suggestions
export const MOCK_SUGGESTIONS = [
  {
    id: 1,
    title: 'Increase Savings Rate',
    description:
      'Setting aside 20% of your income can boost your score by 15-20 points in 3 months.',
    impact: 'High',
    timeframe: '3 months',
    icon: '💰',
  },
  {
    id: 2,
    title: 'Reduce Credit Inquiries',
    description:
      'Avoid multiple credit applications within short periods to protect your creditworthiness.',
    impact: 'Medium',
    timeframe: '6 months',
    icon: '🔍',
  },
  {
    id: 3,
    title: 'Diversify Income Sources',
    description:
      'Having multiple income streams can significantly improve your credit profile.',
    impact: 'High',
    timeframe: '6 months',
    icon: '📊',
  },
  {
    id: 4,
    title: 'Set Up Auto-Pay',
    description:
      'Ensure all bills are paid on time with automatic payment schedules.',
    impact: 'Medium',
    timeframe: '1 month',
    icon: '⚙️',
  },
];

// Mock loan eligibility
export const MOCK_LOAN_ELIGIBILITY = {
  maxAmount: 500000,
  suggestedLoans: [
    {
      id: 1,
      amount: 50000,
      tenure: '12 months',
      emi: 4583,
      interestRate: 12,
      eligibility: 'eligible',
    },
    {
      id: 2,
      amount: 150000,
      tenure: '24 months',
      emi: 6875,
      interestRate: 12,
      eligibility: 'eligible',
    },
    {
      id: 3,
      amount: 300000,
      tenure: '36 months',
      emi: 9259,
      interestRate: 12,
      eligibility: 'eligible',
    },
  ],
};

// Mock gamification data
export const MOCK_GAMIFICATION = {
  currentLevel: 2,
  currentXP: 245,
  nextLevelXP: 500,
  levels: [
    { level: 1, title: 'Newcomer', xp: 0, badge: '🌱' },
    { level: 2, title: 'Explorer', xp: 100, badge: '🔍' },
    { level: 3, title: 'Builder', xp: 300, badge: '🏗️' },
    { level: 4, title: 'Master', xp: 500, badge: '👑' },
  ],
  achievements: [
    { id: 1, title: 'First Check', description: 'Completed your first score check', unlocked: true },
    { id: 2, title: 'Score Improvement', description: 'Improved your score by 50 points', unlocked: true },
    { id: 3, title: 'Consistent Tracker', description: 'Checked score 10 times', unlocked: false },
  ],
};

// Helper to get risk level color
export const getRiskLevelColor = (riskLevel: string): string => {
  switch (riskLevel) {
    case 'Excellent':
      return '#10b981';
    case 'Good':
      return '#3b82f6';
    case 'Fair':
      return '#f59e0b';
    case 'Poor':
      return '#ef4444';
    default:
      return '#a0aec0';
  }
};

// Helper to get risk level emoji
export const getRiskLevelEmoji = (riskLevel: string): string => {
  switch (riskLevel) {
    case 'Excellent':
      return '⭐';
    case 'Good':
      return '✅';
    case 'Fair':
      return '⚠️';
    case 'Poor':
      return '❌';
    default:
      return '❓';
  }
};
