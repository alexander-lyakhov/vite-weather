﻿<template>
  <div class="card">
    <spinner v-model="isLocked"/>
    <slot>
      <search-box
        v-if="!noSearch"
        placeholder="Search City"
        v-model:isLoading="isLocked"
        @found="onPlaceFound"
        @keydown="onKeydown"
      />

      <div class="card-header">
        <span class="title">
          <template v-if="isCardDefined">
            {{ data?.address?.city }}, {{ data?.address?.countryCode }}
          </template>
        </span>
        <a href="#"
          class="btn btn-icon"
          :class="favClassObj"
          @click.prevent="toggleFavorites"
        >
          <IconFavs />
        </a>
        <a
          class="btn btn-icon"
          :class="{'is-disabled': !isCardDefined}"
          href="#"
          @click.prevent="reload"
        >
          <IconReload />
        </a>
        <a
          class="btn btn-icon"
          :class="{'is-disabled': isDeleteBtnDisabled}"
          href="#"
          @click.prevent="$emit('delete', uid)"
        >
          <IconDelete />
        </a>
      </div>
      <nav class="card-nav">
        <selector :options="cardTabs" v-model="selectedTab" />
      </nav>
      <component :is="selectedTabView" />
    </slot>
  </div>
</template>

<script setup>
  import { ref, computed, provide, nextTick } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute } from 'vue-router'
  import { useCardData } from '@/use/useCardData'
  import IconFavs from '@/assets/icons/star.svg'
  import IconReload from '@/assets/icons/reload.svg'
  import IconDelete from '@/assets/icons/delete.svg'
  import searchBox from '@/components/search-box'
  import selector from '@/components/selector'
  import tabCurrent from '@/components/tab-current'
  import tabHourlyGraph from '@/components/tab-hourly-graph'
  import tabWeek from '@/components/tab-week'
  import spinner from '@/components/modal/spinner'
  import { cardTabs } from '@/config/tabs.js'

  const props = defineProps({
    uid: {
      type: String,
      required: true
    },
    noSearch: {
      type: Boolean,
      default: false
    }
  })

  const emit = defineEmits(['delete'])

  provide('uid', props.uid)

  const components = {
    tabCurrent,
    tabHourlyGraph,
    tabWeek
  }

  const store = useStore()
  const route = useRoute()
  const { data, isCardDefined } = useCardData(props.uid)

  const isLocked = ref(false)
  const selectedTab = ref(cardTabs[0])

  //
  // Computed
  //
  const isInFavorites = computed(() =>
    store.getters.isInFavorites(data.value?.locationId)
  )

  const isDeleteBtnDisabled = computed(() => route.name === 'favorites')
  
  const selectedTabView = computed(() =>
    components[selectedTab.value.value]
  )
  
  const favClassObj = computed(() => ({
    'has-accent': isInFavorites.value,
    'is-disabled': !isCardDefined.value
  }))

  //
  // Methods
  //
  function toggleFavorites() {
    isInFavorites.value
      ? store.dispatch('removeFromFavorites', data.value)
      : store.dispatch('addToFavorites', data.value)
  }

  function reload() {
    onPlaceFound(data.value)
  }

  async function onPlaceFound(data) {
    await nextTick()
    isLocked.value = true
    await store.dispatch('getCardData', {uid: props.uid, ...data})
    isLocked.value = false
  }

  function onKeydown(e) {
    if (e.altKey && [1,2,3].includes(+e.key)) {
      selectedTab.value = cardTabs[+e.key - 1]
    }
  }

  function deleteCard() {
    emit('delete', data.value.locationId)
  }
</script>

<style lang="scss" scoped>
.card {
  font-size: 1rem;
  color: $text-100;
  background: $bg-700;
  display: grid;
  grid-auto-rows: min-content;
  position: relative;
  padding: .5rem;
  cursor: default;

  &-header {
    font-size: 1.5rem;
    height: 2rem;
    line-height: 2rem;
    display: grid;
    grid-template-columns: 1fr repeat(3, 32px);
    grid-gap: .25rem;
    align-items: center;
    margin-top: .5rem;

    .title {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }

  &-nav {
    margin-top: .25rem;
  }
}
</style>
