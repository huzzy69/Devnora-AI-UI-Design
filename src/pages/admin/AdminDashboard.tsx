import React from 'react';
import { Users, DollarSign, Package, TrendingUp, Activity, Shield, Database, Zap } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Users', value: '12,450', change: '+12%', icon: Users, color: 'blue' },
    { label: 'Monthly Revenue', value: '$89,340', change: '+23%', icon: DollarSign, color: 'green' },
    { label: 'Active Projects', value: '3,240', change: '+8%', icon: Package, color: 'purple' },
    { label: 'API Calls', value: '2.4M', change: '+45%', icon: Activity, color: 'orange' },
  ];

  const recentUsers = [
    { name: 'Alice Johnson', email: 'alice@example.com', plan: 'Professional', joined: '2 hours ago' },
    { name: 'Bob Smith', email: 'bob@example.com', plan: 'Starter', joined: '4 hours ago' },
    { name: 'Carol Williams', email: 'carol@example.com', plan: 'Enterprise', joined: '6 hours ago' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2 text-slate-900">Admin Dashboard</h1>
        <p className="text-slate-600">Platform overview and analytics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
            </div>
            <div className={`text-3xl mb-1 text-${stat.color}-600`}>{stat.value}</div>
            <div className="text-sm text-slate-600 mb-2">{stat.label}</div>
            <div className="text-sm text-green-600">{stat.change}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h3 className="text-xl text-slate-900 mb-4">Revenue Overview</h3>
          <div className="h-64 flex items-end gap-2">
            {[65, 45, 78, 52, 88, 92, 75, 68, 85, 70, 95, 82].map((height, i) => (
              <div key={i} className="flex-1 bg-blue-600 rounded-t" style={{ height: `${height}%` }}></div>
            ))}
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h3 className="text-xl text-slate-900 mb-4">User Growth</h3>
          <div className="h-64 flex items-end gap-2">
            {[55, 60, 58, 72, 75, 70, 85, 82, 90, 88, 95, 92].map((height, i) => (
              <div key={i} className="flex-1 bg-green-600 rounded-t" style={{ height: `${height}%` }}></div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-xl text-slate-900">Recent Users</h3>
          </div>
          <div className="divide-y divide-slate-200">
            {recentUsers.map((user, i) => (
              <div key={i} className="p-4 hover:bg-slate-50">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-slate-900 mb-1">{user.name}</div>
                    <div className="text-sm text-slate-600">{user.email}</div>
                  </div>
                  <div className="text-right">
                    <div className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded mb-1">
                      {user.plan}
                    </div>
                    <div className="text-xs text-slate-600">{user.joined}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h3 className="text-xl text-slate-900 mb-4">System Health</h3>
          <div className="space-y-4">
            {[
              { label: 'API Uptime', value: '99.9%', color: 'green' },
              { label: 'Average Response Time', value: '45ms', color: 'blue' },
              { label: 'Error Rate', value: '0.02%', color: 'green' },
              { label: 'Database Load', value: '23%', color: 'blue' },
            ].map((metric, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-700">{metric.label}</span>
                  <span className={`text-sm text-${metric.color}-600`}>{metric.value}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full bg-${metric.color}-600 rounded-full`} style={{ width: metric.value }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
