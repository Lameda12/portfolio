'use client'

import { HoleBackground } from '@/components/animate-ui/components/backgrounds/hole'

export const HoleBackgroundDemo = () => {
  return (
    <HoleBackground className="absolute inset-0 flex items-center justify-center rounded-xl">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-white">Hole Background</h2>
        <p className="text-white/80">Animated gradient holes with grid overlay</p>
      </div>
    </HoleBackground>
  )
}

