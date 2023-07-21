import type { Ref } from 'vue'
import restartPiece from './restart-piece'
import { DirectionEnum, type BoardCell } from '@/models'
import type { Piece } from '@/models/piece'
import { StateEnum } from '@/models'

const tick = (
  piece: Ref<Piece>,
  nextPiece: Ref<Piece>,
  board: Ref<BoardCell[][]>,
  linesFilled: Ref<number>,
  level: Ref<number>,
  points: Ref<number>,
  state: Ref<StateEnum>,
  tickInterval: Ref<number>,
) => {
  const pieceAlreadyEnteredTheBoard = Array.from(piece.value.coords).every(
    ({ row }) => row > 0
  )

  const overflowsBoard =
    !pieceAlreadyEnteredTheBoard &&
    !piece.value.moveIsValid(DirectionEnum.Down, board.value)

  if (overflowsBoard) {
    state.value = StateEnum.Gameover
    return
  }

  if (
    !pieceAlreadyEnteredTheBoard ||
    piece.value.moveIsValid(DirectionEnum.Down, board.value)
  ) {
    piece.value.moveDown()
  } else {
    restartPiece(piece, nextPiece, board, linesFilled, level, points, tickInterval)
  }
}

export default tick
