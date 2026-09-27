import React from 'react';
import { ArrowUpRight, Linkedin, Instagram, Facebook } from 'lucide-react';

interface FooterProps {
  onStartProject: () => void;
  onNavigate: (href: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onStartProject, onNavigate }) => {
  const links = [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative bg-black border-t border-[#00C2FF]/20 pt-20 pb-12 px-6 md:px-16 lg:px-24 z-10 overflow-hidden shadow-[0_-20px_50px_rgba(0,194,255,0.05)]">
      {/* Top Ambient Chrome Horizon Shimmer */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#FF2E63] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Main Footer Row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 pb-16 border-b border-white/10">
          {/* Left Column: Brand & Tagline */}
          <div className="max-w-sm">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('#hero');
              }}
              className="flex items-center gap-2 mb-4 group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#FF2E63] via-[#FFD93D] to-[#00FFA3] p-[1px]">
                <div className="w-full h-full bg-black rounded-[7px] flex items-center justify-center">
                  <span className="font-display italic text-lg font-bold text-white">W</span>
                </div>
              </div>
              <span className="font-headline font-bold text-xl tracking-tight text-white">
                WebNova Studio
              </span>
            </a>
            <p className="font-body text-sm text-zinc-400 leading-relaxed font-normal">
              Modern Websites That Grow Your Business.
            </p>
          </div>

          {/* Center Column: Navigation */}
          <nav className="flex flex-wrap items-center gap-6 sm:gap-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(link.href);
                }}
                className="font-body text-sm text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Column: CTA & Social Icons */}
          <div className="flex items-center gap-4">
            <button
              onClick={onStartProject}
              className="group px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-white gradient-magma shadow-[0_0_20px_rgba(255,46,99,0.3)] hover:shadow-[0_0_30px_rgba(255,46,99,0.6)] transition-all flex items-center gap-1.5"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <div className="flex items-center gap-2">
              <a
                href="https://www.linkedin.com/in/mouzin-khan-6735b539a"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#00C2FF] transition-all"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/mouzinkhan0"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#FF2E63] transition-all"
                aria-label="Instagram Profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#00FFA3] transition-all"
                aria-label="Facebook Profile"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-400">
          <span>© 2026 WebNova Studio. All rights reserved.</span>
          <span className="flex items-center gap-1">
            Built with <span className="text-[#FF2E63]">♥</span> in Pakistan
          </span>
        </div>
      </div>
    </footer>
  );
};
