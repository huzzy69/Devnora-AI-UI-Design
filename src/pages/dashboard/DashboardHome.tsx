import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, Code, Globe, Layout, Zap, ArrowRight, Sparkles, 
  CheckCircle, Clock, AlertCircle, FolderKanban, Activity, Users,
  Rocket, Database, MessageSquare, BarChart3, Timer, GitBranch,
  PlayCircle, Settings, ExternalLink, Download, Plus, Star, 
  TrendingDown, Calendar, Target
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashboardHome() {
  const [chartPeriod, setChartPeriod] = useState<'week' | 'month'>('week');

  const stats = [
    { 
      label: 'Total Projects', 
      value: '24', 
      change: '+12%', 
      trend: 'up',
      icon: FolderKanban, 
      color: 'blue',
      subtitle: '18 active, 6 archived'
    },
    { 
      label: 'AI Credits Used', 
      value: '1,550', 
      change: '15.5%', 
      trend: 'up',
      icon: Sparkles, 
      color: 'purple',
      subtitle: '8,450 remaining'
    },
    { 
      label: 'Deployments', 
      value: '18', 
      change: '+3', 
      trend: 'up',
      icon: Activity, 
      color: 'green',
      subtitle: '16 successful, 2 pending'
    },
    { 
      label: 'Team Members', 
      value: '8', 
      change: '+2', 
      trend: 'up',
      icon: Users, 
      color: 'orange',
      subtitle: '3 admins, 5 members'
    },
  ];

  const recentProjects = [
    { 
      name: 'E-commerce Dashboard', 
      type: 'Dashboard', 
      status: 'active', 
      lastEdited: '2 hours ago', 
      progress: 85,
      team: ['👨‍💼', '👩‍💼', '👨‍💻'],
      deployments: 12,
      color: 'blue'
    },
    { 
      name: 'Marketing Landing Page', 
      type: 'Website', 
      status: 'deployed', 
      lastEdited: '1 day ago', 
      progress: 100,
      team: ['👩‍💼'],
      deployments: 8,
      color: 'green'
    },
    { 
      name: 'SaaS Admin Panel', 
      type: 'Admin', 
      status: 'active', 
      lastEdited: '3 days ago', 
      progress: 60,
      team: ['👨‍💼', '👩‍🎨'],
      deployments: 5,
      color: 'purple'
    },
    { 
      name: 'Portfolio Website', 
      type: 'Portfolio', 
      status: 'draft', 
      lastEdited: '1 week ago', 
      progress: 30,
      team: ['👨‍💻'],
      deployments: 2,
      color: 'orange'
    },
  ];

  const quickActions = [
    { 
      icon: Code, 
      label: 'AI Code Generator', 
      desc: 'Generate production-ready code', 
      to: '/dashboard/ai-generator', 
      color: 'from-blue-600 to-blue-500',
      shortcut: '⌘+K'
    },
    { 
      icon: Globe, 
      label: 'Clone Website', 
      desc: 'Replicate any live website', 
      to: '/dashboard/ai-replicator', 
      color: 'from-green-600 to-green-500',
      shortcut: '⌘+R'
    },
    { 
      icon: Layout, 
      label: 'Browse Templates', 
      desc: '1000+ pre-built templates', 
      to: '/dashboard/templates', 
      color: 'from-purple-600 to-purple-500',
      shortcut: '⌘+T'
    },
    { 
      icon: Zap, 
      label: 'Deploy Project', 
      desc: 'Launch to production instantly', 
      to: '/dashboard/deployments', 
      color: 'from-orange-600 to-orange-500',
      shortcut: '⌘+D'
    },
  ];

  const activityFeed = [
    {
      type: 'deployment',
      icon: Rocket,
      color: 'green',
      title: 'Project deployed successfully',
      description: 'Marketing Landing Page went live',
      time: '10 minutes ago',
      user: '👩‍💼 Sarah'
    },
    {
      type: 'code',
      icon: Code,
      color: 'blue',
      title: 'AI code generated',
      description: 'React Dashboard Component created',
      time: '1 hour ago',
      user: '👨‍💼 John'
    },
    {
      type: 'template',
      icon: Layout,
      color: 'purple',
      title: 'Template saved',
      description: 'SaaS Landing Page template added',
      time: '2 hours ago',
      user: '👩‍🎨 Emma'
    },
    {
      type: 'member',
      icon: Users,
      color: 'orange',
      title: 'Team member invited',
      description: 'mike@example.com added to workspace',
      time: '3 hours ago',
      user: '👨‍💼 John'
    },
    {
      type: 'build',
      icon: GitBranch,
      color: 'cyan',
      title: 'Build completed',
      description: 'E-commerce Dashboard v2.1.0',
      time: '5 hours ago',
      user: '👨‍💻 Mike'
    },
  ];

  const weeklyData = [
    { day: 'Mon', value: 65 },
    { day: 'Tue', value: 75 },
    { day: 'Wed', value: 55 },
    { day: 'Thu', value: 85 },
    { day: 'Fri', value: 92 },
    { day: 'Sat', value: 45 },
    { day: 'Sun', value: 38 },
  ];

  const monthlyData = [
    { day: '1', value: 25 },
    { day: '2', value: 30 },
    { day: '3', value: 35 },
    { day: '4', value: 40 },
    { day: '5', value: 45 },
    { day: '6', value: 50 },
    { day: '7', value: 55 },
    { day: '8', value: 60 },
    { day: '9', value: 65 },
    { day: '10', value: 70 },
    { day: '11', value: 75 },
    { day: '12', value: 80 },
    { day: '13', value: 85 },
    { day: '14', value: 90 },
    { day: '15', value: 95 },
    { day: '16', value: 100 },
    { day: '17', value: 95 },
    { day: '18', value: 90 },
    { day: '19', value: 85 },
    { day: '20', value: 80 },
    { day: '21', value: 75 },
    { day: '22', value: 70 },
    { day: '23', value: 65 },
    { day: '24', value: 60 },
    { day: '25', value: 55 },
    { day: '26', value: 50 },
    { day: '27', value: 45 },
    { day: '28', value: 40 },
    { day: '29', value: 35 },
    { day: '30', value: 30 },
  ];

  const upcomingTasks = [
    { title: 'Review deployment pipeline', priority: 'high', due: 'Today', completed: false },
    { title: 'Update API documentation', priority: 'medium', due: 'Tomorrow', completed: false },
    { title: 'Team standup meeting', priority: 'low', due: 'Tomorrow', completed: false },
    { title: 'Optimize database queries', priority: 'high', due: 'This week', completed: false },
  ];

  const recentTemplates = [
    { name: 'Modern SaaS Dashboard', category: 'Dashboard', downloads: '2.3k', rating: 4.9 },
    { name: 'E-commerce Store', category: 'E-commerce', downloads: '1.8k', rating: 4.8 },
    { name: 'Landing Page Pro', category: 'Marketing', downloads: '3.1k', rating: 4.9 },
  ];

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl text-white mb-2 flex items-center gap-3">
            Welcome back, John 👋
            <span className="px-3 py-1 bg-green-500/10 text-green-400 text-sm rounded-full border border-green-500/20">
              Pro Plan
            </span>
          </h1>
          <p className="text-slate-400 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/dashboard/ai-generator"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-blue-500/25"
          >
            <Sparkles className="w-5 h-5" />
            New Project
          </Link>
          <button className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl border border-slate-700 flex items-center gap-2 transition-colors">
            <Download className="w-5 h-5" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="relative p-6 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group hover:border-slate-700 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-2xl"></div>
            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-${stat.color}-500/10 rounded-xl flex items-center justify-center border border-${stat.color}-500/20`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs ${
                  stat.trend === 'up' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                }`}>
                  {stat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {stat.change}
                </div>
              </div>
              <div className="text-3xl text-white mb-1">{stat.value}</div>
              <div className="text-sm text-slate-400 mb-1">{stat.label}</div>
              <div className="text-xs text-slate-500">{stat.subtitle}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - 2 cols */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Usage Chart */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl text-white mb-1">AI Usage This Week</h2>
                <p className="text-sm text-slate-400">Credits consumed per day</p>
              </div>
              <div className="flex gap-2">
                <button
                  className={`px-3 py-1.5 ${
                    chartPeriod === 'week' ? 'bg-blue-500/10 text-blue-400' : 'bg-slate-800 text-slate-400'
                  } text-sm rounded-lg border ${
                    chartPeriod === 'week' ? 'border-blue-500/20' : 'hover:bg-slate-700'
                  }`}
                  onClick={() => setChartPeriod('week')}
                >
                  Week
                </button>
                <button
                  className={`px-3 py-1.5 ${
                    chartPeriod === 'month' ? 'bg-blue-500/10 text-blue-400' : 'bg-slate-800 text-slate-400'
                  } text-sm rounded-lg border ${
                    chartPeriod === 'month' ? 'border-blue-500/20' : 'hover:bg-slate-700'
                  }`}
                  onClick={() => setChartPeriod('month')}
                >
                  Month
                </button>
              </div>
            </div>
            <div className="flex items-end justify-between gap-2 h-48">
              {chartPeriod === 'week'
                ? weeklyData.map((data, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full relative group">
                        <div
                          className="w-full bg-gradient-to-t from-blue-600 to-purple-600 rounded-t-lg transition-all hover:from-blue-500 hover:to-purple-500 cursor-pointer"
                          style={{ height: `${data.value * 2}px` }}
                        ></div>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-950 border border-slate-700 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {data.value * 10} credits
                        </div>
                      </div>
                      <span className="text-xs text-slate-500">{data.day}</span>
                    </div>
                  ))
                : monthlyData.map((data, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full relative group">
                        <div
                          className="w-full bg-gradient-to-t from-blue-600 to-purple-600 rounded-t-lg transition-all hover:from-blue-500 hover:to-purple-500 cursor-pointer"
                          style={{ height: `${data.value * 2}px` }}
                        ></div>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-950 border border-slate-700 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {data.value * 10} credits
                        </div>
                      </div>
                      <span className="text-xs text-slate-500">{data.day}</span>
                    </div>
                  ))}
            </div>
          </div>

          {/* Recent Projects */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl text-white">Recent Projects</h2>
              <Link to="/dashboard/projects" className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
                View all
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {recentProjects.map((project, i) => (
                <div key={i} className="p-4 bg-slate-950 border border-slate-800 rounded-xl hover:border-slate-700 transition-all cursor-pointer group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white group-hover:text-blue-400 transition-colors">{project.name}</h3>
                        <span className={`px-2 py-0.5 rounded text-xs bg-${project.color}-500/10 text-${project.color}-400 border border-${project.color}-500/20`}>
                          {project.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {project.lastEdited}
                        </span>
                        <span className="flex items-center gap-1">
                          <Rocket className="w-3 h-3" />
                          {project.deployments} deployments
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === 'active' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                        project.status === 'deployed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                        'bg-slate-700 text-slate-400 border border-slate-600'
                      }`}>
                        {project.status}
                      </div>
                      <div className="flex -space-x-2">
                        {project.team.map((avatar, j) => (
                          <div key={j} className="w-6 h-6 bg-slate-800 border-2 border-slate-900 rounded-full flex items-center justify-center text-xs">
                            {avatar}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r from-${project.color}-600 to-${project.color}-500 rounded-full transition-all`} 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-slate-400 min-w-[3rem] text-right">{project.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl text-white mb-6">Quick Actions</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {quickActions.map((action, i) => (
                <Link
                  key={i}
                  to={action.to}
                  className="relative p-5 bg-slate-950 border border-slate-800 rounded-xl hover:border-slate-700 transition-all group overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                  <div className="relative flex items-start gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white group-hover:text-blue-400 transition-colors">{action.label}</h3>
                        <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                      </div>
                      <p className="text-sm text-slate-400 mb-2">{action.desc}</p>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-800 text-slate-400 text-xs rounded border border-slate-700">
                        {action.shortcut}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* AI Credits Card */}
          <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white">AI Credits</h2>
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="text-4xl text-white mb-1">8,450</div>
              <div className="text-sm text-blue-100 mb-4">of 10,000 remaining</div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden mb-4">
                <div className="h-full w-[84.5%] bg-white rounded-full"></div>
              </div>
              <div className="flex gap-2">
                <Link to="/dashboard/billing" className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-center text-sm rounded-lg transition-colors border border-white/20">
                  Upgrade Plan
                </Link>
                <Link to="/dashboard/billing" className="px-4 py-2 bg-white text-blue-600 text-sm rounded-lg hover:bg-blue-5 transition-colors font-medium">
                  Buy Credits
                </Link>
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl text-white">Activity Feed</h2>
              <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full border border-blue-500/20">
                Live
              </span>
            </div>
            <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar">
              {activityFeed.map((activity, i) => (
                <div key={i} className="flex gap-3 group">
                  <div className={`w-8 h-8 bg-${activity.color}-500/10 rounded-lg flex items-center justify-center flex-shrink-0 border border-${activity.color}-500/20`}>
                    <activity.icon className={`w-4 h-4 text-${activity.color}-400`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white mb-1 group-hover:text-blue-400 transition-colors">
                      {activity.title}
                    </p>
                    <p className="text-xs text-slate-400 mb-1">{activity.description}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>{activity.user}</span>
                      <span>•</span>
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl text-white">Tasks</h2>
              <button className="text-blue-400 hover:text-blue-300">
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              {upcomingTasks.map((task, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-slate-950 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={task.completed}
                    className="mt-1 w-4 h-4 rounded border-slate-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-900"
                    readOnly
                  />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm mb-1 ${task.completed ? 'text-slate-500 line-through' : 'text-white'}`}>
                      {task.task}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 text-xs rounded ${
                        task.priority === 'high' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                        task.priority === 'medium' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                        'bg-slate-700 text-slate-400 border border-slate-600'
                      }`}>
                        {task.priority}
                      </span>
                      <span className="text-xs text-slate-500">{task.due}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Templates */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl text-white">Popular Templates</h2>
              <Link to="/dashboard/templates" className="text-sm text-blue-400 hover:text-blue-300">
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {recentTemplates.map((template, i) => (
                <div key={i} className="p-3 bg-slate-950 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors cursor-pointer group">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm text-white group-hover:text-blue-400 transition-colors">
                      {template.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-yellow-400">
                      <Star className="w-3 h-3 fill-yellow-400" />
                      {template.rating}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">{template.category}</span>
                    <span className="text-slate-500">{template.downloads} downloads</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}