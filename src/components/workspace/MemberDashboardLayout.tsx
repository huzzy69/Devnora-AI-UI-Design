import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Sparkles, LayoutDashboard, FolderKanban, Code, Globe, Layout, BookOpen, 
  MessageSquare, Settings, Bell, Search, Menu, X, ChevronDown, LogOut, User, 
  Building2, Plus, Users
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function MemberDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Member navigation - limited features
  const navigation = [
    { name: 'Dashboard', path: '/member-workspace', icon: LayoutDashboard },
    { name: 'My Projects', path: '/member-workspace/projects', icon: FolderKanban },
    { name: 'AI Code Generator', path: '/member-workspace/ai-generator', icon: Code },
    { name: 'AI Website Replicator', path: '/member-workspace/ai-replicator', icon: Globe },
    { name: 'Templates', path: '/member-workspace/templates', icon: Layout },
    { name: 'Learning Hub', path: '/member-workspace/learning', icon: BookOpen },
    { name: 'AI Chat Agent', path: '/member-workspace/chat-agent', icon: MessageSquare },
    { name: 'Settings', path: '/member-workspace/settings', icon: Settings },
  ];

  const workspaces = [
    { id: 1, name: 'Personal Workspace', role: 'Owner', color: 'from-blue-500 to-purple-500' },
    { id: 2, name: 'Acme Inc', role: 'Admin', color: 'from-green-500 to-emerald-500' },
    { id: 3, name: 'Startup Project', role: 'Member', color: 'from-orange-500 to-red-500', active: true },
  ];

  const handleWorkspaceClick = (workspace: typeof workspaces[0]) => {
    const loginRoutes = {
      'Owner': '/owner-login',
      'Admin': '/admin-login',
      'Member': '/member-login',
    };

    const loginRoute = loginRoutes[workspace.role as keyof typeof loginRoutes];
    
    if (loginRoute) {
      setWorkspaceOpen(false);
      navigate(loginRoute, {
        state: {
          workspaceName: workspace.name,
          workspaceId: workspace.id,
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-slate-900 border-b border-orange-800/30 z-40">
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors lg:hidden"
            >
              {sidebarOpen ? <X className="w-5 h-5 text-slate-400" /> : <Menu className="w-5 h-5 text-slate-400" />}
            </button>

            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="hidden md:block text-white">Devnora AI</span>
            </Link>

            {/* Current Workspace Display (No Dropdown) */}
            <div className="flex items-center gap-2 px-3 py-2 bg-orange-600/20 border border-orange-500/30 rounded-lg">
              <Users className="w-4 h-4 text-orange-400" />
              <span className="text-sm text-white hidden md:block">Startup Project</span>
              <span className="px-2 py-0.5 bg-orange-600 rounded text-xs text-white hidden md:block">Member</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg w-64">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-slate-400"
              />
              <kbd className="px-2 py-0.5 bg-slate-700 rounded text-xs text-slate-400">⌘K</kbd>
            </div>

            {/* Notifications */}
            <button className="relative p-2 hover:bg-slate-800 rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-slate-400" />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full"></div>
            </button>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-2 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-sm">
                  MB
                </div>
              </button>

              {profileOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden z-50">
                  <div className="p-3 border-b border-slate-700">
                    <div className="text-sm text-white">Member User</div>
                    <div className="text-xs text-slate-400">member@startup.com</div>
                    <div className="mt-1 px-2 py-0.5 bg-orange-600/20 border border-orange-500/30 rounded text-xs text-orange-400 inline-block">
                      Member Role
                    </div>
                  </div>
                  <div className="p-2">
                    <Link to="/member-workspace/settings" className="flex items-center gap-2 px-3 py-2 hover:bg-slate-700 rounded-lg transition-colors text-sm text-slate-300">
                      <User className="w-4 h-4" />
                      Profile Settings
                    </Link>
                    <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 hover:bg-slate-700 rounded-lg transition-colors text-sm text-slate-300">
                      <Building2 className="w-4 h-4" />
                      Switch Workspace
                    </Link>
                  </div>
                  <div className="border-t border-slate-700 p-2">
                    <Link to="/member-login" className="flex items-center gap-2 px-3 py-2 hover:bg-slate-700 rounded-lg transition-colors text-sm text-red-400">
                      <LogOut className="w-4 h-4" />
                      Log Out
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-16 left-0 bottom-0 w-64 bg-slate-900 border-r border-orange-800/30 z-30 transition-transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full overflow-y-auto p-4">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-orange-600 text-white'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Member Notice */}
          <div className="mt-6 p-4 bg-gradient-to-br from-orange-600/20 to-red-600/20 border border-orange-500/30 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-orange-400" />
              <span className="text-sm text-slate-300">Member Access</span>
            </div>
            <p className="text-xs text-slate-400 mb-3">
              You have limited access to this workspace. Contact admin for more permissions.
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Your Credits</span>
                <span className="text-white">2,500</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full w-[50%] bg-gradient-to-r from-orange-600 to-red-600 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Request Access Card */}
          <div className="mt-4 p-4 bg-slate-800 border border-slate-700 rounded-xl">
            <p className="text-xs text-slate-400 mb-2">Need more features?</p>
            <button className="w-full px-3 py-2 bg-orange-600 hover:bg-orange-500 text-white text-xs rounded-lg transition-colors">
              Request Admin Access
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`pt-16 transition-all ${
          sidebarOpen ? 'lg:pl-64' : ''
        }`}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}