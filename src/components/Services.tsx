import React, { useRef, useState } from 'react';
import { Palette, Code2, Box, TrendingUp, ArrowRight } from 'lucide-react';

interface BentoCardProps {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
  icon: React.ReactNode;
  className?: string;
  onSelect: () => void;
}

const BentoCard: React.FC<BentoCardProps> = ({
  number,
  title,
  description,
  deliverables,
  icon,
  className = '',
  onSelect,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Calculate 3D tilt (max 8 degrees)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = -((y - centerY) / centerY) * 7;
    const tiltY = ((x - centerX) / centerX) * 7;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-10px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`group relative overflow-hidden rounded-2xl bg-[#0A0E1A]/70 backdrop-blur-2xl border border-[#00C2FF]/15 hover:border-[#FF2E63]/60 p-8 flex flex-col justify-between cursor-pointer transition-colors duration-300 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.7)] ${className}`}
      data-cursor="DISCOVER"
    >
      {/* Mouse-Tracking Radial Gradient Inside Card */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 46, 99, 0.18), rgba(199, 125, 255, 0.08), transparent 70%)`,
          }}
        />
      )}

      {/* Top Header: Chrome Number & Icon */}
      <div className="relative z-10 flex items-start justify-between mb-8">
        <span className="font-headline font-black text-4xl sm:text-5xl text-gradient-chrome tabular-nums">
          {number}
        </span>
        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00FFA3] group-hover:text-[#FF2E63] group-hover:border-[#FF2E63]/40 group-hover:scale-110 transition-all duration-300">
          {icon}
        </div>
      </div>

      {/* Body: Title & Description */}
      <div className="relative z-10 my-auto">
        <h3 className="font-headline font-bold text-2xl sm:text-3xl text-white mb-3 group-hover:text-[#FFD93D] transition-colors">
          {title}
        </h3>
        <p className="font-body text-zinc-300/80 text-sm sm:text-base leading-relaxed mb-6 font-normal">
          {description}
        </p>

        {/* Deliverables Unboxed Metadata List */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400">
          {deliverables.map((item, idx) => (
            <React.Fragment key={idx}>
              <span className="text-zinc-300 group-hover:text-[#00C2FF] transition-colors">{item}</span>
              {idx < deliverables.length - 1 && <span className="text-zinc-600">/</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Footer: Arrow Action */}
      <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs sm:text-sm font-semibold text-zinc-400 group-hover:text-white transition-colors">
        <span>Explore Architecture</span>
        <ArrowRight className="w-4 h-4 text-[#FF2E63] transition-transform duration-300 group-hover:translate-x-2" />
      </div>
    </div>
  );
};

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="relative py-28 px-6 md:px-16 lg:px-24 z-10 overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 right-10 w-[450px] h-[450px] rounded-full bg-[#00C2FF]/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FF2E63] animate-pulse" />
            <span className="font-mono text-xs tracking-widest uppercase text-zinc-400">SERVICES</span>
          </div>
          <h2 className="font-headline font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-4 text-balance">
            What We Build
          </h2>
          <p className="font-body text-base sm:text-lg text-zinc-300 font-normal">
            Digital experiences designed to look exceptional and perform even better.
          </p>
        </div>

        {/* Shock #8: Bento Grid Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 01 (2x2 Large): Web Design */}
          <BentoCard
            number="01"
            title="Web Design"
            description="Beautiful interfaces built around your brand, blending bespoke visual identity with deep usability."
            deliverables={['Brand Direction', 'Design Systems', 'Interactive Prototypes', 'Art Direction']}
            icon={<Palette className="w-6 h-6" />}
            className="lg:col-span-2 lg:row-span-1 min-h-[340px]"
            onSelect={() => onSelectService('Web Design')}
          />

          {/* Card 03 (1x1): 3D & Motion */}
          <BentoCard
            number="03"
            title="3D & Motion"
            description="Memorable interactions with purpose. Custom WebGL shaders, spatial canvases, and fluid physics."
            deliverables={['Three.js & WebGL', 'Custom GLSL Shaders', 'Spatial Visualizers']}
            icon={<Box className="w-6 h-6" />}
            className="min-h-[340px]"
            onSelect={() => onSelectService('3D & Motion')}
          />

          {/* Card 02 (2x1 Wide): Web Development */}
          <BentoCard
            number="02"
            title="Web Development"
            description="Fast, reliable and responsive websites engineered with React, Next.js, and modern TypeScript architectures."
            deliverables={['React & Next.js', 'Clean TypeScript', 'Sub-second Load Times', 'Full Accessibility']}
            icon={<Code2 className="w-6 h-6" />}
            className="lg:col-span-2 min-h-[320px]"
            onSelect={() => onSelectService('Web Development')}
          />

          {/* Card 04 (1x1): Digital Growth */}
          <BentoCard
            number="04"
            title="Digital Growth"
            description="Digital experiences designed to attract customers, rank on search engines, and maximize conversions."
            deliverables={['Advanced SEO', 'Conversion Architecture', 'Performance Tuning']}
            icon={<TrendingUp className="w-6 h-6" />}
            className="min-h-[320px]"
            onSelect={() => onSelectService('Digital Growth')}
          />
        </div>
      </div>
    </section>
  );
};
