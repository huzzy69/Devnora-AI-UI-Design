import React from 'react';
import { Users, Target, Award, TrendingUp } from 'lucide-react';
import PublicNavbar from '../../components/public/PublicNavbar';
import PublicFooter from '../../components/public/PublicFooter';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
      <PublicNavbar />
      <section className="px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
            About Horosoft AI Builder
          </h1>
          <p className="text-xl text-slate-300 mb-12">
            Empowering developers and businesses to build faster with AI
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Users, label: '50,000+ Users', desc: 'Trusted worldwide' },
              { icon: Target, label: '1M+ Projects', desc: 'Built with our platform' },
              { icon: Award, label: '99.9% Uptime', desc: 'Reliable service' },
              { icon: TrendingUp, label: '5x Faster', desc: 'Development speed' },
            ].map((stat, i) => (
              <div key={i} className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
                <stat.icon className="w-10 h-10 text-blue-400 mx-auto mb-4" />
                <div className="text-3xl text-white mb-2">{stat.label}</div>
                <div className="text-slate-400">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <PublicFooter />
    </div>
  );
}
