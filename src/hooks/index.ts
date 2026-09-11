/**
 * Custom React hooks for FinanceFlow
 */

import { useCallback, useEffect, useState } from 'react';
import { useFinanceStore } from '@stores/financeStore';
import { Transaction } from '@types/index';
import { debounce } from '@utils/formatters';

/**
 * Hook to fetch and manage transactions
 */
export const useTransactions = (userId: string) => {
  const { transactions, loadTransactions, addTransaction, updateTransaction, deleteTransaction } =
    useFinanceStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      setIsLoading(true);
      loadTransactions(userId).finally(() => setIsLoading(false));
    }
  }, [userId, loadTransactions]);

  return {
    transactions,
    isLoading,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };
};

/**
 * Hook to fetch and manage categories
 */
export const useCategories = (userId: string) => {
  const { categories, loadCategories, addCategory, updateCategory, deleteCategory } =
    useFinanceStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      setIsLoading(true);
      loadCategories(userId).finally(() => setIsLoading(false));
    }
  }, [userId, loadCategories]);

  return {
    categories,
    isLoading,
    addCategory,
    updateCategory,
    deleteCategory,
  };
};

/**
 * Hook for debounced search
 */
export const useDebouncedSearch = <T,>(
  items: T[],
  searchFn: (item: T, query: string) => boolean,
  delay: number = 300
) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<T[]>(items);

  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      if (!searchQuery) {
        setResults(items);
      } else {
        setResults(items.filter((item) => searchFn(item, searchQuery)));
      }
    }, delay),
    [items, searchFn, delay]
  );

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    debouncedSearch(searchQuery);
  };

  return { query, results, handleSearch };
};

/**
 * Hook for toast notifications
 */
export const useToast = () => {
  const [toasts, setToasts] = useState<
    Array<{ id: string; message: string; type: 'success' | 'error' | 'info'; duration?: number }>
  >([]);

  const addToast = useCallback(
    (message: string, type: 'success' | 'error' | 'info' = 'info', duration: number = 3000) => {
      const id = `toast_${Date.now()}`;
      setToasts((prev) => [...prev, { id, message, type, duration }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);

      return id;
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
};

/**
 * Hook for local storage persistence
 */
export const useLocalStorage = <T,>(key: string, initialValue: T): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T) => {
      try {
        setStoredValue(value);
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error('Error writing to localStorage:', error);
      }
    },
    [key]
  );

  return [storedValue, setValue];
};

/**
 * Hook for analytics data
 */
export const useAnalytics = (userId: string, month?: number, year?: number) => {
  const { getMonthlyAnalytics, getYearlyAnalytics } = useFinanceStore();
  const [analytics, setAnalytics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;

    setIsLoading(true);
    (month !== undefined && year !== undefined
      ? getMonthlyAnalytics(userId, month, year)
      : getYearlyAnalytics(userId, year || new Date().getFullYear())
    )
      .then(setAnalytics)
      .finally(() => setIsLoading(false));
  }, [userId, month, year, getMonthlyAnalytics, getYearlyAnalytics]);

  return { analytics, isLoading };
};

/**
 * Hook for pagination
 */
export const usePagination = <T,>(items: T[], itemsPerPage: number = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  return {
    currentPage,
    totalPages,
    currentItems,
    goToPage,
    nextPage,
    prevPage,
    itemsPerPage,
  };
};

/**
 * Hook for async data fetching
 */
export const useFetch = <T,>(
  fetchFn: () => Promise<T>,
  dependencies: any[] = []
) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await fetchFn();
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return { data, isLoading, error };
};

/**
 * Hook for theme management
 */
export const useTheme = () => {
  const { theme, setTheme } = useFinanceStore();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const effectiveTheme = theme === 'auto' ? (prefersDark ? 'dark' : 'light') : theme;
    setIsDark(effectiveTheme === 'dark');

    if (effectiveTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return { theme, setTheme, isDark };
};
