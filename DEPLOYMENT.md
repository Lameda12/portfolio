# Deployment Guide

This guide covers deploying your 3D Scrollytelling Portfolio to various platforms.

## Pre-Deployment Checklist

- [ ] Test the app locally with `npm run build && npm start`
- [ ] Ensure your 3D model is optimized (under 10MB recommended)
- [ ] Update metadata in `app/layout.tsx` (title, description)
- [ ] Replace placeholder content with your actual portfolio copy
- [ ] Update email and links in the contact section
- [ ] Test on mobile devices or use browser DevTools
- [ ] Verify reduced motion fallback works (in browser settings)

## Vercel (Recommended)

Vercel is the easiest option since it's made by the Next.js team.

### Method 1: GitHub Integration (Easiest)

1. Push your code to a GitHub repository:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_URL
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com) and sign in with GitHub

3. Click "Add New Project"

4. Import your repository

5. Vercel will auto-detect Next.js settings. Click "Deploy"

6. Your site will be live at `your-project.vercel.app`

### Method 2: Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production
vercel --prod
```

### Custom Domain on Vercel

1. Go to your project dashboard on Vercel
2. Navigate to Settings → Domains
3. Add your custom domain
4. Update your DNS records as instructed

## Netlify

### Method 1: Drag and Drop

1. Build your project:
```bash
npm run build
```

2. Go to [netlify.com](https://www.netlify.com/)

3. Drag and drop the `.next` folder (Note: This requires special Next.js configuration)

### Method 2: Git Integration

1. Push your code to GitHub/GitLab/Bitbucket

2. In Netlify, click "Add new site" → "Import an existing project"

3. Connect your repository

4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Node version**: 18 or higher

5. Click "Deploy site"

### Netlify Configuration

Add a `netlify.toml` file to your project root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

## Railway

1. Go to [railway.app](https://railway.app)

2. Click "New Project" → "Deploy from GitHub repo"

3. Select your repository

4. Railway will auto-detect Next.js and deploy

5. Optional: Add a custom domain in Settings

## Render

1. Go to [render.com](https://render.com)

2. Click "New" → "Web Service"

3. Connect your repository

4. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: Node

5. Click "Create Web Service"

## DigitalOcean App Platform

1. Go to [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)

2. Click "Create App"

3. Connect your GitHub repository

4. Configure:
   - **Build Command**: `npm run build`
   - **Run Command**: `npm start`
   - **Port**: 3000

5. Review and deploy

## Self-Hosting (VPS)

For AWS, DigitalOcean Droplets, or any VPS:

### Using PM2 (Process Manager)

```bash
# On your server
git clone YOUR_REPO_URL
cd port
npm install
npm run build

# Install PM2
npm install -g pm2

# Start the app
pm2 start npm --name "portfolio" -- start

# Save PM2 configuration
pm2 save

# Set PM2 to start on boot
pm2 startup
```

### Using Docker

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

### Using Nginx Reverse Proxy

1. Start your Next.js app on port 3000

2. Configure Nginx:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

3. Enable HTTPS with Let's Encrypt:
```bash
sudo certbot --nginx -d yourdomain.com
```

## Environment Variables

If you add environment variables later, configure them in your hosting platform:

### Vercel
```bash
vercel env add VARIABLE_NAME
```

Or in the Vercel dashboard: Settings → Environment Variables

### Netlify
Site settings → Build & deploy → Environment → Environment variables

### Other Platforms
Check their respective documentation for environment variable configuration.

## Performance Optimization for Production

1. **Enable Image Optimization**: Already configured in Next.js by default

2. **Add Analytics** (Optional):
   - Vercel Analytics: Enable in Vercel dashboard
   - Google Analytics: Add to `app/layout.tsx`
   - Plausible/Fathom: Add script tags

3. **Enable Caching**:
   - Most platforms handle this automatically
   - For custom hosting, configure CDN (Cloudflare, etc.)

4. **Optimize 3D Assets**:
   - Use Draco compression for GLB files
   - Keep total size under 10MB
   - Consider lazy loading for multiple models

## Monitoring

- **Vercel**: Built-in analytics and speed insights
- **Netlify**: Analytics add-on available
- **Self-hosted**: Use tools like New Relic, DataDog, or pm2 monitoring

## Troubleshooting

### Build Fails

1. Check Node.js version (should be 18+)
2. Clear cache: `rm -rf .next node_modules && npm install`
3. Check for TypeScript errors: `npm run type-check`

### 3D Model Not Loading

1. Verify file path is `/models/hero.glb`
2. Check file size (under 50MB for most platforms)
3. Ensure file is committed to git
4. Check browser console for errors

### Performance Issues

1. Reduce shadow quality in `Scene.tsx`
2. Lower polygon count of 3D model
3. Enable CDN and caching
4. Use adaptive `dpr` in Canvas component (already configured)

### Mobile Not Working

1. Test locally with browser DevTools device emulation
2. Check that mobile optimizations are enabled in `Scene.tsx`
3. Verify responsive CSS in `globals.css`

## Post-Deployment

1. Test your live site on multiple devices
2. Run Lighthouse audit in Chrome DevTools
3. Test accessibility with screen readers
4. Monitor performance in your hosting dashboard
5. Set up uptime monitoring (UptimeRobot, Pingdom, etc.)

---

Need help? Check the [Next.js Deployment Documentation](https://nextjs.org/docs/deployment) or the specific documentation for your hosting platform.

