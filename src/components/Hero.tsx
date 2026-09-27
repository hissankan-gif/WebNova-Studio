import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, Compass, Sparkles, ChevronDown } from 'lucide-react';
import confetti from 'canvas-confetti';

interface HeroProps {
  onExploreWork: () => void;
  onStartProject: () => void;
  onSupernova: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onStartProject, onSupernova }) => {
  const [countriesCount, setCountriesCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [counterDone, setCounterDone] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // Live number counter on mount (Shock #7)
  useEffect(() => {
    let currentCountries = 0;
    let currentProjects = 0;
    const targetCountries = 12;
    const targetProjects = 50;

    const timer = setInterval(() => {
      let changed = false;
      if (currentCountries < targetCountries) {
        currentCountries += 1;
        setCountriesCount(currentCountries);
        changed = true;
      }
      if (currentProjects < targetProjects) {
        currentProjects += 2;
        setProjectsCount(Math.min(currentProjects, targetProjects));
        changed = true;
      }

      if (!changed) {
        clearInterval(timer);
        setCounterDone(true);
      }
    }, 45);

    return () => clearInterval(timer);
  }, []);

  // Micro particle burst on counter completion
  useEffect(() => {
    if (counterDone) {
      try {
        confetti({
          particleCount: 18,
          spread: 40,
          origin: { y: 0.85, x: 0.2 },
          colors: ['#FF2E63', '#FFD93D', '#00FFA3', '#00C2FF'],
          disableForReducedMotion: true,
        });
      } catch {
        // Safe fallback if confetti isn't supported
      }
    }
  }, [counterDone]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-between px-6 md:px-16 lg:px-24 pt-28 pb-16 overflow-hidden pointer-events-none"
    >
      {/* Background Aurora Radial Glow */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#FF2E63]/15 via-[#C77DFF]/10 to-transparent blur-[120px] pointer-events-none" />

      {/* Hero Left Content Column (Strict Non-Overlapping Layout) */}
      <div className="relative z-10 max-w-2xl lg:max-w-[55%] flex flex-col justify-center pointer-events-auto">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-sm bg-[#00FFA3] rotate-45 shadow-[0_0_8px_#00FFA3]" />
          <span className="font-mono text-xs md:text-sm tracking-widest uppercase text-zinc-300 font-semibold">
            WEBNOVA STUDIO · MMXXIV
          </span>
        </div>

        {/* Shock #6: 3D Headline with Instrument Serif Italic Accent */}
        <h1 className="font-headline font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[76px] leading-[1.06] tracking-tight text-white mb-6 text-balance">
          We Build Digital Experiences That{' '}
          <span className="font-display italic font-normal tracking-normal text-gradient-magma relative inline-block transition-transform duration-300 hover:scale-105">
            Move
          </span>{' '}
          People.
        </h1>

        {/* Supporting Text */}
        <p className="font-body text-base sm:text-lg md:text-xl text-zinc-300/90 leading-relaxed max-w-xl mb-10 font-normal">
          WebNova Studio designs fast, intelligent, and unforgettable websites for brands ready to stand out.
        </p>

        {/* Buttons (Primary & Secondary) */}
        <div className="flex flex-wrap items-center gap-4 mb-12">
          {/* PRIMARY: Explore Our Work */}
          <button
            onClick={onExploreWork}
            className="group relative overflow-hidden px-8 py-4 rounded-full font-semibold text-white gradient-magma shadow-[0_0_30px_rgba(255,46,99,0.4)] hover:shadow-[0_0_45px_rgba(255,46,99,0.7)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-3 cursor-pointer"
            data-cursor="EXPLORE"
          >
            <span className="relative z-10 text-sm md:text-base">Explore Our Work</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          {/* SECONDARY: Start Your Project */}
          <button
            onClick={onStartProject}
            className="group px-7 py-4 rounded-full font-semibold text-white/90 hover:text-white bg-white/5 hover:bg-white/10 border border-[#00C2FF]/30 hover:border-[#00C2FF] transition-all duration-300 backdrop-blur-md shadow-lg flex items-center gap-2 cursor-pointer"
            data-cursor="GET QUOTE"
          >
            <span className="text-sm md:text-base">Start Your Project</span>
            <Compass className="w-4 h-4 text-[#00C2FF] transition-transform duration-300 group-hover:rotate-45" />
          </button>
        </div>

        {/* Shock #7: Live Counter Trust Statement */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs sm:text-sm font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="text-[#FFD93D]">✦</span>
            <span>
              Trusted by founders in{' '}
              <strong className="text-white font-bold tabular-nums">{countriesCount}+</strong> countries
            </span>
          </div>
          <span className="text-zinc-600 hidden sm:inline">·</span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FFA3]" />
            <span>
              <strong className="text-white font-bold tabular-nums">{projectsCount}+</strong> projects delivered
            </span>
          </div>
        </div>
      </div>

      {/* Right Column: Visual Anchor Helper for 3D Planet */}
      <div className="hidden lg:flex flex-col items-center justify-center lg:w-[45%] pointer-events-auto">
        <button
          onClick={onSupernova}
          className="group relative px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-[#00C2FF]/30 text-xs font-mono text-zinc-300 hover:text-white hover:border-[#FF2E63] transition-all duration-300 flex items-center gap-2"
          data-cursor="TRIGGER"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FFD93D] animate-spin" />
          <span>Interactive 3D Nova Core · Click to Trigger Supernova</span>
        </button>
      </div>

      {/* Bottom Scroll Indicator */}
      <a
        href="#services"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-zinc-500 hover:text-zinc-300 transition-colors pointer-events-auto"
        aria-label="Scroll to services"
        data-cursor="SCROLL"
      >
        <span className="font-mono text-[10px] tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
};
