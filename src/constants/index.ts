/**
 * Constants for FinanceFlow application
 * Color palette, transaction types, and default configurations
 */

/**
 * Color Palette - Professional Finance Theme
 * Primary: Sky Blue (modern, trustworthy)
 * Success: Emerald Green (positive outcomes)
 * Warning: Amber (attention needed)
 * Danger: Red (critical alerts)
 * Neutral: Slate (text, backgrounds)
 */
export const COLOR_PALETTE = {
  // Primary - Sky Blue (Trust & Technology)
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c3d66',
  },
  
  // Success - Emerald Green (Positive outcomes)
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#0f2618',
  },

  // Warning - Amber (Attention needed)
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },

  // Danger - Rose Red (Critical alerts)
  danger: {
    50: '#fff5f5',
    100: '#ffe7e7',
    200: '#ffcccc',
    300: '#ff9999',
    400: '#ff6666',
    500: '#ff3333',
    600: '#e63946',
    700: '#d62828',
    800: '#a4161a',
    900: '#370617',
  },

  // Neutral - Slate (Text & backgrounds)
  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },

  // Info - Sky (Additional info)
  info: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
  },
};

/**
 * Transaction modes (payment methods)
 */
export const TRANSACTION_MODES = [
  { id: 'cash', label: 'Cash', icon: '💵', color: COLOR_PALETTE.success[500] },
  { id: 'card', label: 'Credit/Debit Card', icon: '💳', color: COLOR_PALETTE.primary[500] },
  { id: 'bank_transfer', label: 'Bank Transfer', icon: '🏦', color: COLOR_PALETTE.info[600] },
  { id: 'upi', label: 'UPI', icon: '📱', color: COLOR_PALETTE.primary[600] },
  { id: 'cheque', label: 'Cheque', icon: '📝', color: COLOR_PALETTE.neutral[600] },
  { id: 'other', label: 'Other', icon: '❓', color: COLOR_PALETTE.neutral[500] },
];

/**
 * Transaction types
 */
export const TRANSACTION_TYPES = [
  { id: 'expense', label: 'Expense', icon: '💸', color: COLOR_PALETTE.danger[500] },
  { id: 'income', label: 'Income', icon: '💰', color: COLOR_PALETTE.success[500] },
  { id: 'investment', label: 'Investment', icon: '📈', color: COLOR_PALETTE.primary[500] },
];

/**
 * Recurrence types
 */
export const RECURRENCE_TYPES = [
  { id: 'none', label: 'No Repeat' },
  { id: 'daily', label: 'Daily' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'monthly', label: 'Monthly' },
  { id: 'yearly', label: 'Yearly' },
];

/**
 * Default expense categories
 */
export const DEFAULT_CATEGORIES = [
  {
    name: 'Food & Dining',
    icon: '🍔',
    type: 'expense' as const,
    color: COLOR_PALETTE.warning[500],
  },
  {
    name: 'Transportation',
    icon: '🚗',
    type: 'expense' as const,
    color: COLOR_PALETTE.danger[500],
  },
  {
    name: 'Shopping',
    icon: '🛍️',
    type: 'expense' as const,
    color: COLOR_PALETTE.primary[400],
  },
  {
    name: 'Entertainment',
    icon: '🎬',
    type: 'expense' as const,
    color: COLOR_PALETTE.info[600],
  },
  {
    name: 'Utilities',
    icon: '💡',
    type: 'expense' as const,
    color: COLOR_PALETTE.warning[600],
  },
  {
    name: 'Healthcare',
    icon: '⚕️',
    type: 'expense' as const,
    color: COLOR_PALETTE.danger[600],
  },
  {
    name: 'Education',
    icon: '📚',
    type: 'expense' as const,
    color: COLOR_PALETTE.primary[500],
  },
  {
    name: 'Travel',
    icon: '✈️',
    type: 'expense' as const,
    color: COLOR_PALETTE.primary[600],
  },
  {
    name: 'Other',
    icon: '📌',
    type: 'expense' as const,
    color: COLOR_PALETTE.neutral[500],
  },
  {
    name: 'Salary',
    icon: '💼',
    type: 'income' as const,
    color: COLOR_PALETTE.success[600],
  },
  {
    name: 'Freelance',
    icon: '💻',
    type: 'income' as const,
    color: COLOR_PALETTE.success[500],
  },
  {
    name: 'Investment Returns',
    icon: '📈',
    type: 'income' as const,
    color: COLOR_PALETTE.success[700],
  },
  {
    name: 'Stocks',
    icon: '📊',
    type: 'investment' as const,
    color: COLOR_PALETTE.primary[500],
  },
  {
    name: 'Bonds',
    icon: '🏛️',
    type: 'investment' as const,
    color: COLOR_PALETTE.info[600],
  },
  {
    name: 'Real Estate',
    icon: '🏠',
    type: 'investment' as const,
    color: COLOR_PALETTE.warning[600],
  },
  {
    name: 'Savings',
    icon: '🏦',
    type: 'investment' as const,
    color: COLOR_PALETTE.success[600],
  },
];

