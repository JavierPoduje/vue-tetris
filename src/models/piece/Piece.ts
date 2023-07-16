import {
  PieceColorEnum,
  type Coord,
  DirectionEnum,
  type BoardCell
} from '@/models'
import { type Piece } from './index'
import { getRandomColor } from '@/utils'

class BasePiece implements Omit<Piece, 'type' | 'rotate' | 'rotationIsValid'> {
  color: PieceColorEnum
  coords: Set<Coord>
  lookingTo: DirectionEnum

  constructor() {
    this.color = getRandomColor()
    // this will be overwritten in the child class. Its here just to avoid
    // typescript errors
    this.coords = this._initialCoords()
    this.lookingTo = DirectionEnum.Up
  }

  moveRight(): void {
    const pieceCoords: Coord[] = Array.from(this.coords ?? [])
    this.coords = pieceCoords.reduce((acc, { row, col }) => {
      acc.add({ row, col: col + 1 })
      return acc
    }, new Set<Coord>())
  }

  moveDown(): void {
    const pieceCoords: Coord[] = Array.from(this.coords ?? [])
    this.coords = pieceCoords.reduce((acc, { row, col }) => {
      acc.add({ row: row + 1, col })
      return acc
    }, new Set<Coord>())
  }

  moveLeft(): void {
    const pieceCoords: Coord[] = Array.from(this.coords ?? [])
    this.coords = pieceCoords.reduce((acc, { row, col }) => {
      acc.add({ row, col: col - 1 })
      return acc
    }, new Set<Coord>())
  }

  moveIsValid(direction: DirectionEnum, board: BoardCell[][]): boolean {
    if (direction === DirectionEnum.Up) {
      throw new Error('Cannot move piece up')
    }

    const numberOfRows = board.length
    const numberOfCols = board[0].length

    const inBounds = ({ row, col }: Coord): boolean => {
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

    const cellNotUsed = ({ row, col }: Coord): boolean => {
      if (direction === DirectionEnum.Down) {
        return !board[row + 1]?.[col]?.used
      } else if (direction === DirectionEnum.Left) {
        return !board[row]?.[col - 1]?.used
      } else if (direction === DirectionEnum.Right) {
        return !board[row]?.[col + 1]?.used
      } else {
        throw new Error(`Unknown direction: ${direction}`)
      }
    }

    return Array.from(this.coords ?? []).every(
      (coord) => inBounds(coord) && cellNotUsed(coord)
    )
  }

  // *** *** *** ***
  // *** Helpers ***
  // *** *** *** ***

  _updateLookinTo(isClockwise: boolean): void {
    if (this.lookingTo === DirectionEnum.Up) {
      this.lookingTo = isClockwise ? DirectionEnum.Right : DirectionEnum.Left
    } else if (this.lookingTo === DirectionEnum.Right) {
      this.lookingTo = isClockwise ? DirectionEnum.Down : DirectionEnum.Up
    } else if (this.lookingTo === DirectionEnum.Down) {
      this.lookingTo = isClockwise ? DirectionEnum.Left : DirectionEnum.Right
    } else if (this.lookingTo === DirectionEnum.Left) {
      this.lookingTo = isClockwise ? DirectionEnum.Up : DirectionEnum.Down
    } else {
      throw new Error(`Unknown piece.lookingTo: ${this.lookingTo}`)
    }
  }

  _initialCoords(): Set<Coord> {
    return new Set([
      { row: -3, col: 4 },
      { row: -2, col: 4 },
      { row: -1, col: 4 },
      { row: 0, col: 4 }
    ])
  }

  _sortCoords(coords: Piece['coords']) {
    return Array.from(coords).sort(
      ({ row: aRow, col: aCol }, { row: bRow, col: bCol }) => {
        if (aRow < bRow) return -1
        if (aRow > bRow) return 1
        if (aCol < bCol) return -1
        if (aCol > bCol) return 1
        return 0
      }
    )
  }

  _setCoords(
    newCoords: (Partial<{
      row: (row: number) => number
      col: (col: number) => number
    }> | null)[],
    coords: Coord[]
  ): Coord[] {
    return coords?.map((coord, idx) => this._setCoord(newCoords[idx], coord))
  }

  _setCoord(
    newCoord: Partial<{
      row: (row: number) => number
      col: (col: number) => number
    }> | null,
    coord: Coord
  ): Coord {
    if (newCoord == null) return coord
    return {
      row: newCoord?.row == null ? coord.row : newCoord.row(coord.row),
      col: newCoord?.col == null ? coord.col : newCoord.col(coord.col)
    }
  }

  _add(a: number) {
    return function (b: number) {
      return b + a
    }
  }

  _sub(a: number) {
    return function (b: number) {
      return b - a
    }
  }
}

export default BasePiece
