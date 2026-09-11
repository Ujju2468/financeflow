import React, { useEffect, useState } from 'react';
import { useFinanceStore } from '@stores/financeStore';
import { Card, Badge } from '@components/ui';
import { formatCurrency, calculateTotalExpenses, calculateTotalIncome } from '@utils/formatters';

export const Dashboard: React.FC<{ userId: string }> = ({ userId }) => {
  const { transactions, loadTransactions } = useFinanceStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTransactions(userId).finally(() => setIsLoading(false));
  }, [userId]);

  const totalExpenses = calculateTotalExpenses(transactions);
  const totalIncome = calculateTotalIncome(transactions);
  const balance = totalIncome - totalExpenses;

  const recentTransactions = transactions.slice(-5).reverse();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-sky-50 to-sky-100 dark:from-neutral-800 dark:to-neutral-900 border-0">
          <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">Total Balance</h3>
          <p className="text-3xl font-bold text-sky-600 dark:text-sky-400">{formatCurrency(balance)}</p>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-neutral-800 dark:to-neutral-900 border-0">
          <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">Total Income</h3>
          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(totalIncome)}</p>
        </Card>
        <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-neutral-800 dark:to-neutral-900 border-0">
          <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">Total Expenses</h3>
          <p className="text-3xl font-bold text-red-600 dark:text-red-400">{formatCurrency(totalExpenses)}</p>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <h2 className="text-xl font-bold mb-4 text-neutral-900 dark:text-white">Recent Transactions</h2>
        <div className="space-y-3">
          {isLoading ? (
            <p className="text-neutral-500">Loading...</p>
          ) : recentTransactions.length === 0 ? (
            <p className="text-neutral-500">No transactions yet</p>
          ) : (
            recentTransactions.map((txn) => (
              <div key={txn.id} className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💸</span>
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-white">{txn.description}</p>
                    <p className="text-sm text-neutral-500">{new Date(txn.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <Badge variant={txn.type === 'expense' ? 'danger' : 'success'}>
                  {formatCurrency(txn.amount)}
                </Badge>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};