<template>
  <main>
    <card />
    <!--<card />-->
  </main>
</template>

<script setup>
  import { ref, reactive } from 'vue'
  import card from '@/components/card'

  const props = defineProps({
  })
</script>

<style lang="scss" scoped>
main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: auto;
  grid-gap: .5rem;
  padding: .5rem;
}
@media (max-width: 720px) {
  main {
    grid-template-columns: 1fr;
  }
}

</style>
