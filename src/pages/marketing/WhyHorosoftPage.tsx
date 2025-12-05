import React from 'react';
import { Link } from 'react-router-dom';
import MarketingHeader from '../../components/marketing/MarketingHeader';
import MarketingFooter from '../../components/marketing/MarketingFooter';
import { Zap, DollarSign, Clock, Code, Check, X, Sparkles, TrendingUp, Shield, Users } from 'lucide-react';

export default function WhyHorosoftPage() {
  const comparisons = [
    { feature: 'Development Speed', traditional: '6-12 months', horosoft: '2-7 days' },
    { feature: 'Average Cost', traditional: '$50,000 - $500,000', horosoft: '$29 - $990/month' },
    { feature: 'Technical Skills Required', traditional: 'Expert developers', horosoft: 'Minimal to none' },
    { feature: 'Team Size Needed', traditional: '5-20 people', horosoft: '1-3 people' },
    { feature: 'Time to Market', traditional: 'Months', horosoft: 'Hours/Days' },
    { feature: 'Maintenance', traditional: 'Ongoing dev costs', horosoft: 'Automated updates' },
    { feature: 'Scalability', traditional: 'Complex setup', horosoft: 'One-click scaling' },
    { feature: 'Code Quality', traditional: 'Varies', horosoft: 'Enterprise-grade' }
  ];

  const benefits = [
    { icon: Zap, title: '10x Faster Development', description: 'Ship projects in days instead of months with AI-powered automation' },
    { icon: DollarSign, title: '90% Cost Reduction', description: 'Save hundreds of thousands on development and maintenance costs' },
    { icon: Clock, title: 'Instant Time-to-Market', description: 'Launch products faster and stay ahead of competition' },
    { icon: Code, title: 'Production-Ready Code', description: 'Clean, maintainable code that follows industry best practices' },
    { icon: Shield, title: 'Enterprise Security', description: 'Bank-level security with SOC 2 and GDPR compliance' },
    { icon: Users, title: 'Team Collaboration', description: 'Work together seamlessly with real-time updates' }
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <MarketingHeader />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm">Why Choose Us</span>
          </div>
          <h1 className="text-5xl sm:text-6xl text-white mb-6">
            Why Choose{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Horosoft AI?
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            The smartest way to build software. Faster, cheaper, and better than traditional development.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl text-white text-center mb-12">Key Advantages</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => (
              <div key={i} className="p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl hover:border-slate-700 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white text-lg mb-2">{benefit.title}</h3>
                <p className="text-slate-400 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl text-white text-center mb-12">
            Horosoft vs{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Traditional Development
            </span>
          </h2>

          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 gap-4 p-6 border-b border-slate-800 bg-slate-900/80">
              <div className="text-slate-400 text-sm">Feature</div>
              <div className="text-center text-slate-400 text-sm">Traditional Development</div>
              <div className="text-center text-white text-sm bg-gradient-to-r from-blue-600/20 to-purple-600/20 -m-6 p-6">
                Horosoft AI Builder
              </div>
            </div>
            {comparisons.map((comparison, i) => (
              <div key={i} className="grid grid-cols-3 gap-4 p-6 border-b border-slate-800 last:border-0 hover:bg-slate-800/30 transition-colors">
                <div className="text-white text-sm">{comparison.feature}</div>
                <div className="text-center text-slate-400 text-sm">{comparison.traditional}</div>
                <div className="text-center text-green-400 text-sm">{comparison.horosoft}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl text-white text-center mb-12">Proven Results</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '10x', label: 'Faster Development', icon: Zap },
              { value: '90%', label: 'Cost Reduction', icon: DollarSign },
              { value: '50K+', label: 'Happy Users', icon: Users },
              { value: '99.9%', label: 'Uptime SLA', icon: TrendingUp }
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl mb-4">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-4xl text-white mb-2">{stat.value}</div>
                <div className="text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl text-white mb-6">
            Ready to Build{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Smarter?
            </span>
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Join thousands of developers and teams already building with Horosoft AI
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all text-lg"
          >
            Start Building Free
          </Link>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
