<template>
  <div class="container dayly-container">
    <div class="temperature">
      <div class="current">
        <div class="actual">
          {{ temperature }} &#8451;
        </div>

        <div class="feels">
          Feels like {{ feelsLike }} &#8451;
        </div>
      </div>
      <div class="dayly">
        <div class="dayly-block">
          <span>Night</span>
          <span>{{ t_night }} &#8451;</span>
        </div>
        <div class="dayly-block">
          <span>Morning</span>
          <span>{{ t_morning }} &#8451;</span>
        </div>
        <div class="dayly-block">
          <span>Day</span>
          <span>{{ t_day }} &#8451;</span>
        </div>
        <div class="dayly-block">
          <span>Evening</span>
          <span>{{ t_evening }} &#8451;</span>
        </div>
      </div>
    </div>
    <ul class="extra-blocks">
      <li>
        <span class="key">Wind</span>
        <span class="value">{{ wind }} m/s</span>
      </li>
      <li>
        <span class="key">Pressure</span>
        <span class="value">{{ pressure }} hPa</span>
      </li>
      <li>
        <span class="key">Humidity</span>
        <span class="value">{{ humidity }} %</span>
      </li>
      <li>
        <span class="key">Visibility</span>
        <span class="value">{{ visibility }} km</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { ref, computed, inject } from 'vue'
  import { useCardData } from '@/use/useCardData'

  const uid = inject('uid')
  const { data } = useCardData(uid)

  const daily = computed(() =>
    data.value?.daily ? data.value?.daily[0] : {}
  )

  const temperature = computed(() => Math.round(data.value?.current?.temp) || '--')
  const feelsLike   = computed(() => Math.round(data.value?.current?.feels_like) || '--')
  const t_night     = computed(() => Math.round(daily.value?.temp?.night) || '--')
  const t_morning   = computed(() => Math.round(daily.value?.temp?.morn) || '--')
  const t_day       = computed(() => Math.round(daily.value?.temp?.day) || '--')
  const t_evening   = computed(() => Math.round(daily.value?.temp?.eve) || '--')
  const wind        = computed(() => Math.round(data.value?.current?.wind_speed) || '--')
  const pressure    = computed(() => Math.round(data.value?.current?.pressure) || '--')
  const humidity    = computed(() => Math.round(data.value?.current?.humidity) || '--')
  const visibility  = computed(() => Math.round(data.value?.current?.visibility) / 1000 || '--')
</script>

<style lang="scss" scoped>
.container {
  margin-top: .25rem;

  .temperature {
    text-align: center;
    display: grid;
    grid-template-columns: 5fr 2fr;
    height: 128px;
    align-items: center;
    
    .current {
      .actual {
        font-size: 4rem;
      }
      
      .feels {
        font-size: 1rem;
        height: 24px;
        line-height: 24px;
        position: relative;
        margin-top: .5rem;
      }
    }
    .dayly {
      font-size: .875rem;
      height: 112px;
      display: grid;
      grid-template-rows: auto;

      &-block {
        display: flex;
        justify-content: space-between;
        align-items: center;

        &:not(:last-child) {
          border-bottom: 1px solid $bg-400;
        }
      }
    }
  }
  .extra-blocks {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: .5rem;
    margin-top: .25rem;
    
    li {
      background: $bg-600;
      border: 1px solid $bg-500;
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      .key {
        font-size: .875rem;
        color: $text-200;
        position: absolute;
        left: 0.25rem;
        top: 2px;
        padding: 2px;
      }
      
      .value {
        font-size: 1.75rem;
        margin-top: .75rem;
      }
    }
  }
}
</style>
