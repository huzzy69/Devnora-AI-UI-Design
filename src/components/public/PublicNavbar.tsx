import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Menu, X, ChevronDown } from 'lucide-react';

export default function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl text-white">Horosoft AI Builder</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/features" className="text-slate-300 hover:text-white transition-colors">
              Features
            </Link>
            <Link to="/templates" className="text-slate-300 hover:text-white transition-colors">
              Templates
            </Link>
            <Link to="/learning" className="text-slate-300 hover:text-white transition-colors">
              Learning Hub
            </Link>
            <Link to="/pricing" className="text-slate-300 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link to="/about" className="text-slate-300 hover:text-white transition-colors">
              About
            </Link>
            <Link 
              to="/why-horosoft" 
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg transition-all"
            >
              Why Horosoft?
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/login" className="px-4 py-2 text-slate-300 hover:text-white transition-colors">
              Log In
            </Link>
            <Link to="/signup" className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg transition-all">
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-white/10">
          <div className="px-6 py-4 space-y-4">
            <Link to="/features" className="block text-slate-300 hover:text-white transition-colors">
              Features
            </Link>
            <Link to="/templates" className="block text-slate-300 hover:text-white transition-colors">
              Templates
            </Link>
            <Link to="/learning" className="block text-slate-300 hover:text-white transition-colors">
              Learning Hub
            </Link>
            <Link to="/pricing" className="block text-slate-300 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link to="/about" className="block text-slate-300 hover:text-white transition-colors">
              About
            </Link>
            <Link 
              to="/why-horosoft" 
              className="block px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-center"
            >
              Why Horosoft?
            </Link>
            <div className="pt-4 border-t border-white/10 space-y-3">
              <Link to="/login" className="block px-4 py-2 text-center text-slate-300 hover:text-white transition-colors">
                Log In
              </Link>
              <Link to="/signup" className="block px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-center">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}