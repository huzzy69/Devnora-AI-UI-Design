import React, { useState, useRef } from 'react';
import {
  Wrench, Upload, FileCode, CheckCircle2, AlertCircle, Download,
  Sparkles, Play, Clock, Trash2, Eye, Code2, ArrowRight, XCircle,
  FileText, Zap, RefreshCw, History, TrendingUp, GitCompare
} from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  language: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  originalCode?: string;
  repairedCode?: string;
  issues?: string[];
  improvements?: string[];
  uploadDate: string;
}

export default function LegacyCodeRepair() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'history'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const supportedLanguages = [
    { name: 'Visual Basic 6', ext: '.vb, .frm, .bas', icon: '🔷' },
    { name: 'VB.NET', ext: '.vb', icon: '💠' },
    { name: 'Delphi 7', ext: '.pas, .dfm', icon: '🔶' },
    { name: 'Legacy .NET/C#', ext: '.cs', icon: '🟣' },
  ];

  const repairHistory = [
    {
      id: '1',
      name: 'legacy_system.vb',
      language: 'VB6',
      date: '2025-12-03',
      status: 'completed',
      issuesFixed: 12,
      linesModified: 245
    },
    {
      id: '2',
      name: 'database_module.pas',
      language: 'Delphi 7',
      date: '2025-12-02',
      status: 'completed',
      issuesFixed: 8,
      linesModified: 156
    },
    {
      id: '3',
      name: 'old_framework.cs',
      language: '.NET 2.0',
      date: '2025-12-01',
      status: 'completed',
      issuesFixed: 15,
      linesModified: 389
    }
  ];

  const detectLanguage = (filename: string): string => {
    const ext = filename.toLowerCase();
    if (ext.endsWith('.vb') && !ext.includes('.net')) return 'VB6';
    if (ext.endsWith('.vb') && ext.includes('.net')) return 'VB.NET';
    if (ext.endsWith('.pas') || ext.endsWith('.dfm')) return 'Delphi 7';
    if (ext.endsWith('.cs')) return 'C#';
    return 'Unknown';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    const newFiles: UploadedFile[] = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      language: detectLanguage(file.name),
      status: 'pending',
      progress: 0,
      uploadDate: new Date().toISOString()
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const startRepair = (fileId: string) => {
    setUploadedFiles(prev =>
      prev.map(file =>
        file.id === fileId
          ? { ...file, status: 'processing', progress: 0 }
          : file
      )
    );

    // Simulate AI repair process
    const interval = setInterval(() => {
      setUploadedFiles(prev =>
        prev.map(file => {
          if (file.id === fileId && file.status === 'processing') {
            const newProgress = Math.min(file.progress + 10, 100);
            
            if (newProgress === 100) {
              clearInterval(interval);
              return {
                ...file,
                status: 'completed',
                progress: 100,
                originalCode: '// Original VB6 Code\nDim conn As Connection\nSet conn = New Connection\nconn.Open "Provider=..."',
                repairedCode: '// Modernized PHP Code\n$pdo = new PDO(\'mysql:host=localhost;dbname=db\', \'user\', \'pass\');\n$stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");',
                issues: [
                  'Deprecated connection method',
                  'SQL injection vulnerability',
                  'Missing error handling',
                  'Outdated syntax patterns'
                ],
                improvements: [
                  'Modern PDO implementation',
                  'Prepared statements for security',
                  'Exception handling added',
                  'PSR-12 coding standards applied'
                ]
              };
            }
            
            return { ...file, progress: newProgress };
          }
          return file;
        })
      );
    }, 500);
  };

  const deleteFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
    if (selectedFile?.id === fileId) {
      setSelectedFile(null);
      setShowComparison(false);
    }
  };

  const viewComparison = (file: UploadedFile) => {
    setSelectedFile(file);
    setShowComparison(true);
  };

  const downloadRepairedCode = (file: UploadedFile) => {
    if (!file.repairedCode) return;
    
    const blob = new Blob([file.repairedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `repaired_${file.name}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl text-white">Legacy Code AI Repair</h1>
          </div>
          <p className="text-slate-400">
            Modernize VB6, VB.NET, Delphi 7, and legacy .NET/C# code with AI-powered analysis
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl">
            <div className="text-xs text-slate-400">AI Credits</div>
            <div className="text-xl text-white">8,450</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <FileCode className="w-8 h-8 text-blue-500" />
            <div className="text-xs text-slate-400">This Month</div>
          </div>
          <div className="text-2xl text-white mb-1">24</div>
          <div className="text-sm text-slate-400">Files Repaired</div>
          <div className="text-xs text-green-500 mt-2">+12 from last month</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <Zap className="w-8 h-8 text-orange-500" />
            <div className="text-xs text-slate-400">Total</div>
          </div>
          <div className="text-2xl text-white mb-1">186</div>
          <div className="text-sm text-slate-400">Issues Fixed</div>
          <div className="text-xs text-orange-500 mt-2">Critical improvements</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <TrendingUp className="w-8 h-8 text-green-500" />
            <div className="text-xs text-slate-400">Success Rate</div>
          </div>
          <div className="text-2xl text-white mb-1">98.7%</div>
          <div className="text-sm text-slate-400">Repair Success</div>
          <div className="text-xs text-green-500 mt-2">Industry leading</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <Clock className="w-8 h-8 text-purple-500" />
            <div className="text-xs text-slate-400">Average</div>
          </div>
          <div className="text-2xl text-white mb-1">45s</div>
          <div className="text-sm text-slate-400">Processing Time</div>
          <div className="text-xs text-purple-500 mt-2">Lightning fast</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-800">
        <button
          onClick={() => setActiveTab('upload')}
          className={`px-6 py-3 border-b-2 transition-colors ${
            activeTab === 'upload'
              ? 'border-orange-600 text-orange-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload & Repair
          </div>
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-6 py-3 border-b-2 transition-colors ${
            activeTab === 'history'
              ? 'border-orange-600 text-orange-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Repair History
          </div>
        </button>
      </div>

      {/* Upload Tab */}
      {activeTab === 'upload' && (
        <>
          {/* Supported Languages */}
          <div className="bg-gradient-to-br from-orange-600/10 to-red-600/10 border border-orange-500/20 rounded-2xl p-6">
            <h3 className="text-lg text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-orange-400" />
              Supported Legacy Languages
            </h3>
            <div className="grid md:grid-cols-4 gap-4">
              {supportedLanguages.map((lang, i) => (
                <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                  <div className="text-2xl mb-2">{lang.icon}</div>
                  <div className="text-white mb-1">{lang.name}</div>
                  <div className="text-xs text-slate-400">{lang.ext}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Upload Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
              isDragging
                ? 'border-orange-600 bg-orange-600/10'
                : 'border-slate-700 hover:border-slate-600 bg-slate-900/50'
            }`}
          >
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-orange-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="text-xl text-white mb-2">Drop your legacy code files here</h3>
              <p className="text-slate-400 mb-6">
                or click to browse and select files
              </p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".vb,.frm,.bas,.pas,.dfm,.cs"
                onChange={handleFileInput}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl hover:shadow-lg hover:shadow-orange-500/50 transition-all"
              >
                Select Files
              </button>
              <p className="text-xs text-slate-500 mt-4">
                Supports VB6, VB.NET, Delphi 7, .NET/C# • Max 50MB per file
              </p>
            </div>
          </div>

          {/* Uploaded Files List */}
          {uploadedFiles.length > 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-slate-800">
                <h3 className="text-xl text-white flex items-center gap-2">
                  <FileCode className="w-5 h-5 text-orange-400" />
                  Uploaded Files ({uploadedFiles.length})
                </h3>
              </div>
              <div className="divide-y divide-slate-800">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          file.status === 'completed' ? 'bg-green-600/20' :
                          file.status === 'processing' ? 'bg-orange-600/20' :
                          file.status === 'error' ? 'bg-red-600/20' :
                          'bg-blue-600/20'
                        }`}>
                          {file.status === 'completed' ? (
                            <CheckCircle2 className="w-6 h-6 text-green-400" />
                          ) : file.status === 'processing' ? (
                            <RefreshCw className="w-6 h-6 text-orange-400 animate-spin" />
                          ) : file.status === 'error' ? (
                            <XCircle className="w-6 h-6 text-red-400" />
                          ) : (
                            <FileCode className="w-6 h-6 text-blue-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white mb-1">{file.name}</h4>
                          <div className="flex items-center gap-4 text-sm text-slate-400">
                            <span>{formatFileSize(file.size)}</span>
                            <span>•</span>
                            <span className="px-2 py-0.5 bg-orange-600/20 text-orange-400 rounded text-xs">
                              {file.language}
                            </span>
                            <span>•</span>
                            <span className="capitalize">{file.status}</span>
                          </div>

                          {/* Progress Bar */}
                          {file.status === 'processing' && (
                            <div className="mt-3">
                              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                                <span>AI Repair in Progress...</span>
                                <span>{file.progress}%</span>
                              </div>
                              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-orange-600 to-red-600 transition-all duration-300"
                                  style={{ width: `${file.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          )}

                          {/* Issues & Improvements */}
                          {file.status === 'completed' && file.issues && (
                            <div className="mt-3 grid md:grid-cols-2 gap-3">
                              <div className="p-3 bg-red-600/10 border border-red-500/20 rounded-lg">
                                <div className="text-xs text-red-400 mb-1">Issues Fixed</div>
                                <div className="text-sm text-white">{file.issues.length} problems resolved</div>
                              </div>
                              <div className="p-3 bg-green-600/10 border border-green-500/20 rounded-lg">
                                <div className="text-xs text-green-400 mb-1">Improvements</div>
                                <div className="text-sm text-white">{file.improvements?.length} enhancements</div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        {file.status === 'pending' && (
                          <button
                            onClick={() => startRepair(file.id)}
                            className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg flex items-center gap-2 transition-colors"
                          >
                            <Play className="w-4 h-4" />
                            Start Repair
                          </button>
                        )}
                        {file.status === 'completed' && (
                          <>
                            <button
                              onClick={() => viewComparison(file)}
                              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center gap-2 transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                              View
                            </button>
                            <button
                              onClick={() => downloadRepairedCode(file)}
                              className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg flex items-center gap-2 transition-colors"
                            >
                              <Download className="w-4 h-4" />
                              Download
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => deleteFile(file.id)}
                          className="p-2 text-red-400 hover:bg-red-600/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Code Comparison Modal */}
          {showComparison && selectedFile && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
                {/* Modal Header */}
                <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl text-white mb-1 flex items-center gap-2">
                      <GitCompare className="w-5 h-5 text-orange-400" />
                      Code Comparison: {selectedFile.name}
                    </h3>
                    <p className="text-sm text-slate-400">Before and After AI Repair</p>
                  </div>
                  <button
                    onClick={() => setShowComparison(false)}
                    className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <XCircle className="w-6 h-6 text-slate-400" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* Original Code */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <h4 className="text-white">Original Code ({selectedFile.language})</h4>
                      </div>
                      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 h-64 overflow-auto">
                        <pre className="text-sm text-slate-300 font-mono">
                          {selectedFile.originalCode}
                        </pre>
                      </div>
                    </div>

                    {/* Repaired Code */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <h4 className="text-white">Repaired Code (Modern PHP)</h4>
                      </div>
                      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 h-64 overflow-auto">
                        <pre className="text-sm text-green-300 font-mono">
                          {selectedFile.repairedCode}
                        </pre>
                      </div>
                    </div>
                  </div>

                  {/* Issues & Improvements */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Issues Fixed */}
                    <div className="bg-red-600/10 border border-red-500/20 rounded-xl p-4">
                      <h4 className="text-white mb-3 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-red-400" />
                        Issues Fixed
                      </h4>
                      <ul className="space-y-2">
                        {selectedFile.issues?.map((issue, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            {issue}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Improvements Made */}
                    <div className="bg-green-600/10 border border-green-500/20 rounded-xl p-4">
                      <h4 className="text-white mb-3 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-green-400" />
                        Improvements Made
                      </h4>
                      <ul className="space-y-2">
                        {selectedFile.improvements?.map((improvement, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                            <ArrowRight className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            {improvement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => setShowComparison(false)}
                    className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => downloadRepairedCode(selectedFile)}
                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg hover:shadow-green-500/50 transition-all flex items-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download Repaired Code
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-slate-800">
            <h3 className="text-xl text-white flex items-center gap-2">
              <History className="w-5 h-5 text-orange-400" />
              Repair History
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-950">
                <tr>
                  <th className="px-6 py-4 text-left text-xs text-slate-400 uppercase">File Name</th>
                  <th className="px-6 py-4 text-left text-xs text-slate-400 uppercase">Language</th>
                  <th className="px-6 py-4 text-left text-xs text-slate-400 uppercase">Date</th>
                  <th className="px-6 py-4 text-left text-xs text-slate-400 uppercase">Issues Fixed</th>
                  <th className="px-6 py-4 text-left text-xs text-slate-400 uppercase">Lines Modified</th>
                  <th className="px-6 py-4 text-left text-xs text-slate-400 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs text-slate-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {repairHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <FileCode className="w-5 h-5 text-orange-400" />
                        <span className="text-white">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-orange-600/20 text-orange-400 rounded text-xs">
                        {item.language}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">{item.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                        <span className="text-white">{item.issuesFixed}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white">{item.linesModified}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-xs">
                        Completed
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-slate-400" />
                        </button>
                        <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                          <Download className="w-4 h-4 text-slate-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* AI Powered Badge */}
      <div className="bg-gradient-to-r from-orange-600/10 to-red-600/10 border border-orange-500/20 rounded-2xl p-6 text-center">
        <Sparkles className="w-8 h-8 text-orange-400 mx-auto mb-3" />
        <h3 className="text-xl text-white mb-2">AI-Powered Legacy Code Modernization</h3>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Our advanced AI analyzes your legacy code, identifies issues, applies modern best practices, 
          and converts it to clean, maintainable PHP code optimized for shared hosting deployment.
        </p>
      </div>
    </div>
  );
}
