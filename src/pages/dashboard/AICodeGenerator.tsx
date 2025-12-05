import React, { useState } from 'react';
import { Sparkles, Code, Eye, Download, Copy, Save, Settings, Check, Loader, Play, RefreshCw, FileCode, Terminal, Zap, BookOpen, History, Wand2 } from 'lucide-react';

export default function AICodeGenerator() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');
  const [framework, setFramework] = useState('react');
  const [language, setLanguage] = useState('typescript');
  const [copied, setCopied] = useState(false);

  const frameworks = [
    { id: 'react', name: 'React', icon: '⚛️' },
    { id: 'vue', name: 'Vue', icon: '💚' },
    { id: 'angular', name: 'Angular', icon: '🅰️' },
    { id: 'svelte', name: 'Svelte', icon: '🔥' },
    { id: 'nextjs', name: 'Next.js', icon: '▲' },
  ];

  const languages = [
    { id: 'typescript', name: 'TypeScript' },
    { id: 'javascript', name: 'JavaScript' },
    { id: 'python', name: 'Python' },
  ];

  const templates = [
    { name: 'Dashboard Component', desc: 'Admin dashboard with charts', icon: '📊' },
    { name: 'Authentication Form', desc: 'Login & signup pages', icon: '🔐' },
    { name: 'Data Table', desc: 'Sortable, filterable table', icon: '📋' },
    { name: 'API Integration', desc: 'REST API with hooks', icon: '🔌' },
    { name: 'Payment Flow', desc: 'Stripe checkout integration', icon: '💳' },
    { name: 'File Upload', desc: 'Drag & drop uploader', icon: '📁' },
  ];

  const recentPrompts = [
    { prompt: 'Create a responsive navbar with dropdown menu', time: '2 hours ago' },
    { prompt: 'Build a modal component with animations', time: '1 day ago' },
    { prompt: 'Generate API service for user authentication', time: '2 days ago' },
  ];

  const generatedCode = `import React, { useState } from 'react';
import { Search, Filter, Download, MoreVertical } from 'lucide-react';

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { label: 'Total Users', value: '2,543', change: '+12%' },
    { label: 'Revenue', value: '$45,231', change: '+23%' },
    { label: 'Active Projects', value: '89', change: '+5%' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Dashboard
            </h1>
            <p className="text-slate-600">
              Welcome back! Here's what's happening.
            </p>
          </div>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg">
            New Project
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="p-6 bg-white rounded-xl shadow-sm">
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm text-slate-600">{stat.label}</div>
              <div className="text-sm text-green-600 mt-2">{stat.change}</div>
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          {/* Activity content */}
        </div>
      </div>
    </div>
  );
}`;

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000);
  };

  const handleCopy = async () => {
    try {
      // Try using the modern Clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(generatedCode);
      } else {
        // Fallback method for older browsers or non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = generatedCode;
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
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-800 bg-slate-900">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl text-white mb-1 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                AI Code Generator
              </h1>
              <p className="text-slate-400">Generate production-ready code with natural language</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-700 transition-colors flex items-center gap-2">
                <History className="w-4 h-4" />
                History
              </button>
              <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-700 transition-colors flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Examples
              </button>
              <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-700 transition-colors">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Configuration Bar */}
          <div className="flex items-center gap-4 p-4 bg-slate-950 border border-slate-800 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">Framework:</span>
              <div className="flex gap-2">
                {frameworks.map((fw) => (
                  <button
                    key={fw.id}
                    onClick={() => setFramework(fw.id)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                      framework === fw.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    <span className="mr-1">{fw.icon}</span>
                    {fw.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="w-px h-8 bg-slate-800"></div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">Language:</span>
              <div className="flex gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => setLanguage(lang.id)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                      language === lang.id
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Templates & History */}
        <div className="w-80 border-r border-slate-800 bg-slate-900 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-sm text-slate-400 mb-3 uppercase tracking-wide">Quick Templates</h3>
            <div className="space-y-2">
              {templates.map((template, i) => (
                <button
                  key={i}
                  onClick={() => setPrompt(`Create a ${template.name.toLowerCase()}`)}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg hover:border-slate-700 transition-all text-left group"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{template.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm text-white group-hover:text-blue-400 transition-colors mb-1">
                        {template.name}
                      </h4>
                      <p className="text-xs text-slate-500">{template.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="text-sm text-slate-400 mb-3 uppercase tracking-wide">Recent Prompts</h3>
              <div className="space-y-2">
                {recentPrompts.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setPrompt(item.prompt)}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg hover:border-slate-700 transition-all text-left"
                  >
                    <p className="text-sm text-white mb-1 line-clamp-2">{item.prompt}</p>
                    <p className="text-xs text-slate-500">{item.time}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Center - Prompt & Output */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Prompt Input */}
          <div className="p-6 border-b border-slate-800 bg-slate-900">
            <div className="max-w-4xl mx-auto">
              <label className="block text-sm text-slate-400 mb-3">
                Describe what you want to build
              </label>
              <div className="relative">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="E.g., Create a responsive dashboard component with a sidebar, header, and data table showing user statistics..."
                  className="w-full h-32 px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 resize-none focus:outline-none focus:border-blue-500 transition-colors"
                />
                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  <span className="text-xs text-slate-500">{prompt.length} / 2000</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <button className="px-3 py-1.5 sm:px-3 sm:py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs sm:text-sm rounded-lg transition-colors whitespace-nowrap">
                    Add Context
                  </button>
                  <button className="px-3 py-1.5 sm:px-3 sm:py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs sm:text-sm rounded-lg transition-colors whitespace-nowrap">
                    Use Template
                  </button>
                </div>
                <button
                  onClick={handleGenerate}
                  disabled={!prompt || isGenerating}
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25"
                >
                  {isGenerating ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5" />
                      Generate Code
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Code Output */}
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-950">
            {/* Tabs */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-slate-800 bg-slate-900">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('code')}
                  className={`px-4 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${
                    activeTab === 'code'
                      ? 'bg-slate-950 text-white border border-slate-800'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <FileCode className="w-4 h-4" />
                  Code
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`px-4 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${
                    activeTab === 'preview'
                      ? 'bg-slate-950 text-white border border-slate-800'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Save Project
                </button>
              </div>
            </div>

            {/* Code Editor */}
            {activeTab === 'code' && (
              <div className="flex-1 overflow-auto p-6 font-mono text-sm">
                <pre className="text-slate-300">
                  <code>{generatedCode}</code>
                </pre>
              </div>
            )}

            {/* Preview */}
            {activeTab === 'preview' && (
              <div className="flex-1 overflow-auto p-6">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h1 className="text-3xl mb-2 text-slate-900">Dashboard</h1>
                        <p className="text-slate-600">Welcome back! Here's what's happening.</p>
                      </div>
                      <button className="px-6 py-3 bg-blue-600 text-white rounded-lg">
                        New Project
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                      {['Total Users', 'Revenue', 'Active Projects'].map((label, i) => (
                        <div key={i} className="p-6 bg-slate-50 rounded-xl">
                          <div className="text-3xl mb-2 text-slate-900">
                            {['2,543', '$45,231', '89'][i]}
                          </div>
                          <div className="text-sm text-slate-600">{label}</div>
                          <div className="text-sm text-green-600 mt-2">
                            {['+12%', '+23%', '+5%'][i]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar - AI Suggestions */}
        <div className="w-80 border-l border-slate-800 bg-slate-900 overflow-y-auto">
          <div className="p-4">
            <div className="p-4 bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-blue-400" />
                <h3 className="text-white">AI Suggestions</h3>
              </div>
              <p className="text-sm text-slate-300 mb-3">
                Enhance your code with these improvements:
              </p>
              <div className="space-y-2">
                <button className="w-full px-4 py-3 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-slate-600 rounded-xl text-left text-sm text-white transition-all flex items-center gap-2">
                  <span className="text-blue-400">+</span>
                  <span>Add responsive design</span>
                </button>
                <button className="w-full px-4 py-3 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-slate-600 rounded-xl text-left text-sm text-white transition-all flex items-center gap-2">
                  <span className="text-blue-400">+</span>
                  <span>Include dark mode</span>
                </button>
                <button className="w-full px-4 py-3 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-slate-600 rounded-xl text-left text-sm text-white transition-all flex items-center gap-2">
                  <span className="text-blue-400">+</span>
                  <span>Add animations</span>
                </button>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-sm text-slate-400 mb-3 uppercase tracking-wide">Code Stats</h3>
              <div className="space-y-3 p-4 bg-slate-950 border border-slate-800 rounded-xl">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Lines of code</span>
                  <span className="text-white">247</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Components</span>
                  <span className="text-white">3</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Dependencies</span>
                  <span className="text-white">5</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">File size</span>
                  <span className="text-white">8.2 KB</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm text-slate-400 mb-3 uppercase tracking-wide">Related</h3>
              <div className="space-y-2">
                {[
                  'Sidebar Component',
                  'Navigation Menu',
                  'Data Visualization',
                ].map((item, i) => (
                  <button
                    key={i}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg hover:border-slate-700 transition-all text-left text-sm text-white"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}