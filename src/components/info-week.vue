<template>
  <div class="container">
    <ul class="days">
      <li>
        <span class="date">Fri Apr 14 2023</span>
        <span class="value">16 / 6 &#8451;</span>
      </li>
      <li>
        <span class="date">Fri Apr 14 2023</span>
        <span class="value">16 / 6 &#8451;</span>
      </li>
      <li>
        <span class="date">Fri Apr 14 2023</span>
        <span class="value">16 / 6 &#8451;</span>
      </li>
      <li>
        <span class="date">Fri Apr 14 2023</span>
        <span class="value">16 / 6 &#8451;</span>
      </li>
      <li>
        <span class="date">Fri Apr 14 2023</span>
        <span class="value">16 / 6 &#8451;</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue'

  const props = defineProps({
  })
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
