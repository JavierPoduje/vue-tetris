export enum PieceColorEnum {
  ROSEWATER = 'rosewater',
  SKY = 'sky',
  GREEN = 'green',
  PEACH = 'peach',
  MAUVE = 'mauve',
  RED = 'red',
  YELLOW = 'yellow'
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
  coords: Set<string>
}
