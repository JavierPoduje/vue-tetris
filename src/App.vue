<template>
  <header class="header">
    <h1>Tetris</h1>
    <GameButton text="Tick!" @click="store.tick" />
  </header>
  <main>
    <GameGrid />
  </main>
</template>

<script setup lang="ts">
  import { useGameStore } from './stores/gameStore.ts'
  import GameGrid from './components/GameGrid.vue'
  import GameButton from './components/GameButton.vue'

  const store = useGameStore()
  console.log("store.nextPiece: ", store.nextPiece);
</script>

<style scoped lang="scss">
  .header {
    width: 100%;
  }
</style>
