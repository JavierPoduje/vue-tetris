import PieceI from './PieceI'
import PieceJ from './PieceJ'
import PieceL from './PieceL'
import PieceO from './PieceO'
import PieceS from './PieceS'
import PieceT from './PieceT'
import PieceZ from './PieceZ'
import {
  PieceEnum,
  type Coord,
  type DirectionEnum,
  type PieceColorEnum
} from '@/models'

export interface Piece {
  type: PieceEnum
  color: PieceColorEnum
  coords: Set<Coord>
  lookingTo: DirectionEnum
  moveRight: () => void
  moveDown: () => void
  moveLeft: () => void
  moveIsValid: (
    direction: DirectionEnum,
    numberOfRows: number,
    numberOfCols: number
  ) => boolean
  rotationIsValid: (
    isClockwise: boolean,
    numberOfRows: number,
    numberOfCols: number
  ) => boolean
  rotate: (clockwise: boolean, dryRun?: boolean) => void
}

export class PieceFactory {
  static create(pieceType: PieceEnum): Piece {
    switch (pieceType) {
      case PieceEnum.I:
        return new PieceI()
      case PieceEnum.J:
        return new PieceJ()
      case PieceEnum.L:
        return new PieceL()
      case PieceEnum.O:
        return new PieceO()
      case PieceEnum.S:
        return new PieceS()
      case PieceEnum.T:
        return new PieceT()
      case PieceEnum.Z:
        return new PieceZ()
      default:
        return new PieceI()
    }
  }
}
