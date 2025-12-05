import React, { useState } from 'react';
import { Globe, Plus, Settings, CheckCircle, XCircle, Clock, AlertTriangle, RefreshCw, Key, Shield, Terminal } from 'lucide-react';

export default function SubdomainAutomation() {
  const [activeTab, setActiveTab] = useState('subdomains');
  const [newSubdomain, setNewSubdomain] = useState('');
  const [tenantName, setTenantName] = useState('');
  const [dnsProvider, setDnsProvider] = useState('Cloudflare');
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [baseDomain, setBaseDomain] = useState('devnora.com');
  const [autoInstallSSL, setAutoInstallSSL] = useState(true);
  const [forceHTTPS, setForceHTTPS] = useState(true);
  const [autoRenew, setAutoRenew] = useState(false);

  const handleCreateSubdomain = () => {
    if (!newSubdomain || !tenantName) {
      alert('Please fill in subdomain and tenant name');
      return;
    }
    alert(`Creating subdomain: ${newSubdomain}.devnora.com for ${tenantName}`);
    setNewSubdomain('');
    setTenantName('');
  };

  const handleTestConnection = () => {
    alert('Testing DNS API connection...');
  };

  const handleSaveSettings = () => {
    alert('DNS settings saved successfully!');
  };

  const subdomains = [
    {
      subdomain: 'client1',
      fullDomain: 'client1.devnora.com',
      tenant: 'Acme Corp',
      status: 'active',
      created: '2025-11-15',
      ssl: true,
      users: 45
    },
    {
      subdomain: 'client2',
      fullDomain: 'client2.devnora.com',
      tenant: 'TechStart Inc',
      status: 'active',
      created: '2025-11-20',
      ssl: true,
      users: 23
    },
    {
      subdomain: 'demo',
      fullDomain: 'demo.devnora.com',
      tenant: 'Demo Account',
      status: 'pending',
      created: '2025-12-01',
      ssl: false,
      users: 0
    },
    {
      subdomain: 'enterprise',
      fullDomain: 'enterprise.devnora.com',
      tenant: 'Enterprise LLC',
      status: 'failed',
      created: '2025-11-28',
      ssl: false,
      users: 0
    }
  ];

  const dnsLogs = [
    {
      timestamp: '2025-12-01 14:30:22',
      subdomain: 'demo.devnora.com',
      action: 'CREATE_SUBDOMAIN',
      status: 'pending',
      message: 'DNS propagation in progress...'
    },
    {
      timestamp: '2025-12-01 12:15:45',
      subdomain: 'client2.devnora.com',
      action: 'SSL_INSTALL',
      status: 'success',
      message: 'SSL certificate installed successfully'
    },
    {
      timestamp: '2025-11-30 18:22:11',
      subdomain: 'enterprise.devnora.com',
      action: 'CREATE_SUBDOMAIN',
      status: 'failed',
      message: 'DNS API authentication failed'
    },
    {
      timestamp: '2025-11-30 16:10:33',
      subdomain: 'client1.devnora.com',
      action: 'UPDATE_DNS',
      status: 'success',
      message: 'DNS records updated'
    }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2 text-slate-900">Subdomain Automation</h1>
        <p className="text-slate-600">Manage multi-tenant subdomains (*.devnora.com)</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-slate-200">
        {[
          { id: 'subdomains', label: 'Subdomains', icon: Globe },
          { id: 'settings', label: 'DNS API Settings', icon: Settings },
          { id: 'rules', label: 'Creation Rules', icon: Shield },
          { id: 'logs', label: 'Status Logs', icon: Terminal }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Subdomains Tab */}
      {activeTab === 'subdomains' && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600">Total Subdomains</span>
                <Globe className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-3xl text-slate-900">12</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600">Active</span>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-3xl text-green-600">10</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600">Pending</span>
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="text-3xl text-yellow-600">1</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600">Failed</span>
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div className="text-3xl text-red-600">1</div>
            </div>
          </div>

          {/* Create New Subdomain */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6">
            <h3 className="text-lg text-slate-900 mb-4">Create New Subdomain</h3>
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="subdomain"
                  value={newSubdomain}
                  onChange={(e) => setNewSubdomain(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl"
                />
                <div className="text-xs text-slate-500 mt-1">Will create: subdomain.devnora.com</div>
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Tenant Name"
                  value={tenantName}
                  onChange={(e) => setTenantName(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl"
                />
              </div>
              <button
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl flex items-center gap-2 transition-colors"
                onClick={handleCreateSubdomain}
              >
                <Plus className="w-5 h-5" />
                Create
              </button>
            </div>
          </div>

          {/* Subdomains Table */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h3 className="text-xl text-slate-900">All Subdomains</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase">Subdomain</th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase">Tenant</th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase">SSL</th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase">Users</th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase">Created</th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {subdomains.map((item, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-900">{item.subdomain}</div>
                        <div className="text-xs text-slate-500">{item.fullDomain}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">{item.tenant}</td>
                      <td className="px-6 py-4">
                        {item.status === 'active' && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                            <CheckCircle className="w-3 h-3" />
                            Active
                          </span>
                        )}
                        {item.status === 'pending' && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                            <Clock className="w-3 h-3" />
                            Pending
                          </span>
                        )}
                        {item.status === 'failed' && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                            <XCircle className="w-3 h-3" />
                            Failed
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {item.ssl ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-slate-300" />
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">{item.users}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{item.created}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-1 hover:bg-slate-200 rounded">
                            <RefreshCw className="w-4 h-4 text-blue-600" />
                          </button>
                          <button className="p-1 hover:bg-slate-200 rounded">
                            <Settings className="w-4 h-4 text-slate-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* DNS API Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h3 className="text-xl text-slate-900 mb-6">DNS Provider Configuration</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-slate-700 mb-2">DNS Provider</label>
                <select
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl"
                  value={dnsProvider}
                  onChange={(e) => setDnsProvider(e.target.value)}
                >
                  <option>Cloudflare</option>
                  <option>AWS Route 53</option>
                  <option>Google Cloud DNS</option>
                  <option>DigitalOcean</option>
                  <option>Namecheap</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2">API Key</label>
                <div className="relative">
                  <input
                    type="password"
                    defaultValue="••••••••••••••••••••"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-xl"
                  />
                  <Key className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2">API Secret</label>
                <div className="relative">
                  <input
                    type="password"
                    defaultValue="••••••••••••••••••••"
                    value={apiSecret}
                    onChange={(e) => setApiSecret(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-xl"
                  />
                  <Shield className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2">Zone ID</label>
                <input
                  type="text"
                  placeholder="abc123def456..."
                  value={zoneId}
                  onChange={(e) => setZoneId(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2">Base Domain</label>
                <input
                  type="text"
                  defaultValue="devnora.com"
                  value={baseDomain}
                  onChange={(e) => setBaseDomain(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="flex gap-3">
                <button
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors"
                  onClick={handleTestConnection}
                >
                  Test Connection
                </button>
                <button
                  className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl transition-colors"
                  onClick={handleSaveSettings}
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>

          {/* SSL Configuration */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h3 className="text-xl text-slate-900 mb-6">SSL Certificate Settings</h3>
            
            <div className="space-y-4">
              <label className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
                <input
                  type="checkbox"
                  defaultChecked={autoInstallSSL}
                  onChange={(e) => setAutoInstallSSL(e.target.checked)}
                  className="w-4 h-4"
                />
                <div>
                  <div className="text-sm text-slate-900">Auto-install SSL certificates</div>
                  <div className="text-xs text-slate-500">Automatically provision SSL via Let's Encrypt</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
                <input
                  type="checkbox"
                  defaultChecked={forceHTTPS}
                  onChange={(e) => setForceHTTPS(e.target.checked)}
                  className="w-4 h-4"
                />
                <div>
                  <div className="text-sm text-slate-900">Force HTTPS redirect</div>
                  <div className="text-xs text-slate-500">Redirect all HTTP traffic to HTTPS</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
                <input
                  type="checkbox"
                  defaultChecked={autoRenew}
                  onChange={(e) => setAutoRenew(e.target.checked)}
                  className="w-4 h-4"
                />
                <div>
                  <div className="text-sm text-slate-900">Auto-renew certificates</div>
                  <div className="text-xs text-slate-500">Automatically renew SSL before expiry</div>
                </div>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Creation Rules Tab */}
      {activeTab === 'rules' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h3 className="text-xl text-slate-900 mb-6">Subdomain Creation Rules</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-slate-700 mb-2">Naming Pattern</label>
              <select className="w-full px-4 py-3 border border-slate-300 rounded-xl">
                <option>Lowercase only (recommended)</option>
                <option>Allow numbers and hyphens</option>
                <option>Custom regex pattern</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-slate-700 mb-2">Min Length</label>
              <input
                type="number"
                defaultValue="3"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-700 mb-2">Max Length</label>
              <input
                type="number"
                defaultValue="20"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-700 mb-2">Reserved Subdomains</label>
              <textarea
                rows={4}
                placeholder="www, admin, api, app, mail, ftp, dev, staging"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl"
                defaultValue="www, admin, api, app, mail, ftp, dev, staging, demo, test"
              ></textarea>
              <div className="text-xs text-slate-500 mt-1">Comma-separated list</div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <label className="flex items-center gap-2 mb-3">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span className="text-sm text-slate-700">Auto-approve new subdomains</span>
              </label>
              
              <label className="flex items-center gap-2 mb-3">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span className="text-sm text-slate-700">Send email notification on creation</span>
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm text-slate-700">Require manual approval</span>
              </label>
            </div>

            <button className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors">
              Save Rules
            </button>
          </div>
        </div>
      )}

      {/* DNS Logs Tab */}
      {activeTab === 'logs' && (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="text-xl text-slate-900">DNS Automation Logs</h3>
              <p className="text-sm text-slate-600">Real-time subdomain creation and DNS logs</p>
            </div>
            <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-2 transition-colors">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
          
          <div className="divide-y divide-slate-200">
            {dnsLogs.map((log, i) => (
              <div key={i} className="p-6 hover:bg-slate-50">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {log.status === 'success' && <CheckCircle className="w-5 h-5 text-green-600" />}
                    {log.status === 'pending' && <Clock className="w-5 h-5 text-yellow-600" />}
                    {log.status === 'failed' && <XCircle className="w-5 h-5 text-red-600" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm text-slate-900">{log.subdomain}</span>
                      <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">{log.action}</span>
                    </div>
                    <div className="text-sm text-slate-600 mb-1">{log.message}</div>
                    <div className="text-xs text-slate-500">{log.timestamp}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}