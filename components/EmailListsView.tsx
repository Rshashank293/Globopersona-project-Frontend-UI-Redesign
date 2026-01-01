
import React from 'react';

export const EmailListsView: React.FC = () => {
  const lists = [
    { name: 'Newsletter Subscribers', count: 12847, quality: 92, openRate: 28.4, status: 'active' },
    { name: 'Cold Lead List - Q4', count: 5432, quality: 40, openRate: 12.1, status: 'poor' },
    { name: 'Enterprise Contacts', count: 24, quality: 100, openRate: 74.2, status: 'active' },
    { name: 'Import_Final_Test', count: 74, quality: 65, openRate: 15.5, status: 'active' },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-[#050505] p-6 lg:p-10">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Email Segments</h2>
          <p className="text-xs text-zinc-500 font-bold uppercase tracking-[0.2em] mt-2">Manage & Optimize High-Quality Leads</p>
        </div>
        <button className="px-6 py-3 bg-white text-black font-black text-xs uppercase tracking-widest rounded-xl hover:bg-zinc-200 transition-all flex items-center space-x-2 shadow-xl shadow-white/5">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          <span>Create Segment</span>
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {lists.map((list, i) => (
          <div key={i} className="bg-zinc-900/40 border border-white/[0.04] rounded-[36px] overflow-hidden hover:border-white/[0.1] transition-all group flex flex-col shadow-2xl">
            <div className={`h-1.5 w-full ${list.status === 'active' ? 'bg-blue-500' : 'bg-rose-500'}`}></div>
            <div className="p-8 flex-1">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-white font-bold text-xl leading-tight mb-2 group-hover:text-blue-400 transition-colors">{list.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Database ID: #S{100 + i}</span>
                  </div>
                </div>
                <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border shadow-sm ${
                  list.status === 'active' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5' : 'text-rose-400 border-rose-500/20 bg-rose-500/5'
                }`}>
                  {list.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-zinc-950 border border-white/[0.03] rounded-2xl">
                  <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mb-1">Total Reach</p>
                  <p className="text-white font-extrabold text-2xl tracking-tight">{list.count.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-zinc-950 border border-white/[0.03] rounded-2xl">
                  <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mb-1">List Health</p>
                  <p className={`font-extrabold text-2xl tracking-tight ${list.quality > 80 ? 'text-emerald-400' : list.quality > 50 ? 'text-blue-400' : 'text-rose-400'}`}>
                    {list.quality}%
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-white/[0.03]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-zinc-500 font-bold uppercase tracking-widest">Active Engagement</span>
                  <span className="text-xs text-white font-extrabold">{list.openRate}%</span>
                </div>
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden shadow-inner">
                  <div className={`h-full transition-all duration-1000 ${list.openRate > 25 ? 'bg-blue-500' : 'bg-zinc-600'}`} style={{ width: `${list.openRate}%` }}></div>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-zinc-950 flex space-x-3 border-t border-white/[0.03]">
              <button className="flex-1 py-3 bg-zinc-900 border border-white/[0.05] rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all">Details</button>
              <button className="px-4 py-3 bg-zinc-900 border border-white/[0.05] rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
