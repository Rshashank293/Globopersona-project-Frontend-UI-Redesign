
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

type CampaignState = 'LIST' | 'CREATE';

export const CampaignsView: React.FC = () => {
  const [viewState, setViewState] = useState<CampaignState>('LIST');
  const [step, setStep] = useState(1);
  const [campaignName, setCampaignName] = useState('');
  const [isAIEnabled, setIsAIEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generatedPreview, setGeneratedPreview] = useState<string | null>(null);

  const campaigns = [
    { id: '1', name: 'Product Launch Q1', status: 'Running', type: 'Neural', open: '32.4%', sent: '12.4k' },
    { id: '2', name: 'Re-engagement Sequence', status: 'Draft', type: 'Static', open: '--', sent: '0' },
    { id: '3', name: 'Holiday Special 2024', status: 'Completed', type: 'Neural', open: '41.2%', sent: '45.0k' },
  ];

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const runAIEngine = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a high-conversion, professional email for an outreach campaign titled "${campaignName}". Use a compelling subject line and a clear call to action.`
      });
      setGeneratedPreview(response.text || "Failed to generate preview.");
      nextStep();
    } catch (e) {
      console.error(e);
      alert("AI engine connection interrupted.");
    } finally {
      setLoading(false);
    }
  };

  if (viewState === 'LIST') {
    return (
      <div className="flex-1 overflow-y-auto bg-[#050505] p-6 lg:p-10 animate-in fade-in duration-500">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
          <div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Campaigns</h2>
            <p className="text-xs text-zinc-500 font-bold uppercase tracking-[0.2em] mt-2">Track & Deploy Marketing Broadcasts</p>
          </div>
          <button 
            onClick={() => setViewState('CREATE')}
            className="px-6 py-3 bg-white text-black font-black text-xs uppercase tracking-widest rounded-xl hover:bg-zinc-200 transition-all flex items-center space-x-2 shadow-xl shadow-white/5"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            <span>Create New Campaign</span>
          </button>
        </header>

        <div className="bg-zinc-900/20 border border-white/[0.04] rounded-[36px] overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/[0.03] bg-zinc-950/30">
                <th className="px-8 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Campaign Identity</th>
                <th className="px-8 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Strategy</th>
                <th className="px-8 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Sent</th>
                <th className="px-8 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Engagement</th>
                <th className="px-8 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {campaigns.map((c) => (
                <tr key={c.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="px-8 py-6">
                    <p className="text-white font-bold text-sm tracking-tight">{c.name}</p>
                    <p className="text-[10px] text-zinc-600 font-bold mt-1">ID: #C00{c.id}</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                      c.status === 'Running' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5' : 
                      c.status === 'Draft' ? 'text-zinc-500 border-zinc-700 bg-zinc-800/10' : 
                      'text-blue-400 border-blue-500/20 bg-blue-500/5'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`text-[10px] font-bold ${c.type === 'Neural' ? 'text-blue-400' : 'text-zinc-500'}`}>{c.type}</span>
                  </td>
                  <td className="px-8 py-6 text-sm font-bold text-zinc-400">{c.sent}</td>
                  <td className="px-8 py-6 text-sm font-black text-white">{c.open}</td>
                  <td className="px-8 py-6">
                    <button className="text-zinc-600 hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#050505] overflow-hidden">
      <header className="px-8 py-8 border-b border-white/[0.03] flex justify-between items-center bg-zinc-950/50 backdrop-blur-xl sticky top-0 z-20">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Campaign Studio</h2>
          <div className="flex items-center space-x-3 mt-2">
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.25em]">Workflow: 0{step} / 03</span>
            <div className="h-1 w-24 bg-zinc-800 rounded-full overflow-hidden">
               <div className="h-full bg-blue-500 transition-all duration-700" style={{ width: `${(step / 3) * 100}%` }}></div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
           <button onClick={() => setViewState('LIST')} className="p-2 text-zinc-500 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
           </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 lg:p-12 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.03),transparent_60%)] pointer-events-none"></div>
        
        <div className="max-w-3xl mx-auto py-10">
          {step === 1 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="space-y-2 text-center mb-12">
                <h3 className="text-3xl font-extrabold text-white tracking-tight">Initialize Broadcast.</h3>
                <p className="text-zinc-500 text-sm">Define the scope and segment for this campaign.</p>
              </div>

              <div className="bg-zinc-900/40 border border-white/[0.05] rounded-[40px] p-10 shadow-2xl backdrop-blur-sm">
                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-500 px-1">Campaign Title</label>
                    <input 
                      type="text"
                      value={campaignName}
                      onChange={(e) => setCampaignName(e.target.value)}
                      placeholder="e.g., Enterprise Winter 2024 Outreach"
                      className="w-full bg-zinc-950 border border-white/[0.05] rounded-2xl p-6 text-white font-semibold text-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all placeholder:text-zinc-800 shadow-inner"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-500 px-1">Target Segment</label>
                    <div className="relative group">
                      <select className="w-full bg-zinc-950 border border-white/[0.05] rounded-2xl p-6 text-white font-semibold outline-none appearance-none cursor-pointer group-focus-within:border-blue-500/50">
                        <option>Newsletter Subscribers</option>
                        <option>Enterprise Tech Leads</option>
                        <option>Inbound Inquiries</option>
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center pt-8">
                <button 
                  onClick={nextStep}
                  disabled={!campaignName}
                  className="px-12 py-5 bg-white hover:bg-zinc-200 disabled:bg-zinc-900 disabled:text-zinc-700 text-black font-black text-xs uppercase tracking-[0.3em] rounded-[24px] transition-all shadow-2xl active:scale-95"
                >
                  Configure Strategy
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="space-y-2 text-center mb-12">
                <h3 className="text-3xl font-extrabold text-white tracking-tight">Synthesis Model.</h3>
                <p className="text-zinc-500 text-sm">Select your content generation methodology.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <button 
                  onClick={() => { setIsAIEnabled(false); nextStep(); }}
                  className="group relative p-10 bg-zinc-900/40 border border-white/[0.05] rounded-[48px] text-left hover:border-white/[0.2] transition-all overflow-hidden"
                >
                  <div className="w-16 h-16 bg-zinc-950 rounded-[28px] flex items-center justify-center mb-8 border border-white/[0.03] text-zinc-600 group-hover:text-white transition-colors">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  </div>
                  <h4 className="text-white font-extrabold text-2xl mb-3 tracking-tight">Standard Template</h4>
                  <p className="text-zinc-500 text-sm leading-relaxed font-medium">Use pre-defined static layouts. Reliable and compliant.</p>
                </button>

                <button 
                  onClick={() => setIsAIEnabled(true)}
                  className={`group relative p-10 rounded-[48px] text-left transition-all overflow-hidden border-2 ${
                    isAIEnabled 
                      ? 'bg-blue-600 border-white shadow-[0_0_60px_rgba(59,130,246,0.25)]' 
                      : 'bg-zinc-900/40 border-white/[0.05] hover:border-white/[0.2]'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-[28px] flex items-center justify-center mb-8 border transition-all ${
                    isAIEnabled ? 'bg-white text-blue-600' : 'bg-zinc-950 border-white/[0.03] text-zinc-600 group-hover:text-blue-400'
                  }`}>
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <h4 className={`font-extrabold text-2xl mb-3 tracking-tight ${isAIEnabled ? 'text-white' : 'text-white group-hover:text-blue-400'}`}>Neural synthesis</h4>
                  <p className={`text-sm leading-relaxed font-medium ${isAIEnabled ? 'text-white/80' : 'text-zinc-500'}`}>1:1 targeted personalization via AI nodes.</p>
                  <div className="absolute top-8 right-8">
                     <span className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest ${isAIEnabled ? 'bg-white text-blue-600' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>Enterprise AI</span>
                  </div>
                </button>
              </div>

              {isAIEnabled && (
                <div className="mt-12 p-10 bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-500/30 rounded-[48px] animate-in zoom-in-95 duration-500 shadow-2xl relative overflow-hidden group shimmer">
                  <div className="relative z-10">
                    <div className="flex items-center space-x-5 mb-8">
                      <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                        <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" /></svg>
                      </div>
                      <div>
                        <p className="text-white font-extrabold text-lg tracking-tight">AI Core Connected</p>
                        <p className="text-blue-400 text-[10px] uppercase font-black tracking-[0.2em]">Ready for Generation</p>
                      </div>
                    </div>
                    <button 
                      onClick={runAIEngine}
                      disabled={loading}
                      className="w-full py-5 bg-white text-blue-600 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-zinc-100 transition-all flex items-center justify-center space-x-3 active:scale-95 shadow-xl"
                    >
                      {loading ? <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div> : <span>Preview Synthesis</span>}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
               <div className="p-10 bg-zinc-900/40 border border-white/[0.05] rounded-[48px] shadow-2xl backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-10">
                    <h3 className="text-2xl font-extrabold text-white tracking-tight">Strategy Finalization</h3>
                    <div className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-500/5 text-emerald-400 border border-emerald-500/20 rounded-full">
                       <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                       <span className="text-[9px] font-black uppercase tracking-widest">Logic Validated</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    {[
                      { l: 'Title', v: campaignName },
                      { l: 'Model', v: isAIEnabled ? 'NEURAL_GEN_V3' : 'LEGACY_STATIC', c: 'text-blue-400' },
                      { l: 'Recipients', v: '12,847' },
                      { l: 'Est. Delivery', v: '99.8%' }
                    ].map((item, i) => (
                      <div key={i} className="p-5 bg-zinc-950/50 border border-white/[0.03] rounded-2xl">
                        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">{item.l}</p>
                        <p className={`font-bold text-sm tracking-tight ${item.c || 'text-white'}`}>{item.v}</p>
                      </div>
                    ))}
                  </div>

                  {generatedPreview && (
                    <div className="space-y-4">
                      <label className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-500 px-1">Synthesis Output Preview</label>
                      <div className="p-8 bg-zinc-950 border border-white/[0.05] rounded-[32px] text-zinc-300 text-base leading-[1.8] font-medium italic shadow-inner relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/50"></div>
                        {generatedPreview}
                      </div>
                    </div>
                  )}
               </div>

               <div className="flex flex-col sm:flex-row justify-between items-center pt-10 gap-6">
                 <button onClick={prevStep} className="text-zinc-500 font-bold hover:text-white transition-colors uppercase tracking-widest text-[11px]">← Previous Step</button>
                 <button 
                  onClick={() => setViewState('LIST')}
                  className="w-full sm:w-auto px-16 py-6 bg-white hover:bg-zinc-200 text-black font-black text-sm uppercase tracking-[0.4em] rounded-[32px] transition-all shadow-[0_20px_50px_rgba(255,255,255,0.1)] active:scale-95"
                 >
                   Initiate Sequence
                 </button>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
