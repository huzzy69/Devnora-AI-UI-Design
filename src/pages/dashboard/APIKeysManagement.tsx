import React, { useState } from 'react';
import { 
  Key, Plus, Copy, RefreshCw, Trash2, Eye, EyeOff, BarChart3, Shield, Clock, 
  CheckCircle, XCircle, Settings, Globe, Lock, TrendingUp, AlertCircle, Edit2,
  Save, X as CloseIcon, ChevronDown, ChevronUp, Activity, Zap, Download
} from 'lucide-react';

interface APIKey {
  id: string;
  name: string;
  key: string;
  status: 'active' | 'inactive';
  created: string;
  lastUsed: string;
  requests: number;
  role: 'read-only' | 'write' | 'admin' | 'custom';
  rateLimit: {
    requestsPerMinute: number;
    requestsPerHour: number;
    requestsPerDay: number;
  };
  scopes: string[];
  domainRestrictions: string[];
  ipRestrictions: string[];
  usageStats: {
    today: number;
    thisWeek: number;
    thisMonth: number;
    errors: number;
  };
}

export default function APIKeysManagement() {
  const [showKey, setShowKey] = useState<any>({});
  const [activeTab, setActiveTab] = useState('keys');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedKey, setSelectedKey] = useState<APIKey | null>(null);
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  // New Key Form State
  const [newKeyForm, setNewKeyForm] = useState({
    name: '',
    role: 'read-only' as 'read-only' | 'write' | 'admin' | 'custom',
    scopes: [] as string[],
    rateLimitMinute: 60,
    rateLimitHour: 1000,
    rateLimitDay: 10000,
    domains: [] as string[],
    ips: [] as string[],
    domainInput: '',
    ipInput: '',
  });

  const [apiKeys, setApiKeys] = useState<APIKey[]>([
    {
      id: 'key_001',
      name: 'Production API',
      key: 'dvn_prod_4f8a9b2c3d1e5f6g7h8i9j0k1l2m3n4o',
      status: 'active',
      created: '2025-01-15',
      lastUsed: '2 minutes ago',
      requests: 145892,
      role: 'admin',
      rateLimit: {
        requestsPerMinute: 100,
        requestsPerHour: 5000,
        requestsPerDay: 50000,
      },
      scopes: ['read', 'write', 'delete', 'admin'],
      domainRestrictions: ['devnora.com', 'app.devnora.com'],
      ipRestrictions: ['192.168.1.100', '10.0.0.0/24'],
      usageStats: {
        today: 8945,
        thisWeek: 45892,
        thisMonth: 145892,
        errors: 124,
      },
    },
    {
      id: 'key_002',
      name: 'Development API',
      key: 'dvn_dev_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
      status: 'active',
      created: '2025-01-10',
      lastUsed: '1 hour ago',
      requests: 23456,
      role: 'write',
      rateLimit: {
        requestsPerMinute: 60,
        requestsPerHour: 1000,
        requestsPerDay: 10000,
      },
      scopes: ['read', 'write'],
      domainRestrictions: ['localhost:3000', 'dev.devnora.com'],
      ipRestrictions: [],
      usageStats: {
        today: 1234,
        thisWeek: 5678,
        thisMonth: 23456,
        errors: 45,
      },
    },
    {
      id: 'key_003',
      name: 'Analytics Read-Only',
      key: 'dvn_ro_z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5',
      status: 'active',
      created: '2025-02-01',
      lastUsed: '5 hours ago',
      requests: 8934,
      role: 'read-only',
      rateLimit: {
        requestsPerMinute: 30,
        requestsPerHour: 500,
        requestsPerDay: 5000,
      },
      scopes: ['read'],
      domainRestrictions: ['analytics.devnora.com'],
      ipRestrictions: ['203.0.113.0/24'],
      usageStats: {
        today: 567,
        thisWeek: 2345,
        thisMonth: 8934,
        errors: 12,
      },
    },
  ]);

  const usageData = [
    { date: '2025-11-26', requests: 8920, errors: 12, successRate: 99.87 },
    { date: '2025-11-27', requests: 12450, errors: 8, successRate: 99.94 },
    { date: '2025-11-28', requests: 15670, errors: 15, successRate: 99.90 },
    { date: '2025-11-29', requests: 18230, errors: 21, successRate: 99.88 },
    { date: '2025-11-30', requests: 21340, errors: 10, successRate: 99.95 },
    { date: '2025-12-01', requests: 19560, errors: 7, successRate: 99.96 },
    { date: '2025-12-02', requests: 22150, errors: 18, successRate: 99.92 },
  ];

  const roleOptions = [
    { value: 'read-only', label: 'Read Only', description: 'View data only, no modifications', color: 'blue' },
    { value: 'write', label: 'Write', description: 'Read and create/update data', color: 'green' },
    { value: 'admin', label: 'Admin', description: 'Full access including delete', color: 'purple' },
    { value: 'custom', label: 'Custom', description: 'Select specific scopes', color: 'orange' },
  ];

  const availableScopes = [
    'read', 'write', 'delete', 'admin', 'users.read', 'users.write',
    'projects.read', 'projects.write', 'templates.read', 'templates.write',
    'analytics.read', 'billing.read', 'billing.write'
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('API key copied to clipboard!');
  };

  const handleCreateKey = () => {
    const newKey: APIKey = {
      id: `key_${Date.now()}`,
      name: newKeyForm.name,
      key: `dvn_${newKeyForm.role}_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      status: 'active',
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
      requests: 0,
      role: newKeyForm.role,
      rateLimit: {
        requestsPerMinute: newKeyForm.rateLimitMinute,
        requestsPerHour: newKeyForm.rateLimitHour,
        requestsPerDay: newKeyForm.rateLimitDay,
      },
      scopes: newKeyForm.scopes,
      domainRestrictions: newKeyForm.domains,
      ipRestrictions: newKeyForm.ips,
      usageStats: {
        today: 0,
        thisWeek: 0,
        thisMonth: 0,
        errors: 0,
      },
    };

    setApiKeys([...apiKeys, newKey]);
    setShowCreateModal(false);
    setNewKeyForm({
      name: '',
      role: 'read-only',
      scopes: [],
      rateLimitMinute: 60,
      rateLimitHour: 1000,
      rateLimitDay: 10000,
      domains: [],
      ips: [],
      domainInput: '',
      ipInput: '',
    });
  };

  const handleDeleteKey = (id: string) => {
    if (confirm('Are you sure you want to delete this API key? This action cannot be undone.')) {
      setApiKeys(apiKeys.filter(k => k.id !== id));
    }
  };

  const addDomain = () => {
    if (newKeyForm.domainInput && !newKeyForm.domains.includes(newKeyForm.domainInput)) {
      setNewKeyForm({
        ...newKeyForm,
        domains: [...newKeyForm.domains, newKeyForm.domainInput],
        domainInput: '',
      });
    }
  };

  const removeDomain = (domain: string) => {
    setNewKeyForm({
      ...newKeyForm,
      domains: newKeyForm.domains.filter(d => d !== domain),
    });
  };

  const addIP = () => {
    if (newKeyForm.ipInput && !newKeyForm.ips.includes(newKeyForm.ipInput)) {
      setNewKeyForm({
        ...newKeyForm,
        ips: [...newKeyForm.ips, newKeyForm.ipInput],
        ipInput: '',
      });
    }
  };

  const removeIP = (ip: string) => {
    setNewKeyForm({
      ...newKeyForm,
      ips: newKeyForm.ips.filter(i => i !== ip),
    });
  };

  const toggleScope = (scope: string) => {
    if (newKeyForm.scopes.includes(scope)) {
      setNewKeyForm({
        ...newKeyForm,
        scopes: newKeyForm.scopes.filter(s => s !== scope),
      });
    } else {
      setNewKeyForm({
        ...newKeyForm,
        scopes: [...newKeyForm.scopes, scope],
      });
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'read-only': return 'blue';
      case 'write': return 'green';
      case 'admin': return 'purple';
      case 'custom': return 'orange';
      default: return 'slate';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2 text-slate-900">Developer API Keys</h1>
            <p className="text-slate-600">Manage API keys with advanced rate limiting, roles, and restrictions</p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl flex items-center gap-2 transition-all shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            Create API Key
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Key className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xs text-slate-500">Total</span>
            </div>
            <div className="text-3xl text-slate-900 mb-1">{apiKeys.length}</div>
            <div className="text-sm text-slate-600">Active API Keys</div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-xs text-slate-500">30 days</span>
            </div>
            <div className="text-3xl text-slate-900 mb-1">
              {apiKeys.reduce((acc, key) => acc + key.usageStats.thisMonth, 0).toLocaleString()}
            </div>
            <div className="text-sm text-slate-600">Total Requests</div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-xs text-slate-500">Today</span>
            </div>
            <div className="text-3xl text-slate-900 mb-1">
              {apiKeys.reduce((acc, key) => acc + key.usageStats.today, 0).toLocaleString()}
            </div>
            <div className="text-sm text-slate-600">Requests Today</div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <span className="text-xs text-slate-500">Error rate</span>
            </div>
            <div className="text-3xl text-slate-900 mb-1">
              {apiKeys.reduce((acc, key) => acc + key.usageStats.errors, 0)}
            </div>
            <div className="text-sm text-slate-600">Total Errors</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-slate-200 bg-white rounded-t-2xl">
          {[
            { id: 'keys', label: 'API Keys', icon: Key },
            { id: 'analytics', label: 'Usage Analytics', icon: BarChart3 },
            { id: 'roles', label: 'Role Management', icon: Shield },
            { id: 'restrictions', label: 'Security', icon: Lock },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
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

        {/* API Keys Tab */}
        {activeTab === 'keys' && (
          <div className="space-y-4">
            {apiKeys.map((apiKey) => (
              <div key={apiKey.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                {/* Key Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl text-slate-900">{apiKey.name}</h3>
                        <span className={`px-3 py-1 bg-${getRoleColor(apiKey.role)}-100 text-${getRoleColor(apiKey.role)}-700 rounded-full text-xs capitalize`}>
                          {apiKey.role}
                        </span>
                        {apiKey.status === 'active' ? (
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Active
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-slate-200 text-slate-600 rounded-full text-xs flex items-center gap-1">
                            <XCircle className="w-3 h-3" />
                            Inactive
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-slate-500">
                        Created: {apiKey.created} • Last used: {apiKey.lastUsed}
                      </div>
                    </div>
                  </div>

                  {/* API Key Display */}
                  <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 mb-4">
                    <div className="flex items-center gap-3">
                      <Key className="w-5 h-5 text-slate-400 flex-shrink-0" />
                      <code className="flex-1 text-sm text-green-400 font-mono">
                        {showKey[apiKey.id] ? apiKey.key : '•'.repeat(apiKey.key.length)}
                      </code>
                      <button
                        onClick={() => setShowKey({ ...showKey, [apiKey.id]: !showKey[apiKey.id] })}
                        className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                      >
                        {showKey[apiKey.id] ? (
                          <EyeOff className="w-5 h-5 text-slate-400" />
                        ) : (
                          <Eye className="w-5 h-5 text-slate-400" />
                        )}
                      </button>
                      <button
                        onClick={() => copyToClipboard(apiKey.key)}
                        className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                      >
                        <Copy className="w-5 h-5 text-blue-400" />
                      </button>
                    </div>
                  </div>

                  {/* Quick Stats Grid */}
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                      <div className="text-xs text-blue-600 mb-1">Total Requests</div>
                      <div className="text-2xl text-blue-900">{apiKey.requests.toLocaleString()}</div>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                      <div className="text-xs text-green-600 mb-1">Today</div>
                      <div className="text-2xl text-green-900">{apiKey.usageStats.today.toLocaleString()}</div>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                      <div className="text-xs text-purple-600 mb-1">This Week</div>
                      <div className="text-2xl text-purple-900">{apiKey.usageStats.thisWeek.toLocaleString()}</div>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                      <div className="text-xs text-orange-600 mb-1">Errors</div>
                      <div className="text-2xl text-orange-900">{apiKey.usageStats.errors}</div>
                    </div>
                  </div>

                  {/* Rate Limits */}
                  <div className="mb-4">
                    <h4 className="text-sm text-slate-600 mb-3 flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Rate Limits
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                        <div className="text-xs text-slate-500 mb-1">Per Minute</div>
                        <div className="text-lg text-slate-900">{apiKey.rateLimit.requestsPerMinute}</div>
                        <div className="text-xs text-slate-400">requests/min</div>
                      </div>
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                        <div className="text-xs text-slate-500 mb-1">Per Hour</div>
                        <div className="text-lg text-slate-900">{apiKey.rateLimit.requestsPerHour.toLocaleString()}</div>
                        <div className="text-xs text-slate-400">requests/hr</div>
                      </div>
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                        <div className="text-xs text-slate-500 mb-1">Per Day</div>
                        <div className="text-lg text-slate-900">{apiKey.rateLimit.requestsPerDay.toLocaleString()}</div>
                        <div className="text-xs text-slate-400">requests/day</div>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Details */}
                  <button
                    onClick={() => setExpandedKey(expandedKey === apiKey.id ? null : apiKey.id)}
                    className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors mb-4"
                  >
                    <span className="text-sm text-slate-700">
                      {expandedKey === apiKey.id ? 'Hide' : 'Show'} Detailed Configuration
                    </span>
                    {expandedKey === apiKey.id ? (
                      <ChevronUp className="w-5 h-5 text-slate-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-500" />
                    )}
                  </button>

                  {/* Expanded Details */}
                  {expandedKey === apiKey.id && (
                    <div className="space-y-4 mb-4 p-4 bg-slate-50 rounded-xl">
                      {/* Scopes */}
                      <div>
                        <h4 className="text-sm text-slate-600 mb-2 flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          Permissions & Scopes
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {apiKey.scopes.map((scope) => (
                            <span key={scope} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                              {scope}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Domain Restrictions */}
                      <div>
                        <h4 className="text-sm text-slate-600 mb-2 flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          Allowed Domains
                        </h4>
                        {apiKey.domainRestrictions.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {apiKey.domainRestrictions.map((domain) => (
                              <span key={domain} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-mono">
                                {domain}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-slate-500 italic">No domain restrictions (all domains allowed)</p>
                        )}
                      </div>

                      {/* IP Restrictions */}
                      <div>
                        <h4 className="text-sm text-slate-600 mb-2 flex items-center gap-2">
                          <Lock className="w-4 h-4" />
                          Allowed IP Addresses
                        </h4>
                        {apiKey.ipRestrictions.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {apiKey.ipRestrictions.map((ip) => (
                              <span key={ip} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-mono">
                                {ip}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-slate-500 italic">No IP restrictions (all IPs allowed)</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center gap-2 transition-colors">
                      <Edit2 className="w-4 h-4" />
                      Edit Configuration
                    </button>
                    <button className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg flex items-center gap-2 transition-colors">
                      <RefreshCw className="w-4 h-4" />
                      Regenerate Key
                    </button>
                    <button 
                      onClick={() => handleDeleteKey(apiKey.id)}
                      className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg flex items-center gap-2 transition-colors ml-auto"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {apiKeys.length === 0 && (
              <div className="bg-white border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Key className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-xl text-slate-900 mb-2">No API Keys Yet</h3>
                <p className="text-slate-600 mb-6">Create your first API key to get started with the Devnora AI API</p>
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl inline-flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Create Your First API Key
                </button>
              </div>
            )}
          </div>
        )}

        {/* Usage Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h3 className="text-xl text-slate-900 mb-6">Usage Analytics (Last 7 Days)</h3>
            
            {/* Chart Placeholder */}
            <div className="mb-8">
              <div className="h-80 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-slate-200">
                {usageData.map((day, idx) => (
                  <div key={idx} className="flex items-center gap-4 mb-3">
                    <div className="w-24 text-sm text-slate-600">{day.date}</div>
                    <div className="flex-1 h-8 bg-slate-200 rounded-lg overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-end px-3 text-white text-sm"
                        style={{ width: `${(day.requests / 25000) * 100}%` }}
                      >
                        {day.requests.toLocaleString()}
                      </div>
                    </div>
                    <div className="w-20 text-sm text-slate-600">{day.successRate}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Per-Key Analytics */}
            <h3 className="text-lg text-slate-900 mb-4">Per-Key Analytics</h3>
            <div className="space-y-4">
              {apiKeys.map((key) => (
                <div key={key.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-sm text-slate-900">{key.name}</h4>
                      <p className="text-xs text-slate-500">{key.id}</p>
                    </div>
                    <span className={`px-3 py-1 bg-${getRoleColor(key.role)}-100 text-${getRoleColor(key.role)}-700 rounded-full text-xs`}>
                      {key.role}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-3">
                    <div className="p-3 bg-white rounded-lg">
                      <div className="text-xs text-slate-500 mb-1">Today</div>
                      <div className="text-lg text-slate-900">{key.usageStats.today.toLocaleString()}</div>
                    </div>
                    <div className="p-3 bg-white rounded-lg">
                      <div className="text-xs text-slate-500 mb-1">This Week</div>
                      <div className="text-lg text-slate-900">{key.usageStats.thisWeek.toLocaleString()}</div>
                    </div>
                    <div className="p-3 bg-white rounded-lg">
                      <div className="text-xs text-slate-500 mb-1">This Month</div>
                      <div className="text-lg text-slate-900">{key.usageStats.thisMonth.toLocaleString()}</div>
                    </div>
                    <div className="p-3 bg-white rounded-lg">
                      <div className="text-xs text-slate-500 mb-1">Errors</div>
                      <div className="text-lg text-red-600">{key.usageStats.errors}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Role Management Tab */}
        {activeTab === 'roles' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h3 className="text-xl text-slate-900 mb-6">API Key Roles & Permissions</h3>
            
            <div className="grid grid-cols-2 gap-6">
              {roleOptions.map((role) => (
                <div key={role.value} className={`p-6 bg-gradient-to-br from-${role.color}-50 to-${role.color}-100 border-2 border-${role.color}-200 rounded-2xl`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-12 h-12 bg-${role.color}-200 rounded-xl flex items-center justify-center`}>
                      <Shield className={`w-6 h-6 text-${role.color}-700`} />
                    </div>
                    <div>
                      <h4 className={`text-lg text-${role.color}-900`}>{role.label}</h4>
                      <p className={`text-sm text-${role.color}-700`}>
                        {apiKeys.filter(k => k.role === role.value).length} keys
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 mb-4">{role.description}</p>
                  
                  {role.value === 'read-only' && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Read data and resources</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <XCircle className="w-4 h-4" />
                        <span>Create or update resources</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <XCircle className="w-4 h-4" />
                        <span>Delete resources</span>
                      </div>
                    </div>
                  )}

                  {role.value === 'write' && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Read data and resources</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Create or update resources</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <XCircle className="w-4 h-4" />
                        <span>Delete resources</span>
                      </div>
                    </div>
                  )}

                  {role.value === 'admin' && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Read data and resources</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Create or update resources</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Delete resources</span>
                      </div>
                    </div>
                  )}

                  {role.value === 'custom' && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <Settings className="w-4 h-4 text-orange-600" />
                        <span>Custom scope selection</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <Settings className="w-4 h-4 text-orange-600" />
                        <span>Granular permissions</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Security & Restrictions Tab */}
        {activeTab === 'restrictions' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h3 className="text-xl text-slate-900 mb-6">Security & Access Restrictions</h3>
            
            <div className="space-y-6">
              {apiKeys.map((key) => (
                <div key={key.id} className="p-6 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg text-slate-900">{key.name}</h4>
                      <p className="text-sm text-slate-500">{key.id}</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm">
                      Edit Restrictions
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    {/* Domain Restrictions */}
                    <div className="p-4 bg-white rounded-lg">
                      <h5 className="text-sm text-slate-700 mb-3 flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        Domain Restrictions
                      </h5>
                      {key.domainRestrictions.length > 0 ? (
                        <div className="space-y-2">
                          {key.domainRestrictions.map((domain) => (
                            <div key={domain} className="px-3 py-2 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700 font-mono flex items-center justify-between">
                              {domain}
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-700 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          No restrictions - All domains allowed
                        </div>
                      )}
                    </div>

                    {/* IP Restrictions */}
                    <div className="p-4 bg-white rounded-lg">
                      <h5 className="text-sm text-slate-700 mb-3 flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        IP Address Restrictions
                      </h5>
                      {key.ipRestrictions.length > 0 ? (
                        <div className="space-y-2">
                          {key.ipRestrictions.map((ip) => (
                            <div key={ip} className="px-3 py-2 bg-purple-50 border border-purple-200 rounded-lg text-sm text-purple-700 font-mono flex items-center justify-between">
                              {ip}
                              <CheckCircle className="w-4 h-4 text-purple-600" />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-700 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          No restrictions - All IPs allowed
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Create API Key Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-2xl text-slate-900">Create New API Key</h2>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <CloseIcon className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div>
                <label className="block text-sm text-slate-700 mb-2">API Key Name *</label>
                <input
                  type="text"
                  value={newKeyForm.name}
                  onChange={(e) => setNewKeyForm({ ...newKeyForm, name: e.target.value })}
                  placeholder="e.g., Production API, Development Key"
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-sm text-slate-700 mb-3">Role *</label>
                <div className="grid grid-cols-2 gap-3">
                  {roleOptions.map((role) => (
                    <button
                      key={role.value}
                      onClick={() => setNewKeyForm({ ...newKeyForm, role: role.value as any })}
                      className={`p-4 border-2 rounded-xl text-left transition-all ${
                        newKeyForm.role === role.value
                          ? `border-${role.color}-500 bg-${role.color}-50`
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className={`w-5 h-5 ${newKeyForm.role === role.value ? `text-${role.color}-600` : 'text-slate-400'}`} />
                        <span className="text-sm text-slate-900">{role.label}</span>
                      </div>
                      <p className="text-xs text-slate-600">{role.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Scopes (if custom role) */}
              {newKeyForm.role === 'custom' && (
                <div>
                  <label className="block text-sm text-slate-700 mb-3">Select Scopes</label>
                  <div className="grid grid-cols-3 gap-2">
                    {availableScopes.map((scope) => (
                      <button
                        key={scope}
                        onClick={() => toggleScope(scope)}
                        className={`px-3 py-2 border rounded-lg text-sm transition-all ${
                          newKeyForm.scopes.includes(scope)
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        {scope}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Rate Limits */}
              <div>
                <label className="block text-sm text-slate-700 mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Rate Limits
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-slate-600 mb-2">Requests per Minute</label>
                    <input
                      type="number"
                      value={newKeyForm.rateLimitMinute}
                      onChange={(e) => setNewKeyForm({ ...newKeyForm, rateLimitMinute: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-600 mb-2">Requests per Hour</label>
                    <input
                      type="number"
                      value={newKeyForm.rateLimitHour}
                      onChange={(e) => setNewKeyForm({ ...newKeyForm, rateLimitHour: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-600 mb-2">Requests per Day</label>
                    <input
                      type="number"
                      value={newKeyForm.rateLimitDay}
                      onChange={(e) => setNewKeyForm({ ...newKeyForm, rateLimitDay: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Domain Restrictions */}
              <div>
                <label className="block text-sm text-slate-700 mb-3 flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Domain Restrictions (Optional)
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newKeyForm.domainInput}
                    onChange={(e) => setNewKeyForm({ ...newKeyForm, domainInput: e.target.value })}
                    placeholder="example.com or localhost:3000"
                    className="flex-1 px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 outline-none focus:border-blue-500"
                    onKeyPress={(e) => e.key === 'Enter' && addDomain()}
                  />
                  <button
                    onClick={addDomain}
                    className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                {newKeyForm.domains.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {newKeyForm.domains.map((domain) => (
                      <span key={domain} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-2">
                        {domain}
                        <button onClick={() => removeDomain(domain)}>
                          <CloseIcon className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* IP Restrictions */}
              <div>
                <label className="block text-sm text-slate-700 mb-3 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  IP Address Restrictions (Optional)
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newKeyForm.ipInput}
                    onChange={(e) => setNewKeyForm({ ...newKeyForm, ipInput: e.target.value })}
                    placeholder="192.168.1.1 or 10.0.0.0/24"
                    className="flex-1 px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 outline-none focus:border-blue-500"
                    onKeyPress={(e) => e.key === 'Enter' && addIP()}
                  />
                  <button
                    onClick={addIP}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                {newKeyForm.ips.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {newKeyForm.ips.map((ip) => (
                      <span key={ip} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center gap-2 font-mono">
                        {ip}
                        <button onClick={() => removeIP(ip)}>
                          <CloseIcon className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 flex items-center justify-end gap-3 sticky bottom-0 bg-white">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateKey}
                disabled={!newKeyForm.name}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                Create API Key
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
