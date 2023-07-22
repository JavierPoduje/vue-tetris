<template>
  <ShowcaseGrid
    :grid="grid"
    :piece-set="pieceSet"
    :next-piece="store.nextPiece"
  />
</template>

<script setup lang="ts">
  import { watch } from 'vue'
  import { useGameStore } from '@/stores/gameStore'
  import ShowcaseGrid from '@/components/showcase-grid.vue'
  import { pieceShowcase } from '@/utils'

  const store = useGameStore()
  const pieceSet = pieceShowcase(store.nextPiece)

  watch(
    () => store.nextPiece,
    () => {
      pieceSet.clear()
      pieceShowcase(store.nextPiece).forEach((coord) => {
        pieceSet.add(coord)
      })
    }
  )

  const grid = new Array(4)
    .fill({})
    .map(() => new Array(3).fill(0))
    .reduce((acc, row, rowIdx) => {
      return acc?.concat(
        row?.map((cell, cellIdx) => ({
          row: rowIdx,
          col: cellIdx
        }))
      )
    }, [])
</script>
