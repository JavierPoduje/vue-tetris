<template>
  <header class="header">
    <h1>Tetris</h1>
  </header>
  <main>
    <GameBoard />
  </main>
</template>

<script setup lang="ts">
  import GameBoard from './components/GameBoard.vue'
</script>

<style scoped lang="scss">
  .header {
    width: 100%;
  }
</style>
