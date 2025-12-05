import React, { useState } from 'react';
import {
  Code, Plus, Play, Save, Copy, Download, FileText, Settings, Zap,
  Globe, Lock, Unlock, Eye, Trash2, Edit, ChevronDown, ChevronRight,
  CheckCircle, XCircle, Clock, Activity, Database, Server, Shield,
  Key, Terminal, Book, FileCode, Search, Filter, AlertCircle, Info,
  Send, BarChart3, TrendingUp, Users, Gauge, RefreshCw, ExternalLink
} from 'lucide-react';

interface APIRoute {
  id: string;
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  endpoint: string;
  description: string;
  parameters: Parameter[];
  headers: Header[];
  bodySchema: any;
  authentication: 'none' | 'api-key' | 'bearer' | 'oauth';
  rateLimit: {
    enabled: boolean;
    requestsPerMinute: number;
    requestsPerHour: number;
    requestsPerDay: number;
  };
  response: {
    statusCode: number;
    example: any;
  };
  version: string;
  status: 'active' | 'inactive' | 'deprecated';
}

interface Parameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  required: boolean;
  description: string;
  defaultValue?: string;
}

interface Header {
  name: string;
  value: string;
  required: boolean;
}

export default function APIPlatform() {
  const [activeTab, setActiveTab] = useState<'builder' | 'documentation' | 'analytics'>('builder');
  const [selectedRoute, setSelectedRoute] = useState<APIRoute | null>(null);
  const [showAddRoute, setShowAddRoute] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // API Routes
  const [apiRoutes, setApiRoutes] = useState<APIRoute[]>([
    {
      id: 'api-1',
      name: 'Get User Profile',
      method: 'GET',
      endpoint: '/api/v1/users/{userId}',
      description: 'Retrieve user profile information by user ID',
      parameters: [
        { name: 'userId', type: 'string', required: true, description: 'Unique user identifier' }
      ],
      headers: [
        { name: 'Authorization', value: 'Bearer {token}', required: true }
      ],
      bodySchema: null,
      authentication: 'bearer',
      rateLimit: {
        enabled: true,
        requestsPerMinute: 60,
        requestsPerHour: 1000,
        requestsPerDay: 10000
      },
      response: {
        statusCode: 200,
        example: {
          id: '12345',
          name: 'John Doe',
          email: 'john@example.com',
          created_at: '2024-01-01T00:00:00Z'
        }
      },
      version: 'v1',
      status: 'active'
    },
    {
      id: 'api-2',
      name: 'Create Project',
      method: 'POST',
      endpoint: '/api/v1/projects',
      description: 'Create a new project',
      parameters: [],
      headers: [
        { name: 'Authorization', value: 'Bearer {token}', required: true },
        { name: 'Content-Type', value: 'application/json', required: true }
      ],
      bodySchema: {
        name: 'string',
        description: 'string',
        type: 'string',
        settings: 'object'
      },
      authentication: 'bearer',
      rateLimit: {
        enabled: true,
        requestsPerMinute: 30,
        requestsPerHour: 500,
        requestsPerDay: 5000
      },
      response: {
        statusCode: 201,
        example: {
          id: 'proj-67890',
          name: 'My Project',
          created_at: '2024-12-04T10:30:00Z'
        }
      },
      version: 'v1',
      status: 'active'
    },
    {
      id: 'api-3',
      name: 'List Templates',
      method: 'GET',
      endpoint: '/api/v1/templates',
      description: 'Get all available templates',
      parameters: [
        { name: 'page', type: 'number', required: false, description: 'Page number', defaultValue: '1' },
        { name: 'limit', type: 'number', required: false, description: 'Items per page', defaultValue: '10' }
      ],
      headers: [
        { name: 'Authorization', value: 'Bearer {token}', required: true }
      ],
      bodySchema: null,
      authentication: 'bearer',
      rateLimit: {
        enabled: true,
        requestsPerMinute: 100,
        requestsPerHour: 2000,
        requestsPerDay: 20000
      },
      response: {
        statusCode: 200,
        example: {
          data: [],
          pagination: { page: 1, limit: 10, total: 50 }
        }
      },
      version: 'v1',
      status: 'active'
    }
  ]);

  // New Route Form State
  const [newRoute, setNewRoute] = useState<Partial<APIRoute>>({
    name: '',
    method: 'GET',
    endpoint: '',
    description: '',
    parameters: [],
    headers: [],
    authentication: 'bearer',
    rateLimit: {
      enabled: true,
      requestsPerMinute: 60,
      requestsPerHour: 1000,
      requestsPerDay: 10000
    },
    version: 'v1',
    status: 'active'
  });

  const methodColors: Record<string, string> = {
    GET: 'from-blue-600 to-cyan-600',
    POST: 'from-green-600 to-emerald-600',
    PUT: 'from-orange-600 to-yellow-600',
    DELETE: 'from-red-600 to-pink-600',
    PATCH: 'from-purple-600 to-indigo-600'
  };

  const handleTestAPI = async (route: APIRoute) => {
    // Simulate API test
    setTestResult({
      loading: true
    });

    setTimeout(() => {
      setTestResult({
        loading: false,
        success: true,
        statusCode: route.response.statusCode,
        responseTime: '145ms',
        data: route.response.example
      });
    }, 1500);
  };

  const handleCreateRoute = () => {
    const route: APIRoute = {
      id: `api-${Date.now()}`,
      name: newRoute.name || 'New API Route',
      method: newRoute.method || 'GET',
      endpoint: newRoute.endpoint || '/api/v1/endpoint',
      description: newRoute.description || '',
      parameters: newRoute.parameters || [],
      headers: newRoute.headers || [],
      bodySchema: newRoute.bodySchema || null,
      authentication: newRoute.authentication || 'bearer',
      rateLimit: newRoute.rateLimit || {
        enabled: true,
        requestsPerMinute: 60,
        requestsPerHour: 1000,
        requestsPerDay: 10000
      },
      response: {
        statusCode: 200,
        example: {}
      },
      version: newRoute.version || 'v1',
      status: 'active'
    };

    setApiRoutes([...apiRoutes, route]);
    setShowAddRoute(false);
    setNewRoute({
      name: '',
      method: 'GET',
      endpoint: '',
      description: '',
      parameters: [],
      headers: [],
      authentication: 'bearer',
      rateLimit: {
        enabled: true,
        requestsPerMinute: 60,
        requestsPerHour: 1000,
        requestsPerDay: 10000
      },
      version: 'v1',
      status: 'active'
    });
  };

  const generateMarkdownDocs = () => {
    let markdown = `# API Documentation\n\n`;
    markdown += `Generated on ${new Date().toLocaleDateString()}\n\n`;
    markdown += `Base URL: \`https://api.devnora.com\`\n\n`;
    markdown += `## Authentication\n\nAll API requests require authentication using Bearer tokens.\n\n`;
    markdown += `\`\`\`\nAuthorization: Bearer YOUR_API_KEY\n\`\`\`\n\n`;
    markdown += `## Endpoints\n\n`;

    apiRoutes.forEach(route => {
      markdown += `### ${route.method} ${route.endpoint}\n\n`;
      markdown += `${route.description}\n\n`;
      
      if (route.parameters.length > 0) {
        markdown += `**Parameters:**\n\n`;
        route.parameters.forEach(param => {
          markdown += `- \`${param.name}\` (${param.type}${param.required ? ', required' : ', optional'}): ${param.description}\n`;
        });
        markdown += `\n`;
      }

      markdown += `**Response Example:**\n\n`;
      markdown += `\`\`\`json\n${JSON.stringify(route.response.example, null, 2)}\n\`\`\`\n\n`;
      
      if (route.rateLimit.enabled) {
        markdown += `**Rate Limits:**\n`;
        markdown += `- ${route.rateLimit.requestsPerMinute} requests/minute\n`;
        markdown += `- ${route.rateLimit.requestsPerHour} requests/hour\n`;
        markdown += `- ${route.rateLimit.requestsPerDay} requests/day\n\n`;
      }

      markdown += `---\n\n`;
    });

    return markdown;
  };

  const handleExportDocs = (format: 'markdown' | 'json') => {
    if (format === 'markdown') {
      const markdown = generateMarkdownDocs();
      const blob = new Blob([markdown], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'api-documentation.md';
      a.click();
      URL.revokeObjectURL(url);
    } else {
      const json = JSON.stringify(apiRoutes, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'api-routes.json';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2 text-slate-900">API Platform</h1>
          <p className="text-slate-600">Build, document, and manage your custom API routes</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => handleExportDocs('markdown')}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl transition-colors"
          >
            <Download className="w-4 h-4" />
            Export Docs
          </button>
          <button
            onClick={() => setShowAddRoute(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl transition-all"
          >
            <Plus className="w-5 h-5" />
            Create API Route
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('builder')}
          className={`px-6 py-3 border-b-2 transition-all ${
            activeTab === 'builder'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            API Builder
          </div>
        </button>
        <button
          onClick={() => setActiveTab('documentation')}
          className={`px-6 py-3 border-b-2 transition-all ${
            activeTab === 'documentation'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <Book className="w-5 h-5" />
            Documentation
          </div>
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-6 py-3 border-b-2 transition-all ${
            activeTab === 'analytics'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Analytics
          </div>
        </button>
      </div>

      {/* API Builder Tab */}
      {activeTab === 'builder' && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Routes List */}
          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-slate-200 bg-slate-50">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search API routes..."
                    className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="divide-y divide-slate-200 max-h-[600px] overflow-y-auto">
                {apiRoutes.map((route) => (
                  <div
                    key={route.id}
                    onClick={() => setSelectedRoute(route)}
                    className={`p-4 cursor-pointer transition-colors ${
                      selectedRoute?.id === route.id ? 'bg-blue-50 border-l-4 border-blue-600' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 bg-gradient-to-r ${methodColors[route.method]} text-white text-xs rounded-lg`}>
                          {route.method}
                        </span>
                        <div>
                          <div className="text-slate-900">{route.name}</div>
                          <div className="text-xs text-slate-600 font-mono mt-1">{route.endpoint}</div>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded ${
                        route.status === 'active' ? 'bg-green-100 text-green-700' :
                        route.status === 'inactive' ? 'bg-slate-100 text-slate-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {route.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{route.description}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        {route.authentication}
                      </span>
                      {route.rateLimit.enabled && (
                        <span className="flex items-center gap-1">
                          <Gauge className="w-3 h-3" />
                          {route.rateLimit.requestsPerMinute}/min
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Code className="w-3 h-3" />
                        {route.version}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Route Details */}
          <div className="space-y-4">
            {selectedRoute ? (
              <>
                {/* Route Info */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl text-slate-900">{selectedRoute.name}</h3>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                        <Edit className="w-4 h-4 text-slate-600" />
                      </button>
                      <button className="p-2 hover:bg-red-100 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-slate-700 mb-2">Endpoint</label>
                      <div className="flex gap-2">
                        <span className={`px-4 py-2 bg-gradient-to-r ${methodColors[selectedRoute.method]} text-white rounded-lg`}>
                          {selectedRoute.method}
                        </span>
                        <input
                          type="text"
                          value={selectedRoute.endpoint}
                          readOnly
                          className="flex-1 px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono"
                        />
                        <button
                          onClick={() => copyToClipboard(selectedRoute.endpoint)}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors"
                        >
                          <Copy className="w-4 h-4 text-slate-600" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-slate-700 mb-2">Description</label>
                      <p className="text-slate-600">{selectedRoute.description}</p>
                    </div>

                    <div>
                      <label className="block text-sm text-slate-700 mb-2">Authentication</label>
                      <select
                        value={selectedRoute.authentication}
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 outline-none focus:border-blue-500"
                      >
                        <option value="none">None</option>
                        <option value="api-key">API Key</option>
                        <option value="bearer">Bearer Token</option>
                        <option value="oauth">OAuth 2.0</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Parameters */}
                {selectedRoute.parameters.length > 0 && (
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                    <div className="p-4 border-b border-slate-200 bg-slate-50">
                      <h4 className="text-slate-900">Parameters</h4>
                    </div>
                    <div className="divide-y divide-slate-200">
                      {selectedRoute.parameters.map((param, i) => (
                        <div key={i} className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <code className="px-2 py-1 bg-slate-100 text-blue-600 text-sm rounded">{param.name}</code>
                              <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded">{param.type}</span>
                              {param.required && (
                                <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded">required</span>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-slate-600">{param.description}</p>
                          {param.defaultValue && (
                            <p className="text-xs text-slate-500 mt-1">Default: {param.defaultValue}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Rate Limiting */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-slate-900 flex items-center gap-2">
                      <Gauge className="w-5 h-5 text-blue-600" />
                      Rate Limiting
                    </h4>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedRoute.rateLimit.enabled}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {selectedRoute.rateLimit.enabled && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-slate-700 mb-2">Requests per Minute</label>
                        <input
                          type="number"
                          value={selectedRoute.rateLimit.requestsPerMinute}
                          className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-700 mb-2">Requests per Hour</label>
                        <input
                          type="number"
                          value={selectedRoute.rateLimit.requestsPerHour}
                          className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-700 mb-2">Requests per Day</label>
                        <input
                          type="number"
                          value={selectedRoute.rateLimit.requestsPerDay}
                          className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Test API */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6">
                  <h4 className="text-slate-900 mb-4 flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-green-600" />
                    Test API Route
                  </h4>
                  
                  <button
                    onClick={() => handleTestAPI(selectedRoute)}
                    className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-xl transition-all flex items-center justify-center gap-2 mb-4"
                  >
                    <Send className="w-5 h-5" />
                    Send Test Request
                  </button>

                  {testResult && (
                    <div className="mt-4">
                      {testResult.loading ? (
                        <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                          <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
                          <span className="text-blue-700">Sending request...</span>
                        </div>
                      ) : testResult.success ? (
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <div className="flex-1">
                              <div className="text-green-700">Success</div>
                              <div className="text-xs text-green-600">Status: {testResult.statusCode} • Response Time: {testResult.responseTime}</div>
                            </div>
                          </div>
                          <div className="bg-slate-950 rounded-lg p-4 overflow-x-auto">
                            <pre className="text-xs text-green-400 font-mono">
                              {JSON.stringify(testResult.data, null, 2)}
                            </pre>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
                <Code className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl text-slate-400 mb-2">Select an API Route</h3>
                <p className="text-slate-500">Choose a route from the list to view and configure details</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Documentation Tab */}
      {activeTab === 'documentation' && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Documentation Preview */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-purple-50">
                <h2 className="text-2xl text-slate-900 mb-2">API Documentation</h2>
                <p className="text-slate-600">Auto-generated documentation for all API routes</p>
              </div>

              <div className="p-6 space-y-8">
                {/* Getting Started */}
                <div>
                  <h3 className="text-xl text-slate-900 mb-4">Getting Started</h3>
                  <div className="bg-slate-50 rounded-lg p-4 mb-4">
                    <div className="text-sm text-slate-700 mb-2">Base URL:</div>
                    <code className="text-blue-600 font-mono">https://api.devnora.com</code>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-sm text-slate-700 mb-2">Authentication:</div>
                    <code className="text-blue-600 font-mono block">Authorization: Bearer YOUR_API_KEY</code>
                  </div>
                </div>

                {/* Endpoints */}
                {apiRoutes.map((route) => (
                  <div key={route.id} className="border-l-4 border-blue-600 pl-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 bg-gradient-to-r ${methodColors[route.method]} text-white text-sm rounded-lg`}>
                        {route.method}
                      </span>
                      <code className="text-lg text-slate-900 font-mono">{route.endpoint}</code>
                    </div>

                    <p className="text-slate-600 mb-4">{route.description}</p>

                    {route.parameters.length > 0 && (
                      <div className="mb-4">
                        <h5 className="text-sm text-slate-900 mb-2">Parameters:</h5>
                        <div className="space-y-2">
                          {route.parameters.map((param, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm">
                              <code className="px-2 py-1 bg-slate-100 text-blue-600 rounded">{param.name}</code>
                              <span className="text-slate-600">({param.type}{param.required ? ', required' : ', optional'})</span>
                              <span className="text-slate-500">- {param.description}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mb-4">
                      <h5 className="text-sm text-slate-900 mb-2">Response Example:</h5>
                      <div className="bg-slate-950 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-xs text-green-400 font-mono">
                          {JSON.stringify(route.response.example, null, 2)}
                        </pre>
                      </div>
                    </div>

                    {route.rateLimit.enabled && (
                      <div className="text-sm text-slate-600">
                        <strong>Rate Limits:</strong> {route.rateLimit.requestsPerMinute} req/min, {route.rateLimit.requestsPerHour} req/hour
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Export Options */}
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h4 className="text-lg text-slate-900 mb-4">Export Documentation</h4>
              <div className="space-y-3">
                <button
                  onClick={() => handleExportDocs('markdown')}
                  className="w-full flex items-center gap-3 p-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
                >
                  <FileText className="w-6 h-6 text-blue-600" />
                  <div className="flex-1 text-left">
                    <div className="text-slate-900">Markdown</div>
                    <div className="text-xs text-slate-600">Download as .md file</div>
                  </div>
                  <Download className="w-5 h-5 text-slate-400" />
                </button>

                <button
                  onClick={() => handleExportDocs('json')}
                  className="w-full flex items-center gap-3 p-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
                >
                  <FileCode className="w-6 h-6 text-green-600" />
                  <div className="flex-1 text-left">
                    <div className="text-slate-900">JSON</div>
                    <div className="text-xs text-slate-600">Download API spec</div>
                  </div>
                  <Download className="w-5 h-5 text-slate-400" />
                </button>

                <button className="w-full flex items-center gap-3 p-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors">
                  <Book className="w-6 h-6 text-purple-600" />
                  <div className="flex-1 text-left">
                    <div className="text-slate-900">PDF</div>
                    <div className="text-xs text-slate-600">Print-ready format</div>
                  </div>
                  <Download className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6">
              <Info className="w-6 h-6 text-blue-600 mb-3" />
              <h4 className="text-slate-900 mb-2">Auto-Generated</h4>
              <p className="text-sm text-slate-600">
                Documentation is automatically generated from your API routes. Update routes to see changes reflected here.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-xs text-green-600">+24%</span>
              </div>
              <div className="text-2xl text-slate-900 mb-1">1.2M</div>
              <div className="text-sm text-slate-600">Total Requests</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-xs text-green-600">99.8%</span>
              </div>
              <div className="text-2xl text-slate-900 mb-1">98.9%</div>
              <div className="text-sm text-slate-600">Success Rate</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-xs text-green-600">-12ms</span>
              </div>
              <div className="text-2xl text-slate-900 mb-1">145ms</div>
              <div className="text-sm text-slate-600">Avg Response</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-xs text-green-600">+156</span>
              </div>
              <div className="text-2xl text-slate-900 mb-1">8,234</div>
              <div className="text-sm text-slate-600">Active Users</div>
            </div>
          </div>

          {/* Most Used Endpoints */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h3 className="text-xl text-slate-900">Most Used Endpoints</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm text-slate-700">Endpoint</th>
                    <th className="px-6 py-4 text-left text-sm text-slate-700">Method</th>
                    <th className="px-6 py-4 text-left text-sm text-slate-700">Requests</th>
                    <th className="px-6 py-4 text-left text-sm text-slate-700">Success Rate</th>
                    <th className="px-6 py-4 text-left text-sm text-slate-700">Avg Response</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {apiRoutes.map((route) => (
                    <tr key={route.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm text-slate-900 font-mono">{route.endpoint}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 bg-gradient-to-r ${methodColors[route.method]} text-white text-xs rounded`}>
                          {route.method}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {Math.floor(Math.random() * 100000).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-green-600">
                        {(98 + Math.random() * 2).toFixed(1)}%
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {Math.floor(100 + Math.random() * 200)}ms
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Create Route Modal */}
      {showAddRoute && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="text-xl text-slate-900">Create New API Route</h3>
              <button
                onClick={() => setShowAddRoute(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-slate-700 mb-2">Route Name *</label>
                <input
                  type="text"
                  value={newRoute.name}
                  onChange={(e) => setNewRoute({ ...newRoute, name: e.target.value })}
                  placeholder="e.g., Get User Profile"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-700 mb-2">Method *</label>
                  <select
                    value={newRoute.method}
                    onChange={(e) => setNewRoute({ ...newRoute, method: e.target.value as any })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-blue-500"
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                    <option value="PATCH">PATCH</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-slate-700 mb-2">Version</label>
                  <input
                    type="text"
                    value={newRoute.version}
                    onChange={(e) => setNewRoute({ ...newRoute, version: e.target.value })}
                    placeholder="v1"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2">Endpoint *</label>
                <input
                  type="text"
                  value={newRoute.endpoint}
                  onChange={(e) => setNewRoute({ ...newRoute, endpoint: e.target.value })}
                  placeholder="/api/v1/users/{id}"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2">Description</label>
                <textarea
                  value={newRoute.description}
                  onChange={(e) => setNewRoute({ ...newRoute, description: e.target.value })}
                  rows={3}
                  placeholder="Describe what this endpoint does..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2">Authentication</label>
                <select
                  value={newRoute.authentication}
                  onChange={(e) => setNewRoute({ ...newRoute, authentication: e.target.value as any })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-blue-500"
                >
                  <option value="none">None</option>
                  <option value="api-key">API Key</option>
                  <option value="bearer">Bearer Token</option>
                  <option value="oauth">OAuth 2.0</option>
                </select>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <h4 className="text-slate-900 mb-3">Rate Limiting</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-slate-700 mb-2">Per Minute</label>
                    <input
                      type="number"
                      value={newRoute.rateLimit?.requestsPerMinute}
                      onChange={(e) => setNewRoute({
                        ...newRoute,
                        rateLimit: { ...newRoute.rateLimit!, requestsPerMinute: parseInt(e.target.value) }
                      })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-700 mb-2">Per Hour</label>
                    <input
                      type="number"
                      value={newRoute.rateLimit?.requestsPerHour}
                      onChange={(e) => setNewRoute({
                        ...newRoute,
                        rateLimit: { ...newRoute.rateLimit!, requestsPerHour: parseInt(e.target.value) }
                      })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-700 mb-2">Per Day</label>
                    <input
                      type="number"
                      value={newRoute.rateLimit?.requestsPerDay}
                      onChange={(e) => setNewRoute({
                        ...newRoute,
                        rateLimit: { ...newRoute.rateLimit!, requestsPerDay: parseInt(e.target.value) }
                      })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 flex gap-3 sticky bottom-0 bg-white">
              <button
                onClick={() => setShowAddRoute(false)}
                className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateRoute}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl transition-all"
              >
                Create Route
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
