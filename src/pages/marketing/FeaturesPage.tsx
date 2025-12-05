import React from 'react';
import { Link } from 'react-router-dom';
import MarketingHeader from '../../components/marketing/MarketingHeader';
import MarketingFooter from '../../components/marketing/MarketingFooter';
import {
  Code, Globe, Database, Workflow, Rocket, Layout, MessageSquare, Phone,
  Users, CreditCard, Key, Palette, FileCode, Zap, Shield, Cloud, 
  CheckCircle2, Sparkles
} from 'lucide-react';

export default function FeaturesPage() {
  const features = [
    {
      icon: Code,
      title: 'AI Code Generator',
      description: 'Generate production-ready code for any framework',
      features: [
        'Support for React, Vue, Angular, Next.js, and more',
        'Clean, well-structured code with best practices',
        'Automatic component generation',
        'Real-time preview and editing',
        'Export to multiple formats',
        'Version control integration'
      ],
      gradient: 'from-purple-600 to-pink-600',
      image: 'https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?w=600&h=400&fit=crop'
    },
    {
      icon: Globe,
      title: 'AI Website Replicator',
      description: 'Clone any website with pixel-perfect accuracy',
      features: [
        'Automatic URL scanning and analysis',
        'Complete site structure extraction',
        'Responsive design preservation',
        'Animation and interaction capture',
        'SEO metadata extraction',
        'Asset downloading and optimization'
      ],
      gradient: 'from-blue-600 to-cyan-600',
      image: 'https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?w=600&h=400&fit=crop'
    },
    {
      icon: Database,
      title: 'Data Extractor',
      description: 'Extract and structure data from any source',
      features: [
        'Web scraping with AI parsing',
        'Automatic schema detection',
        'CSV, JSON, XML export',
        'Real-time data synchronization',
        'Database integration',
        'API endpoint generation'
      ],
      gradient: 'from-cyan-600 to-teal-600',
      image: 'https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?w=600&h=400&fit=crop'
    },
    {
      icon: Workflow,
      title: 'Workflow Builder',
      description: 'Visual automation for complex processes',
      features: [
        'Drag-and-drop node editor',
        'Pre-built integrations',
        'Conditional logic and branching',
        'Error handling and retries',
        'Scheduling and triggers',
        'Real-time execution logs'
      ],
      gradient: 'from-orange-600 to-red-600',
      image: 'https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?w=600&h=400&fit=crop'
    },
    {
      icon: Rocket,
      title: 'Deployment Engine',
      description: 'One-click deployment to any platform',
      features: [
        'Automatic build optimization',
        'Global CDN distribution',
        'SSL certificates included',
        'Custom domain support',
        'Automatic scaling',
        'Zero-downtime deployments'
      ],
      gradient: 'from-violet-600 to-purple-600',
      image: 'https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?w=600&h=400&fit=crop'
    },
    {
      icon: Layout,
      title: 'Template Marketplace',
      description: 'Thousands of professional templates',
      features: [
        'SaaS dashboards and admin panels',
        'Landing pages and marketing sites',
        'E-commerce stores',
        'Portfolio and blog templates',
        'One-click installation',
        'Fully customizable'
      ],
      gradient: 'from-pink-600 to-rose-600',
      image: 'https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?w=600&h=400&fit=crop'
    },
    {
      icon: MessageSquare,
      title: 'AI Chat Agent',
      description: 'Build intelligent chatbots in minutes',
      features: [
        'Natural language understanding',
        'Knowledge base integration',
        'Multi-language support',
        'Custom training',
        'Widget customization',
        'Analytics and insights'
      ],
      gradient: 'from-green-600 to-emerald-600',
      image: 'https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?w=600&h=400&fit=crop'
    },
    {
      icon: Phone,
      title: 'AI Voice Agent',
      description: 'Automated voice assistants and IVR',
      features: [
        'Text-to-speech with natural voices',
        'Speech recognition',
        'Call flow builder',
        'CRM integrations',
        'Call recording and transcription',
        'Analytics dashboard'
      ],
      gradient: 'from-indigo-600 to-blue-600',
      image: 'https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?w=600&h=400&fit=crop'
    },
    {
      icon: Users,
      title: 'Team Management',
      description: 'Collaborate with your entire team',
      features: [
        'Role-based permissions',
        'Real-time collaboration',
        'Activity tracking',
        'Team workspaces',
        'Invitation management',
        'Audit logs'
      ],
      gradient: 'from-blue-600 to-indigo-600',
      image: 'https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?w=600&h=400&fit=crop'
    },
    {
      icon: CreditCard,
      title: 'Billing System',
      description: 'Flexible subscription management',
      features: [
        'Multiple payment methods',
        'Usage-based billing',
        'Invoice generation',
        'Subscription management',
        'AppSumo integration',
        'Tax calculations'
      ],
      gradient: 'from-emerald-600 to-green-600',
      image: 'https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?w=600&h=400&fit=crop'
    },
    {
      icon: Key,
      title: 'API Keys',
      description: 'Secure API access management',
      features: [
        'Multiple API key creation',
        'Usage tracking',
        'Rate limiting',
        'Key rotation',
        'Webhook support',
        'API documentation'
      ],
      gradient: 'from-yellow-600 to-orange-600',
      image: 'https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?w=600&h=400&fit=crop'
    },
    {
      icon: Palette,
      title: 'Visual Page Builder',
      description: 'Drag-and-drop interface builder',
      features: [
        'Component library',
        'Responsive design tools',
        'Theme customization',
        'Real-time preview',
        'CSS grid and flexbox',
        'Export clean code'
      ],
      gradient: 'from-rose-600 to-pink-600',
      image: 'https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?w=600&h=400&fit=crop'
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
            <span className="text-blue-400 text-sm">Full Feature Suite</span>
          </div>
          <h1 className="text-5xl sm:text-6xl text-white mb-6">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Build Software
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-12">
            A complete suite of AI-powered tools to design, build, deploy, and manage your applications - all in one platform.
          </p>
        </div>
      </section>

      {/* Features Grid */}
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

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl text-white mb-6">
            Ready to Experience{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              All Features?
            </span>
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Start building with the most powerful AI development platform
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
