import React from 'react';
import { Sun, Moon, Bell } from 'lucide-react';
import { useStore } from '../store';

export const Header = () => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const toggleDarkMode = useStore((state) => state.toggleDarkMode);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">RBAC-UI</h1>
          </div> */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className={`p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isDarkMode ? 'text-yellow-400' : 'text-gray-400'
              }`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
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