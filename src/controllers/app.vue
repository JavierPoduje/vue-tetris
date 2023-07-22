<template>
  <app />
</template>

<script setup lang="ts">
  import { ref, onMounted, watchEffect } from 'vue'
  import { useGameStore } from '@/stores/gameStore'
  import App from '@/components/app.vue'
  import { StateEnum } from '@/models'

  const store = useGameStore()
  const looping = ref(false)

  const loop = () => {
    store.tick()

    // if the game change its state, stop the loop
    if (store?.state === StateEnum.Playing) {
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
        store?.moveDown()
        break
      case 'arrowleft':
        store?.moveLeft()
        break
      case 'arrowright':
        store?.moveRight()
        break
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', onKeyDown)
  })

  watchEffect(() => {
    if (store?.state === StateEnum.Playing && !looping.value) {
      looping.value = true
      setTimeout(loop, store?.tickInterval)
    }
  })
</script>
