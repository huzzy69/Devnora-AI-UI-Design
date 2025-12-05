import React, { useState } from 'react';
import { 
  Globe, Sparkles, Check, Loader, Download, Copy, Eye, Edit, FileCode, 
  Image as ImageIcon, Layout, ArrowRight, Code, FileText, Folder, 
  ExternalLink, Save, X as CloseIcon, ChevronRight, Search, Settings,
  Maximize2, Monitor, Smartphone, Tablet, Zap, Package, Palette,
  Film, Music, File, ChevronDown, ChevronUp, Terminal, FolderOpen
} from 'lucide-react';

interface Asset {
  type: 'image' | 'css' | 'js' | 'font' | 'video' | 'other';
  name: string;
  url: string;
  size: string;
  used: boolean;
}

interface Project {
  id: string;
  name: string;
  type: string;
  lastModified: string;
}

export default function AIWebsiteReplicator() {
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'assets' | 'editor'>('preview');
  const [codeView, setCodeView] = useState<'html' | 'css' | 'js'>('html');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showCloneModal, setShowCloneModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [newProjectName, setNewProjectName] = useState('');
  const [createNewProject, setCreateNewProject] = useState(false);
  const [expandedAssetType, setExpandedAssetType] = useState<string | null>(null);
  const [editedHTML, setEditedHTML] = useState('');
  const [editedCSS, setEditedCSS] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample extracted code
  const extractedHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Replicated Website - Devnora AI</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- Header Navigation -->
  <header class="header">
    <div class="container">
      <div class="logo">
        <img src="assets/logo.svg" alt="Logo">
      </div>
      <nav class="nav">
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="#about">About</a>
        <a href="#contact" class="btn-primary">Get Started</a>
      </nav>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="hero">
    <div class="container">
      <h1 class="hero-title">Build Amazing Products Faster</h1>
      <p class="hero-subtitle">The most powerful platform for modern teams</p>
      <div class="hero-cta">
        <button class="btn btn-large btn-primary">Start Free Trial</button>
        <button class="btn btn-large btn-secondary">Watch Demo</button>
      </div>
    </div>
  </section>

  <!-- Features Grid -->
  <section class="features">
    <div class="container">
      <h2 class="section-title">Powerful Features</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">🚀</div>
          <h3>Lightning Fast</h3>
          <p>Optimized for speed and performance</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🔒</div>
          <h3>Secure by Default</h3>
          <p>Enterprise-grade security built-in</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">📊</div>
          <h3>Advanced Analytics</h3>
          <p>Deep insights into your data</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <p>&copy; 2025 Company Name. All rights reserved.</p>
    </div>
  </footer>

  <script src="scripts/main.js"></script>
</body>
</html>`;

  const extractedCSS = `/* Reset & Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --color-primary: #3B82F6;
  --color-secondary: #8B5CF6;
  --color-success: #10B981;
  --color-danger: #EF4444;
  --color-dark: #1E293B;
  --color-light: #F8FAFC;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
  --spacing-xl: 4rem;
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
}

body {
  font-family: 'Inter', -apple-system, sans-serif;
  line-height: 1.6;
  color: var(--color-dark);
  background: var(--color-light);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

/* Header */
.header {
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: var(--spacing-md) 0;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav {
  display: flex;
  gap: var(--spacing-lg);
  align-items: center;
}

.nav a {
  color: var(--color-dark);
  text-decoration: none;
  transition: color 0.3s;
}

.nav a:hover {
  color: var(--color-primary);
}

/* Hero Section */
.hero {
  padding: var(--spacing-xl) 0;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: var(--spacing-md);
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: var(--spacing-lg);
  opacity: 0.9;
}

.hero-cta {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
}

/* Buttons */
.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-primary {
  background: var(--color-primary);
  color: white;
}

.btn-primary:hover {
  background: #2563EB;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-large {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

/* Features */
.features {
  padding: var(--spacing-xl) 0;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: var(--spacing-xl);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.feature-card {
  background: white;
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-md);
}

/* Footer */
.footer {
  background: var(--color-dark);
  color: white;
  padding: var(--spacing-lg) 0;
  text-align: center;
  margin-top: var(--spacing-xl);
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .nav {
    display: none;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
}`;

  const extractedJS = `// Main Application Logic
console.log('Website loaded - Devnora AI Replicator');

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, observerOptions);

// Observe all feature cards
document.querySelectorAll('.feature-card').forEach(card => {
  observer.observe(card);
});

// Button click handlers
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function() {
    console.log('Button clicked:', this.textContent);
    // Add your custom logic here
  });
});

