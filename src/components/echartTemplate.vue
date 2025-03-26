<!-- @ -0,0 +1,49 @@ -->
<template>
  <div id="myChart1" class="mychart" ref="myChart"></div>
</template>

<script setup>
import { onUnmounted, onMounted, ref } from 'vue'
import * as echarts from "echarts";
let echart = echarts;

const props = defineProps({
  option: Object
})


let chart = ref(null)
let myChart = ref(null)

const initChart = () => {
  // chart.value = echart.init(document.getElementById("myChart1"), 'light');
  chart.value = echart.init(myChart.value, 'light');

  // console.log(props.option)
  chart.value.setOption(props.option);

  window.onresize = function () {
    //自适应大小
    chart.value.resize();
  };
}

onMounted(() => {

  initChart();

})

onUnmounted(() => {
  if (chart.value) {
    chart.value.dispose();
  }
})


</script>

<style scoped>
.mychart {
  /* border: 1px solid #ccc; */
  height: 150px;
}
</style>