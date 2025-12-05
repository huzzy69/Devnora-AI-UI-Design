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

export default function APIManagementPanel() {
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
        { name: 'role', type: 'string', required: false, description: 'User role (default: user)' },
      ],
      responses: [
        { code: 201, description: 'User created', example: { id: '123', email: 'user@example.com' } },
        { code: 400, description: 'Bad request', example: { error: 'Invalid email format' } },
        { code: 409, description: 'Conflict', example: { error: 'Email already exists' } },
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
        { name: 'search', type: 'string', required: false, description: 'Search query' },
      ],
      responses: [
        { code: 200, description: 'Success', example: { projects: [] } },
        { code: 401, description: 'Unauthorized', example: { error: 'Token expired' } },
      ],
      analytics: {
        totalRequests: 28934,
        successRate: 99.2,
        avgResponseTime: '98ms',
        lastCalled: '30 seconds ago',
        errorCount: 232,
      },
    },
    {
      id: 'ep_004',
      name: 'Delete Project',
      path: '/api/v1/projects/:id',
      method: 'DELETE',
      description: 'Delete a specific project by ID',
      category: 'Projects',
      status: 'maintenance',
      version: 'v1',
      authentication: 'bearer',
      rateLimit: { perMinute: 5, perHour: 50, perDay: 200 },
      parameters: [
        { name: 'id', type: 'string', required: true, description: 'Project ID' },
      ],
      responses: [
        { code: 204, description: 'Deleted successfully', example: null },
        { code: 404, description: 'Not found', example: { error: 'Project not found' } },
        { code: 403, description: 'Forbidden', example: { error: 'Insufficient permissions' } },
      ],
      analytics: {
        totalRequests: 892,
        successRate: 96.8,
        avgResponseTime: '156ms',
        lastCalled: '1 hour ago',
        errorCount: 29,
      },
    },
    {
      id: 'ep_005',
      name: 'Update Template',
      path: '/api/v1/templates/:id',
      method: 'PUT',
      description: 'Update template configuration and content',
      category: 'Templates',
      status: 'disabled',
      version: 'v1',
      authentication: 'api-key',
      rateLimit: { perMinute: 20, perHour: 200, perDay: 1000 },
      parameters: [
        { name: 'id', type: 'string', required: true, description: 'Template ID' },
        { name: 'name', type: 'string', required: false, description: 'Template name' },
        { name: 'content', type: 'object', required: false, description: 'Template content' },
      ],
      responses: [
        { code: 200, description: 'Updated successfully', example: { id: '123', name: 'Updated' } },
        { code: 404, description: 'Not found', example: { error: 'Template not found' } },
      ],
      analytics: {
        totalRequests: 1567,
        successRate: 91.4,
        avgResponseTime: '312ms',
        lastCalled: '3 hours ago',
        errorCount: 135,
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
    {
      id: 'log_003',
      endpointId: 'ep_001',
      timestamp: '2025-12-05 14:33:45',
      method: 'GET',
      path: '/api/v1/users',
      statusCode: 429,
      responseTime: '12ms',
      ipAddress: '192.168.1.102',
      userAgent: 'curl/7.68.0',
      error: 'Rate limit exceeded',
      responseBody: { error: 'Too many requests. Try again in 30 seconds.' },
    },
    {
      id: 'log_004',
      endpointId: 'ep_003',
      timestamp: '2025-12-05 14:32:30',
      method: 'GET',
      path: '/api/v1/projects',
      statusCode: 200,
      responseTime: '98ms',
      ipAddress: '192.168.1.103',
      userAgent: 'axios/1.4.0',
      responseBody: { projects: [] },
    },
    {
      id: 'log_005',
      endpointId: 'ep_002',
      timestamp: '2025-12-05 14:31:18',
      method: 'POST',
      path: '/api/v1/users',
      statusCode: 409,
      responseTime: '189ms',
      ipAddress: '192.168.1.104',
      userAgent: 'PostmanRuntime/7.32.2',
      requestBody: { email: 'existing@example.com' },
      error: 'Email already exists',
      responseBody: { error: 'A user with this email already exists' },
    },
  ];

  const filteredEndpoints = endpoints.filter(ep => {
    const matchesSearch = searchTerm === '' || 
      ep.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ep.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ep.description.toLowerCase().includes(searchTerm.toLowerCase());
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

  const handleDeleteEndpoint = (id: string) => {
    if (confirm('Are you sure you want to delete this endpoint?')) {
      setEndpoints(endpoints.filter(ep => ep.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl text-slate-900 mb-2">API Management Panel</h1>
            <p className="text-slate-600">Manage, monitor, and optimize your REST API endpoints</p>
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
            { label: 'Total Endpoints', value: endpoints.length.toString(), icon: Server, color: 'blue', subtitle: `${endpoints.filter(e => e.status === 'enabled').length} active` },
            { label: 'Total Requests', value: endpoints.reduce((acc, e) => acc + e.analytics.totalRequests, 0).toLocaleString(), icon: Activity, color: 'green', subtitle: 'Last 30 days' },
            { label: 'Avg Success Rate', value: '97.2%', icon: CheckCircle, color: 'purple', subtitle: '+2.1% this week' },
            { label: 'Avg Response Time', value: '165ms', icon: Zap, color: 'orange', subtitle: '-12ms faster' },
            { label: 'Total Errors', value: '835', icon: AlertCircle, color: 'red', subtitle: '2.8% error rate' },
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center mb-4`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <div className="text-3xl text-slate-900 mb-1">{stat.value}</div>
              <div className="text-sm text-slate-600 mb-1">{stat.label}</div>
              <div className="text-xs text-slate-500">{stat.subtitle}</div>
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
                  <option value="PATCH">PATCH</option>
                </select>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="enabled">Enabled</option>
                  <option value="disabled">Disabled</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
            </div>

            {/* Endpoints List */}
            <div className="space-y-4">
              {filteredEndpoints.map((endpoint) => (
                <div key={endpoint.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`px-3 py-1 bg-${getMethodColor(endpoint.method)}-100 text-${getMethodColor(endpoint.method)}-700 rounded-lg text-sm font-mono`}>
                          {endpoint.method}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg text-slate-900">{endpoint.name}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs capitalize ${
                              endpoint.status === 'enabled' ? 'bg-green-100 text-green-700' :
                              endpoint.status === 'disabled' ? 'bg-red-100 text-red-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {endpoint.status}
                            </span>
                            <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs">
                              {endpoint.version}
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
                      <h4 className="text-sm text-slate-600 mb-2 flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Rate Limits
                      </h4>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                          <div className="text-xs text-slate-500 mb-1">Per Minute</div>
                          <div className="text-sm text-slate-900">{endpoint.rateLimit.perMinute} req/min</div>
                        </div>
                        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                          <div className="text-xs text-slate-500 mb-1">Per Hour</div>
                          <div className="text-sm text-slate-900">{endpoint.rateLimit.perHour.toLocaleString()} req/hr</div>
                        </div>
                        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                          <div className="text-xs text-slate-500 mb-1">Per Day</div>
                          <div className="text-sm text-slate-900">{endpoint.rateLimit.perDay.toLocaleString()} req/day</div>
                        </div>
                      </div>
                    </div>

                    {/* Expand/Collapse Details */}
                    <button
                      onClick={() => setExpandedEndpoint(expandedEndpoint === endpoint.id ? null : endpoint.id)}
                      className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors mb-4"
                    >
                      <span className="text-sm text-slate-700">
                        {expandedEndpoint === endpoint.id ? 'Hide' : 'Show'} Details (Parameters, Responses, Authentication)
                      </span>
                      {expandedEndpoint === endpoint.id ? (
                        <ChevronUp className="w-5 h-5 text-slate-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-500" />
                      )}
                    </button>

                    {/* Expanded Details */}
                    {expandedEndpoint === endpoint.id && (
                      <div className="space-y-4 mb-4 p-4 bg-slate-50 rounded-xl">
                        {/* Authentication */}
                        <div>
                          <h4 className="text-sm text-slate-700 mb-2 flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            Authentication
                          </h4>
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs capitalize">
                            {endpoint.authentication}
                          </span>
                        </div>

                        {/* Parameters */}
                        <div>
                          <h4 className="text-sm text-slate-700 mb-2 flex items-center gap-2">
                            <Settings className="w-4 h-4" />
                            Parameters ({endpoint.parameters.length})
                          </h4>
                          <div className="space-y-2">
                            {endpoint.parameters.map((param, i) => (
                              <div key={i} className="p-3 bg-white border border-slate-200 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                  <code className="text-sm text-blue-600 font-mono">{param.name}</code>
                                  <span className="px-2 py-0.5 bg-slate-200 text-slate-700 rounded text-xs">{param.type}</span>
                                  {param.required && (
                                    <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs">required</span>
                                  )}
                                </div>
                                <p className="text-xs text-slate-600">{param.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Responses */}
                        <div>
                          <h4 className="text-sm text-slate-700 mb-2 flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Response Codes ({endpoint.responses.length})
                          </h4>
                          <div className="space-y-2">
                            {endpoint.responses.map((response, i) => (
                              <div key={i} className="p-3 bg-white border border-slate-200 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className={`px-2 py-1 rounded text-xs font-mono ${
                                    response.code >= 200 && response.code < 300 ? 'bg-green-100 text-green-700' :
                                    response.code >= 400 && response.code < 500 ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-red-100 text-red-700'
                                  }`}>
                                    {response.code}
                                  </span>
                                  <span className="text-sm text-slate-900">{response.description}</span>
                                </div>
                                {response.example && (
                                  <pre className="text-xs text-slate-600 bg-slate-100 p-2 rounded overflow-x-auto">
                                    {JSON.stringify(response.example, null, 2)}
                                  </pre>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

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
                      <button 
                        onClick={() => {
                          setSelectedEndpoint(endpoint);
                          setShowEditModal(true);
                        }}
                        className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg flex items-center gap-2 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg flex items-center gap-2 transition-colors">
                        <Eye className="w-4 h-4" />
                        View Logs
                      </button>
                      <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center gap-2 transition-colors">
                        <Copy className="w-4 h-4" />
                        Duplicate
                      </button>
                      <button 
                        onClick={() => handleDeleteEndpoint(endpoint.id)}
                        className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg flex items-center gap-2 transition-colors ml-auto"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Per-Endpoint Analytics */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h2 className="text-xl text-slate-900 mb-6">Requests Per Endpoint (Last 7 Days)</h2>
              <div className="space-y-3">
                {endpoints
                  .sort((a, b) => b.analytics.totalRequests - a.analytics.totalRequests)
                  .map((endpoint) => (
                    <div key={endpoint.id} className="flex items-center gap-4">
                      <div className="w-32">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 bg-${getMethodColor(endpoint.method)}-100 text-${getMethodColor(endpoint.method)}-700 rounded text-xs font-mono`}>
                            {endpoint.method}
                          </span>
                        </div>
                        <code className="text-xs text-slate-600 font-mono truncate block">{endpoint.path}</code>
                      </div>
                      <div className="flex-1">
                        <div className="h-10 bg-slate-200 rounded-lg overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-end px-3 text-white text-sm"
                            style={{ width: `${(endpoint.analytics.totalRequests / 30000) * 100}%` }}
                          >
                            {endpoint.analytics.totalRequests.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="w-20 text-sm text-slate-600 text-right">
                        {endpoint.analytics.successRate}%
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Error Rate Analysis */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h2 className="text-xl text-slate-900 mb-6">Error Rate by Endpoint</h2>
              <div className="space-y-4">
                {endpoints
                  .filter(ep => ep.analytics.errorCount > 0)
                  .sort((a, b) => b.analytics.errorCount - a.analytics.errorCount)
                  .map((endpoint) => (
                    <div key={endpoint.id} className="p-4 border border-red-200 bg-red-50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-1 bg-${getMethodColor(endpoint.method)}-100 text-${getMethodColor(endpoint.method)}-700 rounded text-xs font-mono`}>
                            {endpoint.method}
                          </span>
                          <code className="text-sm text-slate-900 font-mono">{endpoint.path}</code>
                        </div>
                        <span className="text-lg text-red-700">{endpoint.analytics.errorCount} errors</span>
                      </div>
                      <div className="text-sm text-red-600">
                        Error rate: {((endpoint.analytics.errorCount / endpoint.analytics.totalRequests) * 100).toFixed(2)}%
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Response Time Metrics */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h2 className="text-xl text-slate-900 mb-6">Average Response Time</h2>
              <div className="grid grid-cols-3 gap-4">
                {endpoints.slice(0, 6).map((endpoint) => (
                  <div key={endpoint.id} className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 bg-${getMethodColor(endpoint.method)}-100 text-${getMethodColor(endpoint.method)}-700 rounded text-xs font-mono`}>
                        {endpoint.method}
                      </span>
                    </div>
                    <code className="text-xs text-slate-600 font-mono block mb-2 truncate">{endpoint.path}</code>
                    <div className="text-2xl text-purple-900">{endpoint.analytics.avgResponseTime}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Logs Tab */}
        {activeTab === 'logs' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <h2 className="text-xl text-slate-900">Recent API Requests</h2>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                  </button>
                  <button className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm text-slate-600">Timestamp</th>
                      <th className="px-6 py-4 text-left text-sm text-slate-600">Method</th>
                      <th className="px-6 py-4 text-left text-sm text-slate-600">Path</th>
                      <th className="px-6 py-4 text-left text-sm text-slate-600">Status</th>
                      <th className="px-6 py-4 text-left text-sm text-slate-600">Response Time</th>
                      <th className="px-6 py-4 text-left text-sm text-slate-600">IP Address</th>
                      <th className="px-6 py-4 text-left text-sm text-slate-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {apiLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-slate-600 font-mono">{log.timestamp}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 bg-${getMethodColor(log.method)}-100 text-${getMethodColor(log.method)}-700 rounded text-xs font-mono`}>
                            {log.method}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <code className="text-sm text-slate-900 font-mono">{log.path}</code>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-mono ${
                            log.statusCode >= 200 && log.statusCode < 300 ? 'bg-green-100 text-green-700' :
                            log.statusCode >= 400 && log.statusCode < 500 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {log.statusCode}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-900">{log.responseTime}</td>
                        <td className="px-6 py-4 text-sm text-slate-600 font-mono">{log.ipAddress}</td>
                        <td className="px-6 py-4">
                          <button className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* API Documentation Tab */}
        {activeTab === 'documentation' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl text-slate-900 mb-2">Auto-Generated API Documentation</h2>
                  <p className="text-slate-600">Live preview of your API documentation</p>
                </div>
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl flex items-center gap-2">
                  <ExternalLink className="w-5 h-5" />
                  View Full Docs
                </button>
              </div>
            </div>

            {/* Documentation Preview */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="space-y-8">
                {endpoints.filter(e => e.status === 'enabled').map((endpoint) => (
                  <div key={endpoint.id} className="border-b border-slate-200 pb-8 last:border-0">
                    {/* Endpoint Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-3 py-1 bg-${getMethodColor(endpoint.method)}-600 text-white rounded-lg text-sm font-mono`}>
                        {endpoint.method}
                      </span>
                      <code className="text-lg text-slate-900 font-mono">{endpoint.path}</code>
                    </div>

                    {/* Description */}
                    <p className="text-slate-700 mb-4">{endpoint.description}</p>

                    {/* Authentication */}
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <span className="text-sm text-blue-900">
                        <strong>Authentication:</strong> {endpoint.authentication}
                      </span>
                    </div>

                    {/* Parameters */}
                    {endpoint.parameters.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm text-slate-700 mb-3">Request Parameters:</h4>
                        <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-slate-700">
                                <th className="text-left py-2 text-slate-400">Parameter</th>
                                <th className="text-left py-2 text-slate-400">Type</th>
                                <th className="text-left py-2 text-slate-400">Required</th>
                                <th className="text-left py-2 text-slate-400">Description</th>
                              </tr>
                            </thead>
                            <tbody>
                              {endpoint.parameters.map((param, i) => (
                                <tr key={i} className="border-b border-slate-800">
                                  <td className="py-2 text-green-400 font-mono">{param.name}</td>
                                  <td className="py-2 text-blue-400">{param.type}</td>
                                  <td className="py-2 text-slate-300">{param.required ? 'Yes' : 'No'}</td>
                                  <td className="py-2 text-slate-300">{param.description}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Response Examples */}
                    <div>
                      <h4 className="text-sm text-slate-700 mb-3">Response Examples:</h4>
                      {endpoint.responses.map((response, i) => (
                        <div key={i} className="mb-3">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-2 py-1 rounded text-xs font-mono ${
                              response.code >= 200 && response.code < 300 ? 'bg-green-100 text-green-700' :
                              response.code >= 400 && response.code < 500 ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {response.code}
                            </span>
                            <span className="text-sm text-slate-700">{response.description}</span>
                          </div>
                          {response.example && (
                            <pre className="bg-slate-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                              {JSON.stringify(response.example, null, 2)}
                            </pre>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h2 className="text-xl text-slate-900 mb-6">Global API Settings</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm text-slate-700 mb-4">Rate Limiting</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-slate-900">Enable global rate limiting</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-slate-900">Block requests after rate limit exceeded</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-700 mb-2">API Version</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>v1 (Current)</option>
                    <option>v2 (Beta)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-slate-700 mb-2">Default Authentication Method</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>API Key</option>
                    <option>Bearer Token</option>
                    <option>OAuth 2.0</option>
                  </select>
                </div>

                <button className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl flex items-center gap-2">
                  <Save className="w-5 h-5" />
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create Endpoint Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-2xl text-slate-900">Create New Endpoint</h2>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <CloseIcon className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-700 mb-2">Endpoint Name *</label>
                  <input
                    type="text"
                    placeholder="e.g., Get All Users"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-700 mb-2">Category</label>
                  <input
                    type="text"
                    placeholder="e.g., Users, Projects"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-slate-700 mb-2">HTTP Method *</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>GET</option>
                    <option>POST</option>
                    <option>PUT</option>
                    <option>DELETE</option>
                    <option>PATCH</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-slate-700 mb-2">Version</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>v1</option>
                    <option>v2</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-slate-700 mb-2">Authentication</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>None</option>
                    <option>API Key</option>
                    <option>Bearer Token</option>
                    <option>OAuth 2.0</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2">Endpoint Path *</label>
                <input
                  type="text"
                  placeholder="/api/v1/users"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2">Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe what this endpoint does..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <h3 className="text-sm text-slate-700 mb-3">Rate Limits</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-slate-600 mb-2">Per Minute</label>
                    <input
                      type="number"
                      defaultValue={60}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-600 mb-2">Per Hour</label>
                    <input
                      type="number"
                      defaultValue={1000}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-600 mb-2">Per Day</label>
                    <input
                      type="number"
                      defaultValue={10000}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2">Initial Status</label>
                <select className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Enabled</option>
                  <option>Disabled</option>
                  <option>Maintenance</option>
                </select>
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
                onClick={() => {
                  alert('Endpoint created successfully!');
                  setShowCreateModal(false);
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl transition-all flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                Create Endpoint
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
