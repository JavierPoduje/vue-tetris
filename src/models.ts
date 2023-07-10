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

export enum DirectionEnum {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right'
}

export interface Coord {
  row: number
  col: number
}

export enum StateEnum {
  Playing = 'playing',
  Paused = 'paused',
  Gameover = 'gameover'
}

export interface Piece {
  type: PieceEnum
  color: PieceColorEnum
  coords: Set<Coord>
  lookingTo: DirectionEnum
}
