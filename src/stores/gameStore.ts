import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getRandomPiece } from '@/utils'
import { DirectionEnum, StateEnum, type BoardCell } from '@/models'
import type { Piece } from '@/models/piece'

const BOARD_COLS = 10
const BOARD_ROWS = 20

export const useGameStore = defineStore('gameStore', () => {
  const board = ref<BoardCell[][]>(
    Array.from({ length: BOARD_ROWS }, () =>
      Array.from({ length: BOARD_COLS }, () => ({ used: false }))
    )
  )
  const nextPiece = ref<Piece>(getRandomPiece())
  const piece = ref<Piece>(getRandomPiece())
  const state = ref<StateEnum>(StateEnum.Playing)
  const tickInterval = ref<number>(350)
  const level = ref<number>(1)
  const linesFilled = ref<number>(0)
  const points = ref<number>(0)

  const updateBoard = () => {
    let boardUpdated = true
    while (boardUpdated) {
      boardUpdated = false
      let linesFilledInIteration = 0
      for (let row = 0; row < BOARD_ROWS; row++) {
        const isRowFull = board.value[row].every(({ used }) => used)
        if (isRowFull) {
          // increase the lines filled
          linesFilled.value++
          linesFilledInIteration++
          if (linesFilled.value > 10 && linesFilled.value % 10 === 0) {
            level.value++
          }
          boardUpdated = true
          // remove the row
          board.value.splice(row, 1)
          // add a new row at the top
          board.value.unshift(
            Array.from({ length: BOARD_COLS }, () => ({ used: false }))
          )
        }
      }
      points.value += linesFilledInIteration * 100 * level.value
    }
  }

  const restartPiece = () => {
    piece.value.coords.forEach(({ row, col }) => {
      board.value[row][col] = {
        color: piece.value.color,
        used: true
      }
    })

    updateBoard()

    piece.value = nextPiece.value
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
      piece.value.moveDown()
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
    level,
    nextPiece,
    piece,
    points,
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
