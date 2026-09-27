import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { useGpuTier } from '../hooks/useGpuTier.ts';

interface NovaCoreProps {
  onSupernovaTrigger?: () => void;
}

export const NovaCore: React.FC<NovaCoreProps> = ({ onSupernovaTrigger }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [isSupernovaActive, setIsSupernovaActive] = useState(false);

  // Dynamic GPGPU tier detection and performance monitoring
  const { tier, particleCount, fps, reportFps } = useGpuTier();
  const particleCountRef = useRef(particleCount);
  const reportFpsRef = useRef(reportFps);

  useEffect(() => {
    particleCountRef.current = particleCount;
  }, [particleCount]);

  useEffect(() => {
    reportFpsRef.current = reportFps;
  }, [reportFps]);

  // References to keep animation loop clean
  const supernovaProgress = useRef(0);
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollOffset = useRef(0);

  // Supernova trigger function
  const triggerSupernova = useCallback(() => {
    supernovaProgress.current = 1.0;
    setIsSupernovaActive(true);
    if (onSupernovaTrigger) onSupernovaTrigger();
    
    // Haptic feedback if supported on mobile
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate([30, 50, 30]);
    }
  }, [onSupernovaTrigger]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const isMobile = window.innerWidth < 768;

    // SCENE
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.025);

    // CAMERA
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // LIGHTING (Liquid Aurora System)
    // Area 1: Magma Pink #FF2E63 at (-3, 2, 2)
    const lightPink = new THREE.PointLight(0xff2e63, 6, 20);
    lightPink.position.set(-3, 2, 3);
    scene.add(lightPink);

    // Area 2: Cyber Ice #00C2FF at (3, 2, 2)
    const lightIce = new THREE.PointLight(0x00c2ff, 5, 20);
    lightIce.position.set(3, 2, 3);
    scene.add(lightIce);

    // Area 3: Cosmic Orchid #C77DFF at (0, -3, 2)
    const lightOrchid = new THREE.PointLight(0xc77dff, 5, 20);
    lightOrchid.position.set(0, -3, 2);
    scene.add(lightOrchid);

    // Rim: Radiation Mint #00FFA3 at (0, 3, -3)
    const lightMint = new THREE.DirectionalLight(0x00ffa3, 2.5);
    lightMint.position.set(0, 4, -4);
    scene.add(lightMint);

    // Molten Gold Fill
    const lightGold = new THREE.PointLight(0xffd93d, 3, 15);
    lightGold.position.set(0, 0, 4);
    scene.add(lightGold);

    // MAIN OBJECT — Nova Core 2.0 (Liquid Chrome Morphing Mesh)
    // We create morph targets: 0: Icosahedron/Sphere, 1: Cube, 2: Torus, 3: TorusKnot
    const baseGeo = new THREE.IcosahedronGeometry(1.2, 5);
    baseGeo.computeVertexNormals();

    const cubeGeo = new THREE.BoxGeometry(1.8, 1.8, 1.8, 20, 20, 20);
    const torusGeo = new THREE.TorusGeometry(1.1, 0.45, 24, 60);
    const knotGeo = new THREE.TorusKnotGeometry(0.85, 0.3, 80, 20);

    // Prepare morph target attribute
    const count = baseGeo.attributes.position.count;
    const morphPositions: THREE.BufferAttribute[] = [];

    // Helper to sample positions to match vertex count
    const createMorphTarget = (sourceGeo: THREE.BufferGeometry) => {
      const srcPos = sourceGeo.attributes.position;
      const targetArray = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const srcIndex = i % srcPos.count;
        targetArray[i * 3] = srcPos.getX(srcIndex);
        targetArray[i * 3 + 1] = srcPos.getY(srcIndex);
        targetArray[i * 3 + 2] = srcPos.getZ(srcIndex);
      }
      return new THREE.BufferAttribute(targetArray, 3);
    };

    morphPositions.push(createMorphTarget(cubeGeo));
    morphPositions.push(createMorphTarget(torusGeo));
    morphPositions.push(createMorphTarget(knotGeo));

    baseGeo.morphAttributes.position = morphPositions;

    const coreMaterial = new THREE.MeshPhysicalMaterial({
      metalness: 1.0,
      roughness: 0.04,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      iridescence: 1.0,
      iridescenceIOR: 1.5,
      transmission: 0.15,
      reflectivity: 0.9,
      color: 0xffffff,
    });

    const novaCoreMesh = new THREE.Mesh(baseGeo, coreMaterial);
    scene.add(novaCoreMesh);

    // 6 ORBIT RINGS (Magma, Gold, Mint, Ice, Orchid, Chrome)
    const ringColors = [0xff2e63, 0xffd93d, 0x00ffa3, 0x00c2ff, 0xc77dff, 0xffffff];
    const orbitRings: THREE.LineLoop[] = [];

    ringColors.forEach((color, i) => {
      const radius = 1.7 + i * 0.32;
      const segments = 90;
      const ringGeo = new THREE.BufferGeometry();
      const points = [];

      for (let j = 0; j <= segments; j++) {
        const theta = (j / segments) * Math.PI * 2;
        points.push(Math.cos(theta) * radius, Math.sin(theta) * radius, 0);
      }

      ringGeo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
      const ringMat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.45 - i * 0.05,
        linewidth: 1,
      });

      const ring = new THREE.LineLoop(ringGeo, ringMat);
      // Random tilt angles
      ring.rotation.x = Math.PI * 0.25 * (i + 1);
      ring.rotation.y = Math.PI * 0.15 * (i + 1);
      scene.add(ring);
      orbitRings.push(ring);
    });

    // 15,000 MAXIMUM PARTICLES CAPACITY (Allocated once, dynamically sized via GPGPU tier & FPS)
    const MAX_CAPACITY = 15000;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(MAX_CAPACITY * 3);
    const originalPositions = new Float32Array(MAX_CAPACITY * 3);
    const particleColors = new Float32Array(MAX_CAPACITY * 3);
    const particleSpeeds = new Float32Array(MAX_CAPACITY);

    const palette = [
      new THREE.Color(0xff2e63), // Magma
      new THREE.Color(0xffd93d), // Gold
      new THREE.Color(0x00ffa3), // Mint
      new THREE.Color(0x00c2ff), // Ice
      new THREE.Color(0xc77dff), // Orchid
    ];

    for (let i = 0; i < MAX_CAPACITY; i++) {
      const ringIndex = i % 8;
      const angle = (i / MAX_CAPACITY) * Math.PI * 18 + ringIndex * (Math.PI / 4);
      const radius = 2.0 + (ringIndex * 0.4) + (Math.random() - 0.5) * 0.9;
      const height = (Math.random() - 0.5) * 3.5;

      const x = Math.cos(angle) * radius;
      const y = height + Math.sin(angle * 2) * 0.5;
      const z = Math.sin(angle) * radius;

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      // Assign palette color
      const col = palette[Math.floor(Math.random() * palette.length)];
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;

      particleSpeeds[i] = 0.2 + Math.random() * 0.8;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    // Initial draw range based on detected GPGPU tier
    particleGeo.setDrawRange(0, Math.min(particleCountRef.current, MAX_CAPACITY));

    // Custom Particle Material with Soft Glow
    const particleCanvas = document.createElement('canvas');
    particleCanvas.width = 32;
    particleCanvas.height = 32;
    const pCtx = particleCanvas.getContext('2d')!;
    const gradient = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    pCtx.fillStyle = gradient;
    pCtx.fillRect(0, 0, 32, 32);

    const particleTexture = new THREE.CanvasTexture(particleCanvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.05 : 0.038,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMaterial);
    scene.add(particles);

    // VOLUMETRIC GOD RAYS (Aurora Plane in Background)
    const rayGeo = new THREE.PlaneGeometry(8, 8);
    const rayMat = new THREE.MeshBasicMaterial({
      color: 0x00c2ff,
      transparent: true,
      opacity: 0.07,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const rayMesh = new THREE.Mesh(rayGeo, rayMat);
    rayMesh.position.set(0, 0, -2);
    scene.add(rayMesh);

    // MOUSE & TOUCH LISTENER
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        scrollOffset.current = window.scrollY / maxScroll;
      }
    };

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    // CLICK EVENT: SUPERNOVA BURST
    const handleCanvasClick = () => {
      triggerSupernova();
    };
    container.addEventListener('click', handleCanvasClick);

    // ANIMATION & GSAP-EQUIVALENT MORPH LOOP
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Real-time FPS monitoring to feed the adaptive tier supervisor
      const currentCalculatedFps = 1 / Math.max(0.001, delta);
      reportFpsRef.current(currentCalculatedFps);

      // Dynamically clamped active particle count based on GPGPU tier
      const activeParticleCount = Math.min(particleCountRef.current, MAX_CAPACITY);
      particleGeo.setDrawRange(0, activeParticleCount);

      // Smooth mouse interpolation (ease-out)
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.06;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.06;

      // CONTINUOUS CAMERA JOURNEY (Driven by Scroll)
      // Section 1: Hero (scroll 0.0 - 0.15) -> Planet at right (+2.0, 0, 0), text left
      // Section 2: Services Bento (0.15 - 0.35) -> Tunnel flythrough, planet recedes
      // Section 3: Portfolio (0.35 - 0.55) -> Planet drifts upper right
      // Section 4: Process (0.55 - 0.75) -> Descend into timeline
      // Section 5: Technologies / About (0.75 - 0.90) -> Orbital view
      // Section 6: Final CTA (0.90 - 1.0) -> Nova Core returns smaller at center-back (Shock #10)
      const scroll = scrollOffset.current;

      let targetPlanetX = isMobile ? 0 : 2.2;
      let targetPlanetY = isMobile ? -1.0 : 0.0;
      let targetPlanetZ = 0;
      let targetScale = isMobile ? 0.8 : 1.15;

      if (scroll < 0.18) {
        // Hero section: prominent at right
        targetPlanetX = isMobile ? 0 : 2.2;
        targetPlanetY = isMobile ? -1.2 : 0;
        targetPlanetZ = 0;
        targetScale = isMobile ? 0.85 : 1.15;
      } else if (scroll < 0.4) {
        // Services: fly through chrome tunnel, planet recedes and scales
        targetPlanetX = isMobile ? 0 : -2.5;
        targetPlanetY = 0.5;
        targetPlanetZ = -4.0;
        targetScale = 0.7;
      } else if (scroll < 0.65) {
        // Portfolio: subtle floating 3D backdrop
        targetPlanetX = isMobile ? 0 : 2.8;
        targetPlanetY = -0.5;
        targetPlanetZ = -3.0;
        targetScale = 0.8;
      } else if (scroll < 0.85) {
        // Process & About: side presence
        targetPlanetX = isMobile ? 0 : -2.8;
        targetPlanetY = 0.2;
        targetPlanetZ = -2.5;
        targetScale = 0.75;
      } else {
        // Final CTA (Shock #10): Nova Core returns smaller, orbiting slowly at center-back
        targetPlanetX = 0;
        targetPlanetY = 0.5;
        targetPlanetZ = -2.0;
        targetScale = 0.9;
      }

      // Lerp Nova Core position & scale
      novaCoreMesh.position.x += (targetPlanetX - novaCoreMesh.position.x) * 0.05;
      novaCoreMesh.position.y += (targetPlanetY - novaCoreMesh.position.y) * 0.05;
      novaCoreMesh.position.z += (targetPlanetZ - novaCoreMesh.position.z) * 0.05;

      const currentScale = novaCoreMesh.scale.x;
      const nextScale = currentScale + (targetScale - currentScale) * 0.05;
      novaCoreMesh.scale.set(nextScale, nextScale, nextScale);

      // Planet rotation & 5° tilt toward cursor
      novaCoreMesh.rotation.y = elapsedTime * 0.35 + mousePos.current.x * 0.4;
      novaCoreMesh.rotation.x = Math.sin(elapsedTime * 0.25) * 0.2 - mousePos.current.y * 0.3;

      // CONTINUOUS MORPHING CYCLE (every 3 seconds): Sphere -> Cube -> Torus -> TorusKnot -> Sphere
      const cycleDuration = 3.0;
      const totalStages = 4;
      const totalTime = elapsedTime / cycleDuration;
      const stage = Math.floor(totalTime) % totalStages;
      const t = (totalTime % 1); // 0 to 1 smooth transition
      const smoothT = Math.sin((t - 0.5) * Math.PI) * 0.5 + 0.5;

      if (novaCoreMesh.morphTargetInfluences) {
        // Reset influences
        novaCoreMesh.morphTargetInfluences[0] = 0;
        novaCoreMesh.morphTargetInfluences[1] = 0;
        novaCoreMesh.morphTargetInfluences[2] = 0;

        if (stage === 0) {
          // Sphere -> Cube (morph target 0)
          novaCoreMesh.morphTargetInfluences[0] = smoothT;
        } else if (stage === 1) {
          // Cube -> Torus (morph target 1)
          novaCoreMesh.morphTargetInfluences[0] = 1 - smoothT;
          novaCoreMesh.morphTargetInfluences[1] = smoothT;
        } else if (stage === 2) {
          // Torus -> TorusKnot (morph target 2)
          novaCoreMesh.morphTargetInfluences[1] = 1 - smoothT;
          novaCoreMesh.morphTargetInfluences[2] = smoothT;
        } else {
          // TorusKnot -> Sphere
          novaCoreMesh.morphTargetInfluences[2] = 1 - smoothT;
        }
      }

      // ROTATE ORBIT RINGS
      orbitRings.forEach((ring, index) => {
        ring.position.copy(novaCoreMesh.position);
        ring.scale.set(nextScale, nextScale, nextScale);
        ring.rotation.z += 0.005 * (index % 2 === 0 ? 1 : -1);
        ring.rotation.x += 0.003;
      });

      // SUPERNOVA PROGRESS DECAY
      if (supernovaProgress.current > 0.001) {
        supernovaProgress.current *= 0.94;
        if (supernovaProgress.current <= 0.01) {
          supernovaProgress.current = 0;
          setIsSupernovaActive(false);
        }
      }

      // PARTICLES SYSTEM (Vortex towards cursor + Supernova burst)
      const positions = particleGeo.attributes.position.array as Float32Array;
      const mouse3DX = mousePos.current.x * 4;
      const mouse3DY = mousePos.current.y * 3;

      for (let i = 0; i < activeParticleCount; i++) {
        const i3 = i * 3;
        const ox = originalPositions[i3];
        const oy = originalPositions[i3 + 1];
        const oz = originalPositions[i3 + 2];
        const speed = particleSpeeds[i];

        // Orbit rotation around Nova Core center
        const angle = elapsedTime * 0.2 * speed;
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);
        let px = ox * cosA - oz * sinA + novaCoreMesh.position.x;
        let py = oy + novaCoreMesh.position.y + Math.sin(elapsedTime + i) * 0.15;
        let pz = ox * sinA + oz * cosA + novaCoreMesh.position.z;

        // Vortex attraction toward cursor
        const dx = mouse3DX - px;
        const dy = mouse3DY - py;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 3.5) {
          const pull = (1 - dist / 3.5) * 0.45;
          px += dx * pull;
          py += dy * pull;
        }

        // Supernova explosion burst
        if (supernovaProgress.current > 0.01) {
          const burstMag = supernovaProgress.current * 7.0;
          px += ox * burstMag;
          py += oy * burstMag;
          pz += oz * burstMag;
        }

        positions[i3] = px;
        positions[i3 + 1] = py;
        positions[i3 + 2] = pz;
      }

      particleGeo.attributes.position.needsUpdate = true;

      // Atmospheric God rays rotation & subtle pulse
      rayMesh.position.copy(novaCoreMesh.position);
      rayMesh.position.z -= 1.0;
      rayMesh.rotation.z = elapsedTime * 0.1;
      rayMat.opacity = 0.08 + Math.sin(elapsedTime * 2) * 0.02 + (supernovaProgress.current * 0.2);

      // Light pulsator
      lightPink.intensity = 5.0 + Math.sin(elapsedTime * 2.0) * 1.5;
      lightIce.intensity = 4.5 + Math.cos(elapsedTime * 1.8) * 1.2;

      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('click', handleCanvasClick);

      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      baseGeo.dispose();
      cubeGeo.dispose();
      torusGeo.dispose();
      knotGeo.dispose();
      coreMaterial.dispose();
      particleGeo.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, [triggerSupernova]);

  if (!webglSupported) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
        {/* CSS/SVG WebGL Fallback container */}
        <div className="w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#FF2E63]/30 via-[#00C2FF]/20 to-[#C77DFF]/30 blur-3xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-auto z-0 overflow-hidden select-none" ref={mountRef}>
      {/* Supernova Screen Flash & Shockwave HUD Overlay */}
      {isSupernovaActive && (
        <div
          className="pointer-events-none absolute inset-0 z-10 animate-ping"
          style={{
            background: 'radial-gradient(circle at 65% 50%, rgba(255,46,99,0.45) 0%, rgba(255,217,61,0.3) 25%, rgba(0,255,163,0.15) 50%, transparent 75%)',
          }}
        />
      )}

      {/* Dynamic GPGPU Performance HUD & Supernova Interaction Badge */}
      <div className="hidden sm:flex absolute bottom-8 right-8 z-10 items-center gap-3 px-4 py-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/15 text-[11px] font-mono text-zinc-300 shadow-[0_8px_32px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#00FFA3] animate-pulse" />
          <span className="text-[#00FFA3] font-bold uppercase">{tier} TIER</span>
        </div>
        <span className="text-zinc-600">·</span>
        <span className="tabular-nums text-white font-semibold">{fps || 60} FPS</span>
        <span className="text-zinc-600">·</span>
        <span className="text-zinc-400">{(particleCount / 1000).toFixed(1)}k PARTICLES</span>
        <span className="text-zinc-600 hidden md:inline">·</span>
        <span className="text-[#FFD93D] hidden md:inline">CLICK FOR SUPERNOVA</span>
      </div>
    </div>
  );
};
