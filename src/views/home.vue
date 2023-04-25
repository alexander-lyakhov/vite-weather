<template>
  <main>
    <card
      v-for="card in cards"
      :key="card.uid"
      :uid="card.uid"
      @delete="deleteCard"
    />
    <card
      class="card-add noselect"
      :uid="'empty'"
      v-if="isAddCardVisible"
    >
      <div class="btn btn-add" @click="addCard">+</div>
    </card>
  </main>
</template>

<script setup>
  import { ref, computed, onMounted, onUnmounted, onActivated } from 'vue'
  import { useStore } from 'vuex'
  import { debounce } from 'lodash'
  import swal from 'sweetalert2'
  import card from '@/components/card'

  const store = useStore()
  const cards = computed(() => store.state.cards)

  const isAddCardVisible = computed(() => cards.value.length < 6)
  const debouncedOnkeydown = debounce(onKeydown, 200)

  onActivated(() =>
    store.commit('SET_DATA_SRC', 'cards')
  )

  onMounted(() => {
    // document.documentElement.addEventListener('keydown', debouncedOnkeydown)
    addCard()
  })
  
  onUnmounted(() => {
    // document.documentElement.removeEventListener('keydown', debouncedOnkeydown)
  })

  function addCard() {
    if (cards.value.length < 6) {
      store.dispatch('addCard')
    }
  }

  async function deleteCard(uid) {
    const res = await swal.fire({
      text: 'Are you shure you want to delete the card?',
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'delete'
    })
    res.isConfirmed && store.dispatch('deleteCard', uid)
  }
  
  function onKeydown(e) {
    e.altKey && e.key === '+' && addCard()
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
      width: 100%;
      height: 100%;
      position: absolute;

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
