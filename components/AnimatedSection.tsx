'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  animationClass: string
  delay?: string
}

export default function AnimatedSection({ children, animationClass, delay = '' }: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '-50px',
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`scroll-animate ${animationClass} ${delay}`}
    >
      {children}
    </div>
  )
}

