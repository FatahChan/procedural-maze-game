import { create } from "zustand";
import { generateMaze } from "../utils/mazeGenerator";

interface GameState {
	mazeSize: number;
	maze: ReturnType<typeof generateMaze>;
	score: number;
	onGoal: () => void;
}

export const useGameStore = create<GameState>((set) => ({
	mazeSize: 4,
	get maze() {
		return generateMaze(this.mazeSize, this.mazeSize);
	},
	score: 0,
	onGoal: () => {
		set((state) => ({ score: state.score + 1 }));
		set((state) => ({ mazeSize: state.mazeSize + 1 }));
		set((state) => ({ maze: generateMaze(state.mazeSize, state.mazeSize) }));
	},
}));
