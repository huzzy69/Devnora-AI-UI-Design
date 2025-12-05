import React, { useState } from 'react';
import { 
  Code, Plus, Play, Pause, Trash2, Edit2, Copy, Check, Clock, Calendar,
  Database, FileText, Activity, BarChart3, Settings, TrendingUp, Zap,
  CheckCircle, XCircle, AlertCircle, ChevronDown, ChevronUp, Filter,
  Search, MoreVertical, Save, X as CloseIcon, Globe, Link2, Key,
  Terminal, Eye, EyeOff, Download, Upload, RefreshCw, ExternalLink,
  Server, Layers, Package, Box, Circle, Square, ChevronRight,
  AlertTriangle, Info, Bell, Users, Shield, Lock, Unlock, FileCode
} from 'lucide-react';

interface Endpoint {
  id: string;
  name: string;
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  description: string;
  category: string;
  status: 'enabled' | 'disabled' | 'maintenance';
  version: string;
  authentication: 'none' | 'api-key' | 'bearer' | 'oauth';
  rateLimit: {
    perMinute: number;
    perHour: number;
    perDay: number;
  };
  parameters: {
    name: string;
    type: 'string' | 'number' | 'boolean' | 'object' | 'array';
    required: boolean;
    description: string;
  }[];
  responses: {
    code: number;
    description: string;
    example: any;
  }[];
  analytics: {
    totalRequests: number;
    successRate: number;
    avgResponseTime: string;
    lastCalled: string;
    errorCount: number;
  };
}

interface APILog {
  id: string;
  endpointId: string;
  timestamp: string;
  method: string;
  path: string;
  statusCode: number;
  responseTime: string;
  ipAddress: string;
  userAgent: string;
  requestBody?: any;
  responseBody?: any;
  error?: string;
}

