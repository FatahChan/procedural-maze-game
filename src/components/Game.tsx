import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { OrbitControls } from '@react-three/drei'
import { Maze } from './Maze'
import { Player } from './Player'

export function Game() {
  return (
    <Canvas camera={{ position: [5, 15, 5], fov: 50 }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 10, 5]} intensity={1} />
      <Physics debug>
        <Maze />
        <Player />
      </Physics>
      <OrbitControls target={[5, 0, 5]} maxPolarAngle={Math.PI / 2.5} />
    </Canvas>
  )
}
