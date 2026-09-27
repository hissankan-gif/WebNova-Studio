import React, { useRef, useEffect } from 'react';
import { Sparkles, Zap, HeartHandshake } from 'lucide-react';
import * as THREE from 'three';

export const About: React.FC = () => {
  const canvasMountRef = useRef<HTMLDivElement>(null);

  // Right-side 3D abstract chrome morphing shape
  useEffect(() => {
    const container = canvasMountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // TorusKnot abstract chrome sculpture
    const geometry = new THREE.TorusKnotGeometry(1.0, 0.32, 100, 16);
    const material = new THREE.MeshPhysicalMaterial({
      metalness: 1.0,
      roughness: 0.08,
      clearcoat: 1.0,
      iridescence: 1.0,
      iridescenceIOR: 1.6,
      reflectivity: 0.9,
      color: 0xffffff,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Lighting
    const lightPink = new THREE.PointLight(0xff2e63, 5, 10);
    lightPink.position.set(2, 2, 2);
    scene.add(lightPink);

    const lightIce = new THREE.PointLight(0x00c2ff, 5, 10);
    lightIce.position.set(-2, -2, 2);
    scene.add(lightIce);

    const lightMint = new THREE.DirectionalLight(0x00ffa3, 2);
    lightMint.position.set(0, 3, -2);
    scene.add(lightMint);

    let animId: number;
    let clock = new THREE.Clock();

    const render = () => {
      animId = requestAnimationFrame(render);
      const elapsed = clock.getElapsedTime();
      mesh.rotation.x = elapsed * 0.4;
      mesh.rotation.y = elapsed * 0.6;
      renderer.render(scene, camera);
    };

    render();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  const values = [
    {
      num: '01',
      title: 'Creativity',
      desc: 'Fresh ideas and thoughtful visual direction.',
      icon: <Sparkles className="w-5 h-5 text-[#FF2E63]" />,
    },
    {
      num: '02',
      title: 'Performance',
      desc: 'Fast, responsive and optimized experiences.',
      icon: <Zap className="w-5 h-5 text-[#FFD93D]" />,
    },
    {
      num: '03',
      title: 'Experience',
      desc: 'Interfaces designed around real users.',
      icon: <HeartHandshake className="w-5 h-5 text-[#00FFA3]" />,
    },
  ];

  return (
    <section id="about" className="relative py-28 px-6 md:px-16 lg:px-24 z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Narrative Copy & 3 Core Values */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#C77DFF]" />
              <span className="font-mono text-xs tracking-widest uppercase text-zinc-400">
                OUR PHILOSOPHY
              </span>
            </div>

            <h2 className="font-headline font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-8 text-balance">
              Design With Purpose. Technology With Impact.
            </h2>

            <p className="font-body text-base sm:text-lg text-zinc-300 leading-relaxed mb-12 font-normal">
              We believe a website should do more than look beautiful. It should communicate clearly,
              create trust, and help your business grow. WebNova Studio combines creative design,
              modern technology, and thoughtful user experience to build websites people remember.
            </p>

            {/* 3 Core Values */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
              {values.map((val) => (
                <div key={val.num} className="flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      {val.icon}
                    </div>
                    <span className="font-mono text-xs text-zinc-500 font-bold">{val.num}</span>
                  </div>
                  <h3 className="font-headline font-bold text-lg text-white mb-1.5">{val.title}</h3>
                  <p className="font-body text-xs text-zinc-400 leading-relaxed font-normal">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: 3D Abstract Chrome Sculpture */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full aspect-square max-w-[420px] rounded-3xl bg-gradient-to-tr from-[#0A0E1A]/80 via-[#12101F]/60 to-black p-4 border border-white/10 shadow-2xl flex items-center justify-center">
              <div ref={canvasMountRef} className="w-full h-full" />
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[11px] font-mono text-zinc-400 pointer-events-none">
                <span>CHROME SPATIAL ARTIFACT</span>
                <span className="text-[#00FFA3]">60 FPS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
