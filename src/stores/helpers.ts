import {
  PieceColorEnum,
  PieceEnum,
  type Piece,
  DirectionEnum,
  type Coord
} from '@/models'

const initialCoordsByPiece = (pieceType: PieceEnum): Piece['coords'] => {
  switch (pieceType) {
    case PieceEnum.I:
      return new Set([
        { row: -3, col: 4 },
        { row: -2, col: 4 },
        { row: -1, col: 4 },
        { row: 0, col: 4 }
      ])
    case PieceEnum.J:
      return new Set([
        { row: -2, col: 5 },
        { row: -1, col: 5 },
        { row: 0, col: 5 },
        { row: 0, col: 4 }
      ])
    case PieceEnum.L:
      return new Set([
        { row: -2, col: 4 },
        { row: -1, col: 4 },
        { row: 0, col: 4 },
        { row: 0, col: 5 }
      ])
    case PieceEnum.O:
      return new Set([
        { row: -1, col: 4 },
        { row: -1, col: 5 },
        { row: 0, col: 4 },
        { row: 0, col: 5 }
      ])
    case PieceEnum.S:
      return new Set([
        { row: -1, col: 5 },
        { row: -1, col: 4 },
        { row: 0, col: 4 },
        { row: 0, col: 3 }
      ])
    case PieceEnum.T:
      return new Set([
        { row: -1, col: 4 },
        { row: 0, col: 4 },
        { row: 0, col: 5 },
        { row: 0, col: 3 }
      ])
    case PieceEnum.Z:
      return new Set([
        { row: -1, col: 3 },
        { row: -1, col: 4 },
        { row: 0, col: 4 },
        { row: 0, col: 5 }
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

  const type = pieces[Math.floor(Math.random() * pieces.length)]
  const color = colors[Math.floor(Math.random() * colors.length)]

  return {
    type,
    color,
    coords: initialCoordsByPiece(type),
    lookingTo: DirectionEnum.Up
  }
}

// pieces are only moved if the movement keeps them inside the board
export const movePiece = (
  piece: Piece,
  direction: DirectionEnum,
  numberOfRows: number,
  numberOfCols: number
): Piece['coords'] => {
  if (direction === DirectionEnum.Up) {
    throw new Error('Cannot move piece up')
  }

  const moveCoord = {
    down: ({ row, col }: Coord): Coord => ({ row: row + 1, col }),
    left: ({ row, col }: Coord): Coord => ({ row, col: col - 1 }),
    right: ({ row, col }: Coord): Coord => ({ row, col: col + 1 })
  }[direction]

  const inBounds = ({ row, col }: Coord, direction: DirectionEnum): boolean => {
    if (direction === DirectionEnum.Down) {
      return row < numberOfRows - 1
    } else if (direction === DirectionEnum.Left) {
      return col > 0
    } else if (direction === DirectionEnum.Right) {
      return col < numberOfCols - 1
    } else {
      throw new Error(`Unknown direction: ${direction}`)
    }
  }

  // convert the piece's coords to an array of Coord objects
  const pieceCoords: Coord[] = Array.from(piece.coords ?? [])

  // if every piece is in bounds, move the piece
  if (pieceCoords.every((coord) => inBounds(coord, direction))) {
    return pieceCoords?.reduce((acc, coord) => {
      acc.add(moveCoord(coord))
      return acc
    }, new Set<Coord>())
  }

  // otherwise, return the original piece
  return piece?.coords
}
