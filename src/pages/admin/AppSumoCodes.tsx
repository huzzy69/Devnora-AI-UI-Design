import React from 'react';
import { Tag, Plus, Check, X } from 'lucide-react';

export default function AppSumoCodes() {
  const codes = [
    { code: 'APPSUMO-DEAL-001', plan: 'Lifetime Pro', status: 'Active', redeemed: '2024-01-15' },
    { code: 'APPSUMO-DEAL-002', plan: 'Lifetime Pro', status: 'Active', redeemed: '2024-01-16' },
    { code: 'APPSUMO-DEAL-003', plan: 'Lifetime Pro', status: 'Expired', redeemed: '2024-01-17' },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl mb-2 text-slate-900">AppSumo Codes</h1>
          <p className="text-slate-600">Manage AppSumo deal codes and redemptions</p>
        </div>
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Generate Codes
        </button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Codes', value: '500', color: 'blue' },
          { label: 'Redeemed', value: '234', color: 'green' },
          { label: 'Active', value: '266', color: 'purple' },
          { label: 'Expired', value: '18', color: 'red' },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-6">
            <div className={`text-3xl mb-1 text-${stat.color}-600`}>{stat.value}</div>
            <div className="text-sm text-slate-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Codes Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl text-slate-900">Recent Redemptions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm text-slate-700">Code</th>
                <th className="text-left px-6 py-4 text-sm text-slate-700">Plan</th>
                <th className="text-left px-6 py-4 text-sm text-slate-700">Status</th>
                <th className="text-left px-6 py-4 text-sm text-slate-700">Redeemed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {codes.map((code, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-mono text-sm text-slate-900">{code.code}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-lg">
                      {code.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-sm rounded-lg flex items-center gap-2 w-fit ${
                        code.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {code.status === 'Active' ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                      {code.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{code.redeemed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
