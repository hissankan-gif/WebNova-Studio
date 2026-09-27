import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, ThinkingLevel, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

// API route for AI Project Scope & Architecture with Gemini 3.1 Pro High Thinking
app.post('/api/project-architect', async (req, res) => {
  try {
    const { projectVision } = req.body;
    if (!projectVision || typeof projectVision !== 'string') {
      return res.status(400).json({ error: 'projectVision is required.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Graceful fallback plan if key is not configured in environment
      return res.json({
        projectTitle: 'Custom 3D Digital Experience',
        architectureConcept:
          'High-performance React 18 + Three.js r160 WebGL spatial canvas with physical thin-film iridescence, Lenis smooth scrolling, and edge SSR delivery.',
        recommendedStack: ['React 18', 'TypeScript', 'Three.js / WebGL', 'GLSL Shaders', 'Tailwind CSS', 'GSAP ScrollTrigger'],
        spatial3DFeatures: [
          'Interactive morphing icosahedron core with physical iridescence (IOR 1.5)',
          '15,000 instanced particle vortex gravitating toward cursor',
          'Supernova click physics with shockwave chromatic dispersion',
        ],
        performanceStrategy: 'Adaptive device pixel ratio clamping (1-2), frustum culling, and WebGL context restoration hooks.',
        estimatedSprintTimeline: '2 - 3 Weeks (Discovery → 3D Prototyping → Refinement → Edge Launch)',
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const systemPrompt = `You are the Lead Creative Technologist and Chief WebGL Architect at WebNova Studio.
Analyze the user's project vision. Produce a thorough architectural breakdown.
Return a structured JSON with:
- projectTitle (string)
- architectureConcept (string: deep, visionary technical summary)
- recommendedStack (array of strings)
- spatial3DFeatures (array of strings)
- performanceStrategy (string)
- estimatedSprintTimeline (string)
Do not hallucinate fake client metrics or fake awards.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-pro-preview',
      contents: [
        {
          role: 'user',
          parts: [{ text: `${systemPrompt}\n\nClient Vision: "${projectVision}"` }],
        },
      ],
      config: {
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.HIGH,
        },
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            projectTitle: { type: Type.STRING },
            architectureConcept: { type: Type.STRING },
            recommendedStack: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            spatial3DFeatures: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            performanceStrategy: { type: Type.STRING },
            estimatedSprintTimeline: { type: Type.STRING },
          },
          required: [
            'projectTitle',
            'architectureConcept',
            'recommendedStack',
            'spatial3DFeatures',
            'performanceStrategy',
            'estimatedSprintTimeline',
          ],
        },
      },
    });

    const textOutput = response.text || '';
    const parsedData = JSON.parse(textOutput);
    return res.json(parsedData);
  } catch (err: any) {
    console.error('Error generating project architecture:', err);
    // Return robust fallback structure so user UX is never interrupted
    return res.json({
      projectTitle: 'Bespoke WebNova Spatial Application',
      architectureConcept:
        'Full-stack Next.js/React spatial architecture with physical Three.js WebGL rendering, custom GLSL refraction, and edge distribution.',
      recommendedStack: ['React', 'TypeScript', 'Three.js', 'Tailwind CSS', 'Vite', 'GSAP'],
      spatial3DFeatures: [
        'Liquid chrome 3D core with dynamic vertex displacement',
        'Cursor-responsive particle vortex',
        'Kinetic typography with split-text motion',
      ],
      performanceStrategy: 'Strict 60fps budget with automated geometry LOD and frustum culling.',
      estimatedSprintTimeline: '2 - 3 Weeks to Launch',
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`WebNova Studio cinematic server running on port ${PORT}`);
  });
}

startServer();
