<template>
  <header class="header">
    <h1>Tetris</h1>
    <GameButton text="Tick!" @click="store?.tick" />
  </header>
  <main class="main">
    <GameGrid />
    <ShowcaseGrid :next-piece="store?.nextPiece" />
  </main>
</template>

<script setup lang="ts">
  import { useGameStore } from './stores/gameStore.ts'
  import GameGrid from './components/GameGrid.vue'
  import ShowcaseGrid from './components/ShowcaseGrid.vue'
  import GameButton from './components/GameButton.vue'

  const store = useGameStore()
</script>

<style scoped lang="scss">
  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 3rem;
  }

  .main {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 3rem;
    width: 100%;
    height: 100vh;
  }
</style>
