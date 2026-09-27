import React, { useEffect, useState, useRef } from 'react';

interface TrailDot {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
}

export const MagneticCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'button' | 'card' | 'interactive'>('default');

  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<TrailDot[]>([]);
  const [, setRenderTrigger] = useState(0);

  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const mouseSpeed = useRef(0);
  const lastMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    setIsVisible(true);

    let trailCounter = 0;
    const colors = ['#FF2E63', '#FFD93D', '#00FFA3', '#00C2FF', '#C77DFF'];

    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };

      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      mouseSpeed.current = Math.sqrt(dx * dx + dy * dy);
      lastMousePos.current = { x: e.clientX, y: e.clientY };

      // Spawn liquid chrome beads along trail
      if (mouseSpeed.current > 4) {
        trailCounter++;
        if (trailCounter % 3 === 0) {
          const newDot: TrailDot = {
            id: Math.random(),
            x: e.clientX + (Math.random() - 0.5) * 8,
            y: e.clientY + (Math.random() - 0.5) * 8,
            size: Math.min(10, Math.max(3, mouseSpeed.current * 0.2)),
            opacity: 0.7,
            color: colors[Math.floor(Math.random() * colors.length)],
          };
          trailsRef.current.push(newDot);
          if (trailsRef.current.length > 18) {
            trailsRef.current.shift();
          }
        }
      }

      // Check interactive hover target
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactiveEl = target.closest('[data-cursor]');
        if (interactiveEl) {
          const customText = interactiveEl.getAttribute('data-cursor');
          setCursorText(customText || '');
          setIsHovered(true);
          setCursorType('button');
        } else if (target.closest('button, a, input, select, textarea')) {
          setCursorText('');
          setIsHovered(true);
          setCursorType('button');
        } else if (target.closest('.glass-card, [data-card]')) {
          setCursorText('VIEW →');
          setIsHovered(true);
          setCursorType('card');
        } else {
          setCursorText('');
          setIsHovered(false);
          setCursorType('default');
        }
      }
    };

    const onMouseDown = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = 'scale(0.8)';
      }
    };

    const onMouseUp = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = 'scale(1)';
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Animation loop for smooth lerping
    let animId: number;
    const update = () => {
      // Lerp ring towards cursor position
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.18;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${pos.current.x}px`;
        cursorRef.current.style.top = `${pos.current.y}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }

      // Decay trail dots
      if (trailsRef.current.length > 0) {
        let changed = false;
        trailsRef.current.forEach((dot) => {
          dot.opacity *= 0.88;
          dot.size *= 0.94;
          if (dot.opacity < 0.05) changed = true;
        });
        trailsRef.current = trailsRef.current.filter((dot) => dot.opacity >= 0.05);
        if (changed || trailsRef.current.length > 0) {
          setRenderTrigger((prev) => prev + 1);
        }
      }

      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Liquid Metal Dissolving Trail */}
      {trailsRef.current.map((dot) => (
        <div
          key={dot.id}
          className="absolute rounded-full blur-[1px] transition-transform duration-75"
          style={{
            left: `${dot.x}px`,
            top: `${dot.y}px`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            backgroundColor: dot.color,
            opacity: dot.opacity,
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 ${dot.size * 2}px ${dot.color}`,
          }}
        />
      ))}

      {/* Outer Follower Ring / Morphing Orb */}
      <div
        ref={ringRef}
        className={`absolute rounded-full transition-all duration-200 ease-out -translate-x-1/2 -translate-y-1/2 flex items-center justify-center ${
          isHovered
            ? 'w-16 h-16 bg-white/10 backdrop-blur-md border border-[#FF2E63] shadow-[0_0_25px_rgba(255,46,99,0.5)]'
            : 'w-10 h-10 border border-[#00C2FF]/40 bg-[#00C2FF]/5 shadow-[0_0_15px_rgba(0,194,255,0.2)]'
        }`}
      >
        {cursorText && (
          <span className="text-[10px] font-mono tracking-wider font-semibold text-white uppercase text-center px-1 leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {cursorText}
          </span>
        )}
      </div>

      {/* Center Liquid Chrome Orb */}
      <div
        ref={cursorRef}
        className="absolute w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_#FFD93D] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #FFD93D 40%, #FF2E63 100%)',
        }}
      />
    </div>
  );
};
