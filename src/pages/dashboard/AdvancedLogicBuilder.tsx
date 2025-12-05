import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  GitBranch, Plus, Play, Save, Zap, Database, Mail, Calendar, Code,
  Cloud, ShoppingCart, Bell, MessageSquare, FileText, Filter, Split,
  Repeat, Clock, CheckCircle, XCircle, Settings, Trash2, Copy, Eye,
  Download, Upload, Maximize2, Minimize2, ZoomIn, ZoomOut, Move,
  ArrowRight, Circle, Square, Layers, MousePointer, Grid, Braces,
  PlayCircle, PauseCircle, RotateCcw, Share2, FolderOpen, AlertCircle,
  Info, ChevronDown, ChevronRight, Link2, Unlink, Sparkles, TestTube,
  Loader, Terminal
} from 'lucide-react';

// Node Types & Interfaces
interface Position {
  x: number;
  y: number;
}

interface NodeConfig {
  [key: string]: any;
}

interface TriggerConfig {
  triggerType: 'webhook' | 'schedule' | 'event' | 'manual';
  webhookUrl?: string;
  cronExpression?: string;
  eventName?: string;
}

interface ConditionConfig {
  conditionType: 'if-else' | 'switch' | 'filter' | 'compare';
  operator?: 'equals' | 'not-equals' | 'greater' | 'less' | 'contains';
  field?: string;
  value?: string;
  branches?: { condition: string; label: string }[];
}

interface ActionConfig {
  actionType: string;
  params: { [key: string]: any };
}

interface NodeData {
  id: string;
  type: 'trigger' | 'condition' | 'action' | 'logic' | 'integration';
  category: string;
  label: string;
  icon: any;
  config: TriggerConfig | ConditionConfig | ActionConfig | NodeConfig;
  position: Position;
  inputs: number;
  outputs: number;
  color: string;
}

interface Connection {
  id: string;
  from: string;
  to: string;
  fromHandle?: string;
  toHandle?: string;
}

interface LogicFlow {
  id: string;
  name: string;
  description: string;
  nodes: NodeData[];
  connections: Connection[];
  createdAt: Date;
  updatedAt: Date;
}

