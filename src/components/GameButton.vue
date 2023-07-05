<template>
  <button @click="$emit('click')" class="button">{{ text }}</button>
</template>

<script setup lang="ts">
  defineProps<{
    text: {
      type: string
      required: true
    }
  }>()
  defineEmits<{ (e: 'click'): void }>()
</script>

<style scoped lang="scss">
  @import '../assets/_variables.scss';

  .button {
    background-color: map-get($colors, teal);
    height: 3rem;
    padding: 0.5rem 1rem;
    outline: none;
    border: none;
    border-radius: $radius;
    font-weight: bold;
    font-size: 1rem;
    color: map-get($colors, mantle);
    transition: all $duration ease-in-out;

    &:hover {
      cursor: pointer;
      background-color: map-get($colors, sapphire);
    }
    &:active {
      background-color: map-get($colors, mantle);
      color: map-get($colors, teal);
      border: 1px solid map-get($colors, teal);
    }
  }
</style>
