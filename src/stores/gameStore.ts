import { ref } from 'vue'
import { defineStore } from 'pinia'
import { randomPiece, movePiece } from './helpers'
import rotatePiece from '@/utils/rotatePiece'
import { type Piece, DirectionEnum, StateEnum } from '@/models'

const BOARD_COLS = 10
const BOARD_ROWS = 20

export const useGameStore = defineStore('gameStore', () => {
  const board = ref<number[][]>(
    new Array(BOARD_ROWS).fill(new Array(BOARD_COLS).fill(0))
  )
  const nextPiece = ref<Piece>(randomPiece())
  const piece = ref<Piece>(randomPiece())
  const state = ref<StateEnum>(StateEnum.Playing)
  const tickInterval = ref<number>(350)

  const tick = () => {
    const canMovePieceDown = Array.from(piece.value.coords).every(
      ({ row }) => row + 1 < BOARD_ROWS
    )
    if (canMovePieceDown) {
      // moveDown()
    } else {
      console.log('here!')
    }
  }

  const rotate = (clockwise: boolean) => {
    const { coords: newCoords, rotated } = rotatePiece(
      piece.value,
      clockwise,
      BOARD_ROWS,
      BOARD_COLS
    )

    // if the piece was not rotated, do nothing
    if (!rotated) {
      return
    }

    // otherwise, update its coords
    piece.value.coords = newCoords

    // and update the direction it's looking to (lookingTo property)
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
    nextPiece,
    piece,
    state,
    tickInterval,
    // actions
    moveDown,
    moveLeft,
    moveRight,
    rotate,
    tick
  }
})
