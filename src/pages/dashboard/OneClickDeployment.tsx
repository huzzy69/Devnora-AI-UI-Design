import React, { useState } from 'react';
import {
  Rocket, Cloud, Server, Globe, Settings, CheckCircle, Loader,
  AlertCircle, ExternalLink, Copy, Shield, Zap, HardDrive, MapPin,
  Check, X, ChevronRight, Clock, TrendingUp, Activity, Box,
  Database, Lock, RefreshCw, Upload, Download, Terminal, Play,
  Pause, BarChart3, Users, FileCode, Package, Layers, GitBranch
} from 'lucide-react';

interface HostingProvider {
  id: string;
  name: string;
  icon: string;
  description: string;
  features: string[];
  recommended?: boolean;
  color: string;
}

interface Deployment {
  id: string;
  projectName: string;
  provider: string;
  domain: string;
  status: 'deploying' | 'success' | 'failed' | 'cancelled';
  progress: number;
  startTime: Date;
  endTime?: Date;
  logs: string[];
}

interface DeploymentConfig {
  projectName: string;
  provider: string;
  domain: string;
  subdomain: string;
  region: string;
  phpVersion: string;
  enableSSL: boolean;
  enableCDN: boolean;
  enableBackup: boolean;
  autoScaling: boolean;
}

