import React, { useState } from 'react';
import {
  Smartphone, Globe, Download, Eye, Settings, Image, Palette, Play,
  Check, AlertCircle, Loader, RefreshCw, Upload, X, ChevronDown,
  Monitor, Tablet, Zap, Package, FileCode, Apple, Chrome, Shield,
  Bell, Camera, Mic, MapPin, Share2, Star, Sparkles, Code, Box,
  Layers, Copy, ExternalLink, ArrowRight, CheckCircle2, Clock,
  TrendingUp, Users, BarChart3, Wifi, Battery, Signal
} from 'lucide-react';

interface AppConfig {
  websiteUrl: string;
  appName: string;
  packageName: string;
  appIcon: File | null;
  splashScreen: File | null;
  primaryColor: string;
  accentColor: string;
  orientation: 'portrait' | 'landscape' | 'both';
  enableNotifications: boolean;
  enableCamera: boolean;
  enableLocation: boolean;
  enableOfflineMode: boolean;
}

interface GeneratedApp {
  id: string;
  name: string;
  platform: 'android' | 'ios' | 'both';
  status: 'processing' | 'completed' | 'failed';
  progress: number;
  downloadUrl?: string;
  createdAt: Date;
  size?: string;
}

export default function WebsiteToMobileApp() {
  const [activeTab, setActiveTab] = useState<'convert' | 'preview' | 'history'>('convert');
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'tablet'>('mobile');
  const [previewUrl, setPreviewUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);

  const [config, setConfig] = useState<AppConfig>({
    websiteUrl: '',
    appName: '',
    packageName: '',
    appIcon: null,
    splashScreen: null,
    primaryColor: '#3B82F6',
    accentColor: '#10B981',
    orientation: 'portrait',
    enableNotifications: true,
    enableCamera: false,
    enableLocation: false,
    enableOfflineMode: true,
  });

  // Sample generated apps history
  const [generatedApps] = useState<GeneratedApp[]>([
    {
      id: 'app-1',
      name: 'My Business App',
      platform: 'both',
      status: 'completed',
      progress: 100,
      downloadUrl: '#',
      createdAt: new Date('2024-12-03'),
      size: '24.5 MB'
    },
    {
      id: 'app-2',
      name: 'Portfolio Mobile',
      platform: 'android',
      status: 'completed',
      progress: 100,
      downloadUrl: '#',
      createdAt: new Date('2024-11-28'),
      size: '18.2 MB'
    },
    {
      id: 'app-3',
      name: 'E-Commerce App',
      platform: 'ios',
      status: 'processing',
      progress: 67,
      createdAt: new Date('2024-12-04'),
    },
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'icon' | 'splash') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'icon') {
        setConfig({ ...config, appIcon: file });
      } else {
        setConfig({ ...config, splashScreen: file });
      }
    }
  };

  const handlePreview = () => {
    if (config.websiteUrl) {
      setPreviewUrl(config.websiteUrl);
      setActiveTab('preview');
    }
  };

  const handleGenerateApp = (platform: 'android' | 'ios' | 'both') => {
    setIsGenerating(true);
    setGenerationProgress(0);

    // Simulate app generation progress
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          alert(`${platform.toUpperCase()} app generated successfully! Check the History tab to download.`);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const getStatusColor = (status: GeneratedApp['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'processing':
        return 'text-blue-600 bg-blue-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
            <Smartphone className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl text-slate-900">Website to Mobile App</h1>
            <p className="text-slate-600">Convert your website into native Android & iOS apps instantly</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="text-2xl text-slate-900 mb-1">12</div>
          <div className="text-sm text-slate-600">Apps Generated</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Download className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-xs text-green-600">+24%</span>
          </div>
          <div className="text-2xl text-slate-900 mb-1">1,234</div>
          <div className="text-sm text-slate-600">Total Downloads</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Chrome className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="text-2xl text-slate-900 mb-1">8</div>
          <div className="text-sm text-slate-600">Android Apps</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Apple className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="text-2xl text-slate-900 mb-1">4</div>
          <div className="text-sm text-slate-600">iOS Apps</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('convert')}
          className={`px-6 py-3 border-b-2 transition-all ${
            activeTab === 'convert'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Convert Website
          </div>
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`px-6 py-3 border-b-2 transition-all ${
            activeTab === 'preview'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Preview App
          </div>
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-6 py-3 border-b-2 transition-all ${
            activeTab === 'history'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            History & Downloads
          </div>
        </button>
      </div>

      {/* Convert Tab */}
      {activeTab === 'convert' && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Configuration Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Website URL */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h3 className="text-xl text-slate-900 mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                Website URL
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-700 mb-2">Enter your website URL *</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="url"
                      value={config.websiteUrl}
                      onChange={(e) => setConfig({ ...config, websiteUrl: e.target.value })}
                      placeholder="https://example.com"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-blue-500"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-2">The URL of the website you want to convert into a mobile app</p>
                </div>

                <button
                  onClick={handlePreview}
                  disabled={!config.websiteUrl}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Eye className="w-4 h-4" />
                  Preview Website
                </button>
              </div>
            </div>

            {/* App Information */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h3 className="text-xl text-slate-900 mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-600" />
                App Information
              </h3>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-700 mb-2">App Name *</label>
                    <input
                      type="text"
                      value={config.appName}
                      onChange={(e) => setConfig({ ...config, appName: e.target.value })}
                      placeholder="My Awesome App"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-slate-700 mb-2">Package Name *</label>
                    <input
                      type="text"
                      value={config.packageName}
                      onChange={(e) => setConfig({ ...config, packageName: e.target.value })}
                      placeholder="com.mycompany.app"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-700 mb-2">Orientation</label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['portrait', 'landscape', 'both'] as const).map((orientation) => (
                      <button
                        key={orientation}
                        onClick={() => setConfig({ ...config, orientation })}
                        className={`px-4 py-3 rounded-xl border-2 transition-all ${
                          config.orientation === orientation
                            ? 'border-blue-600 bg-blue-50 text-blue-900'
                            : 'border-slate-300 text-slate-700 hover:border-slate-400'
                        }`}
                      >
                        {orientation.charAt(0).toUpperCase() + orientation.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* App Assets */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h3 className="text-xl text-slate-900 mb-4 flex items-center gap-2">
                <Image className="w-5 h-5 text-blue-600" />
                App Assets
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {/* App Icon */}
                <div>
                  <label className="block text-sm text-slate-700 mb-2">App Icon (1024x1024)</label>
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'icon')}
                      className="hidden"
                      id="icon-upload"
                    />
                    <label htmlFor="icon-upload" className="cursor-pointer">
                      {config.appIcon ? (
                        <div className="flex flex-col items-center gap-2">
                          <CheckCircle2 className="w-8 h-8 text-green-600" />
                          <span className="text-sm text-slate-900">{config.appIcon.name}</span>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                          <div className="text-sm text-slate-900 mb-1">Upload Icon</div>
                          <div className="text-xs text-slate-600">PNG or JPG</div>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                {/* Splash Screen */}
                <div>
                  <label className="block text-sm text-slate-700 mb-2">Splash Screen (1242x2688)</label>
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'splash')}
                      className="hidden"
                      id="splash-upload"
                    />
                    <label htmlFor="splash-upload" className="cursor-pointer">
                      {config.splashScreen ? (
                        <div className="flex flex-col items-center gap-2">
                          <CheckCircle2 className="w-8 h-8 text-green-600" />
                          <span className="text-sm text-slate-900">{config.splashScreen.name}</span>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                          <div className="text-sm text-slate-900 mb-1">Upload Splash</div>
                          <div className="text-xs text-slate-600">PNG or JPG</div>
                        </>
                      )}
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Color Customization */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h3 className="text-xl text-slate-900 mb-4 flex items-center gap-2">
                <Palette className="w-5 h-5 text-blue-600" />
                Color Theme
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-700 mb-2">Primary Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={config.primaryColor}
                      onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                      className="w-16 h-12 rounded-lg cursor-pointer border border-slate-300"
                    />
                    <input
                      type="text"
                      value={config.primaryColor}
                      onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                      className="flex-1 px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-700 mb-2">Accent Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={config.accentColor}
                      onChange={(e) => setConfig({ ...config, accentColor: e.target.value })}
                      className="w-16 h-12 rounded-lg cursor-pointer border border-slate-300"
                    />
                    <input
                      type="text"
                      value={config.accentColor}
                      onChange={(e) => setConfig({ ...config, accentColor: e.target.value })}
                      className="flex-1 px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Settings */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <button
                onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                className="w-full flex items-center justify-between mb-4"
              >
                <h3 className="text-xl text-slate-900 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-blue-600" />
                  Advanced Settings
                </h3>
                <ChevronDown className={`w-5 h-5 text-slate-600 transition-transform ${showAdvancedSettings ? 'rotate-180' : ''}`} />
              </button>

              {showAdvancedSettings && (
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-slate-600" />
                      <div>
                        <div className="text-sm text-slate-900">Push Notifications</div>
                        <div className="text-xs text-slate-600">Enable push notification support</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setConfig({ ...config, enableNotifications: !config.enableNotifications })}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        config.enableNotifications ? 'bg-blue-600' : 'bg-slate-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        config.enableNotifications ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Camera className="w-5 h-5 text-slate-600" />
                      <div>
                        <div className="text-sm text-slate-900">Camera Access</div>
                        <div className="text-xs text-slate-600">Allow camera usage in app</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setConfig({ ...config, enableCamera: !config.enableCamera })}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        config.enableCamera ? 'bg-blue-600' : 'bg-slate-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        config.enableCamera ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-slate-600" />
                      <div>
                        <div className="text-sm text-slate-900">Location Services</div>
                        <div className="text-xs text-slate-600">Enable GPS location tracking</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setConfig({ ...config, enableLocation: !config.enableLocation })}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        config.enableLocation ? 'bg-blue-600' : 'bg-slate-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        config.enableLocation ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Wifi className="w-5 h-5 text-slate-600" />
                      <div>
                        <div className="text-sm text-slate-900">Offline Mode</div>
                        <div className="text-xs text-slate-600">Cache content for offline access</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setConfig({ ...config, enableOfflineMode: !config.enableOfflineMode })}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        config.enableOfflineMode ? 'bg-blue-600' : 'bg-slate-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        config.enableOfflineMode ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions & Info */}
          <div className="space-y-6">
            {/* Generation Progress */}
            {isGenerating && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Loader className="w-5 h-5 text-blue-600 animate-spin" />
                  <h3 className="text-lg text-slate-900">Generating App...</h3>
                </div>
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Progress</span>
                    <span className="text-slate-900">{generationProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all"
                      style={{ width: `${generationProgress}%` }}
                    />
                  </div>
                </div>
                <p className="text-xs text-slate-600">This may take a few minutes...</p>
              </div>
            )}

            {/* Generate Buttons */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h3 className="text-lg text-slate-900 mb-4">Generate Mobile App</h3>
              <div className="space-y-3">
                <button
                  onClick={() => handleGenerateApp('android')}
                  disabled={!config.websiteUrl || !config.appName || isGenerating}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Chrome className="w-5 h-5" />
                  Generate Android APK
                </button>

                <button
                  onClick={() => handleGenerateApp('ios')}
                  disabled={!config.websiteUrl || !config.appName || isGenerating}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-600 hover:to-slate-800 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Apple className="w-5 h-5" />
                  Generate iOS IPA
                </button>

                <button
                  onClick={() => handleGenerateApp('both')}
                  disabled={!config.websiteUrl || !config.appName || isGenerating}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Sparkles className="w-5 h-5" />
                  Generate Both Platforms
                </button>
              </div>
            </div>

            {/* Features Info */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="text-lg text-slate-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                What's Included
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">Native Android APK & iOS IPA files</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">Custom app icon & splash screen</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">Offline caching support</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">Push notification ready</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">App Store ready package</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">Source code included</span>
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h3 className="text-lg text-slate-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                Requirements
              </h3>
              <div className="space-y-2 text-sm text-slate-600">
                <p>• Website must be publicly accessible</p>
                <p>• HTTPS connection required for iOS</p>
                <p>• App icon: 1024x1024px PNG/JPG</p>
                <p>• Splash screen: 1242x2688px PNG/JPG</p>
                <p>• Package name must be unique</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Tab */}
      {activeTab === 'preview' && (
        <div className="space-y-6">
          {/* Preview Controls */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl text-slate-900">Mobile App Preview</h3>
              <div className="flex items-center gap-3">
                <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
                  <button
                    onClick={() => setPreviewDevice('mobile')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      previewDevice === 'mobile'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4" />
                      Mobile
                    </div>
                  </button>
                  <button
                    onClick={() => setPreviewDevice('tablet')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      previewDevice === 'tablet'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Tablet className="w-4 h-4" />
                      Tablet
                    </div>
                  </button>
                </div>
                <button
                  onClick={handlePreview}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </button>
              </div>
            </div>

            <div className="bg-slate-100 rounded-2xl p-8 flex items-center justify-center min-h-[600px]">
              {/* Device Frame */}
              <div className={`bg-slate-900 rounded-3xl p-3 shadow-2xl ${
                previewDevice === 'mobile' ? 'w-[375px]' : 'w-[768px]'
              }`}>
                {/* Status Bar */}
                <div className="bg-slate-800 rounded-t-2xl px-6 py-2 flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-1">
                    <span>9:41</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Signal className="w-3 h-3" />
                    <Wifi className="w-3 h-3" />
                    <Battery className="w-4 h-3" />
                  </div>
                </div>

                {/* App Bar */}
                <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    {config.appIcon ? (
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg" />
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <Smartphone className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <span className="text-sm text-slate-900">{config.appName || 'My App'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                      <Share2 className="w-4 h-4 text-slate-600" />
                    </button>
                    <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                      <RefreshCw className="w-4 h-4 text-slate-600" />
                    </button>
                  </div>
                </div>

                {/* Preview Content */}
                <div className={`bg-white overflow-hidden ${
                  previewDevice === 'mobile' ? 'h-[667px]' : 'h-[900px]'
                }`}>
                  {previewUrl ? (
                    <iframe
                      src={previewUrl}
                      className="w-full h-full border-0"
                      title="App Preview"
                    />
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                      <Eye className="w-16 h-16 text-slate-300 mb-4" />
                      <h3 className="text-lg text-slate-900 mb-2">No Preview Available</h3>
                      <p className="text-sm text-slate-600 mb-4">
                        Enter a website URL and click "Preview Website" to see how it will look in the app
                      </p>
                      <button
                        onClick={() => setActiveTab('convert')}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                      >
                        Go to Convert Tab
                      </button>
                    </div>
                  )}
                </div>

                {/* Bottom Bar */}
                <div className="bg-white rounded-b-2xl px-4 py-2 border-t border-slate-200">
                  <div className="flex items-center justify-center">
                    <div className="w-32 h-1 bg-slate-300 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm text-slate-900 mb-1">Interactive Preview</h4>
                  <p className="text-xs text-slate-600">
                    This preview shows exactly how your website will appear and function within the mobile app. 
                    You can interact with all elements just like in the actual app.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h3 className="text-xl text-slate-900">Generated Apps</h3>
            </div>
            <div className="divide-y divide-slate-200">
              {generatedApps.map((app) => (
                <div key={app.id} className="p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Smartphone className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg text-slate-900">{app.name}</h4>
                          <span className={`px-3 py-1 rounded-lg text-xs ${getStatusColor(app.status)}`}>
                            {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {app.createdAt.toLocaleDateString()}
                          </div>
                          {app.size && (
                            <div className="flex items-center gap-1">
                              <Package className="w-4 h-4" />
                              {app.size}
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            {app.platform === 'both' ? (
                              <>
                                <Chrome className="w-4 h-4" />
                                <Apple className="w-4 h-4" />
                                <span>Android & iOS</span>
                              </>
                            ) : app.platform === 'android' ? (
                              <>
                                <Chrome className="w-4 h-4" />
                                <span>Android</span>
                              </>
                            ) : (
                              <>
                                <Apple className="w-4 h-4" />
                                <span>iOS</span>
                              </>
                            )}
                          </div>
                        </div>

                        {app.status === 'processing' && (
                          <div className="mb-3">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-slate-600">Building app...</span>
                              <span className="text-slate-900">{app.progress}%</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-1.5">
                              <div
                                className="bg-blue-600 h-1.5 rounded-full transition-all"
                                style={{ width: `${app.progress}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {app.status === 'completed' && (
                          <div className="flex items-center gap-2">
                            {(app.platform === 'android' || app.platform === 'both') && (
                              <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors text-sm">
                                <Download className="w-4 h-4" />
                                Download APK
                              </button>
                            )}
                            {(app.platform === 'ios' || app.platform === 'both') && (
                              <button className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm">
                                <Download className="w-4 h-4" />
                                Download IPA
                              </button>
                            )}
                            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors text-sm">
                              <Code className="w-4 h-4" />
                              View Source
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Empty State */}
          {generatedApps.length === 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
              <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl text-slate-900 mb-2">No Apps Generated Yet</h3>
              <p className="text-slate-600 mb-6">Start by converting your first website into a mobile app</p>
              <button
                onClick={() => setActiveTab('convert')}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl transition-all inline-flex items-center gap-2"
              >
                <Zap className="w-5 h-5" />
                Convert Your First Website
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
