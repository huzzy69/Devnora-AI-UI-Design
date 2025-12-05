import React from 'react';
import { Mail, MessageSquare, Phone, MapPin } from 'lucide-react';
import PublicNavbar from '../../components/public/PublicNavbar';
import PublicFooter from '../../components/public/PublicFooter';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
      <PublicNavbar />
      <section className="px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              Get in Touch
            </h1>
            <p className="text-xl text-slate-300">We'd love to hear from you</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {[
                { icon: Mail, label: 'Email', value: 'support@devnora.com' },
                { icon: MessageSquare, label: 'Live Chat', value: 'Available 24/7' },
                { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
                { icon: MapPin, label: 'Office', value: 'San Francisco, CA' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-slate-900 border border-slate-800 rounded-xl">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">{item.label}</div>
                    <div className="text-white">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <form className="space-y-4">
              <input type="text" placeholder="Name" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white" />
              <input type="email" placeholder="Email" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white" />
              <textarea placeholder="Message" rows={5} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white resize-none"></textarea>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl">Send Message</button>
            </form>
          </div>
        </div>
      </section>
      <PublicFooter />
    </div>
  );
}