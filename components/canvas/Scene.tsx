'use client'

import { useRef, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useScroll, Float, SoftShadows, BakeShadows } from '@react-three/drei'
import { cameraCurve, lookAtTarget } from '@/lib/cameraPath'
import Model from './Model'

export default function Scene() {
  const scroll = useScroll()
  const { camera } = useThree()
  const tRef = useRef(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detect mobile devices
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useFrame((_s, dt) => {
    const t = scroll.offset // 0..1
    tRef.current += (t - tRef.current) * Math.min(1, dt * 6) // ease
    const pos = cameraCurve.getPointAt(tRef.current)
    camera.position.copy(pos)
    camera.lookAt(lookAtTarget)
  })

  return (
    <group>
      {/* Use BakeShadows on mobile for better performance, SoftShadows on desktop */}
      {isMobile ? (
        <>
          <BakeShadows />
          <directionalLight position={[2.5, 5, 5]} intensity={1.2} castShadow shadow-mapSize={512} />
        </>
      ) : (
        <>
          <SoftShadows size={30} samples={12} />
          <directionalLight position={[2.5, 5, 5]} intensity={1.2} castShadow shadow-mapSize={1024} />
        </>
      )}
      
      <ambientLight intensity={0.3} />
      <Float 
        speed={isMobile ? 0.5 : 1} 
        rotationIntensity={isMobile ? 0.05 : 0.1} 
        floatIntensity={isMobile ? 0.3 : 0.6}
      >
        <Model position={[0, 0, 0]} />
      </Float>
    </group>
  )
}

