import { PieceEnum, type Coord, DirectionEnum } from '@/models'
import { type Piece } from './index'
import BasePiece from './Piece'
import { coordsInBounds } from '@/utils'

class PieceZ extends BasePiece implements Piece {
  type: PieceEnum
  coords: Set<Coord>

  constructor() {
    super()
    this.type = PieceEnum.Z
    this.coords = this._initialCoords()
  }

  rotate(isClockwise: boolean, dryRun = false): Coord[] {
    const coords = this._sortCoords(this.coords)

    if (
      this.lookingTo === DirectionEnum.Up ||
      this.lookingTo === DirectionEnum.Down
    ) {
      const newCoords = this._setCoords(
        [
          { row: this._sub(1), col: this._add(2) },
          { col: this._add(1) },
          { row: this._sub(1) },
          { col: this._sub(1) }
        ],
        coords
      )

      if (!dryRun) {
        this.coords = new Set(newCoords)
        this._updateLookinTo(isClockwise)
      }
      return newCoords
    } else if (
      this.lookingTo === DirectionEnum.Right ||
      this.lookingTo === DirectionEnum.Left
    ) {
      const newCoords = this._setCoords(
        [
          { row: this._add(1), col: this._sub(2) },
          { row: this._add(1) },
          { col: this._sub(1) },
          { col: this._add(1) }
        ],
        coords
      )

      if (!dryRun) {
        this.coords = new Set(newCoords)
        this._updateLookinTo(isClockwise)
      }
      return newCoords
    } else {
      throw new Error(`Unknown this.lookingTo: ${this.lookingTo}`)
    }
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
      { row: -1, col: 3 },
      { row: -1, col: 4 },
      { row: 0, col: 4 },
      { row: 0, col: 5 }
    ])
  }
}

export default PieceZ