export default function APIPlatformComplete() {
  const [activeTab, setActiveTab] = useState<'endpoints' | 'analytics' | 'logs' | 'documentation' | 'settings'>('endpoints');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint | null>(null);
  const [expandedEndpoint, setExpandedEndpoint] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [methodFilter, setMethodFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Sample endpoints
  const [endpoints, setEndpoints] = useState<Endpoint[]>([
    {
      id: 'ep_001',
      name: 'Get All Users',
      path: '/api/v1/users',
      method: 'GET',
      description: 'Retrieve a list of all users with pagination support',
      category: 'Users',
      status: 'enabled',
      version: 'v1',
      authentication: 'api-key',
      rateLimit: { perMinute: 60, perHour: 1000, perDay: 10000 },
      parameters: [
        { name: 'page', type: 'number', required: false, description: 'Page number for pagination' },
        { name: 'limit', type: 'number', required: false, description: 'Number of items per page' },
        { name: 'sort', type: 'string', required: false, description: 'Sort field and order' },
      ],
      responses: [
        { code: 200, description: 'Success', example: { users: [], total: 0, page: 1 } },
        { code: 401, description: 'Unauthorized', example: { error: 'Invalid API key' } },
        { code: 429, description: 'Rate limit exceeded', example: { error: 'Too many requests' } },
      ],
      analytics: {
        totalRequests: 15847,
        successRate: 98.5,
        avgResponseTime: '124ms',
        lastCalled: '2 minutes ago',
        errorCount: 238,
      },
    },
    {
      id: 'ep_002',
      name: 'Create User',
      path: '/api/v1/users',
      method: 'POST',
      description: 'Create a new user account',
      category: 'Users',
      status: 'enabled',
      version: 'v1',
      authentication: 'api-key',
      rateLimit: { perMinute: 10, perHour: 100, perDay: 500 },
      parameters: [
        { name: 'email', type: 'string', required: true, description: 'User email address' },
        { name: 'password', type: 'string', required: true, description: 'User password' },
        { name: 'name', type: 'string', required: true, description: 'User full name' },
      ],
      responses: [
        { code: 201, description: 'User created', example: { id: '123', email: 'user@example.com' } },
        { code: 400, description: 'Bad request', example: { error: 'Invalid email format' } },
      ],
      analytics: {
        totalRequests: 3456,
        successRate: 94.2,
        avgResponseTime: '245ms',
        lastCalled: '5 minutes ago',
        errorCount: 201,
      },
    },
    {
      id: 'ep_003',
      name: 'Get Projects',
      path: '/api/v1/projects',
      method: 'GET',
      description: 'Retrieve all projects for authenticated user',
      category: 'Projects',
      status: 'enabled',
      version: 'v1',
      authentication: 'bearer',
      rateLimit: { perMinute: 100, perHour: 2000, perDay: 20000 },
      parameters: [
        { name: 'status', type: 'string', required: false, description: 'Filter by project status' },
      ],
      responses: [
        { code: 200, description: 'Success', example: { projects: [] } },
      ],
      analytics: {
        totalRequests: 28934,
        successRate: 99.2,
        avgResponseTime: '98ms',
        lastCalled: '30 seconds ago',
        errorCount: 232,
      },
    },
  ]);

  // Sample API logs
  const apiLogs: APILog[] = [
    {
      id: 'log_001',
      endpointId: 'ep_001',
      timestamp: '2025-12-05 14:35:22',
      method: 'GET',
      path: '/api/v1/users?page=1&limit=20',
      statusCode: 200,
      responseTime: '124ms',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0...',
      responseBody: { users: [], total: 150 },
    },
    {
      id: 'log_002',
      endpointId: 'ep_002',
      timestamp: '2025-12-05 14:34:15',
      method: 'POST',
      path: '/api/v1/users',
      statusCode: 201,
      responseTime: '245ms',
      ipAddress: '192.168.1.101',
      userAgent: 'PostmanRuntime/7.32.2',
      requestBody: { email: 'user@example.com', name: 'John Doe' },
      responseBody: { id: '123', email: 'user@example.com' },
    },
  ];

  const filteredEndpoints = endpoints.filter(ep => {
    const matchesSearch = searchTerm === '' || 
      ep.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ep.path.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMethod = methodFilter === 'all' || ep.method === methodFilter;
    const matchesStatus = statusFilter === 'all' || ep.status === statusFilter;
    return matchesSearch && matchesMethod && matchesStatus;
  });

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'blue';
      case 'POST': return 'green';
      case 'PUT': return 'orange';
      case 'DELETE': return 'red';
      case 'PATCH': return 'purple';
      default: return 'slate';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'enabled': return 'green';
      case 'disabled': return 'red';
      case 'maintenance': return 'yellow';
      default: return 'slate';
    }
  };

  const handleToggleEndpoint = (id: string) => {
    setEndpoints(endpoints.map(ep => 
      ep.id === id 
        ? { ...ep, status: ep.status === 'enabled' ? 'disabled' : 'enabled' as any }
        : ep
    ));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl text-slate-900 mb-2">API Platform</h1>
            <p className="text-slate-600">Complete API endpoint management and monitoring</p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl flex items-center gap-2 transition-all shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Create Endpoint
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-5 gap-6 mb-8">
          {[
            { label: 'Total Endpoints', value: endpoints.length.toString(), icon: Server, color: 'blue' },
            { label: 'Total Requests', value: endpoints.reduce((acc, e) => acc + e.analytics.totalRequests, 0).toLocaleString(), icon: Activity, color: 'green' },
            { label: 'Avg Success Rate', value: '97.2%', icon: CheckCircle, color: 'purple' },
            { label: 'Avg Response Time', value: '165ms', icon: Zap, color: 'orange' },
            { label: 'Total Errors', value: '671', icon: AlertCircle, color: 'red' },
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center mb-4`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <div className="text-3xl text-slate-900 mb-1">{stat.value}</div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-slate-200 bg-white rounded-t-2xl">
          {[
            { id: 'endpoints', label: 'Endpoints', icon: Server },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            { id: 'logs', label: 'Request Logs', icon: FileText },
            { id: 'documentation', label: 'API Docs', icon: FileCode },
            { id: 'settings', label: 'Settings', icon: Settings },
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

        {/* Endpoints Tab */}
        {activeTab === 'endpoints' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search endpoints..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <select
                  value={methodFilter}
                  onChange={(e) => setMethodFilter(e.target.value)}
                  className="px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Methods</option>
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                </select>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="enabled">Enabled</option>
                  <option value="disabled">Disabled</option>
                </select>
              </div>
            </div>

            {/* Endpoints List */}
            <div className="space-y-4">
              {filteredEndpoints.map((endpoint) => (
                <div key={endpoint.id} className="bg-white border border-slate-200 rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`px-3 py-1 bg-${getMethodColor(endpoint.method)}-100 text-${getMethodColor(endpoint.method)}-700 rounded-lg text-sm font-mono`}>
                        {endpoint.method}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg text-slate-900">{endpoint.name}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs capitalize bg-${getStatusColor(endpoint.status)}-100 text-${getStatusColor(endpoint.status)}-700`}>
                            {endpoint.status}
                          </span>
                        </div>
                        <code className="text-sm text-slate-600 font-mono">{endpoint.path}</code>
                        <p className="text-sm text-slate-600 mt-2">{endpoint.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-5 gap-4 mb-4">
                    <div className="p-3 bg-blue-50 rounded-xl">
                      <div className="text-xs text-blue-600 mb-1">Total Requests</div>
                      <div className="text-lg text-blue-900">{endpoint.analytics.totalRequests.toLocaleString()}</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-xl">
                      <div className="text-xs text-green-600 mb-1">Success Rate</div>
                      <div className="text-lg text-green-900">{endpoint.analytics.successRate}%</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-xl">
                      <div className="text-xs text-purple-600 mb-1">Avg Response</div>
                      <div className="text-lg text-purple-900">{endpoint.analytics.avgResponseTime}</div>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-xl">
                      <div className="text-xs text-orange-600 mb-1">Last Called</div>
                      <div className="text-sm text-orange-900">{endpoint.analytics.lastCalled}</div>
                    </div>
                    <div className="p-3 bg-red-50 rounded-xl">
                      <div className="text-xs text-red-600 mb-1">Errors</div>
                      <div className="text-lg text-red-900">{endpoint.analytics.errorCount}</div>
                    </div>
                  </div>

                  {/* Rate Limits */}
                  <div className="mb-4">
                    <h4 className="text-sm text-slate-600 mb-2">Rate Limits</h4>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <div className="text-xs text-slate-500 mb-1">Per Minute</div>
                        <div className="text-sm text-slate-900">{endpoint.rateLimit.perMinute} req/min</div>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <div className="text-xs text-slate-500 mb-1">Per Hour</div>
                        <div className="text-sm text-slate-900">{endpoint.rateLimit.perHour.toLocaleString()} req/hr</div>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <div className="text-xs text-slate-500 mb-1">Per Day</div>
                        <div className="text-sm text-slate-900">{endpoint.rateLimit.perDay.toLocaleString()} req/day</div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleToggleEndpoint(endpoint.id)}
                      className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                        endpoint.status === 'enabled'
                          ? 'bg-orange-100 hover:bg-orange-200 text-orange-700'
                          : 'bg-green-100 hover:bg-green-200 text-green-700'
                      }`}
                    >
                      {endpoint.status === 'enabled' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      {endpoint.status === 'enabled' ? 'Disable' : 'Enable'}
                    </button>
                    <button className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg flex items-center gap-2">
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      View Logs
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="text-xl text-slate-900 mb-6">API Analytics Dashboard</h2>
            <p className="text-slate-600">Detailed analytics and performance metrics coming soon...</p>
          </div>
        )}

        {/* Logs Tab */}
        {activeTab === 'logs' && (
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-xl text-slate-900">Request Logs</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm text-slate-600">Timestamp</th>
                    <th className="px-6 py-4 text-left text-sm text-slate-600">Method</th>
                    <th className="px-6 py-4 text-left text-sm text-slate-600">Path</th>
                    <th className="px-6 py-4 text-left text-sm text-slate-600">Status</th>
                    <th className="px-6 py-4 text-left text-sm text-slate-600">Response Time</th>
                    <th className="px-6 py-4 text-left text-sm text-slate-600">IP Address</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {apiLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm text-slate-600 font-mono">{log.timestamp}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 bg-${getMethodColor(log.method)}-100 text-${getMethodColor(log.method)}-700 rounded text-xs font-mono`}>
                          {log.method}
                        </span>
                      </td>
                      <td className="px-6 py-4"><code className="text-sm">{log.path}</code></td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          log.statusCode >= 200 && log.statusCode < 300 ? 'bg-green-100 text-green-700' :
                          log.statusCode >= 400 ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {log.statusCode}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">{log.responseTime}</td>
                      <td className="px-6 py-4 text-sm font-mono">{log.ipAddress}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
