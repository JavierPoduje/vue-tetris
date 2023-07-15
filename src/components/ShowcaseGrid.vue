<template>
  <section class="grid">
    <div class="grid__container">
      <div
        v-for="{ row, col } in grid"
        :key="`${row}-${col}`"
        class="cell"
        :class="stylePiece(row, col)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
  import { pieceShowcase, stringifyCoord } from '@/utils'

  const props = defineProps<{
    nextPiece: { type: Object; required: true }
  }>()

  const pieceSet = pieceShowcase(props.nextPiece)

  const stylePiece = (row: number, col: number): string => {
    return pieceSet?.has(stringifyCoord({ row, col })) && 'cell--filled'
  }

  const grid = new Array(4)
    .fill()
    .map(() => new Array(3).fill(0))
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
  $grid-size: 5;
  $cols: 3;
  $rows: 4;

  .grid {
    background-color: map-get($colors, surface0);
    width: calc(calc($cell-size * $cols) + calc($cols * 1px));
    height: calc(calc($cell-size * $rows) + calc($rows * 1px));
    &__container {
      display: grid;
      grid-template-columns: repeat($cols, 1fr);
      grid-template-rows: repeat($rows, 1fr);
      grid-gap: 1px 1px;
      border: 1px solid map-get($colors, surface1);

      height: 100%;
      .cell {
        width: $cell-size;
        height: $cell-size;
        border: 1px solid map-get($colors, surface2);
        color: map-get($colors, blue);
        font-size: 8px;

        &--filled {
          background-color: map-get($colors, mauve);
        }
      }
    }
  }
</style>
