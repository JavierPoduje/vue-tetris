<template>
  <section class="grid">
    <div class="grid__container">
      <div v-for="{ row, col } in grid" :key="`${row}-${col}`" class="cell" />
    </div>
  </section>
</template>

<script setup lang="ts">
  const props = defineProps<{
    nextPiece: Piece
    required: true
  }>()
  const grid = new Array(4)
    .fill()
    .map(() => new Array(4).fill(0))
    .reduce((acc, row, rowIdx) => {
      return acc?.concat(
        row?.map((cell, cellIdx) => ({
          row: rowIdx,
          col: cellIdx
        }))
      )
    }, [])
</script>

<style scoped lang="scss">
  @import '../assets/variables.scss';

  $cell-size: 30px;
  $grid-size: 4;

  .grid {
    background-color: map-get($colors, surface0);
    width: calc(calc($cell-size * $grid-size) + calc($grid-size * 1px));
    height: calc(calc($cell-size * $grid-size) + calc($grid-size * 1px));
    &__container {
      display: grid;
      grid-template-columns: repeat($grid-size, 1fr);
      grid-template-rows: repeat($grid-size, 1fr);
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
