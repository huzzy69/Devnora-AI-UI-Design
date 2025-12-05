import React from 'react';
import { Link } from 'react-router-dom';
import MarketingHeader from '../../components/marketing/MarketingHeader';
import MarketingFooter from '../../components/marketing/MarketingFooter';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { Sparkles, Target, Users, Rocket, Award, Globe, Zap } from 'lucide-react';

export default function AboutPage() {
  const team = [
    { name: 'Alex Johnson', role: 'CEO & Founder', image: 'https://images.unsplash.com/photo-1763550662603-78aa2f2033bf?w=300&h=300&fit=crop' },
    { name: 'Sarah Chen', role: 'CTO', image: 'https://images.unsplash.com/photo-1763550662603-78aa2f2033bf?w=300&h=300&fit=crop' },
    { name: 'Michael Rodriguez', role: 'Head of Product', image: 'https://images.unsplash.com/photo-1763550662603-78aa2f2033bf?w=300&h=300&fit=crop' },
    { name: 'Emily Watson', role: 'Lead Designer', image: 'https://images.unsplash.com/photo-1763550662603-78aa2f2033bf?w=300&h=300&fit=crop' }
  ];

  const milestones = [
    { year: '2021', title: 'Company Founded', description: 'Started with a vision to democratize software development' },
    { year: '2022', title: 'First Product Launch', description: 'Released AI Code Generator to 1,000 beta users' },
    { year: '2023', title: 'Series A Funding', description: 'Raised $15M to expand our AI capabilities' },
    { year: '2024', title: '50K+ Users', description: 'Reached 50,000 active developers worldwide' },
    { year: '2025', title: 'Enterprise Launch', description: 'Launched enterprise features and on-premise solutions' }
  ];

  const values = [
    { icon: Target, title: 'Innovation First', description: 'We push the boundaries of what AI can do for developers' },
    { icon: Users, title: 'User-Centric', description: 'Every feature is built with our users\' needs in mind' },
    { icon: Rocket, title: 'Move Fast', description: 'We ship features quickly and iterate based on feedback' },
    { icon: Globe, title: 'Global Impact', description: 'Making software development accessible worldwide' }
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <MarketingHeader />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm">About Us</span>
          </div>
          <h1 className="text-5xl sm:text-6xl text-white mb-6">
            We're Building the{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Future of Development
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Horosoft AI Builder was founded with a simple mission: make software development accessible to everyone through the power of AI.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl text-white mb-6">Our Mission</h2>
            <p className="text-lg text-slate-300 mb-6">
              We believe that building software should be fast, intuitive, and accessible to everyone - from solo developers to enterprise teams.
            </p>
            <p className="text-lg text-slate-300 mb-8">
              By leveraging cutting-edge AI technology, we're eliminating the barriers between ideas and execution, enabling anyone to bring their vision to life.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { value: '50K+', label: 'Active Users' },
                { value: '2M+', label: 'Projects Created' },
                { value: '150+', label: 'Countries' },
                { value: '99.9%', label: 'Uptime' }
              ].map((stat, i) => (
                <div key={i} className="p-4 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl">
                  <div className="text-3xl text-white mb-1">{stat.value}</div>
                  <div className="text-slate-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl"></div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1644088379091-d574269d422f?w=700&h=500&fit=crop"
              alt="Team collaboration"
              className="relative rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl text-white text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <div key={i} className="p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white text-lg mb-2">{value.title}</h3>
                <p className="text-slate-400 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl text-white text-center mb-16">Our Journey</h2>
          <div className="space-y-8">
            {milestones.map((milestone, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
                    {milestone.year}
                  </div>
                  {i !== milestones.length - 1 && (
                    <div className="w-0.5 flex-1 bg-slate-800 mt-2"></div>
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="text-white text-xl mb-2">{milestone.title}</h3>
                  <p className="text-slate-400">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl text-white text-center mb-4">Meet Our Team</h2>
          <p className="text-xl text-slate-400 text-center mb-12">The people behind Horosoft AI Builder</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div key={i} className="text-center">
                <div className="mb-4 relative group">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-slate-800 group-hover:border-blue-600 transition-colors"
                  />
                </div>
                <h3 className="text-white text-lg mb-1">{member.name}</h3>
                <p className="text-slate-400 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl text-white mb-6">
            Join Us on{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              This Journey
            </span>
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            We're always looking for talented people to join our team
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/careers"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all text-lg"
            >
              View Careers
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-slate-800/50 backdrop-blur-xl border border-slate-700 text-white rounded-xl hover:bg-slate-800 transition-all text-lg"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
