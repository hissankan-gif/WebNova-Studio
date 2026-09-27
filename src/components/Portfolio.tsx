import React, { useState } from 'react';
import { ExternalLink, ArrowUpRight, Eye } from 'lucide-react';
import { ProjectData, CaseStudy } from './CaseStudy.tsx';

export const portfolioProjects: ProjectData[] = [
  {
    id: 'real-estate-3d',
    title: 'Real Estate Website',
    category: 'Real Estate',
    service: 'UI/UX + Web Dev',
    description: 'Modern property listing with 3D tours, architectural walkthroughs, and geospatial neighborhood insights.',
    overview: 'A premier architectural real estate platform built to give prospective buyers immersive, self-guided spatial tours with real-time floor plan interaction.',
    challenge: 'Rendering high-polygon 3D architectural floor plans on mobile devices while maintaining 60 frames per second and instantaneous page loads.',
    designDirection: 'Deep architectural obsidian backgrounds paired with crisp Cyber Ice borders and warm travertine gold accents to convey luxury property refinement.',
    development: 'Engineered with React 18, Three.js spatial canvas, GLTF model compression, and custom level-of-detail shaders for buttery fluid navigation.',
    result: 'Achieved sub-second initial load with smooth 3D interactive orbit on both desktop and mobile, significantly enhancing buyer engagement time.',
    techStack: ['React', 'TypeScript', 'Three.js', 'Tailwind CSS', 'WebGL', 'Framer Motion'],
    gradient: 'from-[#00FFA3]/20 via-[#00C2FF]/10 to-transparent',
    accentColor: '#00FFA3',
    accentBg: 'bg-gradient-to-tr from-[#0A0E1A] via-[#0D1B2A] to-[#1B263B]',
    statsLabel: 'Average Tour Session Duration',
    statsValue: '4m 38s',
    imageUrl: '/src/assets/images/real_estate_showcase_1790476790674.jpg',
  },
  {
    id: 'business-corporate',
    title: 'Business Website',
    category: 'Websites',
    service: 'Design + Dev',
    description: 'Conversion-focused corporate site delivering clear positioning, trust markers, and lightning-fast responsiveness.',
    overview: 'A modern B2B corporate digital home created for an executive consulting firm to communicate authority and capture enterprise inbound leads.',
    challenge: 'Structuring dense capabilities and complex case studies into a lean, scannable typographic hierarchy that converts visitors into scheduled consultations.',
    designDirection: 'Clean Swiss grid foundation, refined Instrument Serif typography accents, and strict single-elevation card depth without visual clutter.',
    development: 'Architected with Next.js, static site generation, accessible keyboard navigation, and streamlined lead capture forms with instant validation.',
    result: 'Elevated brand credibility and decreased page load latency to under 400ms globally on edge networks.',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel Edge'],
    gradient: 'from-[#00C2FF]/20 via-[#C77DFF]/10 to-transparent',
    accentColor: '#00C2FF',
    accentBg: 'bg-gradient-to-tr from-[#0A0E1A] via-[#12101F] to-[#1E1B4B]',
    statsLabel: 'Global Page Speed Score',
    statsValue: '99/100',
    imageUrl: '/src/assets/images/corporate_tech_showcase_1790476809244.jpg',
  },
  {
    id: 'ecommerce-luxe',
    title: 'E-commerce Experience',
    category: 'E-commerce',
    service: 'UI/UX + Dev',
    description: 'Sleek product store with seamless checkout, micro-interactions, and high-fidelity visual product storytelling.',
    overview: 'A direct-to-consumer lifestyle commerce flagship featuring interactive 360-degree product inspection and frictionless single-step checkout.',
    challenge: 'Crafting expressive motion and micro-interactions without causing layout thrashing or cart abandonment on low-bandwidth mobile connections.',
    designDirection: 'Liquid Aurora palette accents against void obsidian surfaces, highlighting product photography with specular glass highlights and subtle gold accents.',
    development: 'Full-stack headless commerce integration with client-side optimistic UI updates, responsive image sets, and sub-100ms cart interaction latency.',
    result: 'Streamlined purchase funnel resulting in an exceptionally smooth customer experience from discovery to confirmation.',
    techStack: ['React', 'TypeScript', 'Shopify Storefront API', 'Tailwind CSS', 'Motion'],
    gradient: 'from-[#FF2E63]/20 via-[#FFD93D]/10 to-transparent',
    accentColor: '#FF2E63',
    accentBg: 'bg-gradient-to-tr from-[#12101F] via-[#2D0A1E] to-[#0A0E1A]',
    statsLabel: 'Checkout Step Reduction',
    statsValue: '3 Steps → 1',
    imageUrl: '/src/assets/images/ecommerce_luxe_showcase_1790476824690.jpg',
  },
  {
    id: 'personal-portfolio',
    title: 'Personal Portfolio',
    category: 'Portfolios',
    service: 'Creative + Dev',
    description: 'Bold personal brand with cinematic storytelling, smooth cursor dynamics, and interactive showreel galleries.',
    overview: 'A distinctive creative showcase built for an award-winning creative director, spotlighting signature campaign work through interactive spatial cards.',
    challenge: 'Balancing dramatic artistic expression with strict WCAG AA contrast and swift navigation across mobile touch interfaces.',
    designDirection: 'High-contrast typography, holographic horizontal timelines, magnetic cursor tracking, and liquid aurora gradients.',
    development: 'Bespoke canvas shaders, Lenis smooth scrolling, GSAP timeline choreography, and zero-dependency fallbacks for reduced-motion visitors.',
    result: 'Created an unforgettable digital presence featured widely across creative web design communities.',
    techStack: ['Three.js', 'React', 'GSAP', 'GLSL Shaders', 'Lenis'],
    gradient: 'from-[#C77DFF]/20 via-[#FF2E63]/10 to-transparent',
    accentColor: '#C77DFF',
    accentBg: 'bg-gradient-to-tr from-[#12101F] via-[#240046] to-[#0A0E1A]',
    statsLabel: 'Average Visitor Dwell Time',
    statsValue: '3m 12s',
    imageUrl: '/src/assets/images/creative_portfolio_showcase_1790476839248.jpg',
  },
];

