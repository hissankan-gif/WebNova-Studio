/**
 * Volumetric God Rays & Atmospheric Aurora Shader
 */

export const GodRaysShader = {
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vPosition;

    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,

  fragmentShader: `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;
    uniform vec3 uColorCenter;
    uniform vec3 uColorEdge;
    uniform float uIntensity;

    void main() {
      vec2 center = vec2(0.5, 0.5);
      vec2 dir = vUv - center;
      float dist = length(dir);

      // Radial light falloff
      float falloff = smoothstep(0.5, 0.05, dist);

      // Dynamic ray spokes
      float angle = atan(dir.y, dir.x);
      float rays = sin(angle * 12.0 + uTime * 0.5) * 0.25 + 0.75;
      rays += sin(angle * 24.0 - uTime * 0.8) * 0.15;
      rays += sin(angle * 6.0 + uTime * 0.2) * 0.2;

      // Color gradation
      vec3 color = mix(uColorCenter, uColorEdge, dist * 1.8);
      float alpha = falloff * rays * uIntensity;

      gl_FragColor = vec4(color, alpha);
    }
  `
};
