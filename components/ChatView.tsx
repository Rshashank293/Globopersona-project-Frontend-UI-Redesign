
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Message, GroundingLink } from '../types.ts';

export const ChatView: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setSelectedImage(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if ((!input.trim() && !selectedImage) || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
      images: selectedImage ? [selectedImage] : undefined,
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    const imageToProcess = selectedImage;
    setSelectedImage(null);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const parts: any[] = [{ text: input || "Explain this image." }];
      
      if (imageToProcess) {
        parts.push({
          inlineData: {
            mimeType: 'image/png',
            data: imageToProcess.split(',')[1],
          },
        });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts },
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const groundingLinks: GroundingLink[] = response.candidates?.[0]?.groundingMetadata?.groundingChunks
        ?.filter((c: any) => c.web)
        .map((c: any) => ({ uri: c.web.uri, title: c.web.title })) || [];

      const modelMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: response.text || "I was unable to retrieve a response.",
        timestamp: new Date(),
        groundingLinks,
      };

      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        content: "Error: Could not reach the AI nodes. Please verify your connection.",
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#050505] relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>

      <header className="px-10 py-6 flex justify-between items-center z-10 border-b border-white/[0.03]">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Intelligence Feed</h2>
          <p className="text-xs text-zinc-500 font-medium">Research Mode • Search Grounding Enabled</p>
        </div>
        <div className="flex items-center space-x-2">
           <button className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/[0.05] text-[10px] font-bold text-zinc-400 uppercase tracking-widest hover:text-white transition-colors">
             Export Session
           </button>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-10 pt-10 pb-40 space-y-12 max-w-5xl mx-auto w-full">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-8 py-20">
            <div className="w-24 h-24 rounded-[40px] bg-white/[0.02] border border-white/[0.05] flex items-center justify-center shimmer">
              <svg className="w-10 h-10 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div className="space-y-3">
              <h3 className="text-3xl font-bold text-white tracking-tight">What shall we explore?</h3>
              <p className="text-zinc-500 max-w-md mx-auto leading-relaxed">Gemini is optimized for high-level reasoning and research. Paste a complex query or upload data for rapid synthesis.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setInput("What's the latest in quantum computing research?")} className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/[0.05] text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all">Quantum Research</button>
              <button onClick={() => setInput("Analyze current market trends in AI.")} className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/[0.05] text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all">Market Trends</button>
            </div>
          </div>
        )}
        
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
            <div className={`max-w-[85%] space-y-3`}>
               {msg.role === 'model' && (
                 <div className="flex items-center space-x-2 px-1">
                   <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                     <svg className="w-3 h-3 text-black" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" /></svg>
                   </div>
                   <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Omni Intelligence</span>
                 </div>
               )}
              
              <div className={`rounded-3xl p-6 ${
                msg.role === 'user' 
                  ? 'bg-zinc-900 border border-white/[0.08] text-white shadow-2xl' 
                  : 'bg-transparent text-zinc-100'
              }`}>
                {msg.images && msg.images.map((img, i) => (
                  <div key={i} className="mb-6 overflow-hidden rounded-2xl border border-white/[0.1] shadow-2xl">
                    <img src={img} alt="Visual Context" className="max-w-md w-full h-auto" />
                  </div>
                ))}
                <div className={`text-[16px] leading-[1.6] ${msg.role === 'model' ? 'font-medium' : 'font-semibold'} whitespace-pre-wrap`}>
                  {msg.content}
                </div>
                
                {msg.groundingLinks && msg.groundingLinks.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-white/[0.05]">
                    <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-4">Cited Sources & Grounding</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {msg.groundingLinks.map((link, idx) => (
                        <a 
                          key={idx} 
                          href={link.uri} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center space-x-3 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/[0.1] transition-all group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-zinc-500 group-hover:text-blue-400 transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 10-5.656-5.656l-1.102 1.101" />
                            </svg>
                          </div>
                          <span className="text-[13px] font-bold text-zinc-400 truncate group-hover:text-white transition-colors">{link.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-transparent px-1 py-4 flex items-center space-x-4">
              <div className="flex space-x-1.5">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
              </div>
              <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">Processing Sequence</span>
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-4xl px-8 z-30">
        <div className="glass-card rounded-[32px] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-white/[0.05] transition-all focus-within:ring-1 focus-within:ring-white/[0.1]">
          {selectedImage && (
            <div className="mx-4 mt-2 mb-4 relative inline-flex items-center p-2 bg-zinc-900/50 rounded-2xl border border-white/[0.05] animate-in slide-in-from-bottom-4">
              <img src={selectedImage} alt="Preview" className="h-14 w-14 object-cover rounded-xl shadow-lg" />
              <button 
                onClick={() => setSelectedImage(null)} 
                className="absolute -top-2 -right-2 bg-white text-black rounded-full p-1 hover:scale-110 transition-transform shadow-xl"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
            <button 
              onClick={() => fileInputRef.current?.click()} 
              className="p-3 text-zinc-500 hover:text-white transition-all hover:bg-white/[0.05] rounded-[22px]"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Query intelligence nodes..."
              className="flex-1 bg-transparent border-none outline-none text-[16px] font-medium py-3 px-2 text-white placeholder-zinc-600"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || (!input.trim() && !selectedImage)}
              className="px-6 py-3 bg-white hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-600 text-black font-bold text-sm rounded-[22px] transition-all active:scale-95 shadow-lg"
            >
               Execute
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
