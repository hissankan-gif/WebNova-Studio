import React from 'react';

export const Marquee: React.FC = () => {
  const brands = [
    { name: 'VORTEX LABS', category: 'Creative AI' },
    { name: 'AURA ARCHITECTURE', category: 'Spatial Design' },
    { name: 'SYNAPSE PROTOCOL', category: 'Decentralized Tech' },
    { name: 'MONOLITH DYNAMICS', category: 'Hardware' },
    { name: 'KINETIC CAPITAL', category: 'Venture Studio' },
    { name: 'PULSE VENTURES', category: 'Growth Equity' },
    { name: 'NEXUS QUANTUM', category: 'Deep Tech' },
    { name: 'HYPERION MEDIA', category: 'Publishing' },
  ];

  return (
    <div className="relative w-full py-8 border-y border-white/5 bg-[#000000]/60 backdrop-blur-md overflow-hidden select-none z-10">
      <div className="flex w-max items-center animate-[marquee_28s_linear_infinite] hover:[animation-play-state:paused]">
        {/* Render 3 copies to create a seamless infinite loop */}
        {[...brands, ...brands, ...brands].map((brand, i) => (
          <div key={i} className="flex items-center mx-8 group">
            <span className="font-headline font-bold text-lg md:text-xl tracking-wider text-zinc-500 group-hover:text-white transition-colors duration-300">
              {brand.name}
            </span>
            <span className="ml-3 font-mono text-[10px] text-zinc-600 group-hover:text-[#00FFA3] transition-colors">
              {brand.category}
            </span>
            <span className="ml-8 text-zinc-700">✦</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
};
