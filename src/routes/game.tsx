import { PlayerController } from "@/components/PlayerControl";
import { useGameStore } from "@/stores/gameStore";
import { KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { createFileRoute } from "@tanstack/react-router";
import { GameHUD } from "../components/GameHUD";
import { Goal } from "../components/Goal";
import { Maze } from "../components/Maze";

export const Route = createFileRoute("/game")({
	component: Game,
});

const keyboardMap = [
	{ name: "forward", keys: ["ArrowUp", "KeyW"] },
	{ name: "backward", keys: ["ArrowDown", "KeyS"] },
	{ name: "left", keys: ["ArrowLeft", "KeyA"] },
	{ name: "right", keys: ["ArrowRight", "KeyD"] },
];
function Game() {
	const { mazeSize, maze } = useGameStore();

	return (
		<div style={{ width: "100vw", height: "100vh" }}>
			<GameHUD />
			<Canvas>
				<Physics key={JSON.stringify(maze)}>
					<directionalLight position={[0, 10, 0]} intensity={1} />
					<ambientLight intensity={0.5} />
					<Maze />
					<KeyboardControls map={keyboardMap}>
						<PlayerController position={[0.5, 0.5, 0.5]} />
					</KeyboardControls>
					<group position={[mazeSize - 0.5, 0.5, mazeSize - 0.5]}>
						<Goal />
					</group>
				</Physics>
			</Canvas>
		</div>
	);
}
