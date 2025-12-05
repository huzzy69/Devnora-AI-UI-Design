import React, { useState } from 'react';
import { 
  Phone, Mic, PhoneCall, PhoneIncoming, PhoneOutgoing, Play, Pause, 
  Download, Trash2, Settings, Plus, Volume2, Clock, Calendar, User,
  MessageSquare, TrendingUp, Activity, Zap, Edit2, Copy, Check,
  AlertCircle, CheckCircle, XCircle, Search, Filter, MoreVertical,
  Upload, FileText, BarChart3, Users, Globe, Signal, Wifi, Save,
  X as CloseIcon, ChevronDown, ChevronUp, ChevronRight, Headphones,
  Radio, Circle, Square, Triangle, Webhook, Key, Link, Code
} from 'lucide-react';

interface CallRecord {
  id: string;
  type: 'inbound' | 'outbound';
  from: string;
  to: string;
  duration: string;
  status: 'completed' | 'missed' | 'failed' | 'in-progress';
  timestamp: string;
  recordingUrl?: string;
  transcriptId?: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
  cost: string;
}

interface Transcript {
  id: string;
  callId: string;
  text: string;
  speaker: 'agent' | 'customer';
  timestamp: string;
  confidence: number;
}

interface VoiceWorkflow {
  id: string;
  name: string;
  trigger: string;
  actions: string[];
  status: 'active' | 'paused';
  executionCount: number;
  lastRun?: string;
}

