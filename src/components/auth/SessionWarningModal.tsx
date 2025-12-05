import React from 'react';
import { AlertCircle, LogOut, X } from 'lucide-react';

interface SessionWarningModalProps {
  currentWorkspace: string;
  currentEmail: string;
  targetWorkspace: string;
  onLogout: () => void;
  onCancel: () => void;
}

export default function SessionWarningModal({
  currentWorkspace,
  currentEmail,
  targetWorkspace,
  onLogout,
  onCancel,
}: SessionWarningModalProps) {
  const workspaceNames = {
    owner: 'Personal Workspace (Owner)',
    admin: 'Acme Inc (Admin)',
    member: 'Startup Project (Member)',
  };

  const workspaceColors = {
    owner: 'blue',
    admin: 'green',
    member: 'orange',
  };

  const currentColor = workspaceColors[currentWorkspace as keyof typeof workspaceColors];
  const targetColor = workspaceColors[targetWorkspace as keyof typeof workspaceColors];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-red-600/10 to-orange-600/10 border-b border-slate-800">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-red-600/20 border border-red-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-red-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl text-white mb-1">Active Session Detected</h2>
              <p className="text-sm text-slate-400">
                You must logout from your current workspace first
              </p>
            </div>
            <button
              onClick={onCancel}
              className="p-1 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Current Session */}
          <div className={`p-4 bg-${currentColor}-600/10 border border-${currentColor}-500/30 rounded-xl`}>
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2 h-2 bg-${currentColor}-500 rounded-full`}></div>
              <span className="text-sm text-slate-300">Currently logged in as:</span>
            </div>
            <div className={`text-${currentColor}-400 mb-1`}>
              {workspaceNames[currentWorkspace as keyof typeof workspaceNames]}
            </div>
            <div className="text-sm text-slate-500">{currentEmail}</div>
          </div>

          {/* Arrow Divider */}
          <div className="flex items-center justify-center">
            <div className="h-px flex-1 bg-slate-800"></div>
            <div className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-500">
              Switch to
            </div>
            <div className="h-px flex-1 bg-slate-800"></div>
          </div>

          {/* Target Session */}
          <div className={`p-4 bg-${targetColor}-600/10 border border-${targetColor}-500/30 rounded-xl`}>
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2 h-2 bg-${targetColor}-500 rounded-full`}></div>
              <span className="text-sm text-slate-300">Requested workspace:</span>
            </div>
            <div className={`text-${targetColor}-400`}>
              {workspaceNames[targetWorkspace as keyof typeof workspaceNames]}
            </div>
          </div>

          {/* Warning Message */}
          <div className="p-4 bg-slate-800 border border-slate-700 rounded-xl">
            <p className="text-sm text-slate-300">
              ⚠️ For security reasons, you can only be logged into one workspace at a time.
              You must logout from <span className={`text-${currentColor}-400`}>{workspaceNames[currentWorkspace as keyof typeof workspaceNames]}</span> before accessing another workspace.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-950 border-t border-slate-800 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onLogout}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white rounded-lg transition-all shadow-lg shadow-red-500/25"
          >
            <LogOut className="w-4 h-4" />
            Logout & Switch
          </button>
        </div>
      </div>
    </div>
  );
}
