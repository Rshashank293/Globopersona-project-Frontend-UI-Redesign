
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar.tsx';
import { DashboardView } from './components/DashboardView.tsx';
import { EmailListsView } from './components/EmailListsView.tsx';
import { CampaignsView } from './components/CampaignsView.tsx';
import { ChatView } from './components/ChatView.tsx';
import { ImageGenView } from './components/ImageGenView.tsx';
import { LiveVoiceView } from './components/LiveVoiceView.tsx';
import { ViewType } from './types.ts';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>(ViewType.DASHBOARD);

  return (
    <div className="flex h-screen bg-[#050505] text-zinc-100 overflow-hidden selection:bg-blue-500/30">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      
      <main className="flex-1 relative flex flex-col h-full overflow-hidden">
        {activeView === ViewType.DASHBOARD && <DashboardView />}
        {activeView === ViewType.EMAIL_LISTS && <EmailListsView />}
        {activeView === ViewType.CAMPAIGNS && <CampaignsView />}
        {activeView === ViewType.INTELLIGENCE && <ChatView />}
        {activeView === ViewType.CREATIVE && <ImageGenView />}
        {activeView === ViewType.VOICE && <LiveVoiceView />}
        
        {(activeView === ViewType.ACCOUNTS || activeView === ViewType.ANALYTICS) && (
          <div className="flex-1 flex items-center justify-center text-zinc-500">
            <div className="text-center">
              <svg className="w-12 h-12 mx-auto mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h2 className="text-xl font-bold text-zinc-400">Section Under Development</h2>
              <p className="text-sm mt-2">Enterprise metrics will be populated upon campaign completion.</p>
            </div>
          </div>
        )}

        {/* Global Demo Status Badge */}
        <div className="fixed bottom-6 right-6 z-[100] px-4 py-2 bg-zinc-900/80 backdrop-blur-md border border-white/10 rounded-full shadow-2xl flex items-center space-x-3 pointer-events-none select-none">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
          <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">Production Build v1.0.4</span>
        </div>
      </main>
    </div>
  );
};

export default App;
