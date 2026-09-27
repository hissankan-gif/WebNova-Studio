import React from 'react';
import { ArrowRight, Eye, Sparkles } from 'lucide-react';

interface FinalCTAProps {
  onStartProject: () => void;
  onViewWork: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onStartProject, onViewWork }) => {
  return (
    <section className="relative py-32 px-6 md:px-16 lg:px-24 z-10 overflow-hidden text-center flex flex-col items-center justify-center">
      {/* Magma-to-Violet Volumetric Glow behind Nova Core Return */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-gradient-to-r from-[#FF2E63]/25 via-[#C77DFF]/20 to-[#00C2FF]/20 blur-[180px] pointer-events-none" />

      {/* Drifting upward particle points simulated with styled spans */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#FFD93D] opacity-40 animate-pulse"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 4 + 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#00FFA3]" />
          <span className="font-mono text-xs tracking-widest uppercase text-zinc-300">
            THE NEXT STEP
          </span>
        </div>

        {/* Headline */}
        <h2 className="font-headline font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight mb-8 text-balance leading-tight">
          Ready to Make Your Idea Impossible to Ignore?
        </h2>

        {/* Supporting text */}
        <p className="font-body text-lg sm:text-xl text-zinc-300 max-w-2xl mb-12 font-normal leading-relaxed">
          Let's turn your vision into a fast, beautiful and memorable digital experience.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-5">
          {/* PRIMARY: Let's Build Something Amazing → */}
          <button
            onClick={onStartProject}
            className="group relative overflow-hidden px-9 py-5 rounded-full text-base sm:text-lg font-bold text-white gradient-magma shadow-[0_0_35px_rgba(255,46,99,0.5)] hover:shadow-[0_0_55px_rgba(255,46,99,0.8)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-3 cursor-pointer"
            data-cursor="BUILD"
          >
            <span className="relative z-10">Let's Build Something Amazing</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </button>

          {/* SECONDARY: View Our Work */}
          <button
            onClick={onViewWork}
            className="px-8 py-5 rounded-full font-semibold text-white/90 hover:text-white bg-white/5 hover:bg-white/10 border border-white/20 hover:border-[#00C2FF] transition-all duration-300 backdrop-blur-md flex items-center gap-2.5 cursor-pointer text-base"
            data-cursor="WORK"
          >
            <Eye className="w-4 h-4 text-[#00C2FF]" />
            <span>View Our Work</span>
          </button>
        </div>
      </div>
    </section>
  );
};
