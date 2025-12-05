import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Sparkles, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import SessionWarningModal from '../../components/auth/SessionWarningModal';

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSessionWarning, setShowSessionWarning] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, logout, checkSession } = useAuth();

  // Get workspace info from navigation state
  const workspaceInfo = location.state as { workspaceName?: string; workspaceId?: number } | null;

  // Check for existing session on mount
  useEffect(() => {
    const session = checkSession();
    if (session.isLoggedIn && session.workspace !== 'admin') {
      setShowSessionWarning(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if already logged into another workspace
    const session = checkSession();
    if (session.isLoggedIn && session.workspace !== 'admin') {
      setShowSessionWarning(true);
      return;
    }

    // Simulate authentication
    console.log('Admin login:', { email, password, workspace: workspaceInfo });
    
    // Set authentication state
    login('admin', email);
    
    // Redirect to admin workspace dashboard after login
    navigate('/admin-workspace', { state: { workspace: workspaceInfo } });
  };

  const handleLogoutAndSwitch = () => {
    logout();
    setShowSessionWarning(false);
    // Stay on this page so user can login
  };

  const handleCancelSwitch = () => {
    setShowSessionWarning(false);
    const session = checkSession();
    if (session.workspace === 'owner') {
      navigate('/dashboard');
    } else if (session.workspace === 'member') {
      navigate('/member-workspace');
    }
  };

  return (
    <>
      {showSessionWarning && (
        <SessionWarningModal
          currentWorkspace={checkSession().workspace || ''}
          currentEmail={checkSession().email || ''}
          targetWorkspace="admin"
          onLogout={handleLogoutAndSwitch}
          onCancel={handleCancelSwitch}
        />
      )}
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl text-white">Devnora AI</span>
          </Link>

          {/* Login Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-green-600/10 to-emerald-600/10 border-b border-slate-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl text-white">Admin Access</h1>
                  <p className="text-sm text-slate-400">
                    {workspaceInfo?.workspaceName || 'Sign in as Admin'}
                  </p>
                </div>
              </div>
              {workspaceInfo && (
                <div className="px-3 py-2 bg-green-600/20 border border-green-500/30 rounded-lg">
                  <p className="text-xs text-green-300">
                    You need Admin credentials to access this workspace
                  </p>
                </div>
              )}
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-green-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Admin Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your admin password"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-green-500 transition-colors pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 bg-slate-950 border border-slate-800 rounded"
                  />
                  <span className="text-sm text-slate-400">Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-green-400 hover:text-green-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-lg transition-all shadow-lg shadow-green-500/25"
              >
                Sign In as Admin
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-800"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-slate-900 text-slate-500">Or</span>
                </div>
              </div>

              <Link
                to="/dashboard"
                className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Link>
            </form>

            {/* Footer */}
            <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 text-center">
              <p className="text-xs text-slate-500">
                Don't have admin access?{' '}
                <Link to="/contact" className="text-green-400 hover:text-green-300">
                  Contact owner
                </Link>
              </p>
            </div>
          </div>

          {/* Security Note */}
          <div className="mt-6 p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
            <p className="text-xs text-slate-400 text-center">
              🛡️ Admin accounts have elevated privileges. Verify the URL before signing in.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}