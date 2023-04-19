<template>
  <overlay :is-visible="isOverlayVisible" />
  <div class="searchbox noselect">
    <div class="searchbox-header">
      <text-field
        v-bind="$attrs"
        v-model="text"
        @update:modelValue="debouncedGetCities"
        @keydown="onKeydown"
        @click.stop
      />
    </div>
    <ul class="searchbox-list" v-show="isListVisible">
      <li
        class="place"
        v-for="(item, index) in list"
        :key="item.id"
        :class="{'is-active': isItemActive(index)}"
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
  import textField from '@/components/text-field'
  import cities from '@/store/cities.json'
  import api from '@/api'

  const props = defineProps({
    isLoading: {
      type: Boolean,
      default: false
    }
  })

  const emit = defineEmits([
    'found',
    'update:isLoading'
  ])

  const isOverlayVisible = ref(false)
  const isListVisible = ref(false)

  const text = ref('')
  const list = ref([])
  const activeListIndex = ref(-1)
  const debouncedGetCities = debounce(fetchList, 500)

  function onKeydown(e) {
    if (list.value.length) {
      if (e.key === 'ArrowUp' && --activeListIndex.value < 0) {
        activeListIndex.value = list.value.length - 1
      }
      if (e.key === 'ArrowDown' && ++activeListIndex.value >= list.value.length) {
        activeListIndex.value = 0
      }
      if (e.key === 'Enter') {
        activeListIndex.value >= 0 && select(list.value[activeListIndex.value])
      }
      e.key === 'Escape' && hideList()
      // console.log(e.key, activeListIndex.value, list.value[activeListIndex.value])
    }
  }

  function isItemActive(index) {
    return index === activeListIndex.value
  }

  function showList() {
    document.body.addEventListener('click', close)

    isOverlayVisible.value = true
    isListVisible.value = true
  }

  function hideList() {
    document.body.removeEventListener('click', close)

    isOverlayVisible.value = false
    isListVisible.value = false
  }

  async function fetchList(query) {
    console.log('fetchList', query)
    try {
      const { items } = await api.fetchCities(query)
      list.value = items.filter(el => el.localityType === 'city')
      list.value.length ? showList() : hideList()
      activeListIndex.value = -1
    }
    catch(e) {
      console.log(e)
      hideList()
    }
  }

  async function select(item) {
    text.value = item.address.city
    hideList()

    emit('update:isLoading', true)

    const location = await api.lookup(item.id)
    emit('found', {...item.address, ...location.position})
    emit('update:isLoading', false)
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

      &:hover, &.is-active {
        background: lighten($bg-800, 5%);
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
