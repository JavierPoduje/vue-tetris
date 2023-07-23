import { PieceEnum, PieceFactory, type Piece } from '@/models'

const getRandomPiece = (): Piece => {
  const pieceTypes: PieceEnum[] = [
    PieceEnum.I,
    PieceEnum.J,
    PieceEnum.L,
    PieceEnum.O,
    PieceEnum.S,
    PieceEnum.T,
    PieceEnum.Z
  ]

  const pieceType = pieceTypes[Math.floor(Math.random() * pieceTypes.length)]
  return PieceFactory.create(pieceType)
}

export default getRandomPiece
