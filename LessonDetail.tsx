import React, { useState, useEffect } from 'react';
import { Lesson } from './types';
import { COURSE_CONTENT } from './constants';
import { playTextToSpeech, generateExplanation } from './geminiService';
import { ArrowLeft, Volume2, Sparkles, MessageCircle, BookOpen, PlayCircle, Mic, Loader2 } from 'lucide-react';

interface LessonDetailProps {
  lessonId: string;
  onBack: () => void;
}

const LessonDetail: React.FC<LessonDetailProps> = ({ lessonId, onBack }) => {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [activeTab, setActiveTab] = useState<'vocab' | 'phrases' | 'scenario'>('vocab');
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loadingExpl, setLoadingExpl] = useState(false);
  
  // Track which item is currently loading/playing to show the spinner
  const [playingItem, setPlayingItem] = useState<string | null>(null);

  useEffect(() => {
    let found: Lesson | undefined;
    COURSE_CONTENT.forEach(module => {
      const l = module.lessons.find(l => l.id === lessonId);
      if (l) found = l;
    });
    setLesson(found || null);
  }, [lessonId]);

  if (!lesson) return <div className="p-8 text-center text-slate-500">Loading...</div>;

  const handlePlayAudio = async (text: string, id: string, voice: any = 'Kore') => {
      // Prevent multiple clicks on the same item while loading
      if (playingItem === id) return;
      
      setPlayingItem(id);
      try {
        await playTextToSpeech(text, voice);
      } finally {
        // Keep spinner briefly to show feedback, then reset
        setTimeout(() => setPlayingItem(null), 1000); 
      }
  };

  const handleExplain = async (text: string) => {
    setLoadingExpl(true);
    setExplanation(null);
    const result = await generateExplanation(text);
    setExplanation(result);
    setLoadingExpl(false);
  };

  return (
    <div className="flex flex-col h-screen bg-[#F3F0FF] overflow-hidden">
      {/* Immersive Header */}
      <div className="bg-white px-6 pt-6 pb-4 shadow-sm z-20 rounded-b-[2rem]">
        <div className="flex items-center gap-4 mb-4 mt-8">
            <button onClick={onBack} className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">
                <ArrowLeft size={20} strokeWidth={2.5} />
            </button>
            <div className="flex-1">
                <span className="text-[10px] font-black tracking-widest uppercase text-indigo-500 bg-indigo-50 px-2 py-1 rounded-md">{lesson.level}</span>
                <h1 className="text-xl font-extrabold text-slate-800 mt-1">{lesson.title}</h1>
            </div>
            <div className="text-3xl">{lesson.icon}</div>
        </div>

        {/* Floating Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-xl">
            {['vocab', 'phrases', 'scenario'].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                        activeTab === tab 
                        ? 'bg-white text-indigo-600 shadow-sm' 
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                >
                    {tab === 'vocab' && <BookOpen size={14} />}
                    {tab === 'phrases' && <MessageCircle size={14} />}
                    {tab === 'scenario' && <PlayCircle size={14} />}
                    <span className="capitalize">{tab}</span>
                </button>
            ))}
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-6 pb-24">
        
        {activeTab === 'vocab' && (
          <div className="grid gap-4">
            {lesson.vocabulary.map((item, idx) => (
              <div 
                key={item.id} 
                className="bg-white p-5 rounded-3xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] flex items-center justify-between border-2 border-transparent hover:border-indigo-100 transition-all animate-slide-up cursor-pointer active:scale-95"
                style={{ animationDelay: `${idx * 0.05}s` }}
                onClick={() => handlePlayAudio(item.french, item.id)}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-black text-slate-800 tracking-tight">{item.french}</h3>
                    {item.gender && (
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded text-white ${item.gender === 'm' ? 'bg-blue-400' : 'bg-pink-400'}`}>
                            {item.gender.toUpperCase()}
                        </span>
                    )}
                  </div>
                  {item.ipa && <p className="text-indigo-400 font-mono text-sm mb-1">{item.ipa}</p>}
                  <p className="text-slate-500 font-medium text-sm">{item.english}</p>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${playingItem === item.id ? 'bg-indigo-500 text-white scale-110' : 'bg-indigo-50 text-indigo-600'}`}>
                  {playingItem === item.id ? (
                      <Loader2 size={20} className="animate-spin" />
                  ) : (
                      <Volume2 size={20} />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'phrases' && (
          <div className="space-y-4">
            {lesson.phrases.map((item, idx) => (
              <div 
                key={item.id} 
                className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 animate-slide-up"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="flex justify-between items-start mb-3">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide ${item.formal ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'}`}>
                    {item.formal ? 'Formal' : 'Casual'}
                  </span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleExplain(item.french); }}
                    className="text-xs font-bold text-indigo-500 flex items-center gap-1 bg-indigo-50 px-2 py-1 rounded-full hover:bg-indigo-100"
                  >
                    <Sparkles size={12} /> Explain
                  </button>
                </div>
                
                <h3 className="text-lg font-bold text-slate-800 mb-1 leading-tight">{item.french}</h3>
                <p className="text-slate-500 text-sm mb-4">{item.english}</p>
                
                <button 
                    onClick={() => handlePlayAudio(item.french, item.id)}
                    className={`w-full py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${playingItem === item.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'}`}
                >
                    {playingItem === item.id ? (
                        <>
                           <Loader2 size={16} className="animate-spin" /> Loading...
                        </>
                    ) : (
                        <>
                            <Volume2 size={16} /> Listen
                        </>
                    )}
                </button>
              </div>
            ))}

            {(explanation || loadingExpl) && (
                <div className="fixed bottom-6 left-4 right-4 bg-slate-900 text-white p-5 rounded-3xl shadow-2xl z-50 animate-slide-up">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2 text-amber-400">
                            <Sparkles size={18} fill="currentColor" />
                            <span className="font-bold text-sm">Gemini Tutor</span>
                        </div>
                        <button onClick={() => setExplanation(null)} className="text-slate-400 hover:text-white">✕</button>
                    </div>
                    {loadingExpl ? (
                        <div className="h-10 flex items-center gap-2 text-slate-400 text-sm">
                            <Loader2 size={16} className="animate-spin" />
                            Thinking...
                        </div>
                    ) : (
                        <p className="text-sm leading-relaxed text-slate-200">{explanation}</p>
                    )}
                </div>
            )}
          </div>
        )}

        {activeTab === 'scenario' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white p-6 rounded-3xl shadow-lg shadow-indigo-200">
                <h3 className="font-bold text-lg">{lesson.scenario.title}</h3>
                <p className="text-indigo-100 text-sm mt-1 opacity-80">{lesson.scenario.description}</p>
            </div>

            <div className="space-y-4">
              {lesson.scenario.lines.map((line, idx) => {
                const isUser = idx % 2 === 0;
                return (
                    <div key={idx} className={`flex gap-3 animate-slide-up ${isUser ? 'flex-row' : 'flex-row-reverse'}`} style={{ animationDelay: `${idx * 0.1}s` }}>
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center text-lg shadow-sm">
                            {line.avatar}
                        </div>
                        <div className={`flex-1 p-4 rounded-2xl max-w-[85%] relative group cursor-pointer transition-transform active:scale-95 ${isUser ? 'bg-white rounded-tl-none shadow-sm text-slate-800' : 'bg-indigo-500 text-white rounded-tr-none shadow-md'}`}
                            onClick={() => handlePlayAudio(line.french, `s-${idx}`, isUser ? 'Kore' : 'Fenrir')}
                        >
                             <p className="font-bold text-base mb-1 leading-snug">{line.french}</p>
                             <p className={`text-xs ${isUser ? 'text-slate-400' : 'text-indigo-200'}`}>{line.english}</p>
                             
                             {playingItem === `s-${idx}` && (
                                <div className="absolute top-2 right-2">
                                     <Loader2 size={14} className="animate-spin text-current opacity-50" />
                                </div>
                             )}
                        </div>
                    </div>
                );
              })}
            </div>
            
            <button className="w-full bg-white border-2 border-indigo-100 text-indigo-600 font-bold py-4 rounded-3xl mt-8 flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors">
                <Mic size={20} />
                Practice Pronunciation (Beta)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonDetail;