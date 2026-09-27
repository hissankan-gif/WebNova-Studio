/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import { Preloader } from './components/Preloader.tsx';
import { MagneticCursor } from './components/MagneticCursor.tsx';
import { SmoothScroll } from './components/SmoothScroll.tsx';
import { NovaCore } from './components/NovaCore.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { Marquee } from './components/Marquee.tsx';
import { Services } from './components/Services.tsx';
import { Portfolio } from './components/Portfolio.tsx';
import { Process } from './components/Process.tsx';
import { About } from './components/About.tsx';
import { Technologies } from './components/Technologies.tsx';
import { Testimonials } from './components/Testimonials.tsx';
import { FinalCTA } from './components/FinalCTA.tsx';
import { Contact } from './components/Contact.tsx';
import { Footer } from './components/Footer.tsx';
import { NovaIntelligenceModal } from './components/NovaIntelligenceModal.tsx';

export default function App() {
  const [preloaderComplete, setPreloaderComplete] = useState(false);
  const [forcePreloader, setForcePreloader] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // Replay intro preloader
  const handleReplayIntro = useCallback(() => {
    localStorage.removeItem('webnova_preloader_seen');
    setForcePreloader(true);
    setPreloaderComplete(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderComplete(true);
    setForcePreloader(false);
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyAiPlan = (planSummary: string) => {
    handleScrollTo('#contact');
    const textarea = document.getElementById('projectDetails') as HTMLTextAreaElement | null;
    if (textarea) {
      textarea.value = `[AI ARCHITECTURE PLAN]\n${planSummary}\n\n[ADDITIONAL NOTES]\n`;
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
    }
  };

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-black text-white selection:bg-[#FF2E63] selection:text-white overflow-x-hidden font-body">
        {/* Skip to Content Link (Accessibility WCAG AA) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#00FFA3] focus:text-black focus:font-bold focus:rounded-lg focus:outline-none"
        >
          Skip to main content
        </a>

        {/* Shock #1: Cinematic Preloader */}
        <Preloader onComplete={handlePreloaderComplete} forceShow={forcePreloader} />

        {/* Shock #5: Magnetic Cursor + Liquid Trail */}
        <MagneticCursor />

        {/* Shock #2, #3, #10: Nova Core 2.0 WebGL 3D System */}
        <NovaCore />

        {/* Floating Glass Navbar */}
        <Navbar
          onStartProject={() => handleScrollTo('#contact')}
          onReplayIntro={handleReplayIntro}
        />

        {/* Main Content Sections Layered Seamlessly over 3D Canvas */}
        <main id="main-content" className="relative z-10">
          {/* Section 1: Hero */}
          <Hero
            onExploreWork={() => handleScrollTo('#work')}
            onStartProject={() => handleScrollTo('#contact')}
            onSupernova={() => {
              // Supernova trigger dispatch
              const canvas = document.querySelector('canvas');
              if (canvas) {
                canvas.dispatchEvent(new MouseEvent('click', { bubbles: true }));
              }
            }}
          />

          {/* Section 2: Trusted-By Marquee */}
          <Marquee />

          {/* Section 3: Bento Services Grid */}
          <Services
            onSelectService={(service) => {
              handleScrollTo('#contact');
              const select = document.getElementById('projectType') as HTMLSelectElement | null;
              if (select) {
                if (service.includes('Design')) select.value = 'Website';
                else if (service.includes('Development')) select.value = 'Web App';
                else if (service.includes('3D')) select.value = 'Other';
                select.dispatchEvent(new Event('change', { bubbles: true }));
              }
            }}
          />

          {/* Section 4: 3D Portfolio Gallery & Case Studies */}
          <Portfolio onStartProject={() => handleScrollTo('#contact')} />

          {/* Section 5: Holographic Process Timeline */}
          <Process />

          {/* Section 6: Split About Section with 3D Chrome Artifact */}
          <About />

          {/* Section 7: Orbital Technologies Ecosystem */}
          <Technologies />

          {/* Section 8: Testimonials (Authentic Empty State) */}
          <Testimonials />

          {/* Section 9: Final CTA with 3D Planet Return */}
          <FinalCTA
            onStartProject={() => handleScrollTo('#contact')}
            onViewWork={() => handleScrollTo('#work')}
          />

          {/* Section 10: Web3Forms Contact Integration */}
          <Contact onOpenAiArchitect={() => setIsAiModalOpen(true)} />
        </main>

        {/* Footer */}
        <Footer
          onStartProject={() => handleScrollTo('#contact')}
          onNavigate={(href) => handleScrollTo(href)}
        />

        {/* Nova Intelligence AI Architect Modal */}
        <NovaIntelligenceModal
          isOpen={isAiModalOpen}
          onClose={() => setIsAiModalOpen(false)}
          onApplyPlanToContact={handleApplyAiPlan}
        />
      </div>
    </SmoothScroll>
  );
}
