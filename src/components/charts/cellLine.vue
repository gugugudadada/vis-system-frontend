<template>
    <div class="cellLine" :style="{ opacity: isMerged ? 0 : 1 }">
        <div v-if="props.data[0] != -1" ref="cellLineChart"></div>
        <div v-else>
            no data
        </div>
    </div>

</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import * as d3 from 'd3';

let props = defineProps({
    data: Array,
    isMerged: Boolean,
    w: String,
    h: String
});

const cellLineChart = ref(null);

const drawCellLineChart = (data) => {
    // const w = 100;
    // const h = 100;
    // console.log("props.w", props.w); // 120.2px
    // console.log("props.h", props.h); // 120.2px
    const w = parseFloat(props.w) - 10;
    const h = parseFloat(props.h) - 10;
    const margin = { top: 10, right: 0, bottom: 10, left: 20 };
    const width = w - margin.left - margin.right;
    const height = h - margin.top - margin.bottom;

    const svg = d3.select(cellLineChart.value)
        .append('svg')
        .attr('width', w)
        .attr('height', h)
        .attr("id", "mainsvg")
        .attr("class", "svgs");

    const mainGroup = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleLinear()
        .domain([0, data.length - 1])
        .range([0, width]);

        const yScale = d3.scaleLinear()
        .domain([0, 15])
        .range([height, 0]);

    const xAxis = d3.axisBottom(xScale)
       .ticks(0)
         .tickSize(0);
    const yAxis = d3.axisLeft(yScale)
      .ticks(3)
     .tickSize(0);

    const xAxisGroup = mainGroup.append('g')
       .attr('transform', `translate(0, ${height})`)
       .call(xAxis);
    const yAxisGroup = mainGroup.append('g')
       .call(yAxis);

    

    // data = [1,2,3,4,5,5,4,3,2,1]

    const line = d3.line()
        .x((d, i) => xScale(i))
        .y(d => yScale(d))
        .curve(d3.curveMonotoneX);

    mainGroup.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 1.5)
        .attr('d', line);

}

onMounted(() => {
    watchEffect(() => {
        if (props.data.length > 0) {
            d3.select(cellLineChart.value).selectAll('*').remove();
            drawCellLineChart(props.data);
            // console.log(props.data);
        }
    })
});

</script>

<style lang="scss" scoped>

.cellLine {
    transition: all 0.5s ease;
    // background-color: green;
}

</style>