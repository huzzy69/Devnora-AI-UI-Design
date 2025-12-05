import React from 'react';
import { Code, Globe, Layout, Workflow, Bot, Rocket, Database, Users, Lock, Zap, MessageSquare, Phone, FileCode, Eye, Download, Settings } from 'lucide-react';
import PublicNavbar from '../../components/public/PublicNavbar';
import PublicFooter from '../../components/public/PublicFooter';

export default function FeaturesPage() {
  const features = [
    {
      category: 'AI Code Generation',
      icon: Code,
      color: 'blue',
      features: [
        { name: 'Natural Language to Code', desc: 'Generate production-ready code from simple descriptions' },
        { name: 'Multi-Framework Support', desc: 'React, Vue, Angular, Svelte, and more' },
        { name: 'TypeScript & JavaScript', desc: 'Full support for both languages' },
        { name: 'Component Libraries', desc: 'Integration with popular UI libraries' },
      ]
    },
    {
      category: 'Website Replicator',
      icon: Globe,
      color: 'green',
      features: [
        { name: 'URL-Based Cloning', desc: 'Clone any website by entering its URL' },
        { name: 'Structure Extraction', desc: 'AI analyzes and extracts page structure' },
        { name: 'Style Preservation', desc: 'Maintains original design and styling' },
        { name: 'Asset Download', desc: 'Automatic image and icon extraction' },
      ]
    },
    {
      category: 'Visual Workflow Builder',
      icon: Workflow,
      color: 'purple',
      features: [
        { name: 'Drag & Drop Interface', desc: 'Intuitive visual automation builder' },
        { name: 'Pre-built Nodes', desc: 'Triggers, actions, conditions, and AI nodes' },
        { name: 'API Integrations', desc: 'Connect with external services easily' },
        { name: 'Real-time Testing', desc: 'Test workflows before deployment' },
      ]
    },
    {
      category: 'AI Chat & Voice Agents',
      icon: Bot,
      color: 'pink',
      features: [
        { name: 'Custom Chatbots', desc: 'Build intelligent chat agents' },
        { name: 'Voice Assistants', desc: 'Create voice-enabled AI agents' },
        { name: 'Knowledge Base', desc: 'Train on your content and documentation' },
        { name: 'Multi-Channel Deploy', desc: 'Website, mobile app, and phone integration' },
      ]
    },
    {
      category: 'Deployment & Hosting',
      icon: Rocket,
      color: 'orange',
      features: [
        { name: 'One-Click Deploy', desc: 'Deploy to production instantly' },
        { name: 'Custom Domains', desc: 'Use your own domain names' },
        { name: 'CDN & SSL', desc: 'Global delivery with HTTPS' },
        { name: 'Auto Scaling', desc: 'Handles traffic spikes automatically' },
      ]
    },
    {
      category: 'Collaboration',
      icon: Users,
      color: 'indigo',
      features: [
        { name: 'Team Workspaces', desc: 'Collaborate with unlimited team members' },
        { name: 'Role Management', desc: 'Owner, admin, and member permissions' },
        { name: 'Shared Resources', desc: 'Templates, components, and assets' },
        { name: 'Activity Logs', desc: 'Track all team activities' },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
      <PublicNavbar />
      
      <section className="px-6 pt-32 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              Powerful Features for Modern Development
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Everything you need to build, deploy, and scale your applications with AI
            </p>
          </div>

          <div className="space-y-20">
            {features.map((category, i) => (
              <div key={i} className="grid lg:grid-cols-2 gap-12 items-center">
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className={`w-16 h-16 bg-${category.color}-500/10 rounded-2xl flex items-center justify-center mb-6`}>
                    <category.icon className={`w-8 h-8 text-${category.color}-400`} />
                  </div>
                  <h2 className="text-3xl text-white mb-4">{category.category}</h2>
                  <div className="space-y-4">
                    {category.features.map((feature, j) => (
                      <div key={j} className="flex gap-3">
                        <div className={`w-6 h-6 bg-${category.color}-500/10 rounded flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <div className={`w-2 h-2 bg-${category.color}-400 rounded-full`}></div>
                        </div>
                        <div>
                          <h3 className="text-white mb-1">{feature.name}</h3>
                          <p className="text-slate-400 text-sm">{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-8">
                    <div className={`h-64 bg-gradient-to-br from-${category.color}-600/20 to-${category.color}-400/20 rounded-xl flex items-center justify-center`}>
                      <category.icon className={`w-32 h-32 text-${category.color}-400/30`} />
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
