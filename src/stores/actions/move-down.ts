import { DirectionEnum, type BoardCell, type Piece } from '@/models'
import restartPiece from './restart-piece'
import type { Ref } from 'vue'

const moveDown = (
  piece: Ref<Piece>,
  nextPiece: Ref<Piece>,
  board: Ref<BoardCell[][]>,
  linesFilled: Ref<number>,
  level: Ref<number>,
  points: Ref<number>,
  tickInterval: Ref<number>
) => {
  if (piece.value.moveIsValid(DirectionEnum.Down, board.value)) {
    piece.value.moveDown()
  } else {
    restartPiece(
      piece,
      nextPiece,
      board,
      linesFilled,
      level,
      points,
      tickInterval
    )
  }
}

export default moveDown
