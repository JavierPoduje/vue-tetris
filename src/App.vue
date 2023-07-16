<template>
  <header class="header">
    <h1>Tetris</h1>
    <GameButton text="Tick!" @click="store?.tick" />
  </header>
  <main class="main">
    <GameGrid />
    <ShowcaseGrid />
  </main>
</template>

<script setup lang="ts">
  import { ref, onMounted, watchEffect } from 'vue'
  import { useGameStore } from './stores/gameStore.ts'
  import GameGrid from './controllers/game-grid.vue'
  import ShowcaseGrid from './controllers/showcase-grid.vue'
  import GameButton from './components/game-button.vue'
  import { StateEnum } from './models'

  const store = useGameStore()
  const looping = ref(false)

  const loop = () => {
    store.tick()

    // if the game change its state, stop the loop
    if (store?.state === StateEnum.Running) {
      setTimeout(loop, store?.tickInterval)
    } else {
      looping.value = false
    }
  }

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

  watchEffect(() => {
    if (store?.state === StateEnum.Playing && !looping.value) {
      looping.value = true
      // setTimeout(loop, store?.tickInterval)
    }
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
