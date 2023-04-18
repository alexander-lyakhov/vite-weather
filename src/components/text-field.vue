<template>
  <div class="text-field">
    <input
      type="text"
      ref="textinput"
      :placeholder="placeholder"
      :value="modelValue" 
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <a
      href="#"
      class="btn btn-icon"
      :class="{'is-disabled': isClearBtnDisabled}"
      @click.stop="clear"
    >
      <IconDelete />
    </a>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue'
  import IconDelete from '@/assets/icons/x.svg'

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

  const textinput = ref(null)
  const isClearBtnDisabled = computed(() => props.modelValue.value === '')

  onMounted(() => textinput.value.focus())

  function clear() {
    emit('update:modelValue', '')
    textinput.value.focus()
  }
</script>

<style lang="scss" scoped>
.text-field {
  background: $bg-800;
  border: 1px solid $bg-400;
  display: flex;
  align-items: center;
  height: 2.75rem;
  padding: 0 0.25rem 0 .5rem;
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

  .btn {
    background: transparent;

    &.is-disabled svg {
      color: $text-400;
    }
  }
}
</style>
