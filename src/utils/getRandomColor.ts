import { PieceColorEnum } from '@/models'

const getRandomColor = () => {
  const colors: PieceColorEnum[] = [
    PieceColorEnum.ROSEWATER,
    PieceColorEnum.SKY,
    PieceColorEnum.GREEN,
    PieceColorEnum.PEACH,
    PieceColorEnum.MAUVE,
    PieceColorEnum.RED,
    PieceColorEnum.YELLOW
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

export default getRandomColor
