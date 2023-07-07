import { type Piece, PieceEnum } from '@/models'
import stringifyCoord from './stringifyCoord'

const showcaseI = () => {
  return new Set([
    stringifyCoord({ row: 0, col: 1 }),
    stringifyCoord({ row: 1, col: 1 }),
    stringifyCoord({ row: 2, col: 1 }),
    stringifyCoord({ row: 3, col: 1 })
  ])
}
const showcaseJ = () => {
  return new Set([
    stringifyCoord({ row: 1, col: 1 }),
    stringifyCoord({ row: 2, col: 1 }),
    stringifyCoord({ row: 3, col: 1 }),
    stringifyCoord({ row: 3, col: 0 })
  ])
}
const showcaseL = () => {
  return new Set([
    stringifyCoord({ row: 1, col: 0 }),
    stringifyCoord({ row: 2, col: 0 }),
    stringifyCoord({ row: 3, col: 0 }),
    stringifyCoord({ row: 3, col: 1 })
  ])
}
const showcaseO = () => {
  return new Set([
    stringifyCoord({ row: 1, col: 0 }),
    stringifyCoord({ row: 1, col: 1 }),
    stringifyCoord({ row: 2, col: 1 }),
    stringifyCoord({ row: 2, col: 0 })
  ])
}
const showcaseS = () => {
  return new Set([
    stringifyCoord({ row: 1, col: 1 }),
    stringifyCoord({ row: 1, col: 2 }),
    stringifyCoord({ row: 2, col: 0 }),
    stringifyCoord({ row: 2, col: 1 })
  ])
}
const showcaseT = () => {
  return new Set([
    stringifyCoord({ row: 1, col: 0 }),
    stringifyCoord({ row: 1, col: 1 }),
    stringifyCoord({ row: 1, col: 2 }),
    stringifyCoord({ row: 2, col: 1 })
  ])
}
const showcaseZ = () => {
  return new Set([
    stringifyCoord({ row: 1, col: 0 }),
    stringifyCoord({ row: 1, col: 1 }),
    stringifyCoord({ row: 2, col: 1 }),
    stringifyCoord({ row: 2, col: 2 })
  ])
}

const pieceShowcase = ({ type }: Piece): Set<string> => {
  switch (type) {
    case PieceEnum.I:
      return showcaseI()
    case PieceEnum.J:
      return showcaseJ()
    case PieceEnum.L:
      return showcaseL()
    case PieceEnum.O:
      return showcaseO()
    case PieceEnum.S:
      return showcaseS()
    case PieceEnum.T:
      return showcaseT()
    case PieceEnum.Z:
      return showcaseZ()
    default:
      throw new Error('Invalid piece type')
  }
}

export default pieceShowcase
