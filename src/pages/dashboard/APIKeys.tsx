import React, { useState } from 'react';
import { Key, Plus, Copy, Eye, EyeOff, Trash, Check } from 'lucide-react';

export default function APIKeys() {
  const [showKey, setShowKey] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const apiKeys: any[] = [];

  const copyToClipboard = (text: string) => {
    try {
      // Try using the modern Clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text);
      } else {
        // Fallback method for older browsers or non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
        } catch (err) {
          console.error('Fallback: Could not copy text', err);
        }
        textArea.remove();
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
      // Still show feedback even if copy fails
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl mb-2 text-slate-900">API Keys</h1>
          <p className="text-slate-600">Manage your API keys for programmatic access</p>
        </div>
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Create New Key
        </button>
      </div>

      {/* Usage Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {[
          { label: 'Total API Calls', value: '16,550', change: '+23%' },
          { label: 'Active Keys', value: '3', change: '+1' },
          { label: 'Monthly Limit', value: '100,000', change: '16.5% used' },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="text-3xl mb-1 text-slate-900">{stat.value}</div>
            <div className="text-sm text-slate-600 mb-2">{stat.label}</div>
            <div className="text-sm text-green-600">{stat.change}</div>
          </div>
        ))}
      </div>

      {/* API Keys List */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl text-slate-900">Your API Keys</h2>
        </div>
        <div className="divide-y divide-slate-200">
          {apiKeys.map((apiKey, i) => (
            <div key={i} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg text-slate-900 mb-2">{apiKey.name}</h3>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <span>Created {apiKey.created}</span>
                    <span>•</span>
                    <span>Last used {apiKey.lastUsed}</span>
                    <span>•</span>
                    <span>{apiKey.requests} requests</span>
                  </div>
                </div>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                  <Trash className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl font-mono text-sm">
                  <Key className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span className="flex-1">
                    {showKey === i ? apiKey.key : '••••••••••••••••••••••••••••••'}
                  </span>
                </div>
                <button
                  onClick={() => setShowKey(showKey === i ? null : i)}
                  className="px-4 py-3 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl"
                >
                  {showKey === i ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => copyToClipboard(apiKey.key)}
                  className="px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl flex items-center gap-2"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Documentation */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <h3 className="text-xl text-slate-900 mb-2">API Documentation</h3>
        <p className="text-slate-600 mb-4">
          Learn how to integrate Horosoft AI Builder into your applications using our API.
        </p>
        <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg">
          View Documentation
        </button>
      </div>
    </div>
  );
}