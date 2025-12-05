import React, { useState } from 'react';
import MarketingHeader from '../../components/marketing/MarketingHeader';
import MarketingFooter from '../../components/marketing/MarketingFooter';
import { Search, BookOpen, Video, FileText, Code, Sparkles, Clock, TrendingUp } from 'lucide-react';

export default function LearningHubPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Resources', icon: BookOpen },
    { id: 'tutorials', name: 'Tutorials', icon: Video },
    { id: 'docs', name: 'Documentation', icon: FileText },
    { id: 'guides', name: 'Guides', icon: BookOpen },
    { id: 'videos', name: 'Videos', icon: Video }
  ];

  const resources = [
    { title: 'Getting Started with AI Code Generator', category: 'tutorials', type: 'Tutorial', duration: '15 min', views: '12.5K', image: 'https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?w=400&h=250&fit=crop' },
    { title: 'Website Replicator Complete Guide', category: 'guides', type: 'Guide', duration: '25 min', views: '8.3K', image: 'https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?w=400&h=250&fit=crop' },
    { title: 'Building Your First Workflow', category: 'tutorials', type: 'Tutorial', duration: '20 min', views: '15.2K', image: 'https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?w=400&h=250&fit=crop' },
    { title: 'API Documentation', category: 'docs', type: 'Docs', duration: '10 min', views: '22.1K', image: 'https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?w=400&h=250&fit=crop' },
    { title: 'Deployment Best Practices', category: 'guides', type: 'Guide', duration: '18 min', views: '9.7K', image: 'https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?w=400&h=250&fit=crop' },
    { title: 'Template Customization Tutorial', category: 'videos', type: 'Video', duration: '30 min', views: '18.9K', image: 'https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?w=400&h=250&fit=crop' }
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <MarketingHeader />

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-sm">Learning Hub</span>
            </div>
            <h1 className="text-5xl sm:text-6xl text-white mb-6">
              Learn{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Horosoft AI
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
              Tutorials, guides, and documentation to help you build better, faster.
            </p>

            {/* Search */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search tutorials, guides, and docs..."
                className="w-full pl-12 pr-4 py-4 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl transition-all flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-slate-900/50 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                }`}
              >
                <category.icon className="w-4 h-4" />
                {category.name}
              </button>
            ))}
          </div>

          {/* Resources Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, i) => (
              <div key={i} className="group bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all hover:shadow-xl hover:shadow-purple-500/10">
                <div className="relative aspect-video overflow-hidden bg-slate-800">
                  <img src={resource.image} alt={resource.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-blue-600 text-white text-xs rounded-full">
                    {resource.type}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-white text-lg mb-3 group-hover:text-blue-400 transition-colors">
                    {resource.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {resource.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      {resource.views}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
