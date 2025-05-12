import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { UserList } from './components/UserList';
import { RoleList } from './components/RoleList';
import { Header } from './components/Header';
import { useStore } from './store';
import clsx from 'clsx';

// Mock data
const mockUsers = [
  {
    id: '1',
    name: 'Anupam Singh',
    email: 'anupam@example.com',
    roleId: '1',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Alok Singh',
    email: 'alok@example.com',
    roleId: '2',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
];

const mockRoles = [
  {
    id: '1',
    name: 'Admin',
    permissions: ['read', 'write', 'delete', 'manage_users', 'manage_roles'],
    description: 'Full system access',
  },
  {
    id: '2',
    name: 'Editor',
    permissions: ['read', 'write'],
    description: 'Can read and write content',
  },
];

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { setUsers, setRoles, isDarkMode } = useStore();

  useEffect(() => {
    // Initialize with mock data
    setUsers(mockUsers);
    setRoles(mockRoles);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UserList />;
      case 'roles':
        return <RoleList />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={clsx('min-h-screen transition-colors duration-200', {
      'bg-gray-50': !isDarkMode,
      'bg-gray-900': isDarkMode
    })}>
      <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setIsSidebarOpen(false);
        }}
        isOpen={isSidebarOpen}
      />
      <main className={clsx(
        "pt-16 p-4 md:p-6 lg:p-8 transition-all duration-200",
        {
          "md:ml-0": !isSidebarOpen,
          "md:ml-72": isSidebarOpen
        }
      )}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Main content area */}
            <div className="xl:col-span-9">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="p-6">
                  {renderContent()}
                </div>
              </div>
            </div>
            
            {/* Right sidebar */}
            <div className="hidden xl:block xl:col-span-3">
              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quick Stats</h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                      <p className="text-sm text-gray-600 dark:text-gray-300">Total Users</p>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{mockUsers.length}</p>
                    </div>
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
                      <p className="text-sm text-gray-600 dark:text-gray-300">Total Roles</p>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">{mockRoles.length}</p>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Recent Activity</h2>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">AS</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-900 dark:text-white">New user registered</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">AS</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-900 dark:text-white">Role permissions updated</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: isDarkMode ? '#1f2937' : '#ffffff',
            color: isDarkMode ? '#ffffff' : '#1f2937',
            border: '1px solid rgba(75, 85, 99, 0.2)',
          },
        }}
      />
    </div>
  );
}

export default App;