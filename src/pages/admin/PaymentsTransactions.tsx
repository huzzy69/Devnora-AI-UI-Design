import React from 'react';
import { DollarSign, CreditCard, TrendingUp, Download } from 'lucide-react';

export default function PaymentsTransactions() {
  const transactions = [
    {
      id: 'TXN-001234',
      user: 'John Doe',
      email: 'john@example.com',
      amount: '$79.00',
      plan: 'Professional',
      status: 'Success',
      date: '2024-02-01'
    },
    {
      id: 'TXN-001235',
      user: 'Sarah Smith',
      email: 'sarah@example.com',
      amount: '$299.00',
      plan: 'Enterprise',
      status: 'Success',
      date: '2024-02-01'
    },
    {
      id: 'TXN-001236',
      user: 'Mike Johnson',
      email: 'mike@example.com',
      amount: '$29.00',
      plan: 'Starter',
      status: 'Failed',
      date: '2024-02-01'
    },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl mb-2 text-slate-900">Payments & Transactions</h1>
          <p className="text-slate-600">Monitor all payment transactions</p>
        </div>
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl flex items-center gap-2">
          <Download className="w-5 h-5" />
          Export Report
        </button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Revenue', value: '$347,340', icon: DollarSign, color: 'green' },
          { label: 'Transactions', value: '4,523', icon: CreditCard, color: 'blue' },
          { label: 'Success Rate', value: '98.2%', icon: TrendingUp, color: 'purple' },
          { label: 'Avg. Transaction', value: '$76.78', icon: DollarSign, color: 'orange' },
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

      {/* Transactions Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm text-slate-700">Transaction ID</th>
                <th className="text-left px-6 py-4 text-sm text-slate-700">User</th>
                <th className="text-left px-6 py-4 text-sm text-slate-700">Plan</th>
                <th className="text-left px-6 py-4 text-sm text-slate-700">Amount</th>
                <th className="text-left px-6 py-4 text-sm text-slate-700">Status</th>
                <th className="text-left px-6 py-4 text-sm text-slate-700">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {transactions.map((txn, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-mono text-sm text-slate-900">{txn.id}</td>
                  <td className="px-6 py-4">
                    <div className="text-slate-900">{txn.user}</div>
                    <div className="text-sm text-slate-600">{txn.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-lg">
                      {txn.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-900">{txn.amount}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-sm rounded-lg ${
                        txn.status === 'Success'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {txn.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{txn.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
