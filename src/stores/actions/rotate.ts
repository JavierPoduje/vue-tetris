import type { Piece } from '@/models/piece'
import type { Ref } from 'vue'

const rotate = (
  piece: Ref<Piece>,
  numberOfRows: number,
  numberOfCols: number,
  clockwise: boolean,
) => {
  if (piece.value.rotationIsValid(clockwise, numberOfRows, numberOfCols)) {
    piece.value.rotate(clockwise)
  }
}

export default rotate
