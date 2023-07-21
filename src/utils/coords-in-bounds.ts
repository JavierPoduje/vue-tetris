import coordInBounds from './coord-in-bounds'
import type { Coord } from '@/models'

const coordsInBounds = (
  coords: Coord[],
  rows: number,
  cols: number
): boolean => {
  return coords?.every((coord) => coordInBounds(coord, rows, cols))
}

export default coordsInBounds
