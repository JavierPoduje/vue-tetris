import type { Ref } from 'vue'
import { DirectionEnum, type BoardCell, type Piece } from '@/models'

const moveLeft = (piece: Ref<Piece>, board: Ref<BoardCell[][]>) => {
  if (piece.value.moveIsValid(DirectionEnum.Left, board.value)) {
    piece.value.moveLeft()
  }
}

export default moveLeft
