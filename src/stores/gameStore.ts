import { ref } from 'vue'
import { defineStore } from 'pinia'
import { randomPiece, movePiece } from './helpers'
import rotatePiece from '@/utils/rotatePiece'
import { type Piece, DirectionEnum } from '@/models'

// ref()s become state properties
// computed()s become getters
// function()s become actions

const BOARD_COLS = 10
const BOARD_ROWS = 20

export const useGameStore = defineStore('gameStore', () => {
  const board = ref<number[][]>(
    new Array(BOARD_ROWS).fill(new Array(BOARD_COLS).fill(0))
  )
  const nextPiece = ref<Piece>(randomPiece())
  const piece = ref<Piece>(randomPiece())

  const tick = () => {
    console.log('tick!')
  }

  const rotate = (clockwise: boolean) => {
    piece.value.coords = rotatePiece(piece.value, clockwise)
    if (piece.value.lookingTo === DirectionEnum.Up) {
      piece.value.lookingTo = clockwise
        ? DirectionEnum.Right
        : DirectionEnum.Left
    } else if (piece.value.lookingTo === DirectionEnum.Right) {
      piece.value.lookingTo = clockwise ? DirectionEnum.Down : DirectionEnum.Up
    } else if (piece.value.lookingTo === DirectionEnum.Down) {
      piece.value.lookingTo = clockwise
        ? DirectionEnum.Left
        : DirectionEnum.Right
    } else if (piece.value.lookingTo === DirectionEnum.Left) {
      piece.value.lookingTo = clockwise ? DirectionEnum.Up : DirectionEnum.Down
    } else {
      throw new Error(`Unknown piece.lookingTo: ${piece.value.lookingTo}`)
    }
  }

  const moveDown = () => {
    piece.value.coords = movePiece(
      piece.value,
      DirectionEnum.Down,
      BOARD_ROWS,
      BOARD_COLS
    )
  }

  const moveLeft = () => {
    piece.value.coords = movePiece(
      piece.value,
      DirectionEnum.Left,
      BOARD_ROWS,
      BOARD_COLS
    )
  }

  const moveRight = () => {
    piece.value.coords = movePiece(
      piece.value,
      DirectionEnum.Right,
      BOARD_ROWS,
      BOARD_COLS
    )
  }

  return {
    // props
    board,
    piece,
    nextPiece,
    // actions
    tick,
    rotate,
    moveDown,
    moveLeft,
    moveRight
  }
})
