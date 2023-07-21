import { DirectionEnum, type BoardCell } from '@/models'
import type { Piece } from '@/models/piece'
import type { Ref } from 'vue'

const moveLeft = (piece: Ref<Piece>, board: Ref<BoardCell[][]>) => {
  if (piece.value.moveIsValid(DirectionEnum.Left, board.value)) {
    piece.value.moveLeft()
  }
}

export default moveLeft