// Node Library
const nodeLibrary = {
  triggers: [
    { 
      type: 'trigger', 
      category: 'triggers', 
      label: 'Webhook Trigger', 
      icon: Zap, 
      color: 'from-yellow-500 to-orange-600',
      inputs: 0,
      outputs: 1,
      description: 'Trigger workflow via HTTP webhook'
    },
    { 
      type: 'trigger', 
      category: 'triggers', 
      label: 'Schedule Trigger', 
      icon: Clock, 
      color: 'from-yellow-500 to-orange-600',
      inputs: 0,
      outputs: 1,
      description: 'Run workflow on schedule (cron)'
    },
    { 
      type: 'trigger', 
      category: 'triggers', 
      label: 'Event Trigger', 
      icon: Bell, 
      color: 'from-yellow-500 to-orange-600',
      inputs: 0,
      outputs: 1,
      description: 'Trigger on specific events'
    },
    { 
      type: 'trigger', 
      category: 'triggers', 
      label: 'Manual Trigger', 
      icon: PlayCircle, 
      color: 'from-yellow-500 to-orange-600',
      inputs: 0,
      outputs: 1,
      description: 'Run workflow manually'
    },
  ],
  conditions: [
    { 
      type: 'condition', 
      category: 'conditions', 
      label: 'If/Then/Else', 
      icon: Split, 
      color: 'from-blue-500 to-cyan-600',
      inputs: 1,
      outputs: 2,
      description: 'Branch logic based on condition'
    },
    { 
      type: 'condition', 
      category: 'conditions', 
      label: 'Switch Case', 
      icon: GitBranch, 
      color: 'from-blue-500 to-cyan-600',
      inputs: 1,
      outputs: 4,
      description: 'Multiple conditional branches'
    },
    { 
      type: 'condition', 
      category: 'conditions', 
      label: 'Filter', 
      icon: Filter, 
      color: 'from-blue-500 to-cyan-600',
      inputs: 1,
      outputs: 2,
      description: 'Filter data by criteria'
    },
    { 
      type: 'condition', 
      category: 'conditions', 
      label: 'Compare', 
      icon: Code, 
      color: 'from-blue-500 to-cyan-600',
      inputs: 1,
      outputs: 2,
      description: 'Compare values'
    },
  ],
  actions: [
    { 
      type: 'action', 
      category: 'actions', 
      label: 'Send Email', 
      icon: Mail, 
      color: 'from-green-500 to-emerald-600',
      inputs: 1,
      outputs: 1,
      description: 'Send email notification'
    },
    { 
      type: 'action', 
      category: 'actions', 
      label: 'Database Query', 
      icon: Database, 
      color: 'from-green-500 to-emerald-600',
      inputs: 1,
      outputs: 1,
      description: 'Execute database operation'
    },
    { 
      type: 'action', 
      category: 'actions', 
      label: 'HTTP Request', 
      icon: Cloud, 
      color: 'from-green-500 to-emerald-600',
      inputs: 1,
      outputs: 1,
      description: 'Make HTTP API call'
    },
    { 
      type: 'action', 
      category: 'actions', 
      label: 'Notification', 
      icon: Bell, 
      color: 'from-green-500 to-emerald-600',
      inputs: 1,
      outputs: 1,
      description: 'Send push notification'
    },
  ],
  logic: [
    { 
      type: 'logic', 
      category: 'logic', 
      label: 'Loop', 
      icon: Repeat, 
      color: 'from-purple-500 to-pink-600',
      inputs: 1,
      outputs: 1,
      description: 'Iterate over items'
    },
    { 
      type: 'logic', 
      category: 'logic', 
      label: 'Delay', 
      icon: Clock, 
      color: 'from-purple-500 to-pink-600',
      inputs: 1,
      outputs: 1,
      description: 'Wait for specified time'
    },
    { 
      type: 'logic', 
      category: 'logic', 
      label: 'Merge', 
      icon: GitBranch, 
      color: 'from-purple-500 to-pink-600',
      inputs: 2,
      outputs: 1,
      description: 'Merge multiple paths'
    },
    { 
      type: 'logic', 
      category: 'logic', 
      label: 'Custom Code', 
      icon: Code, 
      color: 'from-purple-500 to-pink-600',
      inputs: 1,
      outputs: 1,
      description: 'Execute custom JavaScript'
    },
  ],
  integrations: [
    { 
      type: 'integration', 
      category: 'integrations', 
      label: 'Stripe Payment', 
      icon: ShoppingCart, 
      color: 'from-indigo-500 to-purple-600',
      inputs: 1,
      outputs: 1,
      description: 'Process payment via Stripe'
    },
    { 
      type: 'integration', 
      category: 'integrations', 
      label: 'Slack Message', 
      icon: MessageSquare, 
      color: 'from-indigo-500 to-purple-600',
      inputs: 1,
      outputs: 1,
      description: 'Send Slack message'
    },
    { 
      type: 'integration', 
      category: 'integrations', 
      label: 'Google Calendar', 
      icon: Calendar, 
      color: 'from-indigo-500 to-purple-600',
      inputs: 1,
      outputs: 1,
      description: 'Create calendar event'
    },
    { 
      type: 'integration', 
      category: 'integrations', 
      label: 'Storage Upload', 
      icon: Upload, 
      color: 'from-indigo-500 to-purple-600',
      inputs: 1,
      outputs: 1,
      description: 'Upload file to storage'
    },
  ],
};

