﻿<template>
  <main>
    <card
      no-search
      v-for="card in favorites"
      :key="card.uid"
      :uid="card.uid"
    />
  </main>
</template>

<script setup>
  import { ref, computed, onActivated } from 'vue'
  import { useStore } from 'vuex'
  import card from '@/components/card'

  const store = useStore()
  const favorites = computed(() => store.state.favorites)

  onActivated(() =>
    store.commit('SET_DATA_SRC', 'favorites')
  )

  function deleteCard(locationId) {
    console.log('delete Card -> removeFromFavorites', locationId)
    store.dispatch('removeFromFavorites', locationId)
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
