<template>
  <header class="header">
    <h1>Tetris</h1>
    <GameButton text="Tick!" @click="console.log('click!')" />
  </header>
  <main>
    <GameBoard />
  </main>
</template>

<script setup lang="ts">
  import GameBoard from './components/GameBoard.vue'
  import GameButton from './components/GameButton.vue'
</script>

<style scoped lang="scss">
  .header {
    width: 100%;
  }
</style>
