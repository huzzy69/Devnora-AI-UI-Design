import React, { useState } from 'react';
import { Layout, Check, X, Eye, Flag } from 'lucide-react';

export default function TemplateModeration() {
  const [filter, setFilter] = useState<'pending' | 'approved' | 'rejected'>('pending');

  const templates = [
    {
      name: 'Modern SaaS Dashboard',
      author: 'John Doe',
      category: 'Dashboard',
      submitted: '2 hours ago',
      status: 'pending',
      thumbnail: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'E-commerce Store',
      author: 'Sarah Smith',
      category: 'E-commerce',
      submitted: '5 hours ago',
      status: 'pending',
      thumbnail: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Portfolio Website',
      author: 'Mike Johnson',
      category: 'Portfolio',
      submitted: '1 day ago',
      status: 'approved',
      thumbnail: 'from-green-500 to-emerald-500'
    },
  ];

  const filteredTemplates = templates.filter(t => t.status === filter);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2 text-slate-900">Template Moderation</h1>
        <p className="text-slate-600">Review and approve submitted templates</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Pending Review', value: '12', color: 'orange' },
          { label: 'Approved', value: '234', color: 'green' },
          { label: 'Rejected', value: '18', color: 'red' },
          { label: 'Flagged', value: '3', color: 'yellow' },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-6">
            <div className={`text-3xl mb-1 text-${stat.color}-600`}>{stat.value}</div>
            <div className="text-sm text-slate-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 border-b border-slate-200">
        {[
          { id: 'pending', label: 'Pending' },
          { id: 'approved', label: 'Approved' },
          { id: 'rejected', label: 'Rejected' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`px-6 py-3 border-b-2 transition-colors ${
              filter === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredTemplates.map((template, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className={`h-40 bg-gradient-to-br ${template.thumbnail} p-6`}></div>
            <div className="p-4">
              <h3 className="text-lg text-slate-900 mb-2">{template.name}</h3>
              <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
                <span>By {template.author}</span>
                <span>{template.submitted}</span>
              </div>
              <div className="flex gap-2">
                {filter === 'pending' && (
                  <>
                    <button className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg flex items-center justify-center gap-2">
                      <Check className="w-4 h-4" />
                      Approve
                    </button>
                    <button className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg flex items-center justify-center gap-2">
                      <X className="w-4 h-4" />
                      Reject
                    </button>
                  </>
                )}
                <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
