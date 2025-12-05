import React, { useState } from 'react';
import {
  Upload, Plus, DollarSign, Share2, Eye, Download, Heart, Star, TrendingUp,
  Package, Filter, Search, X, Check, AlertCircle, Image, FileCode, Folder,
  Tag, Users, BarChart3, Calendar, Edit, Trash2, Settings, Lock, Unlock,
  ChevronDown, ExternalLink, Copy, Sparkles, Award, Crown, Zap, Globe,
  ShoppingCart, CreditCard, Percent, ArrowUpRight, ArrowDownRight, Activity
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  type: 'free' | 'paid';
  preview: string;
  downloads: number;
  rating: number;
  reviews: number;
  author: string;
  authorAvatar: string;
  createdAt: Date;
  status: 'active' | 'pending' | 'rejected';
  earnings?: number;
  sales?: number;
  tags: string[];
}

interface Revenue {
  templateId: string;
  templateName: string;
  sales: number;
  revenue: number;
  revenueShare: number;
  trend: 'up' | 'down';
  trendValue: number;
}

export default function TemplateMarketplace() {
  const [activeTab, setActiveTab] = useState<'browse' | 'upload' | 'revenue'>('browse');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Upload Form State
  const [uploadForm, setUploadForm] = useState({
    name: '',
    description: '',
    category: 'website',
    type: 'free' as 'free' | 'paid',
    price: 0,
    tags: [] as string[],
    file: null as File | null,
    preview: null as File | null,
    shareRevenue: 70
  });

  const categories = [
    { id: 'all', name: 'All Templates', icon: Package },
    { id: 'website', name: 'Full Websites', icon: Globe },
    { id: 'landing', name: 'Landing Pages', icon: FileCode },
    { id: 'dashboard', name: 'Dashboards', icon: BarChart3 },
    { id: 'ecommerce', name: 'E-Commerce', icon: ShoppingCart },
    { id: 'portfolio', name: 'Portfolio', icon: Award },
    { id: 'blog', name: 'Blog', icon: FileCode },
    { id: 'admin', name: 'Admin Panels', icon: Settings },
  ];

  // Sample Templates
  const templates: Template[] = [
    {
      id: 'tmp-1',
      name: 'Modern SaaS Landing',
      description: 'Beautiful landing page for SaaS products with pricing tables and feature sections',
      category: 'landing',
      price: 29,
      type: 'paid',
      preview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      downloads: 1234,
      rating: 4.8,
      reviews: 89,
      author: 'John Doe',
      authorAvatar: 'JD',
      createdAt: new Date('2024-11-15'),
      status: 'active',
      earnings: 2436,
      sales: 84,
      tags: ['SaaS', 'Landing', 'Modern']
    },
    {
      id: 'tmp-2',
      name: 'E-Commerce Store',
      description: 'Complete e-commerce template with product pages, cart, and checkout',
      category: 'ecommerce',
      price: 49,
      type: 'paid',
      preview: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800',
      downloads: 892,
      rating: 4.9,
      reviews: 124,
      author: 'Jane Smith',
      authorAvatar: 'JS',
      createdAt: new Date('2024-10-20'),
      status: 'active',
      earnings: 3234,
      sales: 66,
      tags: ['E-Commerce', 'Store', 'Shopping']
    },
    {
      id: 'tmp-3',
      name: 'Portfolio Showcase',
      description: 'Elegant portfolio template for designers and developers',
      category: 'portfolio',
      price: 0,
      type: 'free',
      preview: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800',
      downloads: 3421,
      rating: 4.6,
      reviews: 234,
      author: 'John Doe',
      authorAvatar: 'JD',
      createdAt: new Date('2024-09-10'),
      status: 'active',
      tags: ['Portfolio', 'Creative', 'Showcase']
    },
  ];

  // Revenue Data
  const revenueData: Revenue[] = [
    {
      templateId: 'tmp-1',
      templateName: 'Modern SaaS Landing',
      sales: 84,
      revenue: 2436,
      revenueShare: 1705,
      trend: 'up',
      trendValue: 12.5
    },
    {
      templateId: 'tmp-2',
      templateName: 'E-Commerce Store',
      sales: 66,
      revenueShare: 2264,
      revenue: 3234,
      trend: 'up',
      trendValue: 8.3
    },
  ];

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenueShare, 0);
  const totalSales = revenueData.reduce((sum, item) => sum + item.sales, 0);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'file' | 'preview') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'file') {
        setUploadForm({ ...uploadForm, file });
      } else {
        setUploadForm({ ...uploadForm, preview: file });
      }
    }
  };

  const handleUploadTemplate = () => {
    // Handle template upload
    console.log('Uploading template:', uploadForm);
    alert('Template uploaded successfully! It will be reviewed and published soon.');
    setShowUploadModal(false);
    setUploadForm({
      name: '',
      description: '',
      category: 'website',
      type: 'free',
      price: 0,
      tags: [],
      file: null,
      preview: null,
      shareRevenue: 70
    });
  };

  const handleAddTag = (tag: string) => {
    if (tag && !uploadForm.tags.includes(tag)) {
      setUploadForm({ ...uploadForm, tags: [...uploadForm.tags, tag] });
    }
  };

  const handleRemoveTag = (tag: string) => {
    setUploadForm({ ...uploadForm, tags: uploadForm.tags.filter(t => t !== tag) });
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2 text-slate-900">Template Marketplace</h1>
          <p className="text-slate-600">Browse, upload, and sell professional templates</p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl transition-all"
        >
          <Plus className="w-5 h-5" />
          Upload Template
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('browse')}
          className={`px-6 py-3 border-b-2 transition-all ${
            activeTab === 'browse'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Browse Templates
          </div>
        </button>
        <button
          onClick={() => setActiveTab('upload')}
          className={`px-6 py-3 border-b-2 transition-all ${
            activeTab === 'upload'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            My Uploads
          </div>
        </button>
        <button
          onClick={() => setActiveTab('revenue')}
          className={`px-6 py-3 border-b-2 transition-all ${
            activeTab === 'revenue'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Revenue Dashboard
          </div>
        </button>
      </div>

      {/* Browse Tab */}
      {activeTab === 'browse' && (
        <div>
          {/* Filters */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search templates..."
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-blue-500"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <select className="px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-blue-500">
              <option>All Prices</option>
              <option>Free</option>
              <option>Paid</option>
            </select>
          </div>

          {/* Templates Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {templates.map((template) => (
              <div key={template.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all group">
                <div className="relative aspect-video bg-slate-100 overflow-hidden">
                  <img
                    src={template.preview}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    {template.type === 'free' ? (
                      <span className="px-3 py-1 bg-green-600 text-white text-xs rounded-lg">
                        Free
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg">
                        ${template.price}
                      </span>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button className="p-3 bg-white rounded-lg hover:bg-slate-100 transition-colors">
                      <Eye className="w-5 h-5 text-slate-900" />
                    </button>
                    <button className="p-3 bg-white rounded-lg hover:bg-slate-100 transition-colors">
                      <Download className="w-5 h-5 text-slate-900" />
                    </button>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg text-slate-900">{template.name}</h3>
                    <button className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
                      <Heart className="w-5 h-5 text-slate-400" />
                    </button>
                  </div>
                  
                  <p className="text-sm text-slate-600 mb-3 line-clamp-2">{template.description}</p>

                  <div className="flex items-center gap-2 mb-3">
                    {template.tags.slice(0, 2).map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-slate-700">{template.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-600">
                        <Download className="w-4 h-4" />
                        {template.downloads}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">
                        {template.authorAvatar}
                      </div>
                      <span className="text-xs text-slate-600">{template.author}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* My Uploads Tab */}
      {activeTab === 'upload' && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="text-2xl text-slate-900 mb-1">3</div>
              <div className="text-sm text-slate-600">Total Templates</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Download className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-xs text-green-600">+18%</span>
              </div>
              <div className="text-2xl text-slate-900 mb-1">5,547</div>
              <div className="text-sm text-slate-600">Total Downloads</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="text-2xl text-slate-900 mb-1">4.8</div>
              <div className="text-sm text-slate-600">Avg Rating</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-xs text-green-600">+12%</span>
              </div>
              <div className="text-2xl text-slate-900 mb-1">${totalRevenue.toLocaleString()}</div>
              <div className="text-sm text-slate-600">Total Earnings</div>
            </div>
          </div>

          {/* My Templates List */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h3 className="text-xl text-slate-900">My Templates</h3>
            </div>
            <div className="divide-y divide-slate-200">
              {templates.filter(t => t.author === 'John Doe').map((template) => (
                <div key={template.id} className="p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <img
                      src={template.preview}
                      alt={template.name}
                      className="w-24 h-24 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-lg text-slate-900 mb-1">{template.name}</h4>
                          <p className="text-sm text-slate-600">{template.description}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-lg text-sm ${
                          template.status === 'active' ? 'bg-green-100 text-green-700' :
                          template.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {template.status.charAt(0).toUpperCase() + template.status.slice(1)}
                        </span>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-slate-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Download className="w-4 h-4" />
                          {template.downloads} downloads
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          {template.rating} ({template.reviews} reviews)
                        </div>
                        {template.type === 'paid' && (
                          <>
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              ${template.earnings} earned
                            </div>
                            <div className="flex items-center gap-1">
                              <ShoppingCart className="w-4 h-4" />
                              {template.sales} sales
                            </div>
                          </>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors text-sm">
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors text-sm">
                          <Eye className="w-4 h-4" />
                          Preview
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors text-sm">
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Revenue Dashboard Tab */}
      {activeTab === 'revenue' && (
        <div className="space-y-6">
          {/* Revenue Stats */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6" />
                </div>
                <ArrowUpRight className="w-5 h-5" />
              </div>
              <div className="text-3xl mb-1">${totalRevenue.toLocaleString()}</div>
              <div className="text-sm opacity-90">Total Revenue Share</div>
              <div className="mt-3 text-xs opacity-75">70% of sales</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-xs text-green-600">+15%</span>
              </div>
              <div className="text-2xl text-slate-900 mb-1">{totalSales}</div>
              <div className="text-sm text-slate-600">Total Sales</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-xs text-green-600">+24%</span>
              </div>
              <div className="text-2xl text-slate-900 mb-1">${(totalRevenue / totalSales).toFixed(2)}</div>
              <div className="text-sm text-slate-600">Avg per Sale</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <div className="text-2xl text-slate-900 mb-1">$892</div>
              <div className="text-sm text-slate-600">This Month</div>
            </div>
          </div>

          {/* Revenue Share Info */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Percent className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg text-slate-900 mb-2">Revenue Share Program</h3>
                <p className="text-slate-600 mb-3">
                  You earn <strong>70%</strong> of the revenue from each template sale. Devnora takes 30% to cover hosting, payment processing, and platform maintenance.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-600 rounded"></div>
                    <span className="text-sm text-slate-700">Your Share (70%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-slate-300 rounded"></div>
                    <span className="text-sm text-slate-700">Platform Fee (30%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Template Performance */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-xl text-slate-900">Template Performance</h3>
              <select className="px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900">
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
                <option>This Year</option>
                <option>All Time</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm text-slate-700">Template</th>
                    <th className="px-6 py-4 text-left text-sm text-slate-700">Sales</th>
                    <th className="px-6 py-4 text-left text-sm text-slate-700">Revenue</th>
                    <th className="px-6 py-4 text-left text-sm text-slate-700">Your Share</th>
                    <th className="px-6 py-4 text-left text-sm text-slate-700">Trend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {revenueData.map((item) => (
                    <tr key={item.templateId} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <div className="text-slate-900">{item.templateName}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-700">{item.sales}</td>
                      <td className="px-6 py-4 text-slate-700">${item.revenue.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <div className="text-slate-900">${item.revenueShare.toLocaleString()}</div>
                        <div className="text-xs text-slate-500">70% share</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`flex items-center gap-1 ${
                          item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {item.trend === 'up' ? (
                            <ArrowUpRight className="w-4 h-4" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4" />
                          )}
                          {item.trendValue}%
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payout Information */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h3 className="text-lg text-slate-900 mb-4">Payout Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-slate-700 mb-2">Available Balance</label>
                <div className="text-3xl text-slate-900 mb-1">${totalRevenue.toLocaleString()}</div>
                <p className="text-sm text-slate-600">Ready to withdraw</p>
              </div>
              <div>
                <label className="block text-sm text-slate-700 mb-2">Next Payout</label>
                <div className="text-3xl text-slate-900 mb-1">Dec 15, 2024</div>
                <p className="text-sm text-slate-600">Monthly automatic payout</p>
              </div>
            </div>
            <button className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl transition-all">
              Request Payout
            </button>
          </div>
        </div>
      )}

      {/* Upload Template Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="text-xl text-slate-900">Upload New Template</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Template Info */}
              <div className="space-y-4">
                <h4 className="text-lg text-slate-900">Template Information</h4>
                
                <div>
                  <label className="block text-sm text-slate-700 mb-2">Template Name *</label>
                  <input
                    type="text"
                    value={uploadForm.name}
                    onChange={(e) => setUploadForm({ ...uploadForm, name: e.target.value })}
                    placeholder="e.g., Modern SaaS Landing Page"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-700 mb-2">Description *</label>
                  <textarea
                    value={uploadForm.description}
                    onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                    rows={4}
                    placeholder="Describe your template, features, and use cases..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-700 mb-2">Category *</label>
                    <select
                      value={uploadForm.category}
                      onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-blue-500"
                    >
                      {categories.filter(c => c.id !== 'all').map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-slate-700 mb-2">Tags</label>
                    <input
                      type="text"
                      placeholder="Press Enter to add tags"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAddTag((e.target as HTMLInputElement).value);
                          (e.target as HTMLInputElement).value = '';
                        }
                      }}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {uploadForm.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {uploadForm.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm flex items-center gap-2">
                        {tag}
                        <button onClick={() => handleRemoveTag(tag)}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Pricing & Sharing */}
              <div className="space-y-4 pt-6 border-t border-slate-200">
                <h4 className="text-lg text-slate-900">Pricing & Sharing</h4>

                <div>
                  <label className="block text-sm text-slate-700 mb-3">Template Type *</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setUploadForm({ ...uploadForm, type: 'free', price: 0 })}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        uploadForm.type === 'free'
                          ? 'border-green-600 bg-green-50'
                          : 'border-slate-300 hover:border-slate-400'
                      }`}
                    >
                      <Share2 className={`w-8 h-8 mb-2 ${uploadForm.type === 'free' ? 'text-green-600' : 'text-slate-400'}`} />
                      <div className={`${uploadForm.type === 'free' ? 'text-green-900' : 'text-slate-900'}`}>Free Template</div>
                      <div className="text-xs text-slate-600 mt-1">Share with community</div>
                    </button>

                    <button
                      onClick={() => setUploadForm({ ...uploadForm, type: 'paid' })}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        uploadForm.type === 'paid'
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-slate-300 hover:border-slate-400'
                      }`}
                    >
                      <DollarSign className={`w-8 h-8 mb-2 ${uploadForm.type === 'paid' ? 'text-blue-600' : 'text-slate-400'}`} />
                      <div className={`${uploadForm.type === 'paid' ? 'text-blue-900' : 'text-slate-900'}`}>Paid Template</div>
                      <div className="text-xs text-slate-600 mt-1">Sell on marketplace</div>
                    </button>
                  </div>
                </div>

                {uploadForm.type === 'paid' && (
                  <>
                    <div>
                      <label className="block text-sm text-slate-700 mb-2">Price (USD) *</label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="number"
                          value={uploadForm.price}
                          onChange={(e) => setUploadForm({ ...uploadForm, price: parseFloat(e.target.value) })}
                          min="1"
                          placeholder="29"
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <Percent className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div className="flex-1">
                          <h5 className="text-sm text-slate-900 mb-1">Revenue Share: {uploadForm.shareRevenue}%</h5>
                          <p className="text-xs text-slate-600 mb-2">
                            You will receive ${(uploadForm.price * uploadForm.shareRevenue / 100).toFixed(2)} per sale
                          </p>
                          <div className="flex items-center gap-4 text-xs">
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 bg-blue-600 rounded"></div>
                              <span>Your Share: ${(uploadForm.price * uploadForm.shareRevenue / 100).toFixed(2)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 bg-slate-300 rounded"></div>
                              <span>Platform Fee: ${(uploadForm.price * (100 - uploadForm.shareRevenue) / 100).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* File Uploads */}
              <div className="space-y-4 pt-6 border-t border-slate-200">
                <h4 className="text-lg text-slate-900">Files</h4>

                <div>
                  <label className="block text-sm text-slate-700 mb-2">Template Files * (ZIP, HTML, CSS, JS)</label>
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept=".zip,.html,.htm"
                      onChange={(e) => handleFileUpload(e, 'file')}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                      {uploadForm.file ? (
                        <div className="text-slate-900">{uploadForm.file.name}</div>
                      ) : (
                        <>
                          <div className="text-slate-900 mb-1">Click to upload template files</div>
                          <div className="text-sm text-slate-600">ZIP file up to 50MB</div>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-700 mb-2">Preview Image * (PNG, JPG)</label>
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'preview')}
                      className="hidden"
                      id="preview-upload"
                    />
                    <label htmlFor="preview-upload" className="cursor-pointer">
                      <Image className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                      {uploadForm.preview ? (
                        <div className="text-slate-900">{uploadForm.preview.name}</div>
                      ) : (
                        <>
                          <div className="text-slate-900 mb-1">Click to upload preview image</div>
                          <div className="text-sm text-slate-600">PNG or JPG up to 5MB</div>
                        </>
                      )}
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 flex gap-3 sticky bottom-0 bg-white">
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUploadTemplate}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Upload className="w-5 h-5" />
                Upload Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
