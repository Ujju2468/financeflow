import { useState, useEffect } from 'react';
import { Navbar, Sidebar } from '@components/layout';
import { Dashboard } from '@pages/Dashboard';
import { Transactions } from '@pages/Transactions';
import { useFinanceStore } from '@stores/financeStore';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const { user, setUser, isAuthenticated } = useFinanceStore();
  const [userId] = useState('demo_user_' + Date.now());

  useEffect(() => {
    // Mock user login
    if (!isAuthenticated) {
      setUser({
        id: userId,
        email: 'demo@financeflow.app',
        name: 'Demo User',
        currency: 'INR',
        dateFormat: 'DD/MM/YYYY',
        theme: 'auto',
        role: 'head',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="md:ml-64 p-4 md:p-8">
        {currentPage === 'dashboard' && <Dashboard userId={userId} />}
        {currentPage === 'transactions' && <Transactions userId={userId} />}
      </main>
    </div>
  );
}

export default App;