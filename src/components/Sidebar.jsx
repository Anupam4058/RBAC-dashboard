import React from 'react';
import { Users, Shield, Layout, X } from 'lucide-react';
import { useStore } from '../store';
import clsx from 'clsx';

export const Sidebar = ({ activeTab, setActiveTab, isOpen }) => {
  const { isDarkMode } = useStore();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Layout },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'roles', label: 'Roles', icon: Shield },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setActiveTab(activeTab)}
        />
      )}
      <aside
        className={clsx(
          'fixed top-0 left-0 h-full w-72 bg-white dark:bg-gray-800 shadow-lg transform transition-all duration-300 ease-in-out z-50',
          {
            '-translate-x-full': !isOpen,
            'translate-x-0': isOpen,
          }
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">RBAC Admin</h1>
            <button
              onClick={() => setActiveTab(activeTab)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation menu */}
          <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={clsx(
                    'w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                    {
                      'bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-200': activeTab === item.id,
                      'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700': activeTab !== item.id,
                    }
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-200">AS</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white">Anupam Singh</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
