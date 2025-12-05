import React, { useState } from 'react';
import { Check, Sparkles, Zap, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import PublicNavbar from '../../components/public/PublicNavbar';
import PublicFooter from '../../components/public/PublicFooter';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Starter',
      icon: Sparkles,
      price: { monthly: 29, yearly: 290 },
      description: 'Perfect for individuals and small projects',
      features: [
        '10,000 AI Credits/month',
        '50 Projects',
        'All Basic Templates',
        'Community Support',
        '10GB Storage',
        'Custom Subdomain',
      ],
      popular: false,
      cta: 'Start Free Trial'
    },
    {
      name: 'Professional',
      icon: Zap,
      price: { monthly: 79, yearly: 790 },
      description: 'For professionals and growing teams',
      features: [
        '100,000 AI Credits/month',
        'Unlimited Projects',
        'All Templates + Premium',
        'Priority Support',
        '100GB Storage',
        'Custom Domains',
        'Team Collaboration (5 seats)',
        'Advanced Analytics',
        'API Access',
      ],
      popular: true,
      cta: 'Start Free Trial'
    },
    {
      name: 'Enterprise',
      icon: Crown,
      price: { monthly: 299, yearly: 2990 },
      description: 'For large teams and organizations',
      features: [
        'Unlimited AI Credits',
        'Unlimited Everything',
        'White Label Option',
        'Dedicated Support',
        'Unlimited Storage',
        'Priority Deployment',
        'Unlimited Team Members',
        'Custom Integrations',
        'SLA Guarantee',
        'On-premise Option',
      ],
      popular: false,
      cta: 'Contact Sales'
    },
  ];

  const lifetimeDeal = {
    name: 'Lifetime Deal',
    price: 499,
    features: [
      '500,000 AI Credits (one-time)',
      'Unlimited Projects',
      'All Templates',
      'Lifetime Updates',
      'Priority Support',
      'Custom Domain',
    ],
    badge: 'Limited Time'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
      <PublicNavbar />
      
      <section className="px-6 pt-32 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              Choose the perfect plan for your needs. All plans include a 14-day free trial.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 p-2 bg-slate-900 border border-slate-800 rounded-xl">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-lg transition-all ${
                  billingCycle === 'monthly' ? 'bg-blue-600 text-white' : 'text-slate-400'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-lg transition-all ${
                  billingCycle === 'yearly' ? 'bg-blue-600 text-white' : 'text-slate-400'
                }`}
              >
                Yearly
                <span className="ml-2 px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded">Save 17%</span>
              </button>
            </div>
          </div>

          {/* Regular Plans */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {plans.map((plan, i) => (
              <div key={i} className={`relative bg-slate-900 border rounded-2xl p-8 ${plan.popular ? 'border-blue-500 scale-105' : 'border-slate-800'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm rounded-full">
                    Most Popular
                  </div>
                )}
                <div className={`w-12 h-12 bg-gradient-to-br ${plan.popular ? 'from-blue-600 to-purple-600' : 'from-slate-700 to-slate-600'} rounded-xl flex items-center justify-center mb-6`}>
                  <plan.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-slate-400 mb-6">{plan.description}</p>
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl text-white">${plan.price[billingCycle]}</span>
                    <span className="text-slate-400">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2 text-slate-300">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/signup"
                  className={`block w-full px-6 py-3 rounded-xl text-center transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* Lifetime Deal */}
          <div className="bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-500/30 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="inline-block px-3 py-1 bg-orange-500 text-white text-sm rounded-full mb-4">{lifetimeDeal.badge}</div>
                <h3 className="text-3xl text-white mb-2">{lifetimeDeal.name}</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl text-white">${lifetimeDeal.price}</span>
                  <span className="text-slate-400">one-time payment</span>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  {lifetimeDeal.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-300">
                      <Check className="w-4 h-4 text-green-400" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Link to="/signup" className="px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white rounded-xl whitespace-nowrap transition-all">
                Claim Lifetime Deal
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}