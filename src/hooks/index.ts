import React from 'react';
import { useFinanceStore } from '@/stores/financeStore';

export const useTransactions = (userId: string) => {
  const { transactions, loadTransactions, addTransaction, updateTransaction, deleteTransaction } = useFinanceStore();
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (userId) {
      setIsLoading(true);
      loadTransactions(userId).finally(() => setIsLoading(false));
    }
  }, [userId, loadTransactions]);

  return { transactions, isLoading, addTransaction, updateTransaction, deleteTransaction };
};

export const useCategories = (userId: string) => {
  const { categories, loadCategories, addCategory, updateCategory, deleteCategory } = useFinanceStore();
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (userId) {
      setIsLoading(true);
      loadCategories(userId).finally(() => setIsLoading(false));
    }
  }, [userId, loadCategories]);

  return { categories, isLoading, addCategory, updateCategory, deleteCategory };
};
