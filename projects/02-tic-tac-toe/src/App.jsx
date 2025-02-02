import { useState } from 'react'
import confetti from 'canvas-confetti' // Añadimos esta importación

import { Square } from './components/Square.jsx'
import { TURNS } from './constants.js'
import { checkWinnerFrom } from './components/logic/board.js'
import { checkEndGame } from './components/logic/board.js'
import { WinnerModal } from './components/WinnerModal.jsx'
import { saveGameToStorage } from './components/logic/storage/index.js'
import { resetGameStorage } from './components/logic/storage/index.js'

function App () {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()
  }

  const updateBoard = (index) => {
    // No actualizamos si la casilla está ocupada o hay ganador
    if (board[index] || winner) return

    // Actualizamos el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // Revisamos si hay ganador antes de cambiar el turno
    const newWinner = checkWinnerFrom(newBoard)
    
    if (newWinner) {
      setWinner(newWinner)
      try {
        confetti() // Lanzamos el confetti dentro de un try-catch por si no está disponible
      } catch (error) {
        console.log('Confetti not available')
      }
      return // Importante: terminamos la ejecución aquí si hay ganador
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // empate
      return
    }

    // Si no hay ganador ni empate, cambiamos el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // Guardamos el estado
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })
  }

  return (
    <main className='board'>
      <h1 translate="no">Tic tac toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App