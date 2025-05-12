import React, { useState } from 'react';
import { Users, Shield, UserCheck, Activity, ChevronDown, ChevronUp } from 'lucide-react';
import { useStore } from '../store';

export const Dashboard = () => {
  const { users, roles } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [timeRange, setTimeRange] = useState('7d');
  const [expandedCard, setExpandedCard] = useState(null);

  const activeUsers = users.filter((user) => user.isActive).length;
  const inactiveUsers = users.length - activeUsers;

  const stats = [
    {
      id: 'users',
      title: 'Total Users',
      value: users.length,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%',
      details: [
        { label: 'Active Users', value: activeUsers, color: 'text-green-600' },
        { label: 'Inactive Users', value: inactiveUsers, color: 'text-red-600' },
      ],
    },
    {
      id: 'active',
      title: 'Active Users',
      value: activeUsers,
      icon: UserCheck,
      color: 'bg-green-500',
      change: '+5%',
      details: [
        { label: 'Active Rate', value: `${((activeUsers / users.length) * 100).toFixed(1)}%`, color: 'text-blue-600' },
      ],
    },
    {
      id: 'roles',
      title: 'Total Roles',
      value: roles.length,
      icon: Shield,
      color: 'bg-purple-500',
      change: '0%',
      details: roles.map(role => ({
        label: role.name,
        value: users.filter(u => u.roleId === role.id).length,
        color: 'text-purple-600',
      })),
    },
    {
      id: 'activity',
      title: 'System Activity',
      value: '98.2%',
      icon: Activity,
      color: 'bg-yellow-500',
      change: '+2%',
      details: [
        { label: 'Uptime', value: '99.9%', color: 'text-green-600' },
        { label: 'Response Time', value: '120ms', color: 'text-blue-600' },
      ],
    },
  ];

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="animate-pulse space-y-6">
      <div className="h-8 bg-gray-200 rounded w-1/4"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm p-6">
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-12 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
        <div className="w-full sm:w-auto flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="rounded-md border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.id}
                  className="bg-white rounded-lg shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className={`${stat.color} rounded-full p-3 text-white`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-sm font-medium ${
                      stat.change.startsWith('+') ? 'text-green-600' : 'text-gray-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-sm">{stat.title}</h3>
                    <p className="text-xl sm:text-2xl font-bold text-gray-800 mt-1">
                      {stat.value}
                    </p>
                    {stat.details && (
                      <button
                        onClick={() => setExpandedCard(expandedCard === stat.id ? null : stat.id)}
                        className="mt-2 text-sm text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded-full p-1"
                      >
                        {expandedCard === stat.id ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </div>
                  {expandedCard === stat.id && stat.details && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="space-y-2">
                        {stat.details.map((detail, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">{detail.label}</span>
                            <span className={`text-sm font-medium ${detail.color}`}>
                              {detail.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {users.slice(0, 5).map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors rounded-lg px-2"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        user.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Role Distribution
              </h3>
              <div className="space-y-4">
                {roles.map((role) => {
                  const usersWithRole = users.filter(
                    (user) => user.roleId === role.id
                  ).length;
                  const percentage = (usersWithRole / users.length) * 100 || 0;
                  return (
                    <div key={role.id} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-700">{role.name}</span>
                        <span className="text-gray-500">{usersWithRole} users</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};