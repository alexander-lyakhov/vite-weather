<template>
  <overlay :is-visible="isOverlayVisible" />
  <div class="combobox noselect">
    <div class="combobox-header">
      <textfield v-bind="$attrs" @focus="open" @click.stop />
    </div>
    <ul class="list" v-show="isListVisible">
      <li class="place" v-for="item in places" :key="id">
        <span class="place-name">
          {{ item.text }}
        </span>
        <span class="place-fullname">
          {{ item.place_name }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import overlay from '@/components/modal/overlay'
  import textfield from '@/components/textfield'
  import cities from '@/store/cities.json'

  const isOverlayVisible = ref(false)
  const isListVisible = ref(false)

  const places = computed(() => cities.features.filter(el => el.place_type.includes('place')))

  function open() {
    document.body.addEventListener('click', close)

    isOverlayVisible.value = true
    isListVisible.value = true
  }

  function close() {
    document.body.removeEventListener('click', close)

    isOverlayVisible.value = false
    isListVisible.value = false
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

    .place {
      background: $bg-800;
      display: grid;
      position: relative;
      padding: .25rem .5rem;
      cursor: pointer;
      transition: padding .2s;

      &:not(:last-child) {
        margin-bottom: .25rem;
      }

      &:hover {
        padding-left: 1.5rem;

        &:after {
          content: '';
          background: $accent-green;
          display: block;
          width: 3px;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
        }
      }

      &-name {
        padding: .25rem 0
      }

      &-fullname {
        font-size: .75rem;
        color: $text-300;
        padding: .25rem 0
      }
    }
  }
}
</style>
