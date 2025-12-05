import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MarketingHeader from '../../components/marketing/MarketingHeader';
import MarketingFooter from '../../components/marketing/MarketingFooter';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import {
  Sparkles, Code, Globe, Workflow, Rocket, Layout, Users, Database,
  Zap, Shield, Clock, TrendingUp, Star, Check, ChevronRight, ChevronDown,
  Play, ArrowRight, CheckCircle2, MessageSquare, Phone, FileCode,
  Palette, Cloud, Lock
} from 'lucide-react';

export default function HomePage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const features = [
    {
      icon: Globe,
      title: 'AI Website Replicator',
      description: 'Clone any website by URL. Our AI analyzes, extracts, and rebuilds complete sites with pixel-perfect accuracy.',
      gradient: 'from-blue-600 to-cyan-600'
    },
    {
      icon: Code,
      title: 'AI Code Generator',
      description: 'Generate production-ready code for any framework. React, Vue, Angular, Next.js - just describe what you need.',
      gradient: 'from-purple-600 to-pink-600'
    },
    {
      icon: Palette,
      title: 'Drag & Drop Builder',
      description: 'Visual page builder with real-time preview. Build interfaces faster than writing code.',
      gradient: 'from-green-600 to-emerald-600'
    },
    {
      icon: Workflow,
      title: 'Workflow Automation',
      description: 'Create complex automations with a visual node editor. Connect APIs, databases, and third-party services.',
      gradient: 'from-orange-600 to-red-600'
    },
    {
      icon: Rocket,
      title: 'Deployment Engine',
      description: 'One-click deployment to cloud. Automatic scaling, SSL certificates, and global CDN included.',
      gradient: 'from-violet-600 to-purple-600'
    },
    {
      icon: Layout,
      title: 'Template Marketplace',
      description: 'Browse thousands of professional templates. SaaS dashboards, landing pages, e-commerce stores, and more.',
      gradient: 'from-pink-600 to-rose-600'
    },
    {
      icon: Users,
      title: 'Team Workspaces',
      description: 'Collaborate in real-time with your team. Role-based permissions, version control, and live editing.',
      gradient: 'from-blue-600 to-indigo-600'
    },
    {
      icon: Database,
      title: 'API Architecture Builder',
      description: 'Design and deploy REST APIs visually. Automatic documentation, authentication, and database management.',
      gradient: 'from-cyan-600 to-teal-600'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'CTO at TechStart',
      image: 'https://images.unsplash.com/photo-1763550662603-78aa2f2033bf?w=100&h=100&fit=crop',
      rating: 5,
      quote: 'Horosoft AI Builder reduced our development time from months to days. The AI website replicator is a game-changer for rapid prototyping.'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Founder of DevStudio',
      image: 'https://images.unsplash.com/photo-1763550662603-78aa2f2033bf?w=100&h=100&fit=crop',
      rating: 5,
      quote: 'The code quality is exceptional. We use Horosoft for all our client projects now. It\'s like having 10 developers on the team.'
    },
    {
      name: 'Emily Watson',
      role: 'Product Manager at Innovate Co',
      image: 'https://images.unsplash.com/photo-1763550662603-78aa2f2033bf?w=100&h=100&fit=crop',
      rating: 5,
      quote: 'Best investment we made this year. The workflow builder alone is worth the subscription. Incredible tool for non-technical teams.'
    },
    {
      name: 'James Park',
      role: 'Lead Developer at CloudScale',
      image: 'https://images.unsplash.com/photo-1763550662603-78aa2f2033bf?w=100&h=100&fit=crop',
      rating: 5,
      quote: 'Horosoft\'s API builder saved us weeks of backend development. The deployment engine is seamless. Highly recommend for any dev team.'
    }
  ];

  const faqs = [
    {
      question: 'How does the AI Website Replicator work?',
      answer: 'Simply paste any website URL. Our AI analyzes the structure, design, content, and functionality, then generates clean, editable code that you can customize and deploy.'
    },
    {
      question: 'What frameworks and languages are supported?',
      answer: 'We support React, Vue, Angular, Next.js, Nuxt, Svelte, vanilla HTML/CSS/JS, and more. Backend options include Node.js, Python, PHP, and Ruby.'
    },
    {
      question: 'Can I use Horosoft for commercial projects?',
      answer: 'Yes! All paid plans include commercial usage rights. You own 100% of the code generated and can use it for client work, SaaS products, or any commercial purpose.'
    },
    {
      question: 'Is there a free plan?',
      answer: 'Yes, we offer a free starter plan with 1,000 AI credits per month. Perfect for trying out the platform and building small projects.'
    },
    {
      question: 'How accurate is the website cloning?',
      answer: 'Our AI achieves 95%+ visual accuracy on most websites. Complex animations and custom JavaScript may need manual adjustments, but the structure and design are replicated precisely.'
    },
    {
      question: 'Do I need coding knowledge to use Horosoft?',
      answer: 'No! Our visual builders and AI generators work great for non-developers. However, having coding knowledge helps you customize and extend the generated code.'
    },
    {
      question: 'What about SEO and performance?',
      answer: 'All generated code follows best practices for SEO, accessibility, and performance. We include meta tags, semantic HTML, optimized images, and clean code structure.'
    },
    {
      question: 'Can I export my projects?',
      answer: 'Absolutely! Download your complete project as a ZIP file anytime. You can host it anywhere - Vercel, Netlify, AWS, your own server, anywhere.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes. We use enterprise-grade encryption, secure cloud infrastructure, and comply with GDPR, SOC 2, and industry security standards. Your projects are private and safe.'
    },
    {
      question: 'What kind of support do you offer?',
      answer: 'Free plans get community support. Paid plans include email support (24-48h response). Enterprise plans get dedicated support, onboarding calls, and a success manager.'
    }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: billingPeriod === 'monthly' ? '$29' : '$290',
      period: billingPeriod === 'monthly' ? '/month' : '/year',
      description: 'Perfect for individuals and small projects',
      features: [
        '10,000 AI Credits/month',
        '10 Projects',
        'All AI Generators',
        'Website Replicator',
        'Template Library',
        'Community Support',
        'Export Projects',
        'Basic Analytics'
      ],
      popular: false,
      gradient: 'from-slate-800 to-slate-900'
    },
    {
      name: 'Pro',
      price: billingPeriod === 'monthly' ? '$99' : '$990',
      period: billingPeriod === 'monthly' ? '/month' : '/year',
      description: 'For professionals and growing teams',
      features: [
        '50,000 AI Credits/month',
        'Unlimited Projects',
        'All AI Generators',
        'Advanced Website Cloner',
        'Premium Templates',
        'Priority Support',
        'Team Collaboration (5 users)',
        'Custom Domains',
        'Advanced Analytics',
        'White Label Export',
        'API Access'
      ],
      popular: true,
      gradient: 'from-blue-600 to-purple-600'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large teams and organizations',
      features: [
        'Unlimited AI Credits',
        'Unlimited Projects',
        'Unlimited Team Members',
        'Dedicated Success Manager',
        'Custom AI Training',
        'On-Premise Deployment',
        'SLA Guarantee',
        'Advanced Security',
        'Custom Integrations',
        'Audit Logs',
        'SSO & SAML'
      ],
      popular: false,
      gradient: 'from-slate-800 to-slate-900'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <MarketingHeader />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-16">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-sm">Powered by Advanced AI</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl text-white mb-6">
              AI That Builds Your{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Software
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl sm:text-2xl text-slate-400 mb-8 max-w-3xl mx-auto">
              Generate apps, websites, dashboards, workflows, APIs, and complete systems using simple prompts. Ship 10x faster.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/signup"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all text-lg flex items-center justify-center gap-2"
              >
                Start Free <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="w-full sm:w-auto px-8 py-4 bg-slate-800/50 backdrop-blur-xl border border-slate-700 text-white rounded-xl hover:bg-slate-800 transition-all text-lg flex items-center justify-center gap-2">
                <Play className="w-5 h-5" /> Watch Demo
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-slate-500 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Free plan available
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Cancel anytime
              </div>
            </div>
          </div>

          {/* Hero Dashboard Preview */}
          <div className="relative max-w-6xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl"></div>
            <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-2 shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?w=1200&h=700&fit=crop"
                alt="Horosoft AI Builder Dashboard"
                className="w-full h-auto rounded-xl"
              />
              {/* Floating UI Cards */}
              <div className="absolute -top-4 -left-4 bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-xl p-4 shadow-xl hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Code className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Code Generated</div>
                    <div className="text-white">12,847 lines</div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-xl p-4 shadow-xl hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Build Time</div>
                    <div className="text-white">2.4 seconds</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl text-white mb-4">
              Everything You Need to{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Build Anything
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Powerful AI-driven tools that transform your ideas into production-ready software in minutes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
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

      {/* Website Replicator Showcase */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full mb-6">
                <Globe className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400 text-sm">AI Website Replicator</span>
              </div>
              <h2 className="text-4xl sm:text-5xl text-white mb-6">
                Clone Any Website in{' '}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Seconds
                </span>
              </h2>
              <p className="text-xl text-slate-400 mb-8">
                Paste a URL like <span className="text-white">horosoft.com</span> and watch our AI analyze, extract, and rebuild the entire site with pixel-perfect accuracy. Full code access included.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Automatic structure mapping and extraction',
                  'Preserves responsive design and animations',
                  'Clean, production-ready code output',
                  'Edit and customize everything visually',
                  'Export and deploy anywhere'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/features"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors"
              >
                Learn More <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 blur-3xl"></div>
              <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="flex-1 bg-slate-800 rounded px-3 py-1.5 text-sm text-slate-400">
                    https://horosoft.com
                  </div>
                </div>
                <div className="bg-slate-950 rounded-xl p-4 border border-slate-800">
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-800 rounded w-1/2"></div>
                    <div className="h-20 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded mt-4"></div>
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      <div className="h-12 bg-slate-800 rounded"></div>
                      <div className="h-12 bg-slate-800 rounded"></div>
                      <div className="h-12 bg-slate-800 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '50K+', label: 'Active Users', icon: Users },
              { value: '2M+', label: 'Projects Created', icon: Rocket },
              { value: '99.9%', label: 'Uptime SLA', icon: Shield },
              { value: '4.9/5', label: 'User Rating', icon: Star }
            ].map((stat, index) => (
              <div key={index} className="text-center">
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

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl text-white mb-4">
              Loved by{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Developers
              </span>
            </h2>
            <p className="text-xl text-slate-400">See what our users are saying</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl hover:border-slate-700 transition-all"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm mb-6">{testimonial.quote}</p>
                <div className="flex items-center gap-3">
                  <ImageWithFallback
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-white text-sm">{testimonial.name}</div>
                    <div className="text-slate-400 text-xs">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl text-white mb-4">
              Simple,{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Transparent Pricing
              </span>
            </h2>
            <p className="text-xl text-slate-400 mb-8">Choose the plan that fits your needs</p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-3 p-1 bg-slate-900 border border-slate-800 rounded-xl">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-6 py-2 rounded-lg transition-all ${
                  billingPeriod === 'monthly'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod('yearly')}
                className={`px-6 py-2 rounded-lg transition-all ${
                  billingPeriod === 'yearly'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Yearly
                <span className="ml-2 px-2 py-0.5 bg-green-600/20 text-green-400 text-xs rounded">Save 17%</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative p-8 bg-slate-900/50 backdrop-blur-xl border rounded-2xl ${
                  plan.popular
                    ? 'border-purple-500 shadow-2xl shadow-purple-500/20'
                    : 'border-slate-800'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl text-white mb-2">{plan.name}</h3>
                  <p className="text-slate-400 text-sm mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl text-white">{plan.price}</span>
                    <span className="text-slate-400">{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/signup"
                  className={`block w-full py-3 text-center rounded-xl transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl hover:shadow-purple-500/50'
                      : 'bg-slate-800 text-white hover:bg-slate-700'
                  }`}
                >
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/pricing" className="text-blue-400 hover:text-blue-300 transition-colors">
              View detailed pricing comparison →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl text-white mb-4">
              Frequently Asked{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-xl text-slate-400">Everything you need to know</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-800/50 transition-colors"
                >
                  <span className="text-white">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform ${
                      activeFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activeFaq === index && (
                  <div className="px-6 pb-4 text-slate-400">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl text-white mb-6">
            Ready to Build{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              10x Faster?
            </span>
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Join 50,000+ developers using Horosoft AI Builder to ship software faster than ever.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/signup"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all text-lg"
            >
              Start Building Free
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-slate-800/50 backdrop-blur-xl border border-slate-700 text-white rounded-xl hover:bg-slate-800 transition-all text-lg"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
