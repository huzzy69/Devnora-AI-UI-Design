import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Menu, X, ChevronDown } from 'lucide-react';

export default function MarketingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-white text-lg hidden sm:block">Devnora AI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <div className="relative">
              <button
                onMouseEnter={() => setProductsOpen(true)}
                onMouseLeave={() => setProductsOpen(false)}
                className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
              >
                Products <ChevronDown className="w-4 h-4" />
              </button>
              {productsOpen && (
                <div
                  onMouseEnter={() => setProductsOpen(true)}
                  onMouseLeave={() => setProductsOpen(false)}
                  className="absolute top-full left-0 mt-2 w-64 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-2"
                >
                  <Link to="/features" className="block px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition-colors">
                    Features
                  </Link>
                  <Link to="/templates" className="block px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition-colors">
                    Templates
                  </Link>
                  <Link to="/roadmap" className="block px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition-colors">
                    Roadmap
                  </Link>
                </div>
              )}
            </div>
            <Link to="/pricing" className="text-slate-300 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link to="/learning" className="text-slate-300 hover:text-white transition-colors">
              Learn
            </Link>
            <Link to="/about" className="text-slate-300 hover:text-white transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-slate-300 hover:text-white transition-colors">
              Contact
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all"
            >
              Start Free
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900/95 backdrop-blur-xl border-t border-slate-800/50">
          <div className="px-4 py-6 space-y-3">
            <Link to="/features" className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition-colors">
              Features
            </Link>
            <Link to="/templates" className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition-colors">
              Templates
            </Link>
            <Link to="/pricing" className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition-colors">
              Pricing
            </Link>
            <Link to="/learning" className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition-colors">
              Learn
            </Link>
            <Link to="/about" className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition-colors">
              About
            </Link>
            <Link to="/contact" className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition-colors">
              Contact
            </Link>
            <div className="pt-4 space-y-3">
              <Link to="/login" className="block px-4 py-3 text-center text-slate-300 hover:text-white border border-slate-700 rounded-xl transition-colors">
                Sign In
              </Link>
              <Link to="/signup" className="block px-4 py-3 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl">
                Start Free
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}