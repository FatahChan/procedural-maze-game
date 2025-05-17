import { useGameStore } from "@/stores/gameStore";
import { RigidBody } from "@react-three/rapier";

export function Goal() {
	const { onGoal } = useGameStore();

	return (
		<RigidBody
			type="fixed"
			colliders="ball"
			sensor
			onIntersectionEnter={() => {
				onGoal();
			}}
		>
			<mesh>
				<sphereGeometry args={[0.3]} />
				<meshStandardMaterial color="#ffd700" />
			</mesh>
		</RigidBody>
	);
}
