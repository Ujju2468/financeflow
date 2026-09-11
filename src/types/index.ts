/**
 * Core type definitions for FinanceFlow
 * Defines the domain models for expenses, investments, categories, and transactions
 */

export type TransactionMode = 'cash' | 'card' | 'bank_transfer' | 'upi' | 'cheque' | 'other';
export type TransactionType = 'expense' | 'investment' | 'income';
export type RecurrenceType = 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly';

/**
 * Category entity - Used to classify expenses and transactions
 */
export interface Category {
  id: string;
  userId: string;
  name: string;
  description?: string;
  icon: string;
  color: string;
  type: 'expense' | 'investment' | 'income';
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Transaction entity - Core financial transaction record
 */
export interface Transaction {
  id: string;
  userId: string;
  categoryId: string;
  amount: number;
  description: string;
  date: Date;
  time?: string;
  mode: TransactionMode;
  type: TransactionType;
  tags?: string[];
  notes?: string;
  attachments?: string[];
  isRecurring: boolean;
  recurrenceType?: RecurrenceType;
  recurrenceEndDate?: Date;
  parentTransactionId?: string; // For recurring transaction instances
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date; // Soft delete
}

/**
 * Investment entity - Track investments separately from expenses
 */
export interface Investment {
  id: string;
  userId: string;
  categoryId: string;
  name: string;
  amount: number;
  currentValue?: number;
  mode: TransactionMode;
  investmentType: string; // 'stocks', 'bonds', 'real_estate', 'savings', etc.
  date: Date;
  maturityDate?: Date;
  notes?: string;
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Budget entity - For tracking spending limits
 */
export interface Budget {
  id: string;
  userId: string;
  categoryId: string;
  limit: number;
  period: 'monthly' | 'yearly';
  spent: number;
  remainingAmount: number;
  alertThreshold: number; // Alert when spent % reaches this
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Monthly summary - Pre-calculated analytics
 */
export interface MonthlySummary {
  id: string;
  userId: string;
  month: number; // 0-11
  year: number;
  totalExpenses: number;
  totalIncome: number;
  totalInvestments: number;
  categoryBreakdown: Record<string, number>;
  modeBreakdown: Record<TransactionMode, number>;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Yearly summary - Pre-calculated analytics
 */
export interface YearlySummary {
  id: string;
  userId: string;
  year: number;
  totalExpenses: number;
  totalIncome: number;
  totalInvestments: number;
  monthlyData: Record<number, MonthlySummary>;
  categoryBreakdown: Record<string, number>;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * User profile with household information
 */
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  householdName?: string;
  role: 'head' | 'member';
  members?: HouseholdMember[];
  currency: string;
  dateFormat: string;
  theme: 'light' | 'dark' | 'auto';
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Household member for shared finances
 */
export interface HouseholdMember {
  id: string;
  userId: string;
  name: string;
  role: 'head' | 'member';
  allowance?: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Analytics insights
 */
export interface AnalyticsInsight {
  id: string;
  userId: string;
  type: 'spending_trend' | 'budget_alert' | 'savings_goal' | 'investment_return';
  title: string;
  description: string;
  data: Record<string, any>;
  createdAt: Date;
  actionableAt?: Date;
}

/**
 * Export format for data backup
 */
export interface DataExport {
  version: string;
  exportedAt: Date;
  userId: string;
  transactions: Transaction[];
  investments: Investment[];
  categories: Category[];
  budgets: Budget[];
  summaries: {
    monthly: MonthlySummary[];
    yearly: YearlySummary[];
  };
}
