import React from 'react';
import { Check, Clock, Sparkles } from 'lucide-react';
import PublicNavbar from '../../components/public/PublicNavbar';
import PublicFooter from '../../components/public/PublicFooter';

export default function RoadmapPage() {
  const roadmap = [
    { quarter: 'Q1 2024', status: 'completed', items: ['AI Code Generator', 'Website Replicator', 'Template Library'] },
    { quarter: 'Q2 2024', status: 'completed', items: ['Workflow Builder', 'Team Collaboration', 'API Access'] },
    { quarter: 'Q3 2024', status: 'in-progress', items: ['AI Chat Agents', 'Voice Assistants', 'Advanced Analytics'] },
    { quarter: 'Q4 2024', status: 'planned', items: ['Mobile App Builder', 'E-commerce Tools', 'White Label'] },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
      <PublicNavbar />
      <section className="px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              Product Roadmap
            </h1>
            <p className="text-xl text-slate-300">See what we're building next</p>
          </div>
          <div className="space-y-6">
            {roadmap.map((quarter, i) => (
              <div key={i} className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl text-white">{quarter.quarter}</h3>
                  <div className={`px-3 py-1 rounded-full text-xs ${
                    quarter.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                    quarter.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-slate-700 text-slate-400'
                  }`}>
                    {quarter.status === 'completed' && <Check className="w-3 h-3 inline mr-1" />}
                    {quarter.status === 'in-progress' && <Clock className="w-3 h-3 inline mr-1" />}
                    {quarter.status === 'planned' && <Sparkles className="w-3 h-3 inline mr-1" />}
                    {quarter.status.replace('-', ' ')}
                  </div>
                </div>
                <ul className="space-y-2">
                  {quarter.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-slate-300">
                      {quarter.status === 'completed' && <Check className="w-4 h-4 text-green-400" />}
                      {quarter.status === 'in-progress' && <Clock className="w-4 h-4 text-blue-400" />}
                      {quarter.status === 'planned' && <div className="w-4 h-4 border border-slate-600 rounded"></div>}
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <PublicFooter />
    </div>
  );
}
