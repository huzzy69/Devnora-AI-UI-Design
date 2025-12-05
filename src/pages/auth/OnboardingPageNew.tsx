import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Code, Briefcase, Users, Rocket } from 'lucide-react';

export default function OnboardingPageNew() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    role: '',
    teamSize: '',
    useCase: '',
    experience: ''
  });
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      console.log('Onboarding complete:', formData);
      navigate('/dashboard');
    }
  };

  const handleSkip = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-white text-2xl">Devnora AI</span>
          </div>
          <h1 className="text-4xl text-white mb-2">Welcome! Let's get you set up</h1>
          <p className="text-slate-400 text-lg">
            Help us personalize your experience in just a few steps
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === step
                  ? 'w-12 bg-gradient-to-r from-blue-600 to-purple-600'
                  : i < step
                  ? 'w-8 bg-blue-600'
                  : 'w-8 bg-slate-800'
              }`}
            ></div>
          ))}
        </div>

        {/* Step Content */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 mb-6">
          {step === 1 && (
            <div>
              <h2 className="text-2xl text-white mb-2">What's your role?</h2>
              <p className="text-slate-400 mb-6">This helps us customize your experience</p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { value: 'developer', label: 'Developer', icon: Code },
                  { value: 'designer', label: 'Designer', icon: Sparkles },
                  { value: 'founder', label: 'Founder/CEO', icon: Rocket },
                  { value: 'manager', label: 'Product Manager', icon: Briefcase }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFormData({ ...formData, role: option.value })}
                    className={`p-6 rounded-xl border-2 transition-all text-left ${
                      formData.role === option.value
                        ? 'border-blue-600 bg-blue-600/10'
                        : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <option.icon className={`w-8 h-8 mb-3 ${
                      formData.role === option.value ? 'text-blue-400' : 'text-slate-400'
                    }`} />
                    <h3 className="text-white mb-1">{option.label}</h3>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl text-white mb-2">Team size?</h2>
              <p className="text-slate-400 mb-6">How many people will be using Devnora AI?</p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { value: 'solo', label: 'Just me', description: 'Individual plan' },
                  { value: 'small', label: '2-10 people', description: 'Small team' },
                  { value: 'medium', label: '11-50 people', description: 'Medium team' },
                  { value: 'large', label: '50+ people', description: 'Enterprise' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFormData({ ...formData, teamSize: option.value })}
                    className={`p-6 rounded-xl border-2 transition-all text-left ${
                      formData.teamSize === option.value
                        ? 'border-blue-600 bg-blue-600/10'
                        : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <Users className={`w-8 h-8 mb-3 ${
                      formData.teamSize === option.value ? 'text-blue-400' : 'text-slate-400'
                    }`} />
                    <h3 className="text-white mb-1">{option.label}</h3>
                    <p className="text-slate-400 text-sm">{option.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl text-white mb-2">What will you build?</h2>
              <p className="text-slate-400 mb-6">Select your primary use case</p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { value: 'website', label: 'Website/Landing Page', description: 'Marketing sites' },
                  { value: 'saas', label: 'SaaS Dashboard', description: 'Web applications' },
                  { value: 'ecommerce', label: 'E-commerce Store', description: 'Online shop' },
                  { value: 'api', label: 'API/Backend', description: 'Server-side apps' },
                  { value: 'workflow', label: 'Workflow Automation', description: 'Business processes' },
                  { value: 'other', label: 'Something Else', description: 'Custom project' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFormData({ ...formData, useCase: option.value })}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      formData.useCase === option.value
                        ? 'border-blue-600 bg-blue-600/10'
                        : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <h3 className="text-white mb-1">{option.label}</h3>
                    <p className="text-slate-400 text-sm">{option.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleSkip}
            className="px-6 py-3 text-slate-400 hover:text-white transition-colors"
          >
            Skip for now
          </button>
          <div className="flex gap-3">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-colors"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={
                (step === 1 && !formData.role) ||
                (step === 2 && !formData.teamSize) ||
                (step === 3 && !formData.useCase)
              }
              className="px-8 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {step === 3 ? 'Complete Setup' : 'Continue'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-slate-500">
          Step {step} of 3 • Takes less than 2 minutes
        </div>
      </div>
    </div>
  );
}