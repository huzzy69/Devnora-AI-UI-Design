import React from 'react';
import MarketingHeader from '../../components/marketing/MarketingHeader';
import MarketingFooter from '../../components/marketing/MarketingFooter';
import { CheckCircle2, Clock, Sparkles, Rocket, Zap } from 'lucide-react';

export default function RoadmapPage() {
  const roadmapItems = [
    {
      status: 'released',
      title: 'AI Code Generator v2.0',
      description: 'Enhanced code generation with better framework support',
      date: 'Released Dec 2024',
      features: ['React 19 support', 'Improved TypeScript', 'Better component structure']
    },
    {
      status: 'released',
      title: 'Website Replicator Pro',
      description: 'Advanced website cloning with animation preservation',
      date: 'Released Nov 2024',
      features: ['Animation capture', 'Advanced CSS parsing', 'Asset optimization']
    },
    {
      status: 'in-progress',
      title: 'Visual Page Builder',
      description: 'Drag-and-drop interface builder with real-time preview',
      date: 'In Progress',
      features: ['Component library', 'Theme customization', 'Responsive design tools']
    },
    {
      status: 'in-progress',
      title: 'AI Voice Agent',
      description: 'Build intelligent voice assistants and IVR systems',
      date: 'In Progress',
      features: ['Natural voice synthesis', 'Call flow builder', 'CRM integration']
    },
    {
      status: 'planned',
      title: 'Mobile App Generator',
      description: 'Generate native iOS and Android apps from prompts',
      date: 'Q2 2025',
      features: ['React Native export', 'Native components', 'App Store deployment']
    },
    {
      status: 'planned',
      title: 'AI Database Designer',
      description: 'Visual database schema design with AI suggestions',
      date: 'Q2 2025',
      features: ['Schema visualization', 'Migration generation', 'Query builder']
    },
    {
      status: 'planned',
      title: 'Advanced Analytics',
      description: 'Detailed insights into your projects and AI usage',
      date: 'Q3 2025',
      features: ['Usage tracking', 'Performance metrics', 'Custom reports']
    },
    {
      status: 'under-review',
      title: 'Figma Plugin',
      description: 'Import designs directly from Figma to code',
      date: 'Under Review',
      features: ['Direct import', 'Component mapping', 'Style preservation']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'released': return 'from-green-600 to-emerald-600';
      case 'in-progress': return 'from-blue-600 to-purple-600';
      case 'planned': return 'from-orange-600 to-red-600';
      case 'under-review': return 'from-yellow-600 to-orange-600';
      default: return 'from-slate-600 to-slate-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'released': return CheckCircle2;
      case 'in-progress': return Zap;
      case 'planned': return Rocket;
      case 'under-review': return Clock;
      default: return Sparkles;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'released': return 'Released';
      case 'in-progress': return 'In Progress';
      case 'planned': return 'Planned';
      case 'under-review': return 'Under Review';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <MarketingHeader />

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-sm">Product Roadmap</span>
            </div>
            <h1 className="text-5xl sm:text-6xl text-white mb-6">
              What's{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Coming Next
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              See what we're building and what's on the horizon for Horosoft AI Builder
            </p>
          </div>

          {/* Status Legend */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {['released', 'in-progress', 'planned', 'under-review'].map((status) => {
              const Icon = getStatusIcon(status);
              return (
                <div key={status} className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-xl">
                  <div className={`w-3 h-3 bg-gradient-to-r ${getStatusColor(status)} rounded-full`}></div>
                  <span className="text-slate-300 text-sm">{getStatusLabel(status)}</span>
                </div>
              );
            })}
          </div>

          {/* Roadmap Items */}
          <div className="space-y-6">
            {roadmapItems.map((item, i) => {
              const Icon = getStatusIcon(item.status);
              return (
                <div key={i} className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${getStatusColor(item.status)} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-white text-xl">{item.title}</h3>
                        <span className="px-3 py-1 bg-slate-800 text-slate-300 text-xs rounded-full">
                          {item.date}
                        </span>
                      </div>
                      <p className="text-slate-400 mb-4">{item.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.features.map((feature, j) => (
                          <span key={j} className="px-3 py-1 bg-slate-800/50 text-slate-300 text-sm rounded-lg">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
