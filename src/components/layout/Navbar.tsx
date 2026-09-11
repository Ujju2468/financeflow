import React from 'react';
import { Button } from '@components/ui';
import { useTheme } from '@hooks/index';

export const Navbar: React.FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => {
  const { isDark, setTheme, theme } = useTheme();

  return (
    <nav className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <button onClick={onMenuClick} className="text-2xl hover:opacity-70 transition">
            ☰
          </button>
          <h1 className="text-2xl font-bold text-sky-600">💰 FinanceFlow</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="text-2xl hover:opacity-70 transition"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
          <div className="w-8 h-8 bg-sky-500 rounded-full"></div>
        </div>
      </div>
    </nav>
  );
};