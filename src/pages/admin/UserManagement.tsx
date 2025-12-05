import React, { useState } from 'react';
import { Users, Search, Filter, MoreVertical, Shield, Ban, Mail } from 'lucide-react';

export default function UserManagement() {
  const users = [
    {
      name: 'John Doe',
      email: 'john@example.com',
      plan: 'Professional',
      status: 'Active',
      joined: 'Jan 15, 2024',
      projects: 12,
      avatar: '👨‍💼'
    },
    {
      name: 'Sarah Smith',
      email: 'sarah@example.com',
      plan: 'Enterprise',
      status: 'Active',
      joined: 'Jan 10, 2024',
      projects: 24,
      avatar: '👩‍💼'
    },
    {
      name: 'Mike Johnson',
      email: 'mike@example.com',
      plan: 'Starter',
      status: 'Active',
      joined: 'Feb 1, 2024',
      projects: 5,
      avatar: '👨‍💻'
    },
    {
      name: 'Emma Wilson',
      email: 'emma@example.com',
      plan: 'Professional',
      status: 'Suspended',
      joined: 'Dec 20, 2023',
      projects: 8,
      avatar: '👩‍🎨'
    },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl mb-2 text-slate-900">User Management</h1>
          <p className="text-slate-600">Manage all platform users</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Users', value: '12,450', icon: Users, color: 'blue' },
          { label: 'Active Users', value: '11,230', icon: Shield, color: 'green' },
          { label: 'Suspended', value: '45', icon: Ban, color: 'red' },
          { label: 'New Today', value: '23', icon: Mail, color: 'purple' },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-6">
            <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
            </div>
            <div className={`text-3xl mb-1 text-${stat.color}-600`}>{stat.value}</div>
            <div className="text-sm text-slate-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl"
          />
        </div>
        <button className="px-6 py-3 bg-white border border-slate-300 rounded-xl flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filter
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm text-slate-700">User</th>
                <th className="text-left px-6 py-4 text-sm text-slate-700">Plan</th>
                <th className="text-left px-6 py-4 text-sm text-slate-700">Status</th>
                <th className="text-left px-6 py-4 text-sm text-slate-700">Projects</th>
                <th className="text-left px-6 py-4 text-sm text-slate-700">Joined</th>
                <th className="text-left px-6 py-4 text-sm text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {users.map((user, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-xl">
                        {user.avatar}
                      </div>
                      <div>
                        <div className="text-slate-900">{user.name}</div>
                        <div className="text-sm text-slate-600">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-lg">
                      {user.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-sm rounded-lg ${
                        user.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-900">{user.projects}</td>
                  <td className="px-6 py-4 text-slate-600">{user.joined}</td>
                  <td className="px-6 py-4">
                    <button className="p-2 hover:bg-slate-200 rounded-lg">
                      <MoreVertical className="w-5 h-5 text-slate-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
