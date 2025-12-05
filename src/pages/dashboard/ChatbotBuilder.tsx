import React, { useState, useRef } from 'react';
import {
  Bot, Plus, Play, Save, Settings, Download, Code, MessageSquare, Zap,
  Globe, Database, Brain, Trash2, Copy, Eye, Languages, Clock, Server,
  Send, User, Smartphone, Monitor, X, ChevronDown, ArrowRight, Circle,
  CheckCircle, AlertCircle, FileCode, Upload, Sparkles, Volume2
} from 'lucide-react';

interface FlowNode {
  id: string;
  type: 'start' | 'message' | 'question' | 'condition' | 'action' | 'ai_response';
  label: string;
  content: any;
  position: { x: number; y: number };
  connections: string[];
}

interface ChatMessage {
  role: 'user' | 'bot';
  message: string;
  timestamp: Date;
}

export default function ChatbotBuilder() {
  const [activeTab, setActiveTab] = useState<'builder' | 'settings' | 'deploy'>('builder');
  const [flowNodes, setFlowNodes] = useState<FlowNode[]>([
    {
      id: 'start',
      type: 'start',
      label: 'Start',
      content: { message: 'Hello! How can I help you today?' },
      position: { x: 100, y: 100 },
      connections: []
    }
  ]);
  const [selectedNode, setSelectedNode] = useState<FlowNode | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  
  // Settings
  const [botName, setBotName] = useState('My AI Chatbot');
  const [botLanguage, setBotLanguage] = useState('english');
  const [memoryEnabled, setMemoryEnabled] = useState(true);
  const [memoryDuration, setMemoryDuration] = useState('30');
  const [aiModel, setAiModel] = useState('gpt-4');
  const [responseStyle, setResponseStyle] = useState('friendly');

  const languages = [
    { code: 'english', name: 'English', flag: '🇬🇧' },
    { code: 'hindi', name: 'हिन्दी (Hindi)', flag: '🇮🇳' },
    { code: 'spanish', name: 'Español', flag: '🇪🇸' },
    { code: 'french', name: 'Français', flag: '🇫🇷' },
    { code: 'german', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'chinese', name: '中文', flag: '🇨🇳' },
    { code: 'japanese', name: '日本語', flag: '🇯🇵' },
    { code: 'arabic', name: 'العربية', flag: '🇸🇦' },
  ];

  const nodeTypes = [
    { type: 'message', label: 'Bot Message', icon: MessageSquare, color: 'from-blue-600 to-cyan-600', description: 'Send a message to user' },
    { type: 'question', label: 'Ask Question', icon: MessageSquare, color: 'from-green-600 to-emerald-600', description: 'Ask user for input' },
    { type: 'condition', label: 'Condition', icon: Zap, color: 'from-purple-600 to-pink-600', description: 'Branch based on condition' },
    { type: 'ai_response', label: 'AI Response', icon: Brain, color: 'from-orange-600 to-red-600', description: 'Generate AI response' },
    { type: 'action', label: 'Action', icon: Zap, color: 'from-indigo-600 to-purple-600', description: 'Perform an action' },
  ];

  const handleAddNode = (type: string) => {
    const newNode: FlowNode = {
      id: `node-${Date.now()}`,
      type: type as any,
      label: `New ${type}`,
      content: {},
      position: { x: 300, y: flowNodes.length * 150 + 100 },
      connections: []
    };
    setFlowNodes([...flowNodes, newNode]);
  };

  const handleDeleteNode = (nodeId: string) => {
    setFlowNodes(flowNodes.filter(n => n.id !== nodeId));
    if (selectedNode?.id === nodeId) {
      setSelectedNode(null);
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMsg: ChatMessage = {
      role: 'user',
      message: inputMessage,
      timestamp: new Date()
    };

    setChatMessages([...chatMessages, userMsg]);

    // Simulate bot response
    setTimeout(() => {
      const botMsg: ChatMessage = {
        role: 'bot',
        message: `I received your message: "${inputMessage}". This is a preview response from ${botName}.`,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, botMsg]);
    }, 1000);

    setInputMessage('');
  };

  const generateHTMLCode = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${botName} - Chatbot</title>
  <style>
    .chatbot-widget {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 999999;
    }
    .chatbot-button {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, #3B82F6, #8B5CF6);
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .chatbot-window {
      position: absolute;
      bottom: 80px;
      right: 0;
      width: 380px;
      height: 600px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 8px 40px rgba(0,0,0,0.2);
      display: none;
      flex-direction: column;
    }
    .chatbot-window.open { display: flex; }
    .chat-header {
      padding: 20px;
      background: linear-gradient(135deg, #3B82F6, #8B5CF6);
      color: white;
      border-radius: 16px 16px 0 0;
    }
    .chat-messages {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
    }
    .chat-input {
      padding: 20px;
      border-top: 1px solid #e5e7eb;
    }
  </style>
</head>
<body>
  <div class="chatbot-widget" id="chatbot">
    <button class="chatbot-button" onclick="toggleChat()">
      <svg width="30" height="30" fill="white" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3 .97 4.29L2 22l5.71-.97C9 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
      </svg>
    </button>
    <div class="chatbot-window" id="chatWindow">
      <div class="chat-header">
        <h3>${botName}</h3>
        <p>Powered by Devnora AI</p>
      </div>
      <div class="chat-messages" id="messages"></div>
      <div class="chat-input">
        <input type="text" id="userInput" placeholder="Type your message..." />
        <button onclick="sendMessage()">Send</button>
      </div>
    </div>
  </div>
  <script>
    function toggleChat() {
      document.getElementById('chatWindow').classList.toggle('open');
    }
    function sendMessage() {
      const input = document.getElementById('userInput');
      const message = input.value;
      if (message.trim()) {
        // Send to your API endpoint
        fetch('YOUR_API_ENDPOINT', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, language: '${botLanguage}' })
        });
        input.value = '';
      }
    }
  </script>
