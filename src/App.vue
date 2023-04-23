<template>
  <nav class="nav">
    <router-link class="router-link" to="/">Home</router-link>
    <router-link class="router-link" to="/favorites">Favorites ({{ favCount }})</router-link>
  </nav>
  <router-view v-slot="{Component, route}">
    <keep-alive>
      <component :is="Component" :key="route.path" />
    </keep-alive>
  </router-view>
  <spinner v-model="isLocked" :isGlobal="true" />
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useStore } from 'vuex'
  import { RouterLink, RouterView } from 'vue-router'
  import spinner from '@/components/modal/spinner'

  const store = useStore()
  const isLocked = ref(false)
  const favCount = computed(() => store.getters.favCount)

  onMounted(async () => {
    isLocked.value = true
    store.dispatch('loadFromFavorites').finally(() =>
      isLocked.value = false
    )
  })
</script>
    
<style lang="scss" scoped>
.nav {
  display: flex;
  gap: 1rem;
  padding: 1rem .5rem;
  
  .router-link {
    font-size: 1.25rem;
    border-bottom: 2px solid transparent;
    padding: .5rem 0;
    
    &-exact-active {
      border-bottom: 2px solid $accent-green;
    }
  }
}
</style>
