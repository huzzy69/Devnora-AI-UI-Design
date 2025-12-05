import React, { useState } from 'react';
import {
  CreditCard, Key, Shield, Eye, EyeOff, Copy, Check, Save, RefreshCw,
  Settings, AlertCircle, CheckCircle, XCircle, Clock, Filter, Download,
  FileText, Calendar, Search, ExternalLink, Trash2, Edit, Lock, Unlock,
  Globe, Webhook, Database, Activity, DollarSign, Receipt, ChevronDown
} from 'lucide-react';

interface WebhookLog {
  id: string;
  timestamp: Date;
  gateway: 'cashfree' | 'paypal';
  event: string;
  status: 'success' | 'failed' | 'pending';
  statusCode: number;
  payload: any;
  response: any;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  date: Date;
  customer: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed' | 'refunded';
  gateway: 'cashfree' | 'paypal';
  description: string;
  downloadUrl: string;
}

export default function PaymentGatewayManagement() {
  const [activeTab, setActiveTab] = useState<'configuration' | 'webhooks' | 'invoices'>('configuration');
  
  // Configuration State
  const [cashfreeEnabled, setCashfreeEnabled] = useState(true);
  const [paypalEnabled, setPaypalEnabled] = useState(true);
  const [showCashfreeAppId, setShowCashfreeAppId] = useState(false);
  const [showCashfreeSecret, setShowCashfreeSecret] = useState(false);
  const [showPaypalClientId, setShowPaypalClientId] = useState(false);
  const [showPaypalSecret, setShowPaypalSecret] = useState(false);

  const [cashfreeAppId, setCashfreeAppId] = useState('');
  const [cashfreeSecretKey, setCashfreeSecretKey] = useState('');
  const [cashfreeMode, setCashfreeMode] = useState<'sandbox' | 'production'>('sandbox');
  
  const [paypalClientId, setPaypalClientId] = useState('');
  const [paypalSecret, setPaypalSecret] = useState('');
  const [paypalMode, setPaypalMode] = useState<'sandbox' | 'production'>('sandbox');

  // Webhook State
  const [webhookFilter, setWebhookFilter] = useState({
    gateway: 'all',
    status: 'all',
    dateRange: '7days'
  });
  const [searchWebhook, setSearchWebhook] = useState('');

  // Invoice State
  const [invoiceFilter, setInvoiceFilter] = useState({
    status: 'all',
    gateway: 'all',
    dateRange: '30days'
  });
  const [searchInvoice, setSearchInvoice] = useState('');

  // Sample Webhook Logs
  const webhookLogs: WebhookLog[] = [
    {
      id: 'wh-1',
      timestamp: new Date('2024-12-04T10:30:00'),
      gateway: 'cashfree',
      event: 'payment.success',
      status: 'success',
      statusCode: 200,
      payload: { orderId: 'ORD-12345', amount: 79.00 },
      response: { status: 'processed' }
    },
    {
      id: 'wh-2',
      timestamp: new Date('2024-12-04T09:15:00'),
      gateway: 'paypal',
      event: 'subscription.created',
      status: 'success',
      statusCode: 200,
      payload: { subscriptionId: 'SUB-67890', plan: 'professional' },
      response: { status: 'active' }
    },
    {
      id: 'wh-3',
      timestamp: new Date('2024-12-04T08:45:00'),
      gateway: 'cashfree',
      event: 'payment.failed',
      status: 'failed',
      statusCode: 400,
      payload: { orderId: 'ORD-12346', amount: 299.00 },
      response: { error: 'Insufficient funds' }
    },
    {
      id: 'wh-4',
      timestamp: new Date('2024-12-03T16:20:00'),
      gateway: 'paypal',
      event: 'payment.captured',
      status: 'success',
      statusCode: 200,
      payload: { paymentId: 'PAY-98765', amount: 29.00 },
      response: { status: 'completed' }
    },
    {
      id: 'wh-5',
      timestamp: new Date('2024-12-03T14:10:00'),
      gateway: 'cashfree',
      event: 'refund.processed',
      status: 'success',
      statusCode: 200,
      payload: { refundId: 'REF-11111', amount: 79.00 },
      response: { status: 'refunded' }
    },
  ];

  // Sample Invoices
  const invoices: Invoice[] = [
    {
      id: 'inv-1',
      invoiceNumber: 'INV-2024-001234',
      date: new Date('2024-12-01'),
      customer: 'John Doe',
      amount: 79.00,
      status: 'paid',
      gateway: 'cashfree',
      description: 'Professional Plan - Monthly',
      downloadUrl: '#'
    },
    {
      id: 'inv-2',
      invoiceNumber: 'INV-2024-001233',
      date: new Date('2024-11-01'),
      customer: 'John Doe',
      amount: 79.00,
      status: 'paid',
      gateway: 'paypal',
      description: 'Professional Plan - Monthly',
      downloadUrl: '#'
    },
    {
      id: 'inv-3',
      invoiceNumber: 'INV-2024-001232',
      date: new Date('2024-10-15'),
      customer: 'Acme Corporation',
      amount: 299.00,
      status: 'paid',
      gateway: 'cashfree',
      description: 'Enterprise Plan - Monthly',
      downloadUrl: '#'
    },
    {
      id: 'inv-4',
      invoiceNumber: 'INV-2024-001231',
      date: new Date('2024-10-01'),
      customer: 'John Doe',
      amount: 79.00,
      status: 'refunded',
      gateway: 'paypal',
      description: 'Professional Plan - Monthly',
      downloadUrl: '#'
    },
    {
      id: 'inv-5',
      invoiceNumber: 'INV-2024-001230',
      date: new Date('2024-09-15'),
      customer: 'Startup Inc',
      amount: 29.00,
      status: 'paid',
      gateway: 'cashfree',
      description: 'Starter Plan - Monthly',
      downloadUrl: '#'
    },
  ];

  const handleSaveConfiguration = () => {
    alert('Payment gateway configuration saved successfully!');
  };

  const handleTestConnection = (gateway: 'cashfree' | 'paypal') => {
    alert(`Testing ${gateway} connection...`);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const downloadInvoice = (invoice: Invoice) => {
    alert(`Downloading invoice ${invoice.invoiceNumber}...`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
      case 'paid':
        return 'bg-green-100 text-green-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'refunded':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
      case 'paid':
        return <CheckCircle className="w-4 h-4" />;
      case 'failed':
        return <XCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2 text-slate-900">Payment Gateway Management</h1>
        <p className="text-slate-600">Configure payment gateways, monitor webhooks, and manage invoices</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('configuration')}
          className={`px-6 py-3 border-b-2 transition-all ${
            activeTab === 'configuration'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Gateway Configuration
          </div>
        </button>
        <button
          onClick={() => setActiveTab('webhooks')}
          className={`px-6 py-3 border-b-2 transition-all ${
            activeTab === 'webhooks'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <Webhook className="w-5 h-5" />
            Webhook Logs
          </div>
        </button>
        <button
          onClick={() => setActiveTab('invoices')}
          className={`px-6 py-3 border-b-2 transition-all ${
            activeTab === 'invoices'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5" />
            Invoice History
          </div>
        </button>
      </div>

      {/* Configuration Tab */}
      {activeTab === 'configuration' && (
        <div className="space-y-6">
          {/* Cashfree Configuration */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-orange-50 to-red-50">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl text-slate-900 mb-1">Cashfree Payments</h3>
                  <p className="text-sm text-slate-600">Indian payment gateway with UPI, Cards, NetBanking</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={cashfreeEnabled}
                  onChange={(e) => setCashfreeEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-orange-600"></div>
              </label>
            </div>

            <div className="p-6 space-y-4">
              {/* Mode Selection */}
              <div>
                <label className="block text-sm text-slate-700 mb-2">Environment Mode</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setCashfreeMode('sandbox')}
                    className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all ${
                      cashfreeMode === 'sandbox'
                        ? 'border-orange-600 bg-orange-50 text-orange-700'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Activity className="w-5 h-5" />
                      Sandbox (Testing)
                    </div>
                  </button>
                  <button
                    onClick={() => setCashfreeMode('production')}
                    className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all ${
                      cashfreeMode === 'production'
                        ? 'border-orange-600 bg-orange-50 text-orange-700'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Shield className="w-5 h-5" />
                      Production (Live)
                    </div>
                  </button>
                </div>
              </div>

              {/* App ID */}
              <div>
                <label className="block text-sm text-slate-700 mb-2">
                  Cashfree App ID
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showCashfreeAppId ? 'text' : 'password'}
                    value={cashfreeAppId}
                    onChange={(e) => setCashfreeAppId(e.target.value)}
                    placeholder="Enter your Cashfree App ID"
                    className="w-full px-4 py-3 pr-24 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                    <button
                      onClick={() => setShowCashfreeAppId(!showCashfreeAppId)}
                      className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                      {showCashfreeAppId ? (
                        <EyeOff className="w-4 h-4 text-slate-600" />
                      ) : (
                        <Eye className="w-4 h-4 text-slate-600" />
                      )}
                    </button>
                    <button
                      onClick={() => copyToClipboard(cashfreeAppId)}
                      className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                      <Copy className="w-4 h-4 text-slate-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Secret Key */}
              <div>
                <label className="block text-sm text-slate-700 mb-2">
                  Cashfree Secret Key
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showCashfreeSecret ? 'text' : 'password'}
                    value={cashfreeSecretKey}
                    onChange={(e) => setCashfreeSecretKey(e.target.value)}
                    placeholder="Enter your Cashfree Secret Key"
                    className="w-full px-4 py-3 pr-24 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                    <button
                      onClick={() => setShowCashfreeSecret(!showCashfreeSecret)}
                      className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                      {showCashfreeSecret ? (
                        <EyeOff className="w-4 h-4 text-slate-600" />
                      ) : (
                        <Eye className="w-4 h-4 text-slate-600" />
                      )}
                    </button>
                    <button
                      onClick={() => copyToClipboard(cashfreeSecretKey)}
                      className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                      <Copy className="w-4 h-4 text-slate-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Webhook URL */}
              <div>
                <label className="block text-sm text-slate-700 mb-2">Webhook URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value="https://api.devnora.com/webhooks/cashfree"
                    readOnly
                    className="flex-1 px-4 py-3 bg-slate-100 border border-slate-300 rounded-xl text-slate-600"
                  />
                  <button
                    onClick={() => copyToClipboard('https://api.devnora.com/webhooks/cashfree')}
                    className="px-4 py-3 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition-colors"
                  >
                    <Copy className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-1">Configure this URL in your Cashfree dashboard</p>
              </div>

              {/* Test Connection */}
              <div className="pt-4 border-t border-slate-200">
                <button
                  onClick={() => handleTestConnection('cashfree')}
                  className="w-full px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Test Cashfree Connection
                </button>
              </div>
            </div>
          </div>

          {/* PayPal Configuration */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl text-slate-900 mb-1">PayPal Payments</h3>
                  <p className="text-sm text-slate-600">Global payment gateway for international customers</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={paypalEnabled}
                  onChange={(e) => setPaypalEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="p-6 space-y-4">
              {/* Mode Selection */}
              <div>
                <label className="block text-sm text-slate-700 mb-2">Environment Mode</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setPaypalMode('sandbox')}
                    className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all ${
                      paypalMode === 'sandbox'
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Activity className="w-5 h-5" />
                      Sandbox (Testing)
                    </div>
                  </button>
                  <button
                    onClick={() => setPaypalMode('production')}
                    className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all ${
                      paypalMode === 'production'
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Shield className="w-5 h-5" />
                      Production (Live)
                    </div>
                  </button>
                </div>
              </div>

              {/* Client ID */}
              <div>
                <label className="block text-sm text-slate-700 mb-2">
                  PayPal Client ID
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPaypalClientId ? 'text' : 'password'}
                    value={paypalClientId}
                    onChange={(e) => setPaypalClientId(e.target.value)}
                    placeholder="Enter your PayPal Client ID"
                    className="w-full px-4 py-3 pr-24 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                    <button
                      onClick={() => setShowPaypalClientId(!showPaypalClientId)}
                      className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                      {showPaypalClientId ? (
                        <EyeOff className="w-4 h-4 text-slate-600" />
                      ) : (
                        <Eye className="w-4 h-4 text-slate-600" />
                      )}
                    </button>
                    <button
                      onClick={() => copyToClipboard(paypalClientId)}
                      className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                      <Copy className="w-4 h-4 text-slate-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Secret */}
              <div>
                <label className="block text-sm text-slate-700 mb-2">
                  PayPal Secret
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPaypalSecret ? 'text' : 'password'}
                    value={paypalSecret}
                    onChange={(e) => setPaypalSecret(e.target.value)}
                    placeholder="Enter your PayPal Secret"
                    className="w-full px-4 py-3 pr-24 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                    <button
                      onClick={() => setShowPaypalSecret(!showPaypalSecret)}
                      className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                      {showPaypalSecret ? (
                        <EyeOff className="w-4 h-4 text-slate-600" />
                      ) : (
                        <Eye className="w-4 h-4 text-slate-600" />
                      )}
                    </button>
                    <button
                      onClick={() => copyToClipboard(paypalSecret)}
                      className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                      <Copy className="w-4 h-4 text-slate-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Webhook URL */}
              <div>
                <label className="block text-sm text-slate-700 mb-2">Webhook URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value="https://api.devnora.com/webhooks/paypal"
                    readOnly
                    className="flex-1 px-4 py-3 bg-slate-100 border border-slate-300 rounded-xl text-slate-600"
                  />
                  <button
                    onClick={() => copyToClipboard('https://api.devnora.com/webhooks/paypal')}
                    className="px-4 py-3 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition-colors"
                  >
                    <Copy className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-1">Configure this URL in your PayPal developer dashboard</p>
              </div>

              {/* Test Connection */}
              <div className="pt-4 border-t border-slate-200">
                <button
                  onClick={() => handleTestConnection('paypal')}
                  className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Test PayPal Connection
                </button>
              </div>
            </div>
          </div>

          {/* Save All Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSaveConfiguration}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl transition-all flex items-center gap-2 text-lg"
            >
              <Save className="w-6 h-6" />
              Save All Configurations
            </button>
          </div>
        </div>
      )}

      {/* Webhook Logs Tab */}
      {activeTab === 'webhooks' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm text-slate-700 mb-2">Gateway</label>
                <select
                  value={webhookFilter.gateway}
                  onChange={(e) => setWebhookFilter({ ...webhookFilter, gateway: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 outline-none focus:border-blue-500"
                >
                  <option value="all">All Gateways</option>
                  <option value="cashfree">Cashfree</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2">Status</label>
                <select
                  value={webhookFilter.status}
                  onChange={(e) => setWebhookFilter({ ...webhookFilter, status: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 outline-none focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="success">Success</option>
                  <option value="failed">Failed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2">Date Range</label>
                <select
                  value={webhookFilter.dateRange}
                  onChange={(e) => setWebhookFilter({ ...webhookFilter, dateRange: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 outline-none focus:border-blue-500"
                >
                  <option value="today">Today</option>
                  <option value="7days">Last 7 Days</option>
                  <option value="30days">Last 30 Days</option>
                  <option value="90days">Last 90 Days</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={searchWebhook}
                    onChange={(e) => setSearchWebhook(e.target.value)}
                    placeholder="Search events..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Webhook Logs Table */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm text-slate-700">Timestamp</th>
                    <th className="px-6 py-4 text-left text-sm text-slate-700">Gateway</th>
                    <th className="px-6 py-4 text-left text-sm text-slate-700">Event</th>
                    <th className="px-6 py-4 text-left text-sm text-slate-700">Status</th>
                    <th className="px-6 py-4 text-left text-sm text-slate-700">Code</th>
                    <th className="px-6 py-4 text-right text-sm text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {webhookLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm text-slate-900">
                        {log.timestamp.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm ${
                          log.gateway === 'cashfree'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {log.gateway === 'cashfree' ? <CreditCard className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                          {log.gateway.charAt(0).toUpperCase() + log.gateway.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">{log.event}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-sm ${getStatusColor(log.status)}`}>
                          {getStatusIcon(log.status)}
                          {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">{log.statusCode}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
              <div className="text-sm text-slate-600">
                Showing <span className="text-slate-900">1-5</span> of <span className="text-slate-900">48</span> logs
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors">
                  Previous
                </button>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Invoices Tab */}
      {activeTab === 'invoices' && (
        <div className="space-y-6">
          {/* Invoice Stats */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-xs text-green-600">+12%</span>
              </div>
              <div className="text-2xl text-slate-900 mb-1">$1,245</div>
              <div className="text-sm text-slate-600">Total Paid</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <span className="text-xs text-yellow-600">2</span>
              </div>
              <div className="text-2xl text-slate-900 mb-1">$158</div>
              <div className="text-sm text-slate-600">Pending</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-xs text-purple-600">1</span>
              </div>
              <div className="text-2xl text-slate-900 mb-1">$79</div>
              <div className="text-sm text-slate-600">Refunded</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-xs text-blue-600">18</span>
              </div>
              <div className="text-2xl text-slate-900 mb-1">18</div>
              <div className="text-sm text-slate-600">Total Invoices</div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm text-slate-700 mb-2">Status</label>
                <select
                  value={invoiceFilter.status}
                  onChange={(e) => setInvoiceFilter({ ...invoiceFilter, status: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 outline-none focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                  <option value="refunded">Refunded</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2">Gateway</label>
                <select
                  value={invoiceFilter.gateway}
                  onChange={(e) => setInvoiceFilter({ ...invoiceFilter, gateway: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 outline-none focus:border-blue-500"
                >
                  <option value="all">All Gateways</option>
                  <option value="cashfree">Cashfree</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2">Date Range</label>
                <select
                  value={invoiceFilter.dateRange}
                  onChange={(e) => setInvoiceFilter({ ...invoiceFilter, dateRange: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 outline-none focus:border-blue-500"
                >
                  <option value="30days">Last 30 Days</option>
                  <option value="90days">Last 90 Days</option>
                  <option value="year">This Year</option>
                  <option value="all">All Time</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={searchInvoice}
                    onChange={(e) => setSearchInvoice(e.target.value)}
                    placeholder="Search invoices..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Invoices Table */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm text-slate-700">Invoice #</th>
                    <th className="px-6 py-4 text-left text-sm text-slate-700">Date</th>
                    <th className="px-6 py-4 text-left text-sm text-slate-700">Customer</th>
                    <th className="px-6 py-4 text-left text-sm text-slate-700">Description</th>
                    <th className="px-6 py-4 text-left text-sm text-slate-700">Gateway</th>
                    <th className="px-6 py-4 text-left text-sm text-slate-700">Amount</th>
                    <th className="px-6 py-4 text-left text-sm text-slate-700">Status</th>
                    <th className="px-6 py-4 text-right text-sm text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm text-slate-900">{invoice.invoiceNumber}</td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {invoice.date.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">{invoice.customer}</td>
                      <td className="px-6 py-4 text-sm text-slate-700">{invoice.description}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs ${
                          invoice.gateway === 'cashfree'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {invoice.gateway === 'cashfree' ? <CreditCard className="w-3 h-3" /> : <Globe className="w-3 h-3" />}
                          {invoice.gateway.charAt(0).toUpperCase() + invoice.gateway.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-900">${invoice.amount.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-sm ${getStatusColor(invoice.status)}`}>
                          {getStatusIcon(invoice.status)}
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => downloadInvoice(invoice)}
                            className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Download PDF"
                          >
                            <Download className="w-4 h-4 text-blue-600" />
                          </button>
                          <button
                            className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4 text-slate-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
              <div className="text-sm text-slate-600">
                Showing <span className="text-slate-900">1-5</span> of <span className="text-slate-900">18</span> invoices
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors">
                  Previous
                </button>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
