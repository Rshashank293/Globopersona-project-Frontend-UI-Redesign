
import React from 'react';
import { ViewType } from '../types.ts';

interface SidebarProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const coreNav = [
    { id: ViewType.DASHBOARD, label: 'Dashboard', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
    )},
    { id: ViewType.EMAIL_LISTS, label: 'Contacts', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
    )},
    { id: ViewType.CAMPAIGNS, label: 'Campaigns', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
    )},
  ];

  const aiNav = [
    { id: ViewType.INTELLIGENCE, label: 'Research AI', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
    )},
    { id: ViewType.CREATIVE, label: 'Creative Gen', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
    )},
    { id: ViewType.VOICE, label: 'Voice Link', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
    )},
  ];

  return (
    <aside className="w-20 lg:w-64 border-r border-white/[0.05] flex flex-col py-10 px-4 bg-[#080809] z-50">
      <nav className="flex-1 space-y-8 overflow-y-auto no-scrollbar">
        <div>
          <p className="px-4 text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-4 hidden lg:block">Architecture</p>
          <div className="space-y-1">
            {coreNav.map((item) => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full group flex items-center justify-center lg:justify-start space-x-0 lg:space-x-4 px-0 lg:px-4 py-3 rounded-xl transition-all relative ${
                  activeView === item.id ? 'bg-white/[0.06] text-white' : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.02]'
                }`}
              >
                <div className={activeView === item.id ? 'text-white' : 'text-zinc-600'}>{item.icon}</div>
                <span className="font-bold text-sm hidden lg:block">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="px-4 text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-4 hidden lg:block">Intelligence</p>
          <div className="space-y-1">
            {aiNav.map((item) => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full group flex items-center justify-center lg:justify-start space-x-0 lg:space-x-4 px-0 lg:px-4 py-3 rounded-xl transition-all relative ${
                  activeView === item.id ? 'bg-blue-500/10 text-blue-400' : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.02]'
                }`}
              >
                <div className={activeView === item.id ? 'text-blue-400' : 'text-zinc-600'}>{item.icon}</div>
                <span className="font-bold text-sm hidden lg:block">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="mt-auto space-y-6 pt-6 border-t border-white/[0.03]">
        <div className="flex items-center justify-center lg:justify-start space-x-0 lg:space-x-3 px-0 lg:px-4 group cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-900 flex items-center justify-center text-xs font-black ring-1 ring-white/10 shadow-2xl transition-transform group-hover:scale-105">GA</div>
          <div className="flex-1 min-w-0 hidden lg:block">
            <p className="text-xs font-extrabold text-white truncate">Global Admin</p>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Enterprise</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
