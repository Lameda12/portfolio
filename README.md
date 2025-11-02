# 3D Scrollytelling Portfolio

An immersive portfolio website built with Next.js, React Three Fiber, and Three.js that uses scroll position to drive 3D camera animations and tell a visual story.

## Features

- 🎨 **Scroll-driven 3D Animation**: Camera smoothly moves along a predefined path as you scroll
- 🌐 **Modern Web Stack**: Built with Next.js 15, TypeScript, and React Three Fiber
- 📱 **Responsive Design**: Optimized for both desktop and mobile devices
- ♿ **Accessibility**: Respects `prefers-reduced-motion` and provides fallback experience
- 🎭 **GLB/GLTF Support**: Load your own 3D models with automatic fallback
- ⚡ **Performance Optimized**: Adaptive rendering, mobile-specific optimizations, and shadow baking
- 🎪 **Beautiful UI**: HTML overlay sections with glassmorphic design

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A 3D model in GLB/GLTF format (optional - includes fallback)

### Installation

1. Clone or navigate to the project directory:
```bash
cd port
```

2. Install dependencies:
```bash
npm install
```

3. Add your 3D model (optional):
   - Place your `.glb` file at `public/models/hero.glb`
   - See `public/models/README.md` for model specifications and optimization tips
   - If no model is provided, a beautiful animated fallback will be displayed

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
port/
├── app/
│   ├── page.tsx           # Main page with Canvas and scroll sections
│   ├── layout.tsx         # Root layout with metadata
│   └── globals.css        # Global styles and section styling
├── components/
│   └── canvas/
│       ├── Scene.tsx              # Main 3D scene with lighting and camera control
│       ├── Model.tsx              # GLB model loader with existence check
│       ├── FallbackModel.tsx     # Fallback 3D object when no model exists
│       └── ReducedMotionFallback.tsx  # Static fallback for reduced motion
├── lib/
│   └── cameraPath.ts      # Camera path curve and target definitions
└── public/
    └── models/
        └── README.md      # Model specifications and optimization guide
```

## Customization

### 1. Camera Path

Edit `lib/cameraPath.ts` to change the camera movement:

```typescript
export const cameraCurve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(x1, y1, z1),  // Start position
  new THREE.Vector3(x2, y2, z2),  // Middle waypoints...
  new THREE.Vector3(x3, y3, z3),
  new THREE.Vector3(x4, y4, z4),  // End position
])

export const lookAtTarget = new THREE.Vector3(0, 1.1, 0) // Where camera looks
```

### 2. Scroll Sections

Modify sections in `app/page.tsx`:

```tsx
<section className="section s1">
  <h1>Your Title</h1>
  <p>Your description</p>
</section>
```

Adjust the number of pages in `ScrollControls` to match your sections:

```tsx
<ScrollControls pages={4} damping={0.18}>
```

### 3. Lighting & Environment

Edit `components/canvas/Scene.tsx` to adjust:

- Light positions and intensities
- Shadow quality
- Environment preset (options: `"sunset"`, `"dawn"`, `"night"`, `"warehouse"`, `"forest"`, `"apartment"`, `"studio"`, `"city"`, `"park"`, `"lobby"`)

### 4. Styling

Update `app/globals.css` for:

- Section layouts (`.s1`, `.s2`, `.s3`, `.s4`)
- Typography and spacing
- Colors and effects

## Performance Tips

### For Large Models

1. **Compress your GLB**:
```bash
npx gltf-transform optimize input.glb output.glb --compress draco
```

2. **Reduce polycount** in Blender or your 3D software
3. **Use texture compression** (JPEG for color, optimized PNGs)
4. **Consider lazy loading** for multiple models

### Mobile Optimization

The app automatically:
- Uses baked shadows on mobile (faster)
- Reduces animation intensity
- Adapts pixel ratio (`dpr={[1, 2]}`)
- Lowers shadow map resolution

## Building for Production

```bash
npm run build
npm start
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Deploy with one click

Or use the Vercel CLI:

```bash
npm i -g vercel
vercel
```

### Other Platforms

The app works on any Node.js hosting platform that supports Next.js:
- Netlify
- Railway
- Render
- DigitalOcean App Platform

## Technologies Used

- [Next.js 15](https://nextjs.org/) - React framework
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) - React renderer for Three.js
- [Drei](https://github.com/pmndrs/drei) - Useful helpers for R3F
- [Three.js](https://threejs.org/) - 3D library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS

## Resources

- [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber)
- [Drei Helpers Documentation](https://github.com/pmndrs/drei)
- [Three.js Examples](https://threejs.org/examples/)
- [glTF Viewer](https://gltf-viewer.donmccurdy.com/) - Test your models
- [Poly Haven](https://polyhaven.com/) - Free 3D assets and HDRIs

## License

This project is open source and available under the MIT License.

## Next Steps

- Add more scroll sections with different camera angles
- Implement click interactions on 3D objects
- Add postprocessing effects (bloom, vignette, etc.)
- Create project detail pages with individual scenes
- Add sound design triggered by scroll position
- Implement particle systems or shaders for more visual flair

---

Built with ❤️ using React Three Fiber
