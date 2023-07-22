<template>
  <game-grid
    :stringify-piece-coords="stringifyPieceCoords"
    :grid="grid"
    :board="store.board"
    :current-piece="store.piece"
  />
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useGameStore } from '@/stores/gameStore'
  import { stringifyCoord } from '@/utils'
  import GameGrid from '@/components/game-grid.vue'
  import { type Coord } from '@/models'

  const store = useGameStore()

  const grid = store?.board?.reduce(
    (acc, row, rowIdx) =>
      acc.concat(row.map((cell, cellIdx) => ({ row: rowIdx, col: cellIdx }))),
    [] as Coord[]
  )

  const stringifyPieceCoords = computed(() => {
    return new Set(Array.from(store?.piece?.coords)?.map(stringifyCoord))
  })
</script>