export default function OneClickDeployment() {
  const [activeTab, setActiveTab] = useState<'deploy' | 'configure' | 'history'>('deploy');
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [isDeploying, setIsDeploying] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [currentDeployment, setCurrentDeployment] = useState<Deployment | null>(null);

  const [config, setConfig] = useState<DeploymentConfig>({
    projectName: 'my-saas-app',
    provider: '',
    domain: '',
    subdomain: '',
    region: 'us-east-1',
    phpVersion: '8.2',
    enableSSL: true,
    enableCDN: false,
    enableBackup: true,
    autoScaling: false,
  });

  const hostingProviders: HostingProvider[] = [
    {
      id: 'hostinger',
      name: 'Hostinger',
      icon: '🚀',
      description: 'Fast & affordable PHP shared hosting',
      features: ['PHP 8.2 Support', 'Free SSL', 'Daily Backups', '99.9% Uptime'],
      recommended: true,
      color: 'from-purple-600 to-pink-600'
    },
    {
      id: 'bluehost',
      name: 'Bluehost',
      icon: '🔵',
      description: 'Reliable WordPress & PHP hosting',
      features: ['cPanel Access', 'Free Domain', '24/7 Support', 'Easy Setup'],
      color: 'from-blue-600 to-cyan-600'
    },
    {
      id: 'aws',
      name: 'AWS (Amazon)',
      icon: '☁️',
      description: 'Enterprise cloud infrastructure',
      features: ['Auto Scaling', 'Global CDN', 'Load Balancing', 'S3 Storage'],
      color: 'from-orange-600 to-yellow-600'
    },
    {
      id: 'vercel',
      name: 'Vercel',
      icon: '▲',
      description: 'Optimized for frontend frameworks',
      features: ['Edge Network', 'Instant Deployment', 'Preview URLs', 'Analytics'],
      color: 'from-slate-700 to-slate-900'
    },
    {
      id: 'netlify',
      name: 'Netlify',
      icon: '🌐',
      description: 'Modern web hosting platform',
      features: ['Git Integration', 'Serverless Functions', 'Form Handling', 'A/B Testing'],
      color: 'from-teal-600 to-emerald-600'
    },
    {
      id: 'heroku',
      name: 'Heroku',
      icon: '💜',
      description: 'Platform as a Service (PaaS)',
      features: ['Easy Deployment', 'Add-ons', 'CLI Tools', 'Multi-language'],
      color: 'from-purple-600 to-violet-600'
    },
    {
      id: 'digitalocean',
      name: 'DigitalOcean',
      icon: '🌊',
      description: 'Developer-friendly cloud hosting',
      features: ['Droplets', 'Kubernetes', 'Managed Databases', 'Spaces CDN'],
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'cloudways',
      name: 'Cloudways',
      icon: '☁️',
      description: 'Managed cloud hosting platform',
      features: ['Managed Services', 'Team Collaboration', 'Staging', 'Monitoring'],
      color: 'from-cyan-600 to-blue-600'
    }
  ];

  const regions = [
    { id: 'us-east-1', name: 'US East (N. Virginia)', flag: '🇺🇸' },
    { id: 'us-west-1', name: 'US West (California)', flag: '🇺🇸' },
    { id: 'eu-west-1', name: 'EU West (Ireland)', flag: '🇪🇺' },
    { id: 'eu-central-1', name: 'EU Central (Frankfurt)', flag: '🇩🇪' },
    { id: 'ap-south-1', name: 'Asia Pacific (Mumbai)', flag: '🇮🇳' },
    { id: 'ap-southeast-1', name: 'Asia Pacific (Singapore)', flag: '🇸🇬' },
  ];

  const phpVersions = ['8.2', '8.1', '8.0', '7.4'];

  // Sample deployment history
  const deploymentHistory: Deployment[] = [
    {
      id: 'dep-1',
      projectName: 'My SaaS App',
      provider: 'Hostinger',
      domain: 'myapp.devnora.com',
      status: 'success',
      progress: 100,
      startTime: new Date('2024-12-04T10:30:00'),
      endTime: new Date('2024-12-04T10:32:15'),
      logs: ['Build completed', 'Files uploaded', 'SSL configured', 'Deployment successful']
    },
    {
      id: 'dep-2',
      projectName: 'E-commerce Store',
      provider: 'AWS',
      domain: 'store.mycompany.com',
      status: 'success',
      progress: 100,
      startTime: new Date('2024-12-03T15:20:00'),
      endTime: new Date('2024-12-03T15:25:30'),
      logs: ['Infrastructure provisioned', 'Application deployed', 'Load balancer configured']
    },
    {
      id: 'dep-3',
      projectName: 'Portfolio Site',
      provider: 'Vercel',
      domain: 'portfolio.dev',
      status: 'failed',
      progress: 45,
      startTime: new Date('2024-12-02T09:15:00'),
      logs: ['Build started', 'Error: Missing environment variables']
    },
  ];

  const handleDeploy = () => {
    if (!selectedProvider || !config.domain) {
      alert('Please select a hosting provider and enter a domain name');
      return;
    }

    setIsDeploying(true);
    const deployment: Deployment = {
      id: `dep-${Date.now()}`,
      projectName: config.projectName,
      provider: hostingProviders.find(p => p.id === selectedProvider)?.name || '',
      domain: config.subdomain ? `${config.subdomain}.${config.domain}` : config.domain,
      status: 'deploying',
      progress: 0,
      startTime: new Date(),
      logs: []
    };

    setCurrentDeployment(deployment);

    // Simulate deployment progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setIsDeploying(false);
        setCurrentDeployment({
          ...deployment,
          status: 'success',
          progress: 100,
          endTime: new Date(),
          logs: [
            '✓ Project built successfully',
            '✓ Files uploaded to server',
            '✓ SSL certificate installed',
            '✓ Domain configured',
            '✓ Deployment completed!'
          ]
        });
      } else {
        setCurrentDeployment({
          ...deployment,
          progress: Math.min(progress, 100),
          logs: [
            progress > 10 ? '✓ Building project...' : '⏳ Building project...',
            progress > 30 ? '✓ Uploading files...' : progress > 10 ? '⏳ Uploading files...' : '',
            progress > 60 ? '✓ Configuring server...' : progress > 30 ? '⏳ Configuring server...' : '',
            progress > 80 ? '✓ Installing SSL...' : progress > 60 ? '⏳ Installing SSL...' : '',
          ].filter(Boolean)
        });
      }
    }, 500);
  };

  const getStatusColor = (status: Deployment['status']) => {
    switch (status) {
      case 'success':
        return 'text-green-600 bg-green-100';
      case 'deploying':
        return 'text-blue-600 bg-blue-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      case 'cancelled':
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: Deployment['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'deploying':
        return <Loader className="w-5 h-5 text-blue-600 animate-spin" />;
      case 'failed':
        return <X className="w-5 h-5 text-red-600" />;
      case 'cancelled':
        return <X className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl text-slate-900">One-Click Deployment</h1>
            <p className="text-slate-600">Deploy your applications to any hosting provider instantly</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Rocket className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="text-2xl text-slate-900 mb-1">24</div>
          <div className="text-sm text-slate-600">Total Deployments</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-xs text-green-600">96%</span>
          </div>
          <div className="text-2xl text-slate-900 mb-1">23</div>
          <div className="text-sm text-slate-600">Successful</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="text-2xl text-slate-900 mb-1">2m 15s</div>
          <div className="text-sm text-slate-600">Avg. Deploy Time</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Server className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="text-2xl text-slate-900 mb-1">8</div>
          <div className="text-sm text-slate-600">Active Sites</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('deploy')}
          className={`px-6 py-3 border-b-2 transition-all ${
            activeTab === 'deploy'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <Rocket className="w-5 h-5" />
            Deploy Now
          </div>
        </button>
        <button
          onClick={() => setActiveTab('configure')}
          className={`px-6 py-3 border-b-2 transition-all ${
            activeTab === 'configure'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Configuration
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
            Deployment History
          </div>
        </button>
      </div>

      {/* Deploy Tab */}
      {activeTab === 'deploy' && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Provider Selection */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h3 className="text-xl text-slate-900 mb-4 flex items-center gap-2">
                <Cloud className="w-5 h-5 text-blue-600" />
                Select Hosting Provider
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {hostingProviders.map((provider) => (
                  <button
                    key={provider.id}
                    onClick={() => {
                      setSelectedProvider(provider.id);
                      setConfig({ ...config, provider: provider.id });
                    }}
                    className={`relative p-6 rounded-xl border-2 transition-all text-left ${
                      selectedProvider === provider.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    {provider.recommended && (
                      <div className="absolute -top-2 -right-2 px-3 py-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs rounded-full">
                        Recommended
                      </div>
                    )}
                    
                    <div className="flex items-start gap-3 mb-3">
                      <div className="text-3xl">{provider.icon}</div>
                      <div className="flex-1">
                        <h4 className="text-lg text-slate-900 mb-1">{provider.name}</h4>
                        <p className="text-sm text-slate-600">{provider.description}</p>
                      </div>
                      {selectedProvider === provider.id && (
                        <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                      )}
                    </div>

                    <div className="space-y-1.5">
                      {provider.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                          <Check className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Configuration */}
            {selectedProvider && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <h3 className="text-xl text-slate-900 mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-600" />
                  Quick Configuration
                </h3>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-700 mb-2">Project Name *</label>
                      <input
                        type="text"
                        value={config.projectName}
                        onChange={(e) => setConfig({ ...config, projectName: e.target.value })}
                        placeholder="my-saas-app"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-slate-700 mb-2">Domain Name *</label>
                      <input
                        type="text"
                        value={config.domain}
                        onChange={(e) => setConfig({ ...config, domain: e.target.value })}
                        placeholder="example.com"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-slate-700 mb-2">Subdomain (Optional)</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={config.subdomain}
                        onChange={(e) => setConfig({ ...config, subdomain: e.target.value })}
                        placeholder="app"
                        className="flex-1 px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-blue-500"
                      />
                      <div className="flex items-center px-4 py-3 bg-slate-100 border border-slate-300 rounded-xl text-slate-600">
                        .{config.domain || 'example.com'}
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-700 mb-2">Server Region</label>
                      <select
                        value={config.region}
                        onChange={(e) => setConfig({ ...config, region: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-blue-500"
                      >
                        {regions.map((region) => (
                          <option key={region.id} value={region.id}>
                            {region.flag} {region.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm text-slate-700 mb-2">PHP Version</label>
                      <select
                        value={config.phpVersion}
                        onChange={(e) => setConfig({ ...config, phpVersion: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-blue-500"
                      >
                        {phpVersions.map((version) => (
                          <option key={version} value={version}>
                            PHP {version}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Lock className="w-5 h-5 text-slate-600" />
                        <div>
                          <div className="text-sm text-slate-900">Enable SSL</div>
                          <div className="text-xs text-slate-600">Free Let's Encrypt certificate</div>
                        </div>
                      </div>
                      <button
                        onClick={() => setConfig({ ...config, enableSSL: !config.enableSSL })}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          config.enableSSL ? 'bg-blue-600' : 'bg-slate-300'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          config.enableSSL ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Database className="w-5 h-5 text-slate-600" />
                        <div>
                          <div className="text-sm text-slate-900">Auto Backup</div>
                          <div className="text-xs text-slate-600">Daily automated backups</div>
                        </div>
                      </div>
                      <button
                        onClick={() => setConfig({ ...config, enableBackup: !config.enableBackup })}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          config.enableBackup ? 'bg-blue-600' : 'bg-slate-300'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          config.enableBackup ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Deployment Progress */}
            {currentDeployment && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl text-slate-900 flex items-center gap-2">
                    {getStatusIcon(currentDeployment.status)}
                    Deployment Status
                  </h3>
                  <span className={`px-3 py-1 rounded-lg text-xs ${getStatusColor(currentDeployment.status)}`}>
                    {currentDeployment.status === 'deploying' ? 'Deploying...' : currentDeployment.status.charAt(0).toUpperCase() + currentDeployment.status.slice(1)}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600">Progress</span>
                    <span className="text-slate-900">{Math.round(currentDeployment.progress)}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${currentDeployment.progress}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Project:</span>
                    <span className="text-slate-900">{currentDeployment.projectName}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Provider:</span>
                    <span className="text-slate-900">{currentDeployment.provider}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Domain:</span>
                    <span className="text-slate-900">{currentDeployment.domain}</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowLogs(!showLogs)}
                  className="w-full mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
                >
                  <Terminal className="w-4 h-4" />
                  {showLogs ? 'Hide' : 'Show'} Deployment Logs
                </button>

                {showLogs && (
                  <div className="mt-4 p-4 bg-slate-900 rounded-xl">
                    <div className="space-y-1">
                      {currentDeployment.logs.map((log, idx) => (
                        <div key={idx} className="text-sm text-green-400 font-mono">
                          {log}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentDeployment.status === 'success' && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="text-sm text-green-900 mb-1">Deployment Successful!</h4>
                        <p className="text-xs text-green-700 mb-3">
                          Your application is now live at: <strong>{currentDeployment.domain}</strong>
                        </p>
                        <a
                          href={`https://${currentDeployment.domain}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors text-sm"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Visit Site
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Deploy Button & Info */}
          <div className="space-y-6">
            {/* Deploy Button */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h3 className="text-lg text-slate-900 mb-4">Ready to Deploy?</h3>
              <button
                onClick={handleDeploy}
                disabled={!selectedProvider || !config.domain || isDeploying}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-3"
              >
                {isDeploying ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Deploying...
                  </>
                ) : (
                  <>
                    <Rocket className="w-5 h-5" />
                    Deploy to Hosting
                  </>
                )}
              </button>
              <p className="text-xs text-slate-600 text-center">
                Estimated deployment time: 2-3 minutes
              </p>
            </div>

            {/* What Happens */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="text-lg text-slate-900 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-600" />
                What Happens Next?
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">
                    1
                  </div>
                  <div>
                    <div className="text-sm text-slate-900 mb-1">Build Project</div>
                    <div className="text-xs text-slate-600">Compile and optimize your application</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">
                    2
                  </div>
                  <div>
                    <div className="text-sm text-slate-900 mb-1">Upload Files</div>
                    <div className="text-xs text-slate-600">Transfer files to hosting server</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">
                    3
                  </div>
                  <div>
                    <div className="text-sm text-slate-900 mb-1">Configure Server</div>
                    <div className="text-xs text-slate-600">Set up environment and database</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">
                    4
                  </div>
                  <div>
                    <div className="text-sm text-slate-900 mb-1">Install SSL</div>
                    <div className="text-xs text-slate-600">Enable HTTPS for your domain</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">
                    ✓
                  </div>
                  <div>
                    <div className="text-sm text-slate-900 mb-1">Go Live!</div>
                    <div className="text-xs text-slate-600">Your site is now accessible</div>
                  </div>
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
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Valid domain name</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Hosting account credentials</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>DNS access (for SSL setup)</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Active internet connection</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Configure Tab */}
      {activeTab === 'configure' && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h3 className="text-xl text-slate-900 mb-6">Advanced Configuration</h3>
            
            <div className="space-y-6">
              {/* Performance Settings */}
              <div>
                <h4 className="text-lg text-slate-900 mb-4">Performance Settings</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-slate-600" />
                      <div>
                        <div className="text-sm text-slate-900">Enable CDN</div>
                        <div className="text-xs text-slate-600">Content delivery network for faster loading</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setConfig({ ...config, enableCDN: !config.enableCDN })}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        config.enableCDN ? 'bg-blue-600' : 'bg-slate-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        config.enableCDN ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-slate-600" />
                      <div>
                        <div className="text-sm text-slate-900">Auto Scaling</div>
                        <div className="text-xs text-slate-600">Automatically scale based on traffic</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setConfig({ ...config, autoScaling: !config.autoScaling })}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        config.autoScaling ? 'bg-blue-600' : 'bg-slate-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        config.autoScaling ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Environment Variables */}
              <div>
                <h4 className="text-lg text-slate-900 mb-4">Environment Variables</h4>
                <div className="space-y-3">
                  <div className="grid md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Variable name"
                      className="px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Variable value"
                      className="px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-blue-500"
                    />
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors text-sm">
                    <Plus className="w-4 h-4" />
                    Add Variable
                  </button>
                </div>
              </div>

              {/* Database Configuration */}
              <div>
                <h4 className="text-lg text-slate-900 mb-4">Database Configuration</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Database name"
                    className="px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Database username"
                    className="px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-blue-500"
                  />
                  <input
                    type="password"
                    placeholder="Database password"
                    className="px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Database host"
                    className="px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl transition-all">
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h3 className="text-xl text-slate-900">Deployment History</h3>
            </div>
            <div className="divide-y divide-slate-200">
              {deploymentHistory.map((deployment) => (
                <div key={deployment.id} className="p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        {getStatusIcon(deployment.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg text-slate-900">{deployment.projectName}</h4>
                          <span className={`px-3 py-1 rounded-lg text-xs ${getStatusColor(deployment.status)}`}>
                            {deployment.status.charAt(0).toUpperCase() + deployment.status.slice(1)}
                          </span>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-600 mb-3">
                          <div className="flex items-center gap-2">
                            <Server className="w-4 h-4" />
                            {deployment.provider}
                          </div>
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4" />
                            {deployment.domain}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {deployment.startTime.toLocaleString()}
                          </div>
                        </div>

                        {deployment.status === 'success' && (
                          <div className="flex items-center gap-2">
                            <a
                              href={`https://${deployment.domain}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors text-sm"
                            >
                              <ExternalLink className="w-4 h-4" />
                              Visit Site
                            </a>
                            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors text-sm">
                              <RefreshCw className="w-4 h-4" />
                              Redeploy
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
        </div>
      )}
    </div>
  );
}
