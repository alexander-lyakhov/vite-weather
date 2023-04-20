<template>
  <main>
    <card
      no-search
      v-for="card in cards"
      :key="card.uid"
      :uid="card.uid"
      @delete="deleteCard"
    />
  </main>
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useStore } from 'vuex'
  import card from '@/components/card'

  const store = useStore()
  const cards = computed(() => store.state.favorites)

  function deleteCard(uid) {
    console.log('deleteCard', uid)
    store.dispatch('deleteCard', uid)
  }
</script>

<style lang="scss" scoped>
main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: auto;
  grid-gap: 1.5rem .75rem;
  padding: .5rem;

  .card-add {
    min-height: 448px;

    .btn-add {
      font-size: 8rem;
      color: $text-400;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 356px;

      &:hover {
        color: $text-300;
      }
    }
  }
}
@media (max-width: 720px) {
  main {
    grid-template-columns: 1fr;
  }
}

</style>
