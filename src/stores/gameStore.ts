import { ref } from 'vue'
import { defineStore } from 'pinia'

// ref()s become state properties
// computed()s become getters
// function()s become actions

const BOARD_COLS = 10
const BOARD_ROWS = 20

export const useGameStore = defineStore('gameStore', () => {
  const board = ref<number[][]>(
    new Array(BOARD_ROWS).fill(new Array(BOARD_COLS).fill(0))
  )

  return { board }

  // const count = ref(0)
  // const doubleCount = computed(() => count.value * 2)
  // function increment() {
  //   count.value++
  // }

  // return { count, doubleCount, increment }
})
