import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Briefcase, Users, Target, ArrowRight } from 'lucide-react';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const complete = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center px-6 py-12">
      <div className="relative w-full max-w-2xl">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl text-white">Devnora AI</span>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="flex justify-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className={`h-1 flex-1 rounded ${s <= step ? 'bg-blue-600' : 'bg-slate-800'}`}></div>
            ))}
          </div>

          {step === 1 && (
            <div className="text-center">
              <h2 className="text-3xl text-white mb-4">What brings you here?</h2>
              <p className="text-slate-400 mb-8">Help us customize your experience</p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: Briefcase, label: 'Building a business', desc: 'Create products for clients' },
                  { icon: Users, label: 'Working with a team', desc: 'Collaborate on projects' },
                  { icon: Target, label: 'Personal projects', desc: 'Build for fun or learning' },
                  { icon: Sparkles, label: 'Just exploring', desc: 'Trying out the platform' },
                ].map((option, i) => (
                  <button key={i} onClick={() => setStep(2)} className="p-6 bg-slate-950 border border-slate-800 rounded-xl hover:border-blue-500 transition-colors text-left group">
                    <option.icon className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="text-white mb-1">{option.label}</h3>
                    <p className="text-sm text-slate-400">{option.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="text-center">
              <h2 className="text-3xl text-white mb-4">What will you build first?</h2>
              <p className="text-slate-400 mb-8">Choose a starting point</p>
              <div className="space-y-3">
                {['Website', 'Web Application', 'Dashboard', 'E-commerce Store', 'Landing Page'].map((type, i) => (
                  <button key={i} onClick={() => setStep(3)} className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl hover:border-blue-500 transition-colors text-white text-left">
                    {type}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl text-white mb-4">You're all set!</h2>
              <p className="text-slate-400 mb-8">Let's start building something amazing</p>
              <button onClick={complete} className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl flex items-center gap-2 mx-auto">
                Go to Dashboard
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}