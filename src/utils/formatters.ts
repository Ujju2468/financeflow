export const formatCurrency = (amount: number, currencyCode = 'INR'): string => {
  const symbol = currencyCode === 'USD' ? '$' : '₹';
  return `${symbol} ${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export const formatDate = (date: Date | string): string => {
  return new Date(date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
};

export const calculateTotalExpenses = (transactions: any[]): number => transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
export const calculateTotalIncome = (transactions: any[]): number => transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
export const validateEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const debounce = <T extends (...args: any[]) => any>(fn: T, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};
