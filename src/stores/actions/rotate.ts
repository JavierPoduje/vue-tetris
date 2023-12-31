import type { Ref } from 'vue'
import type { Piece } from '@/models'

const rotate = (
  piece: Ref<Piece>,
  numberOfRows: number,
  numberOfCols: number,
  clockwise: boolean
) => {
  if (piece.value.rotationIsValid(clockwise, numberOfRows, numberOfCols)) {
    piece.value.rotate(clockwise)
  }
}

export default rotate
