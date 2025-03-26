<template>
	<div class="webcontainer">

		<div class="web-header">
			光伏可视分析系统
		</div>

		<div class="web-body">
			<div class="box1 box">

				<div class="view-header">
					<div class="trapezoid">
						数据集视图
					</div>
				</div>


				<view1 />
				<!-- <tip1 /> -->
				<!-- <tip2 /> -->
			</div>

			<div class="box2 box">
				<div class="view-header">
					<div class="trapezoid">
					模型视图
				</div>
				</div>
				

				<view2 />

			</div>

			<div class="box34">
				<div class="box3 box">
					<div class="view-header">
						<div class="trapezoid">
						数据视图
					</div>
				</div>
					

					<view3 />
				</div>



				<div class="box4 box">
					<div class="view-header">
						<div class="trapezoid">
						验证视图
					</div>
				</div>
					
					<view4 />

				</div>

			</div>
		</div>



	</div>
</template>

<script setup>

import { onMounted, ref } from "vue";
import echartTemplate from "./components/echartTemplate.vue";
import axios from "axios";
import ecStat from 'echarts-stat';
import * as echarts from "echarts";


import view1 from "@/components/views/view1.vue";
import view2 from "@/components/views/view2.vue";
import view3 from "@/components/views/view3.vue";
import view4 from "@/components/views/view4.vue";

onMounted(() => {
	fetchData();

});

const fetchData = async () => {
	// console.log("fetchData in app.vue");
}

let value = ref('');

let generalOption = {
	grid: {
		top: 50,
		bottom: 0,
	},
	darkMode: "auto",
	colorBy: "series",
	color: [
		'#5470c6',
		'#91cc75',
		'#fac858',
		'#ee6666',
		'#73c0de',
		'#3ba272',
		'#fc8452',
		'#9a60b4',
		'#ea7ccc'
	]
}



let option1 = {
	title: {
		text: '数据集样本分布'
	},
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow'
		}
	},
	xAxis: {
		type: 'value',
		position: 'top',
		splitLine: {
			lineStyle: {
				type: 'dashed'
			}
		}
	},
	yAxis: {
		type: 'category',
		axisLine: { show: false },
		axisLabel: { show: false },
		axisTick: { show: false },
		splitLine: { show: false },
		data: [
			'type5',
			'type4',
			'type3',
			'type2',
			'type1',
		]
	},
	series: [
		{
			name: 'Cost',
			type: 'bar',
			stack: 'Total',
			label: {
				show: true,
				formatter: '{b}'
			},
			data: [
				900,
				320,
				580,
				1000,
				190
			]
		}
	],
};



option1 = Object.assign({}, generalOption, option1);
// option2 = Object.assign({}, generalOption, option2);

echarts.registerTransform(ecStat.transform.clustering);
const data = [
	[3.275154, 2.957587],
	[-3.344465, 2.603513],
	[0.355083, -3.376585],
	[1.852435, 3.547351],
	[-2.078973, 2.552013],
	[-0.993756, -0.884433],
	[2.682252, 4.007573],
	[-3.087776, 2.878713],
	[-1.565978, -1.256985],
	[2.441611, 0.444826],
	[-0.659487, 3.111284],
	[-0.459601, -2.618005]
];
var CLUSTER_COUNT = 2;
var DIENSIION_CLUSTER_INDEX = 2;
var COLOR_ALL = [
	'#37A2DA',
	'#e06343'
];
var pieces = [];
for (var i = 0; i < CLUSTER_COUNT; i++) {
	pieces.push({
		value: i,
		label: 'cluster ' + i,
		color: COLOR_ALL[i]
	});
}
let option2 = {
	dataset: [
		{
			source: data
		},
		{
			transform: {
				type: 'ecStat:clustering',
				// print: true,
				config: {
					clusterCount: CLUSTER_COUNT,
					outputType: 'single',
					outputClusterIndexDimension: DIENSIION_CLUSTER_INDEX
				}
			}
		}
	],
	tooltip: {
		position: 'top'
	},
	visualMap: {
		type: 'piecewise',
		top: 'middle',
		min: 0,
		max: CLUSTER_COUNT,
		left: 10,
		splitNumber: CLUSTER_COUNT,
		dimension: DIENSIION_CLUSTER_INDEX,
		pieces: pieces
	},
	grid: {
		left: 120,
		top: 10,
		bottom: 20
	},
	xAxis: {},
	yAxis: {},
	series: {
		type: 'scatter',
		encode: { tooltip: [0, 1] },
		symbolSize: 6,
		itemStyle: {
			borderColor: '#555'
		},
		datasetIndex: 1
	}
};


// option3
let option3 = {
	xAxis: {
		type: 'category',
		data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	},
	yAxis: {
		type: 'value'
	},
	series: [
		{
			data: [150, 230, 224, 218, 135, 147, 260],
			type: 'line'
		},
		{
			data: [50, 130, 224, 218, 195, 147, 160],
			type: 'line'
		}
	],
	grid: {
		left: 120,
		top: 10,
		bottom: 20
	},
};


</script>

<style scoped lang="scss">
// 通用样式
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;

}


.webcontainer {
	position: absolute;
	top: 0;
	left: 0;

	height: 100%;
	width: 100%;
	// background-color: #e8e8e8;
	background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);

	.web-header {
		height: 3%;
		background-color: #6499AF;
		text-align: center;
		color: white;
		// 字体加粗 且垂直居中
		// line-height: 3%;
		font-weight: bold;
	}


	.web-body {
		width: 100%;
		height: 97%;
		display: flex;
		justify-content: center;
		align-items: center;

		.box {

			height: 98%;
			font-size: 12px;
			border-radius: 5px;


			background: rgba(255, 255, 255, 0.8);

			position: relative;

			display: flex;
			flex-direction: column;

			.view-header {
				height: 30px;
				width: 100%;

				.trapezoid {
					// width: 120px;
					height: 30px;
					background-color: #6499AF;
					clip-path: polygon(0% 0%, 100% 0%, calc(100% - 20px) 100%, 0% 100%);
					float: left;

					line-height: 30px;
					padding-left: 5px;
					padding-right: 20px;
					color: white;
					// font-weight: bold;
					font-size: 14px;
				}
			}



		}

		.box1 {
			flex: 18;
			margin-left: 8px;
			display: flex;
			align-items: center;
			justify-content: center;

		}

		.box2 {
			flex: 48;
			margin-left: 6px;


		}

		.box34 {
			flex: 34;
			margin-left: 6px;
			margin-right: 8px;


			height: 98%;
			// background-color: #f0f0f0;

			display: flex;
			flex-direction: column;
			justify-content: space-between;


			.box3 {
				height: 57%;
				margin-bottom: 8px;
				// background-color: red;


			}



			.box4 {
				// 向下浮动
				height: 42%;
				// background-color: red;
				// position: absolute;
				// bottom: 0;

			}

		}
	}

}
</style>