// Form validation (if forms exist)
const forms = document.querySelectorAll('form');
forms.forEach(form => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('Form submitted');
    // Add validation logic
  });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
}`;

  const detectedAssets: Asset[] = [
    // Images
    { type: 'image', name: 'logo.svg', url: '/assets/logo.svg', size: '12 KB', used: true },
    { type: 'image', name: 'hero-bg.jpg', url: '/assets/hero-bg.jpg', size: '245 KB', used: true },
    { type: 'image', name: 'feature-1.png', url: '/assets/feature-1.png', size: '89 KB', used: true },
    { type: 'image', name: 'feature-2.png', url: '/assets/feature-2.png', size: '76 KB', used: true },
    { type: 'image', name: 'feature-3.png', url: '/assets/feature-3.png', size: '92 KB', used: true },
    { type: 'image', name: 'testimonial-1.jpg', url: '/assets/testimonial-1.jpg', size: '67 KB', used: true },
    { type: 'image', name: 'testimonial-2.jpg', url: '/assets/testimonial-2.jpg', size: '71 KB', used: true },
    { type: 'image', name: 'icon-security.svg', url: '/assets/icon-security.svg', size: '8 KB', used: true },
    { type: 'image', name: 'icon-speed.svg', url: '/assets/icon-speed.svg', size: '7 KB', used: true },
    { type: 'image', name: 'icon-analytics.svg', url: '/assets/icon-analytics.svg', size: '9 KB', used: true },
    
    // CSS Files
    { type: 'css', name: 'styles.css', url: '/css/styles.css', size: '45 KB', used: true },
    { type: 'css', name: 'reset.css', url: '/css/reset.css', size: '3 KB', used: true },
    { type: 'css', name: 'responsive.css', url: '/css/responsive.css', size: '12 KB', used: true },
    
    // JavaScript Files
    { type: 'js', name: 'main.js', url: '/js/main.js', size: '18 KB', used: true },
    { type: 'js', name: 'analytics.js', url: '/js/analytics.js', size: '23 KB', used: true },
    { type: 'js', name: 'utils.js', url: '/js/utils.js', size: '7 KB', used: false },
    
    // Fonts
    { type: 'font', name: 'Inter-Regular.woff2', url: '/fonts/Inter-Regular.woff2', size: '67 KB', used: true },
    { type: 'font', name: 'Inter-Bold.woff2', url: '/fonts/Inter-Bold.woff2', size: '71 KB', used: true },
    { type: 'font', name: 'Inter-SemiBold.woff2', url: '/fonts/Inter-SemiBold.woff2', size: '69 KB', used: true },
    
    // Other
    { type: 'other', name: 'manifest.json', url: '/manifest.json', size: '2 KB', used: true },
    { type: 'other', name: 'robots.txt', url: '/robots.txt', size: '1 KB', used: false },
  ];

  const existingProjects: Project[] = [
    { id: 'proj_1', name: 'E-commerce Platform', type: 'Full Website', lastModified: '2 days ago' },
    { id: 'proj_2', name: 'Landing Page Collection', type: 'Templates', lastModified: '1 week ago' },
    { id: 'proj_3', name: 'SaaS Dashboard', type: 'Web App', lastModified: '3 days ago' },
    { id: 'proj_4', name: 'Portfolio Sites', type: 'Multi-page', lastModified: '5 days ago' },
  ];

  const detectedSections = [
    { name: 'Header Navigation', elements: 5, status: 'complete', icon: Layout },
    { name: 'Hero Section', elements: 3, status: 'complete', icon: Layout },
    { name: 'Features Grid', elements: 12, status: 'complete', icon: Layout },
    { name: 'Testimonials', elements: 6, status: 'complete', icon: Layout },
    { name: 'CTA Section', elements: 2, status: 'complete', icon: Layout },
    { name: 'Footer', elements: 8, status: 'complete', icon: Layout },
  ];

  const extractedAssetsSummary = {
    images: 10,
    css: 3,
    js: 3,
    fonts: 3,
    other: 2,
    colors: 12,
    components: 36
  };

  React.useEffect(() => {
    if (scanned) {
      setEditedHTML(extractedHTML);
      setEditedCSS(extractedCSS);
    }
  }, [scanned]);

  const handleScan = () => {
    setIsScanning(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setScanned(true);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const copyCode = (code: string, type: string) => {
    navigator.clipboard.writeText(code);
    alert(`${type} code copied to clipboard!`);
  };

  const downloadAsset = (asset: Asset) => {
    alert(`Downloading: ${asset.name}`);
    // Implement actual download logic
  };

  const downloadAllCode = () => {
    const blob = new Blob([
      `<!-- HTML -->\n${editedHTML}\n\n`,
      `/* CSS */\n${editedCSS}\n\n`,
      `// JavaScript\n${extractedJS}`
    ], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'replicated-website.txt';
    a.click();
  };

  const handleCloneToProject = () => {
    if (createNewProject && newProjectName) {
      alert(`Cloning website to new project: "${newProjectName}"`);
    } else if (selectedProject) {
      const project = existingProjects.find(p => p.id === selectedProject);
      alert(`Cloning website to existing project: "${project?.name}"`);
    } else {
      alert('Please select a project or create a new one');
      return;
    }
    setShowCloneModal(false);
  };

  const getAssetIcon = (type: string) => {
    switch (type) {
      case 'image': return ImageIcon;
      case 'css': return FileCode;
      case 'js': return Terminal;
      case 'font': return FileText;
      case 'video': return Film;
      default: return File;
    }
  };

  const getAssetColor = (type: string) => {
    switch (type) {
      case 'image': return 'blue';
      case 'css': return 'purple';
      case 'js': return 'yellow';
      case 'font': return 'green';
      default: return 'slate';
    }
  };

  const groupedAssets = detectedAssets.reduce((acc, asset) => {
    if (!acc[asset.type]) acc[asset.type] = [];
    acc[asset.type].push(asset);
    return acc;
  }, {} as Record<string, Asset[]>);

  const getPreviewWidth = () => {
    switch (previewMode) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      case 'desktop': return '100%';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl text-slate-900 mb-2">AI Website Replicator</h1>
          <p className="text-slate-600">Clone and recreate any website using advanced AI reverse engineering</p>
        </div>

        {/* URL Input */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6">
          <label className="block text-sm text-slate-700 mb-3">Enter website URL to replicate</label>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-12 pr-4 py-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleScan}
              disabled={!url || isScanning}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl flex items-center gap-2 transition-all shadow-lg"
            >
              {isScanning ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Start Replication
                </>
              )}
            </button>
          </div>

          {/* Quick Examples */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-slate-500">Try:</span>
            {['stripe.com', 'linear.app', 'vercel.com'].map((example) => (
              <button
                key={example}
                onClick={() => setUrl(`https://${example}`)}
                className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm rounded-lg transition-colors"
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        {/* Scanning Progress */}
        {isScanning && (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 mb-6">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Globe className="w-10 h-10 text-blue-600 animate-pulse" />
              </div>
              <h3 className="text-2xl text-slate-900 mb-2">Analyzing website structure...</h3>
              <p className="text-slate-600">AI is extracting components, styles, and content</p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              {/* Progress Bar */}
              <div>
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span className="text-slate-700">Overall Progress</span>
                  <span className="text-blue-600">{progress}%</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Scanning Steps */}
              <div className="space-y-3">
                {[
                  { label: 'Fetching page content', progress: 100 },
                  { label: 'Extracting HTML structure', progress: 100 },
                  { label: 'Analyzing CSS styles', progress: progress > 40 ? 100 : progress * 2.5 },
                  { label: 'Detecting components', progress: progress > 60 ? 100 : progress > 40 ? (progress - 40) * 5 : 0 },
                  { label: 'Extracting assets', progress: progress > 80 ? (progress - 80) * 5 : 0 },
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {step.progress === 100 ? (
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    ) : step.progress > 0 ? (
                      <Loader className="w-5 h-5 text-blue-600 animate-spin flex-shrink-0" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex-shrink-0"></div>
                    )}
                    <span className={`text-sm ${step.progress > 0 ? 'text-slate-900' : 'text-slate-400'}`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {scanned && !isScanning && (
          <div>
            {/* Success Message */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-2xl p-6 mb-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl text-slate-900 mb-2">Website successfully analyzed!</h3>
                    <p className="text-slate-700 mb-4">
                      AI has extracted {detectedSections.length} sections, {extractedAssetsSummary.components} components, and {detectedAssets.length} assets
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowCloneModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl flex items-center gap-2 transition-all shadow-lg"
                >
                  <Package className="w-5 h-5" />
                  Clone to Project
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Tabs */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              {/* Tab Navigation */}
              <div className="flex border-b border-slate-200 bg-slate-50">
                {[
                  { id: 'preview', label: 'Live Preview', icon: Eye },
                  { id: 'code', label: 'View Code', icon: Code },
                  { id: 'assets', label: 'Assets', icon: FolderOpen },
                  { id: 'editor', label: 'Code Editor', icon: Edit },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-6 py-4 flex items-center gap-2 border-b-2 transition-all ${
                      activeTab === tab.id
                        ? 'border-blue-600 text-blue-600 bg-white'
                        : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Preview Tab */}
              {activeTab === 'preview' && (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl text-slate-900">Reconstructed Preview</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setPreviewMode('desktop')}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                          previewMode === 'desktop' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        <Monitor className="w-4 h-4" />
                        Desktop
                      </button>
                      <button
                        onClick={() => setPreviewMode('tablet')}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                          previewMode === 'tablet' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        <Tablet className="w-4 h-4" />
                        Tablet
                      </button>
                      <button
                        onClick={() => setPreviewMode('mobile')}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                          previewMode === 'mobile' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        <Smartphone className="w-4 h-4" />
                        Mobile
                      </button>
                    </div>
                  </div>

                  <div className="bg-slate-100 rounded-xl p-6">
                    <div 
                      className="mx-auto transition-all duration-300"
                      style={{ maxWidth: getPreviewWidth() }}
                    >
                      <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
                        {/* Mini browser chrome */}
                        <div className="h-10 bg-slate-200 flex items-center px-4 gap-2 border-b border-slate-300">
                          <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                          </div>
                          <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-slate-500">
                            {url || 'https://example.com'}
                          </div>
                        </div>
                        
                        {/* Mock website preview */}
                        <div className="p-8 space-y-6 max-h-[600px] overflow-y-auto">
                          {/* Header */}
                          <div className="flex items-center justify-between">
                            <div className="h-8 w-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded"></div>
                            <div className="flex gap-3">
                              <div className="h-8 w-16 bg-slate-200 rounded"></div>
                              <div className="h-8 w-16 bg-slate-200 rounded"></div>
                              <div className="h-8 w-20 bg-blue-500 rounded"></div>
                            </div>
                          </div>

                          {/* Hero */}
                          <div className="text-center py-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl">
                            <div className="h-12 w-3/4 bg-slate-800 rounded mx-auto mb-4"></div>
                            <div className="h-6 w-1/2 bg-slate-400 rounded mx-auto mb-6"></div>
                            <div className="flex justify-center gap-3">
                              <div className="h-12 w-32 bg-blue-500 rounded"></div>
                              <div className="h-12 w-32 bg-slate-300 rounded"></div>
                            </div>
                          </div>

                          {/* Features */}
                          <div className="grid grid-cols-3 gap-4">
                            {[1, 2, 3].map((i) => (
                              <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                                <div className="h-12 w-12 bg-blue-200 rounded-lg mb-3"></div>
                                <div className="h-4 w-full bg-slate-200 rounded mb-2"></div>
                                <div className="h-3 w-3/4 bg-slate-200 rounded"></div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detected Sections */}
                  <div className="mt-6">
                    <h3 className="text-lg text-slate-900 mb-4">Detected Page Structure</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {detectedSections.map((section, i) => (
                        <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-300 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <section.icon className="w-5 h-5 text-blue-600" />
                              </div>
                              <div>
                                <h4 className="text-slate-900">{section.name}</h4>
                                <p className="text-sm text-slate-500">{section.elements} elements</p>
                              </div>
                            </div>
                            <Check className="w-5 h-5 text-green-600" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Code View Tab */}
              {activeTab === 'code' && (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex gap-2">
                      {[
                        { id: 'html', label: 'HTML', icon: FileCode },
                        { id: 'css', label: 'CSS', icon: Palette },
                        { id: 'js', label: 'JavaScript', icon: Terminal },
                      ].map((view) => (
                        <button
                          key={view.id}
                          onClick={() => setCodeView(view.id as any)}
                          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                            codeView === view.id
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          <view.icon className="w-4 h-4" />
                          {view.label}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => copyCode(
                          codeView === 'html' ? extractedHTML : codeView === 'css' ? extractedCSS : extractedJS,
                          codeView.toUpperCase()
                        )}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center gap-2 transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                        Copy Code
                      </button>
                      <button
                        onClick={downloadAllCode}
                        className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg flex items-center gap-2 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Download All
                      </button>
                    </div>
                  </div>

                  {/* Code Display */}
                  <div className="bg-slate-900 rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
                      <span className="text-sm text-slate-300">
                        {codeView === 'html' ? 'index.html' : codeView === 'css' ? 'styles.css' : 'main.js'}
                      </span>
                      <span className="text-xs text-slate-400">
                        {codeView === 'html' ? extractedHTML.split('\n').length : 
                         codeView === 'css' ? extractedCSS.split('\n').length : 
                         extractedJS.split('\n').length} lines
                      </span>
                    </div>
                    <pre className="p-6 text-sm text-green-400 font-mono overflow-x-auto max-h-[600px] overflow-y-auto">
                      <code>
                        {codeView === 'html' ? extractedHTML : codeView === 'css' ? extractedCSS : extractedJS}
                      </code>
                    </pre>
                  </div>
                </div>
              )}

              {/* Assets Tab */}
              {activeTab === 'assets' && (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl text-slate-900">Extracted Assets ({detectedAssets.length})</h3>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center gap-2 transition-colors">
                      <Download className="w-4 h-4" />
                      Download All Assets
                    </button>
                  </div>

                  {/* Asset Summary */}
                  <div className="grid grid-cols-5 gap-4 mb-6">
                    {[
                      { label: 'Images', count: extractedAssetsSummary.images, icon: ImageIcon, color: 'blue' },
                      { label: 'Stylesheets', count: extractedAssetsSummary.css, icon: FileCode, color: 'purple' },
                      { label: 'Scripts', count: extractedAssetsSummary.js, icon: Terminal, color: 'yellow' },
                      { label: 'Fonts', count: extractedAssetsSummary.fonts, icon: FileText, color: 'green' },
                      { label: 'Other', count: extractedAssetsSummary.other, icon: File, color: 'orange' },
                    ].map((asset, i) => (
                      <div key={i} className={`p-4 bg-${asset.color}-50 border border-${asset.color}-200 rounded-xl`}>
                        <div className="flex items-center justify-between mb-2">
                          <asset.icon className={`w-5 h-5 text-${asset.color}-600`} />
                          <span className={`text-2xl text-${asset.color}-900`}>{asset.count}</span>
                        </div>
                        <div className={`text-sm text-${asset.color}-700`}>{asset.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Grouped Assets List */}
                  <div className="space-y-4">
                    {Object.entries(groupedAssets).map(([type, assets]) => {
                      const Icon = getAssetIcon(type);
                      const color = getAssetColor(type);
                      const isExpanded = expandedAssetType === type;

                      return (
                        <div key={type} className="border border-slate-200 rounded-xl overflow-hidden">
                          <button
                            onClick={() => setExpandedAssetType(isExpanded ? null : type)}
                            className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 bg-${color}-100 rounded-lg flex items-center justify-center`}>
                                <Icon className={`w-5 h-5 text-${color}-600`} />
                              </div>
                              <div className="text-left">
                                <h4 className="text-slate-900 capitalize">{type} Files</h4>
                                <p className="text-sm text-slate-500">{assets.length} items</p>
                              </div>
                            </div>
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5 text-slate-400" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-slate-400" />
                            )}
                          </button>

                          {isExpanded && (
                            <div className="border-t border-slate-200">
                              {assets.map((asset, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0"
                                >
                                  <div className="flex items-center gap-3 flex-1">
                                    <div className={`w-8 h-8 bg-${color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                                      <Icon className={`w-4 h-4 text-${color}-600`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2">
                                        <h5 className="text-sm text-slate-900 font-mono truncate">{asset.name}</h5>
                                        {asset.used && (
                                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">Used</span>
                                        )}
                                      </div>
                                      <p className="text-xs text-slate-500 font-mono">{asset.url}</p>
                                    </div>
                                    <span className="text-sm text-slate-500">{asset.size}</span>
                                  </div>
                                  <div className="flex items-center gap-2 ml-4">
                                    <button
                                      onClick={() => downloadAsset(asset)}
                                      className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                                      title="Download"
                                    >
                                      <Download className="w-4 h-4" />
                                    </button>
                                    <button
                                      className="p-2 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors"
                                      title="View"
                                    >
                                      <ExternalLink className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Code Editor Tab */}
              {activeTab === 'editor' && (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl text-slate-900">HTML/CSS Code Editor</h3>
                    <div className="flex gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="Search in code..."
                          className="pl-10 pr-4 py-2 bg-slate-100 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center gap-2 transition-colors">
                        <Save className="w-4 h-4" />
                        Save Changes
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    {/* HTML Editor */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-slate-700 flex items-center gap-2">
                          <FileCode className="w-4 h-4" />
                          HTML
                        </label>
                        <button
                          onClick={() => copyCode(editedHTML, 'HTML')}
                          className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3" />
                          Copy
                        </button>
                      </div>
                      <div className="bg-slate-900 rounded-xl overflow-hidden">
                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 border-b border-slate-700">
                          <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                          </div>
                          <span className="text-xs text-slate-400">index.html</span>
                        </div>
                        <textarea
                          value={editedHTML}
                          onChange={(e) => setEditedHTML(e.target.value)}
                          className="w-full h-[500px] p-4 bg-slate-900 text-green-400 font-mono text-sm resize-none focus:outline-none"
                          spellCheck={false}
                        />
                      </div>
                    </div>

                    {/* CSS Editor */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-slate-700 flex items-center gap-2">
                          <Palette className="w-4 h-4" />
                          CSS
                        </label>
                        <button
                          onClick={() => copyCode(editedCSS, 'CSS')}
                          className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3" />
                          Copy
                        </button>
                      </div>
                      <div className="bg-slate-900 rounded-xl overflow-hidden">
                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 border-b border-slate-700">
                          <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                          </div>
                          <span className="text-xs text-slate-400">styles.css</span>
                        </div>
                        <textarea
                          value={editedCSS}
                          onChange={(e) => setEditedCSS(e.target.value)}
                          className="w-full h-[500px] p-4 bg-slate-900 text-blue-400 font-mono text-sm resize-none focus:outline-none"
                          spellCheck={false}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Editor Features Info */}
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <div className="flex items-start gap-3">
                      <Settings className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm text-blue-900 mb-1">Editor Features</h4>
                        <div className="flex flex-wrap gap-4 text-sm text-blue-700">
                          <span>• Syntax highlighting</span>
                          <span>• Auto-save</span>
                          <span>• Search & replace</span>
                          <span>• Code formatting</span>
                          <span>• Live preview sync</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Color Palette & Quick Actions */}
            <div className="grid grid-cols-3 gap-6 mt-6">
              {/* Extracted Colors */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <h3 className="text-lg text-slate-900 mb-4 flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Color Palette
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#6366F1', '#14B8A6'].map((color, i) => (
                    <div key={i} className="space-y-1">
                      <div 
                        className="h-12 rounded-lg border border-slate-200 cursor-pointer hover:scale-110 transition-transform" 
                        style={{ backgroundColor: color }}
                        title={color}
                      ></div>
                      <div className="text-[10px] text-slate-500 text-center font-mono">{color}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Export Options */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <h3 className="text-lg text-slate-900 mb-4">Export Options</h3>
                <div className="space-y-2">
                  <button className="w-full px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center justify-between transition-colors">
                    <span className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download ZIP
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button className="w-full px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center justify-between transition-colors">
                    <span className="flex items-center gap-2">
                      <Copy className="w-4 h-4" />
                      Copy All Code
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button className="w-full px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center justify-between transition-colors">
                    <span className="flex items-center gap-2">
                      <FileCode className="w-4 h-4" />
                      Export to Template
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Credits Info */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-6">
                <h3 className="text-lg text-slate-900 mb-2 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  Credits Used
                </h3>
                <div className="text-4xl text-blue-900 mb-1">150</div>
                <p className="text-sm text-slate-600">AI credits for this replication</p>
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <p className="text-xs text-slate-500">Remaining: 2,850 credits</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isScanning && !scanned && (
          <div className="bg-white border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Globe className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-2xl text-slate-900 mb-4">Ready to clone any website</h3>
            <p className="text-slate-600 max-w-md mx-auto mb-6">
              Enter any website URL above and our AI will analyze its structure, extract components, styles, and recreate it for you in minutes.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                Extract all sections
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                Preserve styling
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                Get clean code
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                Edit & customize
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Clone to Project Modal */}
      {showCloneModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-2xl text-slate-900">Clone to Project</h2>
              <button 
                onClick={() => setShowCloneModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <CloseIcon className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex gap-4">
                <button
                  onClick={() => setCreateNewProject(false)}
                  className={`flex-1 p-4 border-2 rounded-xl transition-all ${
                    !createNewProject
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <h3 className="text-sm text-slate-900 mb-1">Existing Project</h3>
                  <p className="text-xs text-slate-600">Add to an existing project</p>
                </button>
                <button
                  onClick={() => setCreateNewProject(true)}
                  className={`flex-1 p-4 border-2 rounded-xl transition-all ${
                    createNewProject
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <h3 className="text-sm text-slate-900 mb-1">New Project</h3>
                  <p className="text-xs text-slate-600">Create a new project</p>
                </button>
              </div>

              {!createNewProject ? (
                <div>
                  <label className="block text-sm text-slate-700 mb-3">Select Project</label>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {existingProjects.map((project) => (
                      <button
                        key={project.id}
                        onClick={() => setSelectedProject(project.id)}
                        className={`w-full p-4 border-2 rounded-xl text-left transition-all ${
                          selectedProject === project.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Folder className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm text-slate-900">{project.name}</h4>
                            <p className="text-xs text-slate-500">{project.type} • Modified {project.lastModified}</p>
                          </div>
                          {selectedProject === project.id && (
                            <Check className="w-5 h-5 text-blue-600" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm text-slate-700 mb-3">New Project Name</label>
                  <input
                    type="text"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    placeholder="Enter project name..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <h4 className="text-sm text-blue-900 mb-2">What will be cloned?</h4>
                <div className="space-y-1 text-sm text-blue-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>All HTML, CSS, and JavaScript code</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>{detectedAssets.length} extracted assets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>{detectedSections.length} page sections</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Color palette and typography</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowCloneModal(false)}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCloneToProject}
                disabled={!createNewProject && !selectedProject || createNewProject && !newProjectName}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Package className="w-5 h-5" />
                Clone to Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
