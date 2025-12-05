import React, { useState } from 'react';
import { User, Bell, Lock, Palette, Globe, Shield } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security' | 'preferences'>('profile');

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2 text-slate-900">Settings</h1>
        <p className="text-slate-600">Manage your account settings and preferences</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-1">
            {[
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'security', label: 'Security', icon: Lock },
              { id: 'preferences', label: 'Preferences', icon: Palette },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="md:col-span-3">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h2 className="text-2xl text-slate-900 mb-6">Profile Settings</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-4xl">
                    👨‍💼
                  </div>
                  <div>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg mr-2">
                      Change Avatar
                    </button>
                    <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg">
                      Remove
                    </button>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-700 mb-2">First Name</label>
                    <input
                      type="text"
                      defaultValue="John"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      defaultValue="Doe"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-slate-700 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue="john@example.com"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-700 mb-2">Bio</label>
                  <textarea
                    rows={4}
                    defaultValue="Full-stack developer passionate about AI and automation."
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl"
                  />
                </div>
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h2 className="text-2xl text-slate-900 mb-6">Notification Preferences</h2>
              <div className="space-y-6">
                {[
                  { label: 'Email Notifications', description: 'Receive email updates about your account' },
                  { label: 'Project Updates', description: 'Get notified about project deployments and builds' },
                  { label: 'Team Activity', description: 'Notifications about team member actions' },
                  { label: 'Marketing Emails', description: 'Receive news and product updates' },
                  { label: 'Weekly Reports', description: 'Get weekly usage and analytics reports' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-4 border-b border-slate-200 last:border-0">
                    <div>
                      <div className="text-slate-900 mb-1">{item.label}</div>
                      <div className="text-sm text-slate-600">{item.description}</div>
                    </div>
                    <label className="relative inline-block w-12 h-6">
                      <input type="checkbox" className="sr-only peer" defaultChecked={i < 3} />
                      <div className="w-12 h-6 bg-slate-300 peer-checked:bg-blue-600 rounded-full peer transition-colors cursor-pointer"></div>
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-6 transition-transform"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <h2 className="text-2xl text-slate-900 mb-6">Security Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-slate-700 mb-2">Current Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-700 mb-2">New Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-700 mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl"
                    />
                  </div>
                  <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl">
                    Update Password
                  </button>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <h3 className="text-xl text-slate-900 mb-4">Two-Factor Authentication</h3>
                <p className="text-slate-600 mb-4">
                  Add an extra layer of security to your account
                </p>
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl">
                  Enable 2FA
                </button>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h2 className="text-2xl text-slate-900 mb-6">Preferences</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-slate-700 mb-2">Theme</label>
                  <select className="w-full px-4 py-3 border border-slate-300 rounded-xl">
                    <option>Light</option>
                    <option>Dark</option>
                    <option>System</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-700 mb-2">Language</label>
                  <select className="w-full px-4 py-3 border border-slate-300 rounded-xl">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-700 mb-2">Timezone</label>
                  <select className="w-full px-4 py-3 border border-slate-300 rounded-xl">
                    <option>UTC-8 (Pacific Time)</option>
                    <option>UTC-5 (Eastern Time)</option>
                    <option>UTC+0 (London)</option>
                    <option>UTC+1 (Central Europe)</option>
                  </select>
                </div>
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl">
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
