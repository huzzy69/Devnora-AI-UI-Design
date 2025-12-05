import React, { useState, useCallback, useRef } from 'react';
import {
  GitBranch, Plus, Play, Save, Zap, Database, Mail, Calendar, Code,
  Cloud, ShoppingCart, Bell, MessageSquare, FileText, Filter, Split,
  Repeat, Clock, CheckCircle, XCircle, Settings, Trash2, Copy, Eye,
  Download, Upload, Maximize2, Minimize2, ZoomIn, ZoomOut, Move,
  ArrowRight, Circle, Square, Diamond, Hexagon, Triangle
} from 'lucide-react';

interface NodeData {
  id: string;
  type: 'trigger' | 'condition' | 'action' | 'logic' | 'integration';
  category: string;
  label: string;
  icon: any;
  config: any;
  position: { x: number; y: number };
  connections: string[];
}

interface Connection {
  from: string;
  to: string;
}

const nodeLibrary = {
  triggers: [
    { type: 'trigger', category: 'triggers', label: 'Webhook Trigger', icon: Zap, color: 'from-yellow-600 to-orange-600' },
    { type: 'trigger', category: 'triggers', label: 'Schedule Trigger', icon: Clock, color: 'from-yellow-600 to-orange-600' },
    { type: 'trigger', category: 'triggers', label: 'Email Received', icon: Mail, color: 'from-yellow-600 to-orange-600' },
    { type: 'trigger', category: 'triggers', label: 'Form Submit', icon: FileText, color: 'from-yellow-600 to-orange-600' },
  ],
  conditions: [
    { type: 'condition', category: 'conditions', label: 'If/Else', icon: Split, color: 'from-blue-600 to-cyan-600' },
    { type: 'condition', category: 'conditions', label: 'Filter', icon: Filter, color: 'from-blue-600 to-cyan-600' },
    { type: 'condition', category: 'conditions', label: 'Switch Case', icon: Diamond, color: 'from-blue-600 to-cyan-600' },
    { type: 'condition', category: 'conditions', label: 'Data Check', icon: CheckCircle, color: 'from-blue-600 to-cyan-600' },
  ],
  actions: [
    { type: 'action', category: 'actions', label: 'Send Email', icon: Mail, color: 'from-green-600 to-emerald-600' },
    { type: 'action', category: 'actions', label: 'Create Record', icon: Database, color: 'from-green-600 to-emerald-600' },
    { type: 'action', category: 'actions', label: 'Send Notification', icon: Bell, color: 'from-green-600 to-emerald-600' },
    { type: 'action', category: 'actions', label: 'HTTP Request', icon: Cloud, color: 'from-green-600 to-emerald-600' },
  ],
  logic: [
    { type: 'logic', category: 'logic', label: 'Loop', icon: Repeat, color: 'from-purple-600 to-pink-600' },
    { type: 'logic', category: 'logic', label: 'Delay', icon: Clock, color: 'from-purple-600 to-pink-600' },
    { type: 'logic', category: 'logic', label: 'Merge', icon: GitBranch, color: 'from-purple-600 to-pink-600' },
    { type: 'logic', category: 'logic', label: 'Code', icon: Code, color: 'from-purple-600 to-pink-600' },
  ],
  integrations: [
    { type: 'integration', category: 'integrations', label: 'Database', icon: Database, color: 'from-indigo-600 to-purple-600' },
    { type: 'integration', category: 'integrations', label: 'Stripe', icon: ShoppingCart, color: 'from-indigo-600 to-purple-600' },
    { type: 'integration', category: 'integrations', label: 'Slack', icon: MessageSquare, color: 'from-indigo-600 to-purple-600' },
    { type: 'integration', category: 'integrations', label: 'Calendar', icon: Calendar, color: 'from-indigo-600 to-purple-600' },
  ],
};

