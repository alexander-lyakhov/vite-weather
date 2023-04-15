<template>
  <main>
    <card />
    <card class="card-add">
      <div class="btn btn-add">+</div>
    </card>
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

  .card-add {
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
