import React from 'react';
import { ShoppingBag, TrendingUp, Package, DollarSign } from 'lucide-react';

export default function MarketplaceManagement() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2 text-slate-900">Marketplace Management</h1>
        <p className="text-slate-600">Manage marketplace items and transactions</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Items', value: '456', icon: Package, color: 'blue' },
          { label: 'Total Sales', value: '$12,340', icon: DollarSign, color: 'green' },
          { label: 'Active Sellers', value: '89', icon: ShoppingBag, color: 'purple' },
          { label: 'Growth', value: '+23%', icon: TrendingUp, color: 'orange' },
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

      <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
        <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <h3 className="text-xl text-slate-900 mb-2">Marketplace Management</h3>
        <p className="text-slate-600">Manage marketplace features and listings</p>
      </div>
    </div>
  );
}
