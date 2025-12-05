import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Twitter, Github, Linkedin, Youtube, Facebook } from 'lucide-react';

export default function MarketingFooter() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-white">Devnora AI</span>
            </Link>
            <p className="text-slate-400 text-sm mb-6 max-w-xs">
              Complete multi-tenant SaaS platform with AI-powered code generation, legacy repair, workflow automation, and mobile app conversion.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors">
                <Twitter className="w-4 h-4 text-slate-400" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors">
                <Github className="w-4 h-4 text-slate-400" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors">
                <Linkedin className="w-4 h-4 text-slate-400" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors">
                <Youtube className="w-4 h-4 text-slate-400" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors">
                <Facebook className="w-4 h-4 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white text-sm mb-4">Product</h4>
            <ul className="space-y-3">
              <li><Link to="/features" className="text-slate-400 hover:text-white text-sm transition-colors">Features</Link></li>
              <li><Link to="/templates" className="text-slate-400 hover:text-white text-sm transition-colors">Templates</Link></li>
              <li><Link to="/pricing" className="text-slate-400 hover:text-white text-sm transition-colors">Pricing</Link></li>
              <li><Link to="/roadmap" className="text-slate-400 hover:text-white text-sm transition-colors">Roadmap</Link></li>
              <li><Link to="/changelog" className="text-slate-400 hover:text-white text-sm transition-colors">Changelog</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white text-sm mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-slate-400 hover:text-white text-sm transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-white text-sm transition-colors">Contact</Link></li>
              <li><Link to="/careers" className="text-slate-400 hover:text-white text-sm transition-colors">Careers</Link></li>
              <li><Link to="/blog" className="text-slate-400 hover:text-white text-sm transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white text-sm mb-4">Resources</h4>
            <ul className="space-y-3">
              <li><Link to="/learning" className="text-slate-400 hover:text-white text-sm transition-colors">Learning Hub</Link></li>
              <li><Link to="/documentation" className="text-slate-400 hover:text-white text-sm transition-colors">Documentation</Link></li>
              <li><Link to="/api-docs" className="text-slate-400 hover:text-white text-sm transition-colors">API Docs</Link></li>
              <li><Link to="/community" className="text-slate-400 hover:text-white text-sm transition-colors">Community</Link></li>
              <li><Link to="/support" className="text-slate-400 hover:text-white text-sm transition-colors">Support</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white text-sm mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><Link to="/privacy" className="text-slate-400 hover:text-white text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-slate-400 hover:text-white text-sm transition-colors">Terms of Service</Link></li>
              <li><Link to="/security" className="text-slate-400 hover:text-white text-sm transition-colors">Security</Link></li>
              <li><Link to="/gdpr" className="text-slate-400 hover:text-white text-sm transition-colors">GDPR</Link></li>
              <li><Link to="/cookies" className="text-slate-400 hover:text-white text-sm transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © 2025 Devnora AI. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="text-slate-500 hover:text-white text-sm transition-colors">
              Contact Us
            </Link>
            <Link to="/signup" className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm rounded-lg hover:shadow-lg transition-all">
              Sign Up for Demo
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}