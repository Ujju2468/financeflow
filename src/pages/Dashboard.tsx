import React from 'react';
import { useFinanceStore } from '@/stores/financeStore';
import { formatCurrency, calculateTotalExpenses, calculateTotalIncome } from '@/utils/formatters';
import { Card, Badge } from '@/components/ui';

export const Dashboard: React.FC<{ userId: string }> = ({ userId }) => {
  const { transactions, loadTransactions } = useFinanceStore();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    loadTransactions(userId).finally(() => setIsLoading(false));
  }, [userId, loadTransactions]);

  const totalExpenses = calculateTotalExpenses(transactions);
  const totalIncome = calculateTotalIncome(transactions);
  const balance = totalIncome - totalExpenses;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-sky-50 to-sky-100 border-0">
          <h3 className="text-sm font-medium text-neutral-600 mb-2">Total Balance</h3>
          <p className="text-3xl font-bold text-sky-600">{formatCurrency(balance)}</p>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-0">
          <h3 className="text-sm font-medium text-neutral-600 mb-2">Total Income</h3>
          <p className="text-3xl font-bold text-emerald-600">{formatCurrency(totalIncome)}</p>
        </Card>
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-0">
          <h3 className="text-sm font-medium text-neutral-600 mb-2">Total Expenses</h3>
          <p className="text-3xl font-bold text-red-600">{formatCurrency(totalExpenses)}</p>
        </Card>
      </div>
      <Card>
        <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
        {isLoading ? <p>Loading...</p> : transactions.length === 0 ? <p>No transactions yet</p> : transactions.slice(-5).reverse().map((txn) => (
          <div key={txn.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg mb-2">
            <div>
              <p className="font-medium">{txn.description}</p>
              <p className="text-sm text-neutral-500">{new Date(txn.date).toLocaleDateString()}</p>
            </div>
            <Badge variant={txn.type === 'expense' ? 'danger' : 'success'}>{formatCurrency(txn.amount)}</Badge>
          </div>
        ))}
      </Card>
    </div>
  );
};
