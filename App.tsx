
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { EmailListsView } from './components/EmailListsView';
import { CampaignsView } from './components/CampaignsView';
import { ViewType } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>(ViewType.DASHBOARD);

  return (
    <div className="flex h-screen bg-[#050505] text-zinc-100 overflow-hidden selection:bg-blue-500/30">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      
      <main className="flex-1 relative flex flex-col h-full overflow-hidden">
        {activeView === ViewType.DASHBOARD && <DashboardView />}
        {activeView === ViewType.EMAIL_LISTS && <EmailListsView />}
        {activeView === ViewType.CAMPAIGNS && <CampaignsView />}
        {(activeView === ViewType.ACCOUNTS || activeView === ViewType.ANALYTICS) && (
          <div className="flex-1 flex items-center justify-center text-zinc-500">
            <div className="text-center">
              <svg className="w-12 h-12 mx-auto mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h2 className="text-xl font-bold text-zinc-400">Section Under Development</h2>
              <p className="text-sm mt-2">This feature is part of the next sprint release.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
