import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import MarketingHeader from '../../components/marketing/MarketingHeader';
import MarketingFooter from '../../components/marketing/MarketingFooter';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { 
  ArrowLeft, Star, Download, Eye, Code, Smartphone, Monitor, 
  Sparkles, Check, ExternalLink, Copy, Play
} from 'lucide-react';

export default function TemplatePreviewPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const template = {
    id: 1,
    name: 'Modern SaaS Dashboard',
    category: 'SaaS',
    description: 'A complete, production-ready SaaS dashboard with analytics, user management, billing, and more. Built with React, TypeScript, and Tailwind CSS.',
    fullDescription: 'This comprehensive SaaS dashboard template includes everything you need to launch your product. Features a modern design with glassmorphism effects, smooth animations, and a complete component library. Perfect for startups and enterprises alike.',
    image: 'https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?w=1200&h=800&fit=crop',
    rating: 4.9,
    reviews: 847,
    downloads: 2847,
    price: 'Free',
    lastUpdated: '2 days ago',
    version: '2.1.0',
    author: 'Horosoft Team',
    frameworks: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    features: [
      'Complete authentication system',
      'User dashboard with analytics',
      'Billing & subscription management',
      'Team collaboration features',
      'API integration examples',
      'Responsive design (mobile-first)',
      'Dark mode support',
      '100+ pre-built components',
      'TypeScript for type safety',
      'Production-ready code',
      'Extensive documentation',
      'Regular updates & support'
    ],
    includes: [
      '50+ Page templates',
      '100+ UI Components',
      'Authentication flow',
      'Dashboard layouts',
      'Form examples',
      'Chart & graph components',
      'Table components',
      'Modal & dialog components',
      'Navigation components',
      'Icon library integration'
    ],
    tags: ['Dashboard', 'SaaS', 'Analytics', 'Admin', 'React', 'TypeScript']
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <MarketingHeader />

      <section className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Link 
            to="/templates"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Templates
          </Link>

          {/* Header Info */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-4xl text-white">{template.name}</h1>
                    <span className={`px-3 py-1 text-sm rounded-full ${
                      template.price === 'Free'
                        ? 'bg-green-600/20 text-green-400'
                        : 'bg-blue-600/20 text-blue-400'
                    }`}>
                      {template.price}
                    </span>
                  </div>
                  <p className="text-slate-400 text-lg mb-4">{template.description}</p>
                  <div className="flex items-center gap-6 text-sm text-slate-400">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      <span className="text-white">{template.rating}</span>
                      <span>({template.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      <span>{template.downloads.toLocaleString()} downloads</span>
                    </div>
                    <div>Updated {template.lastUpdated}</div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {template.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-900/50 border border-slate-800 text-slate-300 text-sm rounded-lg">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2">
                Use Template <ArrowLeft className="w-5 h-5 rotate-180" />
              </button>
              <button className="w-full px-6 py-3 bg-slate-900 border border-slate-800 text-white rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                <Eye className="w-5 h-5" /> Live Preview
              </button>
              <button className="w-full px-6 py-3 bg-slate-900 border border-slate-800 text-white rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                <Download className="w-5 h-5" /> Download ZIP
              </button>
              <button className="w-full px-6 py-3 bg-slate-900 border border-slate-800 text-white rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                <Code className="w-5 h-5" /> View Code
              </button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="mb-12">
            {/* Device Selector */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <button
                onClick={() => setActiveTab('desktop')}
                className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                  activeTab === 'desktop'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                <Monitor className="w-4 h-4" /> Desktop
              </button>
              <button
                onClick={() => setActiveTab('tablet')}
                className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                  activeTab === 'tablet'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                <Monitor className="w-4 h-4" /> Tablet
              </button>
              <button
                onClick={() => setActiveTab('mobile')}
                className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                  activeTab === 'mobile'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-4 h-4" /> Mobile
              </button>
            </div>

            {/* Preview Frame */}
            <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 blur-3xl"></div>
              <div className={`relative mx-auto transition-all duration-300 ${
                activeTab === 'desktop' ? 'max-w-full' : 
                activeTab === 'tablet' ? 'max-w-3xl' : 'max-w-md'
              }`}>
                <ImageWithFallback
                  src={template.image}
                  alt={template.name}
                  className="w-full rounded-xl shadow-2xl"
                />
                {/* Browser Chrome */}
                <div className="absolute top-0 left-0 right-0 h-8 bg-slate-800/50 backdrop-blur-xl rounded-t-xl flex items-center px-4 gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex-1 ml-4 bg-slate-900 rounded px-3 py-1 text-xs text-slate-400">
                    https://preview.horosoft.com/{template.name.toLowerCase().replace(/\s+/g, '-')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Features & Includes */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8">
                <h2 className="text-2xl text-white mb-4">About This Template</h2>
                <p className="text-slate-300 leading-relaxed mb-6">
                  {template.fullDescription}
                </p>
                <p className="text-slate-300 leading-relaxed">
                  Built with modern technologies and best practices, this template provides a solid foundation for your next project. Every component is carefully crafted to ensure optimal performance, accessibility, and user experience.
                </p>
              </div>

              {/* Features */}
              <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8">
                <h2 className="text-2xl text-white mb-6">Features</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {template.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What's Included */}
              <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8">
                <h2 className="text-2xl text-white mb-6">What's Included</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {template.includes.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* Tech Stack */}
              <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6">
                <h3 className="text-white text-lg mb-4">Tech Stack</h3>
                <div className="space-y-2">
                  {template.frameworks.map((framework, i) => (
                    <div key={i} className="px-3 py-2 bg-slate-800/50 text-slate-300 text-sm rounded-lg">
                      {framework}
                    </div>
                  ))}
                </div>
              </div>

              {/* Template Info */}
              <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6">
                <h3 className="text-white text-lg mb-4">Template Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Version</span>
                    <span className="text-white">{template.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Category</span>
                    <span className="text-white">{template.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Author</span>
                    <span className="text-white">{template.author}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">License</span>
                    <span className="text-white">MIT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Last Updated</span>
                    <span className="text-white">{template.lastUpdated}</span>
                  </div>
                </div>
              </div>

              {/* Share */}
              <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6">
                <h3 className="text-white text-lg mb-4">Share Template</h3>
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2">
                    <Copy className="w-4 h-4" />
                  </button>
                  <button className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Support */}
              <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-6">
                <div className="flex items-center gap-2 text-blue-400 mb-3">
                  <Sparkles className="w-5 h-5" />
                  <h3 className="text-white">Premium Support</h3>
                </div>
                <p className="text-slate-300 text-sm mb-4">
                  Get help with setup, customization, and deployment.
                </p>
                <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors">
                  Get Support
                </button>
              </div>
            </div>
          </div>

          {/* Related Templates */}
          <div className="mt-16">
            <h2 className="text-3xl text-white mb-8">Similar Templates</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Link
                  key={i}
                  to={`/template/${i + 1}`}
                  className="group bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all"
                >
                  <div className="relative aspect-video bg-slate-800 overflow-hidden">
                    <ImageWithFallback
                      src={`https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?w=400&h=300&fit=crop&sig=${i}`}
                      alt={`Template ${i}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-white mb-2 group-hover:text-blue-400 transition-colors">
                      Template {i + 1}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-slate-400">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        <span>4.{8 + i}</span>
                      </div>
                      <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded">Free</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
