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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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
      <div className="rowcol">
        <div className="flex min-h-screen col-1">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOpen={isSidebarOpen}
        />
        <div className="flex-1 flex flex-col col">
          <div className='rowcol'>
          <Header
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />
          <div className='row'></div>
          <main className="flex-1 p-4 md:p-8 pt-20 transition-all duration-200">
            <div className="max-w-7xl mx-auto">{renderContent()}</div>
          </main>
          
          </div>
        </div>
        <Toaster position="top-right" />
        </div>
      </div>
    </div>
  );
}

export default App;