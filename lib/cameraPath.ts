import * as THREE from 'three'

export const cameraCurve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 1.4, 6),
  new THREE.Vector3(1.2, 1.2, 3.5),
  new THREE.Vector3(0.2, 1.0, 1.8),
  new THREE.Vector3(-0.6, 1.1, 2.6),
])

export const lookAtTarget = new THREE.Vector3(0, 1.1, 0)

