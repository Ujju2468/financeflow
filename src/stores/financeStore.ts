/**
 * Zustand Store - Global State Management
 * Handles all application state with persistence to IndexedDB
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  Transaction,
  Investment,
  Category,
  Budget,
  UserProfile,
  TransactionMode,
  TransactionType,
} from '@types/index';
import { db, dbUtils } from './db';

interface FinanceStore {
  // User state
  user: UserProfile | null;
  isAuthenticated: boolean;
  setUser: (user: UserProfile) => void;
  logout: () => Promise<void>;

  // Transaction state
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  loadTransactions: (userId: string) => Promise<void>;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Transaction>;
  updateTransaction: (id: string, updates: Partial<Transaction>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  filterTransactions: (filters: {
    startDate?: Date;
    endDate?: Date;
    categoryId?: string;
    mode?: TransactionMode;
    type?: TransactionType;
  }) => void;

  // Investment state
  investments: Investment[];
  loadInvestments: (userId: string) => Promise<void>;
  addInvestment: (investment: Omit<Investment, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Investment>;
  updateInvestment: (id: string, updates: Partial<Investment>) => Promise<void>;
  deleteInvestment: (id: string) => Promise<void>;

  // Category state
  categories: Category[];
  loadCategories: (userId: string) => Promise<void>;
  addCategory: (category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Category>;
  updateCategory: (id: string, updates: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;

  // Budget state
  budgets: Budget[];
  loadBudgets: (userId: string) => Promise<void>;
  addBudget: (budget: Omit<Budget, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Budget>;
  updateBudget: (id: string, updates: Partial<Budget>) => Promise<void>;

  // UI state
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  theme: 'light' | 'dark' | 'auto';
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;

  // Analytics state
  getMonthlyAnalytics: (userId: string, month: number, year: number) => Promise<any>;
  getYearlyAnalytics: (userId: string, year: number) => Promise<any>;
}

export const useFinanceStore = create<FinanceStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      transactions: [],
      filteredTransactions: [],
      investments: [],
      categories: [],
      budgets: [],
      sidebarOpen: true,
      theme: 'auto',

      // User actions
      setUser: (user) => set({ user, isAuthenticated: true }),
      logout: async () => {
        const { user } = get();
        if (user) {
          await dbUtils.clearUserData(user.id);
        }
        set({
          user: null,
          isAuthenticated: false,
          transactions: [],
          investments: [],
          categories: [],
          budgets: [],
        });
      },

      // Transaction actions
      loadTransactions: async (userId) => {
        const transactions = await db.transactions
          .where('userId')
          .equals(userId)
          .toArray();
        set({ transactions });
      },

      addTransaction: async (transaction) => {
        const id = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const newTransaction: Transaction = {
          ...transaction,
          id,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        await db.transactions.add(newTransaction);
        const { transactions } = get();
        set({ transactions: [...transactions, newTransaction] });
        return newTransaction;
      },

      updateTransaction: async (id, updates) => {
        await db.transactions.update(id, {
          ...updates,
          updatedAt: new Date(),
        });
        const { transactions } = get();
        set({
          transactions: transactions.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        });
      },

      deleteTransaction: async (id) => {
        await db.transactions.delete(id);
        const { transactions } = get();
        set({ transactions: transactions.filter((t) => t.id !== id) });
      },

      filterTransactions: (filters) => {
        const { transactions } = get();
        let filtered = [...transactions];

        if (filters.startDate && filters.endDate) {
          filtered = filtered.filter(
            (t) => new Date(t.date) >= filters.startDate! && new Date(t.date) <= filters.endDate!
          );
        }

        if (filters.categoryId) {
          filtered = filtered.filter((t) => t.categoryId === filters.categoryId);
        }

        if (filters.mode) {
          filtered = filtered.filter((t) => t.mode === filters.mode);
        }

        if (filters.type) {
          filtered = filtered.filter((t) => t.type === filters.type);
        }

        set({ filteredTransactions: filtered });
      },

      // Investment actions
      loadInvestments: async (userId) => {
        const investments = await db.investments
          .where('userId')
          .equals(userId)
          .toArray();
        set({ investments });
      },

      addInvestment: async (investment) => {
        const id = `inv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const newInvestment: Investment = {
          ...investment,
          id,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        await db.investments.add(newInvestment);
        const { investments } = get();
        set({ investments: [...investments, newInvestment] });
        return newInvestment;
      },

      updateInvestment: async (id, updates) => {
        await db.investments.update(id, {
          ...updates,
          updatedAt: new Date(),
        });
        const { investments } = get();
        set({
          investments: investments.map((i) => (i.id === id ? { ...i, ...updates } : i)),
        });
      },

      deleteInvestment: async (id) => {
        await db.investments.delete(id);
        const { investments } = get();
        set({ investments: investments.filter((i) => i.id !== id) });
      },

      // Category actions
      loadCategories: async (userId) => {
        const categories = await db.categories
          .where('userId')
          .equals(userId)
          .toArray();
        set({ categories });
      },

      addCategory: async (category) => {
        const id = `cat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const newCategory: Category = {
          ...category,
          id,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        await db.categories.add(newCategory);
        const { categories } = get();
        set({ categories: [...categories, newCategory] });
        return newCategory;
      },

      updateCategory: async (id, updates) => {
        await db.categories.update(id, {
          ...updates,
          updatedAt: new Date(),
        });
        const { categories } = get();
        set({
          categories: categories.map((c) => (c.id === id ? { ...c, ...updates } : c)),
        });
      },

      deleteCategory: async (id) => {
        await db.categories.delete(id);
        const { categories } = get();
        set({ categories: categories.filter((c) => c.id !== id) });
      },

      // Budget actions
      loadBudgets: async (userId) => {
        const budgets = await db.budgets
          .where('userId')
          .equals(userId)
          .toArray();
        set({ budgets });
      },

      addBudget: async (budget) => {
        const id = `bgt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const newBudget: Budget = {
          ...budget,
          id,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        await db.budgets.add(newBudget);
        const { budgets } = get();
        set({ budgets: [...budgets, newBudget] });
        return newBudget;
      },

      updateBudget: async (id, updates) => {
        await db.budgets.update(id, {
          ...updates,
          updatedAt: new Date(),
        });
        const { budgets } = get();
        set({
          budgets: budgets.map((b) => (b.id === id ? { ...b, ...updates } : b)),
        });
      },

      // UI actions
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setTheme: (theme) => set({ theme }),

      // Analytics actions
      getMonthlyAnalytics: async (userId, month, year) => {
        const transactions = await db.transactions
          .where('userId')
          .equals(userId)
          .toArray();

        const monthTransactions = transactions.filter((t) => {
          const date = new Date(t.date);
          return date.getMonth() === month && date.getFullYear() === year;
        });

        const totalExpenses = monthTransactions
          .filter((t) => t.type === 'expense')
          .reduce((sum, t) => sum + t.amount, 0);

        const totalIncome = monthTransactions
          .filter((t) => t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0);

        const categoryBreakdown: Record<string, number> = {};
        monthTransactions.forEach((t) => {
          categoryBreakdown[t.categoryId] = (categoryBreakdown[t.categoryId] || 0) + t.amount;
        });

        return {
          month,
          year,
          totalExpenses,
          totalIncome,
          net: totalIncome - totalExpenses,
          transactionCount: monthTransactions.length,
          categoryBreakdown,
        };
      },

      getYearlyAnalytics: async (userId, year) => {
        const transactions = await db.transactions
          .where('userId')
          .equals(userId)
          .toArray();

        const yearTransactions = transactions.filter(
          (t) => new Date(t.date).getFullYear() === year
        );

        const totalExpenses = yearTransactions
          .filter((t) => t.type === 'expense')
          .reduce((sum, t) => sum + t.amount, 0);

        const totalIncome = yearTransactions
          .filter((t) => t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0);

        const monthlyData: Record<number, any> = {};
        for (let month = 0; month < 12; month++) {
          const monthTransactions = yearTransactions.filter((t) => {
            const date = new Date(t.date);
            return date.getMonth() === month;
          });
          monthlyData[month] = {
            expenses: monthTransactions
              .filter((t) => t.type === 'expense')
              .reduce((sum, t) => sum + t.amount, 0),
            income: monthTransactions
              .filter((t) => t.type === 'income')
              .reduce((sum, t) => sum + t.amount, 0),
          };
        }

        return {
          year,
          totalExpenses,
          totalIncome,
          net: totalIncome - totalExpenses,
          transactionCount: yearTransactions.length,
          monthlyData,
        };
      },
    }),
    {
      name: 'finance-store',
      partialize: (state) => ({
        theme: state.theme,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
);

export default useFinanceStore;
