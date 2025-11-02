'use client'

import { useEffect, useState } from 'react'
import { GitHubIcon, LinkedInIcon, XIcon } from '@/components/SocialIcons'

export default function ReducedMotionFallback() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  if (!prefersReducedMotion) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b0d12] text-white">
      <div className="max-w-2xl px-8 text-center">
        <h1 className="mb-4 text-5xl font-bold">Alamedin Sabit</h1>
        <p className="mb-8 text-xl opacity-85">
          Computer Science student at Dalhousie University passionate about AI, computer vision, and web development.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a 
            href="https://github.com/Lameda12" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-sm transition-all hover:bg-white/20"
          >
            <GitHubIcon />
            <span>GitHub</span>
          </a>
          <a 
            href="https://www.linkedin.com/in/alamedin-sabit" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-sm transition-all hover:bg-white/20"
          >
            <LinkedInIcon />
            <span>LinkedIn</span>
          </a>
          <a 
            href="https://x.com/AmadiSabit" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-sm transition-all hover:bg-white/20"
          >
            <XIcon />
            <span>X</span>
          </a>
        </div>
      </div>
    </div>
  )
}

