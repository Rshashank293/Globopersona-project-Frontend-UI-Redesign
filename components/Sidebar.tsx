
import React from 'react';
import { ViewType } from '../types';

interface SidebarProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const navItems = [
    { id: ViewType.DASHBOARD, label: 'Dashboard', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )},
    { id: ViewType.EMAIL_LISTS, label: 'Contacts', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )},
    { id: ViewType.CAMPAIGNS, label: 'Campaigns', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    )},
    { id: ViewType.ACCOUNTS, label: 'Accounts', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )},
    { id: ViewType.ANALYTICS, label: 'Analytics', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )},
  ];

  return (
    <aside className="w-20 lg:w-64 border-r border-white/[0.05] flex flex-col py-10 px-4 bg-[#080809] z-50">
      <nav className="flex-1 space-y-2">
        <p className="px-4 text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-6 hidden lg:block">Architecture</p>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full group flex items-center justify-center lg:justify-start space-x-0 lg:space-x-4 px-0 lg:px-4 py-3.5 rounded-2xl transition-all duration-300 relative ${
              activeView === item.id 
                ? 'bg-white/[0.06] text-white shadow-sm ring-1 ring-white/[0.05]' 
                : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.02]'
            }`}
            title={item.label}
          >
            {activeView === item.id && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-full hidden lg:block"></div>
            )}
            <div className={`transition-all duration-300 ${activeView === item.id ? 'text-white' : 'text-zinc-600 group-hover:text-zinc-400 group-hover:scale-110'}`}>
              {item.icon}
            </div>
            <span className="font-bold text-sm leading-tight hidden lg:block">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto space-y-8 pt-8 border-t border-white/[0.03]">
        <div className="px-2 hidden lg:block">
           <div className="p-5 bg-zinc-900/30 rounded-3xl border border-white/[0.03] space-y-4">
              <div className="flex items-center justify-between">
                 <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Compute Power</span>
                 <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
              </div>
              <div className="space-y-1.5">
                 <div className="flex justify-between text-[10px] font-bold text-zinc-500">
                    <span>Usage</span>
                    <span>74%</span>
                 </div>
                 <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                   <div className="h-full bg-white transition-all duration-1000 shadow-[0_0_10px_rgba(255,255,255,0.3)]" style={{ width: '74%' }}></div>
                 </div>
              </div>
           </div>
        </div>
        
        <div className="flex items-center justify-center lg:justify-start space-x-0 lg:space-x-3 px-0 lg:px-4 group cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-900 flex items-center justify-center text-xs font-black ring-2 ring-zinc-950 shadow-2xl transition-transform group-hover:scale-105 border border-white/10">
             GA
          </div>
          <div className="flex-1 min-w-0 hidden lg:block">
            <p className="text-xs font-extrabold text-white truncate">Global Admin</p>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Enterprise</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
