import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MarketingHeader from '../../components/marketing/MarketingHeader';
import MarketingFooter from '../../components/marketing/MarketingFooter';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import {
  Sparkles, Code, Globe, Workflow, Rocket, Layout, Users, Database,
  Zap, Shield, Clock, TrendingUp, Star, Check, ChevronRight, ChevronDown,
  Play, ArrowRight, CheckCircle2, MessageSquare, Phone, FileCode,
  Palette, Cloud, Lock, Server, Wrench, Boxes, Gift, CreditCard,
  Key, BookOpen, ShoppingBag, Smartphone, Download, Package, Languages,
  Mic, PhoneCall, Receipt, Award, BarChart3, FileText, Bell, Mail,
  Calendar, Settings, Layers, GitBranch, RefreshCw, Terminal, Search
} from 'lucide-react';

export default function HomePageNew() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const coreFeatures = [
    {
      icon: Server,
      title: 'Multi-Tenant SaaS Engine',
      description: 'Complete tenant isolation with custom subdomains, role-based access, and resource limits.',
      gradient: 'from-blue-600 to-cyan-600'
    },
    {
      icon: Wrench,
      title: 'Legacy Code AI Repair',
      description: 'Modernize VB6, VB.NET, Delphi 7, and legacy .NET/C# code with AI-powered analysis.',
      gradient: 'from-orange-600 to-red-600'
    },
    {
      icon: Palette,
      title: 'Full Website Builder',
      description: 'Real drag-and-drop canvas with editable blocks, theme system, and live preview.',
      gradient: 'from-green-600 to-emerald-600'
    },
    {
      icon: Workflow,
      title: 'AI Workflow Automation',
      description: 'Visual workflow builder with nodes, conditions, API calls, and scheduled execution.',
      gradient: 'from-purple-600 to-pink-600'
    },
    {
      icon: MessageSquare,
      title: 'AI Agents Module',
      description: 'Build chatbots with Hindi + English support, conversation memory, and API deployment.',
      gradient: 'from-indigo-600 to-blue-600'
    },
    {
      icon: PhoneCall,
      title: 'Voice AI Module',
      description: 'Twilio-integrated voice agents with call recording, transcription, and workflows.',
      gradient: 'from-violet-600 to-purple-600'
    },
    {
      icon: Gift,
      title: 'AppSumo Integration',
      description: 'Full AppSumo support with lifetime plans, license keys, and coupon redemption.',
      gradient: 'from-yellow-600 to-orange-600'
    },
    {
      icon: CreditCard,
      title: 'Payment Gateways',
      description: 'Integrated Cashfree and PayPal with instant upgrades and automatic invoicing.',
      gradient: 'from-pink-600 to-rose-600'
    },
    {
      icon: Key,
      title: 'API Platform',
      description: 'Build REST APIs with automatic documentation, key management, and rate limiting.',
      gradient: 'from-cyan-600 to-teal-600'
    },
    {
      icon: BookOpen,
      title: 'Learning Hub',
      description: 'Comprehensive learning platform with videos, documentation, and progress tracking.',
      gradient: 'from-blue-600 to-indigo-600'
    },
    {
      icon: ShoppingBag,
      title: 'Template Marketplace',
      description: 'Buy, sell, and share templates with ratings, previews, and revenue sharing.',
      gradient: 'from-emerald-600 to-green-600'
    },
    {
      icon: Smartphone,
      title: 'Website to Mobile App',
      description: 'Convert websites to Android/iOS apps with auto-generated APK/IPA packages.',
      gradient: 'from-rose-600 to-pink-600'
    },
    {
      icon: Download,
      title: 'Export & Deployment',
      description: 'One-click export to download ZIP packages for manual deployment to any hosting.',
      gradient: 'from-slate-600 to-slate-700'
    },
    {
      icon: GitBranch,
      title: 'Drag & Drop Logic Builder',
      description: 'Visual node-based logic builder with drag & drop support, custom rules, and workflow integration.',
      gradient: 'from-purple-600 to-indigo-600'
    },
    {
      icon: Globe,
      title: 'Subdomain Automation',
      description: 'Automatic subdomain creation and DNS configuration for multi-tenant deployments.',
      gradient: 'from-teal-600 to-cyan-600'
    },
    {
      icon: Terminal,
      title: 'Developer API Keys',
      description: 'Secure API key generation, management, and usage tracking with rate limits.',
      gradient: 'from-amber-600 to-yellow-600'
    },
    {
      icon: Search,
      title: 'AI Website Replicator',
      description: 'Clone any website design with AI-powered analysis, asset extraction, and code generation.',
      gradient: 'from-fuchsia-600 to-purple-600'
    },
    {
      icon: Cloud,
      title: 'SaaS Deployment System',
      description: 'Complete deployment pipeline with version control, rollback support, and monitoring.',
      gradient: 'from-sky-600 to-blue-600'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <MarketingHeader />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-sm">Complete Multi-Tenant SaaS Platform</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl text-white mb-6">
              Build Complete{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                SaaS Platforms
              </span>
              {' '}with AI
            </h1>

            <p className="text-xl sm:text-2xl text-slate-400 mb-8 max-w-3xl mx-auto">
              Multi-tenant engine, legacy code repair, AI chatbots, workflow automation, and mobile app conversion - all on PHP shared hosting.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/signup"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all text-lg flex items-center justify-center gap-2"
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="w-full sm:w-auto px-8 py-4 bg-slate-800/50 backdrop-blur-xl border border-slate-700 text-white rounded-xl hover:bg-slate-800 transition-all text-lg flex items-center justify-center gap-2">
                <Play className="w-5 h-5" /> Watch Demo
              </button>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-slate-500 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                PHP Shared Hosting
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                AppSumo Integrated
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Hindi Support
              </div>
            </div>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl"></div>
            <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-2 shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?w=1200&h=700&fit=crop"
                alt="Platform Dashboard"
                className="w-full h-auto rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section id="features" className="py-20 px-4 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl text-white mb-4">
              Everything You Need to Build{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Modern SaaS
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              18 powerful modules designed for PHP shared hosting deployment
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreFeatures.map((feature, index) => (
              <div
                key={index}
                className="group p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl hover:border-slate-700 transition-all hover:shadow-xl hover:shadow-purple-500/10"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white text-lg mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Multi-Tenant SaaS Engine */}
      <section id="multi-tenant" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full mb-6">
                <Server className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400 text-sm">Multi-Tenant SaaS Engine</span>
              </div>
              <h2 className="text-4xl sm:text-5xl text-white mb-6">
                Complete Tenant{' '}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Isolation
                </span>
              </h2>
              <p className="text-xl text-slate-400 mb-8">
                Build enterprise-grade multi-tenant SaaS applications with complete data isolation and custom subdomains for each customer.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Tenant isolation',
                  'Subdomains (client1.myapp.com)',
                  'Separate DB per tenant',
                  'Role-based access',
                  'Tenant limits (projects, credits, API usage)'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6">
              <div className="text-slate-400 text-sm mb-4">Active Tenants</div>
              <div className="space-y-3">
                {[
                  { name: 'Tenant 1', domain: 'client1.myapp.com', projects: '5/10', credits: '10K' },
                  { name: 'Tenant 2', domain: 'client2.myapp.com', projects: '3/5', credits: '5K' },
                  { name: 'Tenant 3', domain: 'client3.myapp.com', projects: '8/20', credits: '20K' }
                ].map((tenant, i) => (
                  <div key={i} className="p-4 bg-slate-950/50 border border-slate-800 rounded-xl">
                    <div className="text-blue-400 text-sm mb-2">{tenant.name}</div>
                    <div className="text-white mb-2">{tenant.domain}</div>
                    <div className="text-slate-500 text-xs">
                      {tenant.projects} projects · {tenant.credits} credits
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legacy Code AI Repair */}
      <section id="legacy-repair" className="py-20 px-4 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="lg:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600/10 border border-orange-500/20 rounded-full mb-6">
                <Wrench className="w-4 h-4 text-orange-400" />
                <span className="text-orange-400 text-sm">Legacy Code AI Repair</span>
              </div>
              <h2 className="text-4xl sm:text-5xl text-white mb-6">
                Modernize{' '}
                <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  Legacy Code
                </span>
              </h2>
              <p className="text-xl text-slate-400 mb-8">
                AI-powered repair and modernization for VB6, VB.NET, Delphi 7, and legacy .NET/C# codebases.
              </p>
              <ul className="space-y-3">
                {[
                  'AI repair for VB6, VB.NET, Delphi 7, old .NET/C#',
                  'Multi-file analysis',
                  'Bug fixing',
                  'Code modernization / conversion'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:order-1 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-red-400 text-sm">Before (VB6)</span>
                <ArrowRight className="w-5 h-5 text-green-500" />
                <span className="text-green-400 text-sm">After (PHP)</span>
              </div>
              <div className="bg-slate-950 rounded-xl p-4 font-mono text-sm space-y-4">
                <div>
                  <div className="text-red-400 mb-2">// VB6</div>
                  <div className="text-slate-400">Dim conn As Connection</div>
                  <div className="text-slate-400">Set conn = New Connection</div>
                </div>
                <div className="border-t border-slate-800 pt-4">
                  <div className="text-green-400 mb-2">// Modern PHP</div>
                  <div className="text-slate-300">{'$pdo = new PDO(...);'}</div>
                  <div className="text-slate-300">{'$stmt = $pdo->prepare(...);'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Website Builder */}
      <section id="website-builder" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-600/10 border border-green-500/20 rounded-full mb-6">
              <Palette className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm">Full Website Builder</span>
            </div>
            <h2 className="text-4xl sm:text-5xl text-white mb-6">
              Real Drag & Drop{' '}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Canvas
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
              Professional website builder with drag-and-drop canvas, not just text editing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Layout, title: 'Drag-and-drop canvas' },
              { icon: Boxes, title: 'Editable blocks' },
              { icon: Palette, title: 'Theme system' },
              { icon: Play, title: 'Live preview' }
            ].map((feature, i) => (
              <div key={i} className="p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white">{feature.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Builder */}
      <section id="workflow" className="py-20 px-4 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/10 border border-purple-500/20 rounded-full mb-6">
              <Workflow className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400 text-sm">AI Workflow Builder</span>
            </div>
            <h2 className="text-4xl sm:text-5xl text-white mb-6">
              Automate Business{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Workflows
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
              Visual workflow builder with drag-and-drop nodes for creating complex automation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: GitBranch, title: 'Visual workflow canvas' },
              { icon: Boxes, title: 'Drag-and-drop nodes' },
              { icon: Workflow, title: 'Conditions / branches' },
              { icon: Zap, title: 'API calls' },
              { icon: Bell, title: 'Triggers' },
              { icon: Clock, title: 'Scheduled flows' },
              { icon: Package, title: 'Integrations' }
            ].map((feature, i) => (
              <div key={i} className="p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl">
                <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center mb-3">
                  <feature.icon className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-white text-sm">{feature.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Chatbot */}
      <section id="chatbot" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600/10 border border-indigo-500/20 rounded-full mb-6">
              <MessageSquare className="w-4 h-4 text-indigo-400" />
              <span className="text-indigo-400 text-sm">AI Agents Module</span>
            </div>
            <h2 className="text-4xl sm:text-5xl text-white mb-6">
              Hindi + English{' '}
              <span className="bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
                Chatbots
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
              Build intelligent chatbots with full Hindi and English support for the Indian market.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: MessageSquare, title: 'Chatbot builder' },
              { icon: Languages, title: 'Hindi + English support' },
              { icon: Database, title: 'Conversation memory' },
              { icon: Key, title: 'API-based deployment' }
            ].map((feature, i) => (
              <div key={i} className="p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl">
                <div className="w-10 h-10 bg-indigo-600/20 rounded-lg flex items-center justify-center mb-3">
                  <feature.icon className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="text-white text-sm">{feature.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Voice AI */}
      <section id="voice-ai" className="py-20 px-4 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600/10 border border-violet-500/20 rounded-full mb-6">
              <PhoneCall className="w-4 h-4 text-violet-400" />
              <span className="text-violet-400 text-sm">Voice AI Module</span>
            </div>
            <h2 className="text-4xl sm:text-5xl text-white mb-6">
              AI-Powered{' '}
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                Voice Agents
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
              Twilio-integrated voice AI with call recording, transcription, and intelligent workflows.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Phone, title: 'Twilio integration' },
              { icon: Sparkles, title: 'Voice agents' },
              { icon: Mic, title: 'Call recording' },
              { icon: FileText, title: 'Transcripts' },
              { icon: PhoneCall, title: 'Inbound + outbound workflows' }
            ].map((feature, i) => (
              <div key={i} className="p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl">
                <div className="w-10 h-10 bg-violet-600/20 rounded-lg flex items-center justify-center mb-3">
                  <feature.icon className="w-5 h-5 text-violet-400" />
                </div>
                <h3 className="text-white text-sm">{feature.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AppSumo */}
      <section id="appsumo" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-600/10 border border-yellow-500/20 rounded-full mb-6">
              <Gift className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 text-sm">AppSumo Integration</span>
            </div>
            <h2 className="text-4xl sm:text-5xl text-white mb-6">
              AppSumo{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Ready
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
              Complete AppSumo integration with lifetime plan support and automated license management.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: 'Lifetime plan support' },
              { icon: Key, title: 'License key system' },
              { icon: Receipt, title: 'Coupon redemption' },
              { icon: Users, title: 'AppSumo customer import' }
            ].map((feature, i) => (
              <div key={i} className="p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl">
                <div className="w-10 h-10 bg-yellow-600/20 rounded-lg flex items-center justify-center mb-3">
                  <feature.icon className="w-5 h-5 text-yellow-400" />
                </div>
                <h3 className="text-white text-sm">{feature.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Gateways */}
      <section id="payments" className="py-20 px-4 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-600/10 border border-pink-500/20 rounded-full mb-6">
              <CreditCard className="w-4 h-4 text-pink-400" />
              <span className="text-pink-400 text-sm">Payment Gateways</span>
            </div>
            <h2 className="text-4xl sm:text-5xl text-white mb-6">
              Integrated{' '}
              <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                Payments
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
              Seamless payment integration with Cashfree (India) and PayPal (international).
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: CreditCard, title: 'Cashfree + PayPal' },
              { icon: Zap, title: 'Instant plan upgrade' },
              { icon: Bell, title: 'Webhook handling' }
            ].map((feature, i) => (
              <div key={i} className="p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl">
                <div className="w-10 h-10 bg-pink-600/20 rounded-lg flex items-center justify-center mb-3">
                  <feature.icon className="w-5 h-5 text-pink-400" />
                </div>
                <h3 className="text-white text-sm">{feature.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Platform */}
      <section id="api" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600/10 border border-cyan-500/20 rounded-full mb-6">
              <Key className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 text-sm">API Platform</span>
            </div>
            <h2 className="text-4xl sm:text-5xl text-white mb-6">
              REST API{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Builder
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
              Build and deploy RESTful APIs with automatic documentation and secure authentication.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { icon: Code, title: 'REST API builder' },
              { icon: BookOpen, title: 'API documentation' },
              { icon: Key, title: 'API key management' },
              { icon: Shield, title: 'Rate limits' },
              { icon: Lock, title: 'Secure endpoints' }
            ].map((feature, i) => (
              <div key={i} className="p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl">
                <div className="w-10 h-10 bg-cyan-600/20 rounded-lg flex items-center justify-center mb-3">
                  <feature.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-white text-sm">{feature.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Hub */}
      <section id="learning" className="py-20 px-4 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full mb-6">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-sm">Learning Hub</span>
            </div>
            <h2 className="text-4xl sm:text-5xl text-white mb-6">
              Comprehensive{' '}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Learning
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
              Built-in learning platform with everything you need to master the platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Play, title: 'Categories' },
              { icon: Search, title: 'Search' },
              { icon: BookOpen, title: 'Lessons' },
              { icon: Play, title: 'Video tutorials' },
              { icon: FileText, title: 'Documentation' },
              { icon: Rocket, title: 'Getting started guides' }
            ].map((feature, i) => (
              <div key={i} className="p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl">
                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center mb-3">
                  <feature.icon className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-white text-sm">{feature.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Template Marketplace */}
      <section id="marketplace" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600/10 border border-emerald-500/20 rounded-full mb-6">
              <ShoppingBag className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 text-sm">Template Marketplace</span>
            </div>
            <h2 className="text-4xl sm:text-5xl text-white mb-6">
              Buy, Sell &{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                Share
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
              Marketplace for buying, selling, and sharing professional templates.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ShoppingBag, title: 'Buy & sell templates' },
              { icon: Download, title: 'JSON import/export' },
              { icon: Star, title: 'Ratings' },
              { icon: Play, title: 'Template preview' }
            ].map((feature, i) => (
              <div key={i} className="p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl">
                <div className="w-10 h-10 bg-emerald-600/20 rounded-lg flex items-center justify-center mb-3">
                  <feature.icon className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-white text-sm">{feature.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile App Converter */}
      <section id="mobile" className="py-20 px-4 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600/10 border border-rose-500/20 rounded-full mb-6">
              <Smartphone className="w-4 h-4 text-rose-400" />
              <span className="text-rose-400 text-sm">Website → Mobile App</span>
            </div>
            <h2 className="text-4xl sm:text-5xl text-white mb-6">
              Website to{' '}
              <span className="bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
                Mobile App
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
              Convert any website into Android and iOS mobile apps automatically.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {[
              { icon: Smartphone, title: 'Convert website to WebView app (iOS/Android)' },
              { icon: Package, title: 'Auto-generate install package' }
            ].map((feature, i) => (
              <div key={i} className="p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl">
                <div className="w-10 h-10 bg-rose-600/20 rounded-lg flex items-center justify-center mb-3">
                  <feature.icon className="w-5 h-5 text-rose-400" />
                </div>
                <h3 className="text-white text-sm">{feature.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deployment Engine */}
      <section id="deployment" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-600/10 border border-slate-500/20 rounded-full mb-6">
              <Download className="w-4 h-4 text-slate-400" />
              <span className="text-slate-400 text-sm">Export & Deployment</span>
            </div>
            <h2 className="text-4xl sm:text-5xl text-white mb-6">
              One-Click{' '}
              <span className="bg-gradient-to-r from-slate-400 to-slate-300 bg-clip-text text-transparent">
                Export
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
              Export your complete project as a ZIP file for manual deployment. No cloud lock-in.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Download, title: 'One-click export' },
              { icon: Package, title: 'Download ZIP' },
              { icon: Server, title: 'Manual deploy (shared hosting, GitHub Pages)' }
            ].map((feature, i) => (
              <div key={i} className="p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl">
                <div className="w-10 h-10 bg-slate-600/20 rounded-lg flex items-center justify-center mb-3">
                  <feature.icon className="w-5 h-5 text-slate-400" />
                </div>
                <h3 className="text-white text-sm">{feature.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl text-white mb-6">
            Ready to Build Your{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              SaaS Platform?
            </span>
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Start with our free trial. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/signup"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all text-lg"
            >
              Get Started
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-slate-800/50 backdrop-blur-xl border border-slate-700 text-white rounded-xl hover:bg-slate-800 transition-all text-lg"
            >
              Sign up for a demo
            </Link>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}