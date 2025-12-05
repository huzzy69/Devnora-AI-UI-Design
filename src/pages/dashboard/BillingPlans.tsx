import React, { useState } from 'react';
import { CreditCard, Check, Zap, Crown, Sparkles, Download, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BillingPlans() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const currentPlan = 'Professional';

  const plans = [
    {
      name: 'Starter',
      icon: Sparkles,
      price: { monthly: 29, yearly: 290 },
      features: [
        '10,000 AI Credits/month',
        '50 Projects',
        'All Basic Templates',
        'Community Support',
        '10GB Storage',
        'Custom Subdomain',
      ],
    },
    {
      name: 'Professional',
      icon: Zap,
      price: { monthly: 79, yearly: 790 },
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
      current: true,
    },
    {
      name: 'Enterprise',
      icon: Crown,
      price: { monthly: 299, yearly: 2990 },
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
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2 text-slate-900">Billing & Plans</h1>
        <p className="text-slate-600">Manage your subscription and billing details</p>
      </div>

      {/* Current Plan Overview */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 text-white">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-sm opacity-90 mb-2">Current Plan</div>
            <h2 className="text-3xl mb-2">{currentPlan}</h2>
            <p className="opacity-90">$79/month • Renews on Feb 1, 2024</p>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-90 mb-2">AI Credits Remaining</div>
            <div className="text-3xl mb-2">45,230</div>
            <div className="text-sm opacity-90">of 100,000</div>
          </div>
        </div>
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white rounded-full" style={{ width: '45%' }}></div>
        </div>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center gap-4 p-2 bg-slate-100 rounded-xl">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2 rounded-lg transition-all ${
              billingCycle === 'monthly' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-600'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-6 py-2 rounded-lg transition-all ${
              billingCycle === 'yearly' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-600'
            }`}
          >
            Yearly
            <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">
              Save 17%
            </span>
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`bg-white border-2 rounded-2xl p-6 ${
              plan.current ? 'border-blue-600' : 'border-slate-200'
            }`}
          >
            {plan.current && (
              <div className="mb-4 px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-lg inline-block">
                Current Plan
              </div>
            )}
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4">
              <plan.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl text-slate-900 mb-2">{plan.name}</h3>
            <div className="mb-6">
              <span className="text-4xl text-slate-900">${plan.price[billingCycle]}</span>
              <span className="text-slate-600">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
            </div>
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-slate-700">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button
              className={`w-full px-6 py-3 rounded-xl transition-all ${
                plan.current
                  ? 'bg-slate-100 text-slate-600 cursor-default'
                  : 'bg-blue-600 hover:bg-blue-500 text-white'
              }`}
              disabled={plan.current}
            >
              {plan.current ? 'Current Plan' : 'Upgrade'}
            </button>
          </div>
        ))}
      </div>

      {/* Payment Method */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl text-slate-900">Payment Method</h3>
          <Link 
            to="/dashboard/payment-gateway-management"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors text-sm"
          >
            <Settings className="w-4 h-4" />
            Configure Gateways
          </Link>
        </div>
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-slate-900">•••• •••• •••• 4242</div>
              <div className="text-sm text-slate-600">Expires 12/25</div>
            </div>
          </div>
          <button className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg">
            Update
          </button>
        </div>
      </div>

      {/* Invoices */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xl text-slate-900">Recent Invoices</h3>
          <button className="text-blue-600 hover:text-blue-500 text-sm">View All</button>
        </div>
        <div className="divide-y divide-slate-200">
          {[
            { date: 'Jan 1, 2024', amount: '$79.00', status: 'Paid' },
            { date: 'Dec 1, 2023', amount: '$79.00', status: 'Paid' },
            { date: 'Nov 1, 2023', amount: '$79.00', status: 'Paid' },
          ].map((invoice, i) => (
            <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50">
              <div className="flex items-center gap-4">
                <div className="text-slate-900">{invoice.date}</div>
                <div className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                  {invoice.status}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-slate-900">{invoice.amount}</div>
                <button className="p-2 hover:bg-slate-200 rounded-lg">
                  <Download className="w-5 h-5 text-slate-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}