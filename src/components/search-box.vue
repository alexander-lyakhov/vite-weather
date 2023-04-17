<template>
  <overlay :is-visible="isOverlayVisible" />
  <div class="searchbox noselect">
    <div class="searchbox-header">
      <textfield
        v-bind="$attrs"
        v-model="city"
        @update:modelValue="debouncedGetCities"
        @click.stop
      />
    </div>
    <ul class="searchbox-list" v-show="isListVisible">
      <li
        class="place"
        v-for="item in places"
        :key="item.id"
        @click="select(item)"
      >
        <span class="place-city">
          {{ item.address.city }}
        </span>
        <span class="place-label">
          {{ item.address.label }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { debounce } from 'lodash'
  import overlay from '@/components/modal/overlay'
  import textfield from '@/components/textfield'
  import cities from '@/store/cities.json'
  import api from '@/api'

  const isOverlayVisible = ref(false)
  const isListVisible = ref(false)

  const city = ref('')
  const places = ref([])
  const debouncedGetCities = debounce(getCities, 500)

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

  async function getCities(query) {
    const { items } = await api.fetchCities(query)

    places.value = items.filter(el => el.localityType === 'city')
    places.value.length && open()
    
    console.log(items)
  }

  async function select(item) {
    city.value = item.address.city
    await api.lookup(item.id)
  }
</script>

<style lang="scss" scoped>
.searchbox {
  background: $bg-600;
  margin: -0.5rem -0.5rem 0;
  position: relative;
  padding: .5rem;
  z-index: 1;

  &-list {
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

      &-city {
        padding: .25rem 0
      }

      &-label {
        font-size: .75rem;
        color: $text-300;
        padding: .25rem 0
      }
    }
  }
}
</style>
