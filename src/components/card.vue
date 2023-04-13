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
      <div class="selector">
        <span class="selected">Dayly</span>
        <span>Hourly</span>
        <span>Weekly</span>
      </div>
    </nav>
    <component :is="infoDay" />
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
      <div class="selector">
        <span class="selected">Dayly</span>
        <span>Hourly</span>
        <span>Weekly</span>
      </div>
    </nav>
    <component :is="infoWeek" />
  </base-card>
</template>

<script setup>
  import { ref, reactive } from 'vue'
  import baseCard from '@/components/base-card'
  import CheckmarkOutline from '@/assets/icons/checkmark-outline.svg'
  import infoDay from '@/components/info-day'
  import infoDaylyGraph from '@/components/info-dayly-graph'
  import infoWeek from '@/components/info-week'

  const props = defineProps({
  })
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
    .selector {
      font-size: .75rem;
      border-bottom: 2px solid $bg-500;
      display: flex;
      gap: .5rem;

      span {
        margin-bottom: -2px;
        padding: .5rem 0;
        cursor: pointer;

        &.selected {
          // background: $bg-600;
          border-bottom: 2px solid $bg-300;
        }
      }
    }
  }
}
</style>
