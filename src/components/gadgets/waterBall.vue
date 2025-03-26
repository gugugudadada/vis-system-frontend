<template>
  <div ref="chart" style="width: 80px; height: 80px;">water</div>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount, defineProps, watchEffect } from 'vue';
import * as echarts from 'echarts';
import 'echarts-liquidfill';

let props = defineProps({
  data: Number
})

let water_data = []
water_data.push(props.data)

const chart = ref(null);
let myChart = null;

onMounted(() => {
  // 初始化 ECharts 实例
  myChart = echarts.init(chart.value);

  // 配置水球图
  const option = {
    series: [{
      type: 'liquidFill',
      data: water_data, // 水球图的数据，表示水位
      radius: '80%', // 水球图的半径
      outline: {
        show: false // 是否显示外边框
      },
      backgroundStyle: {
        color: '#E6F7FF' // 背景颜色
      },
      label: {
        show: true,
        formatter: (params) => {
          return `${(params.value * 100).toFixed(0)}%`; // 显示百分比
        },
        fontSize: 12,
        color: '#1890FF'
      }
    }]

  };

  // 设置配置项并渲染图表
  myChart.setOption(option);



  watchEffect(() => {
    water_data = []
    water_data.push(props.data)
    myChart.setOption({
      series: [{
        data: water_data
      }]
    })
    
  })
});

onBeforeUnmount(() => {
  // 销毁 ECharts 实例
  if (myChart) {
    myChart.dispose();
  }
});
</script>