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
  import { onMounted } from 'vue'
  import { useGameStore } from './stores/gameStore.ts'
  import GameGrid from './components/GameGrid.vue'
  import ShowcaseGrid from './components/ShowcaseGrid.vue'
  import GameButton from './components/GameButton.vue'

  const store = useGameStore()

  const onKeyDown = (e: KeyboardEvent) => {
    const key = e?.key?.toLowerCase()
    const isShiftDown = Boolean(e?.shiftKey)

    switch (key) {
      case 'arrowup':
        store?.rotate(!isShiftDown)
        break
      case 'arrowdown':
        store?.moveDown(!isShiftDown)
        break
      case 'arrowleft':
        store?.moveLeft(!isShiftDown)
        break
      case 'arrowright':
        store?.moveRight(!isShiftDown)
        break
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', onKeyDown)
  })
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
