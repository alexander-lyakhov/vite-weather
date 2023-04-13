<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue'

  const props = defineProps({
  })
</script>

<style lang="scss" scoped>
.card {
  background: $bg-700;
  cursor: default;
}
</style>
