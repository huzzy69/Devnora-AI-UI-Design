import React from 'react';
import { LucideIcon } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: LucideIcon;
  children?: React.ReactNode;
}

export default function PlaceholderPage({ title, description, icon: Icon, children }: PlaceholderPageProps) {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl text-white mb-2">{title}</h1>
        <p className="text-slate-400">{description}</p>
      </div>
      
      {children || (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Icon className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl text-white mb-4">{title}</h2>
          <p className="text-slate-400 max-w-md mx-auto">{description}</p>
        </div>
      )}
    </div>
  );
}
