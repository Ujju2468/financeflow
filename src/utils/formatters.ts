/**
 * Utility functions for formatting, calculations, and validations
 */

import { Transaction, Investment } from '@types/index';
import { CURRENCIES } from '@constants/index';

/**
 * Format currency with symbol
 */
export const formatCurrency = (amount: number, currencyCode: string = 'INR'): string => {
  const currency = CURRENCIES.find((c) => c.code === currencyCode);
  const symbol = currency?.symbol || '₹';
  return `${symbol} ${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

/**
 * Format date to readable format
 */
export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
};

/**
 * Format time to HH:MM format
 */
export const formatTime = (time: string): string => {
  if (!time) return '';
  const [hours, minutes] = time.split(':');
  return `${hours}:${minutes}`;
};

/**
 * Get month name from number (0-11)
 */
export const getMonthName = (monthIndex: number): string => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return months[monthIndex] || '';
};

/**
 * Get short month name
 */
export const getShortMonthName = (monthIndex: number): string => {
  return getMonthName(monthIndex).substring(0, 3);
};

/**
 * Calculate total expenses from transactions
 */
export const calculateTotalExpenses = (transactions: Transaction[]): number => {
  return transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
};

/**
 * Calculate total income from transactions
 */
export const calculateTotalIncome = (transactions: Transaction[]): number => {
  return transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
};

/**
 * Calculate total investments
 */
export const calculateTotalInvestments = (investments: Investment[]): number => {
  return investments.reduce((sum, inv) => sum + inv.amount, 0);
};

/**
 * Group transactions by category
 */
export const groupByCategory = (
  transactions: Transaction[]
): Record<string, { count: number; total: number }> => {
  return transactions.reduce(
    (acc, transaction) => {
      const categoryId = transaction.categoryId;
      acc[categoryId] = {
        count: (acc[categoryId]?.count || 0) + 1,
        total: (acc[categoryId]?.total || 0) + transaction.amount,
      };
      return acc;
    },
    {} as Record<string, { count: number; total: number }>
  );
};

/**
 * Group transactions by date
 */
export const groupByDate = (
  transactions: Transaction[]
): Record<string, Transaction[]> => {
  return transactions.reduce(
    (acc, transaction) => {
      const dateKey = formatDate(transaction.date);
      acc[dateKey] = acc[dateKey] || [];
      acc[dateKey].push(transaction);
      return acc;
    },
    {} as Record<string, Transaction[]>
  );
};

/**
 * Calculate percentage
 */
export const calculatePercentage = (part: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((part / total) * 100);
};

/**
 * Validate email
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate amount (positive number)
 */
export const validateAmount = (amount: string | number): boolean => {
  const num = Number(amount);
  return !isNaN(num) && num > 0;
};

/**
 * Debounce function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Truncate string
 */
export const truncate = (str: string, length: number): string => {
  return str.length > length ? str.substring(0, length) + '...' : str;
};

/**
 * Get date range for different periods
 */
export const getDateRange = (
  period: 'today' | 'week' | 'month' | 'year'
): { startDate: Date; endDate: Date } => {
  const today = new Date();
  const startDate = new Date();
  const endDate = new Date();

  switch (period) {
    case 'today':
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
      break;
    case 'week':
      startDate.setDate(today.getDate() - today.getDay());
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
      break;
    case 'month':
      startDate.setDate(1);
      startDate.setHours(0, 0, 0, 0);
      endDate.setMonth(today.getMonth() + 1, 0);
      endDate.setHours(23, 59, 59, 999);
      break;
    case 'year':
      startDate.setMonth(0, 1);
      startDate.setHours(0, 0, 0, 0);
      endDate.setMonth(11, 31);
      endDate.setHours(23, 59, 59, 999);
      break;
  }

  return { startDate, endDate };
};

/**
 * Generate unique ID
 */
export const generateId = (prefix: string = 'id'): string => {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Check if date is today
 */
export const isToday = (date: Date): boolean => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

/**
 * Get spending trend (increased/decreased)
 */
export const getSpendingTrend = (current: number, previous: number): 'up' | 'down' | 'stable' => {
  if (current > previous) return 'up';
  if (current < previous) return 'down';
  return 'stable';
};

/**
 * Format large numbers with K, M, B suffix
 */
export const formatLargeNumber = (num: number): string => {
  if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toFixed(2);
};