function NodeComponent({ node, isSelected, onClick, onDelete }: any) {
  const getNodeIcon = () => {
    const Icon = node.icon;
    return <Icon className="w-5 h-5 text-white" />;
  };

  const getNodeColor = () => {
    switch (node.type) {
      case 'trigger':
        return 'from-yellow-600 to-orange-600';
      case 'condition':
        return 'from-blue-600 to-cyan-600';
      case 'action':
        return 'from-green-600 to-emerald-600';
      case 'logic':
        return 'from-purple-600 to-pink-600';
      case 'integration':
        return 'from-indigo-600 to-purple-600';
      default:
        return 'from-slate-600 to-slate-700';
    }
  };

  const getNodeShape = () => {
    switch (node.type) {
      case 'trigger':
        return 'rounded-full';
      case 'condition':
        return 'rotate-45';
      case 'action':
        return 'rounded-xl';
      case 'logic':
        return 'rounded-lg';
      case 'integration':
        return 'rounded-2xl';
      default:
        return 'rounded-lg';
    }
  };

  return (
    <div
      className={`absolute cursor-move group ${node.type === 'condition' ? 'p-8' : ''}`}
      style={{
        left: node.position.x,
        top: node.position.y,
      }}
      onClick={() => onClick(node)}
    >
      <div className="relative">
        {/* Connection Points */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-crosshair z-10"></div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-crosshair z-10"></div>

        {/* Node */}
        <div
          className={`relative ${node.type === 'condition' ? '-rotate-45' : ''}`}
        >
          <div
            className={`${getNodeShape()} bg-gradient-to-br ${getNodeColor()} p-6 shadow-lg transition-all ${
              isSelected ? 'ring-4 ring-blue-500 ring-offset-2 ring-offset-slate-950 scale-110' : 'hover:shadow-xl'
            }`}
          >
            <div className={`flex flex-col items-center gap-2 ${node.type === 'condition' ? 'rotate-45' : ''}`}>
              {getNodeIcon()}
              <div className="text-xs text-white text-center whitespace-nowrap">{node.label}</div>
            </div>
          </div>
        </div>

        {/* Delete Button */}
        {isSelected && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(node.id);
            }}
            className="absolute -top-3 -right-3 w-6 h-6 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg z-20"
          >
            <XCircle className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

export default function LogicBuilder() {
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [leftPanelTab, setLeftPanelTab] = useState<'nodes' | 'templates'>('nodes');
  const [rightPanelTab, setRightPanelTab] = useState<'properties' | 'code'>('properties');
  const [zoom, setZoom] = useState(100);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedNode, setDraggedNode] = useState<any>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleCanvasDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (!draggedNode || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newNode: NodeData = {
      id: `node-${Date.now()}`,
      type: draggedNode.type,
      category: draggedNode.category,
      label: draggedNode.label,
      icon: draggedNode.icon,
      config: {},
      position: { x, y },
      connections: [],
    };

    setNodes([...nodes, newNode]);
    setDraggedNode(null);
  }, [draggedNode, nodes]);

  const handleNodeDragStart = (node: any) => {
    setDraggedNode(node);
  };

  const handleCanvasDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleCanvasDragLeave = () => {
    setIsDragging(false);
  };

  const handleNodeClick = (node: NodeData) => {
    setSelectedNode(node);
    setRightPanelTab('properties');
  };

  const handleDeleteNode = (nodeId: string) => {
    setNodes(nodes.filter(n => n.id !== nodeId));
    if (selectedNode?.id === nodeId) {
      setSelectedNode(null);
    }
  };

  const handleSave = () => {
    const workflow = {
      nodes,
      connections,
      timestamp: new Date().toISOString(),
    };
    console.log('Saving workflow:', workflow);
    alert('Workflow saved successfully!');
  };

  const handleExport = () => {
    const workflow = {
      nodes,
      connections,
      version: '1.0',
      exported: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(workflow, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'workflow.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleZoomIn = () => setZoom(Math.min(zoom + 10, 200));
  const handleZoomOut = () => setZoom(Math.max(zoom - 10, 50));
  const handleZoomReset = () => setZoom(100);

  const savedWorkflows = [
    { id: '1', name: 'Email Automation', nodes: 5, lastEdited: '2 hours ago', status: 'active' },
    { id: '2', name: 'Data Processing', nodes: 8, lastEdited: '1 day ago', status: 'draft' },
    { id: '3', name: 'Notification System', nodes: 6, lastEdited: '3 days ago', status: 'active' },
  ];

  return (
    <div className="fixed inset-0 bg-slate-950 flex flex-col">
      {/* Top Toolbar */}
      <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-purple-400" />
            <h1 className="text-lg text-white">Drag & Drop Logic Builder</h1>
          </div>
          <div className="h-6 w-px bg-slate-700"></div>
          <input
            type="text"
            placeholder="Untitled Workflow"
            className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-purple-500"
          />
        </div>

        <div className="flex items-center gap-3">
          {/* Zoom Controls */}
          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg">
            <button
              onClick={handleZoomOut}
              className="p-2 hover:bg-slate-700 rounded transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4 text-slate-400" />
            </button>
            <div className="px-3 text-sm text-slate-400">{zoom}%</div>
            <button
              onClick={handleZoomIn}
              className="p-2 hover:bg-slate-700 rounded transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={handleZoomReset}
              className="p-2 hover:bg-slate-700 rounded transition-colors"
              title="Reset Zoom"
            >
              <Maximize2 className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          <div className="h-6 w-px bg-slate-700"></div>

          {/* Actions */}
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors">
            <Play className="w-4 h-4" />
            Test
          </button>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Export
          </button>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg transition-all"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Node Library */}
        <div className="w-80 bg-slate-900 border-r border-slate-800 flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-slate-800">
            <button
              onClick={() => setLeftPanelTab('nodes')}
              className={`flex-1 px-4 py-3 text-sm transition-colors ${
                leftPanelTab === 'nodes'
                  ? 'text-white bg-slate-800 border-b-2 border-purple-500'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Node Library
            </button>
            <button
              onClick={() => setLeftPanelTab('templates')}
              className={`flex-1 px-4 py-3 text-sm transition-colors ${
                leftPanelTab === 'templates'
                  ? 'text-white bg-slate-800 border-b-2 border-purple-500'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Templates
            </button>
          </div>

          {/* Nodes Tab */}
          {leftPanelTab === 'nodes' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Triggers */}
              <div>
                <h3 className="text-sm text-slate-400 mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Triggers
                </h3>
                <div className="space-y-2">
                  {nodeLibrary.triggers.map((node, i) => (
                    <div
                      key={i}
                      draggable
                      onDragStart={() => handleNodeDragStart(node)}
                      className="flex items-center gap-3 p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg cursor-move transition-all group"
                    >
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${node.color} flex items-center justify-center`}>
                        <node.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-white">{node.label}</div>
                        <div className="text-xs text-slate-500">Start workflow</div>
                      </div>
                      <Move className="w-4 h-4 text-slate-600 group-hover:text-slate-400" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Conditions */}
              <div>
                <h3 className="text-sm text-slate-400 mb-3 flex items-center gap-2">
                  <Split className="w-4 h-4" />
                  Conditions
                </h3>
                <div className="space-y-2">
                  {nodeLibrary.conditions.map((node, i) => (
                    <div
                      key={i}
                      draggable
                      onDragStart={() => handleNodeDragStart(node)}
                      className="flex items-center gap-3 p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg cursor-move transition-all group"
                    >
                      <div className={`w-10 h-10 rotate-45 bg-gradient-to-br ${node.color} flex items-center justify-center`}>
                        <node.icon className="w-5 h-5 text-white -rotate-45" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-white">{node.label}</div>
                        <div className="text-xs text-slate-500">Decision logic</div>
                      </div>
                      <Move className="w-4 h-4 text-slate-600 group-hover:text-slate-400" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div>
                <h3 className="text-sm text-slate-400 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Actions
                </h3>
                <div className="space-y-2">
                  {nodeLibrary.actions.map((node, i) => (
                    <div
                      key={i}
                      draggable
                      onDragStart={() => handleNodeDragStart(node)}
                      className="flex items-center gap-3 p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg cursor-move transition-all group"
                    >
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${node.color} flex items-center justify-center`}>
                        <node.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-white">{node.label}</div>
                        <div className="text-xs text-slate-500">Perform action</div>
                      </div>
                      <Move className="w-4 h-4 text-slate-600 group-hover:text-slate-400" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Logic */}
              <div>
                <h3 className="text-sm text-slate-400 mb-3 flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  Logic
                </h3>
                <div className="space-y-2">
                  {nodeLibrary.logic.map((node, i) => (
                    <div
                      key={i}
                      draggable
                      onDragStart={() => handleNodeDragStart(node)}
                      className="flex items-center gap-3 p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg cursor-move transition-all group"
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${node.color} flex items-center justify-center`}>
                        <node.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-white">{node.label}</div>
                        <div className="text-xs text-slate-500">Flow control</div>
                      </div>
                      <Move className="w-4 h-4 text-slate-600 group-hover:text-slate-400" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Integrations */}
              <div>
                <h3 className="text-sm text-slate-400 mb-3 flex items-center gap-2">
                  <Cloud className="w-4 h-4" />
                  Integrations
                </h3>
                <div className="space-y-2">
                  {nodeLibrary.integrations.map((node, i) => (
                    <div
                      key={i}
                      draggable
                      onDragStart={() => handleNodeDragStart(node)}
                      className="flex items-center gap-3 p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg cursor-move transition-all group"
                    >
                      <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${node.color} flex items-center justify-center`}>
                        <node.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-white">{node.label}</div>
                        <div className="text-xs text-slate-500">Connect service</div>
                      </div>
                      <Move className="w-4 h-4 text-slate-600 group-hover:text-slate-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Templates Tab */}
          {leftPanelTab === 'templates' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <div>
                <h3 className="text-sm text-white mb-3">Saved Workflows</h3>
                {savedWorkflows.map((workflow) => (
                  <div
                    key={workflow.id}
                    className="p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg cursor-pointer transition-all mb-2"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm text-white">{workflow.name}</div>
                      <span
                        className={`px-2 py-0.5 rounded text-xs ${
                          workflow.status === 'active'
                            ? 'bg-green-600/20 text-green-400'
                            : 'bg-slate-600/20 text-slate-400'
                        }`}
                      >
                        {workflow.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span>{workflow.nodes} nodes</span>
                      <span>•</span>
                      <span>{workflow.lastEdited}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Center - Canvas */}
        <div className="flex-1 bg-slate-900 overflow-hidden relative">
          <div
            ref={canvasRef}
            onDrop={handleCanvasDrop}
            onDragOver={handleCanvasDragOver}
            onDragLeave={handleCanvasDragLeave}
            className={`w-full h-full relative transition-all ${
              isDragging ? 'bg-purple-600/5' : ''
            }`}
            style={{
              backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'center',
            }}
          >
            {nodes.length === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <GitBranch className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                  <h3 className="text-xl text-slate-400 mb-2">Start Building Your Logic Workflow</h3>
                  <p className="text-slate-600">Drag nodes from the left panel to get started</p>
                </div>
              </div>
            ) : (
              nodes.map((node) => (
                <NodeComponent
                  key={node.id}
                  node={node}
                  isSelected={selectedNode?.id === node.id}
                  onClick={handleNodeClick}
                  onDelete={handleDeleteNode}
                />
              ))
            )}

            {/* Grid Overlay when dragging */}
            {isDragging && (
              <div className="absolute inset-0 border-2 border-dashed border-purple-500 pointer-events-none rounded-lg"></div>
            )}
          </div>

          {/* Canvas Stats */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-slate-800/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-slate-700">
            <div className="text-xs text-slate-400">Nodes: {nodes.length}</div>
            <div className="w-px h-4 bg-slate-700"></div>
            <div className="text-xs text-slate-400">Connections: {connections.length}</div>
          </div>
        </div>

        {/* Right Panel - Properties */}
        <div className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-slate-800">
            <button
              onClick={() => setRightPanelTab('properties')}
              className={`flex-1 px-4 py-3 text-sm transition-colors ${
                rightPanelTab === 'properties'
                  ? 'text-white bg-slate-800 border-b-2 border-purple-500'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Properties
            </button>
            <button
              onClick={() => setRightPanelTab('code')}
              className={`flex-1 px-4 py-3 text-sm transition-colors ${
                rightPanelTab === 'code'
                  ? 'text-white bg-slate-800 border-b-2 border-purple-500'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Code View
            </button>
          </div>

          {/* Properties Tab */}
          {rightPanelTab === 'properties' && (
            <div className="flex-1 overflow-y-auto p-4">
              {selectedNode ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm text-white mb-3">Node: {selectedNode.label}</h3>
                    <div className="text-xs text-slate-400 mb-4">Type: {selectedNode.type}</div>

                    {/* Configuration based on node type */}
                    {selectedNode.type === 'trigger' && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs text-slate-400 mb-2">Trigger Type</label>
                          <select className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-purple-500">
                            <option>Webhook</option>
                            <option>Schedule</option>
                            <option>Manual</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-slate-400 mb-2">Webhook URL</label>
                          <input
                            type="text"
                            placeholder="https://api.example.com/webhook"
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-purple-500"
                          />
                        </div>
                      </div>
                    )}

                    {selectedNode.type === 'condition' && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs text-slate-400 mb-2">Condition Type</label>
                          <select className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-purple-500">
                            <option>If/Else</option>
                            <option>Greater Than</option>
                            <option>Less Than</option>
                            <option>Equals</option>
                            <option>Contains</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-slate-400 mb-2">Compare Value</label>
                          <input
                            type="text"
                            placeholder="Enter value"
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-400 mb-2">Custom Rule</label>
                          <textarea
                            placeholder="Enter custom logic..."
                            rows={4}
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-purple-500 resize-none"
                          />
                        </div>
                      </div>
                    )}

                    {selectedNode.type === 'action' && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs text-slate-400 mb-2">Action Type</label>
                          <select className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-purple-500">
                            <option>Send Email</option>
                            <option>Create Record</option>
                            <option>Update Record</option>
                            <option>HTTP Request</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-slate-400 mb-2">Parameters</label>
                          <textarea
                            placeholder='{"key": "value"}'
                            rows={4}
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-purple-500 font-mono resize-none"
                          />
                        </div>
                      </div>
                    )}

                    {selectedNode.type === 'logic' && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs text-slate-400 mb-2">Logic Type</label>
                          <select className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-purple-500">
                            <option>Loop</option>
                            <option>Delay</option>
                            <option>Merge</option>
                            <option>Custom Code</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-slate-400 mb-2">Code Editor</label>
                          <textarea
                            placeholder="// Write your custom logic here"
                            rows={8}
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-purple-500 font-mono resize-none"
                          />
                        </div>
                      </div>
                    )}

                    {selectedNode.type === 'integration' && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs text-slate-400 mb-2">Integration</label>
                          <select className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-purple-500">
                            <option>Database</option>
                            <option>Stripe</option>
                            <option>Slack</option>
                            <option>Google Calendar</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-slate-400 mb-2">API Key</label>
                          <input
                            type="password"
                            placeholder="Enter API key"
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-400 mb-2">Endpoint</label>
                          <input
                            type="text"
                            placeholder="https://api.service.com"
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-purple-500"
                          />
                        </div>
                      </div>
                    )}

                    {/* Common Settings */}
                    <div className="mt-6 pt-6 border-t border-slate-800">
                      <h4 className="text-xs text-slate-400 mb-3">Node Settings</h4>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm text-slate-300">
                          <input type="checkbox" className="rounded bg-slate-800 border-slate-700" />
                          Enable Error Handling
                        </label>
                        <label className="flex items-center gap-2 text-sm text-slate-300">
                          <input type="checkbox" className="rounded bg-slate-800 border-slate-700" />
                          Log Execution
                        </label>
                        <label className="flex items-center gap-2 text-sm text-slate-300">
                          <input type="checkbox" className="rounded bg-slate-800 border-slate-700" />
                          Retry on Failure
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Settings className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                  <p className="text-sm text-slate-500">Select a node to edit properties</p>
                </div>
              )}
            </div>
          )}

          {/* Code View Tab */}
          {rightPanelTab === 'code' && (
            <div className="flex-1 overflow-y-auto p-4">
              <div className="bg-slate-950 rounded-lg p-4 border border-slate-800">
                <pre className="text-xs text-green-400 font-mono">
                  <code>
{`{
  "workflow": {
    "name": "Untitled Workflow",
    "nodes": ${nodes.length},
    "connections": ${connections.length},
    "execution": "sequential"
  }
}`}
                  </code>
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
