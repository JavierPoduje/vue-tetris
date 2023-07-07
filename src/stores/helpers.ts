import { PieceColorEnum, PieceEnum, type Piece } from '@/models'
import stringifyCoord from '@/utils/stringifyCoord'

const initialCoordsByPiece = (pieceType: PieceEnum): Set<string> => {
  switch (pieceType) {
    case PieceEnum.I:
      return new Set([
        stringifyCoord({ row: -3, col: 4 }),
        stringifyCoord({ row: -2, col: 4 }),
        stringifyCoord({ row: -1, col: 4 }),
        stringifyCoord({ row: 0, col: 4 })
      ])
    case PieceEnum.J:
      return new Set([
        stringifyCoord({ row: -2, col: 4 }),
        stringifyCoord({ row: -1, col: 4 }),
        stringifyCoord({ row: 0, col: 4 }),
        stringifyCoord({ row: 0, col: 5 })
      ])
    case PieceEnum.L:
      return new Set([
        stringifyCoord({ row: -2, col: 5 }),
        stringifyCoord({ row: -1, col: 5 }),
        stringifyCoord({ row: 0, col: 5 }),
        stringifyCoord({ row: 0, col: 4 })
      ])
    case PieceEnum.O:
      return new Set([
        stringifyCoord({ row: -1, col: 4 }),
        stringifyCoord({ row: -1, col: 5 }),
        stringifyCoord({ row: 0, col: 4 }),
        stringifyCoord({ row: 0, col: 5 })
      ])
    case PieceEnum.S:
      return new Set([
        stringifyCoord({ row: -1, col: 5 }),
        stringifyCoord({ row: -1, col: 4 }),
        stringifyCoord({ row: 0, col: 4 }),
        stringifyCoord({ row: 0, col: 3 })
      ])
    case PieceEnum.T:
      return new Set([
        stringifyCoord({ row: -1, col: 4 }),
        stringifyCoord({ row: 0, col: 4 }),
        stringifyCoord({ row: 0, col: 5 }),
        stringifyCoord({ row: 0, col: 3 })
      ])
    case PieceEnum.Z:
      return new Set([
        stringifyCoord({ row: -1, col: 3 }),
        stringifyCoord({ row: -1, col: 4 }),
        stringifyCoord({ row: 0, col: 4 }),
        stringifyCoord({ row: 0, col: 5 })
      ])
    default:
      throw new Error(`Unknown piece type: ${pieceType}`)
  }
}

export const randomPiece = (): Piece => {
  const pieces: PieceEnum[] = [
    PieceEnum.I,
    PieceEnum.J,
    PieceEnum.L,
    PieceEnum.O,
    PieceEnum.S,
    PieceEnum.T,
    PieceEnum.Z
  ]
  const colors: PieceColorEnum[] = [
    PieceColorEnum.ROSEWATER,
    PieceColorEnum.SKY,
    PieceColorEnum.GREEN,
    PieceColorEnum.PEACH,
    PieceColorEnum.MAUVE,
    PieceColorEnum.RED,
    PieceColorEnum.YELLOW
  ]

  const pieceType = pieces[Math.floor(Math.random() * pieces.length)]
  const color = colors[Math.floor(Math.random() * colors.length)]

  return { type: pieceType, color, coords: initialCoordsByPiece(pieceType) }
}

export const movePiece = (
  piece: Piece,
  direction: 'down' | 'left' | 'right'
): Piece['coords'] => {
  const unstringifyCoord = (coord: string): number[] =>
    coord.split('|').map(Number)

  const moveCoordDown = (coord: string): string => {
    const [row, col] = unstringifyCoord(coord)
    return stringifyCoord({ row: row + 1, col })
  }

  const moveCoordLeft = (coord: string): string => {
    const [row, col] = unstringifyCoord(coord)
    return stringifyCoord({ row, col: col - 1 })
  }

  const moveCoordRight = (coord: string): string => {
    const [row, col] = unstringifyCoord(coord)
    return stringifyCoord({ row, col: col + 1 })
  }

  const moveCoord = {
    down: moveCoordDown,
    left: moveCoordLeft,
    right: moveCoordRight
  }[direction]

  const newCoords = new Set<string>()

  piece.coords.forEach((coord) => newCoords?.add(moveCoord(coord)))

  return newCoords
}
