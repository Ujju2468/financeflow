/**
 * Dexie Database Configuration
 * Local-first database using IndexedDB for offline-first architecture
 * Ensures all data remains on user's device - completely private and secure
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
} from '@types/index';

export class FinanceFlowDB extends Dexie {
  // Tables
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

// Singleton instance
export const db = new FinanceFlowDB();

/**
 * Database utility functions
 */
export const dbUtils = {
  /**
   * Clear all user data (for logout/reset)
   */
  async clearUserData(userId: string) {
    await Promise.all([
      db.transactions.where('userId').equals(userId).delete(),
      db.investments.where('userId').equals(userId).delete(),
      db.categories.where('userId').equals(userId).delete(),
      db.budgets.where('userId').equals(userId).delete(),
      db.monthlySummaries.where('userId').equals(userId).delete(),
      db.yearlySummaries.where('userId').equals(userId).delete(),
      db.householdMembers.where('userId').equals(userId).delete(),
    ]);
  },

  /**
   * Export user data as JSON for backup
   */
  async exportUserData(userId: string) {
    const [
      transactions,
      investments,
      categories,
      budgets,
      monthlySummaries,
      yearlySummaries,
    ] = await Promise.all([
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
      summaries: {
        monthly: monthlySummaries,
        yearly: yearlySummaries,
      },
    };
  },

  /**
   * Import user data from backup
   */
  async importUserData(userId: string, data: any) {
    try {
      // Validate data structure
      if (!data.transactions || !Array.isArray(data.transactions)) {
        throw new Error('Invalid backup format');
      }

      // Import each table
      await db.transaction('rw', db.transactions, db.investments, db.categories, db.budgets, async () => {
        if (data.transactions?.length) {
          await db.transactions.bulkAdd(data.transactions);
        }
        if (data.investments?.length) {
          await db.investments.bulkAdd(data.investments);
        }
        if (data.categories?.length) {
          await db.categories.bulkAdd(data.categories);
        }
        if (data.budgets?.length) {
          await db.budgets.bulkAdd(data.budgets);
        }
      });

      return { success: true, message: 'Data imported successfully' };
    } catch (error) {
      console.error('Import failed:', error);
      return { success: false, message: 'Failed to import data' };
    }
  },

  /**
   * Get database size estimation
   */
  async getDbSize(userId: string) {
    const counts = await Promise.all([
      db.transactions.where('userId').equals(userId).count(),
      db.investments.where('userId').equals(userId).count(),
      db.categories.where('userId').equals(userId).count(),
    ]);

    return {
      transactionCount: counts[0],
      investmentCount: counts[1],
      categoryCount: counts[2],
      estimatedSize: `${((counts[0] + counts[1] + counts[2]) * 0.5).toFixed(2)} KB`,
    };
  },
};
