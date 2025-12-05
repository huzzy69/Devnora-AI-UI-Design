import React, { useState } from 'react';
import { Rocket, Globe, CheckCircle, XCircle, Clock, MoreVertical, ExternalLink, RefreshCw } from 'lucide-react';

export default function Deployments() {
  const deployments = [
    {
      name: 'SaaS Dashboard v2.1',
      url: 'saas-dashboard.devnora.app',
      status: 'success',
      lastDeploy: '2 hours ago',
      commits: 47
    },
    {
      name: 'E-commerce Store',
      url: 'store.devnora.app',
      status: 'building',
      lastDeploy: 'In progress',
      commits: 23
    },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl mb-2 text-slate-900">Deployments</h1>
          <p className="text-slate-600">Manage and monitor your live deployments</p>
        </div>
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl flex items-center gap-2">
          <Rocket className="w-5 h-5" />
          Deploy New Project
        </button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Deployments', value: '47', icon: Rocket, color: 'blue' },
          { label: 'Active Sites', value: '23', icon: Globe, color: 'green' },
          { label: 'Building', value: '2', icon: Clock, color: 'orange' },
          { label: 'Failed', value: '1', icon: XCircle, color: 'red' },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-6">
            <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
            </div>
            <div className={`text-3xl mb-1 text-${stat.color}-600`}>{stat.value}</div>
            <div className="text-sm text-slate-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Deployments List */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl text-slate-900">Recent Deployments</h2>
        </div>
        <div className="divide-y divide-slate-200">
          {deployments.map((deployment, i) => (
            <div key={i} className="p-6 hover:bg-slate-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      deployment.status === 'success'
                        ? 'bg-green-500'
                        : deployment.status === 'building'
                        ? 'bg-orange-500 animate-pulse'
                        : 'bg-red-500'
                    }`}
                  ></div>
                  <div>
                    <h3 className="text-lg text-slate-900 mb-1">{deployment.name}</h3>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <a
                        href={`https://${deployment.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-500"
                      >
                        {deployment.url}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <span>•</span>
                      <span>{deployment.commits} commits</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm ${
                        deployment.status === 'success'
                          ? 'bg-green-100 text-green-700'
                          : deployment.status === 'building'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {deployment.status === 'success' && <CheckCircle className="w-4 h-4" />}
                      {deployment.status === 'building' && <Clock className="w-4 h-4" />}
                      {deployment.status === 'failed' && <XCircle className="w-4 h-4" />}
                      {deployment.status === 'success' && 'Live'}
                      {deployment.status === 'building' && 'Building'}
                      {deployment.status === 'failed' && 'Failed'}
                    </div>
                    <div className="text-sm text-slate-600 mt-1">{deployment.lastDeploy}</div>
                  </div>
                  <button className="p-2 hover:bg-slate-200 rounded-lg">
                    <MoreVertical className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}