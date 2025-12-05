import React, { useState } from 'react';
import { Play, Plus, Settings, Trash2, Copy, GitBranch, Zap, Mail, Database, Code, MessageSquare, Clock, CheckCircle, XCircle, Circle } from 'lucide-react';

export default function WorkflowBuilderVisual() {
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [nodes, setNodes] = useState([
    { id: 1, type: 'trigger', label: 'Form Submitted', x: 100, y: 100, icon: Zap, color: 'blue' },
    { id: 2, type: 'condition', label: 'Check Email', x: 100, y: 250, icon: GitBranch, color: 'yellow' },
    { id: 3, type: 'action', label: 'Send Email', x: 50, y: 400, icon: Mail, color: 'green' },
    { id: 4, type: 'action', label: 'Save to DB', x: 250, y: 400, icon: Database, color: 'purple' }
  ]);

  const nodeTypes = [
    { type: 'trigger', label: 'Trigger', icon: Zap, color: 'blue', description: 'Start workflow' },
    { type: 'action', label: 'Action', icon: Settings, color: 'green', description: 'Perform action' },
    { type: 'condition', label: 'Condition', icon: GitBranch, color: 'yellow', description: 'If/else logic' },
    { type: 'delay', label: 'Delay', icon: Clock, color: 'orange', description: 'Wait/pause' },
    { type: 'api', label: 'API Call', icon: Code, color: 'purple', description: 'HTTP request' },
    { type: 'notification', label: 'Notification', icon: MessageSquare, color: 'pink', description: 'Send message' }
  ];

  const getNodeColor = (color: string) => {
    const colors: any = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      yellow: 'from-yellow-500 to-yellow-600',
      orange: 'from-orange-500 to-orange-600',
      purple: 'from-purple-500 to-purple-600',
      pink: 'from-pink-500 to-pink-600'
    };
    return colors[color] || 'from-slate-500 to-slate-600';
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row">
      {/* Left Sidebar - Node Library */}
      <div className="w-full lg:w-80 bg-white border-b lg:border-b-0 lg:border-r border-slate-200 overflow-y-auto">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl text-slate-900 mb-2">Workflow Builder</h2>
          <p className="text-sm text-slate-600">Drag nodes to canvas</p>
        </div>

        <div className="p-4">
          <h3 className="text-sm text-slate-600 uppercase mb-3 px-2">Node Library</h3>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
            {nodeTypes.map((nodeType) => (
              <div
                key={nodeType.type}
                className="p-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl cursor-move transition-colors"
                draggable
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${getNodeColor(nodeType.color)} rounded-lg flex items-center justify-center`}>
                    <nodeType.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm text-slate-900 truncate">{nodeType.label}</h4>
                    <p className="text-xs text-slate-500 truncate">{nodeType.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Templates */}
        <div className="p-4 border-t border-slate-200">
          <h3 className="text-sm text-slate-600 uppercase mb-3 px-2">Templates</h3>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
            <button className="w-full p-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg text-left transition-colors">
              <div className="text-sm text-blue-900 truncate">Email Automation</div>
              <div className="text-xs text-blue-600">3 nodes</div>
            </button>
            <button className="w-full p-3 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg text-left transition-colors">
              <div className="text-sm text-green-900 truncate">User Onboarding</div>
              <div className="text-xs text-green-600">5 nodes</div>
            </button>
            <button className="w-full p-3 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg text-left transition-colors">
              <div className="text-sm text-purple-900 truncate">Payment Processing</div>
              <div className="text-xs text-purple-600">7 nodes</div>
            </button>
          </div>
        </div>
      </div>

      {/* Center Canvas */}
      <div className="flex-1 bg-slate-50 relative overflow-auto">
        {/* Toolbar */}
        <div className="sticky top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-white border border-slate-200 rounded-xl p-2 shadow-lg w-max mx-auto flex-wrap">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center gap-2 transition-colors text-sm">
            <Play className="w-4 h-4" />
            <span className="hidden sm:inline">Test Run</span>
          </button>
          <div className="w-px h-8 bg-slate-200 hidden sm:block"></div>
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <Plus className="w-5 h-5 text-slate-700" />
          </button>
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <Copy className="w-5 h-5 text-slate-700" />
          </button>
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <Trash2 className="w-5 h-5 text-red-600" />
          </button>
          <div className="w-px h-8 bg-slate-200 hidden sm:block"></div>
          <select className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm">
            <option>100%</option>
            <option>75%</option>
            <option>50%</option>
          </select>
        </div>

        {/* Canvas */}
        <div className="p-8 min-h-full relative">
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}></div>

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <line x1="150" y1="150" x2="150" y2="250" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="150" y1="300" x2="100" y2="400" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="150" y1="300" x2="300" y2="400" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
          </svg>

          {/* Nodes */}
          {nodes.map((node) => (
            <div
              key={node.id}
              onClick={() => setSelectedNode(node)}
              style={{ left: node.x, top: node.y }}
              className={`absolute w-48 bg-white border-2 rounded-2xl p-4 cursor-pointer transition-all shadow-lg hover:shadow-xl ${
                selectedNode?.id === node.id ? 'border-blue-500 ring-4 ring-blue-200' : 'border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 bg-gradient-to-br ${getNodeColor(node.color)} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <node.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-slate-500 uppercase">{node.type}</div>
                  <div className="text-sm text-slate-900 truncate">{node.label}</div>
                </div>
              </div>
              
              {/* Connection Points */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full"></div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full"></div>
              
              {/* Status Indicator */}
              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-200">
                <Circle className="w-3 h-3 text-green-500 fill-green-500" />
                <span className="text-xs text-slate-500">Ready</span>
              </div>
            </div>
          ))}

          {/* Add Node Hint */}
          {nodes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl text-slate-900 mb-2">Start Building Your Workflow</h3>
                <p className="text-slate-600">Drag nodes from the left panel to the canvas</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar - Configuration Panel */}
      <div className="w-96 bg-white border-l border-slate-200 overflow-y-auto">
        {selectedNode ? (
          <div>
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${getNodeColor(selectedNode.color)} rounded-xl flex items-center justify-center`}>
                  <selectedNode.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-slate-500 uppercase">{selectedNode.type}</div>
                  <h3 className="text-lg text-slate-900">{selectedNode.label}</h3>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Node Name */}
              <div>
                <label className="block text-sm text-slate-700 mb-2">Node Name</label>
                <input
                  type="text"
                  defaultValue={selectedNode.label}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl"
                />
              </div>

              {/* Trigger Configuration */}
              {selectedNode.type === 'trigger' && (
                <div>
                  <label className="block text-sm text-slate-700 mb-2">Trigger Type</label>
                  <select className="w-full px-4 py-3 border border-slate-300 rounded-xl mb-4">
                    <option>Form Submission</option>
                    <option>User Registration</option>
                    <option>Payment Received</option>
                    <option>Scheduled Time</option>
                    <option>Webhook</option>
                  </select>
                  
                  <label className="block text-sm text-slate-700 mb-2">Form ID</label>
                  <input
                    type="text"
                    placeholder="contact-form"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl"
                  />
                </div>
              )}

              {/* Condition Configuration */}
              {selectedNode.type === 'condition' && (
                <div>
                  <label className="block text-sm text-slate-700 mb-2">Condition Type</label>
                  <select className="w-full px-4 py-3 border border-slate-300 rounded-xl mb-4">
                    <option>If/Else</option>
                    <option>Switch/Case</option>
                    <option>Contains</option>
                    <option>Greater Than</option>
                    <option>Less Than</option>
                  </select>

                  <label className="block text-sm text-slate-700 mb-2">Field to Check</label>
                  <input
                    type="text"
                    placeholder="email"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl mb-4"
                  />

                  <label className="block text-sm text-slate-700 mb-2">Condition</label>
                  <select className="w-full px-4 py-3 border border-slate-300 rounded-xl mb-4">
                    <option>Contains</option>
                    <option>Equals</option>
                    <option>Not Equals</option>
                    <option>Is Empty</option>
                    <option>Is Not Empty</option>
                  </select>

                  <label className="block text-sm text-slate-700 mb-2">Value</label>
                  <input
                    type="text"
                    placeholder="@gmail.com"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl"
                  />
                </div>
              )}

              {/* Action Configuration */}
              {selectedNode.type === 'action' && selectedNode.label === 'Send Email' && (
                <div>
                  <label className="block text-sm text-slate-700 mb-2">To Email</label>
                  <input
                    type="email"
                    placeholder="user@example.com"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl mb-4"
                  />

                  <label className="block text-sm text-slate-700 mb-2">Subject</label>
                  <input
                    type="text"
                    placeholder="Welcome to Devnora AI"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl mb-4"
                  />

                  <label className="block text-sm text-slate-700 mb-2">Email Body</label>
                  <textarea
                    rows={4}
                    placeholder="Thank you for registering..."
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl"
                  ></textarea>
                </div>
              )}

              {selectedNode.type === 'action' && selectedNode.label === 'Save to DB' && (
                <div>
                  <label className="block text-sm text-slate-700 mb-2">Database Table</label>
                  <input
                    type="text"
                    placeholder="users"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl mb-4"
                  />

                  <label className="block text-sm text-slate-700 mb-2">Fields to Save</label>
                  <div className="space-y-2">
                    <input type="text" placeholder="name" className="w-full px-4 py-2 border border-slate-300 rounded-lg" />
                    <input type="text" placeholder="email" className="w-full px-4 py-2 border border-slate-300 rounded-lg" />
                    <button className="text-blue-600 text-sm flex items-center gap-1">
                      <Plus className="w-4 h-4" />
                      Add Field
                    </button>
                  </div>
                </div>
              )}

              {/* Error Handling */}
              <div className="pt-6 border-t border-slate-200">
                <h4 className="text-sm text-slate-700 mb-3">Error Handling</h4>
                <label className="flex items-center gap-2 mb-2">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-sm text-slate-700">Continue on error</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-sm text-slate-700">Send error notification</span>
                </label>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors">
                  Save Changes
                </button>
                <button 
                  onClick={() => setSelectedNode(null)}
                  className="px-4 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center text-slate-500">
            <Settings className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p>Select a node to configure</p>
          </div>
        )}
      </div>
    </div>
  );
}