import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, Loader2, RefreshCw, Star, ArrowRight } from 'lucide-react';
import { calculateDestinyNumber } from './utils/numerology';
import { NUMEROLOGY_DATA } from './constants/numerologyData';
import { QuizStep } from './types';

export default function App() {
  const [step, setStep] = useState<QuizStep>(QuizStep.WELCOME);
  const [birthDate, setBirthDate] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const handleStart = () => setStep(QuizStep.INPUT);

  const handleCalculate = () => {
    if (birthDate.length >= 8) {
      const num = calculateDestinyNumber(birthDate);
      setResult(num);
      setStep(QuizStep.LOADING);
      
      setTimeout(() => {
        setStep(QuizStep.RESULT);
      }, 3000);
    }
  };

  const handleReset = () => {
    setStep(QuizStep.WELCOME);
    setBirthDate('');
    setResult(null);
  };

  const progress = {
    [QuizStep.WELCOME]: 0,
    [QuizStep.INPUT]: 50,
    [QuizStep.LOADING]: 80,
    [QuizStep.RESULT]: 100,
  }[step];

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-amber-500/30 overflow-x-hidden">
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#050505]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/95 via-[#050505]/60 to-[#050505]" />
        
        {/* Light Glows */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-violet-600/[0.03] blur-[180px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-amber-600/[0.03] blur-[180px] rounded-full animate-pulse delay-700" />
      </div>

      {/* Progress Bar (Stories Style) */}
      <div className="fixed top-0 left-0 right-0 h-1.5 z-50 flex gap-1 p-1">
        <div className="flex-1 bg-zinc-800/40 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-amber-500 shadow-[0_0_10px_#f59e0b]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      <header className="fixed top-4 md:top-8 left-0 right-0 z-40 px-6 max-w-7xl mx-auto flex justify-between items-center pointer-events-none">
        <div className="flex items-center gap-2 opacity-80 backdrop-blur-sm bg-[#050505]/20 px-3 py-1 rounded-full">
          <Star className="text-amber-500 w-3 md:h-3 md:w-4 h-3 md:h-4 fill-amber-500" />
          <span className="text-[9px] md:text-[10px] font-black tracking-[0.3em] md:tracking-[0.4em] uppercase text-amber-500">Portal Magnetico</span>
        </div>
      </header>

      <main className={`relative z-10 mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-12 min-h-screen flex flex-col items-center transition-all duration-700 ${step === QuizStep.WELCOME ? 'max-w-6xl' : 'max-w-lg'}`}>
        <AnimatePresence mode="wait">
          {step === QuizStep.WELCOME && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="w-full"
            >
              <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center w-full">
                <div className="space-y-8 md:space-y-12 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-4 animate-in fade-in slide-in-from-left-4 duration-700">
                    <div className="h-px w-8 md:w-12 bg-amber-500" />
                    <span className="text-amber-500 font-black text-[9px] md:text-[11px] tracking-[0.4em] md:tracking-[0.5em] uppercase text-nowrap">Fernando Liberal</span>
                  </div>

                  <div className="space-y-6 md:space-y-8">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.9] md:leading-[0.85] drop-shadow-2xl">
                      Sua Alma é<br />
                      <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200 pb-2 md:pb-4">
                        Frequência.
                      </span>
                    </h1>
                    <p className="text-zinc-400 text-lg md:text-xl leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium">
                      O universo não joga dados. Ele calcula. Descubra o código matemático que rege o seu destino e a missão secreta da sua alma.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8 pt-4 md:pt-8 w-full">
                    <button
                      id="btn-start"
                      onClick={handleStart}
                      className="w-full sm:w-auto h-16 md:h-18 px-10 md:px-14 bg-white hover:bg-zinc-100 text-black font-black text-lg md:text-xl rounded-2xl transition-all flex items-center justify-center gap-4 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.15)] group"
                    >
                      Iniciar Alinhamento
                      <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </div>

                <div className="relative flex justify-center lg:block animate-in fade-in slide-in-from-right-8 duration-1000">
                  <div className="absolute inset-0 bg-violet-600/10 blur-[120px] rounded-full scale-125 animate-pulse" />
                  <div className="relative w-[280px] h-[380px] md:w-[350px] md:h-[480px] lg:w-full lg:aspect-[3.5/5]">
                    <div className="absolute inset-0 border-[1px] border-amber-500/20 rounded-[3.5rem] rotate-[4deg] scale-100" />
                    <div className="absolute inset-0 border-[1px] border-amber-500/10 rounded-[3.5rem] -rotate-[4deg] scale-105" />
                    <div className="relative h-full w-full bg-zinc-900/80 rounded-[4rem] overflow-hidden border border-amber-500/40 backdrop-blur-md group shadow-2xl">
                      <img 
                        src="/fernando.png?v=2"
                        alt="Especialista"
                        className="absolute inset-0 w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/20 opacity-90" />
                      <div className="absolute bottom-8 left-0 right-0 text-center">
                        <div className="inline-flex items-center gap-3 bg-[#050505]/90 backdrop-blur-xl px-6 py-3 rounded-full border border-amber-500/30 shadow-2xl transition-transform group-hover:scale-110">
                          <Star className="w-5 h-5 text-amber-500" />
                          <span className="text-xs font-black tracking-widest text-white uppercase">Mestre Mentor</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === QuizStep.INPUT && (
            <motion.div
              key="input"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="w-full space-y-12 pt-12"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="h-px w-8 bg-amber-500/50" />
                  <span className="text-amber-500 font-bold text-[10px] tracking-widest uppercase">Ponto de Partida</span>
                </div>
                <h2 className="text-4xl font-black text-white">Consulte seu Oráculo</h2>
                <p className="text-zinc-500">O Universo precisa de um parâmetro: <br />Sua data de nascimento.</p>
              </div>

              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/20 to-amber-500/20 rounded-3xl blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
                <div className="relative">
                  <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                    <Calendar className="w-6 h-6 text-amber-500/50 group-focus-within:text-amber-500 transition-colors" />
                  </div>
                  <input
                    id="birthdate-input"
                    type="text"
                    inputMode="numeric"
                    placeholder="DD/MM/AAAA"
                    value={birthDate}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      if (val.length <= 8) setBirthDate(val);
                    }}
                    className="w-full bg-zinc-900/40 border-2 border-zinc-800/50 focus:border-amber-500/50 rounded-2xl md:rounded-3xl py-6 md:py-8 pl-14 md:pl-18 pr-6 text-xl md:text-3xl font-black text-white placeholder:text-zinc-800 focus:outline-none transition-all backdrop-blur-md"
                  />
                  {birthDate.length > 0 && (
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 flex gap-1">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < birthDate.length ? 'bg-amber-500' : 'bg-zinc-800'}`} />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <button
                id="btn-calculate"
                disabled={birthDate.length < 8}
                onClick={handleCalculate}
                className="w-full h-18 bg-gradient-to-r from-amber-500 to-amber-700 disabled:from-zinc-800 disabled:to-zinc-900 disabled:opacity-50 text-white font-black text-xl rounded-[2rem] transition-all flex items-center justify-center gap-3 shadow-2xl active:scale-95 group overflow-hidden relative"
              >
                <span className="relative z-10">Desvendar Frequência</span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </motion.div>
          )}

          {step === QuizStep.LOADING && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col items-center justify-center space-y-12 pt-24"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="w-48 h-48 border-[1px] border-amber-500/10 border-t-amber-500 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-4 border-[1px] border-violet-500/10 border-b-violet-500 rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-amber-500/20 blur-xl rounded-full animate-pulse" />
                  <Loader2 className="w-8 h-8 text-amber-500 animate-spin absolute" />
                </div>
              </div>
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-black text-white tracking-tight">Sincronizando vibrações...</h3>
                <p className="text-amber-500/60 font-mono text-xs tracking-widest animate-pulse">Lendo padrões geométricos da alma</p>
              </div>
            </motion.div>
          )}

          {step === QuizStep.RESULT && result !== null && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full space-y-10"
            >
              <div className="text-center space-y-2">
                <span className="text-[10px] font-black tracking-[0.4em] uppercase text-zinc-500">Resultado Final</span>
                <h2 className="text-3xl font-black text-white">Seu Arcano de Alma</h2>
              </div>

              {/* Tarot Card REFINED */}
              <div id="tarot-card" className="relative group p-1">
                <div className="absolute -inset-0.5 bg-gradient-to-b from-amber-400 via-amber-600 to-transparent rounded-[2.5rem] opacity-30 blur-sm group-hover:opacity-50 transition-opacity" />
                <div className="relative bg-[#0d0d0d]/90 border-[1px] border-amber-500/30 rounded-[2.5rem] p-6 md:p-12 space-y-8 md:space-y-10 overflow-hidden shadow-2xl backdrop-blur-3xl">
                  {/* Internal Golden Border */}
                  <div className="absolute inset-4 border border-amber-500/10 rounded-[1.8rem] pointer-events-none" />
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-[60px] rounded-full -mr-16 -mt-16" />
                  
                  {/* Card Header */}
                  <div className="text-center space-y-4 relative">
                    <div className="flex items-center justify-center gap-4">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/20" />
                      <Sparkles className="w-5 h-5 text-amber-500/60" />
                      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/20" />
                    </div>
                    <div>
                      <h3 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-100 to-amber-600 drop-shadow-[0_5px_15px_rgba(245,158,11,0.2)]">
                        {NUMEROLOGY_DATA[result].title.split(' ')[1]}
                      </h3>
                      <p className="text-amber-500/60 text-[10px] font-bold tracking-[0.3em] uppercase mt-3">Número de Destino</p>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="space-y-12 relative">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_8px_#f59e0b]" />
                        <h4 className="text-white text-[10px] md:text-xs font-black uppercase tracking-widest">Missão de Luz</h4>
                      </div>
                      <p className="text-lg md:text-xl text-zinc-100 leading-relaxed font-semibold">
                        {NUMEROLOGY_DATA[result].mission}
                      </p>
                    </div>

                    <div className="space-y-4 border-t border-zinc-800/50 pt-8">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 border border-zinc-700 rounded-sm rotate-45" />
                        <h4 className="text-zinc-500 text-[10px] md:text-xs font-black uppercase tracking-widest">Sombra Evolutiva</h4>
                      </div>
                      <p className="text-sm md:text-base text-zinc-400 leading-relaxed italic">
                        {NUMEROLOGY_DATA[result].difficulties}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between items-center opacity-30">
                    <Star className="w-3 h-3 text-amber-500" />
                    <div className="text-[8px] font-mono tracking-widest text-amber-200">SACRED GEOMETRY ENCODER</div>
                    <Star className="w-3 h-3 text-amber-500" />
                  </div>
                </div>
              </div>

              <button
                id="btn-retry"
                onClick={handleReset}
                className="w-full py-6 border border-zinc-800 hover:border-amber-500/50 hover:bg-amber-500/5 text-zinc-500 hover:text-amber-500 rounded-2xl transition-all duration-500 flex items-center justify-center gap-3 group"
              >
                <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" />
                Refazer Alinhamento
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}