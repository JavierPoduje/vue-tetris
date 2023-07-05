export enum PieceColorEnum {
  BLUE = 'BLUE',
  CYAN = 'CYAN',
  GREEN = 'GREEN',
  ORANGE = 'ORANGE',
  PURPLE = 'PURPLE',
  RED = 'RED',
  YELLOW = 'YELLOW'
}

export enum PieceEnum {
  I = 'I',
  J = 'J',
  L = 'L',
  O = 'O',
  S = 'S',
  T = 'T',
  Z = 'Z'
}

export interface Piece {
  type: PieceEnum
  color: PieceColorEnum
  shape: number[][]
}
