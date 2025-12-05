import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield } from 'lucide-react';

export default function OTPVerifyPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center px-6 py-12">
      <div className="relative w-full max-w-md">
        <Link to="/" className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl text-white">Devnora AI</span>
        </Link>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-3xl text-white mb-2">Verify Your Email</h1>
            <p className="text-slate-400">Enter the 6-digit code sent to your email</p>
          </div>

          <form className="space-y-6">
            <div className="flex gap-3 justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className="w-12 h-14 bg-slate-950 border border-slate-800 rounded-xl text-center text-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>

            <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl">
              Verify Code
            </button>

            <p className="text-center text-sm text-slate-400">
              Didn't receive the code?{' '}
              <button className="text-blue-400 hover:text-blue-300">Resend</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}