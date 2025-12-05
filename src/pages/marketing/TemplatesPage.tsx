import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MarketingHeader from '../../components/marketing/MarketingHeader';
import MarketingFooter from '../../components/marketing/MarketingFooter';
import { Search, Filter, Star, Eye, Download, Sparkles } from 'lucide-react';

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Templates', count: 247 },
    { id: 'website', name: 'Websites', count: 89 },
    { id: 'dashboard', name: 'Dashboards', count: 54 },
    { id: 'app', name: 'Web Apps', count: 43 },
    { id: 'saas', name: 'SaaS', count: 32 },
    { id: 'ecommerce', name: 'E-commerce', count: 18 },
    { id: 'portfolio', name: 'Portfolio', count: 11 }
  ];

  const templates = [
    {
      id: 1,
      name: 'Modern SaaS Dashboard',
      category: 'saas',
      image: 'https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?w=400&h=300&fit=crop',
      rating: 4.9,
      downloads: 2847,
      price: 'Free',
      featured: true,
      tags: ['Dashboard', 'Analytics', 'Charts']
    },
    {
      id: 2,
      name: 'E-commerce Store',
      category: 'ecommerce',
      image: 'https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?w=400&h=300&fit=crop',
      rating: 4.8,
      downloads: 1923,
      price: 'Pro',
      featured: true,
      tags: ['Shop', 'Products', 'Cart']
    },
    {
      id: 3,
      name: 'Creative Portfolio',
      category: 'portfolio',
      image: 'https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?w=400&h=300&fit=crop',
      rating: 4.7,
      downloads: 1456,
      price: 'Free',
      featured: false,
      tags: ['Portfolio', 'Creative', 'Minimal']
    },
    {
      id: 4,
      name: 'AI Chat Interface',
      category: 'app',
      image: 'https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?w=400&h=300&fit=crop',
      rating: 5.0,
      downloads: 3421,
      price: 'Pro',
      featured: true,
      tags: ['AI', 'Chat', 'Interface']
    },
    {
      id: 5,
      name: 'Marketing Landing Page',
      category: 'website',
      image: 'https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?w=400&h=300&fit=crop',
      rating: 4.9,
      downloads: 2156,
      price: 'Free',
      featured: false,
      tags: ['Marketing', 'Landing', 'CTA']
    },
    {
      id: 6,
      name: 'Admin Panel',
      category: 'dashboard',
      image: 'https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?w=400&h=300&fit=crop',
      rating: 4.8,
      downloads: 1789,
      price: 'Free',
      featured: false,
      tags: ['Admin', 'Management', 'CRUD']
    },
    {
      id: 7,
      name: 'Project Management',
      category: 'app',
      image: 'https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?w=400&h=300&fit=crop',
      rating: 4.9,
      downloads: 2634,
      price: 'Pro',
      featured: true,
      tags: ['Kanban', 'Tasks', 'Team']
    },
    {
      id: 8,
      name: 'SaaS Pricing Page',
      category: 'website',
      image: 'https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?w=400&h=300&fit=crop',
      rating: 4.7,
      downloads: 1234,
      price: 'Free',
      featured: false,
      tags: ['Pricing', 'Plans', 'Billing']
    },
    {
      id: 9,
      name: 'Finance Dashboard',
      category: 'dashboard',
      image: 'https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?w=400&h=300&fit=crop',
      rating: 5.0,
      downloads: 3156,
      price: 'Pro',
      featured: true,
      tags: ['Finance', 'Analytics', 'Reports']
    }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950">
      <MarketingHeader />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-sm">247+ Professional Templates</span>
            </div>
            <h1 className="text-5xl sm:text-6xl text-white mb-6">
              Template{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Marketplace
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
              Production-ready templates for websites, dashboards, apps, and more. Start building in seconds.
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <button className="px-6 py-3 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl text-white hover:bg-slate-800 transition-colors flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-xl transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-slate-900/50 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                }`}
              >
                {category.name} <span className="text-slate-400">({category.count})</span>
              </button>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <Link
                key={template.id}
                to={`/template/${template.id}`}
                className="group bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all hover:shadow-xl hover:shadow-purple-500/10"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-800">
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {template.featured && (
                    <div className="absolute top-3 right-3 px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs rounded-full">
                      Featured
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button className="p-3 bg-white/10 backdrop-blur-xl rounded-xl text-white hover:bg-white/20 transition-colors">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="p-3 bg-blue-600 rounded-xl text-white hover:bg-blue-500 transition-colors">
                      Use Template
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-white group-hover:text-blue-400 transition-colors">
                      {template.name}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded ${
                      template.price === 'Free'
                        ? 'bg-green-600/20 text-green-400'
                        : 'bg-blue-600/20 text-blue-400'
                    }`}>
                      {template.price}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-slate-800 text-slate-400 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      <span>{template.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      <span>{template.downloads.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl text-white hover:bg-slate-800 transition-colors">
              Load More Templates
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl text-white mb-6">
            Can't Find What You{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Need?
            </span>
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Use our AI generators to create custom templates from scratch
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all text-lg"
          >
            Generate Custom Template
          </Link>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
