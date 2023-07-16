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
  import { stringifyCoord } from '@/utils'

  const props = defineProps<{
    pieceSet: {
      type: Set
      required: true
    }
    grid: {
      type: Array
      required: true
    }
    nextPiece: {
      type: Piece
      required: true
    }
  }>()

  const stylePiece = (row: number, col: number): string => {
    return (
      props.pieceSet.has(stringifyCoord({ row, col })) &&
      `cell--${props.nextPiece.color}`
    )
  }
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

        &--rosewater {
          background-color: map-get($colors, rosewater);
        }
        &--sky {
          background-color: map-get($colors, sky);
        }
        &--green {
          background-color: map-get($colors, green);
        }
        &--peach {
          background-color: map-get($colors, peach);
        }
        &--mauve {
          background-color: map-get($colors, mauve);
        }
        &--red {
          background-color: map-get($colors, red);
        }
        &--yellow {
          background-color: map-get($colors, yellow);
        }
      }
    }
  }
</style>
