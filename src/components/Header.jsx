import React from 'react';
import { Menu, Bell, Search, Sun, Moon } from 'lucide-react';
import { useStore } from '../store';

export const Header = ({ isSidebarOpen, toggleSidebar }) => {
  const { users, isDarkMode, toggleDarkMode } = useStore();
  const activeUsers = users.filter((user) => user.isActive).length;

  return (
    <header className={`fixed w-full border-b z-30 transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className={`hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
              aria-label="Toggle sidebar"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="hidden md:block w-full max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className={`block w-full pl-10 pr-3 py-2 border rounded-md leading-5 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 placeholder-gray-500'
                  }`}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-sm">
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                {activeUsers} active users
              </span>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isDarkMode ? 'text-yellow-400' : 'text-gray-400'
              }`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="h-6 w-6" />
              ) : (
                <Moon className="h-6 w-6" />
              )}
            </button>
            <button 
              className={`p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-400'
              }`}
              aria-label="View notifications"
            >
              <Bell className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};