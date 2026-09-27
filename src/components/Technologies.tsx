import React, { useState } from 'react';

export const Technologies: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const technologies = [
    { name: 'HTML5', category: 'Semantics', color: '#FF2E63' },
    { name: 'CSS3', category: 'Styling', color: '#00C2FF' },
    { name: 'JavaScript', category: 'Logic', color: '#FFD93D' },
    { name: 'React', category: 'UI Library', color: '#00C2FF' },
    { name: 'Next.js', category: 'Framework', color: '#FFFFFF' },
    { name: 'TypeScript', category: 'Type Safety', color: '#00FFA3' },
    { name: 'Tailwind', category: 'Utility CSS', color: '#00C2FF' },
    { name: 'Three.js', category: '3D WebGL', color: '#C77DFF' },
    { name: 'Figma', category: 'Interface Design', color: '#FF2E63' },
    { name: 'Git', category: 'Version Control', color: '#FFD93D' },
  ];

  return (
    <section id="technologies" className="relative py-28 px-6 md:px-16 lg:px-24 z-10 overflow-hidden">
      {/* Background Volumetric Mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#00FFA3]/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FFD93D]" />
            <span className="font-mono text-xs tracking-widest uppercase text-zinc-400">
              ECOSYSTEM
            </span>
          </div>
          <h2 className="font-headline font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-4 text-balance">
            Built With Modern Technology
          </h2>
          <p className="font-body text-base sm:text-lg text-zinc-300 font-normal">
            Powerful tools behind fast, scalable and beautiful digital experiences.
          </p>
        </div>

        {/* Orbital Ecosystem Interactive Stage */}
        <div
          className="relative w-full max-w-3xl aspect-square mx-auto flex items-center justify-center my-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false);
            setHoveredTech(null);
          }}
        >
          {/* Orbital Concentric Background Rings */}
          <div className="absolute w-[240px] h-[240px] rounded-full border border-white/5 pointer-events-none" />
          <div className="absolute w-[440px] h-[440px] rounded-full border border-white/10 pointer-events-none" />
          <div className="absolute w-[640px] h-[640px] rounded-full border border-white/5 pointer-events-none" />

          {/* Central Chrome WebNova Emblem */}
          <div className="relative z-20 w-24 h-24 rounded-3xl bg-[#0A0E1A] border border-[#00C2FF]/40 shadow-[0_0_50px_rgba(0,194,255,0.3)] p-1 flex items-center justify-center">
            <div className="w-full h-full rounded-[22px] bg-gradient-to-tr from-[#FF2E63]/20 via-[#FFD93D]/20 to-[#00FFA3]/20 flex flex-col items-center justify-center">
              <span className="font-display italic text-3xl font-bold text-gradient-chrome">
                W
              </span>
              <span className="font-mono text-[9px] text-zinc-400 tracking-wider">CORE</span>
            </div>
          </div>

          {/* Orbiting Tech Badges */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-all duration-300"
            style={{
              animation: isPaused ? 'none' : 'spinOrbit 40s linear infinite',
            }}
          >
            {technologies.map((tech, index) => {
              const total = technologies.length;
              const angle = (index / total) * (Math.PI * 2);
              // Radius varies to create dynamic layered orbits
              const radius = index % 2 === 0 ? 210 : 280;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              const isCurrentHovered = hoveredTech === tech.name;

              return (
                <div
                  key={tech.name}
                  className="absolute cursor-pointer transition-transform duration-300 pointer-events-auto"
                  style={{
                    transform: `translate(${x}px, ${y}px) ${
                      isPaused ? '' : 'rotate(0deg)'
                    }`,
                  }}
                  onMouseEnter={() => setHoveredTech(tech.name)}
                  data-cursor={tech.name.toUpperCase()}
                >
                  {/* Badge Counter-Rotation so text stays upright */}
                  <div
                    className={`px-4 py-2 rounded-xl backdrop-blur-xl border transition-all duration-300 flex items-center gap-2 shadow-lg ${
                      isCurrentHovered
                        ? 'scale-125 bg-black border-[#FF2E63] shadow-[0_0_25px_rgba(255,46,99,0.6)] z-30'
                        : 'bg-[#0A0E1A]/80 border-white/10 hover:border-white/40'
                    }`}
                    style={{
                      animation: isPaused ? 'none' : 'counterSpin 40s linear infinite',
                    }}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: tech.color }}
                    />
                    <span className="font-headline font-semibold text-xs sm:text-sm text-white">
                      {tech.name}
                    </span>
                    <span className="font-mono text-[10px] text-zinc-400 hidden sm:inline">
                      {tech.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Static Mobile Grid Fallback for clean touch accessibility */}
        <div className="flex flex-wrap justify-center gap-3 md:hidden mt-8">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="px-3.5 py-1.5 rounded-lg bg-[#0A0E1A] border border-white/10 text-xs font-mono text-zinc-300 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tech.color }} />
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spinOrbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes counterSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
      `}</style>
    </section>
  );
};
