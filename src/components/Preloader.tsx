import React, { useEffect, useState, useRef } from 'react';

interface PreloaderProps {
  onComplete: () => void;
  forceShow?: boolean;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete, forceShow = false }) => {
  const [phase, setPhase] = useState<'drop' | 'splash' | 'crystallize' | 'shatter' | 'done'>('drop');
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (forceShow) {
      setPhase('drop');
      setProgress(0);
    }
  }, [forceShow]);

  useEffect(() => {
    // Check localStorage unless forced
    const hasSeen = localStorage.getItem('webnova_preloader_seen');
    if (hasSeen && !forceShow) {
      onComplete();
      return;
    }

    // Step 1: Liquid droplet falling
    const timer1 = setTimeout(() => {
      setPhase('splash');
    }, 900);

    // Step 2: Logo crystallization
    const timer2 = setTimeout(() => {
      setPhase('crystallize');
    }, 1800);

    // Step 3: Shatter into explosion
    const timer3 = setTimeout(() => {
      setPhase('shatter');
    }, 2700);

    // Step 4: Complete and fade out
    const timer4 = setTimeout(() => {
      setPhase('done');
      localStorage.setItem('webnova_preloader_seen', 'true');
      onComplete();
    }, 3400);

    // Simulated progress counter
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 55);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearInterval(progressInterval);
    };
  }, [forceShow, onComplete]);

  // Particle explosion canvas animation during shatter phase
  useEffect(() => {
    if (phase !== 'shatter') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
    }> = [];

    const colors = ['#FF2E63', '#FFD93D', '#00FFA3', '#00C2FF', '#C77DFF', '#FFFFFF'];
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let i = 0; i < 400; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 14 + 2;
      particles.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 4 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
      });
    }

    let animId: number;
    const render = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha *= 0.96;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      if (phase === 'shatter') {
        animId = requestAnimationFrame(render);
      }
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  const handleSkip = () => {
    localStorage.setItem('webnova_preloader_seen', 'true');
    setPhase('done');
    onComplete();
  };

  if (phase === 'done') return null;

  return (
    <div
      role="status"
      aria-label="Loading cinematic 3D experience"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black select-none overflow-hidden transition-opacity duration-700"
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-20" />

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute top-8 right-8 z-30 px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white border border-white/10 rounded-full hover:border-[#FF2E63] hover:bg-white/5 transition-all"
      >
        Skip [ESC]
      </button>

      {/* Droplet Fall & Splash Container */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-md h-80">
        {/* Phase 1: Falling Droplet */}
        {phase === 'drop' && (
          <div className="absolute top-0 w-4 h-6 rounded-full bg-gradient-to-b from-[#C77DFF] via-[#00C2FF] to-[#00FFA3] animate-bounce filter drop-shadow-[0_0_12px_#00FFA3] transition-all duration-700 ease-in" />
        )}

        {/* Phase 2: Liquid Splash into Logo */}
        <div
          className={`relative z-10 flex flex-col items-center transition-all duration-700 ${
            phase === 'drop'
              ? 'opacity-0 scale-75'
              : phase === 'splash'
              ? 'opacity-90 scale-95'
              : phase === 'crystallize'
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-150 filter blur-sm'
          }`}
        >
          {/* Emblem */}
          <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
            <div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#FF2E63] via-[#FFD93D] to-[#00FFA3] p-[2px] transition-transform duration-1000 ${
                phase === 'crystallize' ? 'rotate-45 shadow-[0_0_50px_rgba(255,46,99,0.8)]' : 'rotate-0'
              }`}
            >
              <div className="w-full h-full bg-black/90 rounded-2xl flex items-center justify-center">
                <span className="font-display italic text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD93D] to-[#00FFA3]">
                  W
                </span>
              </div>
            </div>
            {/* Shimmer light bar across emblem */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -rotate-45 animate-pulse" />
          </div>

          {/* Studio Wordmark */}
          <h1 className="font-headline font-extrabold text-3xl md:text-4xl tracking-tight text-white flex items-center gap-2">
            WEBNOVA
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded border border-[#00FFA3]/50 text-[#00FFA3] bg-[#00FFA3]/10">
              STUDIO
            </span>
          </h1>

          <p className="mt-3 font-mono text-xs tracking-widest text-zinc-400 uppercase">
            {phase === 'crystallize' ? 'Harmonizing WebGL Shaders...' : 'Initializing Nova Engine...'}
          </p>
        </div>

        {/* Real Chrome Horizon Reflection Line */}
        <div
          className={`w-64 h-[1px] mt-8 bg-gradient-to-r from-transparent via-[#00C2FF] to-transparent transition-opacity duration-500 ${
            phase === 'drop' ? 'opacity-0' : 'opacity-80'
          }`}
        />
      </div>

      {/* Bottom Counter HUD */}
      <div className="absolute bottom-10 left-10 right-10 flex items-center justify-between font-mono text-xs text-zinc-500 z-10">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00FFA3] animate-ping" />
          CINEMATIC EXPERIENCE V2.4
        </span>
        <span className="tabular-nums text-zinc-300 font-semibold">{progress}%</span>
      </div>
    </div>
  );
};
