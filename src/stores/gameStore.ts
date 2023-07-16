import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getRandomPiece } from '@/utils'
import { DirectionEnum, StateEnum, PieceColorEnum } from '@/models'
import type { Piece } from '@/models/piece'

const BOARD_COLS = 10
const BOARD_ROWS = 20

export const useGameStore = defineStore('gameStore', () => {
  const board = ref<{ color?: PieceColorEnum; used: boolean }[][]>(
    Array.from({ length: BOARD_ROWS }, () =>
      Array.from({ length: BOARD_COLS }, () => ({ used: false }))
    )
  )
  const nextPiece = ref<Piece>(getRandomPiece())
  const piece = ref<Piece>(getRandomPiece())
  const state = ref<StateEnum>(StateEnum.Playing)
  const tickInterval = ref<number>(350)

  const restartPiece = () => {
    // add pice to the board with pieces
    piece.value.coords.forEach(({ row, col }) => {
      board.value[row][col] = {
        color: piece.value.color,
        used: true
      }
    })

    // TODO: check if any rows are full (iterate over this until necessary)

    // set the next piece as the current piece
    piece.value = nextPiece.value
    // set the next piece as a random piece
    nextPiece.value = getRandomPiece()
  }

  const tick = () => {
    const pieceAlreadyEnteredTheBoard = Array.from(piece.value.coords).every(
      ({ row }) => row > 0
    )
    if (
      !pieceAlreadyEnteredTheBoard ||
      piece.value.moveIsValid(DirectionEnum.Down, board.value)
    ) {
      // piece.value.moveDown()
    } else {
      restartPiece()
    }
  }

  const rotate = (clockwise: boolean) => {
    if (piece.value.rotationIsValid(clockwise, BOARD_ROWS, BOARD_COLS)) {
      piece.value.rotate(clockwise)
    }
  }

  const moveDown = () => {
    if (piece.value.moveIsValid(DirectionEnum.Down, board.value)) {
      piece.value.moveDown()
    } else {
      restartPiece()
    }
  }

  const moveLeft = () => {
    if (piece.value.moveIsValid(DirectionEnum.Left, board.value)) {
      piece.value.moveLeft()
    }
  }

  const moveRight = () => {
    if (piece.value.moveIsValid(DirectionEnum.Right, board.value)) {
      piece.value.moveRight()
    }
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
