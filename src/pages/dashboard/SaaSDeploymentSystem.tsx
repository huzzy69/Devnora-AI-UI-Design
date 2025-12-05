import React, { useState } from 'react';
import { 
  Rocket, Globe, CheckCircle, XCircle, Clock, AlertCircle, Play, Pause, 
  RotateCcw, GitBranch, Tag, Calendar, Server, Activity, TrendingUp, 
  Download, ExternalLink, Eye, Settings, Bell, Zap, Terminal, FileText,
  Code, Package, Upload, RefreshCw, ChevronRight, ChevronDown, ChevronUp,
  CheckCheck, Loader, Shield, Timer, BarChart3, AlertTriangle, Info,
  Copy, Trash2, Edit2, GitCommit, History, PlayCircle, PauseCircle
} from 'lucide-react';

interface Version {
  id: string;
  version: string;
  label: string;
  status: 'current' | 'previous' | 'archived';
  deployedAt: string;
  deployedBy: string;
  commits: number;
  changes: string[];
  size: string;
  environment: 'production' | 'staging' | 'development';
}

interface DeploymentLog {
  timestamp: string;
  stage: string;
  status: 'success' | 'running' | 'failed' | 'pending';
  message: string;
  duration?: string;
}

interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  action: string;
  enabled: boolean;
  schedule?: string;
  lastRun?: string;
}

