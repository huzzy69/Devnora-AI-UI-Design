import React from 'react';
import { Layout, Star, Download, Eye } from 'lucide-react';

export default function TemplateLibrary() {
  const templates = [
    { name: 'SaaS Dashboard', category: 'Dashboard', rating: 4.9, downloads: '12.5k', color: 'from-blue-500 to-cyan-500' },
    { name: 'E-commerce', category: 'E-commerce', rating: 4.8, downloads: '10.2k', color: 'from-purple-500 to-pink-500' },
    { name: 'Landing Page', category: 'Marketing', rating: 4.7, downloads: '15.8k', color: 'from-orange-500 to-red-500' },
    { name: 'Admin Panel', category: 'Admin', rating: 4.9, downloads: '8.9k', color: 'from-green-500 to-emerald-500' },
    { name: 'Portfolio', category: 'Portfolio', rating: 4.6, downloads: '11.3k', color: 'from-indigo-500 to-purple-500' },
    { name: 'Blog', category: 'Blog', rating: 4.8, downloads: '9.7k', color: 'from-pink-500 to-rose-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl text-white mb-2">Template Library</h1>
        <p className="text-slate-400">Choose from 1000+ professional templates</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all">
            <div className={`h-40 bg-gradient-to-br ${template.color} p-6`}>
              <div className="h-full bg-white/90 rounded-lg"></div>
            </div>
            <div className="p-4">
              <h3 className="text-white mb-1">{template.name}</h3>
              <div className="flex items-center justify-between text-sm mb-3">
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="w-4 h-4 fill-yellow-400" />
                  {template.rating}
                </div>
                <span className="text-slate-400">{template.downloads}</span>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg flex items-center justify-center gap-1">
                  <Eye className="w-4 h-4" />
                  Preview
                </button>
                <button className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm rounded-lg">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
