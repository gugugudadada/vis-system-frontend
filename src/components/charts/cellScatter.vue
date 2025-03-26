<template>
    <div class="scatter-cell" ref="cellScatterChart"></div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import * as d3 from 'd3';

let props = defineProps({
    data: Array,
    dataAll: Array,
    isMerged: Boolean,
    w: String,
    h: String,
});

const cellScatterChart = ref(null);

const drawCellScatterChart = (data, dataAll) => {
    // const w = 120;
    // const h = 120;
    const w = parseFloat(props.w) - 10;
    const h = parseFloat(props.h) - 10;
    const margin = { top: 0, right: 30, bottom: 40, left: 50 };
    const width = w - margin.left - margin.right;
    const height = h - margin.top - margin.bottom;

    const svg = d3.select(cellScatterChart.value)
        .append('svg')
        .attr('width', w)
        .attr('height', h)
        .attr("id", "mainsvg")
        .attr("class", "svgs");

    const mainGroup = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleLinear()
        .domain([0, 20])
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain([0, 20])
        .range([height, 0]);

    // data = [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]]
    // let highLightData = [[1, 2]]
    mainGroup.selectAll('.dataCircle')
        .data(dataAll)
        .enter()
        .append('circle')
        .attr('class', 'dataCircle')
        .attr('cx', d => xScale(d[0]))
        .attr('cy', d => yScale(d[1]))
        .attr('r', 2)
        .attr('fill', 'gray')

    mainGroup.selectAll('.highLightCircle')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'highLightCircle')
        .attr('cx', d => xScale(d[0]))
        .attr('cy', d => yScale(d[1]))
        .attr('r', 4)
        .attr('fill', 'red')

}


onMounted(() => {
    watchEffect(() => {
        if (props.data.length > 0) {
            d3.select(cellScatterChart.value).selectAll('*').remove();
            drawCellScatterChart(props.data, props.dataAll);
            // console.log(props.data);
        }
    })
})

</script>

<style lang="scss" scoped>

.scatter-cell {
//    background-color: green; 
}
</style>