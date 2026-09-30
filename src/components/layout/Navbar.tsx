import React from 'react';

export const Navbar: React.FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => (
  <nav className="bg-white border-b border-neutral-200 sticky top-0 z-40">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="text-2xl">☰</button>
        <h1 className="text-2xl font-bold text-sky-600">💰 FinanceFlow</h1>
      </div>
      <div className="w-8 h-8 bg-sky-500 rounded-full"></div>
    </div>
  </nav>
);
