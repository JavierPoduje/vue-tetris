<template>
  <header class="header">
    <h1>Tetris</h1>
    <p>Level: {{ store.level }}</p>
    <p>Points: {{ store.points }}</p>
    <p>Lines: {{ store.linesFilled }}</p>
    <p v-show="store.state === StateEnum.Gameover">Game Over!</p>
  </header>
  <main class="main">
    <game-grid class="main__grid" />
    <showcase-grid class="main__showcase" />
  </main>
</template>

<script setup lang="ts">
  import { useGameStore } from '@/stores/gameStore.ts'
  import GameGrid from '@/controllers/game-grid.vue'
  import ShowcaseGrid from '@/controllers/showcase-grid.vue'
  import GameButton from '@/components/game-button.vue'
  import { StateEnum } from '../models'

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
    align-self: center;
    display: grid;
    grid-template-columns: 5fr 1fr;
    grid-template-areas: 'grid showcase';
    width: 35%;

    &__grid {
      grid-area: grid;
    }

    &__showcase {
      grid-area: showcase;
    }
  }
</style>
