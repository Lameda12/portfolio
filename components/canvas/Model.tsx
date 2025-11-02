'use client'

import { useGLTF } from '@react-three/drei'
import { useEffect, useState } from 'react'
import FallbackModel from './FallbackModel'
import { ThreeElements } from '@react-three/fiber'

export default function Model(props: ThreeElements['group']) {
  const [modelStatus, setModelStatus] = useState<'checking' | 'exists' | 'missing'>('checking')
  
  useEffect(() => {
    // Check if the model file exists
    fetch('/models/hero.glb', { method: 'HEAD' })
      .then(response => {
        setModelStatus(response.ok ? 'exists' : 'missing')
      })
      .catch(() => {
        setModelStatus('missing')
      })
  }, [])

  // Show fallback while checking or if model doesn't exist
  if (modelStatus !== 'exists') {
    return <FallbackModel {...props} />
  }

  // Only call useGLTF when we know the model exists
  const gltf = useGLTF('/models/hero.glb') as any
  return <primitive object={gltf.scene} {...props} />
}

