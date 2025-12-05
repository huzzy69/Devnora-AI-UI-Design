import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, Code, Globe, Layout, Zap, ArrowRight, Sparkles, 
  CheckCircle, Clock, AlertCircle, FolderKanban, Activity, Users,
  Rocket, Database, MessageSquare, BarChart3, Timer, GitBranch,
  PlayCircle, Settings, ExternalLink, Download, Plus, Star, 
  TrendingDown, Calendar, Target, ShieldCheck, Award, Boxes
} from 'lucide-react';

export default function AdminDashboardHome() {
  const stats = [
    { 
      label: 'Team Projects', 
      value: '156', 
      change: '+24%', 
      trend: 'up',
      icon: FolderKanban, 
      color: 'green',
      subtitle: '142 active, 14 archived'
    },
    { 
      label: 'Team Credits', 
      value: '25,000', 
      change: '50%', 
      trend: 'up',
      icon: Sparkles, 
      color: 'emerald',
      subtitle: '25,000 remaining'
    },
    { 
      label: 'Active Deployments', 
      value: '48', 
      change: '+8', 
      trend: 'up',
      icon: Activity, 
      color: 'green',
      subtitle: '42 successful, 6 pending'
    },
    { 
      label: 'Team Members', 
      value: '12', 
      change: '+3', 
      trend: 'up',
      icon: Users, 
      color: 'emerald',
      subtitle: '4 admins, 8 members'
    },
  ];

  const recentProjects = [
    { 
      name: 'Acme CRM Platform', 
      type: 'Enterprise', 
      status: 'active', 
      lastEdited: '1 hour ago', 
      progress: 92,
      team: ['👨‍💼', '👩‍💼', '👨‍💻', '👩‍🎨'],
      deployments: 28,
      color: 'green',
      owner: 'Sarah M.'
    },
    { 
      name: 'Client Portal v2', 
      type: 'Dashboard', 
      status: 'deployed', 
      lastEdited: '3 hours ago', 
      progress: 100,
      team: ['👩‍💼', '👨‍💻'],
      deployments: 15,
      color: 'emerald',
      owner: 'John D.'
    },
    { 
      name: 'Analytics Dashboard', 
      type: 'Analytics', 
      status: 'active', 
      lastEdited: '1 day ago', 
      progress: 75,
      team: ['👨‍💼', '👩‍🎨', '👨‍💻'],
      deployments: 12,
      color: 'green',
      owner: 'Mike R.'
    },
    { 
      name: 'Mobile App Backend', 
      type: 'API', 
      status: 'testing', 
      lastEdited: '2 days ago', 
      progress: 88,
      team: ['👨‍💻', '👩‍💻'],
      deployments: 7,
      color: 'emerald',
      owner: 'Lisa K.'
    },
  ];

  const quickActions = [
    { 
      icon: Code, 
      label: 'AI Code Generator', 
      desc: 'Generate production-ready code', 
      to: '/admin-workspace/ai-generator', 
      color: 'from-green-600 to-emerald-600',
      shortcut: '⌘+K'
    },
    { 
      icon: Globe, 
      label: 'AI Website Replicator', 
      desc: 'Clone & replicate any website', 
      to: '/admin-workspace/ai-replicator', 
      color: 'from-emerald-600 to-teal-600',
      shortcut: '⌘+R'
    },
    { 
      icon: Users, 
      label: 'Team Management', 
      desc: 'Manage members & permissions', 
      to: '/admin-workspace/team', 
      color: 'from-teal-600 to-cyan-600',
      shortcut: '⌘+T'
    },
    { 
      icon: Rocket, 
      label: 'Deploy Project', 
      desc: 'Deploy to production instantly', 
      to: '/admin-workspace/deployments', 
      color: 'from-cyan-600 to-blue-600',
      shortcut: '⌘+D'
    },
  ];

  const teamActivity = [
    { user: 'Sarah M.', action: 'deployed', project: 'Client Portal v2', time: '15 min ago', avatar: '👩‍💼' },
    { user: 'John D.', action: 'created', project: 'Analytics Dashboard', time: '1 hour ago', avatar: '👨‍💻' },
    { user: 'Mike R.', action: 'updated', project: 'Acme CRM Platform', time: '2 hours ago', avatar: '👨‍💼' },
    { user: 'Lisa K.', action: 'completed', project: 'Mobile App Backend', time: '3 hours ago', avatar: '👩‍💻' },
    { user: 'Tom S.', action: 'reviewed', project: 'Client Portal v2', time: '5 hours ago', avatar: '👨‍🎨' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-6 h-6 text-green-500" />
            <h1 className="text-2xl sm:text-3xl text-white">Admin Dashboard</h1>
          </div>
          <p className="text-slate-400">Welcome back! Manage Acme Inc workspace</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export Data</span>
          </button>
          <Link to="/admin-workspace/projects" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-lg transition-all shadow-lg shadow-green-500/25">
            <Plus className="w-4 h-4" />
            New Project
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-green-500/30 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-${stat.color}-600/20 border border-${stat.color}-500/30 rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-500`} />
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 bg-green-600/20 border border-green-500/30 rounded text-xs text-green-400`}>
                  <TrendingUp className="w-3 h-3" />
                  {stat.change}
                </div>
              </div>
              <div className="text-3xl text-white mb-1">{stat.value}</div>
              <div className="text-sm text-slate-400 mb-2">{stat.label}</div>
              <div className="text-xs text-slate-500">{stat.subtitle}</div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link
              key={index}
              to={action.to}
              className="group relative bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-green-500/50 transition-all overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
              <div className="relative">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <kbd className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    {action.shortcut}
                  </kbd>
                </div>
                <h3 className="text-white mb-1">{action.label}</h3>
                <p className="text-xs text-slate-400">{action.desc}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Projects */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-slate-800">
            <div className="flex items-center justify-between">
              <h2 className="text-lg text-white">Team Projects</h2>
              <Link to="/admin-workspace/projects" className="text-sm text-green-400 hover:text-green-300 flex items-center gap-1">
                View all
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="divide-y divide-slate-800">
            {recentProjects.map((project, index) => (
              <div key={index} className="p-6 hover:bg-slate-800/50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white">{project.name}</h3>
                      <span className={`px-2 py-0.5 bg-${project.color}-600/20 border border-${project.color}-500/30 rounded text-xs text-${project.color}-400`}>
                        {project.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span>By {project.owner}</span>
                      <span>•</span>
                      <span>{project.lastEdited}</span>
                      <span>•</span>
                      <span>{project.deployments} deployments</span>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded ${
                    project.status === 'deployed' 
                      ? 'bg-green-600/20 border border-green-500/30 text-green-400' 
                      : project.status === 'active'
                      ? 'bg-blue-600/20 border border-blue-500/30 text-blue-400'
                      : 'bg-slate-700 border border-slate-600 text-slate-400'
                  } text-xs`}>
                    {project.status}
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r from-${project.color}-600 to-${project.color}-500 rounded-full`} style={{ width: `${project.progress}%` }}></div>
                  </div>
                  <span className="text-xs text-slate-400">{project.progress}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {project.team.map((member, i) => (
                      <div key={i} className="w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center text-xs">
                        {member}
                      </div>
                    ))}
                  </div>
                  <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg transition-colors">
                    Open →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Activity */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-slate-800">
            <h2 className="text-lg text-white">Team Activity</h2>
          </div>
          <div className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
            {teamActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center flex-shrink-0">
                  {activity.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-300">
                    <span className="text-white">{activity.user}</span> {activity.action}{' '}
                    <span className="text-green-400">{activity.project}</span>
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
