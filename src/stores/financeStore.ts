/**
 * Zustand Store - Global State Management
 */

import { create } from 'zustand';
import { Transaction, Investment, Category, Budget, UserProfile, TransactionMode, TransactionType } from '@/types/index';
import { db, dbUtils } from '@/services/db';

interface FinanceStore {
  user: UserProfile | null;
  isAuthenticated: boolean;
  setUser: (user: UserProfile) => void;
  logout: () => Promise<void>;

  transactions: Transaction[];
  filteredTransactions: Transaction[];
  loadTransactions: (userId: string) => Promise<void>;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Transaction>;
  updateTransaction: (id: string, updates: Partial<Transaction>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  filterTransactions: (filters: { startDate?: Date; endDate?: Date; categoryId?: string; mode?: TransactionMode; type?: TransactionType; }) => void;

  investments: Investment[];
  loadInvestments: (userId: string) => Promise<void>;
  addInvestment: (investment: Omit<Investment, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Investment>;
  updateInvestment: (id: string, updates: Partial<Investment>) => Promise<void>;
  deleteInvestment: (id: string) => Promise<void>;

  categories: Category[];
  loadCategories: (userId: string) => Promise<void>;
  addCategory: (category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Category>;
  updateCategory: (id: string, updates: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;

  budgets: Budget[];
  loadBudgets: (userId: string) => Promise<void>;
  addBudget: (budget: Omit<Budget, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Budget>;
  updateBudget: (id: string, updates: Partial<Budget>) => Promise<void>;

  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  theme: 'light' | 'dark' | 'auto';
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;

  getMonthlyAnalytics: (userId: string, month: number, year: number) => Promise<any>;
  getYearlyAnalytics: (userId: string, year: number) => Promise<any>;
}

export const useFinanceStore = create<FinanceStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  transactions: [],
  filteredTransactions: [],
  investments: [],
  categories: [],
  budgets: [],
  sidebarOpen: true,
  theme: 'auto',

  setUser: (user) => set({ user, isAuthenticated: true }),
  logout: async () => {
    const { user } = get();
    if (user) {
      await dbUtils.clearUserData(user.id);
    }
    set({ user: null, isAuthenticated: false, transactions: [], investments: [], categories: [], budgets: [] });
  },

  loadTransactions: async (userId) => {
    try {
      const transactions = await db.transactions.where('userId').equals(userId).toArray();
      set({ transactions });
    } catch (error) { console.error('Error loading transactions:', error); }
  },

  addTransaction: async (transaction) => {
    const id = `txn_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    const newTransaction: Transaction = { ...transaction, id, createdAt: new Date(), updatedAt: new Date() };
    try {
      await db.transactions.add(newTransaction);
      const { transactions } = get();
      set({ transactions: [...transactions, newTransaction] });
      return newTransaction;
    } catch (error) {
      console.error('Error adding transaction:', error);
      return newTransaction;
    }
  },

  updateTransaction: async (id, updates) => {
    try {
      await db.transactions.update(id, { ...updates, updatedAt: new Date() });
      const { transactions } = get();
      set({ transactions: transactions.map((t) => (t.id === id ? { ...t, ...updates, updatedAt: new Date() } : t)) });
    } catch (error) { console.error('Error updating transaction:', error); }
  },

  deleteTransaction: async (id) => {
    try {
      await db.transactions.delete(id);
      const { transactions } = get();
      set({ transactions: transactions.filter((t) => t.id !== id) });
    } catch (error) { console.error('Error deleting transaction:', error); }
  },

  filterTransactions: (filters) => {
    const { transactions } = get();
    let filtered = [...transactions];
    if (filters.startDate && filters.endDate) {
      filtered = filtered.filter((t) => new Date(t.date) >= filters.startDate! && new Date(t.date) <= filters.endDate!);
    }
    if (filters.categoryId) filtered = filtered.filter((t) => t.categoryId === filters.categoryId);
    if (filters.mode) filtered = filtered.filter((t) => t.mode === filters.mode);
    if (filters.type) filtered = filtered.filter((t) => t.type === filters.type);
    set({ filteredTransactions: filtered });
  },

  loadInvestments: async (userId) => {
    try {
      const investments = await db.investments.where('userId').equals(userId).toArray();
      set({ investments });
    } catch (error) { console.error('Error loading investments:', error); }
  },

  addInvestment: async (investment) => {
    const id = `inv_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    const newInvestment: Investment = { ...investment, id, createdAt: new Date(), updatedAt: new Date() };
    try {
      await db.investments.add(newInvestment);
      const { investments } = get();
      set({ investments: [...investments, newInvestment] });
      return newInvestment;
    } catch (error) { console.error('Error adding investment:', error); return newInvestment; }
  },

  updateInvestment: async (id, updates) => {
    try {
      await db.investments.update(id, { ...updates, updatedAt: new Date() });
      const { investments } = get();
      set({ investments: investments.map((i) => (i.id === id ? { ...i, ...updates, updatedAt: new Date() } : i)) });
    } catch (error) { console.error('Error updating investment:', error); }
  },

  deleteInvestment: async (id) => {
    try {
      await db.investments.delete(id);
      const { investments } = get();
      set({ investments: investments.filter((i) => i.id !== id) });
    } catch (error) { console.error('Error deleting investment:', error); }
  },

  loadCategories: async (userId) => {
    try {
      const categories = await db.categories.where('userId').equals(userId).toArray();
      set({ categories });
    } catch (error) { console.error('Error loading categories:', error); }
  },

  addCategory: async (category) => {
    const id = `cat_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    const newCategory: Category = { ...category, id, createdAt: new Date(), updatedAt: new Date() };
    try {
      await db.categories.add(newCategory);
      const { categories } = get();
      set({ categories: [...categories, newCategory] });
      return newCategory;
    } catch (error) { console.error('Error adding category:', error); return newCategory; }
  },

  updateCategory: async (id, updates) => {
    try {
      await db.categories.update(id, { ...updates, updatedAt: new Date() });
      const { categories } = get();
      set({ categories: categories.map((c) => (c.id === id ? { ...c, ...updates, updatedAt: new Date() } : c)) });
    } catch (error) { console.error('Error updating category:', error); }
  },

  deleteCategory: async (id) => {
    try {
      await db.categories.delete(id);
      const { categories } = get();
      set({ categories: categories.filter((c) => c.id !== id) });
    } catch (error) { console.error('Error deleting category:', error); }
  },

  loadBudgets: async (userId) => {
    try {
      const budgets = await db.budgets.where('userId').equals(userId).toArray();
      set({ budgets });
    } catch (error) { console.error('Error loading budgets:', error); }
  },

  addBudget: async (budget) => {
    const id = `bgt_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    const newBudget: Budget = { ...budget, id, createdAt: new Date(), updatedAt: new Date() };
    try {
      await db.budgets.add(newBudget);
      const { budgets } = get();
      set({ budgets: [...budgets, newBudget] });
      return newBudget;
    } catch (error) { console.error('Error adding budget:', error); return newBudget; }
  },

  updateBudget: async (id, updates) => {
    try {
      await db.budgets.update(id, { ...updates, updatedAt: new Date() });
      const { budgets } = get();
      set({ budgets: budgets.map((b) => (b.id === id ? { ...b, ...updates, updatedAt: new Date() } : b)) });
    } catch (error) { console.error('Error updating budget:', error); }
  },

  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setTheme: (theme) => set({ theme }),

  getMonthlyAnalytics: async (userId, month, year) => {
    try {
      const transactions = await db.transactions.where('userId').equals(userId).toArray();
      const monthTransactions = transactions.filter((t) => new Date(t.date).getMonth() === month && new Date(t.date).getFullYear() === year);
      const totalExpenses = monthTransactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
      const totalIncome = monthTransactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
      return { month, year, totalExpenses, totalIncome, net: totalIncome - totalExpenses, transactionCount: monthTransactions.length };
    } catch (error) {
      console.error('Error loading monthly analytics:', error);
      return null;
    }
  },

  getYearlyAnalytics: async (userId, year) => {
    try {
      const transactions = await db.transactions.where('userId').equals(userId).toArray();
      const yearTransactions = transactions.filter((t) => new Date(t.date).getFullYear() === year);
      const totalExpenses = yearTransactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
      const totalIncome = yearTransactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
      return { year, totalExpenses, totalIncome, net: totalIncome - totalExpenses, transactionCount: yearTransactions.length };
    } catch (error) {
      console.error('Error loading yearly analytics:', error);
      return null;
    }
  },
}));

export default useFinanceStore;
