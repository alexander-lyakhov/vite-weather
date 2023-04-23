import { computed } from 'vue'
import { useStore } from 'vuex'

export const useCardData = (uid) => {
  const store = useStore()

  const data = computed(() => store.getters.getByUID(uid))
  const isCardDefined = computed(() => !!data.value?.address)

  return {
    data,
    isCardDefined 
  }
}