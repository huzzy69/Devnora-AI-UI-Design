import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MarketingHeader from '../../components/marketing/MarketingHeader';
import MarketingFooter from '../../components/marketing/MarketingFooter';
import { Check, X, Sparkles, Shield, Zap, ChevronDown } from 'lucide-react';

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for individuals and small projects',
      monthlyPrice: 29,
      yearlyPrice: 290,
      popular: false,
      features: [
        { name: '10,000 AI Credits/month', included: true },
        { name: '10 Active Projects', included: true },
        { name: 'All AI Generators', included: true },
        { name: 'Website Replicator', included: true },
        { name: 'Template Library Access', included: true },
        { name: 'Community Support', included: true },
        { name: 'Export Projects', included: true },
        { name: 'Basic Analytics', included: true },
        { name: 'Team Collaboration', included: false },
        { name: 'Custom Domains', included: false },
        { name: 'Priority Support', included: false },
        { name: 'White Label', included: false },
        { name: 'API Access', included: false }
      ]
    },
    {
      name: 'Pro',
      description: 'For professionals and growing teams',
      monthlyPrice: 99,
      yearlyPrice: 990,
      popular: true,
      features: [
        { name: '50,000 AI Credits/month', included: true },
        { name: 'Unlimited Projects', included: true },
        { name: 'All AI Generators', included: true },
        { name: 'Advanced Website Cloner', included: true },
        { name: 'Premium Templates', included: true },
        { name: 'Priority Support', included: true },
        { name: 'Team Collaboration (5 users)', included: true },
        { name: 'Custom Domains', included: true },
        { name: 'Advanced Analytics', included: true },
        { name: 'White Label Export', included: true },
        { name: 'API Access', included: true },
        { name: 'Webhook Integration', included: true },
        { name: 'Version Control', included: true }
      ]
    },
    {
      name: 'Enterprise',
      description: 'For large teams and organizations',
      monthlyPrice: null,
      yearlyPrice: null,
      popular: false,
      features: [
        { name: 'Unlimited AI Credits', included: true },
        { name: 'Unlimited Projects', included: true },
        { name: 'Unlimited Team Members', included: true },
        { name: 'Dedicated Success Manager', included: true },
        { name: 'Custom AI Training', included: true },
        { name: 'On-Premise Deployment', included: true },
        { name: '99.9% SLA Guarantee', included: true },
        { name: 'Advanced Security Features', included: true },
        { name: 'Custom Integrations', included: true },
        { name: 'Audit Logs', included: true },
        { name: 'SSO & SAML', included: true },
        { name: 'Custom Contracts', included: true },
        { name: 'Priority Phone Support', included: true }
      ]
    }
  ];

  const faqs = [
    {
      question: 'What are AI Credits?',
      answer: 'AI Credits are used for AI-powered features like code generation, website replication, and workflow automation. Each action consumes a certain number of credits based on complexity. Credits reset monthly.'
    },
    {
      question: 'Can I change plans anytime?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Upgrades take effect immediately, while downgrades apply at the start of your next billing cycle.'
    },
    {
      question: 'What happens if I run out of credits?',
      answer: 'You can purchase additional credit packs or upgrade to a higher plan. Your existing projects remain accessible, but you won\'t be able to use AI-powered features until credits are added.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes, we offer a 14-day money-back guarantee for all paid plans. If you\'re not satisfied, contact support for a full refund within 14 days of purchase.'
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes! Our Starter plan includes a free tier with 1,000 credits per month. No credit card required to start. You can try all features before upgrading.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, Amex), PayPal, and for Enterprise plans, we can arrange bank transfers and custom invoicing.'
    }
  ];

  const comparisonFeatures = [
    { category: 'AI Credits', starter: '10,000/mo', pro: '50,000/mo', enterprise: 'Unlimited' },
    { category: 'Projects', starter: '10', pro: 'Unlimited', enterprise: 'Unlimited' },
    { category: 'Team Members', starter: '1', pro: '5', enterprise: 'Unlimited' },
    { category: 'Code Generation', starter: true, pro: true, enterprise: true },
    { category: 'Website Replicator', starter: 'Basic', pro: 'Advanced', enterprise: 'Enterprise' },
    { category: 'Templates', starter: 'Basic', pro: 'Premium', enterprise: 'All + Custom' },
    { category: 'Support', starter: 'Community', pro: 'Priority Email', enterprise: 'Dedicated + Phone' },
    { category: 'Custom Domains', starter: false, pro: true, enterprise: true },
    { category: 'White Label', starter: false, pro: true, enterprise: true },
    { category: 'API Access', starter: false, pro: true, enterprise: true },
    { category: 'SSO & SAML', starter: false, pro: false, enterprise: true },
    { category: 'On-Premise', starter: false, pro: false, enterprise: true },
    { category: 'SLA Guarantee', starter: false, pro: false, enterprise: '99.9%' }
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <MarketingHeader />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm">Simple Pricing</span>
          </div>
          <h1 className="text-5xl sm:text-6xl text-white mb-6">
            Choose Your{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Perfect Plan
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-12">
            Transparent pricing with no hidden fees. Start free, scale as you grow.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 p-1 bg-slate-900 border border-slate-800 rounded-xl mb-16">
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
              <span className="ml-2 px-2 py-0.5 bg-green-600/20 text-green-400 text-xs rounded">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 mb-20">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 bg-slate-900/50 backdrop-blur-xl border rounded-2xl ${
                plan.popular
                  ? 'border-purple-500 shadow-2xl shadow-purple-500/20 scale-105'
                  : 'border-slate-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm rounded-full">
                  Most Popular
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-2xl text-white mb-2">{plan.name}</h3>
                <p className="text-slate-400 text-sm">{plan.description}</p>
              </div>

              <div className="mb-8">
                {plan.monthlyPrice ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl text-white">
                      ${billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                    </span>
                    <span className="text-slate-400">
                      {billingPeriod === 'monthly' ? '/month' : '/year'}
                    </span>
                  </div>
                ) : (
                  <div className="text-4xl text-white">Custom</div>
                )}
              </div>

              <Link
                to={plan.name === 'Enterprise' ? '/contact' : '/signup'}
                className={`block w-full py-3 text-center rounded-xl transition-all mb-8 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl hover:shadow-purple-500/50'
                    : 'bg-slate-800 text-white hover:bg-slate-700'
                }`}
              >
                {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
              </Link>

              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className={`flex items-start gap-2 text-sm ${
                      feature.included ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    {feature.included ? (
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-4 h-4 text-slate-700 flex-shrink-0 mt-0.5" />
                    )}
                    {feature.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-6 mb-20">
          <div className="p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl text-center">
            <Shield className="w-8 h-8 text-green-500 mx-auto mb-3" />
            <h4 className="text-white mb-2">14-Day Money Back</h4>
            <p className="text-slate-400 text-sm">Full refund guarantee</p>
          </div>
          <div className="p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl text-center">
            <Zap className="w-8 h-8 text-blue-500 mx-auto mb-3" />
            <h4 className="text-white mb-2">Instant Activation</h4>
            <p className="text-slate-400 text-sm">Start building immediately</p>
          </div>
          <div className="p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl text-center">
            <Sparkles className="w-8 h-8 text-purple-500 mx-auto mb-3" />
            <h4 className="text-white mb-2">No Lock-In</h4>
            <p className="text-slate-400 text-sm">Cancel anytime</p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl text-white text-center mb-12">
            Detailed Feature{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Comparison
            </span>
          </h2>

          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="px-6 py-4 text-left text-white">Feature</th>
                  <th className="px-6 py-4 text-center text-white">Starter</th>
                  <th className="px-6 py-4 text-center text-white bg-blue-600/10">Pro</th>
                  <th className="px-6 py-4 text-center text-white">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, index) => (
                  <tr key={index} className="border-b border-slate-800 last:border-0">
                    <td className="px-6 py-4 text-slate-300">{feature.category}</td>
                    <td className="px-6 py-4 text-center">
                      {typeof feature.starter === 'boolean' ? (
                        feature.starter ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-slate-700 mx-auto" />
                        )
                      ) : (
                        <span className="text-slate-300">{feature.starter}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center bg-blue-600/5">
                      {typeof feature.pro === 'boolean' ? (
                        feature.pro ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-slate-700 mx-auto" />
                        )
                      ) : (
                        <span className="text-slate-300">{feature.pro}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {typeof feature.enterprise === 'boolean' ? (
                        feature.enterprise ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-slate-700 mx-auto" />
                        )
                      ) : (
                        <span className="text-slate-300">{feature.enterprise}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl text-white text-center mb-12">
            Pricing{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>

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

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl text-white mb-6">
            Ready to Get{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Started?
            </span>
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Join thousands of developers building faster with Horosoft AI
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all text-lg"
          >
            Start Free Trial
          </Link>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
