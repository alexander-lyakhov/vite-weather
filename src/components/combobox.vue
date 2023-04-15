<template>
  <overlay :is-visible="isOverlayVisible" />
  <div class="combobox noselect">
    <div class="combobox-header">
      <textfield v-bind="$attrs" @focus="onFocus" />
    </div>
    <ul class="list" v-show="isListVisible">
      <li>Dnepr</li>
      <li>Moskow</li>
      <li>Leningrad</li>
      <li>Odessa</li>
      <li>Voronezh</li>
    </ul>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import overlay from '@/components/modal/overlay'
  import textfield from '@/components/textfield'

  const isOverlayVisible = ref(false)
  const isListVisible = ref(false)

  function onFocus() {
    isOverlayVisible.value = true
    isListVisible.value = true
  }
</script>

<style lang="scss" scoped>
.combobox {
  background: $bg-600;
  margin: -0.5rem -0.5rem 0;
  position: relative;
  padding: .5rem;
  z-index: 1;

  .list {
    background: $bg-700;
    width: 100%;
    position: absolute;
    left: 0;
    top: 100%;
    padding: .5rem;

    li {
      background: $bg-800;
      padding: .75rem .5rem;
      cursor: pointer;
      
      &:not(:last-child) {
        margin-bottom: .25rem;
      }

      &:hover {
        background: $bg-600;
      }
    }
  }
}
</style>