</body>
</html>`;
  };

  const generateJSCode = () => {
    return `// ${botName} - Chatbot Script
// Generated by Devnora AI

class Chatbot {
  constructor(config) {
    this.name = config.name || '${botName}';
    this.language = config.language || '${botLanguage}';
    this.memoryEnabled = ${memoryEnabled};
    this.memoryDuration = ${memoryDuration};
    this.apiEndpoint = config.apiEndpoint;
    this.conversationHistory = [];
  }

  async sendMessage(message) {
    if (this.memoryEnabled) {
      this.conversationHistory.push({ role: 'user', message });
    }

    try {
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          language: this.language,
          history: this.conversationHistory
        })
      });
      
      const data = await response.json();
      
      if (this.memoryEnabled) {
        this.conversationHistory.push({ role: 'bot', message: data.response });
        this.cleanupMemory();
      }
      
      return data.response;
    } catch (error) {
      console.error('Chatbot error:', error);
      return 'Sorry, I encountered an error. Please try again.';
    }
  }

  cleanupMemory() {
    const expiryTime = Date.now() - (this.memoryDuration * 60 * 1000);
    this.conversationHistory = this.conversationHistory.filter(
      item => item.timestamp > expiryTime
    );
  }

  clearMemory() {
    this.conversationHistory = [];
  }
}

// Usage:
const bot = new Chatbot({
  name: '${botName}',
  language: '${botLanguage}',
  apiEndpoint: 'YOUR_API_ENDPOINT_HERE'
});

