import React from 'react';
import { Sparkles, Zap, Crown, Plus, Edit, Trash } from 'lucide-react';

export default function PlansManager() {
  const plans = [
    {
      name: 'Starter',
      price: 29,
      icon: Sparkles,
      users: 1250,
      features: ['10,000 AI Credits', '50 Projects', 'Basic Templates'],
      color: 'blue'
    },
    {
      name: 'Professional',
      price: 79,
      icon: Zap,
      users: 3420,
      features: ['100,000 AI Credits', 'Unlimited Projects', 'All Templates'],
      color: 'purple'
    },
    {
      name: 'Enterprise',
      price: 299,
      icon: Crown,
      users: 780,
      features: ['Unlimited Credits', 'White Label', 'Dedicated Support'],
      color: 'orange'
    },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl mb-2 text-slate-900">Plans Manager</h1>
          <p className="text-slate-600">Manage subscription plans and pricing</p>
        </div>
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Create New Plan
        </button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="text-3xl mb-1 text-slate-900">5,450</div>
          <div className="text-sm text-slate-600">Total Subscribers</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="text-3xl mb-1 text-green-600">$347,340</div>
          <div className="text-sm text-slate-600">Monthly Revenue</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="text-3xl mb-1 text-blue-600">$79</div>
          <div className="text-sm text-slate-600">Average Plan Value</div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 bg-${plan.color}-100 rounded-xl flex items-center justify-center`}>
                <plan.icon className={`w-6 h-6 text-${plan.color}-600`} />
              </div>
              <div className="flex gap-1">
                <button className="p-2 hover:bg-slate-100 rounded-lg">
                  <Edit className="w-4 h-4 text-slate-600" />
                </button>
                <button className="p-2 hover:bg-red-50 rounded-lg">
                  <Trash className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
            <h3 className="text-2xl text-slate-900 mb-2">{plan.name}</h3>
            <div className="mb-4">
              <span className="text-4xl text-slate-900">${plan.price}</span>
              <span className="text-slate-600">/month</span>
            </div>
            <div className="mb-4 px-3 py-2 bg-blue-50 text-blue-700 text-sm rounded-lg">
              {plan.users} subscribers
            </div>
            <ul className="space-y-2">
              {plan.features.map((feature, j) => (
                <li key={j} className="text-sm text-slate-600">• {feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
