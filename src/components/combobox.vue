<template>
  <div class="combobox">
    <div class="combobox-container">
      <textfield />
      <ul class="list">
        <li>Dnepr</li>
        <li>Moskow</li>
        <li>Leningrad</li>
        <li>Odessa</li>
        <li>Voronezh</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import textfield from '@/components/textfield'
</script>

<style lang="scss" scoped>
.combobox {
  background: $bg-600;
  margin: -0.5rem -0.5rem 0;
  position: relative;
  padding: .5rem;
  z-index: 1;

  &-container {
    position: relative;
    
    .list {
      background: $bg-700;
      border: 1px solid $bg-400;
      width: 100%;
      position: absolute;
      left: 0;
      top: 100%;

      li {
        background: $bg-700;
        padding: .75rem .5rem;
        cursor: pointer;
        
        &:not(:last-child) {
          border-bottom: 1px solid $bg-500;
        }

        &:hover {
          background: $bg-600;
        }			
      }
    }
  }
}
</style>
  