import React from 'react';
import { Settings, Database, Mail, Shield, Globe } from 'lucide-react';

export default function SystemSettings() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2 text-slate-900">System Settings</h1>
        <p className="text-slate-600">Configure platform-wide settings</p>
      </div>

      <div className="space-y-6">
        {/* General Settings */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl text-slate-900">General Settings</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-700 mb-2">Platform Name</label>
              <input
                type="text"
                defaultValue="Devnora AI"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-700 mb-2">Support Email</label>
              <input
                type="email"
                defaultValue="support@devnora.com"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Database Settings */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl text-slate-900">Database Settings</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div>
                <div className="text-slate-900 mb-1">Database Status</div>
                <div className="text-sm text-slate-600">Connected • postgres://***</div>
              </div>
              <div className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-lg">
                Healthy
              </div>
            </div>
          </div>
        </div>

        {/* Email Settings */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-6 h-6 text-green-600" />
            <h2 className="text-xl text-slate-900">Email Settings</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-700 mb-2">SMTP Host</label>
              <input
                type="text"
                defaultValue="smtp.sendgrid.net"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-700 mb-2">SMTP Port</label>
              <input
                type="text"
                defaultValue="587"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl">
            Save All Settings
          </button>
        </div>
      </div>
    </div>
  );
}