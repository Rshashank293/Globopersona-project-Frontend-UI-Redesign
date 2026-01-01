
import React from 'react';

export const DashboardView: React.FC = () => {
  const stats = [
    { label: 'Active Subscribers', value: '12,847', trend: '+12%', sub: '92% of target', icon: 'users' },
    { label: 'Avg. Open Rate', value: '28.4%', trend: '+2.1%', sub: 'Last 30 days', icon: 'mail' },
    { label: 'Revenue Generated', value: '$24,847', trend: '+$1,247', sub: 'From campaigns', icon: 'dollar' },
    { label: 'Click Rate', value: '2.3%', trend: '-0.5%', sub: 'Avg per campaign', icon: 'cursor' }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-[#050505] p-6 lg:p-10">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Overview</h2>
          <div className="flex items-center space-x-2 mt-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.5)]"></div>
            <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Global Persona • Operational</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-5 py-2.5 bg-zinc-900 border border-white/[0.05] rounded-xl text-xs font-bold text-zinc-300 hover:text-white transition-all">
            Export Report
          </button>
          <button className="px-5 py-2.5 bg-white text-black rounded-xl text-xs font-bold shadow-lg shadow-white/5 hover:bg-zinc-200 transition-all">
            New Campaign
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className="bg-zinc-900/40 border border-white/[0.04] p-6 rounded-[28px] hover:border-white/[0.1] transition-all group shadow-xl relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-white/[0.03] rounded-2xl border border-white/[0.05] text-zinc-400 group-hover:text-blue-400 transition-colors">
                {stat.icon === 'users' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
                {stat.icon === 'mail' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                {stat.icon === 'dollar' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                {stat.icon === 'cursor' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" /></svg>}
              </div>
              <span className={`text-[10px] font-black px-2 py-1 rounded-lg border ${stat.trend.startsWith('+') ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-rose-400 bg-rose-500/10 border-rose-500/20'}`}>
                {stat.trend}
              </span>
            </div>
            <h3 className="text-zinc-500 text-[11px] font-black uppercase tracking-[0.15em] mb-1">{stat.label}</h3>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold text-white tracking-tight">{stat.value}</span>
            </div>
            <p className="text-[10px] text-zinc-600 mt-3 font-semibold">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-zinc-900/20 border border-white/[0.04] rounded-[36px] p-8 min-h-[400px] flex flex-col justify-center items-center text-center shimmer">
          <div className="w-20 h-20 bg-white/[0.02] rounded-[24px] flex items-center justify-center mb-6 border border-white/[0.05]">
            <svg className="w-10 h-10 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
          </div>
          <h3 className="text-white font-bold text-xl mb-3 tracking-tight">Engagement Visualization</h3>
          <p className="text-sm text-zinc-500 max-w-sm mx-auto leading-relaxed">Gathering campaign telemetry... Dynamic charts will appear as soon as the first broadcast completes.</p>
        </div>

        <div className="bg-zinc-900/40 border border-white/[0.04] rounded-[36px] p-8 flex flex-col">
          <h3 className="text-white font-bold text-lg mb-6 tracking-tight">Quick Actions</h3>
          <div className="space-y-3">
            {[
              { label: 'Import Contacts', icon: 'M12 4v16m8-8H4' },
              { label: 'A/B Test Builder', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
              { label: 'Template Gallery', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1 1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z' }
            ].map((action, i) => (
              <button key={i} className="w-full flex items-center justify-between p-4 bg-zinc-950/50 hover:bg-zinc-900 border border-white/[0.03] rounded-2xl transition-all group">
                <div className="flex items-center space-x-3">
                  <svg className="w-4 h-4 text-zinc-500 group-hover:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={action.icon} />
                  </svg>
                  <span className="text-sm font-bold text-zinc-300 group-hover:text-white">{action.label}</span>
                </div>
                <svg className="w-4 h-4 text-zinc-700 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
