import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, ArrowUpRight, RotateCcw } from 'lucide-react';

interface NavbarProps {
  onStartProject: () => void;
  onReplayIntro: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onStartProject, onReplayIntro }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { label: 'Work', href: '#work', id: 'work' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Process', href: '#process', id: 'process' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Detect active section
      const sections = ['hero', 'work', 'services', 'process', 'about', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 py-4 md:py-6 transition-all duration-300 pointer-events-none">
        <nav
          className={`pointer-events-auto w-full max-w-[1100px] flex items-center justify-between px-5 md:px-7 rounded-full transition-all duration-500 ${
            scrolled
              ? 'py-3 bg-[#0A0E1A]/80 backdrop-blur-2xl border border-[#00C2FF]/30 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.8),0_0_20px_rgba(255,46,99,0.2)]'
              : 'py-4 bg-[#0A0E1A]/40 backdrop-blur-md border border-[#00C2FF]/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]'
          }`}
        >
          {/* Left: WebNova Studio Logo (Single Text Element Wordmark) */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="flex items-center gap-2 group cursor-pointer"
            data-cursor="HOME"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#FF2E63] via-[#FFD93D] to-[#00FFA3] p-[1.5px] transition-transform duration-500 group-hover:rotate-12">
              <div className="w-full h-full bg-black rounded-[7px] flex items-center justify-center">
                <span className="font-display italic text-lg font-bold text-white group-hover:text-[#FFD93D] transition-colors">
                  W
                </span>
              </div>
            </div>
            <span className="font-headline font-bold text-base md:text-lg tracking-tight text-gradient-chrome group-hover:opacity-90 transition-opacity">
              WebNova
            </span>
          </a>

          {/* Center: Clean Typography Links (4-6 Nav Items, Single Row) */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`relative py-1 text-sm tracking-wide transition-colors ${
                    isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                  data-cursor={link.label.toUpperCase()}
                >
                  <span className="flex items-center gap-1.5">
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00FFA3] shadow-[0_0_8px_#00FFA3]" />
                    )}
                    {link.label}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF2E63] via-[#FFD93D] to-[#00FFA3] rounded-full" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {/* Replay Intro Button (Allows re-triggering the 3D cinematic opening) */}
            <button
              onClick={onReplayIntro}
              title="Replay Cinematic Preloader"
              className="hidden lg:flex items-center justify-center w-8 h-8 rounded-full border border-white/10 text-zinc-400 hover:text-white hover:border-[#00C2FF]/40 hover:bg-white/5 transition-all"
              data-cursor="REPLAY"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* "Start a Project" Button (Magma Gradient, Magnetic Hover) */}
            <button
              onClick={onStartProject}
              className="relative group overflow-hidden px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold text-white gradient-magma shadow-[0_0_20px_rgba(255,46,99,0.4)] hover:shadow-[0_0_30px_rgba(255,46,99,0.7)] transition-all duration-300 hover:scale-105 active:scale-95"
              data-cursor="LET'S TALK"
            >
              <span className="relative z-10 flex items-center gap-1.5 whitespace-nowrap">
                Start a Project
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex md:hidden items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Full-Screen Glass Menu with 3D Flip */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-between p-8 bg-[#000000]/95 backdrop-blur-3xl md:hidden animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <span className="font-headline font-bold text-xl text-white">WebNova Studio</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full border border-white/10 text-white hover:bg-white/10"
              aria-label="Close navigation"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col gap-6 my-auto">
            {navLinks.map((link, idx) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="font-headline font-bold text-3xl text-zinc-300 hover:text-white flex items-center justify-between group transition-transform duration-300 hover:translate-x-2"
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                <span>{link.label}</span>
                <span className="font-mono text-xs text-zinc-500 group-hover:text-[#00FFA3]">
                  0{idx + 1}
                </span>
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onStartProject();
              }}
              className="w-full py-4 rounded-xl text-center font-semibold text-white gradient-magma shadow-lg"
            >
              Start a Project
            </button>
            <div className="flex justify-between text-xs font-mono text-zinc-500 pt-2">
              <span>WEBNOVA STUDIO MMXXIV</span>
              <button onClick={onReplayIntro} className="text-[#00FFA3] underline">
                Replay Intro
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