// Send message
bot.sendMessage('Hello!').then(response => {
  console.log(response);
});`;
  };

  const handleExportHTML = () => {
    const html = generateHTMLCode();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${botName.toLowerCase().replace(/\s+/g, '-')}-chatbot.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportJS = () => {
    const js = generateJSCode();
    const blob = new Blob([js], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${botName.toLowerCase().replace(/\s+/g, '-')}-chatbot.js`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-slate-950 flex flex-col">
      {/* Top Toolbar */}
      <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-400" />
            <h1 className="text-lg text-white">AI Chatbot Builder</h1>
          </div>
          <div className="h-6 w-px bg-slate-700"></div>
          <input
            type="text"
            value={botName}
            onChange={(e) => setBotName(e.target.value)}
            className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>

          <button
            onClick={() => setActiveTab('deploy')}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
          >
            <Code className="w-4 h-4" />
            Get Code
          </button>

          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg transition-all">
            <Save className="w-4 h-4" />
            Save Chatbot
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Tabs */}
        <div className="w-20 bg-slate-900 border-r border-slate-800 flex flex-col items-center py-6 gap-4">
          <button
            onClick={() => setActiveTab('builder')}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
              activeTab === 'builder'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
            title="Flow Builder"
          >
            <MessageSquare className="w-6 h-6" />
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
              activeTab === 'settings'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
            title="Settings"
          >
            <Settings className="w-6 h-6" />
          </button>

          <button
            onClick={() => setActiveTab('deploy')}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
              activeTab === 'deploy'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
            title="Deploy"
          >
            <Zap className="w-6 h-6" />
          </button>
        </div>

        {/* Builder Tab */}
        {activeTab === 'builder' && (
          <>
            {/* Node Library */}
            <div className="w-80 bg-slate-900 border-r border-slate-800 flex flex-col">
              <div className="p-4 border-b border-slate-800">
                <h3 className="text-white mb-1">Conversation Nodes</h3>
                <p className="text-xs text-slate-400">Drag to add to flow</p>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {nodeTypes.map((node, i) => (
                  <div
                    key={i}
                    onClick={() => handleAddNode(node.type)}
                    className="p-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl cursor-pointer transition-all group"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${node.color} flex items-center justify-center flex-shrink-0`}>
                        <node.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-white mb-1">{node.label}</div>
                        <div className="text-xs text-slate-400">{node.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="p-4 border-t border-slate-800 bg-slate-950">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-800 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">Total Nodes</div>
                    <div className="text-xl text-white">{flowNodes.length}</div>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">Language</div>
                    <div className="text-xl text-white">{languages.find(l => l.code === botLanguage)?.flag}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Canvas */}
            <div className="flex-1 bg-slate-900 overflow-auto">
              <div className="p-8">
                <div className="bg-slate-950 rounded-2xl p-8 min-h-[800px]" style={{
                  backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}>
                  {flowNodes.length === 0 ? (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <MessageSquare className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                        <h3 className="text-xl text-slate-400 mb-2">Build Your Conversation Flow</h3>
                        <p className="text-slate-600">Add nodes from the left panel to get started</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {flowNodes.map((node, index) => (
                        <div key={node.id} className="flex items-center gap-4">
                          {/* Node */}
                          <div
                            onClick={() => setSelectedNode(node)}
                            className={`relative flex-1 p-6 bg-slate-800 hover:bg-slate-700 border-2 rounded-xl cursor-pointer transition-all ${
                              selectedNode?.id === node.id
                                ? 'border-blue-500 ring-2 ring-blue-500 ring-offset-2 ring-offset-slate-950'
                                : 'border-slate-700'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${
                                  node.type === 'start' ? 'from-green-600 to-emerald-600' :
                                  node.type === 'message' ? 'from-blue-600 to-cyan-600' :
                                  node.type === 'question' ? 'from-green-600 to-emerald-600' :
                                  node.type === 'condition' ? 'from-purple-600 to-pink-600' :
                                  node.type === 'ai_response' ? 'from-orange-600 to-red-600' :
                                  'from-indigo-600 to-purple-600'
                                } flex items-center justify-center`}>
                                  {node.type === 'start' && <Play className="w-5 h-5 text-white" />}
                                  {node.type === 'message' && <MessageSquare className="w-5 h-5 text-white" />}
                                  {node.type === 'question' && <MessageSquare className="w-5 h-5 text-white" />}
                                  {node.type === 'condition' && <Zap className="w-5 h-5 text-white" />}
                                  {node.type === 'ai_response' && <Brain className="w-5 h-5 text-white" />}
                                  {node.type === 'action' && <Zap className="w-5 h-5 text-white" />}
                                </div>
                                <div>
                                  <div className="text-white">{node.label}</div>
                                  <div className="text-xs text-slate-400 capitalize">{node.type.replace('_', ' ')}</div>
                                </div>
                              </div>
                              {node.type !== 'start' && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteNode(node.id);
                                  }}
                                  className="p-2 hover:bg-red-600/20 rounded-lg transition-colors"
                                >
                                  <Trash2 className="w-4 h-4 text-red-400" />
                                </button>
                              )}
                            </div>

                            {node.content.message && (
                              <div className="mt-3 p-3 bg-slate-900 rounded-lg text-sm text-slate-300">
                                {node.content.message}
                              </div>
                            )}
                          </div>

                          {/* Connection Arrow */}
                          {index < flowNodes.length - 1 && (
                            <ArrowRight className="w-6 h-6 text-slate-600" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Properties Panel */}
            <div className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col">
              <div className="p-4 border-b border-slate-800">
                <h3 className="text-white">Node Properties</h3>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {selectedNode ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-slate-400 mb-2">Node Label</label>
                      <input
                        type="text"
                        value={selectedNode.label}
                        onChange={(e) => {
                          const updatedNodes = flowNodes.map(n =>
                            n.id === selectedNode.id ? { ...n, label: e.target.value } : n
                          );
                          setFlowNodes(updatedNodes);
                          setSelectedNode({ ...selectedNode, label: e.target.value });
                        }}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500"
                      />
                    </div>

                    {(selectedNode.type === 'message' || selectedNode.type === 'start' || selectedNode.type === 'question') && (
                      <div>
                        <label className="block text-xs text-slate-400 mb-2">Message Content</label>
                        <textarea
                          value={selectedNode.content.message || ''}
                          onChange={(e) => {
                            const updatedNodes = flowNodes.map(n =>
                              n.id === selectedNode.id
                                ? { ...n, content: { ...n.content, message: e.target.value } }
                                : n
                            );
                            setFlowNodes(updatedNodes);
                            setSelectedNode({
                              ...selectedNode,
                              content: { ...selectedNode.content, message: e.target.value }
                            });
                          }}
                          rows={4}
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500 resize-none"
                          placeholder="Enter bot message..."
                        />
                      </div>
                    )}

                    {selectedNode.type === 'condition' && (
                      <div>
                        <label className="block text-xs text-slate-400 mb-2">Condition Type</label>
                        <select className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500">
                          <option>Contains Keyword</option>
                          <option>Equals</option>
                          <option>Starts With</option>
                          <option>Custom Logic</option>
                        </select>
                      </div>
                    )}

                    {selectedNode.type === 'ai_response' && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs text-slate-400 mb-2">AI Model</label>
                          <select className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500">
                            <option>GPT-4</option>
                            <option>GPT-3.5 Turbo</option>
                            <option>Claude 2</option>
                            <option>Gemini Pro</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-slate-400 mb-2">Context/Prompt</label>
                          <textarea
                            rows={4}
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500 resize-none"
                            placeholder="Provide context for AI response..."
                          />
                        </div>
                      </div>
                    )}

                    <div className="pt-4 border-t border-slate-800">
                      <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors">
                        Update Node
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Circle className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                    <p className="text-sm text-slate-500">Select a node to edit</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="flex-1 overflow-auto">
            <div className="max-w-4xl mx-auto p-8 space-y-6">
              {/* Language Settings */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-slate-800">
                  <h3 className="text-xl text-white flex items-center gap-2">
                    <Languages className="w-5 h-5 text-blue-400" />
                    Language Configuration
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">Configure chatbot language and multi-language support</p>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm text-slate-300 mb-3">Primary Language</label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => setBotLanguage(lang.code)}
                          className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                            botLanguage === lang.code
                              ? 'border-blue-500 bg-blue-600/10'
                              : 'border-slate-700 hover:border-slate-600'
                          }`}
                        >
                          <span className="text-3xl">{lang.flag}</span>
                          <div className="text-left flex-1">
                            <div className="text-white">{lang.name}</div>
                            <div className="text-xs text-slate-400">{lang.code}</div>
                          </div>
                          {botLanguage === lang.code && (
                            <CheckCircle className="w-5 h-5 text-blue-400" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800">
                    <label className="flex items-center gap-3 text-sm text-slate-300">
                      <input type="checkbox" className="rounded bg-slate-800 border-slate-700" />
                      Enable auto-language detection
                    </label>
                  </div>
                </div>
              </div>

              {/* Memory Settings */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-slate-800">
                  <h3 className="text-xl text-white flex items-center gap-2">
                    <Database className="w-5 h-5 text-purple-400" />
                    Memory & Context Settings
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">Configure how the bot remembers conversation context</p>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="flex items-center gap-3 text-sm text-slate-300 mb-4">
                      <input
                        type="checkbox"
                        checked={memoryEnabled}
                        onChange={(e) => setMemoryEnabled(e.target.checked)}
                        className="rounded bg-slate-800 border-slate-700"
                      />
                      Enable conversation memory
                    </label>
                  </div>

                  {memoryEnabled && (
                    <>
                      <div>
                        <label className="block text-sm text-slate-300 mb-2">Memory Duration</label>
                        <div className="grid grid-cols-4 gap-2">
                          {['15', '30', '60', '1440'].map((duration) => (
                            <button
                              key={duration}
                              onClick={() => setMemoryDuration(duration)}
                              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                                memoryDuration === duration
                                  ? 'bg-purple-600 text-white'
                                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                              }`}
                            >
                              {duration === '1440' ? '24h' : `${duration}m`}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-slate-300 mb-2">What to Remember</label>
                        <div className="space-y-2">
                          <label className="flex items-center gap-3 text-sm text-slate-400">
                            <input type="checkbox" defaultChecked className="rounded bg-slate-800 border-slate-700" />
                            User preferences
                          </label>
                          <label className="flex items-center gap-3 text-sm text-slate-400">
                            <input type="checkbox" defaultChecked className="rounded bg-slate-800 border-slate-700" />
                            Previous questions
                          </label>
                          <label className="flex items-center gap-3 text-sm text-slate-400">
                            <input type="checkbox" className="rounded bg-slate-800 border-slate-700" />
                            User data (name, email, etc.)
                          </label>
                          <label className="flex items-center gap-3 text-sm text-slate-400">
                            <input type="checkbox" className="rounded bg-slate-800 border-slate-700" />
                            Custom variables
                          </label>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* AI Model Settings */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-slate-800">
                  <h3 className="text-xl text-white flex items-center gap-2">
                    <Brain className="w-5 h-5 text-orange-400" />
                    AI Model Configuration
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">Choose AI model and response style</p>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">AI Model</label>
                    <select
                      value={aiModel}
                      onChange={(e) => setAiModel(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-orange-500"
                    >
                      <option value="gpt-4">GPT-4 (Most Advanced)</option>
                      <option value="gpt-3.5">GPT-3.5 Turbo (Faster)</option>
                      <option value="claude-2">Claude 2</option>
                      <option value="gemini-pro">Gemini Pro</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Response Style</label>
                    <select
                      value={responseStyle}
                      onChange={(e) => setResponseStyle(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-orange-500"
                    >
                      <option value="friendly">Friendly & Conversational</option>
                      <option value="professional">Professional</option>
                      <option value="concise">Concise & Brief</option>
                      <option value="detailed">Detailed & Comprehensive</option>
                      <option value="humorous">Humorous</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Temperature (Creativity)</label>
                    <input type="range" min="0" max="100" defaultValue="70" className="w-full" />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>Precise</span>
                      <span>Balanced</span>
                      <span>Creative</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <button className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl transition-all flex items-center justify-center gap-2">
                <Save className="w-5 h-5" />
                Save All Settings
              </button>
            </div>
          </div>
        )}

        {/* Deploy Tab */}
        {activeTab === 'deploy' && (
          <div className="flex-1 overflow-auto">
            <div className="max-w-4xl mx-auto p-8 space-y-6">
              {/* Deployment Options */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-slate-800">
                  <h3 className="text-xl text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-green-400" />
                    Deployment Options
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">Deploy your chatbot to various platforms</p>
                </div>
                <div className="p-6 grid md:grid-cols-2 gap-4">
                  <div className="p-6 bg-slate-800 border border-slate-700 rounded-xl hover:border-green-500 transition-all cursor-pointer group">
                    <FileCode className="w-10 h-10 text-green-400 mb-3" />
                    <h4 className="text-white mb-2">HTML Widget</h4>
                    <p className="text-sm text-slate-400 mb-4">Embed chatbot on any website</p>
                    <button
                      onClick={handleExportHTML}
                      className="w-full px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors"
                    >
                      Download HTML
                    </button>
                  </div>

                  <div className="p-6 bg-slate-800 border border-slate-700 rounded-xl hover:border-blue-500 transition-all cursor-pointer group">
                    <Code className="w-10 h-10 text-blue-400 mb-3" />
                    <h4 className="text-white mb-2">JavaScript SDK</h4>
                    <p className="text-sm text-slate-400 mb-4">Custom integration with JS</p>
                    <button
                      onClick={handleExportJS}
                      className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                    >
                      Download JS
                    </button>
                  </div>

                  <div className="p-6 bg-slate-800 border border-slate-700 rounded-xl hover:border-purple-500 transition-all cursor-pointer group">
                    <Server className="w-10 h-10 text-purple-400 mb-3" />
                    <h4 className="text-white mb-2">API Endpoint</h4>
                    <p className="text-sm text-slate-400 mb-4">REST API for custom apps</p>
                    <button className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors">
                      Generate API
                    </button>
                  </div>

                  <div className="p-6 bg-slate-800 border border-slate-700 rounded-xl hover:border-orange-500 transition-all cursor-pointer group">
                    <Smartphone className="w-10 h-10 text-orange-400 mb-3" />
                    <h4 className="text-white mb-2">Mobile SDK</h4>
                    <p className="text-sm text-slate-400 mb-4">iOS & Android integration</p>
                    <button className="w-full px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg transition-colors">
                      Get SDK
                    </button>
                  </div>
                </div>
              </div>

              {/* Embed Code Preview */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                  <h3 className="text-xl text-white">Embed Code</h3>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generateHTMLCode());
                      alert('Code copied to clipboard!');
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-sm text-white rounded-lg transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </button>
                </div>
                <div className="p-6 bg-slate-950">
                  <pre className="text-xs text-green-400 font-mono overflow-x-auto">
                    <code>{`<!-- ${botName} Chatbot Widget -->
<script src="https://cdn.devnora.com/chatbot.js"></script>
<script>
  Devnora.init({
    botId: 'YOUR_BOT_ID',
    language: '${botLanguage}',
    theme: 'blue'
  });
</script>`}</code>
                  </pre>
                </div>
              </div>

              {/* API Documentation */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-slate-800">
                  <h3 className="text-xl text-white">API Integration</h3>
                </div>
                <div className="p-6 bg-slate-950">
                  <pre className="text-xs text-blue-400 font-mono overflow-x-auto">
                    <code>{`// Send message to chatbot
POST https://api.devnora.com/chatbot/message

{
  "botId": "YOUR_BOT_ID",
  "message": "Hello!",
  "language": "${botLanguage}",
  "userId": "user123",
  "sessionId": "session456"
}

// Response
{
  "response": "Hi there! How can I help you?",
  "timestamp": "2025-12-04T10:30:00Z",
  "confidence": 0.98
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md h-[700px] flex flex-col overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 flex items-center justify-between">
              <div>
                <h3 className="text-white text-lg">{botName}</h3>
                <p className="text-blue-100 text-sm">Powered by Devnora AI</p>
              </div>
              <button
                onClick={() => setShowPreview(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-950">
              {chatMessages.length === 0 && (
                <div className="text-center py-8">
                  <Bot className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                  <p className="text-slate-500 text-sm">Start chatting to test your bot</p>
                </div>
              )}
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-800 text-slate-200'
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-slate-800 bg-slate-900">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl transition-all"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
