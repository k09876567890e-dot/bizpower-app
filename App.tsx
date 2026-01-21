import React, { useState, useEffect } from 'react';
import { View, Answers, DiagnosticResult } from './types';
import { MAIN_COPIES, QUESTIONS, CONCEPT_TEXT, PRIVACY_POLICY, DISCLAIMER } from './constants';
import { calculateResult } from './utils';
import { getAIAdvice } from './services/gemini';
import Chart from './components/RadarChart';
// 【修正】ChevronLeft を追加（戻るボタン用）
import { ChevronRight, ChevronLeft, CheckCircle, AlertTriangle, ArrowRight, BrainCircuit, RefreshCw, Skull, Sparkles, Zap, Target, Twitter, Loader2, ExternalLink, ShieldCheck, Users, Sword, Compass } from 'lucide-react';

// GitHubの画像を直接参照（そのまま維持）
const CHARACTER_IMAGES: Record<string, string> = {
  ARCHITECT: "https://raw.githubusercontent.com/k09876567890e-dot/bizpower-app/main/architect.png",
  GUARDIAN: "https://raw.githubusercontent.com/k09876567890e-dot/bizpower-app/main/guardian.png",
  NOMAD: "https://raw.githubusercontent.com/k09876567890e-dot/bizpower-app/main/nomad.png",
  REVOLUTIONARY: "https://raw.githubusercontent.com/k09876567890e-dot/bizpower-app/main/revolutionary.png",
  STRATEGIST: "https://raw.githubusercontent.com/k09876567890e-dot/bizpower-app/main/strategist.png",
};

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [answers, setAnswers] = useState<Answers>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
   
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [loadingContent, setLoadingContent] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (result && view === 'result' && !loadingContent && !aiAdvice) {
      const fetchAIContent = async () => {
        setLoadingContent(true);
        try {
          const advice = await getAIAdvice(answers, result);
          setAiAdvice(advice);
        } catch (error) {
          console.error("AI Fetch Error:", error);
        } finally {
          setLoadingContent(false);
        }
      };
      fetchAIContent();
    }
  }, [result, view, aiAdvice, loadingContent, answers]);

  const startDiagnosis = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setResult(null);
    setAiAdvice(null);
    setImageLoaded(false);
    setImageError(false);
    setIsTransitioning(false);
    setView('diagnosis');
    window.scrollTo(0, 0);
  };

  // 【追加】戻るボタンの処理
  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      setView('home'); // 1問目で戻るとトップへ
    }
  };

  const handleAnswer = (questionId: number, option: any) => {
    if (isTransitioning) return;
    setAnswers(prev => ({ ...prev, [questionId]: option }));
   
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        setIsTransitioning(false);
      }, 300);
    } else {
      const finalAnswers = { ...answers, [questionId]: option };
      const calcResult = calculateResult(finalAnswers);
      setResult(calcResult);
      setView('result');
      window.scrollTo(0, 0);
    }
  };

  const shareOnTwitter = () => {
    if (!result) return;
    const url = window.location.href;
    const text = encodeURIComponent(result.shareText);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const getFallbackIcon = (type: string) => {
    switch (type) {
      case 'ARCHITECT': return <ShieldCheck size={80} />;
      case 'REVOLUTIONARY': return <Zap size={80} />;
      case 'GUARDIAN': return <Users size={80} />;
      case 'STRATEGIST': return <Sword size={80} />;
      case 'NOMAD': return <Compass size={80} />;
      default: return <Target size={80} />;
    }
  };

  const renderHeader = () => (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="font-bold text-xl text-indigo-900 tracking-tight flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
          <div className="bg-indigo-600 p-1.5 rounded-lg shadow-sm">
            <Zap className="text-white fill-white" size={18} />
          </div>
          BizPower
        </div>
        <nav className="hidden sm:flex gap-8 text-xs font-black uppercase tracking-widest text-slate-500">
          <button onClick={() => setView('policy')} className="hover:text-indigo-600 transition">Privacy Policy</button>
          <button onClick={() => setView('disclaimer')} className="hover:text-indigo-600 transition">Terms</button>
        </nav>
      </div>
    </header>
  );

  const renderFooter = () => (
    <footer className="bg-slate-50 text-slate-400 py-16 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="flex justify-center gap-8 text-[11px] font-black uppercase tracking-widest mb-10">
          <button onClick={() => setView('concept')} className="hover:text-slate-900 transition">運営理念</button>
          <button onClick={() => setView('policy')} className="hover:text-slate-900 transition">プライバシーポリシー</button>
          <button onClick={() => setView('disclaimer')} className="hover:text-slate-900 transition">利用規約</button>
        </div>
        <div className="text-[10px] uppercase tracking-[0.3em] opacity-40">
          &copy; 2025 BIZPOWER PROJECT. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );

  const renderHome = () => (
    <div className="animate-fade-in bg-white min-h-screen text-slate-900 relative font-sans overflow-hidden">
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 bg-amber-50 rounded-full blur-3xl opacity-60"></div>
      <section className="relative z-10 py-24 sm:py-40 px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black tracking-[0.2em] mb-8 border border-indigo-100 uppercase">
          <Sparkles size={12} /> 深層才能分析
        </div>
        <h1 className="text-4xl sm:text-7xl font-black text-slate-900 leading-tight mb-8 tracking-tighter">
          あなたの真の<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-900">ビジネス戦闘力</span>を測定
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed font-bold">
          {MAIN_COPIES[1]}<br/>
          <span className="text-slate-800">{MAIN_COPIES[2]}</span>
        </p>
        <button onClick={startDiagnosis} className="group relative bg-indigo-600 text-white font-black py-5 px-16 rounded-2xl shadow-xl shadow-indigo-200 transition-all hover:scale-105 hover:bg-indigo-700 flex items-center gap-3 mx-auto text-xl">
          診断を開始する <ArrowRight size={22} />
        </button>
      </section>
    </div>
  );

  const renderDiagnosis = () => {
    const question = QUESTIONS[currentQuestionIndex];
    if (!question) return null;
    const progress = ((currentQuestionIndex + 1) / QUESTIONS.length) * 100;
    return (
      <div className="bg-slate-50 min-h-screen text-slate-900 flex flex-col font-sans">
        <div className="w-full h-2 bg-slate-200 sticky top-16 z-50">
          <div className="bg-indigo-600 h-full transition-all duration-300 ease-out" style={{ width: `${progress}%` }}></div>
        </div>
        {/* 【修正】relative を追加して、戻るボタンの配置基準にします */}
        <div className="max-w-2xl w-full mx-auto px-4 py-20 flex-grow flex flex-col justify-center relative">
          
          {/* 【追加】ここに戻るボタンを配置 */}
          <button 
            onClick={handleBack} 
            className="absolute top-4 left-0 sm:left-4 text-slate-400 hover:text-indigo-600 flex items-center gap-1 text-sm font-bold transition-colors z-10 p-2"
          >
            <ChevronLeft size={20} /> 戻る
          </button>

          <div className="mb-12 text-center">
            <div className="text-indigo-600 font-black text-xs tracking-[0.2em] mb-4 uppercase">第 {question.id} 問 / {QUESTIONS.length}</div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug tracking-tight">{question.text}</h2>
          </div>
          <div className="flex flex-col gap-4">
            {question.options.map((option, idx) => (
              <button key={idx} disabled={isTransitioning} onClick={() => handleAnswer(question.id, option)} className="w-full text-left p-6 rounded-2xl border-2 border-transparent bg-white shadow-sm hover:shadow-md hover:border-indigo-600 hover:bg-indigo-50/50 transition-all duration-200 group flex justify-between items-center disabled:opacity-70">
                <span className="text-slate-700 font-bold group-hover:text-indigo-900 text-lg">{option.label}</span>
                <ChevronRight className="text-slate-300 group-hover:text-indigo-600 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderResult = () => {
    if (!result) return null;
    return (
      <div className="bg-white min-h-screen text-slate-900 pb-20 font-sans animate-fade-in">
        <div className={`relative pt-16 pb-24 px-4 bg-gradient-to-b ${result.colorTheme} to-indigo-950 overflow-hidden`}>
          <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]"></div>
          <div className="relative z-10 max-w-lg mx-auto text-center">
             <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 text-[10px] font-black mb-8 text-white tracking-[0.3em] uppercase">DIAGNOSTIC COMPLETE</div>
             
             <div className="bg-white rounded-[3rem] p-0 mb-10 shadow-2xl relative overflow-hidden">
                <div className={`h-2.5 bg-gradient-to-r ${result.colorTheme}`}></div>
                
                <div className="w-full aspect-square bg-slate-100 flex items-center justify-center relative overflow-hidden">
                  {!imageLoaded && !imageError && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <Loader2 className="animate-spin text-slate-300 mb-2" size={32} />
                      <span className="text-[10px] text-slate-400 font-bold tracking-widest">LOADING VISUAL...</span>
                    </div>
                  )}
                  {imageError ? (
                    <div className={`absolute inset-0 bg-gradient-to-br ${result.colorTheme} flex flex-col items-center justify-center text-white p-12`}>
                      <div className="bg-white/20 p-8 rounded-[2.5rem] backdrop-blur-md border border-white/30 shadow-2xl mb-6">
                        {getFallbackIcon(result.type)}
                      </div>
                      <h2 className="text-3xl font-black tracking-tighter mb-2">{result.characterName}</h2>
                      <div className="text-[10px] font-bold tracking-[0.4em] opacity-80 uppercase">Visual Error - Using Emblem</div>
                    </div>
                  ) : (
                    <img 
                      src={CHARACTER_IMAGES[result.type] || result.imagePath} 
                      alt={result.characterName} 
                      crossOrigin="anonymous"
                      referrerPolicy="no-referrer"
                      onLoad={() => setImageLoaded(true)}
                      onError={(e) => {
                        console.error("Image failed to load:", CHARACTER_IMAGES[result.type] || result.imagePath);
                        setImageError(true);
                      }}
                      className={`w-full h-full object-cover transition-opacity duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`} 
                    />
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/40 to-transparent"></div>
                </div>

                <div className="px-10 pb-14 pt-2">
                  <h2 className="text-4xl font-black mb-3 text-slate-900 tracking-tight leading-none">{result.characterName}</h2>
                  <p className="text-base text-slate-500 font-bold italic mb-10 leading-relaxed">"{result.catchphrase}"</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 shadow-inner">
                      <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1.5">Rank Status</div>
                      <div className="text-6xl font-black text-indigo-600 leading-none tracking-tighter">{result.rank}</div>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 shadow-inner">
                      <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1.5">Combat Power</div>
                      <div className="text-4xl font-black text-slate-900 leading-none pt-2">{result.combatPower.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
             </div>
             
             <button onClick={shareOnTwitter} className="inline-flex items-center gap-3 bg-white text-indigo-950 font-black px-12 py-5 rounded-2xl shadow-2xl hover:bg-indigo-50 transition-all hover:scale-105 active:scale-95 text-lg">
                <Twitter size={24} className="fill-indigo-900" /> 結果をポストする
              </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 -mt-16 relative z-20 space-y-12">
          <div className="bg-indigo-600 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12"><BrainCircuit size={180} /></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-black mb-8 flex items-center gap-4 tracking-tight">
                <Sparkles size={28} className="text-amber-300 fill-amber-300" /> AI 戦略分析レポート
              </h3>
              {loadingContent ? (
                <div className="flex flex-col items-center py-12 gap-5 text-indigo-200">
                  <Loader2 className="animate-spin" size={40} />
                  <p className="text-sm font-bold tracking-[0.3em] uppercase animate-pulse">Deep Analyzing...</p>
                </div>
              ) : (
                <div className="bg-white/10 rounded-3xl p-8 border border-white/20 backdrop-blur-sm shadow-inner">
                  <p className="text-white leading-relaxed text-lg font-bold whitespace-pre-wrap">
                    {aiAdvice || "解析に失敗しました。"}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-[3rem] p-10 sm:p-14 shadow-xl">
             <div className="flex flex-col lg:flex-row gap-16 items-center">
                <div className="w-full lg:w-1/2">
                   <h3 className="text-xs font-black text-indigo-600 mb-10 flex items-center gap-3 uppercase tracking-[0.3em]"><Target size={20} /> 能力パラメータ</h3>
                   <Chart data={result.radarData} />
                </div>
                <div className="w-full lg:w-1/2">
                  <h3 className="text-xs font-black text-indigo-600 mb-8 uppercase tracking-[0.3em]">ポテンシャル解析</h3>
                  <p className="text-slate-600 leading-[1.8] text-lg font-bold text-justify">
                    {result.description}
                  </p>
                </div>
             </div>
          </div>

          <div className="bg-rose-50/80 border border-rose-200 rounded-[3rem] p-10 sm:p-14 overflow-hidden relative shadow-md backdrop-blur-sm">
             <div className="absolute -right-12 -top-12 opacity-[0.03] rotate-12 text-rose-900"><Skull size={280} /></div>
             
             <div className="flex items-center gap-4 mb-12 text-rose-700">
                <div className="bg-rose-100 p-3 rounded-2xl">
                  <AlertTriangle size={32} className="text-rose-600" />
                </div>
                <h3 className="font-black text-xl sm:text-2xl uppercase tracking-[0.2em] leading-tight">警告：才能を殺す「毒の沼」環境</h3>
             </div>
             
             <div className="grid md:grid-cols-2 gap-16 relative z-10">
                <div className="space-y-6">
                   <div className="text-xs text-rose-400 font-black uppercase tracking-[0.3em] flex items-center gap-2">
                     <span className="w-1.5 h-1.5 rounded-full bg-rose-300"></span> 致命的な相性
                   </div>
                   <p className="text-rose-950 font-bold text-xl sm:text-2xl leading-relaxed tracking-tight">
                     {result.toxicEnvironment}
                   </p>
                </div>
                <div className="space-y-6">
                   <div className="text-xs text-rose-400 font-black uppercase tracking-[0.3em] flex items-center gap-2">
                     <span className="w-1.5 h-1.5 rounded-full bg-rose-300"></span> 予見される末路
                   </div>
                   <p className="text-rose-950 font-bold text-xl sm:text-2xl leading-relaxed tracking-tight">
                     {result.fateWarning}
                   </p>
                </div>
             </div>
          </div>

          <div className="text-center pt-8">
             <h3 className="text-3xl font-black text-slate-900 mb-14 tracking-tight">あなたが真に輝く戦場</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {result.recommendedActions.map((action, i) => (
                  <div key={i} className="bg-white border border-slate-100 p-10 rounded-[2.5rem] flex flex-col items-center justify-between hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                    <div className="w-full text-center">
                      <div className="mb-8 flex justify-center">
                          <div className="p-5 bg-indigo-50 rounded-[1.5rem] group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                           <CheckCircle size={32} />
                          </div>
                      </div>
                      <h4 className="font-black text-slate-900 mb-5 tracking-tight text-xl">{action.label}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed font-bold mb-10 min-h-[3rem]">{action.description}</p>
                    </div>
                    <a href={action.url} target="_blank" rel="noopener noreferrer" className="w-full inline-flex justify-center items-center gap-3 bg-indigo-600 text-white text-sm font-black px-8 py-5 rounded-2xl hover:bg-indigo-700 transition-all shadow-lg active:scale-95">
                      詳細を調査する <ExternalLink size={18} />
                    </a>
                  </div>
               ))}
             </div>
          </div>

          <div className="text-center pt-24 pb-12">
              <button onClick={startDiagnosis} className="text-slate-400 hover:text-indigo-600 flex items-center justify-center gap-3 mx-auto transition-colors text-xs font-black uppercase tracking-[0.3em] py-4 px-8 rounded-full hover:bg-slate-100">
                <RefreshCw size={16} /> 新しい診断を開始する
              </button>
          </div>
        </div>
      </div>
    );
  };

  const renderTextPage = (title: string, content: string) => (
    <div className="bg-slate-50 min-h-screen py-24 px-4 animate-fade-in">
      <div className="max-w-3xl mx-auto bg-white p-10 sm:p-20 rounded-[3rem] shadow-2xl border border-slate-100">
        <h2 className="text-4xl font-black text-slate-900 mb-12 border-b border-slate-100 pb-8 tracking-tight">{title}</h2>
        <div className="text-slate-600 leading-relaxed font-bold whitespace-pre-wrap text-lg text-justify antialiased">
          {content}
        </div>
        <div className="mt-16 pt-10 border-t border-slate-50">
          <button onClick={() => setView('home')} className="group flex items-center gap-3 text-indigo-600 font-black text-base uppercase tracking-widest hover:text-indigo-700 transition-all">
            トップへ戻る <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white selection:bg-indigo-100 selection:text-indigo-900 antialiased">
      {renderHeader()}
      <main className="flex-grow">
        {view === 'home' && renderHome()}
        {view === 'diagnosis' && renderDiagnosis()}
        {view === 'result' && renderResult()}
        {view === 'concept' && renderTextPage('運営理念', CONCEPT_TEXT)}
        {view === 'policy' && renderTextPage('プライバシーポリシー', PRIVACY_POLICY)}
        {view === 'disclaimer' && renderTextPage('利用規約', DISCLAIMER)}
      </main>
      {view !== 'home' && view !== 'diagnosis' && renderFooter()}
    </div>
  );
};

export default App;
