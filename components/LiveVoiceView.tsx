
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';
import { LiveTranscription } from '../types.ts';

export const LiveVoiceView: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [transcriptions, setTranscriptions] = useState<LiveTranscription[]>([]);
  const [visualizerData, setVisualizerData] = useState<number[]>(new Array(60).fill(5));
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const nextStartTimeRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [transcriptions]);

  useEffect(() => {
    let interval: number;
    if (isActive) {
      interval = window.setInterval(() => {
        setVisualizerData(prev => prev.map(() => Math.random() * 60 + 5));
      }, 70);
    } else {
      setVisualizerData(new Array(60).fill(5));
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const decode = useCallback((base64: string) => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }, []);

  const encode = useCallback((bytes: Uint8Array) => {
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }, []);

  const decodeAudioData = useCallback(async (
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number,
  ): Promise<AudioBuffer> => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  }, []);

  const createBlob = useCallback((data: Float32Array) => {
    const int16 = new Int16Array(data.length);
    for (let i = 0; i < data.length; i++) {
      int16[i] = data[i] * 32768;
    }
    return {
      data: encode(new Uint8Array(int16.buffer)),
      mimeType: 'audio/pcm;rate=16000',
    };
  }, [encode]);

  const startSession = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = inputCtx;
      outputAudioContextRef.current = outputCtx;

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
          },
          systemInstruction: 'You are Gemini OmniStudio Live. Engage in professional, low-latency vocal reasoning.',
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        },
        callbacks: {
          onopen: () => {
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
            setIsActive(true);
          },
          onmessage: async (message: LiveServerMessage) => {
            const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData) {
              const outCtx = outputAudioContextRef.current!;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outCtx.currentTime);
              const audioBuffer = await decodeAudioData(decode(audioData), outCtx, 24000, 1);
              const source = outCtx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outCtx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
            }

            if (message.serverContent?.inputTranscription) {
              const text = message.serverContent.inputTranscription.text;
              setTranscriptions(prev => [...prev, { id: Math.random().toString(), text, role: 'user' }]);
            }
            if (message.serverContent?.outputTranscription) {
              const text = message.serverContent.outputTranscription.text;
              setTranscriptions(prev => [...prev, { id: Math.random().toString(), text, role: 'model' }]);
            }

            if (message.serverContent?.interrupted) {
              nextStartTimeRef.current = 0;
            }
          },
          onclose: () => setIsActive(false),
          onerror: (e) => console.error(e)
        },
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
    }
  };

  const stopSession = () => {
    sessionRef.current?.close();
    streamRef.current?.getTracks().forEach(track => track.stop());
    setIsActive(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#050505] overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_60%)] pointer-events-none"></div>

      <header className="px-12 py-8 flex justify-between items-center z-10">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Neural Voice Pipe</h2>
          <div className="flex items-center space-x-2 mt-1">
             <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-zinc-700'}`}></div>
             <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em]">{isActive ? 'Synchronized' : 'Ready to Stream'}</p>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-12 relative">
        {/* Minimal Transcription Feed */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-2xl px-12 overflow-y-auto max-h-[25vh] space-y-4 opacity-40 hover:opacity-100 transition-opacity duration-500 scroll-smooth" ref={scrollRef}>
          {transcriptions.map((t) => (
            <div key={t.id} className={`flex ${t.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`px-5 py-2.5 rounded-[22px] text-[14px] font-semibold tracking-tight ${
                t.role === 'user' ? 'bg-zinc-900 text-zinc-300' : 'text-white'
              }`}>
                {t.text}
              </div>
            </div>
          ))}
        </div>

        {/* Visualizer & Interaction Button */}
        <div className="flex flex-col items-center space-y-24 mt-20">
          <div className="relative flex items-center justify-center">
             <div className={`absolute inset-0 bg-white/5 rounded-full blur-[100px] transition-all duration-1000 ${isActive ? 'scale-150 opacity-100' : 'scale-50 opacity-0'}`}></div>
             
             {/* Circular Waveform Visualizer */}
             <div className="flex items-end justify-center h-56 space-x-1.5 px-10">
               {visualizerData.map((height, i) => (
                 <div 
                   key={i} 
                   className={`w-1.5 rounded-full transition-all duration-150 ${
                     isActive 
                       ? 'bg-white shadow-[0_0_20px_rgba(255,255,255,0.4)]' 
                       : 'bg-zinc-800'
                   }`}
                   style={{ height: `${height}%` }}
                 ></div>
               ))}
             </div>
          </div>

          <div className="flex flex-col items-center space-y-8">
            <button
              onClick={isActive ? stopSession : startSession}
              className={`group relative w-32 h-32 rounded-[48px] flex items-center justify-center transition-all duration-500 transform hover:scale-105 active:scale-90 shadow-2xl ${
                isActive 
                  ? 'bg-red-600 hover:bg-red-500 shadow-red-900/40' 
                  : 'bg-white hover:bg-zinc-100 shadow-white/10'
              }`}
            >
              <div className={`absolute inset-0 rounded-[48px] transition-all duration-1000 ${isActive ? 'animate-ping bg-red-500/20 scale-125' : ''}`}></div>
              {isActive ? (
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="6" width="12" height="12" rx="3" />
                </svg>
              ) : (
                <svg className="w-10 h-10 text-black translate-x-1" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                   <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                </svg>
              )}
            </button>
            <div className="text-center">
              <span className={`text-[12px] font-black uppercase tracking-[0.5em] transition-colors ${isActive ? 'text-red-500' : 'text-zinc-600'}`}>
                {isActive ? 'Terminate Stream' : 'Initialize Voice Link'}
              </span>
              <p className="text-[11px] text-zinc-500 mt-3 font-bold tracking-widest opacity-60">Zephyr V2 • PCM16 Engine</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decoration footer */}
      <div className="absolute bottom-10 left-10 flex space-x-6 text-[10px] font-bold text-zinc-600 uppercase tracking-widest pointer-events-none">
        <span>Latency: &lt;180ms</span>
        <span>Sampling: 24kHz</span>
        <span>Codec: Raw PCM</span>
      </div>
    </div>
  );
};
