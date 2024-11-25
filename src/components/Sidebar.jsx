import React from 'react';
import { Users, Shield, Layout } from 'lucide-react';
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
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setActiveTab(null)}
        />
      )}

      <div
        className={clsx(
          'text-white fixed md:static inset-y-0 left-0 z-40 transform transition-all duration-200 ease-in-out w-64 md:translate-x-0',
          {
            '-translate-x-full': !isOpen,
            'translate-x-0': isOpen,
            'bg-gray-900': !isDarkMode,
            'bg-black': isDarkMode,
          }
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div
            className={clsx('flex items-center justify-center h-16 px-4', {
              'bg-gray-800': !isDarkMode,
              'bg-gray-900': isDarkMode,
            })}
          >
            <h1 className="text-xl sm:text-2xl font-bold tracking-wider">RBAC Admin</h1>
          </div>
          {/* Navigation menu */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={clsx(
                    'w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                    {
                      'bg-blue-600 text-white': activeTab === item.id,
                      'text-gray-300 hover:bg-gray-800': activeTab !== item.id,
                    }
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm sm:text-base">{item.label}</span>
                </button>
              );
            })}
          </nav>
          {/* Footer */}
          <div
            className={clsx('p-4', {
              'bg-gray-800': !isDarkMode,
              'bg-gray-900': isDarkMode,
            })}
          >
            <div className="text-sm text-gray-400">
              <p>Made by Anupam</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
