import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
	type RapierRigidBody,
	RigidBody,
	type RigidBodyProps,
} from "@react-three/rapier";
import { useControls } from "leva";
import { useEffect, useRef } from "react";
import { type Group, MathUtils, Vector3 } from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import { PlayerMesh } from "./PlayerMesh";

const normalizeAngle = (angle: number) => {
	let normalizedAngle = angle;
	while (normalizedAngle > Math.PI) normalizedAngle -= 2 * Math.PI;
	while (normalizedAngle < -Math.PI) normalizedAngle += 2 * Math.PI;
	return normalizedAngle;
};

const lerpAngle = (start: number, end: number, t: number) => {
	let normalizedStart = normalizeAngle(start);
	let normalizedEnd = normalizeAngle(end);

	if (Math.abs(normalizedEnd - normalizedStart) > Math.PI) {
		if (normalizedEnd > normalizedStart) {
			normalizedStart += 2 * Math.PI;
		} else {
			normalizedEnd += 2 * Math.PI;
		}
	}

	return normalizeAngle(
		normalizedStart + (normalizedEnd - normalizedStart) * t,
	);
};

export const PlayerController = (props: RigidBodyProps) => {
	const { SPEED, ROTATION_SPEED } = useControls("Character Control", {
		SPEED: { value: 2.5, min: 0.1, max: 4, step: 0.1 },
		ROTATION_SPEED: {
			value: 1.5,
		},
	});
	const rb = useRef<RapierRigidBody>(null);
	const container = useRef<Group>(null);
	const character = useRef<Group>(null);

	const characterRotationTarget = useRef(0);
	const rotationTarget = useRef(0);
	const cameraTarget = useRef<Group>(null);
	const cameraPosition = useRef<Group>(null);
	const cameraWorldPosition = useRef(new Vector3());
	const cameraLookAtWorldPosition = useRef(new Vector3());
	const cameraLookAt = useRef(new Vector3());
	const [, get] = useKeyboardControls();

	useFrame(({ camera }) => {
		if (
			!rb.current ||
			!cameraTarget.current ||
			!cameraPosition.current ||
			!character.current ||
			!container.current
		) {
			return;
		}

		const vel = rb.current.linvel();

		const movement = {
			x: 0,
			z: 0,
		};

		if (get().forward) {
			movement.z = 1;
		}
		if (get().backward) {
			movement.z = -1;
		}

		if (get().left) {
			movement.x = 1;
		}
		if (get().right) {
			movement.x = -1;
		}

		if (movement.x !== 0) {
			rotationTarget.current += degToRad(ROTATION_SPEED) * movement.x;
		}

		if (movement.x !== 0 || movement.z !== 0) {
			characterRotationTarget.current = Math.atan2(movement.x, movement.z);
			vel.x =
				Math.sin(rotationTarget.current + characterRotationTarget.current) *
				SPEED;
			vel.z =
				Math.cos(rotationTarget.current + characterRotationTarget.current) *
				SPEED;
		}

		character.current.rotation.y = lerpAngle(
			character.current.rotation.y,
			characterRotationTarget.current,
			0.1,
		);

		rb.current.setLinvel(vel, true);

		// CAMERA
		container.current.rotation.y = MathUtils.lerp(
			container.current.rotation.y,
			rotationTarget.current,
			0.1,
		);

		cameraPosition.current.getWorldPosition(cameraWorldPosition.current);
		camera.position.lerp(cameraWorldPosition.current, 0.1);

		if (cameraTarget.current) {
			cameraTarget.current.getWorldPosition(cameraLookAtWorldPosition.current);
			cameraLookAt.current.lerp(cameraLookAtWorldPosition.current, 0.1);

			camera.lookAt(cameraLookAt.current);
		}
	});

	return (
		<RigidBody colliders="ball" lockRotations ref={rb} {...props}>
			<group ref={container}>
				<group ref={cameraTarget} position-z={0.5} />
				<group ref={cameraPosition} position-y={2} position-z={0} />
				<group ref={character}>
					<PlayerMesh />
				</group>
			</group>
		</RigidBody>
	);
};
