import { ref } from 'vue'
import { randomPiece, movePiece } from './helpers'
import { defineStore } from 'pinia'
import type { Piece } from '@/models'

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

  const rotate = () => {
    console.log('rotating!')
  }

  const moveDown = () => {
    piece.value.coords = movePiece(piece.value, 'down')
  }

  const moveLeft = () => {
    piece.value.coords = movePiece(piece.value, 'left')
  }

  const moveRight = () => {
    piece.value.coords = movePiece(piece.value, 'right')
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
