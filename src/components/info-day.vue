<template>
  <div class="container dayly-container">
    <div class="temperature">
      <div class="current">
        <div class="actual">
          12&#8451;
        </div>

        <div class="feels">
          Feels like 12&#8451;
        </div>
      </div>
      <div class="dayly">
        <div class="dayly-block">
          <span>Night</span>
          <span>8 &#8451;</span>
        </div>
        <div class="dayly-block">
          <span>Morning</span>
          <span>10 &#8451;</span>
        </div>
        <div class="dayly-block">
          <span>Day</span>
          <span>12 &#8451;</span>
        </div>
        <div class="dayly-block">
          <span>Evening</span>
          <span>10 &#8451;</span>
        </div>
      </div>
    </div>
    <ul class="extra-blocks">
      <li>
        <span class="key">Wind</span>
        <span class="value">5.42 m/s</span>
      </li>
      <li>
        <span class="key">Pressure</span>
        <span class="value">1003 hPa</span>
      </li>
      <li>
        <span class="key">Humidity</span>
        <span class="value">87%</span>
      </li>
      <li>
        <span class="key">Visibility</span>
        <span class="value">10.0 km</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue'

  const props = defineProps({
  })
</script>

<style lang="scss" scoped>
.container {
  margin-top: .25rem;

  .temperature {
    text-align: center;
    display: grid;
    grid-template-columns: 5fr 2fr;
    height: 112px;
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
        left: 0;
        top: 0;
        padding: .25rem;
      }
      
      .value {
        font-size: 1.75rem;
        margin-top: .75rem;
      }
    }
  }
}
</style>
