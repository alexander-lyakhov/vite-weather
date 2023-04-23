<template>
  <div class="container">
    <ul class="days">
      <li v-for="(item, index) in days" :key="index">
        <span class="date">{{ getDateByOffset(index) }}</span>
        <span class="value">{{ getMaxTemp(item) }}&#xb0; / {{ getMinTemp(item) }}&#xb0;</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { ref, computed, inject } from 'vue'
  import { useCardData } from '@/use/useCardData'

  const uid = inject('uid')
  const { data } = useCardData(uid)

  const days = computed(() => data.value?.daily?.slice(0, 5))

  function getDateByOffset(offset) {
    const date = new Date()
    return new Date(date.setDate(date.getDate() + offset)).toDateString()
  }

  function getMaxTemp(item) {
    return Math.round(item?.temp?.max)
  }

  function getMinTemp(item) {
    return Math.round(item?.temp?.min)
  }
</script>

<style lang="scss" scoped>
.container {
  min-height: 300px;
  margin-top: .25rem;

  ul.days {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: .25rem;
    height: 100%;

    li {
      background: $bg-800;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: .5rem;

      .value {
        font-size: 1.25rem;
        color: $text-300;
      }

      /*
      &:not(:last-child) {
        border-bottom: 1px solid $bg-600;
      }
      */
    }
  }
}
</style>
