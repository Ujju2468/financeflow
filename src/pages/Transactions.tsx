import React, { useState } from 'react';
import { useTransactions } from '@/hooks/index';
import { Card, Button, Input, Badge } from '@/components/ui';
import { formatCurrency, formatDate } from '@/utils/formatters';

export const Transactions: React.FC<{ userId: string }> = ({ userId }) => {
  const { transactions, isLoading } = useTransactions(userId);
  const [searchQuery, setSearchQuery] = useState('');
  const filtered = transactions.filter((t) => t.description.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Transactions</h1>
        <Button variant="primary">+ Add Transaction</Button>
      </div>

      <Card>
        <Input placeholder="Search transactions..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </Card>

      <Card>
        {isLoading ? <p>Loading...</p> : filtered.length === 0 ? <p>No transactions found</p> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Description</th>
                  <th className="px-4 py-3 text-left">Mode</th>
                  <th className="px-4 py-3 text-right">Amount</th>
                  <th className="px-4 py-3 text-left">Type</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((txn) => (
                  <tr key={txn.id} className="border-t border-neutral-100">
                    <td className="px-4 py-3">{formatDate(txn.date)}</td>
                    <td className="px-4 py-3">{txn.description}</td>
                    <td className="px-4 py-3"><Badge variant="neutral" size="sm">{txn.mode}</Badge></td>
                    <td className="px-4 py-3 text-right font-medium">{formatCurrency(txn.amount)}</td>
                    <td className="px-4 py-3"><Badge variant={txn.type === 'expense' ? 'danger' : 'success'} size="sm">{txn.type}</Badge></td>
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
