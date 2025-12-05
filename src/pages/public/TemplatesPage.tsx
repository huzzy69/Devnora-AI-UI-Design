import React, { useState } from 'react';
import { Search, Filter, Star, Download, Eye, ArrowRight } from 'lucide-react';
import PublicNavbar from '../../components/public/PublicNavbar';
import PublicFooter from '../../components/public/PublicFooter';

export default function TemplatesPage() {
  const [category, setCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Dashboard', 'Landing Page', 'E-commerce', 'Portfolio', 'Admin', 'Blog', 'SaaS'];
  
  const templates = [
    { name: 'Modern SaaS Dashboard', category: 'Dashboard', rating: 4.9, downloads: '12.5k', color: 'from-blue-500 to-cyan-500', premium: false },
    { name: 'E-commerce Storefront', category: 'E-commerce', rating: 4.8, downloads: '10.2k', color: 'from-purple-500 to-pink-500', premium: true },
    { name: 'Marketing Landing Page', category: 'Landing Page', rating: 4.7, downloads: '15.8k', color: 'from-orange-500 to-red-500', premium: false },
    { name: 'Admin Control Panel', category: 'Admin', rating: 4.9, downloads: '8.9k', color: 'from-green-500 to-emerald-500', premium: true },
    { name: 'Portfolio Website', category: 'Portfolio', rating: 4.6, downloads: '11.3k', color: 'from-indigo-500 to-purple-500', premium: false },
    { name: 'Blog Platform', category: 'Blog', rating: 4.8, downloads: '9.7k', color: 'from-pink-500 to-rose-500', premium: false },
    { name: 'SaaS Application', category: 'SaaS', rating: 5.0, downloads: '14.2k', color: 'from-blue-600 to-violet-600', premium: true },
    { name: 'Product Landing', category: 'Landing Page', rating: 4.7, downloads: '13.1k', color: 'from-cyan-500 to-blue-500', premium: false },
    { name: 'Food Delivery App', category: 'E-commerce', rating: 4.8, downloads: '7.5k', color: 'from-red-500 to-orange-500', premium: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
      <PublicNavbar />
      
      <section className="px-6 pt-32 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              1000+ Professional Templates
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              Kickstart your project with production-ready templates
            </p>

            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500"
                />
              </div>
              <button className="px-6 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white flex items-center gap-2 hover:bg-slate-800 transition-colors">
                <Filter className="w-5 h-5" />
                Filter
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat.toLowerCase())}
                className={`px-6 py-2 rounded-xl transition-all ${
                  category === cat.toLowerCase()
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all hover:scale-105">
                  <div className={`relative h-48 bg-gradient-to-br ${template.color} p-6`}>
                    {template.premium && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-500 text-slate-900 text-xs rounded-full">
                        Premium
                      </div>
                    )}
                    <div className="h-full bg-white/90 rounded-lg p-4 space-y-2">
                      <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                      <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        <div className="h-16 bg-slate-200 rounded"></div>
                        <div className="h-16 bg-slate-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-white mb-2">{template.name}</h3>
                    <div className="flex items-center justify-between text-sm mb-4">
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star className="w-4 h-4 fill-yellow-400" />
                        {template.rating}
                      </div>
                      <div className="text-slate-400">{template.downloads} downloads</div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition-colors flex items-center justify-center gap-2">
                        <Eye className="w-4 h-4" />
                        Preview
                      </button>
                      <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
