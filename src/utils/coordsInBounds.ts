import type { Coord } from '@/models'

const coordsInBounds = (
  coords: Coord[],
  rows: number,
  cols: number
): boolean => {
  const coordInBounds = ({ row, col }: Coord) =>
    row >= 0 && row < rows && col >= 0 && col < cols
  return coords?.every(coordInBounds)
}

export default coordsInBounds
