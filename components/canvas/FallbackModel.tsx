'use client'

import { useRef } from 'react'
import { useFrame, ThreeElements } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Fallback model shown when hero.glb is not available
export default function FallbackModel(props: ThreeElements['group']) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <group {...props}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <torusKnotGeometry args={[0.8, 0.3, 128, 32]} />
        <MeshDistortMaterial
          color="#6366f1"
          metalness={0.8}
          roughness={0.2}
          distort={0.4}
          speed={2}
        />
      </mesh>
      <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <shadowMaterial opacity={0.3} />
      </mesh>
    </group>
  )
}

