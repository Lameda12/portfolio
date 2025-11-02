'use client'

import { cn } from '@/lib/utils'

interface HoleBackgroundProps {
  className?: string
  children?: React.ReactNode
}

export const HoleBackground = ({ className, children }: HoleBackgroundProps) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden',
        className
      )}
      style={{
        background: 'linear-gradient(135deg, #0a0118 0%, #1a0a2e 25%, #16213e 50%, #0f3460 75%, #0a0118 100%)',
      }}
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0">
        {/* Large center orb - purple/pink */}
        <div 
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, rgba(219, 39, 119, 0.3) 50%, transparent 70%)',
            animation: 'pulse 8s ease-in-out infinite',
          }}
        />
        
        {/* Top left orb - cyan/blue */}
        <div 
          className="absolute left-[10%] top-[15%] h-[400px] w-[400px] rounded-full opacity-25 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, rgba(59, 130, 246, 0.3) 50%, transparent 70%)',
            animation: 'float 10s ease-in-out infinite',
            animationDelay: '1s',
          }}
        />
        
        {/* Bottom right orb - pink/purple */}
        <div 
          className="absolute bottom-[10%] right-[15%] h-[450px] w-[450px] rounded-full opacity-25 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, rgba(168, 85, 247, 0.3) 50%, transparent 70%)',
            animation: 'float 12s ease-in-out infinite',
            animationDelay: '2s',
          }}
        />

        {/* Small accent orbs */}
        <div 
          className="absolute right-[25%] top-[35%] h-[250px] w-[250px] rounded-full opacity-20 blur-2xl"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, transparent 70%)',
            animation: 'pulse 6s ease-in-out infinite',
            animationDelay: '0.5s',
          }}
        />
        
        {/* Subtle grid overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* Vignette effect */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%)',
          }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(30px, -30px); }
          66% { transform: translate(-20px, 20px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
      `}</style>
    </div>
  )
}

