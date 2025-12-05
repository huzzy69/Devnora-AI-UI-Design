import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Sparkles, LayoutDashboard, FolderKanban, Code, Globe, Layout, BookOpen, 
  MessageSquare, Phone, Workflow, Rocket, Key, CreditCard, Users, Settings, 
  Bell, Search, Menu, X, ChevronDown, LogOut, User, Building2, Plus,
  Download, Globe2, Shield, Wrench, Paintbrush, GitBranch, Bot, Database, Store, Smartphone, Braces
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const navigation = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Projects', path: '/dashboard/projects', icon: FolderKanban },
    { name: 'AI Code Generator', path: '/dashboard/ai-generator', icon: Code },
    { name: 'Legacy Code Repair', path: '/dashboard/legacy-repair', icon: Wrench },
    { name: 'Full Website Builder', path: '/dashboard/website-builder', icon: Paintbrush },
    { name: 'AI Website Replicator', path: '/dashboard/ai-replicator', icon: Globe },
    { name: 'Templates', path: '/dashboard/templates', icon: Layout },
    { name: 'Learning Hub', path: '/dashboard/learning', icon: BookOpen },
    { name: 'Chatbot Builder', path: '/dashboard/chatbot-builder', icon: Bot },
    { name: 'AI Chat Agent', path: '/dashboard/chat-agent', icon: MessageSquare },
    { name: 'AI Voice Agent', path: '/dashboard/voice-agent', icon: Phone },
    { name: 'Workflow Builder', path: '/dashboard/workflows', icon: Workflow },
    { name: 'Visual Workflow', path: '/dashboard/workflow-builder-visual', icon: Workflow },
    { name: 'Logic Builder', path: '/dashboard/logic-builder', icon: GitBranch },
    { name: 'Advanced Logic Builder', path: '/dashboard/advanced-logic-builder', icon: Braces },
    { name: 'Deployments', path: '/dashboard/deployments', icon: Rocket },
    { name: 'Export & Deploy', path: '/dashboard/export-deployment', icon: Download },
    { name: 'Subdomain Manager', path: '/dashboard/subdomain-automation', icon: Globe2 },
    { name: 'API Keys', path: '/dashboard/api-keys', icon: Key },
    { name: 'API Management', path: '/dashboard/api-keys-management', icon: Shield },
    { name: 'API Platform', path: '/dashboard/api-platform', icon: Database },
    { name: 'Billing & Plans', path: '/dashboard/billing', icon: CreditCard },
    { name: 'Payment Gateways', path: '/dashboard/payment-gateway-management', icon: CreditCard },
    { name: 'Template Marketplace', path: '/dashboard/template-marketplace', icon: Store },
    { name: 'Website to Mobile App', path: '/dashboard/website-to-mobile-app', icon: Smartphone },
    { name: 'One-Click Deployment', path: '/dashboard/one-click-deployment', icon: Rocket },
    { name: 'Workspace', path: '/dashboard/workspace', icon: Users },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  const workspaces = [
    { id: 1, name: 'Personal Workspace', role: 'Owner', color: 'from-blue-500 to-purple-500' },
    { id: 2, name: 'Acme Inc', role: 'Admin', color: 'from-green-500 to-emerald-500' },
    { id: 3, name: 'Startup Project', role: 'Member', color: 'from-orange-500 to-red-500' },
  ];

  const handleWorkspaceClick = (workspace: typeof workspaces[0]) => {
    const loginRoutes = {
      'Owner': '/owner-login',
      'Admin': '/admin-login',
      'Member': '/member-login',
    };

    const loginRoute = loginRoutes[workspace.role as keyof typeof loginRoutes];
    
    if (loginRoute) {
      // Close the dropdown
      setWorkspaceOpen(false);
      
      // Navigate to the appropriate login page with workspace info
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
      <div className="fixed top-0 left-0 right-0 h-16 bg-slate-900 border-b border-slate-800 z-40">
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors lg:hidden"
            >
              {sidebarOpen ? <X className="w-5 h-5 text-slate-400" /> : <Menu className="w-5 h-5 text-slate-400" />}
            </button>

            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="hidden md:block text-white">Devnora AI</span>
            </Link>

            {/* Current Workspace Display (No Dropdown) */}
            <div className="flex items-center gap-2 px-3 py-2 bg-blue-600/20 border border-blue-500/30 rounded-lg">
              <Building2 className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-white hidden md:block">Personal Workspace</span>
              <span className="px-2 py-0.5 bg-blue-600 rounded text-xs text-white hidden md:block">Owner</span>
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
              <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></div>
            </button>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-2 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm">
                  JD
                </div>
              </button>

              {profileOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden">
                  <div className="p-3 border-b border-slate-700">
                    <div className="text-sm text-white">John Doe</div>
                    <div className="text-xs text-slate-400">john@example.com</div>
                  </div>
                  <div className="p-2">
                    <Link to="/dashboard/settings" className="flex items-center gap-2 px-3 py-2 hover:bg-slate-700 rounded-lg transition-colors text-sm text-slate-300">
                      <User className="w-4 h-4" />
                      Profile Settings
                    </Link>
                    <Link to="/admin" className="flex items-center gap-2 px-3 py-2 hover:bg-slate-700 rounded-lg transition-colors text-sm text-slate-300">
                      <Settings className="w-4 h-4" />
                      Admin Panel
                    </Link>
                  </div>
                  <div className="border-t border-slate-700 p-2">
                    <Link to="/login" className="flex items-center gap-2 px-3 py-2 hover:bg-slate-700 rounded-lg transition-colors text-sm text-red-400" onClick={logout}>
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
        className={`fixed top-16 left-0 bottom-0 w-64 bg-slate-900 border-r border-slate-800 z-30 transition-transform lg:translate-x-0 ${
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
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Credit Counter */}
          <div className="mt-6 p-4 bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-300">AI Credits</span>
              <Sparkles className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl text-white mb-1">8,450</div>
            <div className="text-xs text-slate-400 mb-3">of 10,000 remaining</div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full w-[84.5%] bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
            </div>
            <Link to="/dashboard/billing" className="block mt-3 text-center text-xs text-blue-400 hover:text-blue-300 transition-colors">
              Upgrade Plan →
            </Link>
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