export default function SaaSDeploymentSystem() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'versions' | 'monitoring' | 'automation'>('dashboard');
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
  const [showRollbackModal, setShowRollbackModal] = useState(false);
  const [showLogsModal, setShowLogsModal] = useState(false);
  const [showAutomationModal, setShowAutomationModal] = useState(false);
  const [deploymentInProgress, setDeploymentInProgress] = useState(false);
  const [deploymentProgress, setDeploymentProgress] = useState(0);
  const [expandedVersion, setExpandedVersion] = useState<string | null>(null);
  const [selectedEnvironment, setSelectedEnvironment] = useState<'all' | 'production' | 'staging' | 'development'>('all');

  const versions: Version[] = [
    {
      id: 'v_001',
      version: 'v3.2.1',
      label: 'Production Release - Bug Fixes',
      status: 'current',
      deployedAt: '2025-12-04 14:30:00',
      deployedBy: 'john.doe@devnora.com',
      commits: 8,
      changes: [
        'Fixed authentication timeout issue',
        'Improved API response time by 40%',
        'Updated payment gateway integration',
        'Enhanced mobile responsiveness',
      ],
      size: '12.4 MB',
      environment: 'production',
    },
    {
      id: 'v_002',
      version: 'v3.2.0',
      label: 'Major Feature Update',
      status: 'previous',
      deployedAt: '2025-12-02 10:15:00',
      deployedBy: 'sarah.smith@devnora.com',
      commits: 23,
      changes: [
        'Added new dashboard widgets',
        'Implemented real-time notifications',
        'New reporting module',
        'Performance optimizations',
      ],
      size: '11.8 MB',
      environment: 'production',
    },
    {
      id: 'v_003',
      version: 'v3.1.5',
      label: 'Security Patch',
      status: 'previous',
      deployedAt: '2025-11-30 16:45:00',
      deployedBy: 'mike.johnson@devnora.com',
      commits: 5,
      changes: [
        'Security vulnerability fixes',
        'Updated dependencies',
        'Enhanced data encryption',
      ],
      size: '11.6 MB',
      environment: 'production',
    },
    {
      id: 'v_004',
      version: 'v3.1.4',
      label: 'Hotfix - Critical Bug',
      status: 'previous',
      deployedAt: '2025-11-28 09:20:00',
      deployedBy: 'john.doe@devnora.com',
      commits: 2,
      changes: [
        'Fixed critical database connection issue',
        'Resolved memory leak in analytics module',
      ],
      size: '11.5 MB',
      environment: 'production',
    },
    {
      id: 'v_005',
      version: 'v3.1.3',
      label: 'Minor Updates',
      status: 'archived',
      deployedAt: '2025-11-25 11:00:00',
      deployedBy: 'sarah.smith@devnora.com',
      commits: 12,
      changes: [
        'UI/UX improvements',
        'Added new integrations',
        'Performance tweaks',
      ],
      size: '11.3 MB',
      environment: 'production',
    },
    {
      id: 'v_006',
      version: 'v3.3.0-beta',
      label: 'Beta Testing - New Features',
      status: 'current',
      deployedAt: '2025-12-04 08:00:00',
      deployedBy: 'dev.team@devnora.com',
      commits: 45,
      changes: [
        'AI-powered recommendations',
        'Advanced analytics dashboard',
        'Multi-language support',
        'New API endpoints',
      ],
      size: '13.1 MB',
      environment: 'staging',
    },
  ];

  const deploymentLogs: DeploymentLog[] = [
    { timestamp: '14:30:45', stage: 'Initializing', status: 'success', message: 'Deployment started', duration: '2s' },
    { timestamp: '14:30:47', stage: 'Build', status: 'success', message: 'Building application bundle', duration: '45s' },
    { timestamp: '14:31:32', stage: 'Test', status: 'success', message: 'Running automated tests (127 passed)', duration: '18s' },
    { timestamp: '14:31:50', stage: 'Security Scan', status: 'success', message: 'Scanning for vulnerabilities', duration: '12s' },
    { timestamp: '14:32:02', stage: 'Database Migration', status: 'success', message: 'Applying 3 migrations', duration: '8s' },
    { timestamp: '14:32:10', stage: 'Upload', status: 'success', message: 'Uploading to production server', duration: '23s' },
    { timestamp: '14:32:33', stage: 'Health Check', status: 'success', message: 'Verifying deployment health', duration: '5s' },
    { timestamp: '14:32:38', stage: 'Complete', status: 'success', message: 'Deployment successful!', duration: '1m 53s' },
  ];

  const automationRules: AutomationRule[] = [
    {
      id: 'auto_001',
      name: 'Auto-deploy to Staging',
      trigger: 'On commit to main branch',
      action: 'Deploy to staging environment',
      enabled: true,
      lastRun: '2 hours ago',
    },
    {
      id: 'auto_002',
      name: 'Scheduled Production Deploy',
      trigger: 'Every Friday at 6:00 PM',
      action: 'Deploy to production',
      enabled: true,
      schedule: 'Fri 18:00',
      lastRun: '2 days ago',
    },
    {
      id: 'auto_003',
      name: 'Auto-rollback on Error',
      trigger: 'When error rate > 5%',
      action: 'Rollback to previous version',
      enabled: true,
      lastRun: 'Never',
    },
    {
      id: 'auto_004',
      name: 'Nightly Builds',
      trigger: 'Every day at 2:00 AM',
      action: 'Build and test',
      enabled: false,
      schedule: 'Daily 02:00',
      lastRun: '1 day ago',
    },
  ];

  const handleRollback = (versionId: string) => {
    setSelectedVersion(versionId);
    setShowRollbackModal(true);
  };

  const confirmRollback = () => {
    alert(`Rolling back to ${versions.find(v => v.id === selectedVersion)?.version}...`);
    setShowRollbackModal(false);
    setSelectedVersion(null);
  };

  const triggerDeployment = () => {
    setDeploymentInProgress(true);
    setDeploymentProgress(0);
    const interval = setInterval(() => {
      setDeploymentProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setDeploymentInProgress(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const filteredVersions = selectedEnvironment === 'all' 
    ? versions 
    : versions.filter(v => v.environment === selectedEnvironment);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl text-slate-900 mb-2">SaaS Deployment System</h1>
            <p className="text-slate-600">Complete version control, monitoring, and automation</p>
          </div>
          <button 
            onClick={triggerDeployment}
            disabled={deploymentInProgress}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 text-white rounded-xl flex items-center gap-2 transition-all shadow-lg"
          >
            {deploymentInProgress ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Deploying...
              </>
            ) : (
              <>
                <Rocket className="w-5 h-5" />
                Deploy New Version
              </>
            )}
          </button>
        </div>

        {/* Deployment Progress */}
        {deploymentInProgress && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-2xl p-6 mb-6 animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-blue-600 animate-bounce" />
                </div>
                <div>
                  <h3 className="text-lg text-slate-900">Deployment in Progress</h3>
                  <p className="text-sm text-slate-600">Version v3.2.2 → Production</p>
                </div>
              </div>
              <span className="text-2xl text-blue-600">{deploymentProgress}%</span>
            </div>
            <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-500"
                style={{ width: `${deploymentProgress}%` }}
              />
            </div>
            <div className="mt-4 text-sm text-slate-600">
              Current stage: {deploymentProgress < 30 ? 'Building' : deploymentProgress < 60 ? 'Testing' : deploymentProgress < 90 ? 'Deploying' : 'Finalizing'}...
            </div>
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-5 gap-6 mb-8">
          {[
            { label: 'Total Deployments', value: '127', change: '+8 this week', icon: Rocket, color: 'blue' },
            { label: 'Active Versions', value: '6', change: '3 environments', icon: GitBranch, color: 'green' },
            { label: 'Success Rate', value: '99.2%', change: '+0.5% this month', icon: CheckCircle, color: 'purple' },
            { label: 'Avg Deploy Time', value: '2m 15s', change: '-30s faster', icon: Timer, color: 'orange' },
            { label: 'Automation Rules', value: '4', change: '3 active', icon: Zap, color: 'yellow' },
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center mb-4`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <div className="text-3xl text-slate-900 mb-1">{stat.value}</div>
              <div className="text-sm text-slate-600 mb-2">{stat.label}</div>
              <div className="text-xs text-green-600">{stat.change}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-slate-200 bg-white rounded-t-2xl">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'versions', label: 'Version Control', icon: GitBranch },
            { id: 'monitoring', label: 'Live Monitoring', icon: Activity },
            { id: 'automation', label: 'Automation', icon: Zap },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-4 flex items-center gap-2 border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Current Production Version */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-300 rounded-2xl p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl text-slate-900 mb-2">Production: v3.2.1</h3>
                    <p className="text-slate-700 mb-3">Deployed 2 hours ago by john.doe@devnora.com</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm">Live</span>
                      <span className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm">8 commits</span>
                      <span className="px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-sm">12.4 MB</span>
                    </div>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 rounded-lg flex items-center gap-2 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                        View Live
                      </button>
                      <button 
                        onClick={() => setShowLogsModal(true)}
                        className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 rounded-lg flex items-center gap-2 transition-colors"
                      >
                        <Terminal className="w-4 h-4" />
                        View Logs
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-600 mb-2">Health Status</div>
                  <div className="flex items-center gap-2 text-green-600">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-lg">Healthy</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <Upload className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg text-slate-900 mb-2">Deploy to Staging</h3>
                <p className="text-sm text-slate-600 mb-4">Test new features before production</p>
                <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg">
                  Deploy Now
                </button>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                  <RotateCcw className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg text-slate-900 mb-2">Quick Rollback</h3>
                <p className="text-sm text-slate-600 mb-4">Revert to previous stable version</p>
                <button 
                  onClick={() => handleRollback('v_002')}
                  className="w-full px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg"
                >
                  Rollback to v3.2.0
                </button>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <Download className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg text-slate-900 mb-2">Export Package</h3>
                <p className="text-sm text-slate-600 mb-4">Download current production build</p>
                <button className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg">
                  Download ZIP
                </button>
              </div>
            </div>

            {/* Recent Deployment Activity */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-xl text-slate-900">Recent Deployment Activity</h2>
              </div>
              <div className="divide-y divide-slate-200">
                {[
                  { version: 'v3.2.1', status: 'success', env: 'Production', time: '2 hours ago', by: 'john.doe' },
                  { version: 'v3.3.0-beta', status: 'success', env: 'Staging', time: '6 hours ago', by: 'sarah.smith' },
                  { version: 'v3.2.0', status: 'success', env: 'Production', time: '2 days ago', by: 'mike.johnson' },
                  { version: 'v3.1.9', status: 'failed', env: 'Staging', time: '3 days ago', by: 'dev.team' },
                  { version: 'v3.1.8', status: 'success', env: 'Production', time: '5 days ago', by: 'john.doe' },
                ].map((deploy, i) => (
                  <div key={i} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        deploy.status === 'success' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {deploy.status === 'success' ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-900">{deploy.version}</span>
                          <span className="text-slate-400">→</span>
                          <span className="text-sm text-slate-600">{deploy.env}</span>
                        </div>
                        <p className="text-sm text-slate-500">By {deploy.by} • {deploy.time}</p>
                      </div>
                    </div>
                    <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Version Control Tab */}
        {activeTab === 'versions' && (
          <div className="space-y-6">
            {/* Environment Filter */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-600">Filter by environment:</span>
                <div className="flex gap-2">
                  {['all', 'production', 'staging', 'development'].map((env) => (
                    <button
                      key={env}
                      onClick={() => setSelectedEnvironment(env as any)}
                      className={`px-4 py-2 rounded-lg text-sm capitalize transition-colors ${
                        selectedEnvironment === env
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {env}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Version History */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-xl text-slate-900">Version History</h2>
                <p className="text-sm text-slate-600 mt-1">Track and manage all deployment versions</p>
              </div>
              <div className="divide-y divide-slate-200">
                {filteredVersions.map((version) => (
                  <div key={version.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          version.status === 'current' ? 'bg-green-100' :
                          version.status === 'previous' ? 'bg-blue-100' : 'bg-slate-100'
                        }`}>
                          {version.status === 'current' ? (
                            <CheckCircle className="w-6 h-6 text-green-600" />
                          ) : version.status === 'previous' ? (
                            <GitBranch className="w-6 h-6 text-blue-600" />
                          ) : (
                            <Package className="w-6 h-6 text-slate-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl text-slate-900">{version.version}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs ${
                              version.status === 'current' ? 'bg-green-100 text-green-700' :
                              version.status === 'previous' ? 'bg-blue-100 text-blue-700' :
                              'bg-slate-100 text-slate-600'
                            }`}>
                              {version.status === 'current' ? 'Current' : version.status === 'previous' ? 'Previous' : 'Archived'}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs capitalize ${
                              version.environment === 'production' ? 'bg-green-100 text-green-700' :
                              version.environment === 'staging' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>
                              {version.environment}
                            </span>
                          </div>
                          <p className="text-slate-700 mb-3">{version.label}</p>
                          <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {version.deployedAt}
                            </span>
                            <span>•</span>
                            <span>{version.deployedBy}</span>
                            <span>•</span>
                            <span>{version.commits} commits</span>
                            <span>•</span>
                            <span>{version.size}</span>
                          </div>

                          {/* Expandable Changes */}
                          <button
                            onClick={() => setExpandedVersion(expandedVersion === version.id ? null : version.id)}
                            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 mb-3"
                          >
                            {expandedVersion === version.id ? (
                              <>
                                <ChevronUp className="w-4 h-4" />
                                Hide Changes
                              </>
                            ) : (
                              <>
                                <ChevronDown className="w-4 h-4" />
                                Show Changes ({version.changes.length})
                              </>
                            )}
                          </button>

                          {expandedVersion === version.id && (
                            <div className="p-4 bg-slate-50 rounded-xl mb-3">
                              <h4 className="text-sm text-slate-700 mb-2">Changes in this version:</h4>
                              <ul className="space-y-2">
                                {version.changes.map((change, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                    <ChevronRight className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                    {change}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Actions */}
                          <div className="flex items-center gap-2">
                            {version.status !== 'current' && (
                              <button 
                                onClick={() => handleRollback(version.id)}
                                className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg flex items-center gap-2 transition-colors"
                              >
                                <RotateCcw className="w-4 h-4" />
                                Rollback to This Version
                              </button>
                            )}
                            <button className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg flex items-center gap-2 transition-colors">
                              <Download className="w-4 h-4" />
                              Download
                            </button>
                            <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center gap-2 transition-colors">
                              <Code className="w-4 h-4" />
                              View Code
                            </button>
                            <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center gap-2 transition-colors">
                              <GitCommit className="w-4 h-4" />
                              Compare
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Monitoring Tab */}
        {activeTab === 'monitoring' && (
          <div className="space-y-6">
            {/* Real-time Status */}
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg text-slate-900">Server Status</h3>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div className="text-3xl text-green-600 mb-2">Online</div>
                <p className="text-sm text-slate-600">Uptime: 99.98%</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg text-slate-900">Response Time</h3>
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-3xl text-blue-600 mb-2">124ms</div>
                <p className="text-sm text-green-600">-15ms from average</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg text-slate-900">Active Users</h3>
                  <Activity className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-3xl text-purple-600 mb-2">1,234</div>
                <p className="text-sm text-green-600">+12% from yesterday</p>
              </div>
            </div>

            {/* Deployment Logs */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h2 className="text-xl text-slate-900">Deployment Logs</h2>
                  <p className="text-sm text-slate-600 mt-1">Real-time deployment progress and status</p>
                </div>
                <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </button>
              </div>
              <div className="bg-slate-900 p-6 max-h-96 overflow-y-auto">
                <div className="space-y-2 font-mono text-sm">
                  {deploymentLogs.map((log, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <span className="text-slate-500 flex-shrink-0">[{log.timestamp}]</span>
                      <div className="flex items-center gap-2 flex-shrink-0 w-32">
                        {log.status === 'success' && <CheckCircle className="w-4 h-4 text-green-400" />}
                        {log.status === 'running' && <Loader className="w-4 h-4 text-blue-400 animate-spin" />}
                        {log.status === 'failed' && <XCircle className="w-4 h-4 text-red-400" />}
                        {log.status === 'pending' && <Clock className="w-4 h-4 text-slate-400" />}
                        <span className={`${
                          log.status === 'success' ? 'text-green-400' :
                          log.status === 'running' ? 'text-blue-400' :
                          log.status === 'failed' ? 'text-red-400' :
                          'text-slate-400'
                        }`}>
                          {log.stage}
                        </span>
                      </div>
                      <span className="text-slate-300 flex-1">{log.message}</span>
                      {log.duration && <span className="text-slate-500 flex-shrink-0">{log.duration}</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Health Metrics */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h3 className="text-lg text-slate-900 mb-6">Health Metrics</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">CPU Usage</span>
                    <span className="text-sm text-slate-900">45%</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">Memory Usage</span>
                    <span className="text-sm text-slate-900">62%</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-600 rounded-full" style={{ width: '62%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">Disk Usage</span>
                    <span className="text-sm text-slate-900">38%</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-600 rounded-full" style={{ width: '38%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">Network I/O</span>
                    <span className="text-sm text-slate-900">28%</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-600 rounded-full" style={{ width: '28%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Alert Notifications */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-xl text-slate-900">Recent Alerts & Notifications</h2>
              </div>
              <div className="divide-y divide-slate-200">
                {[
                  { type: 'success', title: 'Deployment Successful', message: 'v3.2.1 deployed to production', time: '2 hours ago' },
                  { type: 'info', title: 'Scheduled Maintenance', message: 'Database backup completed', time: '5 hours ago' },
                  { type: 'warning', title: 'High Traffic Detected', message: 'Response time increased by 20%', time: '1 day ago' },
                ].map((alert, i) => (
                  <div key={i} className="p-4 flex items-start gap-4 hover:bg-slate-50 transition-colors">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      alert.type === 'success' ? 'bg-green-100' :
                      alert.type === 'warning' ? 'bg-yellow-100' :
                      'bg-blue-100'
                    }`}>
                      {alert.type === 'success' && <CheckCircle className="w-5 h-5 text-green-600" />}
                      {alert.type === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-600" />}
                      {alert.type === 'info' && <Info className="w-5 h-5 text-blue-600" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-slate-900 mb-1">{alert.title}</h4>
                      <p className="text-sm text-slate-600 mb-1">{alert.message}</p>
                      <span className="text-xs text-slate-500">{alert.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Automation Tab */}
        {activeTab === 'automation' && (
          <div className="space-y-6">
            {/* Create Automation Button */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl text-slate-900 mb-2">Deployment Automation</h3>
                  <p className="text-slate-600">Create automated deployment workflows and schedules</p>
                </div>
                <button 
                  onClick={() => setShowAutomationModal(true)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl flex items-center gap-2 transition-colors"
                >
                  <Zap className="w-5 h-5" />
                  Create Rule
                </button>
              </div>
            </div>

            {/* Automation Rules */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-xl text-slate-900">Automation Rules</h2>
                <p className="text-sm text-slate-600 mt-1">Manage automated deployment triggers and actions</p>
              </div>
              <div className="divide-y divide-slate-200">
                {automationRules.map((rule) => (
                  <div key={rule.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          rule.enabled ? 'bg-green-100' : 'bg-slate-100'
                        }`}>
                          {rule.enabled ? (
                            <PlayCircle className="w-6 h-6 text-green-600" />
                          ) : (
                            <PauseCircle className="w-6 h-6 text-slate-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg text-slate-900">{rule.name}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs ${
                              rule.enabled ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {rule.enabled ? 'Active' : 'Paused'}
                            </span>
                          </div>
                          <div className="space-y-2 mb-3">
                            <div className="flex items-center gap-2 text-sm text-slate-700">
                              <span className="text-slate-500">Trigger:</span>
                              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">{rule.trigger}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-700">
                              <span className="text-slate-500">Action:</span>
                              <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">{rule.action}</span>
                            </div>
                            {rule.schedule && (
                              <div className="flex items-center gap-2 text-sm text-slate-700">
                                <span className="text-slate-500">Schedule:</span>
                                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded">{rule.schedule}</span>
                              </div>
                            )}
                            {rule.lastRun && (
                              <div className="text-sm text-slate-500">
                                Last run: {rule.lastRun}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg flex items-center gap-2 transition-colors">
                              <Edit2 className="w-4 h-4" />
                              Edit Rule
                            </button>
                            <button className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                              rule.enabled
                                ? 'bg-orange-100 hover:bg-orange-200 text-orange-700'
                                : 'bg-green-100 hover:bg-green-200 text-green-700'
                            }`}>
                              {rule.enabled ? (
                                <>
                                  <Pause className="w-4 h-4" />
                                  Pause
                                </>
                              ) : (
                                <>
                                  <Play className="w-4 h-4" />
                                  Enable
                                </>
                              )}
                            </button>
                            <button className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg flex items-center gap-2 transition-colors">
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scheduled Deployments */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-xl text-slate-900">Scheduled Deployments</h2>
                <p className="text-sm text-slate-600 mt-1">Upcoming automated deployments</p>
              </div>
              <div className="divide-y divide-slate-200">
                {[
                  { version: 'v3.2.2', env: 'Production', scheduled: 'Friday, 6:00 PM', status: 'pending' },
                  { version: 'v3.3.0-beta', env: 'Staging', scheduled: 'Daily, 2:00 AM', status: 'recurring' },
                ].map((scheduled, i) => (
                  <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="text-slate-900">{scheduled.version} → {scheduled.env}</h4>
                        <p className="text-sm text-slate-600">{scheduled.scheduled}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        scheduled.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {scheduled.status === 'pending' ? 'Pending' : 'Recurring'}
                      </span>
                      <button className="text-sm text-red-600 hover:text-red-700">Cancel</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Rollback Confirmation Modal */}
      {showRollbackModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-2xl text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
                Confirm Rollback
              </h2>
            </div>
            <div className="p-6">
              <p className="text-slate-700 mb-4">
                Are you sure you want to rollback to{' '}
                <strong>{versions.find(v => v.id === selectedVersion)?.version}</strong>?
              </p>
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl mb-6">
                <h4 className="text-sm text-orange-900 mb-2">⚠️ Important:</h4>
                <ul className="text-sm text-orange-800 space-y-1">
                  <li>• Current production version will be replaced</li>
                  <li>• This action can be reverted if needed</li>
                  <li>• Users may experience a brief downtime</li>
                  <li>• Recent changes will be lost</li>
                </ul>
              </div>
            </div>
            <div className="p-6 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowRollbackModal(false)}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmRollback}
                className="px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-xl transition-colors flex items-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Confirm Rollback
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Deployment Logs Modal */}
      {showLogsModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-2xl text-slate-900 flex items-center gap-2">
                <Terminal className="w-6 h-6" />
                Deployment Logs
              </h2>
              <button 
                onClick={() => setShowLogsModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <XCircle className="w-5 h-5 text-slate-600" />
              </button>
            </div>
            <div className="bg-slate-900 p-6 max-h-96 overflow-y-auto">
              <div className="space-y-2 font-mono text-sm">
                {deploymentLogs.map((log, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="text-slate-500 flex-shrink-0">[{log.timestamp}]</span>
                    <div className="flex items-center gap-2 flex-shrink-0 w-32">
                      {log.status === 'success' && <CheckCircle className="w-4 h-4 text-green-400" />}
                      {log.status === 'running' && <Loader className="w-4 h-4 text-blue-400 animate-spin" />}
                      {log.status === 'failed' && <XCircle className="w-4 h-4 text-red-400" />}
                      <span className={`${
                        log.status === 'success' ? 'text-green-400' :
                        log.status === 'running' ? 'text-blue-400' :
                        'text-red-400'
                      }`}>
                        {log.stage}
                      </span>
                    </div>
                    <span className="text-slate-300 flex-1">{log.message}</span>
                    {log.duration && <span className="text-slate-500 flex-shrink-0">{log.duration}</span>}
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 border-t border-slate-200 flex items-center justify-end gap-3">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Logs
              </button>
              <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center gap-2">
                <Copy className="w-4 h-4" />
                Copy to Clipboard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Automation Modal */}
      {showAutomationModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-2xl text-slate-900 flex items-center gap-2">
                <Zap className="w-6 h-6 text-blue-600" />
                Create Automation Rule
              </h2>
              <button 
                onClick={() => setShowAutomationModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <XCircle className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Rule Name */}
              <div>
                <label className="block text-sm text-slate-700 mb-2">Rule Name *</label>
                <input
                  type="text"
                  placeholder="e.g., Auto-deploy to Production"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Trigger Selection */}
              <div>
                <label className="block text-sm text-slate-700 mb-3">Trigger Event</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'commit', label: 'On Git Commit', desc: 'Trigger when code is committed', icon: GitCommit },
                    { id: 'schedule', label: 'Scheduled', desc: 'Run on specific schedule', icon: Calendar },
                    { id: 'manual', label: 'Manual Trigger', desc: 'Run manually when needed', icon: Play },
                    { id: 'error', label: 'On Error', desc: 'Trigger when errors occur', icon: AlertTriangle },
                  ].map((trigger) => (
                    <button
                      key={trigger.id}
                      className="p-4 border-2 border-slate-200 hover:border-blue-500 rounded-xl text-left transition-all"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <trigger.icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-sm text-slate-900">{trigger.label}</span>
                      </div>
                      <p className="text-xs text-slate-600">{trigger.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Schedule Input (conditional) */}
              <div>
                <label className="block text-sm text-slate-700 mb-2">Schedule (optional)</label>
                <select className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Select schedule...</option>
                  <option>Every day at midnight</option>
                  <option>Every weekday at 6 PM</option>
                  <option>Every Friday at 6 PM</option>
                  <option>Every Monday at 9 AM</option>
                  <option>Custom schedule...</option>
                </select>
              </div>

              {/* Action Selection */}
              <div>
                <label className="block text-sm text-slate-700 mb-3">Action to Perform</label>
                <div className="space-y-2">
                  {[
                    { id: 'deploy-prod', label: 'Deploy to Production', color: 'green' },
                    { id: 'deploy-staging', label: 'Deploy to Staging', color: 'blue' },
                    { id: 'rollback', label: 'Rollback to Previous Version', color: 'orange' },
                    { id: 'build', label: 'Build and Test Only', color: 'purple' },
                  ].map((action) => (
                    <button
                      key={action.id}
                      className={`w-full p-3 border-2 border-slate-200 hover:border-${action.color}-500 rounded-lg text-left transition-all flex items-center justify-between`}
                    >
                      <span className="text-sm text-slate-900">{action.label}</span>
                      <div className={`w-5 h-5 rounded border-2 border-${action.color}-500`}></div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Environment Selection */}
              <div>
                <label className="block text-sm text-slate-700 mb-2">Target Environment *</label>
                <select className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Select environment...</option>
                  <option>Production</option>
                  <option>Staging</option>
                  <option>Development</option>
                </select>
              </div>

              {/* Notifications */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-blue-600" />
                  <div>
                    <span className="text-sm text-slate-900">Send email notifications</span>
                    <p className="text-xs text-slate-600">Get notified when this rule executes</p>
                  </div>
                </label>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowAutomationModal(false)}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Automation rule created successfully!');
                  setShowAutomationModal(false);
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl transition-all flex items-center gap-2"
              >
                <Zap className="w-5 h-5" />
                Create Rule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
