import { useFrame } from '@react-three/fiber'
import { type RapierRigidBody, RigidBody } from '@react-three/rapier'
import { useEffect, useRef } from 'react'
import { Vector3 } from 'three'

export function Player() {
  const playerRef = useRef<RapierRigidBody>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!playerRef.current) return

      const impulse = new Vector3()
      console.log(playerRef.current)
      const impulseStrength = 0.8 // Reduced impulse strength for better control

      switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          impulse.z = -impulseStrength
          break
        case 's':
        case 'arrowdown':
          impulse.z = impulseStrength
          break
        case 'a':
        case 'arrowleft':
          impulse.x = -impulseStrength
          break
        case 'd':
        case 'arrowright':
          impulse.x = impulseStrength
          break
      }

      playerRef.current.applyImpulse(impulse, true)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useFrame(() => {
    if (!playerRef.current) return

    const velocity = playerRef.current.linvel()
    const position = playerRef.current.translation()

    // Apply a downward impulse when the ball is above the desired height
    if (position.y > 0.5) {
      const heightDiff = position.y - 0.5
      const downwardImpulse = new Vector3(0, -heightDiff * 0.1, 0)
      playerRef.current.applyImpulse(downwardImpulse, true)
    }

    // Apply stronger horizontal damping
    playerRef.current.setLinvel({
      x: velocity.x * 0.85, // Increased damping
      y: velocity.y * 0.9, // Added some vertical damping
      z: velocity.z * 0.85, // Increased damping
    }, true)
  })

  return (
    <RigidBody
      ref={playerRef}
      colliders="ball"
      position={[0.5, 0.5, 0.5]}
      restitution={0.05} // Reduced bouncing
      friction={2} // Increased friction
      linearDamping={1} // Increased damping
      angularDamping={0.5} // Added angular damping to reduce rolling
      mass={1.5} // Increased mass for more stability
      gravityScale={1} // Normal gravity
      args={[0.35]} // Larger collider size
    >
      <mesh>
        <sphereGeometry args={[0.3]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    </RigidBody>
  )
}
