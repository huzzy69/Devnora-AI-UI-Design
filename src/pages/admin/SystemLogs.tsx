import React, { useState } from 'react';
import { FileText, AlertCircle, Info, CheckCircle, XCircle, Search } from 'lucide-react';

export default function SystemLogs() {
  const [filter, setFilter] = useState<'all' | 'error' | 'warning' | 'info'>('all');

  const logs = [
    {
      level: 'error',
      message: 'Failed to process payment for user john@example.com',
      timestamp: '2024-02-01 14:23:45',
      details: 'Payment gateway timeout'
    },
    {
      level: 'warning',
      message: 'High API usage detected for user sarah@example.com',
      timestamp: '2024-02-01 14:20:12',
      details: '95% of monthly limit reached'
    },
    {
      level: 'info',
      message: 'New user registration: mike@example.com',
      timestamp: '2024-02-01 14:15:30',
      details: 'Professional plan selected'
    },
    {
      level: 'info',
      message: 'Template approved: Modern Dashboard',
      timestamp: '2024-02-01 14:10:05',
      details: 'Approved by admin@horosoft.ai'
    },
  ];

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-orange-600" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />;
      default:
        return <CheckCircle className="w-5 h-5 text-green-600" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error':
        return 'bg-red-100 text-red-700';
      case 'warning':
        return 'bg-orange-100 text-orange-700';
      case 'info':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-green-100 text-green-700';
    }
  };

  const filteredLogs = filter === 'all' ? logs : logs.filter(log => log.level === filter);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2 text-slate-900">System Logs</h1>
        <p className="text-slate-600">Monitor system activities and errors</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Logs', value: '1,234', icon: FileText, color: 'blue' },
          { label: 'Errors', value: '12', icon: XCircle, color: 'red' },
          { label: 'Warnings', value: '45', icon: AlertCircle, color: 'orange' },
          { label: 'Info', value: '1,177', icon: Info, color: 'green' },
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

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search logs..."
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl"
          />
        </div>
        <div className="flex gap-2">
          {[
            { id: 'all', label: 'All' },
            { id: 'error', label: 'Errors' },
            { id: 'warning', label: 'Warnings' },
            { id: 'info', label: 'Info' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Logs List */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="divide-y divide-slate-200">
          {filteredLogs.map((log, i) => (
            <div key={i} className="p-6 hover:bg-slate-50">
              <div className="flex items-start gap-4">
                {getLevelIcon(log.level)}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-1 text-xs rounded ${getLevelColor(log.level)}`}>
                      {log.level.toUpperCase()}
                    </span>
                    <span className="text-sm text-slate-600">{log.timestamp}</span>
                  </div>
                  <div className="text-slate-900 mb-1">{log.message}</div>
                  <div className="text-sm text-slate-600">{log.details}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
