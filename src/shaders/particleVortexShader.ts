/**
 * Particle Vortex Point Shader with Mouse Gravitation & Supernova Pulse
 */

export const ParticleVortexShader = {
  vertexShader: `
    attribute vec3 aColor;
    attribute float aSize;
    attribute float aSpeed;
    attribute vec3 aOriginalPos;

    varying vec3 vColor;
    varying float vAlpha;

    uniform float uTime;
    uniform vec3 uMouse;
    uniform float uSupernova;
    uniform float uPixelRatio;

    void main() {
      vColor = aColor;
      vec3 pos = position;

      // Mouse gravitation vortex pull
      vec3 toMouse = uMouse - pos;
      float distToMouse = length(toMouse);
      if (distToMouse < 4.0 && distToMouse > 0.05) {
        float pullStrength = (1.0 - distToMouse / 4.0) * 0.8;
        // Tangent swirl + attraction
        vec3 tangent = cross(normalize(toMouse), vec3(0.0, 0.0, 1.0));
        pos += (normalize(toMouse) * 0.4 + tangent * 0.6) * pullStrength;
      }

      // Supernova explosion expansion
      if (uSupernova > 0.001) {
        vec3 burstDir = normalize(aOriginalPos + vec3(0.001));
        pos += burstDir * (uSupernova * 14.0);
      }

      // Orbit motion based on original radius
      float angle = uTime * aSpeed * 0.4;
      float cosA = cos(angle);
      float sinA = sin(angle);
      float x = pos.x * cosA - pos.z * sinA;
      float z = pos.x * sinA + pos.z * cosA;
      pos.x = x;
      pos.z = z;

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;

      // Size attenuation
      float baseSize = aSize * (1.0 + uSupernova * 1.5);
      gl_PointSize = baseSize * uPixelRatio * (280.0 / -mvPosition.z);
      
      // Alpha falloff
      vAlpha = clamp(1.2 - (-mvPosition.z / 18.0), 0.2, 1.0);
    }
  `,

  fragmentShader: `
    varying vec3 vColor;
    varying float vAlpha;

    void main() {
      // Circular soft point
      vec2 coord = gl_PointCoord - vec2(0.5);
      float dist = length(coord);
      if (dist > 0.5) discard;

      // Soft glow falloff
      float strength = pow(1.0 - (dist * 2.0), 1.5);
      gl_FragColor = vec4(vColor, strength * vAlpha);
    }
  `
};
