import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Code, Globe, Zap, Layout, Bot, Workflow, Rocket, Database, Lock, Users, TrendingUp, Check, Star, ArrowRight, Play, Download, Copy, MessageSquare, Phone, ChevronDown, Menu, X } from 'lucide-react';
import PublicNavbar from '../../components/public/PublicNavbar';
import PublicFooter from '../../components/public/PublicFooter';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

export default function HomePage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const allTemplates = [
    // Dashboard Templates
    { name: 'Modern SaaS Dashboard', category: 'Dashboard', rating: 4.9, downloads: '12.5k', premium: false, borderColor: 'border-blue-500' },
    { name: 'Analytics Dashboard', category: 'Dashboard', rating: 4.8, downloads: '11.3k', premium: true, borderColor: 'border-blue-500' },
    { name: 'CRM Dashboard', category: 'Dashboard', rating: 4.7, downloads: '9.8k', premium: false, borderColor: 'border-cyan-500' },
    
    // Landing Page Templates
    { name: 'Marketing Landing Page', category: 'Landing Page', rating: 4.7, downloads: '15.8k', premium: false, borderColor: 'border-orange-500' },
    { name: 'Product Landing', category: 'Landing Page', rating: 4.8, downloads: '16.2k', premium: true, borderColor: 'border-orange-500' },
    { name: 'App Launch Landing', category: 'Landing Page', rating: 4.6, downloads: '13.4k', premium: false, borderColor: 'border-red-500' },
    
    // E-commerce Templates
    { name: 'E-commerce Storefront', category: 'E-commerce', rating: 4.8, downloads: '10.2k', premium: true, borderColor: 'border-purple-500' },
    { name: 'E-commerce Analytics', category: 'E-commerce', rating: 4.7, downloads: '9.1k', premium: false, borderColor: 'border-purple-500' },
    { name: 'Online Store Multi-vendor', category: 'E-commerce', rating: 4.9, downloads: '12.7k', premium: true, borderColor: 'border-violet-500' },
    
    // Portfolio Templates
    { name: 'Creative Portfolio', category: 'Portfolio', rating: 4.6, downloads: '11.2k', premium: false, borderColor: 'border-indigo-500' },
    { name: 'Designer Portfolio', category: 'Portfolio', rating: 4.8, downloads: '10.5k', premium: false, borderColor: 'border-indigo-500' },
    { name: 'Photography Portfolio', category: 'Portfolio', rating: 4.7, downloads: '8.9k', premium: true, borderColor: 'border-blue-500' },
    
    // Admin Templates
    { name: 'Admin Control Panel', category: 'Admin', rating: 4.9, downloads: '8.3k', premium: true, borderColor: 'border-green-500' },
    { name: 'Admin Analytics', category: 'Admin', rating: 4.7, downloads: '11.3k', premium: false, borderColor: 'border-green-500' },
    { name: 'User Management Admin', category: 'Admin', rating: 4.8, downloads: '7.6k', premium: false, borderColor: 'border-emerald-500' },
    
    // Blog Templates
    { name: 'Blog Magazine Layout', category: 'Blog', rating: 4.5, downloads: '7.8k', premium: false, borderColor: 'border-cyan-500' },
    { name: 'Personal Blog', category: 'Blog', rating: 4.6, downloads: '9.2k', premium: false, borderColor: 'border-teal-500' },
    { name: 'Tech Blog Platform', category: 'Blog', rating: 4.8, downloads: '10.4k', premium: true, borderColor: 'border-cyan-500' },
    
    // SaaS Templates
    { name: 'Social Media App', category: 'SaaS', rating: 4.8, downloads: '13.7k', premium: false, borderColor: 'border-pink-500' },
    { name: 'SaaS Pricing Page', category: 'SaaS', rating: 4.9, downloads: '14.2k', premium: true, borderColor: 'border-blue-500' },
    { name: 'Project Management SaaS', category: 'SaaS', rating: 4.7, downloads: '12.1k', premium: true, borderColor: 'border-pink-500' }
  ];

  const categories = ['All', 'Dashboard', 'Landing Page', 'E-commerce', 'Portfolio', 'Admin', 'Blog', 'SaaS'];

  const filteredTemplates = selectedCategory === 'All' 
    ? allTemplates 
    : allTemplates.filter(template => template.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
      <PublicNavbar />
      
      {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950/50 to-slate-950"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6 hover:bg-blue-500/20 transition-all">
              <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
              <span className="text-sm text-blue-300">Powered by Advanced AI Technology</span>
              <span className="px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full">New</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent leading-tight">
              Build Anything with AI
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-4 max-w-4xl mx-auto leading-relaxed">
              Generate complete websites, apps, dashboards, and entire software systems through simple prompts. <span className="text-blue-400">10x faster development</span> with enterprise-grade quality.
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-8 text-slate-400">
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-900/50 border border-slate-800 rounded-lg">
                <Code className="w-5 h-5 text-blue-400" />
                <span>AI Code Generator</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-900/50 border border-slate-800 rounded-lg">
                <Globe className="w-5 h-5 text-green-400" />
                <span>Website Replicator</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-900/50 border border-slate-800 rounded-lg">
                <Workflow className="w-5 h-5 text-purple-400" />
                <span>Workflow Builder</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-900/50 border border-slate-800 rounded-lg">
                <Database className="w-5 h-5 text-orange-400" />
                <span>API Architecture</span>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Link to="/signup" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2 group">
                <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                Start Building Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button 
                onClick={() => setIsVideoPlaying(true)}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl transition-all flex items-center gap-2 backdrop-blur-sm group"
              >
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </button>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10"></div>
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-500/10">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Code Window */}
                  <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-3 bg-slate-900 border-b border-slate-800">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <span className="text-xs text-slate-400 ml-2">AI Generated Code</span>
                    </div>
                    <div className="p-4 font-mono text-sm">
                      <div className="text-purple-400">import <span className="text-blue-400">React</span> from <span className="text-green-400">'react'</span>;</div>
                      <div className="text-slate-500 mt-2">// AI-generated component</div>
                      <div className="text-blue-400 mt-1">export default function <span className="text-yellow-400">Dashboard</span>() {'{'}</div>
                      <div className="text-slate-300 ml-4">return (</div>
                      <div className="text-pink-400 ml-8">&lt;div <span className="text-blue-400">className</span>=<span className="text-green-400">"dashboard"</span>&gt;</div>
                      <div className="text-slate-400 ml-12">...</div>
                      <div className="text-pink-400 ml-8">&lt;/div&gt;</div>
                      <div className="text-slate-300 ml-4">)</div>
                      <div className="text-blue-400">{'}'}</div>
                    </div>
                  </div>

                  {/* Preview Window */}
                  <div className="bg-white rounded-xl border border-slate-300 overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-3 bg-slate-100 border-b border-slate-300">
                      <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-slate-600">localhost:3000</div>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50">
                      <div className="flex items-center justify-between mb-4">
                        <div className="h-8 w-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded"></div>
                        <div className="flex gap-2">
                          <div className="h-8 w-8 bg-slate-300 rounded"></div>
                          <div className="h-8 w-8 bg-slate-300 rounded"></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="h-20 bg-white rounded shadow-sm"></div>
                        ))}
                      </div>
                      <div className="h-32 bg-white rounded shadow-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4 text-white">Everything you need to build</h2>
            <p className="text-xl text-slate-400">Powerful tools for modern development</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Code,
                title: 'AI Code Generator',
                description: 'Generate production-ready code in any framework with natural language prompts',
                color: 'blue'
              },
              {
                icon: Globe,
                title: 'Website Replicator',
                description: 'Clone and recreate any website by simply entering its URL',
                color: 'green'
              },
              {
                icon: Layout,
                title: 'Template Library',
                description: '1000+ pre-built templates for instant project kickstart',
                color: 'purple'
              },
              {
                icon: Workflow,
                title: 'Visual Workflow Builder',
                description: 'Build complex automations with drag-and-drop interface',
                color: 'orange'
              },
              {
                icon: Bot,
                title: 'AI Chat & Voice Agents',
                description: 'Create intelligent chatbots and voice assistants',
                color: 'pink'
              },
              {
                icon: Rocket,
                title: 'One-Click Deployment',
                description: 'Deploy to production instantly with custom domains',
                color: 'cyan'
              },
              {
                icon: Database,
                title: 'API Architecture',
                description: 'Generate complete backend APIs and database schemas',
                color: 'red'
              },
              {
                icon: Users,
                title: 'Team Collaboration',
                description: 'Multi-tenant workspaces with role-based access',
                color: 'indigo'
              },
              {
                icon: Lock,
                title: 'Enterprise Security',
                description: 'Bank-grade security with SOC 2 compliance',
                color: 'slate'
              }
            ].map((feature, i) => (
              <div key={i} className="group p-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all">
                <div className={`w-12 h-12 bg-${feature.color}-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 text-${feature.color}-400`} />
                </div>
                <h3 className="text-xl text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Website Replicator Showcase */}
      <section className="relative px-6 py-20 bg-gradient-to-b from-blue-950/30 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-6">
              <Globe className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-300">AI Website Replicator</span>
            </div>
            <h2 className="text-4xl md:text-5xl mb-4 text-white">Clone any website in seconds</h2>
            <p className="text-xl text-slate-400">Advanced AI reverse engineering technology</p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
            <div className="p-8">
              {/* URL Input Demo */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 mb-6">
                <label className="block text-sm text-slate-400 mb-3">Enter any website URL</label>
                <div className="flex gap-3">
                  <input 
                    type="text"
                    value="https://horosoft.com"
                    readOnly
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white"
                  />
                  <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Replicate
                  </button>
                </div>
              </div>

              {/* Scanning Animation */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">Analyzing structure...</span>
                    <span className="text-green-400">100%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-r from-green-600 to-green-400 rounded-full"></div>
                  </div>

                  <div className="space-y-3 mt-6">
                    {['Header Navigation', 'Hero Section', 'Features Grid', 'Testimonials', 'Footer'].map((section, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-slate-900 border border-slate-800 rounded-lg">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-sm text-slate-300">{section}</span>
                        <Check className="w-4 h-4 text-green-400 ml-auto" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                  <div className="text-xs text-slate-400 mb-3">Reconstructed Preview</div>
                  <div className="bg-white rounded-lg overflow-hidden">
                    <div className="h-4 bg-slate-800 flex items-center px-2 gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="h-8 bg-gradient-to-r from-blue-300 to-purple-300 rounded"></div>
                      <div className="h-20 bg-slate-100 rounded"></div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="h-12 bg-slate-200 rounded"></div>
                        <div className="h-12 bg-slate-200 rounded"></div>
                        <div className="h-12 bg-slate-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button className="flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <Download className="w-4 h-4" />
                  Export Code
                </button>
                <button className="flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <Copy className="w-4 h-4" />
                  Save as Template
                </button>
                <button className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <Zap className="w-4 h-4" />
                  Edit with AI
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl mb-4 text-white">1000+ Ready Templates</h2>
              <p className="text-xl text-slate-400">
                {selectedCategory === 'All' 
                  ? `Showing all ${filteredTemplates.length} templates` 
                  : `${filteredTemplates.length} ${selectedCategory} templates`}
              </p>
            </div>
            <Link to="/templates" className="hidden md:flex px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-xl transition-all items-center gap-2">
              Browse All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex gap-3 mb-8 pb-6 border-b border-white/10 overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 min-w-max">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-xl transition-all whitespace-nowrap font-medium ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-105'
                      : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white hover:scale-105'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {filteredTemplates.map((template, i) => (
              <div key={`${template.category}-${template.name}-${i}`} className="group">
                <div className={`relative overflow-hidden rounded-2xl border-4 ${template.borderColor} bg-slate-900 transition-all hover:shadow-2xl hover:shadow-${template.borderColor}/20`}>
                  {template.premium && (
                    <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-yellow-500 text-slate-900 text-xs rounded-full">
                      Premium
                    </div>
                  )}
                  
                  <div className="p-6 bg-gradient-to-br from-slate-100 to-slate-200">
                    <div className="space-y-2 mb-3">
                      <div className="h-3 bg-slate-300 rounded w-3/4"></div>
                      <div className="h-3 bg-slate-300 rounded w-1/2"></div>
                    </div>
                    <div className="bg-white rounded-lg p-3 space-y-2">
                      <div className="h-2 bg-slate-200 rounded w-full"></div>
                      <div className="h-2 bg-slate-200 rounded w-4/5"></div>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="h-14 bg-slate-100 rounded"></div>
                        <div className="h-14 bg-slate-100 rounded"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-slate-950">
                    <h3 className="text-white mb-1">{template.name}</h3>
                    <div className="flex items-center justify-between text-sm mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-yellow-400">{template.rating}</span>
                      </div>
                      <span className="text-slate-400">{template.downloads} downloads</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all flex items-center justify-center gap-2">
                        <Play className="w-4 h-4" />
                        Preview
                      </button>
                      <button className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all">
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

      {/* Pricing Preview */}
      <section className="relative px-6 py-20 bg-gradient-to-b from-transparent to-blue-950/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4 text-white">Simple, transparent pricing</h2>
            <p className="text-xl text-slate-400">Choose the perfect plan for your needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Starter',
                price: '$29',
                period: '/month',
                features: ['10,000 AI Credits', '50 Projects', 'Basic Templates', 'Community Support'],
                popular: false
              },
              {
                name: 'Professional',
                price: '$79',
                period: '/month',
                features: ['100,000 AI Credits', 'Unlimited Projects', 'All Templates', 'Priority Support', 'Custom Domains'],
                popular: true
              },
              {
                name: 'Enterprise',
                price: '$299',
                period: '/month',
                features: ['Unlimited AI Credits', 'Unlimited Everything', 'White Label', 'Dedicated Support', 'Custom Integration'],
                popular: false
              }
            ].map((plan, i) => (
              <div key={i} className={`relative p-8 rounded-2xl border transition-all ${plan.popular ? 'bg-gradient-to-b from-blue-600/20 to-purple-600/20 border-blue-500/50 scale-105' : 'bg-white/5 border-white/10'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-5xl text-white">{plan.price}</span>
                  <span className="text-slate-400">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-slate-300">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to="/signup" className={`block w-full px-6 py-3 rounded-xl text-center transition-all ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                  Get Started
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/pricing" className="text-blue-400 hover:text-blue-300 transition-colors flex items-center justify-center gap-2">
              View all pricing options
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4 text-white">Loved by developers worldwide</h2>
            <p className="text-xl text-slate-400">Join 50,000+ users building with AI</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Sarah Chen',
                role: 'Founder, TechStartup',
                content: 'Horosoft AI Builder reduced our development time by 80%. We shipped our MVP in just 2 weeks!',
                image: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDA4Mzg3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
              },
              {
                name: 'Michael Rodriguez',
                role: 'Full-Stack Developer',
                content: 'The website replicator is mind-blowing. I recreated a complex site in minutes instead of days.',
                image: 'https://images.unsplash.com/photo-1762341120638-b5b9358ef571?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBlcnNvbnxlbnwxfHx8fDE3NjQxMDY1NzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
              },
              {
                name: 'Emily Watson',
                role: 'Product Manager',
                content: 'Best AI builder on the market. The quality of generated code is production-ready out of the box.',
                image: 'https://images.unsplash.com/photo-1661286178389-e067299f907e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwZW50cmVwcmVuZXVyfGVufDF8fHx8MTc2NDE1OTU5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
              }
            ].map((testimonial, i) => (
              <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <ImageWithFallback 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/30"
                  />
                  <div>
                    <div className="text-white">{testimonial.name}</div>
                    <div className="text-sm text-slate-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-3xl backdrop-blur-xl">
            <h2 className="text-4xl md:text-5xl mb-6 text-white">Ready to build the future?</h2>
            <p className="text-xl text-slate-300 mb-8">Start creating with AI today. No credit card required.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/signup" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Start Building Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/contact" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-xl transition-all">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}