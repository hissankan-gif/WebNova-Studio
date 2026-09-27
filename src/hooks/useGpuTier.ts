import { useState, useEffect, useRef } from 'react';

export type GpuTierLevel = 'low' | 'medium' | 'high';

export interface GpuTierResult {
  tier: GpuTierLevel;
  particleCount: number;
  gpuName: string;
  isMobile: boolean;
  fps: number;
  reportFps: (currentFps: number) => void;
}

const TIER_PARTICLE_MAP: Record<GpuTierLevel, { desktop: number; mobile: number }> = {
  high: { desktop: 15000, mobile: 4000 },
  medium: { desktop: 8000, mobile: 2500 },
  low: { desktop: 3000, mobile: 1200 },
};

export function useGpuTier(): GpuTierResult {
  const [tier, setTier] = useState<GpuTierLevel>('high');
  const [gpuName, setGpuName] = useState<string>('Standard GPU');
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [currentFps, setCurrentFps] = useState<number>(60);

  // Sliding window for dynamic frame performance degradation detection
  const fpsHistoryRef = useRef<number[]>([]);
  const isAdjustedRef = useRef<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mobileCheck =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      window.innerWidth < 768;
    setIsMobile(mobileCheck);

    // Detect hardware tier via GPGPU capabilities
    try {
      const canvas = document.createElement('canvas');
      const gl =
        (canvas.getContext('webgl2') as WebGL2RenderingContext | null) ||
        (canvas.getContext('webgl') as WebGLRenderingContext | null) ||
        (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);

      if (!gl) {
        setTier('low');
        setGpuName('WebGL Software Fallback');
        return;
      }

      // Check debug renderer info extension
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      let rendererString = 'Unknown Renderer';
      if (debugInfo) {
        rendererString = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '';
      }

      setGpuName(rendererString || 'Generic WebGL Accelerator');

      const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE) || 4096;
      const maxVertexUniforms = gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS) || 128;
      const logicalCores = navigator.hardwareConcurrency || 4;
      const deviceMemory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 4;

      const lowerRenderer = rendererString.toLowerCase();

      // Detection heuristic
      const isHighEndDedicated =
        /nvidia|geforce|rtx|gtx|radeon rx|apple m\d (pro|max|ultra)|titan|quadro/i.test(lowerRenderer);
      const isWeakGpu =
        /mali-4|adreno 3|adreno 505|adreno 506|intel hd 2000|intel hd 3000|swiftshader|llvmpipe/i.test(
          lowerRenderer
        );

      if (isWeakGpu || maxTextureSize < 4096 || deviceMemory < 3 || logicalCores <= 2) {
        setTier('low');
      } else if (isHighEndDedicated && maxTextureSize >= 8192 && logicalCores >= 6 && deviceMemory >= 6) {
        setTier('high');
      } else if (mobileCheck) {
        setTier(logicalCores >= 8 && deviceMemory >= 6 ? 'medium' : 'low');
      } else {
        setTier('medium');
      }
    } catch {
      setTier(mobileCheck ? 'low' : 'medium');
    }
  }, []);

  // Real-time FPS monitoring handler to dynamically downgrade if frames drop
  const reportFps = (fps: number) => {
    if (fps <= 0) return;
    setCurrentFps(Math.round(fps));

    const history = fpsHistoryRef.current;
    history.push(fps);
    if (history.length > 50) history.shift();

    // Check last 40 frames average
    if (history.length >= 35 && !isAdjustedRef.current) {
      const avgFps = history.reduce((sum, val) => sum + val, 0) / history.length;

      // If average FPS drops below 48 FPS on a 60Hz display, dynamically step down tier to restore 60fps
      if (avgFps < 48) {
        setTier((prevTier) => {
          if (prevTier === 'high') {
            isAdjustedRef.current = true;
            return 'medium';
          }
          if (prevTier === 'medium') {
            isAdjustedRef.current = true;
            return 'low';
          }
          return prevTier;
        });
      }
    }
  };

  const particleCount = mobileCheckCalc(isMobile, tier);

  return {
    tier,
    particleCount,
    gpuName,
    isMobile,
    fps: currentFps,
    reportFps,
  };
}

function mobileCheckCalc(isMobile: boolean, tier: GpuTierLevel): number {
  const config = TIER_PARTICLE_MAP[tier] || TIER_PARTICLE_MAP.medium;
  return isMobile ? config.mobile : config.desktop;
}
