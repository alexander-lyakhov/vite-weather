<template>
  <div class="container">
    <canvas ref="canvasRef">
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
  Chart.defaults.elements.point.style = 'rect'
  Chart.defaults.elements.point.radius = 2
  Chart.defaults.elements.point.hitRadius = 6
  Chart.defaults.elements.point.hoverRadius = 6
  // Chart.defaults.elements.line.fill = true
  // Chart.defaults.elements.line.stepped = true
  // Chart.defaults.elements.line.tension = 3
  Chart.defaults.elements.line.capBezierPoints = false

  onMounted(() => {
    const ctx = canvasRef.value
    console.log(ctx)
    
    chart = new Chart(ctx, {
      type: 'line',

      data: {
        labels: data.value?.map(el => el.time),
        datasets: [{
          label: 'Temperature',
          data: data.value?.map(el => el.temp),
          borderWidth: 1,
        }]
      },

      options: {
        scalse: {
          y: {
            beginAtZero: false
          },
          color: '#fff'
        },
        spanGaps: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            titleFont: {
              family: 'verdana',
              size: 16,
              weight: 'normal'
            },
            bodyFont: {
              family: 'verdana',
              size: 16,
            },
            boxWidth: 8,
            boxHeight: 8,
            boxPadding: 4
          },
          legend: {
            labels: {
              color: '#e0e0e0',
              font: {
                family: 'verdana',
                size: 14,
              }
            }
          }
        }
      }
    })
    
  })

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
