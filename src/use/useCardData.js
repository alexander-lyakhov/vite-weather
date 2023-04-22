import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export const useCardData = (uid) => {
  const dataSrc = {
    'home': 'cards',
    'favorites': 'favorites'
  }

  const store = useStore()
  const route = useRoute()

  const data = computed(() =>
    store.state[dataSrc[route.name]]?.find(el => el.uid === uid)
  )

  const isCardDefined = computed(() => !!data.value?.address)

  return {
    data,
    isCardDefined 
  }
}