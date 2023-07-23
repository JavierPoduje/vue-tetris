import { type PieceColorEnum } from '@/models'

export interface BoardCell {
  color?: PieceColorEnum
  used: boolean
}
