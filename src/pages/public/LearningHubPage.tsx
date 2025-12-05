import React from 'react';
import { BookOpen, Video, FileText, Code, Search } from 'lucide-react';
import PublicNavbar from '../../components/public/PublicNavbar';
import PublicFooter from '../../components/public/PublicFooter';

export default function LearningHubPage() {
  const resources = [
    { title: 'Getting Started Guide', type: 'article', icon: FileText, time: '5 min read' },
    { title: 'AI Code Generation Tutorial', type: 'video', icon: Video, time: '12 min' },
    { title: 'Building Your First App', type: 'tutorial', icon: Code, time: '20 min' },
    { title: 'Website Replicator Deep Dive', type: 'video', icon: Video, time: '15 min' },
    { title: 'Workflow Automation Guide', type: 'article', icon: FileText, time: '8 min read' },
    { title: 'Deployment Best Practices', type: 'tutorial', icon: Code, time: '10 min' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
      <PublicNavbar />
      
      <section className="px-6 pt-32 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              Learning Hub
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              Tutorials, guides, and documentation to help you master Horosoft AI Builder
            </p>
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search documentation..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, i) => (
              <div key={i} className="p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors cursor-pointer group">
                <resource.icon className="w-10 h-10 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl text-white mb-2">{resource.title}</h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400 capitalize">{resource.type}</span>
                  <span className="text-slate-500">{resource.time}</span>
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
