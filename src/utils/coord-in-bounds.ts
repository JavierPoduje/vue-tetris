import type { Coord } from '@/models'

const coordInBounds = (
  { row, col }: Coord,
  numberOfRows: number,
  numberOfCols: number
): boolean => {
  return row >= 0 && row < numberOfRows && col >= 0 && col < numberOfCols
}

export default coordInBounds