interface PortfolioProps {
  onStartProject: () => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onStartProject }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const filters = ['All', 'Websites', 'E-commerce', 'Real Estate', 'Portfolios'];

  const filteredProjects =
    activeFilter === 'All'
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category === activeFilter);

  const handleNextProject = () => {
    if (!selectedProject) return;
    const currentIndex = portfolioProjects.findIndex((p) => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % portfolioProjects.length;
    setSelectedProject(portfolioProjects[nextIndex]);
  };

  return (
    <section id="work" className="relative py-28 px-6 md:px-16 lg:px-24 z-10 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-[#FF2E63]/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header and Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#00FFA3]" />
              <span className="font-mono text-xs tracking-widest uppercase text-zinc-400">
                SELECTED WORK
              </span>
            </div>
            <h2 className="font-headline font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-4 text-balance">
              Selected Work
            </h2>
            <p className="font-body text-base sm:text-lg text-zinc-300 font-normal">
              Ideas transformed into digital experiences.
            </p>
          </div>

          {/* Interactive Filter Pills (Functional Buttons) */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-[#0A0E1A]/80 border border-white/10 backdrop-blur-xl">
            {filters.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#FF2E63] to-[#FFD93D] text-white shadow-[0_0_15px_rgba(255,46,99,0.4)]'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                  data-cursor="FILTER"
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Shock #9: 3D Floating Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative rounded-2xl overflow-hidden bg-[#0A0E1A]/80 backdrop-blur-2xl border border-white/10 hover:border-[#00C2FF]/60 transition-all duration-500 hover:-translate-y-2.5 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.8)] flex flex-col cursor-pointer"
              data-cursor="VIEW"
            >
              {/* Browser Mockup Frame Header */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-[#12101F]/80 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF2E63]/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFD93D]/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00FFA3]/80" />
                </div>
                <span className="font-mono text-[11px] text-zinc-400">
                  {project.category}
                </span>
                <span className="w-2.5 h-2.5" />
              </div>

              {/* Card Canvas Showcase Preview with High-Fidelity Render */}
              <div className="relative w-full h-64 sm:h-72 p-6 sm:p-8 flex flex-col justify-between overflow-hidden bg-black">
                {/* Real High-Fidelity Project Showcase Image */}
                <img
                  src={project.imageUrl}
                  alt={`${project.title} interface preview`}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.08] transition-transform duration-700 ease-out group-hover:scale-108"
                />
                {/* Measured Contrast Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 pointer-events-none" />

                <div className="relative z-10 flex items-start justify-between">
                  <span className="font-mono text-xs text-white px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 shadow-md">
                    {project.service}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                    <ArrowUpRight className="w-4 h-4 text-[#00FFA3]" />
                  </div>
                </div>

                <div className="relative z-10">
                  <span className="font-headline font-bold text-2xl sm:text-3xl text-white tracking-tight block mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    {project.title}
                  </span>
                  <span className="font-mono text-xs text-[#FFD93D] flex items-center gap-1.5 drop-shadow-md">
                    <span>✦</span> {project.statsValue} · {project.statsLabel}
                  </span>
                </div>
              </div>

              {/* Card Metadata & Description Footer */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 bg-[#0A0E1A]">
                <p className="font-body text-zinc-300/80 text-sm leading-relaxed mb-6 font-normal">
                  {project.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  {/* Unboxed Metadata Tech Tags */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400">
                    {project.techStack.slice(0, 3).map((tech, i) => (
                      <React.Fragment key={tech}>
                        <span className="text-zinc-300">{tech}</span>
                        {i < 2 && <span className="text-zinc-600">·</span>}
                      </React.Fragment>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#00C2FF] group-hover:text-white transition-colors">
                    View Case Study <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Modal Viewer */}
      {selectedProject && (
        <CaseStudy
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onNextProject={handleNextProject}
          onStartProject={onStartProject}
        />
      )}
    </section>
  );
};
