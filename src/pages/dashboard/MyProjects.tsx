import React, { useState } from 'react';
import { Grid, List, Plus, Search, Filter, MoreVertical, Edit, Trash, Copy, ExternalLink, Download } from 'lucide-react';

export default function MyProjects() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const projects = [
    { name: 'E-commerce Dashboard', type: 'Dashboard', status: 'active', lastEdited: '2 hours ago', progress: 85, color: 'from-blue-500 to-cyan-500' },
    { name: 'Marketing Landing Page', type: 'Website', status: 'deployed', lastEdited: '1 day ago', progress: 100, color: 'from-purple-500 to-pink-500' },
    { name: 'SaaS Admin Panel', type: 'Admin', status: 'active', lastEdited: '3 days ago', progress: 60, color: 'from-green-500 to-emerald-500' },
    { name: 'Portfolio Website', type: 'Portfolio', status: 'draft', lastEdited: '1 week ago', progress: 30, color: 'from-orange-500 to-red-500' },
    { name: 'Blog Platform', type: 'Blog', status: 'active', lastEdited: '5 days ago', progress: 75, color: 'from-indigo-500 to-purple-500' },
    { name: 'Mobile App UI', type: 'Mobile', status: 'draft', lastEdited: '2 weeks ago', progress: 20, color: 'from-pink-500 to-rose-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl text-white mb-2">My Projects</h1>
          <p className="text-slate-400">{projects.length} total projects</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl flex items-center gap-2">
          <Plus className="w-5 h-5" />
          New Project
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-white"
          />
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white flex items-center gap-2 hover:bg-slate-800">
            <Filter className="w-5 h-5" />
            Filter
          </button>
          <div className="flex gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div key={i} className="group bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all">
              <div className={`h-32 bg-gradient-to-br ${project.color} p-4 flex items-end`}>
                <div className="w-full h-full bg-white/90 rounded-lg p-3 space-y-2">
                  <div className="h-2 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-2 bg-slate-200 rounded w-1/2"></div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="h-10 bg-slate-200 rounded"></div>
                    <div className="h-10 bg-slate-200 rounded"></div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-white mb-1">{project.name}</h3>
                    <p className="text-sm text-slate-400">{project.type}</p>
                  </div>
                  <div className="relative">
                    <button className="p-1 hover:bg-slate-800 rounded-lg transition-colors">
                      <MoreVertical className="w-5 h-5 text-slate-400" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                  <span className={`px-2 py-1 rounded ${
                    project.status === 'active' ? 'bg-blue-500/20 text-blue-400' :
                    project.status === 'deployed' ? 'bg-green-500/20 text-green-400' :
                    'bg-slate-700 text-slate-400'
                  }`}>
                    {project.status}
                  </span>
                  <span>•</span>
                  <span>{project.lastEdited}</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${project.color} rounded-full`} style={{ width: `${project.progress}%` }}></div>
                  </div>
                  <span className="text-xs text-slate-400">{project.progress}%</span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition-colors flex items-center justify-center gap-1">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm rounded-lg transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-3">
          {projects.map((project, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors">
              <div className={`w-16 h-16 bg-gradient-to-br ${project.color} rounded-lg flex-shrink-0`}></div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white mb-1">{project.name}</h3>
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <span>{project.type}</span>
                  <span>•</span>
                  <span>{project.lastEdited}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs ${
                  project.status === 'active' ? 'bg-blue-500/20 text-blue-400' :
                  project.status === 'deployed' ? 'bg-green-500/20 text-green-400' :
                  'bg-slate-700 text-slate-400'
                }`}>
                  {project.status}
                </span>
                <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                  <Edit className="w-4 h-4 text-slate-400" />
                </button>
                <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                  <Copy className="w-4 h-4 text-slate-400" />
                </button>
                <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                  <Download className="w-4 h-4 text-slate-400" />
                </button>
                <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                  <Trash className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
