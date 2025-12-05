import React, { useState } from 'react';
import { Download, PackageOpen, FileText, History, Server, ExternalLink, CheckCircle, XCircle, Clock, Terminal, Copy, FolderArchive } from 'lucide-react';

export default function ExportDeployment() {
  const [activeTab, setActiveTab] = useState('export');
  const [buildLogs, setBuildLogs] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [projectName, setProjectName] = useState('saas-dashboard-v2.1');
  const [exportFormat, setExportFormat] = useState('.zip');
  const [includeHtaccess, setIncludeHtaccess] = useState(true);
  const [optimizeAssets, setOptimizeAssets] = useState(true);
  const [includeDatabase, setIncludeDatabase] = useState(false);

  const deploymentHistory = [
    {
      id: 'dep-001',
      project: 'SaaS Dashboard v2.1',
      date: '2025-12-01 14:30:00',
      status: 'success',
      size: '45.2 MB',
      files: 247,
      destination: 'Hostinger - devnora.com'
    },
    {
      id: 'dep-002',
      project: 'E-commerce Store',
      date: '2025-12-01 12:15:00',
      status: 'success',
      size: '38.7 MB',
      files: 198,
      destination: 'Bluehost - store.devnora.app'
    },
    {
      id: 'dep-003',
      project: 'Portfolio Website',
      date: '2025-11-30 18:45:00',
      status: 'failed',
      size: '12.3 MB',
      files: 89,
      destination: 'Local Export'
    }
  ];

  const buildLogData = `
[2025-12-01 14:30:00] Starting build process...
[2025-12-01 14:30:01] Initializing project structure
[2025-12-01 14:30:02] Installing dependencies...
[2025-12-01 14:30:05] ✓ Dependencies installed successfully
[2025-12-01 14:30:05] Compiling React components...
[2025-12-01 14:30:08] ✓ Components compiled
[2025-12-01 14:30:08] Optimizing assets...
[2025-12-01 14:30:10] ✓ Images optimized (12 files, saved 2.3 MB)
[2025-12-01 14:30:10] ✓ CSS minified (6 files, saved 234 KB)
[2025-12-01 14:30:10] ✓ JavaScript bundled and minified
[2025-12-01 14:30:11] Generating production build...
[2025-12-01 14:30:14] ✓ Build completed successfully
[2025-12-01 14:30:14] Creating ZIP archive...
[2025-12-01 14:30:16] ✓ ZIP created: saas-dashboard-v2.1.zip (45.2 MB)
[2025-12-01 14:30:16] Build completed in 16 seconds
`;

  const handleExport = (type: string) => {
    setBuildLogs(true);
    setIsExporting(true);
    setExportProgress(0);
    setTimeout(() => {
      alert(`${type} export started! Check build logs for progress.`);
      // Simulate export progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setExportProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setIsExporting(false);
        }
      }, 500);
    }, 500);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2 text-slate-900">Export & Deployment Engine</h1>
        <p className="text-slate-600">One-click ZIP export for PHP shared hosting deployment</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-slate-200">
        {[
          { id: 'export', label: 'Export', icon: Download },
          { id: 'history', label: 'History', icon: History },
          { id: 'logs', label: 'Build Logs', icon: Terminal },
          { id: 'instructions', label: 'Deploy Instructions', icon: FileText }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Export Tab */}
      {activeTab === 'export' && (
        <div className="space-y-6">
          {/* Quick Export */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl text-slate-900 mb-2">One-Click ZIP Export</h2>
                <p className="text-slate-600">Export your complete project for PHP shared hosting (Hostinger, Bluehost, etc.)</p>
              </div>
              <PackageOpen className="w-12 h-12 text-blue-600" />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <button
                onClick={() => handleExport('Production')}
                className="p-6 bg-white hover:bg-blue-50 border-2 border-blue-600 rounded-xl transition-all group"
              >
                <Download className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="text-lg text-slate-900 mb-1">Production Build</h3>
                <p className="text-sm text-slate-600 mb-3">Optimized, minified, production-ready</p>
                <div className="text-xs text-blue-600 group-hover:underline">Export Now →</div>
              </button>

              <button
                onClick={() => handleExport('Development')}
                className="p-6 bg-white hover:bg-purple-50 border-2 border-purple-400 rounded-xl transition-all group"
              >
                <FolderArchive className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="text-lg text-slate-900 mb-1">Development Build</h3>
                <p className="text-sm text-slate-600 mb-3">Includes source maps, debugging</p>
                <div className="text-xs text-purple-600 group-hover:underline">Export Now →</div>
              </button>

              <button
                onClick={() => handleExport('Full Source')}
                className="p-6 bg-white hover:bg-green-50 border-2 border-green-400 rounded-xl transition-all group"
              >
                <PackageOpen className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="text-lg text-slate-900 mb-1">Full Source Code</h3>
                <p className="text-sm text-slate-600 mb-3">Complete project with dependencies</p>
                <div className="text-xs text-green-600 group-hover:underline">Export Now →</div>
              </button>
            </div>
          </div>

          {/* Export Options */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h3 className="text-xl text-slate-900 mb-4">Export Configuration</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-slate-700 mb-2">Project Name</label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-700 mb-2">Export Format</label>
                <select
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl"
                >
                  <option value=".zip">ZIP Archive (.zip)</option>
                  <option value=".tar.gz">TAR Archive (.tar.gz)</option>
                  <option value=".7z">7-Zip (.7z)</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={includeHtaccess}
                    onChange={(e) => setIncludeHtaccess(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-slate-700">Include .htaccess for Apache servers</span>
                </label>
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={optimizeAssets}
                    onChange={(e) => setOptimizeAssets(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-slate-700">Optimize images and assets</span>
                </label>
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={includeDatabase}
                    onChange={(e) => setIncludeDatabase(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-slate-700">Include database export (if applicable)</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Deployment History Tab */}
      {activeTab === 'history' && (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl text-slate-900">Deployment History</h2>
            <p className="text-sm text-slate-600">Track all your exports and deployments</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase">Project</th>
                  <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase">Size</th>
                  <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase">Files</th>
                  <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase">Destination</th>
                  <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {deploymentHistory.map((deploy) => (
                  <tr key={deploy.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm text-slate-600">{deploy.id}</td>
                    <td className="px-6 py-4 text-sm text-slate-900">{deploy.project}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{deploy.date}</td>
                    <td className="px-6 py-4">
                      {deploy.status === 'success' ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                          <CheckCircle className="w-3 h-3" />
                          Success
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                          <XCircle className="w-3 h-3" />
                          Failed
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{deploy.size}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{deploy.files}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{deploy.destination}</td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:text-blue-700 text-sm">Download</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Build Logs Tab */}
      {activeTab === 'logs' && (
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl text-white flex items-center gap-2">
              <Terminal className="w-5 h-5" />
              Build Logs
            </h2>
            <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg flex items-center gap-2 transition-colors">
              <Copy className="w-4 h-4" />
              Copy Logs
            </button>
          </div>
          <div className="bg-black rounded-xl p-4 overflow-x-auto">
            <pre className="text-green-400 text-sm font-mono">
              {buildLogData}
            </pre>
          </div>
          {!buildLogs && (
            <div className="mt-4 text-center text-slate-400 text-sm">
              Start an export to see build logs in real-time
            </div>
          )}
        </div>
      )}

      {/* Manual Deploy Instructions Tab */}
      {activeTab === 'instructions' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="text-2xl text-slate-900 mb-4">Manual Deployment Instructions</h2>
            <p className="text-slate-600 mb-6">Follow these steps to deploy your exported ZIP file to PHP shared hosting</p>

            <div className="space-y-6">
              {/* Hostinger */}
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl text-slate-900 mb-3 flex items-center gap-2">
                  <Server className="w-5 h-5 text-blue-600" />
                  Hostinger Deployment
                </h3>
                <ol className="space-y-3 text-slate-700">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">1</span>
                    <span>Login to your Hostinger account and go to <strong>File Manager</strong></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">2</span>
                    <span>Navigate to <code className="bg-slate-100 px-2 py-1 rounded">public_html</code> folder</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">3</span>
                    <span>Click <strong>Upload</strong> and select your exported ZIP file</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">4</span>
                    <span>Right-click the ZIP file → <strong>Extract</strong></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">5</span>
                    <span>Delete the ZIP file after extraction</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">6</span>
                    <span>Visit your domain to verify deployment</span>
                  </li>
                </ol>
              </div>

              {/* Bluehost */}
              <div className="border-l-4 border-purple-600 pl-6">
                <h3 className="text-xl text-slate-900 mb-3 flex items-center gap-2">
                  <Server className="w-5 h-5 text-purple-600" />
                  Bluehost Deployment
                </h3>
                <ol className="space-y-3 text-slate-700">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm">1</span>
                    <span>Login to Bluehost cPanel</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm">2</span>
                    <span>Open <strong>File Manager</strong> from cPanel</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm">3</span>
                    <span>Navigate to <code className="bg-slate-100 px-2 py-1 rounded">public_html</code> directory</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm">4</span>
                    <span>Click <strong>Upload</strong> button in the top menu</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm">5</span>
                    <span>Upload your ZIP file (wait for 100% completion)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm">6</span>
                    <span>Select the ZIP → Click <strong>Extract</strong></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm">7</span>
                    <span>Remove ZIP file and test your website</span>
                  </li>
                </ol>
              </div>

              {/* FTP Upload */}
              <div className="border-l-4 border-green-600 pl-6">
                <h3 className="text-xl text-slate-900 mb-3 flex items-center gap-2">
                  <ExternalLink className="w-5 h-5 text-green-600" />
                  FTP Upload (Alternative Method)
                </h3>
                <ol className="space-y-3 text-slate-700">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm">1</span>
                    <span>Download FileZilla or any FTP client</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm">2</span>
                    <span>Get FTP credentials from your hosting provider</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm">3</span>
                    <span>Connect to your server via FTP</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm">4</span>
                    <span>Extract ZIP locally first, then upload all files</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm">5</span>
                    <span>Upload to <code className="bg-slate-100 px-2 py-1 rounded">public_html</code> or <code className="bg-slate-100 px-2 py-1 rounded">www</code> folder</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* Troubleshooting */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
            <h3 className="text-lg text-yellow-900 mb-3">⚠️ Troubleshooting Tips</h3>
            <ul className="space-y-2 text-yellow-800 text-sm">
              <li>• If .htaccess doesn't work, ensure Apache mod_rewrite is enabled</li>
              <li>• For 500 errors, check file permissions (folders: 755, files: 644)</li>
              <li>• If images don't load, verify the assets/ folder is uploaded</li>
              <li>• Clear browser cache after deployment</li>
              <li>• Contact hosting support if SSL certificate issues occur</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}