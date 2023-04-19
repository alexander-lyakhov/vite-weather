<template>
  <div class="container">
    <canvas ref="canvasRef">
      <h1>Hourly Graph</h1>
    </canvas>
  </div>
</template>

<script setup>
  import { ref, computed, inject, onMounted, onUnmounted, watch } from 'vue'
  import { useStore } from 'vuex'
  import { debounce } from 'lodash'
  import chartOptions from '@/config/chart.js'
  import {
    Chart,
    Colors,
    LineController,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Legend,
    Tooltip
  } from 'chart.js'

  Chart.register(
    Colors,
    LineController,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Legend,
    Tooltip
  )

  const uid = inject('uid')
  const store = useStore()
  const data = computed(() => store.getters.getChartData(uid))
  const debouncedResize = debounce(onResize, 500)

  const canvasRef = ref(null)
  let chart = null

  watch(() => data.value, async () => {
    chart.data.datasets[0].data = data.value?.map(el => el.temp),
    chart.update()
  })

  onMounted(() => {
    initGraph()
    window.addEventListener('resize', onResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', onResize)
    chart.destroy()
  })

  function onResize(e) {
    chart.options.animations = 'none'
    chart.destroy()
    initGraph()
  }

  function initGraph() {
    const ctx = canvasRef.value
    
    chart = new Chart(ctx, {
      type: 'line',
      options: chartOptions,

      data: {
        labels: data.value?.map(el => el.time),
        datasets: [{
          label: 'Temperature',
          data: data.value?.map(el => el.temp),
        }]
      },
    })
  }
</script>

<style lang="scss" scoped>
.container {
  background: $bg-800;
  min-height: 300px;
  margin-top: .25rem;

  canvas {
    width: 100%;
  }
}
</style>
