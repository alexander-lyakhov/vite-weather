<template>
  <div class="selector noselect">
    <span
      v-for="(item, index) in options"
      :key="index"
      :class="{'selected': isSelected(item.value)}"
      @click="$emit('update:modelValue', item)"
    >{{ item.text }}</span>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const props = defineProps({
    options: {
      type: Array,
      default: () => ([]),
      requited: true
    },
    modelValue: {
      type: Object,
      requited: true
    }
  })

  function isSelected(value) {
    return props.modelValue.value === value
  }
</script>

<style lang="scss" scoped>
.selector {
  font-size: .75rem;
  border-bottom: 2px solid $bg-500;
  display: flex;
  gap: .75rem;
  height: 2rem;

  span {
    height: calc(100% + 2px);
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;

    &.selected {
      // border-bottom: 2px solid $bg-300;
      border-bottom: 2px solid $accent-green;
    }
  }
}
</style>
