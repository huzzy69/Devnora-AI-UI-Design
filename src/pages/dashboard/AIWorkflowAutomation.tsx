import React, { useState } from 'react';
import { 
  Zap, Plus, Play, Pause, Trash2, Edit2, Copy, Check, Clock, Calendar,
  Mail, MessageSquare, Database, FileText, Users, Bell, Send, Upload,
  Download, Settings, TrendingUp, Activity, BarChart3, ArrowRight,
  CheckCircle, XCircle, AlertCircle, ChevronDown, ChevronUp, Filter,
  Search, MoreVertical, Save, X as CloseIcon, Sparkles, Workflow,
  GitBranch, Repeat, Share2, Globe, Code, Webhook, Key, Link2,
  MousePointer, Layers, Box, Circle, Square, Triangle
} from 'lucide-react';

interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: 'marketing' | 'sales' | 'support' | 'operations' | 'development';
  icon: any;
  triggers: string[];
  actions: string[];
  popular: boolean;
}

interface Workflow {
  id: string;
  name: string;
  template: string;
  status: 'active' | 'paused' | 'draft';
  trigger: {
    type: string;
    config: any;
  };
  actions: {
    type: string;
    config: any;
  }[];
  executions: number;
  lastRun?: string;
  successRate: number;
}

export default function AIWorkflowAutomation() {
  const [activeTab, setActiveTab] = useState<'workflows' | 'templates' | 'analytics' | 'settings'>('workflows');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<WorkflowTemplate | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [workflowFilter, setWorkflowFilter] = useState<'all' | 'active' | 'paused' | 'draft'>('all');

  // Workflow Templates
  const templates: WorkflowTemplate[] = [
    {
      id: 'temp_001',
      name: 'Welcome New Users',
      description: 'Send welcome email and setup account when a new user signs up',
      category: 'marketing',
      icon: Mail,
      triggers: ['New user registration'],
      actions: ['Send welcome email', 'Create user profile', 'Add to mailing list'],
      popular: true,
    },
    {
      id: 'temp_002',
      name: 'Lead Nurturing Campaign',
      description: 'Automatically follow up with leads based on their activity',
      category: 'sales',
      icon: TrendingUp,
      triggers: ['Lead form submission'],
      actions: ['Send intro email', 'Wait 2 days', 'Send follow-up', 'Notify sales team'],
      popular: true,
    },
    {
      id: 'temp_003',
      name: 'Support Ticket Auto-Response',
      description: 'Automatically respond to support tickets and route to agents',
      category: 'support',
      icon: MessageSquare,
      triggers: ['New support ticket'],
      actions: ['Send acknowledgment', 'Categorize ticket', 'Route to agent', 'Set priority'],
      popular: false,
    },
    {
      id: 'temp_004',
      name: 'Invoice Payment Reminder',
      description: 'Send automated reminders for unpaid invoices',
      category: 'operations',
      icon: FileText,
      triggers: ['Invoice due date approaching'],
      actions: ['Send reminder email', 'Update invoice status', 'Notify accounting'],
      popular: true,
    },
    {
      id: 'temp_005',
      name: 'Code Deployment Pipeline',
      description: 'Automatically deploy code when pushed to main branch',
      category: 'development',
      icon: GitBranch,
      triggers: ['Git push to main'],
      actions: ['Run tests', 'Build project', 'Deploy to staging', 'Notify team'],
      popular: false,
    },
    {
      id: 'temp_006',
      name: 'Abandoned Cart Recovery',
      description: 'Re-engage customers who abandoned their shopping cart',
      category: 'sales',
      icon: Send,
      triggers: ['Cart abandoned for 1 hour'],
      actions: ['Send reminder email', 'Offer discount code', 'Track engagement'],
      popular: true,
    },
    {
      id: 'temp_007',
      name: 'Team Task Assignment',
      description: 'Automatically assign tasks to team members based on workload',
      category: 'operations',
      icon: Users,
      triggers: ['New task created'],
      actions: ['Check team availability', 'Assign to member', 'Send notification', 'Set deadline'],
      popular: false,
    },
    {
      id: 'temp_008',
      name: 'Social Media Post Scheduler',
      description: 'Schedule and auto-post content to social media platforms',
      category: 'marketing',
      icon: Globe,
      triggers: ['Scheduled time'],
      actions: ['Post to Twitter', 'Post to LinkedIn', 'Post to Facebook', 'Track engagement'],
      popular: true,
    },
  ];

  // User Workflows
  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: 'wf_001',
      name: 'New User Onboarding',
      template: 'Welcome New Users',
      status: 'active',
      trigger: { type: 'User Registration', config: {} },
      actions: [
        { type: 'Send Email', config: { template: 'welcome' } },
        { type: 'Create Profile', config: {} },
        { type: 'Add to List', config: { list: 'new-users' } },
      ],
      executions: 1247,
      lastRun: '5 minutes ago',
      successRate: 98.5,
    },
    {
      id: 'wf_002',
      name: 'Sales Lead Follow-up',
      template: 'Lead Nurturing Campaign',
      status: 'active',
      trigger: { type: 'Form Submission', config: { form: 'contact' } },
      actions: [
        { type: 'Send Email', config: { template: 'intro' } },
        { type: 'Wait', config: { duration: '2 days' } },
        { type: 'Send Email', config: { template: 'follow-up' } },
        { type: 'Notify Team', config: { channel: 'sales' } },
      ],
      executions: 834,
      lastRun: '15 minutes ago',
      successRate: 92.3,
    },
    {
      id: 'wf_003',
      name: 'Support Ticket Handler',
      template: 'Support Ticket Auto-Response',
      status: 'active',
      trigger: { type: 'New Ticket', config: {} },
      actions: [
        { type: 'Send Response', config: { template: 'acknowledgment' } },
        { type: 'Categorize', config: {} },
        { type: 'Route to Agent', config: {} },
      ],
      executions: 2156,
      lastRun: '2 minutes ago',
      successRate: 99.1,
    },
    {
      id: 'wf_004',
      name: 'Invoice Reminder System',
      template: 'Invoice Payment Reminder',
      status: 'paused',
      trigger: { type: 'Invoice Due Date', config: { days_before: 3 } },
      actions: [
        { type: 'Send Reminder', config: {} },
        { type: 'Update Status', config: {} },
      ],
      executions: 456,
      lastRun: '2 days ago',
      successRate: 87.4,
    },
    {
      id: 'wf_005',
      name: 'Cart Recovery Campaign',
      template: 'Abandoned Cart Recovery',
      status: 'draft',
      trigger: { type: 'Cart Abandoned', config: { hours: 1 } },
      actions: [
        { type: 'Send Email', config: { template: 'cart-reminder' } },
        { type: 'Apply Discount', config: { percentage: 10 } },
      ],
      executions: 0,
      successRate: 0,
    },
  ]);

  const categories = [
    { id: 'all', label: 'All Templates', color: 'blue' },
    { id: 'marketing', label: 'Marketing', color: 'purple' },
    { id: 'sales', label: 'Sales', color: 'green' },
    { id: 'support', label: 'Support', color: 'orange' },
    { id: 'operations', label: 'Operations', color: 'blue' },
    { id: 'development', label: 'Development', color: 'pink' },
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredWorkflows = workflows.filter(workflow => {
    return workflowFilter === 'all' || workflow.status === workflowFilter;
  });

  const handleCreateFromTemplate = (template: WorkflowTemplate) => {
    setSelectedTemplate(template);
    setShowTemplateModal(true);
  };

  const handleToggleWorkflow = (id: string) => {
    setWorkflows(workflows.map(wf => 
      wf.id === id 
        ? { ...wf, status: wf.status === 'active' ? 'paused' : 'active' as any }
        : wf
    ));
  };

  const handleDeleteWorkflow = (id: string) => {
    if (confirm('Are you sure you want to delete this workflow?')) {
      setWorkflows(workflows.filter(wf => wf.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl text-slate-900 mb-2">AI Workflow Automation</h1>
            <p className="text-slate-600">Automate your business processes with intelligent workflows</p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl flex items-center gap-2 transition-all shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Create Workflow
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Active Workflows', value: workflows.filter(w => w.status === 'active').length.toString(), icon: Zap, color: 'green' },
            { label: 'Total Executions', value: workflows.reduce((acc, w) => acc + w.executions, 0).toLocaleString(), icon: Activity, color: 'blue' },
            { label: 'Success Rate', value: '95.8%', icon: CheckCircle, color: 'purple' },
            { label: 'Time Saved', value: '142 hrs', icon: Clock, color: 'orange' },
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
            { id: 'workflows', label: 'My Workflows', icon: Workflow },
            { id: 'templates', label: 'Templates', icon: Layers },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
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

        {/* My Workflows Tab */}
        {activeTab === 'workflows' && (
          <div className="space-y-6">
            {/* Filter */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-600">Filter:</span>
                <div className="flex gap-2">
                  {['all', 'active', 'paused', 'draft'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setWorkflowFilter(filter as any)}
                      className={`px-4 py-2 rounded-lg text-sm capitalize transition-colors ${
                        workflowFilter === filter
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Workflows List */}
            <div className="grid grid-cols-2 gap-6">
              {filteredWorkflows.map((workflow) => (
                <div key={workflow.id} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        workflow.status === 'active' ? 'bg-green-100' :
                        workflow.status === 'paused' ? 'bg-orange-100' : 'bg-slate-100'
                      }`}>
                        <Zap className={`w-6 h-6 ${
                          workflow.status === 'active' ? 'text-green-600' :
                          workflow.status === 'paused' ? 'text-orange-600' : 'text-slate-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg text-slate-900">{workflow.name}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs capitalize ${
                            workflow.status === 'active' ? 'bg-green-100 text-green-700' :
                            workflow.status === 'paused' ? 'bg-orange-100 text-orange-700' :
                            'bg-slate-100 text-slate-600'
                          }`}>
                            {workflow.status}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mb-3">Based on: {workflow.template}</p>

                        {/* Trigger */}
                        <div className="mb-3">
                          <div className="text-xs text-slate-500 mb-1">Trigger:</div>
                          <div className="px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
                            {workflow.trigger.type}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="mb-4">
                          <div className="text-xs text-slate-500 mb-1">Actions ({workflow.actions.length}):</div>
                          <div className="flex flex-wrap gap-2">
                            {workflow.actions.slice(0, 3).map((action, i) => (
                              <span key={i} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                                {action.type}
                              </span>
                            ))}
                            {workflow.actions.length > 3 && (
                              <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">
                                +{workflow.actions.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-3 mb-4">
                          <div className="p-2 bg-slate-50 rounded-lg">
                            <div className="text-xs text-slate-500">Executions</div>
                            <div className="text-sm text-slate-900">{workflow.executions.toLocaleString()}</div>
                          </div>
                          <div className="p-2 bg-slate-50 rounded-lg">
                            <div className="text-xs text-slate-500">Success Rate</div>
                            <div className="text-sm text-green-600">{workflow.successRate}%</div>
                          </div>
                          <div className="p-2 bg-slate-50 rounded-lg">
                            <div className="text-xs text-slate-500">Last Run</div>
                            <div className="text-sm text-slate-900">{workflow.lastRun || 'Never'}</div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleToggleWorkflow(workflow.id)}
                            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                              workflow.status === 'active'
                                ? 'bg-orange-100 hover:bg-orange-200 text-orange-700'
                                : 'bg-green-100 hover:bg-green-200 text-green-700'
                            }`}
                          >
                            {workflow.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            {workflow.status === 'active' ? 'Pause' : 'Activate'}
                          </button>
                          <button className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg flex items-center gap-2 transition-colors">
                            <Edit2 className="w-4 h-4" />
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteWorkflow(workflow.id)}
                            className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredWorkflows.length === 0 && (
                <div className="col-span-2 bg-white border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center">
                  <Workflow className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg text-slate-900 mb-2">No workflows found</h3>
                  <p className="text-slate-600 mb-6">Create your first workflow to get started</p>
                  <button 
                    onClick={() => setShowCreateModal(true)}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl inline-flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Create Workflow
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div className="space-y-6">
            {/* Search & Filter */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search templates..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === category.id
                        ? `bg-${category.color}-600 text-white`
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Templates */}
            {selectedCategory === 'all' && (
              <div>
                <h2 className="text-xl text-slate-900 mb-4 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-yellow-500" />
                  Popular Templates
                </h2>
                <div className="grid grid-cols-3 gap-6 mb-8">
                  {templates.filter(t => t.popular).map((template) => (
                    <div key={template.id} className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer"
                      onClick={() => handleCreateFromTemplate(template)}
                    >
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                        <template.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="text-lg text-slate-900 mb-2">{template.name}</h3>
                      <p className="text-sm text-slate-600 mb-4">{template.description}</p>
                      <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center justify-center gap-2 transition-colors">
                        <Plus className="w-4 h-4" />
                        Use Template
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* All Templates */}
            <div>
              <h2 className="text-xl text-slate-900 mb-4">
                {selectedCategory === 'all' ? 'All Templates' : `${categories.find(c => c.id === selectedCategory)?.label} Templates`}
              </h2>
              <div className="grid grid-cols-3 gap-6">
                {filteredTemplates.map((template) => (
                  <div key={template.id} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 bg-${template.category === 'marketing' ? 'purple' : template.category === 'sales' ? 'green' : template.category === 'support' ? 'orange' : template.category === 'operations' ? 'blue' : 'pink'}-100 rounded-xl flex items-center justify-center`}>
                        <template.icon className={`w-6 h-6 text-${template.category === 'marketing' ? 'purple' : template.category === 'sales' ? 'green' : template.category === 'support' ? 'orange' : template.category === 'operations' ? 'blue' : 'pink'}-600`} />
                      </div>
                      {template.popular && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          Popular
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg text-slate-900 mb-2">{template.name}</h3>
                    <p className="text-sm text-slate-600 mb-4">{template.description}</p>
                    
                    <div className="mb-4">
                      <div className="text-xs text-slate-500 mb-2">Includes:</div>
                      <div className="space-y-1">
                        {template.triggers.map((trigger, i) => (
                          <div key={i} className="text-xs text-slate-700 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                            Trigger: {trigger}
                          </div>
                        ))}
                        <div className="text-xs text-slate-700 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                          {template.actions.length} actions
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleCreateFromTemplate(template)}
                      className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Use Template
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Execution Trends */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h2 className="text-xl text-slate-900 mb-6">Execution Trends (Last 7 Days)</h2>
              <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-slate-200">
                {[
                  { day: 'Mon', executions: 420 },
                  { day: 'Tue', executions: 580 },
                  { day: 'Wed', executions: 690 },
                  { day: 'Thu', executions: 520 },
                  { day: 'Fri', executions: 780 },
                  { day: 'Sat', executions: 340 },
                  { day: 'Sun', executions: 290 },
                ].map((data, i) => (
                  <div key={i} className="flex items-center gap-4 mb-3">
                    <div className="w-12 text-sm text-slate-600">{data.day}</div>
                    <div className="flex-1 h-8 bg-slate-200 rounded-lg overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-end px-3 text-white text-sm"
                        style={{ width: `${(data.executions / 800) * 100}%` }}
                      >
                        {data.executions}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Performing Workflows */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-xl text-slate-900">Top Performing Workflows</h2>
              </div>
              <div className="divide-y divide-slate-200">
                {workflows
                  .filter(w => w.status === 'active')
                  .sort((a, b) => b.executions - a.executions)
                  .map((workflow, i) => (
                    <div key={workflow.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl text-slate-400">#{i + 1}</div>
                        <div>
                          <h4 className="text-slate-900">{workflow.name}</h4>
                          <p className="text-sm text-slate-600">{workflow.executions.toLocaleString()} executions</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm text-slate-600">Success Rate</div>
                          <div className="text-lg text-green-600">{workflow.successRate}%</div>
                        </div>
                        <div className="w-16 h-16">
                          <div className="relative w-full h-full">
                            <svg className="w-full h-full transform -rotate-90">
                              <circle cx="32" cy="32" r="28" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                              <circle 
                                cx="32" 
                                cy="32" 
                                r="28" 
                                fill="none" 
                                stroke="#10b981" 
                                strokeWidth="8" 
                                strokeDasharray={`${workflow.successRate * 1.76} 176`}
                                strokeLinecap="round"
                              />
                            </svg>
                          </div>
                        </div>
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
              <h2 className="text-xl text-slate-900 mb-6">Workflow Settings</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm text-slate-700 mb-4">Execution Settings</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-slate-900">Retry failed actions automatically</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-slate-900">Send email notifications on workflow failures</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-slate-900">Enable debug logging</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-700 mb-2">Maximum retry attempts</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>3 attempts</option>
                    <option>5 attempts</option>
                    <option>10 attempts</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-slate-700 mb-2">Retry delay</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>30 seconds</option>
                    <option>1 minute</option>
                    <option>5 minutes</option>
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

      {/* Create Workflow Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-2xl text-slate-900">Create New Workflow</h2>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <CloseIcon className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button 
                  onClick={() => {
                    setShowCreateModal(false);
                    setActiveTab('templates');
                  }}
                  className="p-6 border-2 border-slate-200 hover:border-blue-500 rounded-2xl text-left transition-all"
                >
                  <Layers className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-lg text-slate-900 mb-2">Start from Template</h3>
                  <p className="text-sm text-slate-600">Choose from pre-built workflow templates</p>
                </button>

                <button className="p-6 border-2 border-slate-200 hover:border-purple-500 rounded-2xl text-left transition-all">
                  <Sparkles className="w-12 h-12 text-purple-600 mb-4" />
                  <h3 className="text-lg text-slate-900 mb-2">Build from Scratch</h3>
                  <p className="text-sm text-slate-600">Create a custom workflow step by step</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Template Modal */}
      {showTemplateModal && selectedTemplate && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-2xl text-slate-900">{selectedTemplate.name}</h2>
              <button 
                onClick={() => setShowTemplateModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <CloseIcon className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm text-slate-700 mb-2">Workflow Name *</label>
                <input
                  type="text"
                  defaultValue={selectedTemplate.name}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <h4 className="text-sm text-blue-900 mb-3">This workflow includes:</h4>
                <div className="space-y-2">
                  <div className="text-sm text-blue-800">
                    <strong>Trigger:</strong> {selectedTemplate.triggers.join(', ')}
                  </div>
                  <div className="text-sm text-blue-800">
                    <strong>Actions:</strong>
                    <ul className="list-disc list-inside ml-4 mt-1">
                      {selectedTemplate.actions.map((action, i) => (
                        <li key={i}>{action}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowTemplateModal(false)}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Workflow created successfully!');
                  setShowTemplateModal(false);
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl transition-all flex items-center gap-2"
              >
                <Check className="w-5 h-5" />
                Create Workflow
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
