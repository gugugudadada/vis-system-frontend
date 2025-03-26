<template>
	<div id="bar-chart"></div>
</template>

<script setup>
import * as d3 from 'd3';
import { onMounted, watchEffect, ref } from 'vue';
import { colorConfig, chartAxisColor, chartTextColor } from '@/conf/color'
let props = defineProps({
	data: Array
})

const type = ['normal', 'one_port_two_strings', 'hot_spot', 'open_circuit', 'short_circuit'];

const typeMap = [
	{type: 'normal', name: '正常'},
	{type: 'one_port_two_strings', name: '两串'},
	{type: 'hot_spot', name: '热斑'},
	{type: 'open_circuit', name: '开路'},
	{type: 'short_circuit', name: '短路'}
]


const generateDataset = (data) => {
	
	let dataset = [];
	
	// 遍历type
	for (let i = 0; i < typeMap.length; i++) {
		let item = {};
		item.name = typeMap[i].name;
		item.percent = data[typeMap[i].type + '_sample_count'] / data.sample_count;	
		dataset.push(item);
	}

	return dataset;
}



let dataset;



onMounted(() => {
	
	// drawBarChart(dataset);
	watchEffect(() => {
		if (props.data) {
		
			dataset = generateDataset(props.data);
			// 先清空id为bar-chart的div
			d3.select('#bar-chart').selectAll('*').remove();
			drawBarChart(dataset);
		} else {
			dataset = [];
			d3.select('#bar-chart').selectAll('*').remove();
			drawBarChart(dataset);
		}
	})
})

const drawBarChart = (data) => {
	
	const width = 290;
	const height = 200;
	let svg = d3.select('#bar-chart')
		.append('svg')
		.attr('width', width)
		.attr('height', height);

	let margin = {top: 20, right: 10, bottom: 30, left: 35};
	let innerWidth = width - margin.left - margin.right;
	let innerHeight = height - margin.top - margin.bottom;
	const mainGroup = svg.append('g')
		.attr('transform', `translate(${margin.left}, ${margin.top})`);
	const xValue = d => d.percent;
	const yValue = d => d.name;
	const xScale = d3.scaleLinear()
		.domain([0, d3.max(data, xValue)])
		.range([0, innerWidth]);
	const yScale = d3.scaleBand()
		.domain(data.map(yValue))
		.range([0, innerHeight])
		.padding(0.3);

	mainGroup.selectAll('rect')
		.data(data).join('rect')
		.attr('x', 0)
		.attr('y', d => yScale(yValue(d)))
		.attr('width', d => xScale(xValue(d)))
		.attr('height', yScale.bandwidth())
		.attr('fill', (d, i) => colorConfig[i]);

	const xAxis = d3.axisBottom(xScale)
	.tickSize(0)
	.ticks(5)
	.tickFormat(d3.format('.0%'));

	const yAxis = d3.axisLeft(yScale)
	.tickSize(0)



	const xAxisGroup = mainGroup.append('g').call(xAxis)
		.attr('transform', `translate(0, ${innerHeight})`)
		.style('color', chartAxisColor)
		.selectAll('.tick text')
		.style('color', chartTextColor);

	
	const yAxisGroup = mainGroup.append('g').call(yAxis)
		.style('color', chartAxisColor)
		.selectAll('.tick text')
		.style('color', chartTextColor);
}
</script>