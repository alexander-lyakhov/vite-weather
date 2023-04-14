<template>
  <div class="card">
    <slot>
      <div class="card-header">
        <span class="title">Dnipro, UA</span>
        <a
          href="#" @click="toggleFavorites"
          class="btn btn-icon"
          :class="{'has-accent': isInFavorites}"
        >
          <IconFavs />
        </a>
        <a class="btn btn-icon" href="#">
          <IconReload />
        </a>
        <a class="btn btn-icon" href="#">
          <IconDelete />
        </a>
      </div>
      <nav class="card-nav">
        <selector :options="cardTabs" v-model="selectedTab" />
      </nav>
      <component :is="selectedTabView" />
    </slot>
  </div>

  <div class="card">
    <slot>
      <div class="card-header">
        <span class="title">Dnipro, UA</span>
        <a class="btn btn-icon" href="#">
          <IconFavs />
        </a>
        <a class="btn btn-icon" href="#">
          <IconReload />
        </a>
        <a class="btn btn-icon" href="#">
          <IconDelete />
        </a>
      </div>
      <nav class="card-nav">
        <selector :options="cardTabs" v-model="selectedTab" />
      </nav>
      <component :is="infoWeek" />
    </slot>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import IconFavs from '@/assets/icons/star.svg'
  import IconReload from '@/assets/icons/reload.svg'
  import IconDelete from '@/assets/icons/delete.svg'
  import selector from '@/components/selector'
  import infoDay from '@/components/info-day'
  import infoDaylyGraph from '@/components/info-dayly-graph'
  import infoWeek from '@/components/info-week'
  import { cardTabs } from '@/config/index.js'

  const props = defineProps({
  })

  const components = {
    infoDay,
    infoDaylyGraph,
    infoWeek
  }

  const isInFavorites = ref(false)
  const selectedTab = ref(cardTabs[0])
  
  const selectedTabView = computed(() => 
    components[selectedTab.value.value]
  )
  
  const classes = computed(() => ({
    'has-accent': isInFavorites.value
  }))


  function toggleFavorites() {
    isInFavorites.value = !isInFavorites.value
  }
</script>

<style lang="scss" scoped>
.card {
  font-size: 1rem;
  color: $text-100;
  background: $bg-700;
  padding: .5rem;
  cursor: default;

  &-header {
    font-size: 1.5rem;
    height: 2rem;
    line-height: 2rem;
    display: grid;
    grid-template-columns: 1fr repeat(3, 32px);
    grid-gap: .25rem;
  }

  &-nav {
    margin-top: .25rem;
  }
}
</style>
