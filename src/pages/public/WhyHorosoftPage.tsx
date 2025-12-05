import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Zap, Shield, Award, TrendingUp, Users, Globe, 
  Code, Clock, DollarSign, Heart, CheckCircle, ArrowRight,
  Star, Target, Rocket, Brain
} from 'lucide-react';
import PublicNavbar from '../../components/public/PublicNavbar';
import PublicFooter from '../../components/public/PublicFooter';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

export default function WhyHorosoftPage() {
  const reasons = [
    {
      icon: Brain,
      title: 'Most Advanced AI',
      description: 'Powered by cutting-edge AI models that understand context and generate production-ready code',
      color: 'from-blue-600 to-cyan-600'
    },
    {
      icon: Zap,
      title: '10x Faster Development',
      description: 'Build complete applications in hours, not weeks. Deploy faster than ever before',
      color: 'from-purple-600 to-pink-600'
    },
    {
      icon: Code,
      title: 'Enterprise-Grade Quality',
      description: 'Clean, maintainable code that follows best practices and industry standards',
      color: 'from-green-600 to-emerald-600'
    },
    {
      icon: Globe,
      title: 'Website Cloning Technology',
      description: 'Unique AI reverse engineering that can recreate any website with pixel-perfect accuracy',
      color: 'from-orange-600 to-red-600'
    },
    {
      icon: Shield,
      title: 'SOC 2 Compliant',
      description: 'Bank-grade security and compliance. Your data is safe and encrypted',
      color: 'from-indigo-600 to-purple-600'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Built-in workspace management with role-based access control',
      color: 'from-pink-600 to-rose-600'
    },
    {
      icon: Clock,
      title: 'Save 100+ Hours/Month',
      description: 'Automate repetitive tasks and focus on what matters - building great products',
      color: 'from-cyan-600 to-blue-600'
    },
    {
      icon: DollarSign,
      title: 'Reduce Development Costs',
      description: 'Cut development costs by up to 70% while maintaining quality',
      color: 'from-yellow-600 to-orange-600'
    }
  ];

  const stats = [
    { value: '50,000+', label: 'Active Users', icon: Users },
    { value: '1M+', label: 'Projects Created', icon: Rocket },
    { value: '99.9%', label: 'Uptime SLA', icon: Shield },
    { value: '4.9/5', label: 'User Rating', icon: Star }
  ];

  const comparison = [
    { feature: 'AI Code Generation', horosoft: true, traditional: false },
    { feature: 'Website Cloning', horosoft: true, traditional: false },
    { feature: 'Visual Workflow Builder', horosoft: true, traditional: false },
    { feature: '1000+ Templates', horosoft: true, traditional: false },
    { feature: 'One-Click Deployment', horosoft: true, traditional: true },
    { feature: 'Team Collaboration', horosoft: true, traditional: true },
    { feature: 'AI Chat & Voice Agents', horosoft: true, traditional: false },
    { feature: 'Development Time', horosoft: 'Hours', traditional: 'Weeks' },
    { feature: 'Cost', horosoft: '$29-299/mo', traditional: '$5000+/mo' },
  ];

  const testimonials = [
    {
      quote: "Horosoft AI Builder completely transformed how we build products. We shipped our MVP in 2 weeks instead of 3 months.",
      author: "Sarah Chen",
      role: "CEO, TechStartup",
      avatar: "👩‍💼",
      company: "Raised $2M Series A"
    },
    {
      quote: "The website replicator saved us thousands in redesign costs. It's like magic - paste a URL and get a fully working clone.",
      author: "Michael Rodriguez",
      role: "CTO, DesignCo",
      avatar: "👨‍💻",
      company: "100+ employees"
    },
    {
      quote: "Best investment we made this year. ROI was positive within the first month. Our team productivity increased 300%.",
      author: "Emily Watson",
      role: "Product Lead, SaaS Inc",
      avatar: "👩‍🎨",
      company: "Series B funded"
    }
  ];

  const awards = [
    { name: 'Product of the Year 2024', org: 'Product Hunt' },
    { name: 'Best AI Tool', org: 'TechCrunch' },
    { name: 'Fastest Growing SaaS', org: 'SaaS Awards' },
    { name: 'Top Developer Tool', org: 'Stack Overflow' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950">
      <PublicNavbar />
      
      {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-950/50 to-slate-950"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
            <Heart className="w-4 h-4 text-pink-400 animate-pulse" />
            <span className="text-sm text-purple-300">Join 50,000+ developers building the future</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl mb-6 bg-gradient-to-r from-white via-purple-100 to-pink-200 bg-clip-text text-transparent leading-tight">
            Why Choose Horosoft?
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
            The <span className="text-purple-400">smartest AI builder</span> trusted by startups, agencies, and enterprises worldwide
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link to="/signup" className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl shadow-lg shadow-purple-500/25 transition-all flex items-center gap-2 group">
              <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/pricing" className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl transition-all flex items-center gap-2 backdrop-blur-sm">
              View Pricing
            </Link>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                <div className="flex justify-center mb-3">
                  <stat.icon className="w-8 h-8 text-purple-400" />
                </div>
                <div className="text-3xl text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Reasons */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4 text-white">Built for Modern Developers</h2>
            <p className="text-xl text-slate-400">Everything you need in one powerful platform</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reasons.map((reason, i) => (
              <div key={i} className="group p-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all">
                <div className={`w-14 h-14 bg-gradient-to-r ${reason.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <reason.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl text-white mb-3">{reason.title}</h3>
                <p className="text-slate-400">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="relative px-6 py-20 bg-gradient-to-b from-purple-950/30 to-transparent">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4 text-white">Horosoft vs Traditional Development</h2>
            <p className="text-xl text-slate-400">See why thousands are making the switch</p>
          </div>

          <div className="bg-slate-900/50 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">
            <div className="grid grid-cols-3 gap-4 p-6 border-b border-white/10 bg-white/5">
              <div className="text-slate-400"></div>
              <div className="text-center">
                <div className="text-white mb-1">Horosoft AI</div>
                <div className="text-sm text-purple-400">⚡ Modern</div>
              </div>
              <div className="text-center">
                <div className="text-white mb-1">Traditional</div>
                <div className="text-sm text-slate-500">🐌 Old Way</div>
              </div>
            </div>

            {comparison.map((item, i) => (
              <div key={i} className={`grid grid-cols-3 gap-4 p-6 ${i !== comparison.length - 1 ? 'border-b border-white/10' : ''}`}>
                <div className="text-white">{item.feature}</div>
                <div className="text-center">
                  {typeof item.horosoft === 'boolean' ? (
                    item.horosoft ? (
                      <CheckCircle className="w-6 h-6 text-green-400 mx-auto" />
                    ) : (
                      <div className="w-6 h-6 mx-auto text-slate-600">✕</div>
                    )
                  ) : (
                    <span className="text-purple-400">{item.horosoft}</span>
                  )}
                </div>
                <div className="text-center">
                  {typeof item.traditional === 'boolean' ? (
                    item.traditional ? (
                      <CheckCircle className="w-6 h-6 text-slate-500 mx-auto" />
                    ) : (
                      <div className="w-6 h-6 mx-auto text-slate-700">✕</div>
                    )
                  ) : (
                    <span className="text-slate-400">{item.traditional}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4 text-white">Loved by Developers Worldwide</h2>
            <p className="text-xl text-slate-400">Real stories from real users</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-2xl">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 text-lg">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="text-white">{testimonial.author}</div>
                    <div className="text-sm text-slate-400">{testimonial.role}</div>
                    <div className="text-xs text-purple-400">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="relative px-6 py-20 bg-gradient-to-b from-transparent to-purple-950/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4 text-white">Award-Winning Platform</h2>
            <p className="text-xl text-slate-400">Recognized by industry leaders</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {awards.map((award, i) => (
              <div key={i} className="p-6 bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl text-center">
                <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-white mb-2">{award.name}</h3>
                <p className="text-sm text-purple-300">{award.org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-3xl backdrop-blur-xl">
            <h2 className="text-4xl md:text-5xl mb-6 text-white">Ready to Transform Your Development?</h2>
            <p className="text-xl text-slate-300 mb-8">Join thousands of developers building faster with AI</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/signup" className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl shadow-lg shadow-purple-500/25 transition-all flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/contact" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-xl transition-all">
                Talk to Sales
              </Link>
            </div>
            <p className="text-sm text-slate-400 mt-6">No credit card required • 14-day free trial • Cancel anytime</p>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}