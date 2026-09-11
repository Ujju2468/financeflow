import React, { useState } from 'react';
import { useTransactions } from '@hooks/index';
import { Card, Button, Input, Badge } from '@components/ui';
import { formatCurrency, formatDate } from '@utils/formatters';

export const Transactions: React.FC<{ userId: string }> = ({ userId }) => {
  const { transactions, isLoading } = useTransactions(userId);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = transactions.filter(
    (t) => t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Transactions</h1>
        <Button variant="primary">+ Add Transaction</Button>
      </div>

      <Card>
        <Input
          placeholder="Search transactions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          icon="🔍"
        />
      </Card>

      <Card>
        {isLoading ? (
          <p className="text-center text-neutral-500 py-8">Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-neutral-500 py-8">No transactions found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-neutral-200 dark:border-neutral-700">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-700 dark:text-neutral-300">Date</th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-700 dark:text-neutral-300">Description</th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-700 dark:text-neutral-300">Mode</th>
                  <th className="px-4 py-3 text-right font-semibold text-neutral-700 dark:text-neutral-300">Amount</th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-700 dark:text-neutral-300">Type</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((txn) => (
                  <tr key={txn.id} className="border-b border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                    <td className="px-4 py-3">{formatDate(txn.date)}</td>
                    <td className="px-4 py-3">{txn.description}</td>
                    <td className="px-4 py-3">
                      <Badge variant="neutral" size="sm">{txn.mode}</Badge>
                    </td>
                    <td className="px-4 py-3 text-right font-medium">{formatCurrency(txn.amount)}</td>
                    <td className="px-4 py-3">
                      <Badge variant={txn.type === 'expense' ? 'danger' : 'success'} size="sm">
                        {txn.type}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};