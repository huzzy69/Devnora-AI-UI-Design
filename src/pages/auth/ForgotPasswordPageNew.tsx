import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, Mail, Send } from 'lucide-react';

export default function ForgotPasswordPageNew() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Reset email sent to:', email);
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/login" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>

          {!sent ? (
            <>
              <h1 className="text-3xl text-white text-center mb-2">Forgot Password?</h1>
              <p className="text-slate-400 text-center mb-8">
                No worries! Enter your email and we'll send you reset instructions.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-slate-300 text-sm mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2"
                >
                  Send Reset Link <Send className="w-5 h-5" />
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="text-center">
                <div className="w-20 h-20 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="w-10 h-10 text-green-500" />
                </div>
                <h1 className="text-3xl text-white mb-2">Check Your Email</h1>
                <p className="text-slate-400 mb-8">
                  We sent a password reset link to<br />
                  <span className="text-white">{email}</span>
                </p>
                <Link
                  to="/login"
                  className="inline-block px-8 py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-colors"
                >
                  Back to Login
                </Link>
              </div>
            </>
          )}

          <div className="mt-6 text-center text-sm text-slate-500">
            Remember your password?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
