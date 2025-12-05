import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowLeft, Shield } from 'lucide-react';

export default function OTPVerifyPageNew() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('OTP:', otp.join(''));
    navigate('/onboarding');
  };

  const handleResend = () => {
    console.log('Resending OTP...');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/signup" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8">
          {/* Icon */}
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-3xl text-white text-center mb-2">Verify Your Email</h1>
          <p className="text-slate-400 text-center mb-8">
            We sent a 6-digit code to<br />
            <span className="text-white">john@example.com</span>
          </p>

          <form onSubmit={handleSubmit}>
            {/* OTP Input */}
            <div className="flex justify-center gap-3 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-14 bg-slate-800 border border-slate-700 rounded-xl text-white text-center text-2xl focus:outline-none focus:border-blue-500 transition-colors"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all mb-4"
            >
              Verify Email
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={handleResend}
                className="text-slate-400 hover:text-white text-sm transition-colors"
              >
                Didn't receive the code? <span className="text-blue-400">Resend</span>
              </button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-800 text-center text-sm text-slate-500">
            <Shield className="w-4 h-4 inline mr-1" />
            Your data is protected with enterprise-grade security
          </div>
        </div>
      </div>
    </div>
  );
}
