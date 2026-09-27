import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="relative py-28 px-6 md:px-16 lg:px-24 z-10 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#FFD93D]" />
          <span className="font-mono text-xs tracking-widest uppercase text-zinc-400">
            VERIFICATION
          </span>
        </div>

        <h2 className="font-headline font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-8 text-balance">
          What Clients Say
        </h2>

        {/* Empty State Banner (Strict Compliance: NO fake testimonials) */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0A0E1A]/80 backdrop-blur-2xl border border-white/10 shadow-2xl flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-2xl bg-[#FFD93D]/10 border border-[#FFD93D]/30 flex items-center justify-center text-[#FFD93D] mb-6">
            <Star className="w-7 h-7 fill-[#FFD93D]" />
          </div>

          <p className="font-body text-base sm:text-lg text-zinc-200 max-w-xl leading-relaxed mb-6 font-normal">
            ⭐ Real testimonials coming soon. We're currently collecting verified feedback from our
            recent clients.
          </p>

          <div className="flex items-center gap-2 text-xs font-mono text-[#00FFA3]">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Authentic & Verifiable Client Reviews Policy</span>
          </div>
        </div>
      </div>
    </section>
  );
};
