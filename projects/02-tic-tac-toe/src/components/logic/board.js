import { WINNER_COMBOS } from "../../constants"

export const checkWinnerFrom = (boardToCheck) => {
  // revisamos todas las combinaciones ganadoras
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo
    if (
      boardToCheck[a] && // verifica que la casilla no esté vacía
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a] // retorna el símbolo ganador (X u O)
    }
  }
  return null // si no hay ganador
}

export const checkEndGame = (newBoard) => {
  // revisamos si hay un empate
  return newBoard.every((square) => square !== null)
}