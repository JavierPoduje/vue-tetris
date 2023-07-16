<template>
  <header class="header">
    <h1>Tetris</h1>
    <game-button text="Tick!" @click="store?.tick" />
  </header>
  <main class="main">
    <game-grid />
    <showcase-grid />
  </main>
</template>

<script setup lang="ts">
  import { useGameStore } from '@/stores/gameStore.ts'
  import GameGrid from '@/controllers/game-grid.vue'
  import ShowcaseGrid from '@/controllers/showcase-grid.vue'
  import GameButton from '@/components/game-button.vue'

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
  }
</style>
