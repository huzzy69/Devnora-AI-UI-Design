import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Public Pages
import HomePage from './pages/marketing/HomePageNew';
import FeaturesPage from './pages/marketing/FeaturesPageNew';
import TemplatesPage from './pages/marketing/TemplatesPage';
import TemplatePreviewPage from './pages/marketing/TemplatePreviewPage';
import LearningHubPage from './pages/marketing/LearningHubPage';
import PricingPage from './pages/marketing/PricingPage';
import AboutPage from './pages/marketing/AboutPage';
import ContactPage from './pages/marketing/ContactPage';
import RoadmapPage from './pages/marketing/RoadmapPage';
import WhyHorosoftPage from './pages/marketing/WhyHorosoftPage';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPageNew';
import ResetPasswordPage from './pages/auth/ResetPasswordPageNew';
import OTPVerifyPage from './pages/auth/OTPVerifyPageNew';
import OnboardingPage from './pages/auth/OnboardingPageNew';
import OwnerLoginPage from './pages/auth/OwnerLoginPage';
import AdminLoginPage from './pages/auth/AdminLoginPage';
import MemberLoginPage from './pages/auth/MemberLoginPage';

// Dashboard Layout & Pages
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardHome from './pages/dashboard/DashboardHome';
import MyProjects from './pages/dashboard/MyProjects';
import AICodeGenerator from './pages/dashboard/AICodeGenerator';
import LegacyCodeRepair from './pages/dashboard/LegacyCodeRepair';
import FullWebsiteBuilder from './pages/dashboard/FullWebsiteBuilder';
import AIWebsiteReplicator from './pages/dashboard/AIWebsiteReplicator';
import TemplateLibrary from './pages/dashboard/TemplateLibrary';
import LearningHub from './pages/dashboard/LearningHub';
import ChatbotBuilder from './pages/dashboard/ChatbotBuilder';
import AIChatAgent from './pages/dashboard/AIChatAgent';
import AIVoiceAgent from './pages/dashboard/AIVoiceAgent';
import WorkflowBuilder from './pages/dashboard/WorkflowBuilder';
import Deployments from './pages/dashboard/Deployments';
import APIKeys from './pages/dashboard/APIKeys';
import BillingPlans from './pages/dashboard/BillingPlans';
import WorkspaceManagement from './pages/dashboard/WorkspaceManagement';
import Settings from './pages/dashboard/Settings';
import ExportDeployment from './pages/dashboard/ExportDeployment';
import WorkflowBuilderVisual from './pages/dashboard/WorkflowBuilderVisual';
import LogicBuilder from './pages/dashboard/LogicBuilder';
import SubdomainAutomation from './pages/dashboard/SubdomainAutomation';
import APIKeysManagement from './pages/dashboard/APIKeysManagement';
import PaymentGatewayManagement from './pages/dashboard/PaymentGatewayManagement';
import APIPlatform from './pages/dashboard/APIPlatformComplete';
import TemplateMarketplace from './pages/dashboard/TemplateMarketplace';
import WebsiteToMobileApp from './pages/dashboard/WebsiteToMobileApp';
import OneClickDeployment from './pages/dashboard/OneClickDeployment';
import AdvancedLogicBuilder from './pages/dashboard/AdvancedLogicBuilder';
import SaaSDeploymentSystem from './pages/dashboard/SaaSDeploymentSystem';
import VoiceAIModule from './pages/dashboard/VoiceAIModule';
import AIWorkflowAutomation from './pages/dashboard/AIWorkflowAutomation';

// Admin Layout & Pages
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import PlansManager from './pages/admin/PlansManager';
import TemplateModeration from './pages/admin/TemplateModeration';
import MarketplaceManagement from './pages/admin/MarketplaceManagement';
import LearningHubManagement from './pages/admin/LearningHubManagement';
import PaymentsTransactions from './pages/admin/PaymentsTransactions';
import AppSumoCodes from './pages/admin/AppSumoCodes';
import SystemSettings from './pages/admin/SystemSettings';
import SystemLogs from './pages/admin/SystemLogs';
import APIManagementPanel from './pages/admin/APIManagementPanel';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/template-preview" element={<TemplatePreviewPage />} />
          <Route path="/learning" element={<LearningHubPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/why-horosoft" element={<WhyHorosoftPage />} />

          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/verify-otp" element={<OTPVerifyPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/owner-login" element={<OwnerLoginPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/member-login" element={<MemberLoginPage />} />

          {/* Dashboard Routes - Owner/Personal Workspace */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="projects" element={<MyProjects />} />
            <Route path="ai-generator" element={<AICodeGenerator />} />
            <Route path="legacy-repair" element={<LegacyCodeRepair />} />
            <Route path="website-builder" element={<FullWebsiteBuilder />} />
            <Route path="ai-replicator" element={<AIWebsiteReplicator />} />
            <Route path="templates" element={<TemplateLibrary />} />
            <Route path="learning" element={<LearningHub />} />
            <Route path="chatbot-builder" element={<ChatbotBuilder />} />
            <Route path="chat-agent" element={<AIChatAgent />} />
            <Route path="voice-agent" element={<AIVoiceAgent />} />
            <Route path="workflows" element={<WorkflowBuilder />} />
            <Route path="deployments" element={<Deployments />} />
            <Route path="api-keys" element={<APIKeys />} />
            <Route path="billing" element={<BillingPlans />} />
            <Route path="workspace" element={<WorkspaceManagement />} />
            <Route path="settings" element={<Settings />} />
            <Route path="export-deployment" element={<ExportDeployment />} />
            <Route path="workflow-builder-visual" element={<WorkflowBuilderVisual />} />
            <Route path="logic-builder" element={<LogicBuilder />} />
            <Route path="subdomain-automation" element={<SubdomainAutomation />} />
            <Route path="api-keys-management" element={<APIKeysManagement />} />
            <Route path="payment-gateway-management" element={<PaymentGatewayManagement />} />
            <Route path="api-platform" element={<APIPlatform />} />
            <Route path="template-marketplace" element={<TemplateMarketplace />} />
            <Route path="website-to-mobile-app" element={<WebsiteToMobileApp />} />
            <Route path="one-click-deployment" element={<OneClickDeployment />} />
            <Route path="advanced-logic-builder" element={<AdvancedLogicBuilder />} />
            <Route path="saas-deployment-system" element={<SaaSDeploymentSystem />} />
            <Route path="voice-ai-module" element={<VoiceAIModule />} />
            <Route path="ai-workflow-automation" element={<AIWorkflowAutomation />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="plans" element={<PlansManager />} />
            <Route path="template-moderation" element={<TemplateModeration />} />
            <Route path="marketplace" element={<MarketplaceManagement />} />
            <Route path="learning-hub" element={<LearningHubManagement />} />
            <Route path="payments-transactions" element={<PaymentsTransactions />} />
            <Route path="app-sumo-codes" element={<AppSumoCodes />} />
            <Route path="system-settings" element={<SystemSettings />} />
            <Route path="system-logs" element={<SystemLogs />} />
            <Route path="api-management" element={<APIManagementPanel />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}