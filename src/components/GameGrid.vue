<template>
  <section class="grid">
    <div class="grid__container">
      <div v-for="{ row, col } in grid" :key="`${row}-${col}`" class="cell">
        {{ row }} {{ col }}
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useGameStore } from '../stores/gameStore'

  const store = useGameStore()

  const grid = computed(() => {
    return store?.board?.reduce(
      (acc, row, rowIdx) =>
        acc?.concat(
          row?.map((cell, cellIdx) => ({
            row: rowIdx,
            col: cellIdx
          }))
        ),
      []
    )
  })
</script>

<style scoped lang="scss">
  @import '../assets/variables.scss';

  $cell-size: 30px;
  $number-of-columns: 10;
  $number-of-rows: 20;

  .grid {
    background-color: map-get($colors, surface0);
    width: calc(
      calc($cell-size * $number-of-columns) + calc($number-of-columns * 1px)
    );
    height: calc(
      calc($cell-size * $number-of-rows) + calc($number-of-rows * 1px)
    );

    &__container {
      display: grid;
      grid-template-columns: repeat($number-of-columns, 1fr);
      grid-template-rows: repeat($number-of-rows, 1fr);
      grid-gap: 1px 1px;
      border: 1px solid map-get($colors, surface1);
      height: 100%;

      .cell {
        width: $cell-size;
        height: $cell-size;
        border: 1px solid map-get($colors, surface2);
        color: map-get($colors, blue);
        font-size: 8px;
      }
    }
  }
</style>
