import { PieceColorEnum, PieceEnum, type Piece } from '@/models'

const shapeByPieceType: Record<PieceEnum, number[][]> = {
  [PieceEnum.I]: [[1], [1], [1], [1]],
  [PieceEnum.J]: [
    [0, 1],
    [0, 1],
    [1, 1]
  ],
  [PieceEnum.L]: [
    [1, 0],
    [1, 0],
    [1, 1]
  ],
  [PieceEnum.O]: [
    [1, 1],
    [1, 1]
  ],
  [PieceEnum.S]: [
    [0, 1, 1],
    [1, 1, 0]
  ],
  [PieceEnum.T]: [
    [0, 1, 0],
    [1, 1, 1]
  ],
  [PieceEnum.Z]: [
    [1, 1, 0],
    [0, 1, 1]
  ]
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
    PieceColorEnum.BLUE,
    PieceColorEnum.CYAN,
    PieceColorEnum.GREEN,
    PieceColorEnum.ORANGE,
    PieceColorEnum.PURPLE,
    PieceColorEnum.RED,
    PieceColorEnum.YELLOW
  ]

  const pieceType = pieces[Math.floor(Math.random() * pieces.length)]
  const color = colors[Math.floor(Math.random() * colors.length)]

  return { type: pieceType, color, shape: shapeByPieceType[pieceType] }
}
