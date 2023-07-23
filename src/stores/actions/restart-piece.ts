import type { Ref } from 'vue'
import updateBoard from './update-board'
import { getRandomPiece } from '@/utils'
import type { BoardCell, Piece } from '@/models'

const restartPiece = (
  piece: Ref<Piece>,
  nextPiece: Ref<Piece>,
  board: Ref<BoardCell[][]>,
  linesFilled: Ref<number>,
  level: Ref<number>,
  points: Ref<number>,
  tickInterval: Ref<number>
) => {
  piece.value.coords.forEach(({ row, col }) => {
    board.value[row][col] = {
      color: piece.value.color,
      used: true
    }
  })

  updateBoard(board, linesFilled, level, points, tickInterval)

  piece.value = nextPiece.value
  nextPiece.value = getRandomPiece()
}

export default restartPiece
