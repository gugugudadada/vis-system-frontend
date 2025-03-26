<template>
    <div ref="pcpChart"></div>
</template>

<script setup>
import * as d3 from 'd3';
import { onMounted, watchEffect, ref } from 'vue';
import { chartAxisColor, chartTextColor } from '@/conf/color'

let props = defineProps({
    data: Array
})


const name = ['myModel']

const pcpChart = ref(null);

const drawPCPChart = (data) => {


    const w = 270;
    const h = 220;
    const margin = { top: 40, right: 50, bottom: 30, left: 20 };
    const innerWidth = w - margin.left - margin.right;
    const innerHeight = h - margin.top - margin.bottom;

    const svg = d3.select(pcpChart.value)
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .attr("id", "mainsvg")
        .attr("class", "svgs");

    const mainGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);


    // console.log("data", data);
    let dimensions = Object.keys(data[0]);
    // console.log("dimensions", dimensions);
    
    const xScale = d3.scalePoint()
        .domain(dimensions)
        .range([0, innerWidth]);

    const yScales = {};
    dimensions.forEach(dim => {
        yScales[dim] = d3.scaleLinear()
            .domain(d3.extent(data, d => d[dim]))
            .range([innerHeight, 0]);
    });

    // 绘制轴线
    mainGroup.selectAll(".dimension")
        .data(dimensions)
        .enter()
        .append("g")
        .attr("class", "dimension")
        .attr("transform", d => `translate(${xScale(d)}, 0)`)
        .each(function (d) {
            d3.select(this)
                .append("line")
                .attr("y1", 0)
                .attr("y2", innerHeight)
                .attr("stroke", chartAxisColor);

            d3.select(this)
                .append("text")
                .attr("y", -10)
                .attr("text-anchor", "middle")
                .text(d)
                .attr("fill", chartTextColor);
        });

    // 定义折线生成器
    const line = d3.line()
        .x((d, i) => xScale(dimensions[i]))
        .y((d, i) => yScales[dimensions[i]](d));

    // 绘制数据线
    mainGroup.selectAll(".line")
        .data(data)
        .enter()
        .append("path")
        .attr("class", "line")
        .attr("d", d => line(dimensions.map(dim => d[dim])))
        .attr("stroke", "steelblue")
        .attr("fill", "none")
        .on("mouseover", function () {
            d3.select(this)
                .attr("stroke", "orange")
                .attr("stroke-width", 2);
        })
        .on("mouseout", function () {
            d3.select(this)
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1);
        });

    // 根据name数组 在每条line最右边的节点右边标注name
    mainGroup.selectAll(".name")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "name")
        .attr("x", innerWidth + 5)
        .attr("y", (d, i) => yScales[dimensions[i]](d[dimensions[i]]))
        .attr("dy", "0.35em")
        .text(name[0])
        .attr("font-size", "10px")
        .attr("fill", chartTextColor);


    // 在每个节点旁标注数据
    mainGroup.selectAll(".data-point")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "data-point")
        .selectAll("text")
        .data(d => dimensions.map(dim => ({ dim, value: d[dim] })))
        .enter()
        .append("text")
        .attr("x", d => xScale(d.dim) - 16) 
        .attr("y", d => yScales[d.dim](d.value) + 8)
        .attr("dy", "0.35em") // 垂直居中
        .text(d => d.value)
        .attr("font-size", "10px")
        .attr("fill", "gray");
}




onMounted(() => {
    watchEffect(() => {
        if (props.data && props.data.length > 0) {
            // 先清空pcpChart
            d3.select(pcpChart.value).selectAll('*').remove();
            drawPCPChart(props.data);
        } else {
            d3.select(pcpChart.value).selectAll('*').remove();
        }
    })
})
</script>