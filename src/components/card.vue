<template>
  <div class="card">
    <slot>
      <search-box
        placeholder="Search City"
        @found="onPlaceFound"
      />

      <div class="card-header">
        <span class="title">
          <template v-if="data?.name">
            {{ data?.name }}, {{ data?.country }}
          </template>
        </span>
        <a href="#"
          class="btn btn-icon"
          :class="classObj"
          @click.prevent="toggleFavorites"
        >
          <IconFavs />
        </a>
        <a
          class="btn btn-icon"
          href="#"
          @click.prevent
        >
          <IconReload />
        </a>
        <a
          class="btn btn-icon"
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
  import { ref, computed, provide } from 'vue'
  import { useStore } from 'vuex'
  import IconFavs from '@/assets/icons/star.svg'
  import IconReload from '@/assets/icons/reload.svg'
  import IconDelete from '@/assets/icons/delete.svg'
  import searchBox from '@/components/search-box'
  import selector from '@/components/selector'
  import tabCurrent from '@/components/tab-current'
  import tabDaylyGraph from '@/components/tab-dayly-graph'
  import tabWeek from '@/components/tab-week'
  import { cardTabs } from '@/config/index.js'

  const props = defineProps({
    uid: {
      type: String,
      required: true
    }
  })

  provide('uid', props.uid)

  const components = {
    tabCurrent,
    tabDaylyGraph,
    tabWeek
  }

  const store = useStore()

  const isInFavorites = ref(false)
  const selectedTab = ref(cardTabs[0])

  const data = computed(() =>
    store.getters.getByUID(props.uid)
  )

  const classObj = computed(() => ({
    'has-accent': isInFavorites.value
  }))

  const selectedTabView = computed(() => 
    components[selectedTab.value.value]
  )
  
  function toggleFavorites() {
    isInFavorites.value = !isInFavorites.value
  }

  function onPlaceFound(e) {
    console.log(e)
  }
</script>

<style lang="scss" scoped>
.card {
  font-size: 1rem;
  color: $text-100;
  background: $bg-700;
  display: grid;
  grid-auto-rows: min-content;
  padding: .5rem;
  cursor: default;

  &-header {
    font-size: 1.5rem;
    height: 2rem;
    line-height: 2rem;
    display: grid;
    grid-template-columns: 1fr repeat(3, 32px);
    grid-gap: .25rem;
    margin-top: .5rem;
  }

  &-nav {
    margin-top: .25rem;
  }
}
</style>
