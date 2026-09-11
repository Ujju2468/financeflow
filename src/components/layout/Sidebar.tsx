import React from 'react';
import { COLOR_PALETTE } from '@constants/index';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: '📊', label: 'Dashboard', href: '/' },
  { icon: '💸', label: 'Transactions', href: '/transactions' },
  { icon: '📈', label: 'Investments', href: '/investments' },
  { icon: '💰', label: 'Budgets', href: '/budgets' },
  { icon: '📉', label: 'Analytics', href: '/analytics' },
  { icon: '⚙️', label: 'Settings', href: '/settings' },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30" onClick={onClose} />}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 transform transition-transform md:translate-x-0 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 space-y-6">
          <div className="md:hidden flex justify-end">
            <button onClick={onClose} className="text-2xl">×</button>
          </div>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium text-neutral-700 dark:text-neutral-300">{item.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};