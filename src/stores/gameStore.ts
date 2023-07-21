import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getRandomPiece } from '@/utils'
import moveDownAction from './actions/move-down'
import rotateAction from './actions/rotate'
import moveLeftAction from './actions/move-left'
import tickAction from './actions/tick'
import moveRightAction from './actions/move-right'
import { StateEnum, type BoardCell } from '@/models'
import type { Piece } from '@/models/piece'

const BOARD_COLS = 10
const BOARD_ROWS = 20

export const useGameStore = defineStore('gameStore', () => {
  // props
  const board = ref<BoardCell[][]>(
    Array.from({ length: BOARD_ROWS }, () =>
      Array.from({ length: BOARD_COLS }, () => ({ used: false }))
    )
  )
  const level = ref<number>(1)
  const linesFilled = ref<number>(0)
  const nextPiece = ref<Piece>(getRandomPiece())
  const piece = ref<Piece>(getRandomPiece())
  const points = ref<number>(0)
  const state = ref<StateEnum>(StateEnum.Playing)
  const tickInterval = ref<number>(350)

  // actions
  const moveDown = () =>
    moveDownAction(piece, nextPiece, board, linesFilled, level, points)
  const moveLeft = () => moveLeftAction(piece, board)
  const moveRight = () => moveRightAction(piece, board)
  const rotate = (clockwise: boolean) =>
    rotateAction(piece, BOARD_ROWS, BOARD_COLS, clockwise)
  const tick = () =>
    tickAction(piece, nextPiece, board, linesFilled, level, points, state)

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
