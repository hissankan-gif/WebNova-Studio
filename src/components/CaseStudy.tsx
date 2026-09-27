import React, { useEffect } from 'react';
import { ArrowLeft, ExternalLink, CheckCircle, Code, Layers, Smartphone, ArrowRight } from 'lucide-react';

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  service: string;
  description: string;
  overview: string;
  challenge: string;
  designDirection: string;
  development: string;
  result: string;
  techStack: string[];
  gradient: string;
  accentColor: string;
  accentBg: string;
  statsLabel: string;
  statsValue: string;
  imageUrl: string;
}

interface CaseStudyProps {
  project: ProjectData;
  onClose: () => void;
  onNextProject: () => void;
  onStartProject: () => void;
}

export const CaseStudy: React.FC<CaseStudyProps> = ({
  project,
  onClose,
  onNextProject,
  onStartProject,
}) => {
  // Lock body scroll while case study modal is active
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-3xl text-white animate-in fade-in zoom-in-95 duration-300"
    >
      {/* Sticky Top-Left "Back to Work" Button */}
      <div className="sticky top-6 left-6 z-40 px-6 py-4 flex items-center justify-between pointer-events-none">
        <button
          onClick={onClose}
          className="pointer-events-auto group px-5 py-2.5 rounded-full bg-[#0A0E1A]/80 backdrop-blur-xl border border-white/20 text-white hover:border-[#FF2E63] hover:bg-white/10 transition-all duration-300 shadow-xl flex items-center gap-2 text-sm font-semibold cursor-pointer"
          data-cursor="BACK"
        >
          <ArrowLeft className="w-4 h-4 text-[#FF2E63] transition-transform duration-300 group-hover:-translate-x-1" />
          <span>Back to Work</span>
        </button>

        <span className="font-mono text-xs text-zinc-400 hidden sm:inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
          CASE STUDY · {project.category.toUpperCase()}
        </span>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">
        {/* 1. Hero Section */}
        <div className="relative mb-16 text-center md:text-left">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: project.accentColor }} />
            <span className="font-mono text-xs tracking-widest uppercase text-zinc-400">
              {project.service}
            </span>
          </div>

          <h1 id="case-study-title" className="font-headline font-bold text-4xl sm:text-5xl md:text-6xl text-white mb-6 tracking-tight text-balance">
            {project.title}
          </h1>

          <p className="font-body text-lg md:text-xl text-zinc-300 leading-relaxed max-w-3xl mb-8">
            {project.description}
          </p>

          {/* Browser Frame Showcase Mockup */}
          <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#0A0E1A] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.9)]">
            {/* Browser chrome header bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#12101F] border-b border-white/10">
              <span className="w-3 h-3 rounded-full bg-[#FF2E63]/80" />
              <span className="w-3 h-3 rounded-full bg-[#FFD93D]/80" />
              <span className="w-3 h-3 rounded-full bg-[#00FFA3]/80" />
              <span className="ml-4 font-mono text-xs text-zinc-400 bg-black/40 px-4 py-1 rounded-md border border-white/5">
                https://{project.id}.webnovastudio.com
              </span>
            </div>

            {/* Interactive Browser Canvas Artwork with High-Fidelity Generated Showcase */}
            <div className="relative w-full min-h-[380px] md:min-h-[500px] overflow-hidden flex flex-col justify-between p-8 md:p-12">
              {/* Showcase Image with Scrim */}
              <img
                src={project.imageUrl}
                alt={`${project.title} live interface preview`}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.08] transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

              <div className="relative z-10 flex justify-between items-start">
                <span className="font-headline font-bold text-2xl tracking-tight text-white drop-shadow-lg">
                  {project.title}
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-mono text-[#00FFA3] shadow-lg">
                  Live View Preview
                </span>
              </div>

              <div className="relative z-10 max-w-md p-6 rounded-2xl bg-black/75 backdrop-blur-xl border border-white/15 shadow-2xl">
                <span className="font-mono text-xs text-[#00FFA3] mb-1 block">Key Performance Metric</span>
                <div className="font-headline font-bold text-3xl text-white mb-1">{project.statsValue}</div>
                <div className="font-body text-xs text-zinc-300">{project.statsLabel}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Overview & Challenge Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-12 border-t border-white/10">
          <div>
            <h2 className="font-headline font-bold text-2xl text-white mb-4 flex items-center gap-2">
              <span className="text-[#00FFA3]">01</span> Project Overview
            </h2>
            <p className="font-body text-zinc-300 leading-relaxed font-normal">
              {project.overview}
            </p>
          </div>

          <div>
            <h2 className="font-headline font-bold text-2xl text-white mb-4 flex items-center gap-2">
              <span className="text-[#FF2E63]">02</span> The Challenge
            </h2>
            <p className="font-body text-zinc-300 leading-relaxed font-normal">
              {project.challenge}
            </p>
          </div>
        </div>

        {/* 3. Design Direction & Development */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-12 border-t border-white/10">
          <div>
            <h2 className="font-headline font-bold text-2xl text-white mb-4 flex items-center gap-2">
              <span className="text-[#FFD93D]">03</span> Design Direction
            </h2>
            <p className="font-body text-zinc-300 leading-relaxed font-normal">
              {project.designDirection}
            </p>
          </div>

          <div>
            <h2 className="font-headline font-bold text-2xl text-white mb-4 flex items-center gap-2">
              <span className="text-[#00C2FF]">04</span> Technical Development
            </h2>
            <p className="font-body text-zinc-300 leading-relaxed font-normal">
              {project.development}
            </p>
          </div>
        </div>

        {/* 4. Tech Stack */}
        <div className="py-12 border-t border-white/10">
          <h2 className="font-headline font-bold text-2xl text-white mb-6">Engineered With</h2>
          <div className="flex flex-wrap gap-3">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-mono text-zinc-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* 5. Result Statement */}
        <div className="py-12 border-t border-white/10 rounded-2xl bg-gradient-to-r from-[#FF2E63]/10 via-[#00C2FF]/10 to-transparent p-8 md:p-12 mb-12">
          <h2 className="font-headline font-bold text-2xl text-white mb-3">Project Result</h2>
          <p className="font-body text-lg text-zinc-200 leading-relaxed mb-6 font-normal">
            {project.result}
          </p>
          <div className="flex items-center gap-2 text-sm font-mono text-[#00FFA3]">
            <CheckCircle className="w-4 h-4" />
            <span>Delivered on schedule with 100% responsive and accessible compliance</span>
          </div>
        </div>

        {/* 6. Next Project & CTA Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-12 border-t border-white/10">
          <button
            onClick={onNextProject}
            className="group flex items-center gap-3 font-headline font-semibold text-lg text-zinc-300 hover:text-white transition-colors"
          >
            <span>Next Case Study</span>
            <ArrowRight className="w-5 h-5 text-[#00FFA3] transition-transform duration-300 group-hover:translate-x-2" />
          </button>

          <button
            onClick={() => {
              onClose();
              onStartProject();
            }}
            className="px-8 py-3.5 rounded-full font-semibold text-white gradient-magma shadow-lg hover:scale-105 transition-all"
          >
            Build Something Similar
          </button>
        </div>
      </div>
    </div>
  );
};