/**
 * Default budgets
 */
export const DEFAULT_BUDGETS = [
  { categoryName: 'Food & Dining', limit: 500, period: 'monthly' as const },
  { categoryName: 'Transportation', limit: 300, period: 'monthly' as const },
  { categoryName: 'Entertainment', limit: 200, period: 'monthly' as const },
  { categoryName: 'Shopping', limit: 400, period: 'monthly' as const },
  { categoryName: 'Utilities', limit: 250, period: 'monthly' as const },
];

/**
 * Date formats
 */
export const DATE_FORMATS = [
  { id: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
  { id: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
  { id: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
];

/**
 * Currencies
 */
export const CURRENCIES = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
];

/**
 * Default user preferences
 */
export const DEFAULT_USER_PREFERENCES = {
  currency: 'INR',
  dateFormat: 'DD/MM/YYYY',
  theme: 'auto' as const,
  language: 'en',
  budgetAlertThreshold: 80, // Alert when 80% of budget is spent
};

/**
 * Analytics intervals
 */
export const ANALYTICS_INTERVALS = [
  { id: 'weekly', label: 'Weekly' },
  { id: 'monthly', label: 'Monthly' },
  { id: 'quarterly', label: 'Quarterly' },
  { id: 'yearly', label: 'Yearly' },
];

/**
 * Chart colors (optimized for charts)
 */
export const CHART_COLORS = [
  COLOR_PALETTE.primary[500],
  COLOR_PALETTE.success[500],
  COLOR_PALETTE.warning[500],
  COLOR_PALETTE.danger[500],
  COLOR_PALETTE.info[600],
  COLOR_PALETTE.primary[600],
  COLOR_PALETTE.success[600],
  COLOR_PALETTE.warning[600],
];

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
  USER: 'ff_user',
  AUTH_TOKEN: 'ff_auth_token',
  REFRESH_TOKEN: 'ff_refresh_token',
  PREFERENCES: 'ff_preferences',
  LAST_SYNC: 'ff_last_sync',
  OFFLINE_QUEUE: 'ff_offline_queue',
};

/**
 * API endpoints (for future backend integration)
 */
export const API_ENDPOINTS = {
  BASE_URL: process.env.VITE_API_URL || 'https://api.financeflow.app',
  AUTH: '/auth',
  TRANSACTIONS: '/transactions',
  INVESTMENTS: '/investments',
  CATEGORIES: '/categories',
  BUDGETS: '/budgets',
  ANALYTICS: '/analytics',
  USER: '/user',
};

/**
 * Application limits
 */
export const APP_LIMITS = {
  MAX_TRANSACTIONS_PER_DAY: 100,
  MAX_FILE_UPLOAD_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_ATTACHMENTS_PER_TRANSACTION: 5,
  MAX_CATEGORIES: 50,
  DEBOUNCE_DELAY: 300, // ms
  TOAST_DURATION: 3000, // ms
};

/**
 * Animation durations
 */
export const ANIMATIONS = {
  QUICK: 150,
  NORMAL: 300,
  SLOW: 500,
};
