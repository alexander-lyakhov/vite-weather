<template>
  <div class="text-field" :class="classObject">
    <input
      type="text"
      :placeholder="placeholder"
      :value="modelValue" 
      @input="onInput"
      @keypress="onKeypress"
      @focus="$emit('focus')"
    />
  </div>
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    placeholder: {
      type: String,
      default: ''
    },
    modelValue: {
      type: String,
      default: ''
    }
  })

  const emit = defineEmits([
    'update:modelValue',
    'change',
  ])

  const classObject = computed(() => ({
    'not-empty': !!props.modelValue
  }))

  function onInput(e) {
    emit('update:modelValue', e.target.value)
  }

  function onKeypress(e) {
    if (e.keyCode === 13) {
      onInput(e)
      emit('change', e.target.value)
    }
  }
</script>

<style lang="scss" scoped>
.text-field {
  background: $bg-800;
  border: 1px solid $bg-400;
  display: flex;
  height: 2.5rem;
  padding: 0 .5rem;
  z-index: 1;

  &.not-empty {
    border: 1px solid $accent-orange;
  }

  input[type="text"] {
    font-size: 1.25rem;
    color: $text-200;
    background: transparent;
    border: 0;
    outline: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
