import type { BoardCell } from '@/models'
import { type Ref } from 'vue'

const updateBoard = (
  board: Ref<BoardCell[][]>,
  linesFilled: Ref<number>,
  level: Ref<number>,
  points: Ref<number>
) => {
  let boardUpdated = true
  while (boardUpdated) {
    boardUpdated = false
    let linesFilledInIteration = 0
    for (let row = 0; row < board.value.length; row++) {
      const isRowFull = board.value[row].every(({ used }) => used)
      if (isRowFull) {
        // increase the lines filled
        linesFilled.value++
        linesFilledInIteration++
        if (linesFilled.value > 10 && linesFilled.value % 10 === 0) {
          level.value++
        }
        boardUpdated = true
        // remove the row
        board.value.splice(row, 1)
        // add a new row at the top
        board.value.unshift(
          Array.from({ length: board.value[0].length }, () => ({ used: false }))
        )
      }
    }
    points.value += linesFilledInIteration * 100 * level.value
  }
}

export default updateBoard
