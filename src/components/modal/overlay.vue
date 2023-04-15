<template>
  <div class="lock" v-show="isVisible">
    <div class="lock-overlay" />
    <slot></slot>
  </div>
</template>

<script setup>
  import { watchEffect } from 'vue'

  const props = defineProps({
    isVisible: {
      type: Boolean,
      default: false
    }
  })

  watchEffect(() => {
    document.documentElement.style.height = props.isVisible ? '100vh':'auto'
    document.documentElement.style.overflow = props.isVisible ? 'hidden':''
  })
</script>

<style lang="scss" scoped>
.lock {
  position: fixed;
  inset: 0;
  z-index: 1;

  &-overlay {
    background: #000;
    position: absolute;
    opacity: .5;
    inset: 0;
  }
}
</style>
