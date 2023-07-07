import { ref } from 'vue'
import { randomPiece, movePieceDown } from './helpers'
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
    console.log("piece.value.coords: ", piece.value.coords);
    piece.value.coords = movePieceDown(piece.value)
    console.log("piece.value.coords: ", piece.value.coords);
  }

  return {
    // props
    board,
    piece,
    nextPiece,
    // actions
    tick
  }
})
