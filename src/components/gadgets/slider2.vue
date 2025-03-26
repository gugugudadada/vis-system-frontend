
<template>
    <div class="flex-space-between">
      <div class="slider-wrapper">
        <d-slider :min="minValue" :max="maxValue" v-model="inputValue"></d-slider>
        <div class="flex-space-between">
          <span>{{ minValue }}</span>
          <span>{{ maxValue }}</span>
        </div>
      </div>
      <div class="snapshot-value">
        <d-input-number  v-model="inputValue" :min="0" :max="20"></d-input-number>
      </div>
    </div>
  
  </template>
  <script>
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    setup() {
      const inputValue = ref(10);
      const minValue = ref(0);
      const maxValue = ref(20);
      return {
        inputValue,
        maxValue,
        minValue,
      };
    },
  });
  </script>
  
  <style scoped>
  .flex-space-between {
    display: flex;
    justify-content: space-between;
    transform: scale(0.77); /* 缩放比例 */
  }
  
  .slider-wrapper {
    width: calc(100% - 100px);
  }
  
  .snapshot-value {
    width: 80px;
    margin-left: 20px;
  }

  
  </style>
  