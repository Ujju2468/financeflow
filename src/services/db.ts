/**
 * Dexie Database Configuration
 * Local-first database using IndexedDB for offline-first architecture
 */

import Dexie, { Table } from 'dexie';
import {
  Transaction,
  Investment,
  Category,
  Budget,
  MonthlySummary,
  YearlySummary,
  UserProfile,
  HouseholdMember,
} from '@/types/index';

export class FinanceFlowDB extends Dexie {
  transactions!: Table<Transaction>;
  investments!: Table<Investment>;
  categories!: Table<Category>;
  budgets!: Table<Budget>;
  monthlySummaries!: Table<MonthlySummary>;
  yearlySummaries!: Table<YearlySummary>;
  userProfiles!: Table<UserProfile>;
  householdMembers!: Table<HouseholdMember>;

  constructor() {
    super('FinanceFlowDB');
    this.version(1).stores({
      transactions:
        '++id, userId, categoryId, date, [userId+date], [userId+type], isRecurring',
      investments: '++id, userId, categoryId, date, investmentType',
      categories: '++id, userId, type, isDefault',
      budgets: '++id, userId, categoryId, period',
      monthlySummaries: '++id, userId, [userId+year+month]',
      yearlySummaries: '++id, userId, year',
      userProfiles: '++id, email',
      householdMembers: '++id, userId, role',
    });
  }
}

export const db = new FinanceFlowDB();

export const dbUtils = {
  async clearUserData(userId: string) {
    try {
      await Promise.all([
        db.transactions.where('userId').equals(userId).delete(),
        db.investments.where('userId').equals(userId).delete(),
        db.categories.where('userId').equals(userId).delete(),
        db.budgets.where('userId').equals(userId).delete(),
        db.monthlySummaries.where('userId').equals(userId).delete(),
        db.yearlySummaries.where('userId').equals(userId).delete(),
        db.householdMembers.where('userId').equals(userId).delete(),
      ]);
    } catch (error) {
      console.error('Error clearing user data:', error);
    }
  },

  async exportUserData(userId: string) {
    try {
      const [transactions, investments, categories, budgets, monthlySummaries, yearlySummaries] = await Promise.all([
        db.transactions.where('userId').equals(userId).toArray(),
        db.investments.where('userId').equals(userId).toArray(),
        db.categories.where('userId').equals(userId).toArray(),
        db.budgets.where('userId').equals(userId).toArray(),
        db.monthlySummaries.where('userId').equals(userId).toArray(),
        db.yearlySummaries.where('userId').equals(userId).toArray(),
      ]);

      return {
        version: '1.0.0',
        exportedAt: new Date(),
        userId,
        transactions,
        investments,
        categories,
        budgets,
        summaries: { monthly: monthlySummaries, yearly: yearlySummaries },
      };
    } catch (error) {
      console.error('Error exporting user data:', error);
      return null;
    }
  },
};