export default function VoiceAIModule() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'calls' | 'transcripts' | 'workflows' | 'settings'>('dashboard');
  const [showCallModal, setShowCallModal] = useState(false);
  const [showWebhookModal, setShowWebhookModal] = useState(false);
  const [showWorkflowModal, setShowWorkflowModal] = useState(false);
  const [selectedCall, setSelectedCall] = useState<CallRecord | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [callType, setCallType] = useState<'all' | 'inbound' | 'outbound'>('all');

  // Sample call records
  const callRecords: CallRecord[] = [
    {
      id: 'call_001',
      type: 'inbound',
      from: '+1 (555) 123-4567',
      to: '+1 (555) 987-6543',
      duration: '5m 32s',
      status: 'completed',
      timestamp: '2025-12-05 14:23:15',
      recordingUrl: '/recordings/call_001.mp3',
      transcriptId: 'trans_001',
      sentiment: 'positive',
      cost: '$0.12',
    },
    {
      id: 'call_002',
      type: 'outbound',
      from: '+1 (555) 987-6543',
      to: '+1 (555) 234-5678',
      duration: '2m 18s',
      status: 'completed',
      timestamp: '2025-12-05 13:45:22',
      recordingUrl: '/recordings/call_002.mp3',
      transcriptId: 'trans_002',
      sentiment: 'neutral',
      cost: '$0.08',
    },
    {
      id: 'call_003',
      type: 'inbound',
      from: '+1 (555) 345-6789',
      to: '+1 (555) 987-6543',
      duration: '0m 00s',
      status: 'missed',
      timestamp: '2025-12-05 12:30:45',
      sentiment: 'neutral',
      cost: '$0.00',
    },
    {
      id: 'call_004',
      type: 'outbound',
      from: '+1 (555) 987-6543',
      to: '+1 (555) 456-7890',
      duration: '8m 45s',
      status: 'completed',
      timestamp: '2025-12-05 11:15:30',
      recordingUrl: '/recordings/call_004.mp3',
      transcriptId: 'trans_004',
      sentiment: 'positive',
      cost: '$0.18',
    },
    {
      id: 'call_005',
      type: 'inbound',
      from: '+1 (555) 567-8901',
      to: '+1 (555) 987-6543',
      duration: '1m 12s',
      status: 'failed',
      timestamp: '2025-12-05 10:22:18',
      sentiment: 'negative',
      cost: '$0.03',
    },
  ];

  // Sample transcripts
  const transcripts: { [key: string]: Transcript[] } = {
    trans_001: [
      { id: 't1', callId: 'call_001', text: 'Hello, thank you for calling. How can I help you today?', speaker: 'agent', timestamp: '00:00:02', confidence: 0.98 },
      { id: 't2', callId: 'call_001', text: 'Hi, I have a question about my recent order.', speaker: 'customer', timestamp: '00:00:05', confidence: 0.95 },
      { id: 't3', callId: 'call_001', text: 'Of course! I\'d be happy to help. Can you provide your order number?', speaker: 'agent', timestamp: '00:00:08', confidence: 0.97 },
      { id: 't4', callId: 'call_001', text: 'Yes, it\'s DVN-12345.', speaker: 'customer', timestamp: '00:00:12', confidence: 0.99 },
      { id: 't5', callId: 'call_001', text: 'Thank you. I\'ve found your order. What would you like to know?', speaker: 'agent', timestamp: '00:00:15', confidence: 0.96 },
    ],
  };

  // Sample workflows
  const workflows: VoiceWorkflow[] = [
    {
      id: 'wf_001',
      name: 'Welcome Call Flow',
      trigger: 'Incoming call received',
      actions: ['Play greeting', 'Route to agent', 'Record call', 'Send transcript'],
      status: 'active',
      executionCount: 247,
      lastRun: '2 minutes ago',
    },
    {
      id: 'wf_002',
      name: 'Follow-up Automation',
      trigger: 'Call completed',
      actions: ['Generate transcript', 'Send email summary', 'Update CRM'],
      status: 'active',
      executionCount: 189,
      lastRun: '15 minutes ago',
    },
    {
      id: 'wf_003',
      name: 'After-hours Response',
      trigger: 'Call outside business hours',
      actions: ['Play voicemail greeting', 'Record message', 'Send SMS notification'],
      status: 'active',
      executionCount: 56,
      lastRun: '1 hour ago',
    },
    {
      id: 'wf_004',
      name: 'Daily Sales Outreach',
      trigger: 'Scheduled: Daily 10:00 AM',
      actions: ['Load contact list', 'Make outbound calls', 'Log results'],
      status: 'paused',
      executionCount: 12,
      lastRun: 'Yesterday',
    },
  ];

  const filteredCalls = callRecords.filter(call => {
    const matchesType = callType === 'all' || call.type === callType;
    const matchesSearch = searchTerm === '' || 
      call.from.includes(searchTerm) || 
      call.to.includes(searchTerm) ||
      call.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handlePlayRecording = (callId: string) => {
    setIsPlaying(isPlaying === callId ? null : callId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'green';
      case 'missed': return 'yellow';
      case 'failed': return 'red';
      case 'in-progress': return 'blue';
      default: return 'slate';
    }
  };

  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment) {
      case 'positive': return 'green';
      case 'neutral': return 'blue';
      case 'negative': return 'red';
      default: return 'slate';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl text-slate-900 mb-2">Voice AI Module</h1>
            <p className="text-slate-600">Intelligent voice communication powered by AI</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowWebhookModal(true)}
              className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl flex items-center gap-2 transition-colors"
            >
              <Settings className="w-5 h-5" />
              Twilio Setup
            </button>
            <button 
              onClick={() => setShowCallModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl flex items-center gap-2 transition-all shadow-lg"
            >
              <PhoneOutgoing className="w-5 h-5" />
              Make Call
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-5 gap-6 mb-8">
          {[
            { label: 'Total Calls', value: '1,247', change: '+18% this week', icon: Phone, color: 'blue' },
            { label: 'Inbound', value: '834', change: '67% of total', icon: PhoneIncoming, color: 'green' },
            { label: 'Outbound', value: '413', change: '33% of total', icon: PhoneOutgoing, color: 'purple' },
            { label: 'Avg Duration', value: '4m 23s', change: '+12s from avg', icon: Clock, color: 'orange' },
            { label: 'Total Cost', value: '$142.50', change: '850 minutes', icon: TrendingUp, color: 'pink' },
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
            { id: 'calls', label: 'Call Records', icon: Phone },
            { id: 'transcripts', label: 'Transcripts', icon: MessageSquare },
            { id: 'workflows', label: 'Voice Workflows', icon: Zap },
            { id: 'settings', label: 'Configuration', icon: Settings },
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
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg text-slate-900">Call Success Rate</h3>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-4xl text-green-900 mb-2">94.8%</div>
                <p className="text-sm text-green-700">1,182 completed calls</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg text-slate-900">Active Workflows</h3>
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-4xl text-blue-900 mb-2">3</div>
                <p className="text-sm text-blue-700">492 total executions</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg text-slate-900">Transcription Accuracy</h3>
                  <Activity className="w-8 h-8 text-purple-600" />
                </div>
                <div className="text-4xl text-purple-900 mb-2">97.2%</div>
                <p className="text-sm text-purple-700">Average confidence</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-xl text-slate-900">Recent Call Activity</h2>
              </div>
              <div className="divide-y divide-slate-200">
                {callRecords.slice(0, 5).map((call) => (
                  <div key={call.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 bg-${call.type === 'inbound' ? 'green' : 'blue'}-100 rounded-lg flex items-center justify-center`}>
                        {call.type === 'inbound' ? (
                          <PhoneIncoming className="w-5 h-5 text-green-600" />
                        ) : (
                          <PhoneOutgoing className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-900">{call.from}</span>
                          <span className="text-slate-400">→</span>
                          <span className="text-slate-900">{call.to}</span>
                        </div>
                        <p className="text-sm text-slate-500">{call.timestamp} • {call.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 bg-${getStatusColor(call.status)}-100 text-${getStatusColor(call.status)}-700 rounded-full text-xs capitalize`}>
                        {call.status}
                      </span>
                      {call.recordingUrl && (
                        <button 
                          onClick={() => handlePlayRecording(call.id)}
                          className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                        >
                          {isPlaying === call.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sentiment Analysis */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h3 className="text-lg text-slate-900 mb-6">Sentiment Analysis</h3>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-3xl text-green-600 mb-2">68%</div>
                  <div className="text-sm text-green-700">Positive</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-3xl text-blue-600 mb-2">24%</div>
                  <div className="text-sm text-blue-700">Neutral</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-xl">
                  <div className="text-3xl text-red-600 mb-2">8%</div>
                  <div className="text-sm text-red-700">Negative</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Call Records Tab */}
        {activeTab === 'calls' && (
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
                    placeholder="Search by phone number or call ID..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-2">
                  {['all', 'inbound', 'outbound'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setCallType(type as any)}
                      className={`px-4 py-2 rounded-lg text-sm capitalize transition-colors ${
                        callType === type
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Call Records List */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm text-slate-600">Type</th>
                      <th className="px-6 py-4 text-left text-sm text-slate-600">From</th>
                      <th className="px-6 py-4 text-left text-sm text-slate-600">To</th>
                      <th className="px-6 py-4 text-left text-sm text-slate-600">Duration</th>
                      <th className="px-6 py-4 text-left text-sm text-slate-600">Status</th>
                      <th className="px-6 py-4 text-left text-sm text-slate-600">Timestamp</th>
                      <th className="px-6 py-4 text-left text-sm text-slate-600">Sentiment</th>
                      <th className="px-6 py-4 text-left text-sm text-slate-600">Cost</th>
                      <th className="px-6 py-4 text-left text-sm text-slate-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredCalls.map((call) => (
                      <tr key={call.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {call.type === 'inbound' ? (
                              <PhoneIncoming className="w-4 h-4 text-green-600" />
                            ) : (
                              <PhoneOutgoing className="w-4 h-4 text-blue-600" />
                            )}
                            <span className="text-sm text-slate-900 capitalize">{call.type}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-900 font-mono">{call.from}</td>
                        <td className="px-6 py-4 text-sm text-slate-900 font-mono">{call.to}</td>
                        <td className="px-6 py-4 text-sm text-slate-900">{call.duration}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 bg-${getStatusColor(call.status)}-100 text-${getStatusColor(call.status)}-700 rounded-full text-xs capitalize`}>
                            {call.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">{call.timestamp}</td>
                        <td className="px-6 py-4">
                          {call.sentiment && (
                            <span className={`px-3 py-1 bg-${getSentimentColor(call.sentiment)}-100 text-${getSentimentColor(call.sentiment)}-700 rounded-full text-xs capitalize`}>
                              {call.sentiment}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-900">{call.cost}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {call.recordingUrl && (
                              <button 
                                onClick={() => handlePlayRecording(call.id)}
                                className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                                title="Play recording"
                              >
                                {isPlaying === call.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                              </button>
                            )}
                            {call.transcriptId && (
                              <button 
                                onClick={() => setSelectedCall(call)}
                                className="p-2 hover:bg-purple-100 text-purple-600 rounded-lg transition-colors"
                                title="View transcript"
                              >
                                <MessageSquare className="w-4 h-4" />
                              </button>
                            )}
                            <button 
                              className="p-2 hover:bg-green-100 text-green-600 rounded-lg transition-colors"
                              title="Download"
                            >
                              <Download className="w-4 h-4" />
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

        {/* Transcripts Tab */}
        {activeTab === 'transcripts' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h2 className="text-xl text-slate-900 mb-6">Call Transcripts</h2>
              
              {selectedCall && transcripts[selectedCall.transcriptId!] ? (
                <div>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg text-slate-900 mb-1">Call: {selectedCall.id}</h3>
                        <p className="text-sm text-slate-600">
                          {selectedCall.from} → {selectedCall.to} • {selectedCall.timestamp}
                        </p>
                      </div>
                      <button 
                        onClick={() => setSelectedCall(null)}
                        className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 rounded-lg"
                      >
                        Close
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {transcripts[selectedCall.transcriptId!].map((item) => (
                      <div 
                        key={item.id} 
                        className={`flex gap-4 ${item.speaker === 'agent' ? 'justify-start' : 'justify-end'}`}
                      >
                        <div className={`max-w-[70%] ${item.speaker === 'customer' ? 'order-2' : ''}`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm text-slate-500">{item.speaker === 'agent' ? 'Agent' : 'Customer'}</span>
                            <span className="text-xs text-slate-400">{item.timestamp}</span>
                            <span className="text-xs text-slate-400">({Math.round(item.confidence * 100)}% confidence)</span>
                          </div>
                          <div className={`p-4 rounded-xl ${
                            item.speaker === 'agent' 
                              ? 'bg-blue-100 text-blue-900' 
                              : 'bg-green-100 text-green-900'
                          }`}>
                            {item.text}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <MessageSquare className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg text-slate-900 mb-2">No Transcript Selected</h3>
                  <p className="text-slate-600">Select a call from the Call Records tab to view its transcript</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Voice Workflows Tab */}
        {activeTab === 'workflows' && (
          <div className="space-y-6">
            {/* Create Workflow Button */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl text-slate-900 mb-2">Voice Workflow Automation</h3>
                  <p className="text-slate-600">Automate call handling with intelligent workflows</p>
                </div>
                <button 
                  onClick={() => setShowWorkflowModal(true)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl flex items-center gap-2 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Create Workflow
                </button>
              </div>
            </div>

            {/* Workflows List */}
            <div className="grid grid-cols-2 gap-6">
              {workflows.map((workflow) => (
                <div key={workflow.id} className="bg-white border border-slate-200 rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        workflow.status === 'active' ? 'bg-green-100' : 'bg-slate-100'
                      }`}>
                        <Zap className={`w-6 h-6 ${workflow.status === 'active' ? 'text-green-600' : 'text-slate-600'}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg text-slate-900">{workflow.name}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs ${
                            workflow.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {workflow.status === 'active' ? 'Active' : 'Paused'}
                          </span>
                        </div>
                        <div className="mb-3">
                          <div className="text-sm text-slate-600 mb-2">
                            <span className="text-slate-500">Trigger:</span> {workflow.trigger}
                          </div>
                          <div className="text-sm text-slate-600">
                            <span className="text-slate-500">Actions:</span>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {workflow.actions.map((action, i) => (
                                <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                                  {action}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                          <span>{workflow.executionCount} executions</span>
                          <span>•</span>
                          <span>Last run: {workflow.lastRun}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg flex items-center gap-2 transition-colors">
                            <Edit2 className="w-4 h-4" />
                            Edit
                          </button>
                          <button className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                            workflow.status === 'active'
                              ? 'bg-orange-100 hover:bg-orange-200 text-orange-700'
                              : 'bg-green-100 hover:bg-green-200 text-green-700'
                          }`}>
                            {workflow.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            {workflow.status === 'active' ? 'Pause' : 'Activate'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            {/* Twilio Configuration */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h2 className="text-xl text-slate-900 mb-6">Twilio Configuration</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-700 mb-2">Account SID</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      defaultValue="AC1234567890abcdef1234567890abcdef"
                      className="flex-1 px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl">
                      <Copy className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-700 mb-2">Auth Token</label>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      defaultValue="your_auth_token_here"
                      className="flex-1 px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl">
                      <Copy className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-700 mb-2">Phone Number</label>
                  <input
                    type="text"
                    defaultValue="+1 (555) 987-6543"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl flex items-center gap-2">
                  <Save className="w-5 h-5" />
                  Save Configuration
                </button>
              </div>
            </div>

            {/* Webhook Configuration */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h2 className="text-xl text-slate-900 mb-6">Webhook Endpoints</h2>
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-700">Incoming Call Webhook</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 font-mono">
                      https://devnora.com/api/voice/incoming
                    </code>
                    <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
                      <Copy className="w-4 h-4 text-slate-600" />
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-700">Call Status Webhook</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 font-mono">
                      https://devnora.com/api/voice/status
                    </code>
                    <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
                      <Copy className="w-4 h-4 text-slate-600" />
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-700">Recording Webhook</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 font-mono">
                      https://devnora.com/api/voice/recording
                    </code>
                    <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
                      <Copy className="w-4 h-4 text-slate-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Voice Settings */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h2 className="text-xl text-slate-900 mb-6">Voice Settings</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-slate-700 mb-2">Language</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>English (US)</option>
                    <option>English (UK)</option>
                    <option>Hindi</option>
                    <option>Spanish</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-slate-700 mb-2">Voice</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Female (Natural)</option>
                    <option>Male (Natural)</option>
                    <option>Female (Standard)</option>
                    <option>Male (Standard)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-slate-700 mb-2">Speech Rate</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Normal</option>
                    <option>Slow</option>
                    <option>Fast</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-slate-700 mb-2">Pitch</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Normal</option>
                    <option>Low</option>
                    <option>High</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-slate-900">Enable call recording by default</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-slate-900">Enable automatic transcription</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-slate-900">Enable sentiment analysis</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Make Call Modal */}
      {showCallModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-2xl text-slate-900 flex items-center gap-2">
                <PhoneOutgoing className="w-6 h-6 text-blue-600" />
                Make Outbound Call
              </h2>
              <button 
                onClick={() => setShowCallModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <CloseIcon className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-slate-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2">Caller ID</label>
                <select className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>+1 (555) 987-6543 (Default)</option>
                  <option>+1 (555) 111-2222</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2">Call Script (Optional)</label>
                <textarea
                  rows={4}
                  placeholder="Enter the message or script for the AI to speak..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" id="record" className="w-4 h-4 text-blue-600" defaultChecked />
                <label htmlFor="record" className="text-sm text-slate-900">Record this call</label>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowCallModal(false)}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Initiating call...');
                  setShowCallModal(false);
                }}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white rounded-xl transition-all flex items-center gap-2"
              >
                <PhoneCall className="w-5 h-5" />
                Start Call
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Webhook Setup Modal */}
      {showWebhookModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-2xl text-slate-900 flex items-center gap-2">
                <Settings className="w-6 h-6 text-blue-600" />
                Twilio Integration Setup
              </h2>
              <button 
                onClick={() => setShowWebhookModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <CloseIcon className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <h4 className="text-sm text-blue-900 mb-2">📖 Setup Instructions</h4>
                <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                  <li>Log in to your Twilio Console</li>
                  <li>Copy your Account SID and Auth Token</li>
                  <li>Paste them in the fields below</li>
                  <li>Configure webhook URLs in Twilio dashboard</li>
                  <li>Test the connection</li>
                </ol>
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2">Account SID *</label>
                <input
                  type="text"
                  placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2">Auth Token *</label>
                <input
                  type="password"
                  placeholder="your_auth_token_here"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2">Twilio Phone Number *</label>
                <input
                  type="tel"
                  placeholder="+1 234 567 8900"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                <h4 className="text-sm text-green-900 mb-2">🔗 Webhook URLs</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-green-700">Voice URL:</span>
                    <code className="block mt-1 px-3 py-2 bg-white rounded text-xs">https://devnora.com/api/voice/incoming</code>
                  </div>
                  <div>
                    <span className="text-green-700">Status Callback:</span>
                    <code className="block mt-1 px-3 py-2 bg-white rounded text-xs">https://devnora.com/api/voice/status</code>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowWebhookModal(false)}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Testing connection...');
                }}
                className="px-6 py-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl transition-colors"
              >
                Test Connection
              </button>
              <button
                onClick={() => {
                  alert('Configuration saved successfully!');
                  setShowWebhookModal(false);
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl transition-all flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Workflow Modal */}
      {showWorkflowModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-2xl text-slate-900 flex items-center gap-2">
                <Zap className="w-6 h-6 text-blue-600" />
                Create Voice Workflow
              </h2>
              <button 
                onClick={() => setShowWorkflowModal(false)}
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
                  placeholder="e.g., Customer Support Flow"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-3">Trigger Event</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'incoming', label: 'Incoming Call', icon: PhoneIncoming },
                    { id: 'outgoing', label: 'Outgoing Call', icon: PhoneOutgoing },
                    { id: 'completed', label: 'Call Completed', icon: CheckCircle },
                    { id: 'schedule', label: 'Scheduled Time', icon: Calendar },
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
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-3">Actions to Perform</label>
                <div className="space-y-2">
                  {[
                    'Play greeting message',
                    'Route to agent',
                    'Record call',
                    'Generate transcript',
                    'Send email notification',
                    'Update CRM',
                    'Send SMS',
                    'Play voicemail',
                  ].map((action, i) => (
                    <label key={i} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-slate-900">{action}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 flex items-center justify-end gap-3 sticky bottom-0 bg-white">
              <button
                onClick={() => setShowWorkflowModal(false)}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Workflow created successfully!');
                  setShowWorkflowModal(false);
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl transition-all flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                Create Workflow
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
