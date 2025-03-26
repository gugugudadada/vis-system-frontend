<template>
    <div class="slider-container" @mousedown="startDrag" @touchstart="startDrag">
      <div class="slider-track"></div>
      <div class="slider-thumb" :style="{ left: thumbPosition + 'px' }"></div>
      <!-- tooltip -->
      
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, watch } from 'vue';
  
  const props = defineProps({
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    step: { type: Number, default: 1 },
    value: { type: Number, default: 0 }
  });
  
  const thumbPosition = ref(0);
  const isDragging = ref(false);
  const startX = ref(0);
  const currentX = ref(0);
  
  const emit = defineEmits(['update:value']);
  const updateThumbPosition = (newValue) => {
    const range = props.max - props.min;
    thumbPosition.value = ((newValue - props.min) / range) * sliderWidth.value;
  };
  
  const sliderWidth = ref(0);
  
  onMounted(() => {
    const container = document.querySelector('.slider-container');
    sliderWidth.value = container.clientWidth;
    updateThumbPosition(props.value);
  });
  
  const startDrag = (event) => {
    isDragging.value = true;
    startX.value = event.clientX || event.touches[0].clientX;
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);
  };
  
  const drag = (event) => {
    if (!isDragging.value) return;
    currentX.value = event.clientX || event.touches[0].clientX;
    const deltaX = currentX.value - startX.value;
    const newPosition = thumbPosition.value + deltaX;
    const newValue = props.min + (newPosition / sliderWidth.value) * (props.max - props.min);
    updateThumbPosition(Math.min(Math.max(newValue, props.min), props.max));
    startX.value = currentX.value;
  };
  
  const stopDrag = () => {
    isDragging.value = false;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('touchmove', drag);
    document.removeEventListener('mouseup', stopDrag);
    document.removeEventListener('touchend', stopDrag);
  };
  
  watch(thumbPosition, (newPosition) => {
    const newValue = props.min + (newPosition / sliderWidth.value) * (props.max - props.min);
    emit('update:value', Math.round(newValue / props.step) * props.step);
  });
  </script>
  
  <style scoped>
  .slider-container {
    position: relative;
    width: 100%;
    height: 20px;
    /* background-color: #f0f0f0; */
    cursor: pointer;
  }
  
  .slider-track {
    position: absolute;
    width: 100%;
    height: 4px;
    top: 8px;
    background-color: #ccc;
  }
  
  .slider-thumb {
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: #fff;
    border: 2px solid #666;
    border-radius: 50%;
    top: 0;
    cursor: grab;
  }
  </style>