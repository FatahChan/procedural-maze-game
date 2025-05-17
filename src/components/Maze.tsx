import { RigidBody } from "@react-three/rapier";
import { useGameStore } from "../stores/gameStore";

export function Maze() {
	const { maze, mazeSize } = useGameStore();

	return (
		<group>
			{/* Floor */}
			<RigidBody type="fixed">
				<mesh
					rotation={[-Math.PI / 2, 0, 0]}
					position={[mazeSize / 2, 0, mazeSize / 2]}
				>
					<planeGeometry args={[mazeSize + 2, mazeSize + 2]} />
					<meshStandardMaterial color="#666" />
				</mesh>
			</RigidBody>

			{/* Outer walls */}
			<RigidBody type="fixed">
				{/* Left wall */}
				<mesh position={[0, 0.5, mazeSize / 2]}>
					<boxGeometry args={[0.1, 1, mazeSize]} />
					<meshStandardMaterial color="#444" />
				</mesh>
				{/* Right wall */}
				<mesh position={[mazeSize, 0.5, mazeSize / 2]}>
					<boxGeometry args={[0.1, 1, mazeSize]} />
					<meshStandardMaterial color="#444" />
				</mesh>
				{/* Top wall */}
				<mesh position={[mazeSize / 2, 0.5, 0]}>
					<boxGeometry args={[mazeSize, 1, 0.1]} />
					<meshStandardMaterial color="#444" />
				</mesh>
				{/* Bottom wall */}
				<mesh position={[mazeSize / 2, 0.5, mazeSize]}>
					<boxGeometry args={[mazeSize, 1, 0.1]} />
					<meshStandardMaterial color="#444" />
				</mesh>
			</RigidBody>

			{/* Inner Walls */}
			{maze.map((row) =>
				row.map(({ x, y, walls }) => (
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
				)),
			)}
		</group>
	);
}
