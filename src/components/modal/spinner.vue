<template>
  <overlay :style="styles" :is-visible="modelValue">
    <div class="spinner"></div>
  </overlay>
</template>

<script setup>
  import { computed } from 'vue'
  import overlay from './overlay.vue'

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: true
    },
    isGlobal: {
      type: Boolean,
      default: false
    }
  })

  const styles = computed(() => ({
    'position': props.isGlobal
      ? 'fixed'
      : 'absolute'
  }))
</script>

<style lang="scss" scoped>
.spinner {
  border-left: 3px solid $bg-200;
  border-top: 3px solid $bg-200;
  border-right: 3px solid $bg-200;
  border-bottom: 3px solid transparent;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: spin .5s linear infinite;
}
</style>
  