// Node Component
function NodeComponent({ 
  node, 
  isSelected, 
  onClick, 
  onDelete, 
  onDragStart,
  onConnect
}: any) {
  const Icon = node.icon;
  
  const getNodeShape = () => {
    switch (node.type) {
      case 'trigger':
        return 'rounded-2xl';
      case 'condition':
        return 'rounded-lg';
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
      className="absolute cursor-move group"
      style={{
        left: node.position.x,
        top: node.position.y,
        zIndex: isSelected ? 50 : 10,
      }}
      onClick={() => onClick(node)}
      draggable
      onDragStart={(e) => onDragStart(e, node)}
    >
      <div className="relative">
        {/* Input Connection Point */}
        {node.inputs > 0 && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-1">
            {Array.from({ length: node.inputs }).map((_, i) => (
              <div
                key={`input-${i}`}
                className="w-3 h-3 bg-blue-500 border-2 border-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-crosshair z-20 hover:scale-125"
                onClick={(e) => {
                  e.stopPropagation();
                  onConnect && onConnect(node.id, 'input', i);
                }}
              />
            ))}
          </div>
        )}

        {/* Node Body */}
        <div
          className={`${getNodeShape()} bg-gradient-to-br ${node.color} p-4 shadow-lg transition-all min-w-[160px] ${
            isSelected ? 'ring-4 ring-blue-500 scale-105' : 'hover:shadow-xl hover:scale-102'
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-sm text-white font-medium text-center">{node.label}</div>
            {node.type === 'trigger' && (
              <div className="px-2 py-1 bg-white/20 rounded text-xs text-white">
                Start
              </div>
            )}
          </div>
        </div>

        {/* Output Connection Points */}
        {node.outputs > 0 && (
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
            {Array.from({ length: node.outputs }).map((_, i) => (
              <div
                key={`output-${i}`}
                className="w-3 h-3 bg-green-500 border-2 border-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-crosshair z-20 hover:scale-125"
                onClick={(e) => {
                  e.stopPropagation();
                  onConnect && onConnect(node.id, 'output', i);
                }}
              />
            ))}
          </div>
        )}

        {/* Delete Button */}
        {isSelected && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(node.id);
            }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg z-30"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        )}

        {/* Badge for output count on conditions */}
        {node.type === 'condition' && node.outputs > 2 && (
          <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">
            {node.outputs}
          </div>
        )}
      </div>
    </div>
  );
}

// Connection Line Component
function ConnectionLine({ from, to, fromNode, toNode, isSelected, onClick }: any) {
  if (!fromNode || !toNode) return null;

  const x1 = fromNode.position.x + 80; // Center of node
  const y1 = fromNode.position.y + 70; // Bottom of node
  const x2 = toNode.position.x + 80;
  const y2 = toNode.position.y + 20; // Top of node

  // Create curved path
  const midY = (y1 + y2) / 2;
  const path = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;

  return (
    <g onClick={() => onClick && onClick({ from, to })}>
      <path
        d={path}
        stroke={isSelected ? '#3b82f6' : '#64748b'}
        strokeWidth={isSelected ? '3' : '2'}
        fill="none"
        className="cursor-pointer hover:stroke-blue-500 transition-all"
        markerEnd="url(#arrowhead)"
      />
    </g>
  );
}

export default function AdvancedLogicBuilder() {
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [selectedConnection, setSelectedConnection] = useState<Connection | null>(null);
  const [leftPanelTab, setLeftPanelTab] = useState<'nodes' | 'templates'>('nodes');
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [zoom, setZoom] = useState(100);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedNode, setDraggedNode] = useState<any>(null);
  const [connectingFrom, setConnectingFrom] = useState<{ nodeId: string; type: 'input' | 'output'; index: number } | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const canvasRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Canvas Drop Handler
  const handleCanvasDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (!draggedNode || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / (zoom / 100) - 80;
    const y = (e.clientY - rect.top) / (zoom / 100) - 35;

    const newNode: NodeData = {
      id: `node-${Date.now()}`,
      type: draggedNode.type,
      category: draggedNode.category,
      label: draggedNode.label,
      icon: draggedNode.icon,
      color: draggedNode.color,
      config: {},
      position: { x: Math.max(0, x), y: Math.max(0, y) },
      inputs: draggedNode.inputs,
      outputs: draggedNode.outputs,
    };

    setNodes([...nodes, newNode]);
    setSelectedNode(newNode);
    setDraggedNode(null);
  }, [draggedNode, nodes, zoom]);

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
    setSelectedConnection(null);
    setRightPanelOpen(true);
  };

  const handleDeleteNode = (nodeId: string) => {
    setNodes(nodes.filter(n => n.id !== nodeId));
    setConnections(connections.filter(c => c.from !== nodeId && c.to !== nodeId));
    setSelectedNode(null);
  };

  const handleConnect = (nodeId: string, type: 'input' | 'output', index: number) => {
    if (!connectingFrom) {
      // Start connection
      setConnectingFrom({ nodeId, type, index });
    } else {
      // Complete connection
      if (connectingFrom.type !== type) {
        const newConnection: Connection = {
          id: `conn-${Date.now()}`,
          from: connectingFrom.type === 'output' ? connectingFrom.nodeId : nodeId,
          to: connectingFrom.type === 'input' ? connectingFrom.nodeId : nodeId,
        };
        setConnections([...connections, newConnection]);
      }
      setConnectingFrom(null);
    }
  };

  const handleDeleteConnection = () => {
    if (selectedConnection) {
      setConnections(connections.filter(c => c.id !== selectedConnection.id));
      setSelectedConnection(null);
    }
  };

  const handleNodePositionChange = (e: React.DragEvent, node: NodeData) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / (zoom / 100) - 80;
    const y = (e.clientY - rect.top) / (zoom / 100) - 35;

    setNodes(nodes.map(n => 
      n.id === node.id 
        ? { ...n, position: { x: Math.max(0, x), y: Math.max(0, y) } }
        : n
    ));
  };

  const handleRunFlow = () => {
    setIsRunning(true);
    setExecutionLogs([]);
    
    // Simulate execution
    const logs: string[] = [];
    const triggerNodes = nodes.filter(n => n.type === 'trigger');
    
    if (triggerNodes.length === 0) {
      logs.push('[ERROR] No trigger node found');
      setExecutionLogs(logs);
      setIsRunning(false);
      return;
    }

    logs.push('[INFO] Starting workflow execution...');
    logs.push(`[TRIGGER] ${triggerNodes[0].label} activated`);
    
    // Simulate node execution
    setTimeout(() => {
      nodes.forEach(node => {
        if (node.type !== 'trigger') {
          logs.push(`[${node.type.toUpperCase()}] Executing ${node.label}...`);
        }
      });
      logs.push('[SUCCESS] Workflow completed successfully');
      setExecutionLogs(logs);
      setIsRunning(false);
    }, 2000);
  };

  const handleSaveFlow = () => {
    const flow: LogicFlow = {
      id: `flow-${Date.now()}`,
      name: 'Untitled Flow',
      description: '',
      nodes,
      connections,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const dataStr = JSON.stringify(flow, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `logic-flow-${Date.now()}.json`;
    link.click();
  };

  const handleClearCanvas = () => {
    if (confirm('Are you sure you want to clear the canvas?')) {
      setNodes([]);
      setConnections([]);
      setSelectedNode(null);
      setSelectedConnection(null);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-slate-950">
      {/* Top Toolbar */}
      <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <GitBranch className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg text-white">Node-Based Logic Builder</h1>
              <p className="text-xs text-slate-400">Visual workflow automation</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Zoom Controls */}
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-800 rounded-lg">
            <button
              onClick={() => setZoom(Math.max(25, zoom - 25))}
              className="p-1 hover:bg-slate-700 rounded transition-colors"
            >
              <ZoomOut className="w-4 h-4 text-slate-400" />
            </button>
            <span className="text-sm text-slate-400 min-w-[50px] text-center">{zoom}%</span>
            <button
              onClick={() => setZoom(Math.min(200, zoom + 25))}
              className="p-1 hover:bg-slate-700 rounded transition-colors"
            >
              <ZoomIn className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Action Buttons */}
          <button
            onClick={handleRunFlow}
            disabled={isRunning || nodes.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRunning ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <PlayCircle className="w-4 h-4" />
                Run Flow
              </>
            )}
          </button>

          <button
            onClick={handleSaveFlow}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
          >
            <Save className="w-4 h-4" />
            Save
          </button>

          <button
            onClick={handleClearCanvas}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </button>

          <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors">
            <Share2 className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Node Library */}
        <div className="w-80 bg-slate-900 border-r border-slate-800 flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-slate-800">
            <button
              onClick={() => setLeftPanelTab('nodes')}
              className={`flex-1 px-4 py-3 text-sm transition-colors ${
                leftPanelTab === 'nodes'
                  ? 'bg-slate-800 text-white border-b-2 border-blue-500'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Layers className="w-4 h-4" />
                Nodes
              </div>
            </button>
            <button
              onClick={() => setLeftPanelTab('templates')}
              className={`flex-1 px-4 py-3 text-sm transition-colors ${
                leftPanelTab === 'templates'
                  ? 'bg-slate-800 text-white border-b-2 border-blue-500'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <FolderOpen className="w-4 h-4" />
                Templates
              </div>
            </button>
          </div>

          {/* Node Library Content */}
          {leftPanelTab === 'nodes' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Triggers */}
              <div>
                <h3 className="text-sm text-slate-400 mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Triggers
                </h3>
                <div className="space-y-2">
                  {nodeLibrary.triggers.map((node, idx) => {
                    const Icon = node.icon;
                    return (
                      <div
                        key={idx}
                        draggable
                        onDragStart={() => handleNodeDragStart(node)}
                        className="p-3 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-lg cursor-move transition-all hover:scale-102 group"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 bg-gradient-to-br ${node.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm text-white mb-1">{node.label}</div>
                            <div className="text-xs text-slate-400">{node.description}</div>
                          </div>
                          <Move className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors flex-shrink-0" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Conditions */}
              <div>
                <h3 className="text-sm text-slate-400 mb-3 flex items-center gap-2">
                  <Split className="w-4 h-4" />
                  Conditions
                </h3>
                <div className="space-y-2">
                  {nodeLibrary.conditions.map((node, idx) => {
                    const Icon = node.icon;
                    return (
                      <div
                        key={idx}
                        draggable
                        onDragStart={() => handleNodeDragStart(node)}
                        className="p-3 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-lg cursor-move transition-all hover:scale-102 group"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 bg-gradient-to-br ${node.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm text-white mb-1">{node.label}</div>
                            <div className="text-xs text-slate-400">{node.description}</div>
                          </div>
                          <Move className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors flex-shrink-0" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div>
                <h3 className="text-sm text-slate-400 mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Actions
                </h3>
                <div className="space-y-2">
                  {nodeLibrary.actions.map((node, idx) => {
                    const Icon = node.icon;
                    return (
                      <div
                        key={idx}
                        draggable
                        onDragStart={() => handleNodeDragStart(node)}
                        className="p-3 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-lg cursor-move transition-all hover:scale-102 group"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 bg-gradient-to-br ${node.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm text-white mb-1">{node.label}</div>
                            <div className="text-xs text-slate-400">{node.description}</div>
                          </div>
                          <Move className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors flex-shrink-0" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Logic */}
              <div>
                <h3 className="text-sm text-slate-400 mb-3 flex items-center gap-2">
                  <GitBranch className="w-4 h-4" />
                  Logic
                </h3>
                <div className="space-y-2">
                  {nodeLibrary.logic.map((node, idx) => {
                    const Icon = node.icon;
                    return (
                      <div
                        key={idx}
                        draggable
                        onDragStart={() => handleNodeDragStart(node)}
                        className="p-3 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-lg cursor-move transition-all hover:scale-102 group"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 bg-gradient-to-br ${node.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm text-white mb-1">{node.label}</div>
                            <div className="text-xs text-slate-400">{node.description}</div>
                          </div>
                          <Move className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors flex-shrink-0" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Integrations */}
              <div>
                <h3 className="text-sm text-slate-400 mb-3 flex items-center gap-2">
                  <Cloud className="w-4 h-4" />
                  Integrations
                </h3>
                <div className="space-y-2">
                  {nodeLibrary.integrations.map((node, idx) => {
                    const Icon = node.icon;
                    return (
                      <div
                        key={idx}
                        draggable
                        onDragStart={() => handleNodeDragStart(node)}
                        className="p-3 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-lg cursor-move transition-all hover:scale-102 group"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 bg-gradient-to-br ${node.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm text-white mb-1">{node.label}</div>
                            <div className="text-xs text-slate-400">{node.description}</div>
                          </div>
                          <Move className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors flex-shrink-0" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Templates Tab */}
          {leftPanelTab === 'templates' && (
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-3">
                <div className="p-4 bg-slate-800 border border-slate-700 rounded-lg hover:border-blue-500 cursor-pointer transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-white mb-1">Email Automation</div>
                      <div className="text-xs text-slate-400">Send automated emails based on triggers</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-800 border border-slate-700 rounded-lg hover:border-blue-500 cursor-pointer transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Database className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-white mb-1">Data Sync</div>
                      <div className="text-xs text-slate-400">Sync data between databases</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-800 border border-slate-700 rounded-lg hover:border-blue-500 cursor-pointer transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Bell className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-white mb-1">Notification System</div>
                      <div className="text-xs text-slate-400">Multi-channel notification workflow</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Canvas Area */}
        <div className="flex-1 relative overflow-hidden bg-slate-950">
          {/* Grid Background */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(71, 85, 105, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(71, 85, 105, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: `${20 * (zoom / 100)}px ${20 * (zoom / 100)}px`,
            }}
          />

          {/* Canvas */}
          <div
            ref={canvasRef}
            className={`relative w-full h-full ${isDragging ? 'bg-blue-500/5' : ''}`}
            onDrop={handleCanvasDrop}
            onDragOver={handleCanvasDragOver}
            onDragLeave={handleCanvasDragLeave}
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top left',
            }}
          >
            {/* SVG for Connections */}
            <svg
              ref={svgRef}
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: 5 }}
            >
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="10"
                  refX="9"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3, 0 6" fill="#64748b" />
                </marker>
              </defs>
              {connections.map((conn) => {
                const fromNode = nodes.find(n => n.id === conn.from);
                const toNode = nodes.find(n => n.id === conn.to);
                return (
                  <ConnectionLine
                    key={conn.id}
                    from={conn.from}
                    to={conn.to}
                    fromNode={fromNode}
                    toNode={toNode}
                    isSelected={selectedConnection?.id === conn.id}
                    onClick={() => setSelectedConnection(conn)}
                  />
                );
              })}
            </svg>

            {/* Nodes */}
            {nodes.map((node) => (
              <NodeComponent
                key={node.id}
                node={node}
                isSelected={selectedNode?.id === node.id}
                onClick={handleNodeClick}
                onDelete={handleDeleteNode}
                onDragStart={handleNodePositionChange}
                onConnect={handleConnect}
              />
            ))}

            {/* Empty State */}
            {nodes.length === 0 && !isDragging && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MousePointer className="w-10 h-10 text-slate-600" />
                  </div>
                  <h3 className="text-xl text-slate-400 mb-2">Start Building Your Logic</h3>
                  <p className="text-sm text-slate-600 mb-4">Drag nodes from the left panel to create your workflow</p>
                  <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
                    <Circle className="w-3 h-3" />
                    <span>Triggers</span>
                    <ArrowRight className="w-3 h-3" />
                    <Square className="w-3 h-3" />
                    <span>Conditions</span>
                    <ArrowRight className="w-3 h-3" />
                    <Circle className="w-3 h-3" />
                    <span>Actions</span>
                  </div>
                </div>
              </div>
            )}

            {/* Drop Zone Indicator */}
            {isDragging && (
              <div className="absolute inset-0 border-4 border-dashed border-blue-500 rounded-lg pointer-events-none flex items-center justify-center">
                <div className="px-6 py-3 bg-blue-600 rounded-lg text-white">
                  Drop node here
                </div>
              </div>
            )}
          </div>

          {/* Canvas Info */}
          <div className="absolute bottom-4 left-4 flex items-center gap-3">
            <div className="px-3 py-2 bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-lg text-xs text-slate-400">
              Nodes: {nodes.length}
            </div>
            <div className="px-3 py-2 bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-lg text-xs text-slate-400">
              Connections: {connections.length}
            </div>
            {connectingFrom && (
              <div className="px-3 py-2 bg-blue-600 text-white rounded-lg text-xs flex items-center gap-2">
                <Link2 className="w-3 h-3 animate-pulse" />
                Click another node to connect
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Properties */}
        {rightPanelOpen && (
          <div className="w-96 bg-slate-900 border-l border-slate-800 flex flex-col">
            {/* Header */}
            <div className="h-14 px-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-sm text-white flex items-center gap-2">
                <Settings className="w-4 h-4" />
                {selectedNode ? 'Node Configuration' : selectedConnection ? 'Connection' : 'Properties'}
              </h3>
              <button
                onClick={() => setRightPanelOpen(false)}
                className="p-1 hover:bg-slate-800 rounded transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {selectedNode ? (
                <div className="space-y-6">
                  {/* Node Info */}
                  <div>
                    <label className="block text-xs text-slate-400 mb-2">Node Type</label>
                    <div className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white">
                      {selectedNode.type.charAt(0).toUpperCase() + selectedNode.type.slice(1)}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-2">Label</label>
                    <input
                      type="text"
                      value={selectedNode.label}
                      onChange={(e) => {
                        setNodes(nodes.map(n => 
                          n.id === selectedNode.id 
                            ? { ...n, label: e.target.value }
                            : n
                        ));
                        setSelectedNode({ ...selectedNode, label: e.target.value });
                      }}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Trigger Configuration */}
                  {selectedNode.type === 'trigger' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs text-slate-400 mb-2">Trigger Type</label>
                        <select className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500">
                          <option>Webhook</option>
                          <option>Schedule (Cron)</option>
                          <option>Event</option>
                          <option>Manual</option>
                        </select>
                      </div>

                      {selectedNode.label === 'Webhook Trigger' && (
                        <div>
                          <label className="block text-xs text-slate-400 mb-2">Webhook URL</label>
                          <input
                            type="text"
                            placeholder="https://api.example.com/webhook"
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500"
                          />
                          <div className="mt-2 p-2 bg-blue-500/10 border border-blue-500/30 rounded text-xs text-blue-400">
                            <Info className="w-3 h-3 inline mr-1" />
                            POST requests to this URL will trigger the workflow
                          </div>
                        </div>
                      )}

                      {selectedNode.label === 'Schedule Trigger' && (
                        <div>
                          <label className="block text-xs text-slate-400 mb-2">Cron Expression</label>
                          <input
                            type="text"
                            placeholder="0 0 * * *"
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white font-mono outline-none focus:border-blue-500"
                          />
                          <div className="mt-2 text-xs text-slate-500">
                            Examples:<br />
                            • 0 0 * * * - Daily at midnight<br />
                            • 0 */6 * * * - Every 6 hours<br />
                            • 0 9 * * 1 - Every Monday at 9 AM
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Condition Configuration */}
                  {selectedNode.type === 'condition' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs text-slate-400 mb-2">Condition Type</label>
                        <select className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500">
                          <option>If/Then/Else</option>
                          <option>Switch Case</option>
                          <option>Filter</option>
                          <option>Compare</option>
                        </select>
                      </div>

                      {selectedNode.label === 'If/Then/Else' && (
                        <>
                          <div>
                            <label className="block text-xs text-slate-400 mb-2">Field to Check</label>
                            <input
                              type="text"
                              placeholder="data.status"
                              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white font-mono outline-none focus:border-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-xs text-slate-400 mb-2">Operator</label>
                            <select className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500">
                              <option>Equals (==)</option>
                              <option>Not Equals (!=)</option>
                              <option>Greater Than (&gt;)</option>
                              <option>Less Than (&lt;)</option>
                              <option>Contains</option>
                              <option>Starts With</option>
                              <option>Ends With</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs text-slate-400 mb-2">Value</label>
                            <input
                              type="text"
                              placeholder="Enter value"
                              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500"
                            />
                          </div>

                          <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                            <div className="text-xs text-green-400 mb-1">True Branch (Top Output)</div>
                            <div className="text-xs text-slate-400">Condition is met</div>
                          </div>

                          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                            <div className="text-xs text-red-400 mb-1">False Branch (Bottom Output)</div>
                            <div className="text-xs text-slate-400">Condition is not met</div>
                          </div>
                        </>
                      )}

                      {selectedNode.label === 'Switch Case' && (
                        <>
                          <div>
                            <label className="block text-xs text-slate-400 mb-2">Switch Field</label>
                            <input
                              type="text"
                              placeholder="data.type"
                              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white font-mono outline-none focus:border-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-xs text-slate-400 mb-2">Cases</label>
                            <div className="space-y-2">
                              <input
                                type="text"
                                placeholder="Case 1 value"
                                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500"
                              />
                              <input
                                type="text"
                                placeholder="Case 2 value"
                                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500"
                              />
                              <button className="w-full px-3 py-2 bg-slate-800 border border-slate-700 hover:border-blue-500 rounded-lg text-sm text-slate-400 hover:text-white transition-colors">
                                + Add Case
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* Action Configuration */}
                  {selectedNode.type === 'action' && (
                    <div className="space-y-4">
                      {selectedNode.label === 'Send Email' && (
                        <>
                          <div>
                            <label className="block text-xs text-slate-400 mb-2">To Email</label>
                            <input
                              type="email"
                              placeholder="user@example.com"
                              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-xs text-slate-400 mb-2">Subject</label>
                            <input
                              type="text"
                              placeholder="Email subject"
                              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-xs text-slate-400 mb-2">Message</label>
                            <textarea
                              rows={4}
                              placeholder="Email message..."
                              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500 resize-none"
                            />
                          </div>
                        </>
                      )}

                      {selectedNode.label === 'Database Query' && (
                        <>
                          <div>
                            <label className="block text-xs text-slate-400 mb-2">Operation</label>
                            <select className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500">
                              <option>SELECT</option>
                              <option>INSERT</option>
                              <option>UPDATE</option>
                              <option>DELETE</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs text-slate-400 mb-2">Table</label>
                            <input
                              type="text"
                              placeholder="users"
                              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-xs text-slate-400 mb-2">Query</label>
                            <textarea
                              rows={4}
                              placeholder="SELECT * FROM users WHERE..."
                              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white font-mono outline-none focus:border-blue-500 resize-none"
                            />
                          </div>
                        </>
                      )}

                      {selectedNode.label === 'HTTP Request' && (
                        <>
                          <div>
                            <label className="block text-xs text-slate-400 mb-2">Method</label>
                            <select className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500">
                              <option>GET</option>
                              <option>POST</option>
                              <option>PUT</option>
                              <option>PATCH</option>
                              <option>DELETE</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs text-slate-400 mb-2">URL</label>
                            <input
                              type="text"
                              placeholder="https://api.example.com/endpoint"
                              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-xs text-slate-400 mb-2">Headers (JSON)</label>
                            <textarea
                              rows={3}
                              placeholder='{"Authorization": "Bearer token"}'
                              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white font-mono outline-none focus:border-blue-500 resize-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs text-slate-400 mb-2">Body (JSON)</label>
                            <textarea
                              rows={4}
                              placeholder='{"key": "value"}'
                              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white font-mono outline-none focus:border-blue-500 resize-none"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* Logic Configuration */}
                  {selectedNode.type === 'logic' && (
                    <div className="space-y-4">
                      {selectedNode.label === 'Loop' && (
                        <>
                          <div>
                            <label className="block text-xs text-slate-400 mb-2">Loop Over</label>
                            <input
                              type="text"
                              placeholder="data.items"
                              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white font-mono outline-none focus:border-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-xs text-slate-400 mb-2">Item Variable Name</label>
                            <input
                              type="text"
                              placeholder="item"
                              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500"
                            />
                          </div>
                        </>
                      )}

                      {selectedNode.label === 'Delay' && (
                        <>
                          <div>
                            <label className="block text-xs text-slate-400 mb-2">Duration</label>
                            <div className="flex gap-2">
                              <input
                                type="number"
                                placeholder="5"
                                className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500"
                              />
                              <select className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500">
                                <option>Seconds</option>
                                <option>Minutes</option>
                                <option>Hours</option>
                              </select>
                            </div>
                          </div>
                        </>
                      )}

                      {selectedNode.label === 'Custom Code' && (
                        <>
                          <div>
                            <label className="block text-xs text-slate-400 mb-2">JavaScript Code</label>
                            <textarea
                              rows={8}
                              placeholder="// Your custom code here
return {
  result: data.value * 2
};"
                              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white font-mono outline-none focus:border-blue-500 resize-none"
                            />
                          </div>
                          <div className="p-2 bg-yellow-500/10 border border-yellow-500/30 rounded text-xs text-yellow-400">
                            <AlertCircle className="w-3 h-3 inline mr-1" />
                            Code has access to 'data' variable
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* Test Button */}
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg transition-all">
                    <TestTube className="w-4 h-4" />
                    Test Node
                  </button>
                </div>
              ) : selectedConnection ? (
                <div className="space-y-4">
                  <div className="p-3 bg-slate-800 border border-slate-700 rounded-lg">
                    <div className="text-xs text-slate-400 mb-1">From</div>
                    <div className="text-sm text-white">{nodes.find(n => n.id === selectedConnection.from)?.label}</div>
                  </div>

                  <div className="flex justify-center">
                    <ArrowRight className="w-5 h-5 text-slate-600" />
                  </div>

                  <div className="p-3 bg-slate-800 border border-slate-700 rounded-lg">
                    <div className="text-xs text-slate-400 mb-1">To</div>
                    <div className="text-sm text-white">{nodes.find(n => n.id === selectedConnection.to)?.label}</div>
                  </div>

                  <button
                    onClick={handleDeleteConnection}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors"
                  >
                    <Unlink className="w-4 h-4" />
                    Delete Connection
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-4">
                    <Info className="w-8 h-8 text-slate-600" />
                  </div>
                  <div className="text-sm text-slate-400 mb-2">No Selection</div>
                  <div className="text-xs text-slate-600">Select a node or connection to configure</div>
                </div>
              )}
            </div>

            {/* Execution Logs */}
            {executionLogs.length > 0 && (
              <div className="border-t border-slate-800">
                <div className="p-3 bg-slate-800">
                  <div className="text-xs text-slate-400 mb-2 flex items-center gap-2">
                    <Terminal className="w-3 h-3" />
                    Execution Logs
                  </div>
                  <div className="max-h-40 overflow-y-auto space-y-1">
                    {executionLogs.map((log, idx) => (
                      <div key={idx} className="text-xs font-mono text-green-400">
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Right Panel Collapsed Button */}
        {!rightPanelOpen && (
          <button
            onClick={() => setRightPanelOpen(true)}
            className="absolute top-20 right-4 p-2 bg-slate-900 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-slate-400 rotate-180" />
          </button>
        )}
      </div>
    </div>
  );
}
