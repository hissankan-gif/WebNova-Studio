import React, { useState, useEffect } from 'react';
import { Search, PenTool, Terminal, CheckCircle2, Rocket } from 'lucide-react';

export const Process: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: '01',
      title: 'Discover',
      description: 'Understand the idea, brand and goals.',
      detail: 'Deep dive into your market landscape, competitive differentiators, and core conversion metrics.',
      icon: <Search className="w-5 h-5" />,
      color: '#FF2E63',
    },
    {
      number: '02',
      title: 'Design',
      description: 'Create the visual direction and system.',
      detail: 'Crafting bespoke typography hierarchies, spatial layout prototypes, and brand-native visual languages.',
      icon: <PenTool className="w-5 h-5" />,
      color: '#FFD93D',
    },
    {
      number: '03',
      title: 'Build',
      description: 'Develop a fast, scalable, responsive website.',
      detail: 'Writing clean TypeScript, performant 3D WebGL canvases, and accessible semantic components.',
      icon: <Terminal className="w-5 h-5" />,
      color: '#00FFA3',
    },
    {
      number: '04',
      title: 'Refine',
      description: 'Test every pixel, interaction and device.',
      detail: 'Rigorous cross-browser stress testing, Lighthouse 90+ performance audits, and WCAG AA verification.',
      icon: <CheckCircle2 className="w-5 h-5" />,
      color: '#00C2FF',
    },
    {
      number: '05',
      title: 'Launch',
      description: 'Publish, support and grow.',
      detail: 'Seamless global edge deployment, DNS configuration, search indexing, and post-launch analytics tracking.',
      icon: <Rocket className="w-5 h-5" />,
      color: '#C77DFF',
    },
  ];

  // Auto-advance active step on interval if user isn't hovering
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <section id="process" className="relative py-28 px-6 md:px-16 lg:px-24 z-10 overflow-hidden">
      {/* Background Volumetric Glow */}
      <div className="absolute top-1/2 left-10 w-[500px] h-[500px] rounded-full bg-[#C77DFF]/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-20 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#00C2FF] animate-pulse" />
            <span className="font-mono text-xs tracking-widest uppercase text-zinc-400">
              METHODOLOGY
            </span>
          </div>
          <h2 className="font-headline font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-4 text-balance">
            From Idea to Launch
          </h2>
          <p className="font-body text-base sm:text-lg text-zinc-300 font-normal">
            A refined process. No chaos. Just clarity.
          </p>
        </div>

        {/* Desktop Horizontal Holographic Timeline */}
        <div className="hidden lg:block relative mb-16">
          {/* Glowing Chrome Connecting Line */}
          <div className="absolute top-8 left-12 right-12 h-[2px] bg-white/10 z-0">
            <div
              className="h-full bg-gradient-to-r from-[#FF2E63] via-[#FFD93D] to-[#00FFA3] transition-all duration-700 shadow-[0_0_12px_#00FFA3]"
              style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            />
          </div>

          {/* Timeline Nodes */}
          <div className="grid grid-cols-5 gap-6 relative z-10">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className={`flex flex-col items-center text-center cursor-pointer transition-all duration-300 group ${
                    isActive ? 'scale-105' : 'opacity-70 hover:opacity-100'
                  }`}
                  data-cursor="STEP"
                >
                  {/* Node Circle */}
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-500 border ${
                      isActive
                        ? 'bg-black text-white shadow-[0_0_25px_rgba(255,46,99,0.6)] border-[#FF2E63]'
                        : 'bg-[#0A0E1A] text-zinc-400 border-white/10 group-hover:border-white/30'
                    }`}
                    style={isActive ? { borderColor: step.color, boxShadow: `0 0 25px ${step.color}80` } : {}}
                  >
                    <div className="transition-transform duration-300 group-hover:scale-110">
                      {step.icon}
                    </div>
                  </div>

                  <span
                    className="font-headline font-bold text-xs uppercase tracking-wider mb-2 font-mono"
                    style={{ color: step.color }}
                  >
                    Phase {step.number}
                  </span>

                  <h3 className="font-headline font-bold text-xl text-white mb-2">
                    {step.title}
                  </h3>

                  <p className="font-body text-xs text-zinc-400 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Active Step Detailed Card */}
          <div className="mt-14 p-8 rounded-2xl bg-[#0A0E1A]/80 backdrop-blur-2xl border border-white/10 shadow-2xl flex items-center justify-between">
            <div className="max-w-2xl">
              <span className="font-mono text-xs text-zinc-400 mb-2 block uppercase tracking-widest">
                Current Phase Focus · Step {steps[activeStep].number}
              </span>
              <h4 className="font-headline font-bold text-2xl text-white mb-2">
                {steps[activeStep].title}: {steps[activeStep].description}
              </h4>
              <p className="font-body text-sm text-zinc-300 leading-relaxed font-normal">
                {steps[activeStep].detail}
              </p>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white text-xl font-bold font-mono">
              {steps[activeStep].number}
            </div>
          </div>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="flex flex-col gap-6 lg:hidden">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <div
                key={step.number}
                onClick={() => setActiveStep(idx)}
                className={`p-6 rounded-2xl border transition-all duration-300 ${
                  isActive
                    ? 'bg-[#0A0E1A] border-[#FF2E63] shadow-lg'
                    : 'bg-[#0A0E1A]/60 border-white/10'
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white"
                    style={{ backgroundColor: `${step.color}25`, border: `1px solid ${step.color}` }}
                  >
                    {step.icon}
                  </div>
                  <div>
                    <span className="font-mono text-xs text-zinc-400 block">Phase {step.number}</span>
                    <h3 className="font-headline font-bold text-xl text-white">{step.title}</h3>
                  </div>
                </div>
                <p className="font-body text-sm text-zinc-300 mb-2">{step.description}</p>
                {isActive && (
                  <p className="font-body text-xs text-zinc-400 pt-2 border-t border-white/10">
                    {step.detail}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
