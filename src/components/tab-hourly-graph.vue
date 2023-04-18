<template>
  <div class="container">
    <canvas ref="canvasRef" width="100%">
      <h1>Hourly Graph</h1>
    </canvas>
  </div>
</template>

<script setup>
  import { ref, computed, inject, onMounted  } from 'vue'
  import { useStore } from 'vuex'
  import Chart from 'chart.js/auto';

  const props = defineProps({
  })

  const uid = inject('uid')
  const store = useStore()
  const data = computed(() => store.getters.getChartData(uid))

  const canvasRef = ref(null)
  let chart = null

  onMounted(() => {
    const ctx = canvasRef.value
    console.log(ctx)
    
    chart = new Chart(ctx, {
      type: 'bar',

      data: {
        labels: data.value.map(el => el.time),
        datasets: [{
          label: '# of Votes',
          data: data.value.map(el => el.temp),
          borderWidth: 1
        }]
      },

      options: {
        scalse: {
          y: {
            beginAtZero: true
          }
        }
      }
    })
    
  })

</script>

<style lang="scss" scoped>
.container {
  min-height: 300px;
  margin-top: .25rem;

  canvas {
    width: 100%;
  }
}
</style>
