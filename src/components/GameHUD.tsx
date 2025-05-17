import { useGameStore } from '../stores/gameStore'

export function GameHUD() {
  const score = useGameStore((state) => state.score)

  return (
    <div style={{
      position: 'fixed',
      top: 20,
      right: 20,
      background: 'rgba(0, 0, 0, 0.5)',
      color: 'white',
      padding: '10px 20px',
      borderRadius: 8,
      fontFamily: 'sans-serif'
    }}>
      Score: {score}
    </div>
  )
}
