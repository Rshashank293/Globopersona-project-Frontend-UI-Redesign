
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { GeneratedImage } from '../types.ts';

export const ImageGenView: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [selectedRatio, setSelectedRatio] = useState<'1:1' | '16:9' | '9:16'>('1:1');

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: selectedRatio,
          },
        },
      });

      let imageUrl = '';
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }

      if (imageUrl) {
        const newImg: GeneratedImage = {
          id: Date.now().toString(),
          url: imageUrl,
          prompt,
          timestamp: new Date(),
        };
        setImages(prev => [newImg, ...prev]);
        setPrompt('');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex h-full bg-[#050505] overflow-hidden">
      {/* Settings Panel */}
      <div className="w-80 border-r border-white/[0.03] p-8 flex flex-col space-y-10 bg-[#080809] z-10">
        <div>
           <h2 className="text-xl font-bold text-white tracking-tight mb-2">Creative Studio</h2>
           <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-relaxed">Synthesis Engine v2.5</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
             <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Composition Aspect</label>
             <div className="grid grid-cols-3 gap-2 p-1.5 bg-zinc-950 rounded-2xl border border-white/[0.03]">
               {(['1:1', '16:9', '9:16'] as const).map((ratio) => (
                 <button
                   key={ratio}
                   onClick={() => setSelectedRatio(ratio)}
                   className={`py-2 text-[11px] font-bold rounded-xl transition-all ${
                     selectedRatio === ratio 
                       ? 'bg-white text-black shadow-lg' 
                       : 'text-zinc-500 hover:text-zinc-300'
                   }`}
                 >
                   {ratio}
                 </button>
               ))}
             </div>
          </div>

          <div className="space-y-3">
             <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Sampling Mode</label>
             <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <p className="text-xs font-bold text-white mb-1">Ultra-Fidelity</p>
                <p className="text-[10px] text-zinc-500 leading-relaxed font-medium">Optimized for lighting and texture synthesis.</p>
             </div>
          </div>
        </div>

        <div className="mt-auto">
          <div className="p-5 rounded-[24px] bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.05] shimmer">
             <p className="text-xs font-bold text-white mb-2 leading-snug">Unlock Enterprise GPU Clusters</p>
             <button className="w-full py-2 bg-white text-black text-[11px] font-black uppercase tracking-widest rounded-xl hover:scale-[1.02] transition-transform">Upgrade Now</button>
          </div>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(255,255,255,0.02),transparent_40%)] pointer-events-none"></div>
        
        <div className="flex-1 overflow-y-auto p-12 space-y-12">
           <div className="max-w-4xl mx-auto w-full space-y-12">
             <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 px-2">Prompt Specification</label>
                <div className="relative group">
                  <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Envision a masterpiece..."
                    className="w-full h-40 bg-zinc-900 border border-white/[0.05] rounded-[32px] p-8 text-lg font-medium focus:ring-1 focus:ring-white/[0.1] outline-none resize-none placeholder-zinc-700 transition-all shadow-2xl group-hover:bg-zinc-900/80"
                  />
                  <button 
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt.trim()}
                    className="absolute bottom-6 right-6 px-10 py-4 bg-white hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-600 text-black font-black text-xs uppercase tracking-[0.2em] rounded-[24px] transition-all shadow-xl active:scale-95 flex items-center space-x-3"
                  >
                    {isGenerating ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
                        <span>Synthesizing</span>
                      </div>
                    ) : (
                      <span>Render</span>
                    )}
                  </button>
                </div>
             </div>

             <div className="space-y-8">
               <div className="flex items-center justify-between px-2">
                 <h3 className="text-2xl font-bold text-white tracking-tight">Gallery</h3>
                 <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{images.length} Objects</span>
               </div>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 pb-20">
                 {images.map((img) => (
                   <div key={img.id} className="group relative aspect-square bg-zinc-900 rounded-[32px] overflow-hidden border border-white/[0.05] shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-white/[0.2]">
                     <img src={img.url} alt={img.prompt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-8">
                       <p className="text-sm text-zinc-100 font-semibold leading-relaxed line-clamp-2 mb-6">{img.prompt}</p>
                       <div className="flex justify-between items-center border-t border-white/[0.1] pt-6">
                         <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{img.timestamp.toLocaleTimeString()}</span>
                         <div className="flex space-x-2">
                           <button className="p-3 bg-white text-black rounded-2xl hover:bg-zinc-200 transition-colors">
                             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                             </svg>
                           </button>
                         </div>
                       </div>
                     </div>
                   </div>
                 ))}

                 {isGenerating && (
                   <div className="aspect-square bg-white/[0.01] rounded-[32px] border-2 border-dashed border-white/[0.05] flex flex-col items-center justify-center space-y-4 animate-pulse">
                     <div className="w-16 h-16 rounded-[24px] bg-white/[0.03] flex items-center justify-center shimmer">
                        <svg className="w-8 h-8 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                     </div>
                     <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-700">Mapping Neural Path</p>
                   </div>
                 )}

                 {images.length === 0 && !isGenerating && (
                   <div className="col-span-full py-40 flex flex-col items-center justify-center text-center opacity-30 grayscale">
                     <svg className="w-16 h-16 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                     </svg>
                     <p className="text-sm font-bold tracking-tight text-zinc-500">Workspace is empty. Initialize render.</p>
                   </div>
                 )}
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};
