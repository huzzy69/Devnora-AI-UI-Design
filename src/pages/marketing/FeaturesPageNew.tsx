import React from 'react';
import { Link } from 'react-router-dom';
import MarketingHeader from '../../components/marketing/MarketingHeader';
import MarketingFooter from '../../components/marketing/MarketingFooter';
import {
  Server, Wrench, Palette, Workflow, MessageSquare, PhoneCall,
  Gift, CreditCard, Key, BookOpen, ShoppingBag, Smartphone, Download,
  CheckCircle2, Sparkles, Code, Database, Zap, Globe, Users, Lock,
  BarChart3, Bell, Mail, Calendar, FileText, Package, Settings,
  Languages, Mic, Phone, Receipt, Award, TrendingUp, Eye, PenTool,
  Boxes, CloudUpload, Github, Layout, Layers
} from 'lucide-react';

export default function FeaturesPageNew() {
  const features = [
    {
      icon: Server,
      title: 'Multi-Tenant SaaS Engine',
      description: 'Enterprise-grade multi-tenant architecture with complete isolation',
      gradient: 'from-blue-600 to-cyan-600',
      features: [
        'Custom subdomain per tenant (client1.myapp.com)',
        'Complete data isolation and security',
        'Role-based access control (Owner/Admin/Member)',
        'Tenant-specific resource limits',
        'Per-tenant branding and customization',
        'Automated tenant provisioning'
      ],
      technical: 'Built on PHP with tenant-aware routing and database isolation'
    },
    {
      icon: Wrench,
      title: 'Legacy Code AI Repair Engine',
      description: 'Modernize and repair older codebases with AI-powered analysis',
      gradient: 'from-orange-600 to-red-600',
      features: [
        'VB6 to modern PHP/JavaScript conversion',
        'VB.NET modernization and upgrade',
        'Delphi 7 code migration',
        'Legacy .NET/C# modernization',
        'Multi-file project analysis',
        'Automated bug detection and fixing',
        'Code quality improvement suggestions',
        'Dependency resolution'
      ],
      technical: 'AI models trained on legacy code patterns with syntax transformation'
    },
    {
      icon: Palette,
      title: 'Visual Website Builder',
      description: 'Real drag-and-drop canvas with professional components',
      gradient: 'from-green-600 to-emerald-600',
      features: [
        'Drag-and-drop canvas interface',
        'Editable content blocks',
        'Pre-built component library',
        'Theme system (colors, fonts, spacing)',
        'Live preview mode',
        'Responsive design controls',
        'Custom CSS support',
        'Undo/Redo functionality'
      ],
      technical: 'Canvas-based editor with real-time rendering and export to clean HTML/CSS'
    },
    {
      icon: Workflow,
      title: 'AI Workflow Automation Builder',
      description: 'Visual automation for complex business processes',
      gradient: 'from-purple-600 to-pink-600',
      features: [
        'Drag-and-drop node editor',
        'Condition and branch logic',
        'HTTP/API call nodes',
        'Database query nodes',
        'Email/SMS notification nodes',
        'Scheduled workflow execution',
        'Webhook triggers',
        'Third-party service integrations',
        'Error handling and retry logic',
        'Execution logs and monitoring'
      ],
      technical: 'Event-driven architecture with cron-based scheduling on PHP'
    },
    {
      icon: MessageSquare,
      title: 'AI Chatbot Builder (Hindi + English)',
      description: 'Build intelligent chatbots with multilingual support',
      gradient: 'from-indigo-600 to-blue-600',
      features: [
        'Hindi language support',
        'English (Hindi-English mix) support',
        'Conversation memory and context',
        'Custom training with Q&A pairs',
        'Intent recognition',
        'Multi-channel deployment (Web, WhatsApp, Telegram)',
        'Chat history and analytics',
        'Human handoff capability'
      ],
      technical: 'NLP models with Hindi/English tokenization and context management'
    },
    {
      icon: PhoneCall,
      title: 'Voice AI Module (Twilio)',
      description: 'Automated voice assistants with call management',
      gradient: 'from-violet-600 to-purple-600',
      features: [
        'Twilio integration',
        'AI voice agents',
        'Call recording and storage',
        'Speech-to-text transcription',
        'Text-to-speech synthesis',
        'Inbound call handling',
        'Outbound call workflows',
        'Call routing logic',
        'Call analytics and insights',
        'IVR system builder'
      ],
      technical: 'Twilio API integration with AI-powered voice processing'
    },
    {
      icon: Gift,
      title: 'AppSumo Integration',
      description: 'Complete lifetime deal and license management',
      gradient: 'from-yellow-600 to-orange-600',
      features: [
        'Lifetime plan support',
        'License key generation system',
        'Coupon code redemption',
        'Automated customer import',
        'Plan tier management',
        'Stack multiple codes',
        'Usage tracking per license',
        'AppSumo webhook handling'
      ],
      technical: 'License validation system with AppSumo API integration'
    },
    {
      icon: CreditCard,
      title: 'Payment Gateway Integration',
      description: 'Secure payment processing with multiple gateways',
      gradient: 'from-pink-600 to-rose-600',
      features: [
        'Cashfree integration (India)',
        'PayPal integration (Global)',
        'Instant plan upgrades',
        'Automatic invoice generation',
        'Payment webhook handling',
        'Subscription management',
        'Refund processing',
        'Transaction history',
        'Tax calculation support'
      ],
      technical: 'Secure payment processing with webhook verification and PCI compliance'
    },
    {
      icon: Key,
      title: 'API Platform Builder',
      description: 'Build and deploy REST APIs with documentation',
      gradient: 'from-cyan-600 to-teal-600',
      features: [
        'REST API endpoint builder',
        'Automatic API documentation',
        'API key generation and management',
        'Rate limiting per key',
        'Request/response logging',
        'Secure authentication',
        'CORS configuration',
        'API versioning support',
        'Webhook management'
      ],
      technical: 'RESTful API framework with OpenAPI documentation generation'
    },
    {
      icon: BookOpen,
      title: 'Advanced Learning Hub',
      description: 'Complete learning management system',
      gradient: 'from-blue-600 to-indigo-600',
      features: [
        'Content categories and tags',
        'Advanced search functionality',
        'Lesson editor (WYSIWYG)',
        'Video lesson support',
        'Documentation sections',
        'Tutorial step-by-step guides',
        'Progress tracking',
        'Bookmarks and favorites',
        'Completion certificates',
        'Quiz and assessment tools'
      ],
      technical: 'Content management system with video hosting and progress tracking'
    },
    {
      icon: ShoppingBag,
      title: 'Template Marketplace',
      description: 'Buy, sell, and share templates with revenue sharing',
      gradient: 'from-emerald-600 to-green-600',
      features: [
        'Template listing and browsing',
        'Buy and sell templates',
        'Rating and review system',
        'Template preview before purchase',
        'Import/export functionality',
        'Revenue sharing for creators',
        'License management',
        'Category and tag filtering',
        'Featured template promotion',
        'Download tracking'
      ],
      technical: 'Marketplace platform with secure file delivery and payment processing'
    },
    {
      icon: Smartphone,
      title: 'Website to Mobile App Converter',
      description: 'Convert websites to Android/iOS WebView apps',
      gradient: 'from-rose-600 to-pink-600',
      features: [
        'Android WebView app generation',
        'iOS WebView app generation',
        'Automatic APK generation',
        'App icon and splash screen',
        'Push notification support',
        'Offline mode configuration',
        'App signing and publishing',
        'Custom app branding',
        'Deep linking support'
      ],
      technical: 'WebView wrapper with native app build pipeline (Cordova/Capacitor)'
    },
    {
      icon: Download,
      title: 'Export & Deployment System',
      description: 'One-click export for manual deployment',
      gradient: 'from-slate-600 to-slate-700',
      features: [
        'Complete project ZIP download',
        'PHP shared hosting compatible',
        'Database export included',
        'Configuration file generation',
        'FTP deployment guide',
        'GitHub Pages export',
        'Netlify deployment ready',
        'Vercel deployment ready',
        'Environment variable setup',
        'Deployment documentation'
      ],
      technical: 'Build system generating production-ready PHP code with deployment instructions'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <MarketingHeader />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm">Complete Feature Suite</span>
          </div>
          <h1 className="text-5xl sm:text-6xl text-white mb-6">
            13 Powerful Modules for{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Complete SaaS
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-12">
            Everything you need to build, deploy, and scale modern SaaS applications - all designed for PHP shared hosting.
          </p>
        </div>
      </section>

      {/* Features Detailed Grid */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto space-y-24">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${feature.gradient} bg-opacity-10 border border-white/10 rounded-full mb-6`}>
                  <feature.icon className="w-4 h-4 text-white" />
                  <span className="text-white text-sm">{feature.title}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl text-white mb-4">
                  {feature.description}
                </h2>
                <div className="mb-6 p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
                  <div className="text-slate-400 text-sm">
                    <Code className="w-4 h-4 inline mr-2" />
                    {feature.technical}
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {feature.features.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/signup"
                  className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${feature.gradient} text-white rounded-xl hover:shadow-xl hover:shadow-purple-500/30 transition-all`}
                >
                  Try {feature.title}
                </Link>
              </div>
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-20 blur-3xl`}></div>
                  <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-2xl">
                    <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="space-y-3">
                      <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                      <div className="h-4 bg-slate-800 rounded w-1/2"></div>
                      <div className={`h-32 bg-gradient-to-br ${feature.gradient} opacity-20 rounded-xl mt-6`}></div>
                      <div className="grid grid-cols-2 gap-3 mt-4">
                        <div className="h-16 bg-slate-800 rounded-xl"></div>
                        <div className="h-16 bg-slate-800 rounded-xl"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Highlights */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl text-white mb-4">
              Built for{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                PHP Hosting
              </span>
            </h2>
            <p className="text-xl text-slate-400">Deploy anywhere with shared hosting compatibility</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Server,
                title: 'PHP Compatible',
                description: 'Works on any PHP shared hosting (Hostinger, Bluehost, SiteGround)'
              },
              {
                icon: Database,
                title: 'MySQL/MariaDB',
                description: 'Standard database support with optimized queries'
              },
              {
                icon: CloudUpload,
                title: 'Easy Deployment',
                description: 'Download ZIP and upload via FTP - that\'s it!'
              },
              {
                icon: Lock,
                title: 'Secure by Design',
                description: 'Built-in security best practices and data encryption'
              },
              {
                icon: Zap,
                title: 'Performance Optimized',
                description: 'Caching, minification, and lazy loading included'
              },
              {
                icon: Globe,
                title: 'SEO Ready',
                description: 'Clean URLs, meta tags, and sitemap generation'
              }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl text-white mb-6">
            Ready to Experience{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              All Features?
            </span>
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Start building your SaaS platform today
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all text-lg"
          >
            Start Free Trial <Sparkles className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}