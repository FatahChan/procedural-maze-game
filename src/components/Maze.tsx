import { RigidBody } from '@react-three/rapier'
import { useMemo } from 'react'
import { generateMaze } from '../utils/mazeGenerator'

export function Maze() {
  const maze = useMemo(() => generateMaze(10, 10), [])

  return (
    <group>
      {/* Floor */}
      <RigidBody type="fixed">
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[5, 0, 5]}>
          <planeGeometry args={[12, 12]} />
          <meshStandardMaterial color="#666" />
        </mesh>
      </RigidBody>

      {/* Outer walls */}
      <RigidBody type="fixed">
        {/* Left wall */}
        <mesh position={[0, 0.5, 5]}>
          <boxGeometry args={[0.1, 1, 10]} />
          <meshStandardMaterial color="#444" />
        </mesh>
        {/* Right wall */}
        <mesh position={[10, 0.5, 5]}>
          <boxGeometry args={[0.1, 1, 10]} />
          <meshStandardMaterial color="#444" />
        </mesh>
        {/* Top wall */}
        <mesh position={[5, 0.5, 0]}>
          <boxGeometry args={[10, 1, 0.1]} />
          <meshStandardMaterial color="#444" />
        </mesh>
        {/* Bottom wall */}
        <mesh position={[5, 0.5, 10]}>
          <boxGeometry args={[10, 1, 0.1]} />
          <meshStandardMaterial color="#444" />
        </mesh>
      </RigidBody>

      {/* Inner Walls */}
      {maze.map((row) =>
        row.map(({x, y, walls}) => (
          <RigidBody key={`${x}-${y}`} type="fixed">
            <group position={[x, 0.5, y]}>
              {/* Top wall */}
              {walls.top && (
                <mesh position={[0.5, 0, 0]}>
                  <boxGeometry args={[1, 1, 0.1]} />
                  <meshStandardMaterial color="#444" />
                </mesh>
              )}
              {/* Right wall */}
              {walls.right && (
                <mesh position={[1, 0, 0.5]}>
                  <boxGeometry args={[0.1, 1, 1]} />
                  <meshStandardMaterial color="#444" />
                </mesh>
              )}
            </group>
          </RigidBody>
        ))
      )}
    </group>
  )
}
