import { DirectionEnum, type BoardCell, type Piece } from '@/models'
import type { Ref } from 'vue'

const moveRight = (piece: Ref<Piece>, board: Ref<BoardCell[][]>) => {
  if (piece.value.moveIsValid(DirectionEnum.Right, board.value)) {
    piece.value.moveRight()
  }
}

export default moveRight
