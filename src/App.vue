<template>
  <nav class="nav">
    <router-link class="router-link" to="/">Home</router-link>
    <router-link class="router-link" to="/favorites">Favorites</router-link>
  </nav>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</template>

<script setup>
  import { RouterLink, RouterView } from 'vue-router'
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
