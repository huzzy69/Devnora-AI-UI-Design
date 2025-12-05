import React, { useState } from 'react';
import { Users, Plus, MoreVertical, Mail, Shield, Trash, UserCheck } from 'lucide-react';

export default function WorkspaceManagement() {
  const [activeTab, setActiveTab] = useState<'members' | 'invitations' | 'settings'>('members');

  const members = [
    {
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Owner',
      avatar: '👨‍💼',
      status: 'Active',
      joined: 'Jan 2024'
    },
    {
      name: 'Sarah Smith',
      email: 'sarah@example.com',
      role: 'Admin',
      avatar: '👩‍💼',
      status: 'Active',
      joined: 'Jan 2024'
    },
    {
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'Member',
      avatar: '👨‍💻',
      status: 'Active',
      joined: 'Feb 2024'
    },
  ];

  const invitations = [
    { email: 'emma@example.com', role: 'Member', sent: '2 days ago', status: 'Pending' },
    { email: 'alex@example.com', role: 'Member', sent: '5 days ago', status: 'Pending' },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl mb-2 text-slate-900">Workspace Management</h1>
          <p className="text-slate-600">Manage team members and workspace settings</p>
        </div>
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Invite Member
        </button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Members', value: '3', icon: Users },
          { label: 'Pending Invites', value: '2', icon: Mail },
          { label: 'Active Projects', value: '12', icon: UserCheck },
          { label: 'Seats Available', value: '2', icon: Shield },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <stat.icon className="w-8 h-8 text-blue-600" />
              <div className="text-3xl text-slate-900">{stat.value}</div>
            </div>
            <div className="text-sm text-slate-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-slate-200">
        {[
          { id: 'members', label: 'Members' },
          { id: 'invitations', label: 'Invitations' },
          { id: 'settings', label: 'Settings' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Members Tab */}
      {activeTab === 'members' && (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl text-slate-900">Team Members</h2>
          </div>
          <div className="divide-y divide-slate-200">
            {members.map((member, i) => (
              <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-2xl">
                    {member.avatar}
                  </div>
                  <div>
                    <h3 className="text-lg text-slate-900 mb-1">{member.name}</h3>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <span>{member.email}</span>
                      <span>•</span>
                      <span>Joined {member.joined}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-lg">
                    {member.role}
                  </div>
                  <div className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-lg">
                    {member.status}
                  </div>
                  <button className="p-2 hover:bg-slate-200 rounded-lg">
                    <MoreVertical className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Invitations Tab */}
      {activeTab === 'invitations' && (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl text-slate-900">Pending Invitations</h2>
          </div>
          <div className="divide-y divide-slate-200">
            {invitations.map((invite, i) => (
              <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50">
                <div>
                  <h3 className="text-lg text-slate-900 mb-1">{invite.email}</h3>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <span>Sent {invite.sent}</span>
                    <span>•</span>
                    <span>{invite.role}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-lg">
                    {invite.status}
                  </div>
                  <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm">
                    Resend
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                    <Trash className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h3 className="text-xl text-slate-900 mb-4">Workspace Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-700 mb-2">Workspace Name</label>
                <input
                  type="text"
                  defaultValue="My Workspace"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-700 mb-2">Workspace URL</label>
                <div className="flex items-center gap-2">
                  <span className="text-slate-600">horosoft.app/</span>
                  <input
                    type="text"
                    defaultValue="my-workspace"
                    className="flex-1 px-4 py-3 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl">
                Save Changes
              </button>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
            <h3 className="text-xl text-red-900 mb-2">Danger Zone</h3>
            <p className="text-red-700 mb-4">
              Once you delete a workspace, there is no going back. Please be certain.
            </p>
            <button className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl">
              Delete Workspace
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
