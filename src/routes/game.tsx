import { createFileRoute } from '@tanstack/react-router'
import { Game } from '../components/Game'

export const Route = createFileRoute('/game')({
  component: GameRoute,
})

function GameRoute() {
  return (
    <div className="w-screen h-screen">
      <Game />
    </div>
  )
}
