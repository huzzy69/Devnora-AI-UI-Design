import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, Code, Globe, Layout, Zap, ArrowRight, Sparkles, 
  CheckCircle, Clock, AlertCircle, FolderKanban, Activity, Users,
  Rocket, MessageSquare, PlayCircle, ExternalLink, Plus, Star, 
  BookOpen, Award, Target, Lock, HelpCircle
} from 'lucide-react';

export default function MemberDashboardHome() {
  const stats = [
    { 
      label: 'My Projects', 
      value: '8', 
      change: '+2', 
      trend: 'up',
      icon: FolderKanban, 
      color: 'orange',
      subtitle: '6 active, 2 completed'
    },
    { 
      label: 'Credits Used', 
      value: '1,250', 
      change: '50%', 
      trend: 'up',
      icon: Sparkles, 
      color: 'red',
      subtitle: '1,250 remaining'
    },
    { 
      label: 'Tasks Completed', 
      value: '24', 
      change: '+6', 
      trend: 'up',
      icon: CheckCircle, 
      color: 'orange',
      subtitle: '8 pending'
    },
    { 
      label: 'Learning Progress', 
      value: '68%', 
      change: '+12%', 
      trend: 'up',
      icon: BookOpen, 
      color: 'red',
      subtitle: '12 courses in progress'
    },
  ];

  const myProjects = [
    { 
      name: 'Personal Portfolio', 
      type: 'Website', 
      status: 'active', 
      lastEdited: '2 hours ago', 
      progress: 75,
      tasks: 12,
      color: 'orange'
    },
    { 
      name: 'Blog Platform', 
      type: 'Web App', 
      status: 'active', 
      lastEdited: '1 day ago', 
      progress: 60,
      tasks: 8,
      color: 'red'
    },
    { 
      name: 'E-commerce Site', 
      type: 'Website', 
      status: 'review', 
      lastEdited: '2 days ago', 
      progress: 90,
      tasks: 3,
      color: 'orange'
    },
  ];

  const quickActions = [
    { 
      icon: Code, 
      label: 'AI Code Generator', 
      desc: 'Generate code snippets', 
      to: '/member-workspace/ai-generator', 
      color: 'from-orange-600 to-red-600',
      shortcut: '⌘+K'
    },
    { 
      icon: Layout, 
      label: 'Templates', 
      desc: 'Browse available templates', 
      to: '/member-workspace/templates', 
      color: 'from-red-600 to-rose-600',
      shortcut: '⌘+T'
    },
    { 
      icon: BookOpen, 
      label: 'Learning Hub', 
      desc: 'Continue your courses', 
      to: '/member-workspace/learning', 
      color: 'from-rose-600 to-pink-600',
      shortcut: '⌘+L'
    },
    { 
      icon: MessageSquare, 
      label: 'AI Chat', 
      desc: 'Get instant help', 
      to: '/member-workspace/chat-agent', 
      color: 'from-pink-600 to-purple-600',
      shortcut: '⌘+C'
    },
  ];

  const assignedTasks = [
    { title: 'Review homepage design', priority: 'high', dueDate: 'Today', project: 'E-commerce Site' },
    { title: 'Update product images', priority: 'medium', dueDate: 'Tomorrow', project: 'Portfolio' },
    { title: 'Fix mobile responsiveness', priority: 'high', dueDate: 'In 2 days', project: 'Blog Platform' },
    { title: 'Write documentation', priority: 'low', dueDate: 'Next week', project: 'E-commerce Site' },
  ];

  const learningProgress = [
    { course: 'React Advanced Patterns', progress: 75, lessons: '12/16', time: '2h left' },
    { course: 'TypeScript Masterclass', progress: 45, lessons: '9/20', time: '8h left' },
    { course: 'Tailwind CSS Pro', progress: 90, lessons: '18/20', time: '1h left' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-6 h-6 text-orange-500" />
            <h1 className="text-2xl sm:text-3xl text-white">Member Dashboard</h1>
          </div>
          <p className="text-slate-400">Welcome to Startup Project workspace</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/member-workspace/projects" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white rounded-lg transition-all shadow-lg shadow-orange-500/25">
            <Plus className="w-4 h-4" />
            New Project
          </Link>
        </div>
      </div>

      {/* Access Notice */}
      <div className="bg-gradient-to-r from-orange-600/10 to-red-600/10 border border-orange-500/30 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Lock className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-white mb-1">Member Access Level</h3>
            <p className="text-sm text-slate-400 mb-2">
              You have limited access to this workspace. Some features require admin permissions.
            </p>
            <button className="px-3 py-1.5 bg-orange-600 hover:bg-orange-500 text-white text-sm rounded-lg transition-colors">
              Request Admin Access
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-orange-500/30 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-${stat.color}-600/20 border border-${stat.color}-500/30 rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-500`} />
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 bg-orange-600/20 border border-orange-500/30 rounded text-xs text-orange-400`}>
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
              className="group relative bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-orange-500/50 transition-all overflow-hidden"
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
        {/* My Projects */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-slate-800">
              <div className="flex items-center justify-between">
                <h2 className="text-lg text-white">My Projects</h2>
                <Link to="/member-workspace/projects" className="text-sm text-orange-400 hover:text-orange-300 flex items-center gap-1">
                  View all
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="divide-y divide-slate-800">
              {myProjects.map((project, index) => (
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
                        <span>{project.lastEdited}</span>
                        <span>•</span>
                        <span>{project.tasks} tasks</span>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded ${
                      project.status === 'active' 
                        ? 'bg-orange-600/20 border border-orange-500/30 text-orange-400' 
                        : 'bg-green-600/20 border border-green-500/30 text-green-400'
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
                  <button className="w-full px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm rounded-lg transition-colors">
                    Continue Working →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Assigned Tasks */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-slate-800">
              <h2 className="text-lg text-white">Assigned Tasks</h2>
            </div>
            <div className="p-4 space-y-3">
              {assignedTasks.map((task, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors">
                  <input type="checkbox" className="w-4 h-4 bg-slate-900 border border-slate-700 rounded" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm text-white mb-0.5">{task.title}</h4>
                    <p className="text-xs text-slate-400">{task.project}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      task.priority === 'high' 
                        ? 'bg-red-600/20 border border-red-500/30 text-red-400' 
                        : task.priority === 'medium'
                        ? 'bg-orange-600/20 border border-orange-500/30 text-orange-400'
                        : 'bg-slate-700 border border-slate-600 text-slate-400'
                    }`}>
                      {task.priority}
                    </span>
                    <span className="text-xs text-slate-500">{task.dueDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Learning Progress */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-slate-800">
            <h2 className="text-lg text-white">Learning Progress</h2>
          </div>
          <div className="p-4 space-y-4">
            {learningProgress.map((course, index) => (
              <div key={index} className="p-4 bg-slate-800/50 rounded-lg">
                <h4 className="text-sm text-white mb-2">{course.course}</h4>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-600 to-red-600 rounded-full" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-slate-400">{course.progress}%</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{course.lessons} lessons</span>
                  <span>{course.time}</span>
                </div>
                <button className="w-full mt-3 px-3 py-2 bg-orange-600 hover:bg-orange-500 text-white text-xs rounded-lg transition-colors">
                  Continue Learning
                </button>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-slate-800">
            <Link to="/member-workspace/learning" className="flex items-center justify-center gap-2 text-sm text-orange-400 hover:text-orange-300">
              Browse all courses
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
