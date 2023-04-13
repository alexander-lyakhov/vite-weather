<template>
  <div class="selector">
    <span class="selected">Dayly</span>
    <span>Hourly</span>
    <span>Weekly</span>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue'

  const props = defineProps({
  })
</script>

<style lang="scss" scoped>
.selector {
  font-size: .75rem;
  border-bottom: 2px solid $bg-500;
  display: flex;
  gap: .5rem;

  span {
    margin-bottom: -2px;
    padding: .5rem 0;
    cursor: pointer;

    &.selected {
      // background: $bg-600;
      border-bottom: 2px solid $bg-300;
    }
  }
}
</style>
