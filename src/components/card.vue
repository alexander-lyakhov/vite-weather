<template>
  <base-card>
    <div class="card-header">
      <span class="title">Dnipro, UA</span>
      <a class="btn btn-icon" href="#">
        <CheckmarkOutline />
      </a>
      <a class="btn btn-icon" href="#">
        <CheckmarkOutline />
      </a>
      <a class="btn btn-icon" href="#">
        <CheckmarkOutline />
      </a>
    </div>
    <nav class="card-nav">
      <selector :options="cardTabs" v-model="selectedTab" />
    </nav>
    <component :is="selectedTabView" />
  </base-card>

  <base-card>
    <div class="card-header">
      <span class="title">Dnipro, UA</span>
      <a class="btn btn-icon" href="#">
        <CheckmarkOutline />
      </a>
      <a class="btn btn-icon" href="#">
        <CheckmarkOutline />
      </a>
      <a class="btn btn-icon" href="#">
        <CheckmarkOutline />
      </a>
    </div>
    <nav class="card-nav">
      <selector :options="cardTabs" v-model="selectedTab" />
    </nav>
    <component :is="infoWeek" />
  </base-card>
</template>

<script setup>
  import { ref, computed, resolveComponent } from 'vue'
  import baseCard from '@/components/base-card'
  import CheckmarkOutline from '@/assets/icons/checkmark-outline.svg'
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

  const selectedTab = ref(cardTabs[0])
  const selectedTabView = computed(() => components[selectedTab.value.value])
</script>

<style lang="scss" scoped>
.card {
  // background: #088;
  font-size: 1rem;
  color: $text-100;
  padding: .5rem;

  &-header {
    font-size: 1.5rem;
    // background: $bg-600;
    height: 2rem;
    line-height: 2rem;
    display: grid;
    grid-template-columns: 1fr repeat(3, 32px);
    // padding: 0 .5rem;
  }

  &-nav {
    margin-top: .25rem;
  }
}
</style>
