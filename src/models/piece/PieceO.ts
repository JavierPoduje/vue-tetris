import { PieceEnum, type Coord } from '@/models'
import { type Piece } from './index'
import BasePiece from './Piece'
import { coordsInBounds } from '@/utils'

class PieceO extends BasePiece implements Piece {
  type: PieceEnum
  coords: Set<Coord>

  constructor() {
    super()
    this.type = PieceEnum.O
    this.coords = this._initialCoords()
  }

  rotate(isClockwise: boolean, dryRun = false): Coord[] {
    const coords = this._sortCoords(this.coords)

    if (!dryRun) {
      this.coords = new Set(coords)
      this._updateLookinTo(isClockwise)
    }

    return coords
  }

  rotationIsValid(
    isClockwise: boolean,
    numberOfRows: number,
    numberOfCols: number
  ): boolean {
    const coords = this.rotate(isClockwise, true)
    return coordsInBounds(coords, numberOfRows, numberOfCols)
  }

  // *** *** *** ***
  // *** Helpers ***
  // *** *** *** ***

  _initialCoords(): Set<Coord> {
    return new Set([
      { row: -1, col: 4 },
      { row: -1, col: 5 },
      { row: 0, col: 4 },
      { row: 0, col: 5 }
    ])
  }
}

export default PieceO
