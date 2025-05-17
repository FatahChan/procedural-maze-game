interface Cell {
  x: number;
  y: number;
  visited: boolean;
  walls: {
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
  };
}

type WallDirection = keyof Cell['walls'];

export function generateMaze(width: number, height: number) {
  // Initialize the grid
  const grid: Cell[][] = Array(height)
    .fill(null)
    .map((_, y) =>
      Array(width)
        .fill(null)
        .map((_, x) => ({
          x,
          y,
          visited: false,
          walls: { top: true, right: true, bottom: true, left: true },
        }))
    );

  // Recursive backtracking algorithm
  function carve(x: number, y: number) {
    grid[y][x].visited = true;

    const directions = [
      { dx: 0, dy: -1, wall: 'top' as WallDirection, opposite: 'bottom' as WallDirection },
      { dx: 1, dy: 0, wall: 'right' as WallDirection, opposite: 'left' as WallDirection },
      { dx: 0, dy: 1, wall: 'bottom' as WallDirection, opposite: 'top' as WallDirection },
      { dx: -1, dy: 0, wall: 'left' as WallDirection, opposite: 'right' as WallDirection },
    ];

    // Shuffle directions
    directions.sort(() => Math.random() - 0.5);

    for (const dir of directions) {
      const newX = x + dir.dx;
      const newY = y + dir.dy;

      if (
        newX >= 0 &&
        newX < width &&
        newY >= 0 &&
        newY < height &&
        !grid[newY][newX].visited
      ) {
        grid[y][x].walls[dir.wall] = false;
        grid[newY][newX].walls[dir.opposite] = false;
        carve(newX, newY);
      }
    }
  }

  // Start from a random point
  carve(Math.floor(Math.random() * width), Math.floor(Math.random() * height));

  return grid;
}
