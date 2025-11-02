# Quick Start Guide

Get your 3D Scrollytelling Portfolio up and running in 5 minutes!

## 🚀 Quick Setup

```bash
# 1. Navigate to the project
cd port

# 2. Install dependencies (if not already done)
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio!

## 🎨 Add Your 3D Model

1. Place your `.glb` file at `public/models/hero.glb`
2. The app will automatically load it
3. No code changes needed!

**Don't have a model?** The app includes a beautiful animated fallback that displays automatically.

### Where to Get Free 3D Models

- [Sketchfab](https://sketchfab.com/) - Huge library of free models
- [Poly Pizza](https://poly.pizza/) - Low-poly assets
- [Quaternius](http://quaternius.com/) - Free game-ready models
- [Kenney](https://kenney.nl/assets) - Free game assets

### Optimize Your Model

```bash
# Install gltf-transform
npm install -g @gltf-transform/cli

# Optimize and compress
gltf-transform optimize yourmodel.glb public/models/hero.glb --compress draco
```

## ✏️ Customize Content

Edit `app/page.tsx` to change the scroll sections:

```tsx
<section className="section s1">
  <h1>Your Name</h1>
  <p>Your description here...</p>
</section>
```

## 🎥 Adjust Camera Path

Edit `lib/cameraPath.ts` to change how the camera moves:

```typescript
export const cameraCurve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 1.4, 6),    // Starting position
  new THREE.Vector3(1.2, 1.2, 3.5),  // Waypoint 1
  new THREE.Vector3(0.2, 1.0, 1.8),  // Waypoint 2
  new THREE.Vector3(-0.6, 1.1, 2.6), // End position
])
```

**Pro tip:** Add more waypoints to create a longer, more complex camera path!

## 🎨 Change Colors & Styling

Edit `app/globals.css` to customize:

- Section layouts
- Typography
- Colors and effects
- Background color

Change the canvas background in `app/page.tsx`:

```tsx
<color attach="background" args={['#0b0d12']} /> {/* Change the color here */}
```

## 🌍 Environment & Lighting

Change the 3D environment preset in `app/page.tsx`:

```tsx
<Environment preset="city" /> {/* Try: sunset, dawn, night, studio, etc. */}
```

Available presets:
- `sunset` - Warm outdoor lighting
- `dawn` - Early morning light
- `night` - Dark with stars
- `warehouse` - Industrial interior
- `forest` - Natural outdoor
- `apartment` - Interior lighting
- `studio` - Professional lighting
- `city` - Urban environment
- `park` - Outdoor park
- `lobby` - Indoor lobby

## 📱 Test on Mobile

The app is already mobile-optimized, but test it:

```bash
# Get your local IP
ipconfig getifaddr en0  # macOS
# or
hostname -I  # Linux

# Access from your phone at:
# http://YOUR_IP:3000
```

## 🚢 Deploy to Vercel (30 seconds)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo to [vercel.com](https://vercel.com) for automatic deployments!

## 📝 Common Customizations

### Add More Scroll Sections

1. Add a new section in `app/page.tsx`
2. Increase `pages` in ScrollControls: `<ScrollControls pages={5}>`
3. Extend camera path in `lib/cameraPath.ts`

### Change Animation Speed

In `app/page.tsx`, adjust damping:

```tsx
<ScrollControls pages={4} damping={0.18}> {/* Lower = faster, Higher = slower */}
```

### Disable Floating Animation

In `components/canvas/Scene.tsx`, remove or adjust the `<Float>` component:

```tsx
<Float speed={1} rotationIntensity={0.1} floatIntensity={0.6}>
  <Model position={[0, 0, 0]} />
</Float>
```

### Add Your Links

Update the email and links in `app/page.tsx`:

```tsx
<a href="mailto:your@email.com">Get In Touch</a>
```

## 🐛 Troubleshooting

### Port 3000 Already in Use

```bash
npm run dev -- -p 3001  # Use port 3001 instead
```

### Model Not Loading

1. Check the file is at `public/models/hero.glb`
2. Check browser console for errors
3. Verify file size (under 50MB)
4. The fallback will show if the model isn't found

### Slow Performance

1. Optimize your 3D model (see above)
2. Reduce shadow quality in `Scene.tsx`
3. Lower polycount of your model

### TypeScript Errors

```bash
npm run type-check  # Check for type errors
```

## 📚 Next Steps

- Read `README.md` for detailed documentation
- Check `DEPLOYMENT.md` for hosting options
- Explore `three.plan.md` for the implementation plan
- Visit [React Three Fiber docs](https://docs.pmnd.rs/react-three-fiber)

## 💡 Tips

1. **Start Simple**: Get the basic version working first
2. **Test Early**: Check mobile responsiveness early on
3. **Optimize Models**: Keep GLB files under 10MB
4. **Iterate**: Adjust camera path and timing until it feels right
5. **Get Feedback**: Show friends and ask for their experience

## 🆘 Need Help?

- Check the browser console for error messages
- Review the full `README.md` documentation
- Search [Stack Overflow](https://stackoverflow.com/questions/tagged/react-three-fiber)
- Ask in [Poimandres Discord](https://discord.gg/poimandres)

---

**You're all set!** 🎉 Start customizing and make it your own!

