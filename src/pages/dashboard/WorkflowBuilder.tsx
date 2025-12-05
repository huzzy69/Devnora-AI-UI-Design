import React, { useState } from 'react';
import { Plus, Play, Save, Settings, Zap, Mail, Database, Code, Webhook, Clock, GitBranch, MoreVertical } from 'lucide-react';

export default function WorkflowBuilder() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const nodeTypes = [
    { id: 'trigger', label: 'Trigger', icon: Zap, color: 'blue', nodes: ['Webhook', 'Schedule', 'Manual'] },
    { id: 'action', label: 'Action', icon: Settings, color: 'green', nodes: ['HTTP Request', 'Send Email', 'Database Query'] },
    { id: 'condition', label: 'Condition', icon: GitBranch, color: 'orange', nodes: ['If/Else', 'Switch', 'Filter'] },
    { id: 'ai', label: 'AI', icon: Code, color: 'purple', nodes: ['Generate Code', 'Analyze Text', 'Extract Data'] },
  ];

  return (
    <div className="h-[calc(100vh-120px)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl text-white mb-2">Workflow Builder</h1>
          <p className="text-slate-400">Create powerful automations with visual workflow designer</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg flex items-center gap-2 transition-colors">
            <Save className="w-4 h-4" />
            Save
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg flex items-center gap-2 transition-all">
            <Play className="w-4 h-4" />
            Test Run
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 h-full">
        {/* Node Palette */}
        <div className="col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-4 overflow-y-auto">
          <h3 className="text-white mb-4 text-sm">Add Nodes</h3>
          <div className="space-y-4">
            {nodeTypes.map((type) => (
              <div key={type.id}>
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                  <type.icon className="w-3 h-3" />
                  {type.label}
                </div>
                <div className="space-y-2">
                  {type.nodes.map((node) => (
                    <div
                      key={node}
                      draggable
                      className={`p-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white cursor-move hover:border-${type.color}-500 transition-colors`}
                    >
                      {node}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Canvas */}
        <div className="col-span-7 bg-slate-900 border border-slate-800 rounded-xl relative overflow-hidden">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            <div className="relative p-8">
              {/* Sample Workflow */}
              <div className="space-y-8">
                {/* Trigger Node */}
                <div className="flex items-center gap-4">
                  <div className="w-64 p-4 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl shadow-lg cursor-pointer">
                    <div className="flex items-center gap-3 mb-2">
                      <Zap className="w-5 h-5 text-white" />
                      <span className="text-white">Webhook Trigger</span>
                    </div>
                    <p className="text-xs text-blue-100">When webhook receives data</p>
                  </div>
                  <div className="h-0.5 w-12 bg-slate-700"></div>
                </div>

                {/* AI Node */}
                <div className="flex items-center gap-4 ml-20">
                  <div className="w-0.5 h-8 bg-slate-700 -mb-8 ml-32"></div>
                </div>
                <div className="flex items-center gap-4 ml-20">
                  <div className="w-64 p-4 bg-gradient-to-r from-purple-600 to-purple-500 rounded-xl shadow-lg cursor-pointer">
                    <div className="flex items-center gap-3 mb-2">
                      <Code className="w-5 h-5 text-white" />
                      <span className="text-white">Generate Code</span>
                    </div>
                    <p className="text-xs text-purple-100">AI processes the input</p>
                  </div>
                  <div className="h-0.5 w-12 bg-slate-700"></div>
                </div>

                {/* Condition Node */}
                <div className="flex items-center gap-4 ml-20">
                  <div className="w-0.5 h-8 bg-slate-700 -mb-8 ml-32"></div>
                </div>
                <div className="flex items-center gap-4 ml-20">
                  <div className="w-64 p-4 bg-gradient-to-r from-orange-600 to-orange-500 rounded-xl shadow-lg cursor-pointer">
                    <div className="flex items-center gap-3 mb-2">
                      <GitBranch className="w-5 h-5 text-white" />
                      <span className="text-white">If/Else</span>
                    </div>
                    <p className="text-xs text-orange-100">Check if successful</p>
                  </div>
                </div>

                {/* Action Nodes */}
                <div className="flex gap-8 ml-40">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-0.5 h-8 bg-slate-700"></div>
                    <div className="w-56 p-4 bg-gradient-to-r from-green-600 to-green-500 rounded-xl shadow-lg cursor-pointer">
                      <div className="flex items-center gap-3 mb-2">
                        <Mail className="w-5 h-5 text-white" />
                        <span className="text-white text-sm">Send Email</span>
                      </div>
                      <p className="text-xs text-green-100">Success notification</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-0.5 h-8 bg-slate-700"></div>
                    <div className="w-56 p-4 bg-gradient-to-r from-red-600 to-red-500 rounded-xl shadow-lg cursor-pointer">
                      <div className="flex items-center gap-3 mb-2">
                        <Webhook className="w-5 h-5 text-white" />
                        <span className="text-white text-sm">Log Error</span>
                      </div>
                      <p className="text-xs text-red-100">Error handling</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Canvas Controls */}
          <div className="absolute bottom-4 left-4 flex gap-2">
            <button className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm rounded-lg transition-colors">
              Zoom In
            </button>
            <button className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm rounded-lg transition-colors">
              Zoom Out
            </button>
            <button className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm rounded-lg transition-colors">
              Fit View
            </button>
          </div>
        </div>

        {/* Properties Panel */}
        <div className="col-span-3 bg-slate-900 border border-slate-800 rounded-xl p-4 overflow-y-auto">
          <h3 className="text-white mb-4">Node Properties</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Node Name</label>
              <input
                type="text"
                placeholder="Webhook Trigger"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-2">Webhook URL</label>
              <input
                type="text"
                placeholder="https://api.example.com/webhook"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-2">Method</label>
              <select className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm">
                <option>POST</option>
                <option>GET</option>
                <option>PUT</option>
                <option>DELETE</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-2">Headers</label>
              <textarea
                placeholder='{"Content-Type": "application/json"}'
                className="w-full h-24 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm font-mono resize-none"
              />
            </div>

            <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm transition-colors">
              Update Node
            </button>
          </div>

          {/* Execution Logs */}
          <div className="mt-6 pt-6 border-t border-slate-800">
            <h3 className="text-white mb-3 text-sm">Recent Executions</h3>
            <div className="space-y-2">
              {[
                { status: 'success', time: '2 min ago', duration: '1.2s' },
                { status: 'success', time: '15 min ago', duration: '0.8s' },
                { status: 'error', time: '1 hour ago', duration: '2.1s' },
              ].map((log, i) => (
                <div key={i} className="p-2 bg-slate-950 rounded-lg text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`px-2 py-0.5 rounded ${log.status === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {log.status}
                    </span>
                    <span className="text-slate-400">{log.time}</span>
                  </div>
                  <div className="text-slate-400">Duration: {log.duration}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
