'use client'

import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll, Environment, Loader } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import Scene from '@/components/canvas/Scene'
import ReducedMotionFallback from '@/components/canvas/ReducedMotionFallback'
import { GitHubIcon, LinkedInIcon, XIcon, EmailIcon } from '@/components/SocialIcons'
import AnimatedSection from '@/components/AnimatedSection'
import { HoleBackground } from '@/components/animate-ui/components/backgrounds/hole'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <ReducedMotionFallback />
      <main className="h-screen w-full">
        <Canvas 
          key="main-canvas"
          camera={{ fov: 45, position: [0, 1.2, 6] }}
          gl={{ antialias: true, alpha: false }}
          dpr={[1, 2]} // Adaptive pixel ratio for performance
        >
          <color attach="background" args={['#0b0d12']} />
          <ScrollControls pages={4} damping={0.18}>
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
            <Scroll html style={{ width: '100%' }}>
              <section className="section s1">
                <AnimatedSection animationClass="animate-spring-smooth">
                  <h1>Alamedin Sabit</h1>
                </AnimatedSection>
                <AnimatedSection animationClass="animate-spring-smooth" delay="delay-200">
                  <p>
                    Computer Science student at Dalhousie University passionate about AI, 
                    computer vision, and building innovative web applications that solve real problems.
                  </p>
                </AnimatedSection>
              </section>

              <section className="section s2">
                <AnimatedSection animationClass="animate-spring-bouncy">
                  <h2>Featured Projects</h2>
                </AnimatedSection>
                <AnimatedSection animationClass="animate-spring-bouncy" delay="delay-100">
                  <p>
                    From Eye Draw, a computer vision program using real-time eye tracking, 
                    to MinTask, a minimal to-do app loved for its clean design—each project 
                    showcases practical AI and web development skills.
                  </p>
                </AnimatedSection>
                <AnimatedSection animationClass="animate-rotate-scale" delay="delay-300">
                  <a 
                    href="https://github.com/Lameda12" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="button-spring"
                  >
                    View GitHub Projects
                  </a>
                </AnimatedSection>
              </section>

              <section className="section s3">
                <AnimatedSection animationClass="animate-spring-elastic">
                  <h2>Skills & Experience</h2>
                </AnimatedSection>
                <AnimatedSection animationClass="animate-spring-elastic" delay="delay-200">
                  <p>
                    Proficient in Python, Java, JavaScript, HTML, and CSS. 
                    Experience with TensorFlow, computer vision, data analytics, 
                    and responsive design. Founder of MinTask.
                  </p>
                </AnimatedSection>
              </section>

              <section className="section s4">
                <AnimatedSection animationClass="animate-bounce-drop">
                  <h2>Let&apos;s Connect</h2>
                </AnimatedSection>
                <AnimatedSection animationClass="animate-bounce-drop" delay="delay-100">
                  <p>
                    Interested in AI, data science, and product development? 
                    Let&apos;s collaborate on innovative projects.
                  </p>
                </AnimatedSection>
                <AnimatedSection animationClass="animate-bounce-drop" delay="delay-200">
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <a 
                      href="mailto:asabitt29@gmail.com" 
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                      className="button-spring"
                    >
                      <EmailIcon />
                      <span>Email Me</span>
                    </a>
                    <a 
                      href="https://github.com/Lameda12" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                      className="button-spring"
                    >
                      <GitHubIcon />
                      <span>GitHub</span>
                    </a>
                    <a 
                      href="https://x.com/AmadiSabit" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                      className="button-spring"
                    >
                      <XIcon />
                      <span>X</span>
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/alamedin-sabit" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                      className="button-spring"
                    >
                      <LinkedInIcon />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </AnimatedSection>
              </section>
            </Scroll>
          </ScrollControls>
          <Environment preset="city" />
        </Canvas>
        <Loader 
          containerStyles={{ background: '#0b0d12' }}
          innerStyles={{ background: '#6366f1' }}
          barStyles={{ background: '#818cf8' }}
          dataStyles={{ color: '#e0e7ff' }}
        />
      </main>
    </>
  )
}
