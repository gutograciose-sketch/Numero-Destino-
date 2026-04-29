import { ArrowRight, Sparkles, Star } from 'lucide-react';
import mentorImg from '../assets/mentor.png';

interface HeroProps {
  onStart: () => void;
}

export function Hero({ onStart }: HeroProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center py-12">
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

          <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-8 pt-4 md:pt-8">
            <button
              id="btn-start"
              onClick={onStart}
              className="w-full sm:w-auto h-16 md:h-18 px-10 md:px-14 bg-white hover:bg-zinc-100 text-black font-black text-lg md:text-xl rounded-2xl transition-all flex items-center justify-center gap-4 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.15)] group"
            >
              Iniciar Alinhamento
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>

        <div className="relative hidden lg:block animate-in fade-in slide-in-from-right-8 duration-1000">
          <div className="absolute inset-0 bg-violet-600/10 blur-[150px] rounded-full scale-125 animate-pulse" />
          <div className="relative aspect-[3.5/5] w-full">
            <div className="absolute inset-0 border-[1px] border-amber-500/20 rounded-[3.5rem] rotate-[4deg] scale-100" />
            <div className="absolute inset-0 border-[1px] border-amber-500/10 rounded-[3.5rem] -rotate-[4deg] scale-105" />
            <div className="relative h-full w-full bg-zinc-900/80 rounded-[4rem] overflow-hidden border border-amber-500/40 backdrop-blur-md group shadow-2xl">
              <img 
                src={mentorImg}
                alt="Mentor"
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/20 opacity-90" />
              <div className="absolute bottom-12 left-0 right-0 text-center">
                <div className="inline-flex items-center gap-3 bg-[#050505]/90 backdrop-blur-xl px-6 py-3 rounded-full border border-amber-500/30 shadow-2xl transition-transform group-hover:scale-110">
                  <Star className="w-5 h-5 text-amber-500" />
                  <span className="text-xs font-black tracking-widest text-white uppercase">Mestre Mentor</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Benefits Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 w-full pt-24 md:pt-40 pb-12 border-t border-zinc-900/50">
        {[
          { label: "Precisão", text: "Cálculo Pitagórico Ancestral", icon: Star },
          { label: "Profundidade", text: "Dualidade de Luz e Sombra", icon: Sparkles },
          { label: "Mistério", text: "Revelação de Números Mestres", icon: Star },
          { label: "Legado", text: "Conclusão da Missão de Vida", icon: Sparkles }
        ].map((item, i) => (
          <div key={i} className="group cursor-default">
            <div className="flex items-center gap-3 mb-2">
              <item.icon className="w-4 h-4 text-amber-500/40 group-hover:text-amber-500 transition-colors" />
              <p className="text-[11px] text-zinc-500 font-black uppercase tracking-[0.3em]">{item.label}</p>
            </div>
            <p className="text-zinc-300 text-sm font-medium leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
