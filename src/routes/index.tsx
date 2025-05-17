import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: IndexRoute,
})

function IndexRoute() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
      <h1 className="text-4xl font-bold mb-8">Maze Game</h1>
      <Link
        to="/game"
        className="px-6 py-3 bg-[#61dafb] text-black rounded-lg hover:bg-[#4fa8c9] transition-colors"
      >
        Start Game
      </Link>
    </div>
  )
}
