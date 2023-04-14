<template>
  <div class="container">
    <ul class="days">
      <li v-for="(item, index) in days" :key="index">
        <span class="date">{{ getDateByOffset(index) }}</span>
        <span class="value">{{ item.temp.max}} / {{ item.temp.min }} &#8451;</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()

  const data = computed(() => store.getters.getByCity('Dnipro'))
  const days = computed(() => data.value.daily.slice(0, 5))

  function getDateByOffset(offset) {
    const date = new Date()
    return new Date(date.setDate(date.getDate() + offset)).toDateString()
  }
</script>

<style lang="scss" scoped>
.container {
  // background: $bg-600;
  height: 284px;
  margin-top: .25rem;

  ul.days {
    // background: $bg-600;
    display: grid;
    grid-template-columns: 1fr;
    // grid-template-rows: repeat(5, 20%);
    grid-gap: .25rem;
    height: 100%;

    li {
      background: $bg-600;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: .5rem;

      &:not(:last-child) {
        // border-bottom: 1px solid $bg-500;
      }
    }
  }
}
</style>
