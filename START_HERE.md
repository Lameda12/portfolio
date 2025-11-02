# 👋 START HERE

Welcome to your **3D Scrollytelling Portfolio**! This is a modern, immersive web experience built with Next.js and React Three Fiber.

## 🚀 First Time? Start Here!

### Option 1: Quick Start (5 minutes)
1. Open terminal in this directory
2. Run: `npm run dev`
3. Visit: http://localhost:3000
4. Scroll down to see the magic! ✨

### Option 2: Full Setup (15 minutes)
Read **[GETTING_STARTED.md](GETTING_STARTED.md)** for a guided walkthrough including:
- Adding your 3D model
- Customizing content
- Adjusting the camera path
- Deploying your site

## 📚 Documentation Guide

Choose the guide that fits your needs:

### 🏃‍♂️ **[GETTING_STARTED.md](GETTING_STARTED.md)** ← START HERE
**Best for:** First-time users  
**Time:** 5 minutes to read, 30 minutes to customize  
**Content:** Immediate next steps and quick wins

### ⚡ **[QUICKSTART.md](QUICKSTART.md)**
**Best for:** Experienced developers who want the TL;DR  
**Time:** 2 minutes  
**Content:** Commands, tips, and common customizations

### 📖 **[README.md](README.md)**
**Best for:** Understanding the full project  
**Time:** 15 minutes  
**Content:** Complete documentation with examples and best practices

### 🌐 **[DEPLOYMENT.md](DEPLOYMENT.md)**
**Best for:** Ready to deploy  
**Time:** 10 minutes  
**Content:** Step-by-step deployment to Vercel, Netlify, and more

### 📊 **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)**
**Best for:** Technical overview  
**Time:** 5 minutes  
**Content:** Architecture, implementation details, and benchmarks

## 🎯 Common Tasks

### I want to...

**...see it running now**
```bash
npm run dev
```
Then visit http://localhost:3000

**...add my 3D model**
1. Place your `.glb` file at `public/models/hero.glb`
2. Restart the dev server
3. Done! It loads automatically

**...change the text**
1. Edit `app/page.tsx`
2. Find the `<section>` tags
3. Update the content

**...adjust camera movement**
1. Edit `lib/cameraPath.ts`
2. Change the Vector3 coordinates
3. Refresh to see changes

**...deploy it**
```bash
npm install -g vercel
vercel
```
Or read [DEPLOYMENT.md](DEPLOYMENT.md)

**...customize colors**
1. Edit `app/globals.css`
2. Find color values (e.g., `#0b0d12`)
3. Replace with your brand colors

## 🛠️ Project Structure

```
port/
├── app/              → Next.js pages and layouts
├── components/       → React components (3D scene, models)
├── lib/              → Utilities (camera path)
├── public/models/    → Your 3D model goes here
└── Documentation     → All these helpful guides!
```

## 📦 What's Included

✅ Scroll-driven 3D camera animation  
✅ 4 content sections with beautiful styling  
✅ Mobile optimizations  
✅ Accessibility features  
✅ Beautiful fallback if no model provided  
✅ TypeScript & Next.js 16  
✅ Ready to deploy  

## 🎨 Technology

- **Framework:** Next.js 16 (App Router)
- **3D Engine:** Three.js via React Three Fiber
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Custom CSS

## ⚡ Quick Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Run production build locally

# Deployment
vercel               # Deploy to Vercel
# or push to GitHub and connect at vercel.com
```

## 🆘 Having Issues?

1. **Model not loading?**  
   → Check `public/models/hero.glb` exists  
   → The fallback (torus knot) will show if missing

2. **Build errors?**  
   → Run `npm install` to ensure all dependencies are installed  
   → Check Node.js version (needs 18+)

3. **Slow performance?**  
   → Optimize your 3D model (see `public/models/README.md`)  
   → Keep GLB files under 10MB

4. **Something else?**  
   → Check browser console (F12) for error messages  
   → Read the [README.md](README.md) troubleshooting section

## 💡 Pro Tips

1. **Test early and often** - Run the dev server frequently to see your changes
2. **Start with the fallback** - Get everything working, then add your model
3. **Iterate on feel** - Adjust scroll speed and camera movement until it feels right
4. **Mobile matters** - Test on real devices when possible
5. **Keep it simple** - The best portfolios showcase work, not complexity

## 🎓 Learning Resources

- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Three.js Examples](https://threejs.org/examples/)
- [Drei Helper Components](https://github.com/pmndrs/drei)
- [Next.js Documentation](https://nextjs.org/docs)

## 🎉 Ready to Build!

Your portfolio is production-ready. All the hard technical work is done. Now it's time to:

1. Add your unique 3D model
2. Write your story in the sections
3. Adjust the camera to showcase your work
4. Deploy and share with the world!

---

**Need more details?** → Read [GETTING_STARTED.md](GETTING_STARTED.md)  
**Just want commands?** → Check [QUICKSTART.md](QUICKSTART.md)  
**Ready to deploy?** → Follow [DEPLOYMENT.md](DEPLOYMENT.md)

**Happy building! 🚀**

