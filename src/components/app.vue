<template>
  <header class="header">
    <section class="header__title">
      <h1>Tetris</h1>
      <p v-show="store.state === StateEnum.Gameover">Game Over!</p>
    </section>
    <section class="header__stats">
      <p>
        Level: <span class="stat">{{ store.level }}</span>
      </p>
      <p>
        Points: <span class="stat">{{ store.points }}</span>
      </p>
      <p>
        Lines: <span class="stat">{{ store.linesFilled }}</span>
      </p>
    </section>
  </header>
  <main class="main">
    <game-grid class="main__grid" />
    <showcase-grid class="main__showcase" />
  </main>
</template>

<script setup lang="ts">
  import { useGameStore } from '@/stores/gameStore'
  import GameGrid from '@/controllers/game-grid.vue'
  import ShowcaseGrid from '@/controllers/showcase-grid.vue'
  import { StateEnum } from '../models'

  const store = useGameStore()
</script>

<style scoped lang="scss">
  @import '../assets/variables.scss';

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 3rem;

    &__title {
      display: flex;
      flex-direction: column;
      font-weight: bold;
      margin-left: 1rem;

      h1 {
        font-size: 36px;
        text-shadow: $textShadow;
      }
    }
    &__stats {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      p {
        font-weight: bold;
        align-self: flex-end;
      }

      .stat {
        text-shadow: $textShadow;
      }
    }
  }

  .main {
    align-self: center;
    display: flex;
    justify-content: space-between;
    width: 100%;

    &__grid {
      grid-area: grid;
    }

    &__showcase {
      grid-area: showcase;
    }
  }
</style>
