<template>

    <div class="chart-container" ref="dataLineChartContainer">

        <div class="options">
            <div class="background" @click="copy1">
                <div class="filled filled-type1" :style="{ '--fillColor': fill1 }"></div>
                <svg t="1740921665978" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="3787" width="200" height="200">
                    <path
                        d="M394.666667 106.666667h448a74.666667 74.666667 0 0 1 74.666666 74.666666v448a74.666667 74.666667 0 0 1-74.666666 74.666667H394.666667a74.666667 74.666667 0 0 1-74.666667-74.666667V181.333333a74.666667 74.666667 0 0 1 74.666667-74.666666z m0 64a10.666667 10.666667 0 0 0-10.666667 10.666666v448a10.666667 10.666667 0 0 0 10.666667 10.666667h448a10.666667 10.666667 0 0 0 10.666666-10.666667V181.333333a10.666667 10.666667 0 0 0-10.666666-10.666666H394.666667z m245.333333 597.333333a32 32 0 0 1 64 0v74.666667a74.666667 74.666667 0 0 1-74.666667 74.666666H181.333333a74.666667 74.666667 0 0 1-74.666666-74.666666V394.666667a74.666667 74.666667 0 0 1 74.666666-74.666667h74.666667a32 32 0 0 1 0 64h-74.666667a10.666667 10.666667 0 0 0-10.666666 10.666667v448a10.666667 10.666667 0 0 0 10.666666 10.666666h448a10.666667 10.666667 0 0 0 10.666667-10.666666v-74.666667z"
                        fill="currentColor" p-id="3788"></path>
                </svg>
            </div>

            <div class="background" @click="copy2">
                <div class="filled filled-type2" :style="{ '--fillColor': fill2 }"></div>
                <svg t="1740921665978" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="3787" width="200" height="200">
                    <path
                        d="M394.666667 106.666667h448a74.666667 74.666667 0 0 1 74.666666 74.666666v448a74.666667 74.666667 0 0 1-74.666666 74.666667H394.666667a74.666667 74.666667 0 0 1-74.666667-74.666667V181.333333a74.666667 74.666667 0 0 1 74.666667-74.666666z m0 64a10.666667 10.666667 0 0 0-10.666667 10.666666v448a10.666667 10.666667 0 0 0 10.666667 10.666667h448a10.666667 10.666667 0 0 0 10.666666-10.666667V181.333333a10.666667 10.666667 0 0 0-10.666666-10.666666H394.666667z m245.333333 597.333333a32 32 0 0 1 64 0v74.666667a74.666667 74.666667 0 0 1-74.666667 74.666666H181.333333a74.666667 74.666667 0 0 1-74.666666-74.666666V394.666667a74.666667 74.666667 0 0 1 74.666666-74.666667h74.666667a32 32 0 0 1 0 64h-74.666667a10.666667 10.666667 0 0 0-10.666666 10.666667v448a10.666667 10.666667 0 0 0 10.666666 10.666666h448a10.666667 10.666667 0 0 0 10.666667-10.666666v-74.666667z"
                        fill="currentColor" p-id="3788"></path>
                </svg>
            </div>
        </div>

        <div ref="dataLineChart"></div>
    </div>
</template>

<script setup>
import * as d3 from 'd3';
import { onMounted, watchEffect, ref, watch, computed, h } from 'vue';

import { useChartStore } from '@/store/chart';
const chartStore = useChartStore();

import { colorConfig, chartAxisColor, chartTextColor } from '@/conf/color'
import { nameConfig } from '@/conf/name';
let props = defineProps({
    batchData: Array,
    type1: Number,
    type2: Number,
    h: Number
})

let color1 = computed(() => {
    if (props.type1 != null) {
        return colorConfig[props.type1];
    } else {
        return "steelblue";
    }
})

let name1 = computed(() => {
    if (props.type1 != null) {
        return nameConfig[props.type1];
    } else {
        return "type1";
    }
})

let color2 = computed(() => {
    if (props.type2 != null) {
        return colorConfig[props.type2];
    } else {
        return "red";
    }
})

let name2 = computed(() => {
    if (props.type2 != null) {
        return nameConfig[props.type2];
    } else {
        return "type2";
    }
})

const line1 = ref(1)
const line2 = ref(1)

const num1 = ref(0)
const num2 = ref(0)

let data0 = null;
let data1 = null;


const choose1 = (id) => {
    line1.value = id;
    d3.select(dataLineChart.value).selectAll("*").remove();
    drawDataLineChart(props.batchData[0][line1.value], props.batchData[1][line2.value]);
}

const choose2 = (id) => {
    line2.value = id - num1.value;
    d3.select(dataLineChart.value).selectAll("*").remove();
    drawDataLineChart(props.batchData[0][line1.value], props.batchData[1][line2.value]);
}

const copy1 = () => {
    const temp = JSON.parse(JSON.stringify(props.batchData[0][line1.value]));
    chartStore.setSample(temp);

}

const copy2 = () => {
    const temp = JSON.parse(JSON.stringify(props.batchData[1][line2.value]));
    chartStore.setSample(temp);
}

defineExpose({
    copy1,
    copy2
})


const dataLineChart = ref(null);
const dataLineChartContainer = ref(null);


const drawDataLineChart = (l0, l1) => {
    data0 = JSON.parse(JSON.stringify(l0));
    data1 = JSON.parse(JSON.stringify(l1));
    const parseTime = d3.timeParse('%H:%M');

    // console.log("props.height: ", props.h);
    const w = 550;
    const h = props.h * 0.2;

    const margin = { top: 20, right: 20, bottom: 20, left: 30 };
    const innerWidth = w - margin.left - margin.right;
    const innerHeight = h - margin.top - margin.bottom;
    const stripeHeight = innerHeight / 5;
    const svg = d3.select(dataLineChart.value)
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .attr("id", "mainsvg")
        .attr("class", "svgs");

    const mainGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);





    mainGroup.append("defs").append("marker")
        .attr("id", "arrow")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 0)
        .attr("refY", 0)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5") // 箭头的路径
        .attr("fill", chartAxisColor); // 箭头的颜色


    mainGroup.append("defs").append("pattern")
        .attr("id", "stripes")
        .attr("patternUnits", "userSpaceOnUse")
        .attr("width", innerWidth) // 条纹宽度为整个图表的宽度
        .attr("height", innerHeight) // 条纹高度为整个图表的高度
        .append("rect")
        .attr("width", innerWidth)
        .attr("height", innerHeight)
        .attr("fill", "white");

    mainGroup.select("pattern#stripes")
        .append("rect")
        .attr("width", innerWidth)
        .attr("height", stripeHeight)
        .attr("y", stripeHeight) // 第二道条纹（蓝色）
        .attr("fill", "#F6F8FB");

    mainGroup.select("pattern#stripes")
        .append("rect")
        .attr("width", innerWidth)
        .attr("height", stripeHeight)
        .attr("y", stripeHeight * 3) // 第四道条纹（蓝色）
        .attr("fill", "#F6F8FB");

    mainGroup.append("rect")
        .attr("width", innerWidth)
        .attr("height", innerHeight)
        .attr("fill", "url(#stripes)");

    const xScale = d3.scaleTime();
    const yScale = d3.scaleLinear();


    data0.raw.forEach(d => {
        d.i = +d.i;
        d.t = parseTime(d.t);
    });

    data1.raw.forEach(d => {
        d.i = +d.i;
        d.t = parseTime(d.t);
    });

    // console.log(data0);
    xScale.domain(d3.extent(data1.raw, d => d.t))
        .range([0, innerWidth])
        .nice();
    yScale.domain([0, 15])
        .range([innerHeight, 0])
        .nice();

    const timeFormat = d3.timeFormat("%H:%M");

    const xAxis = d3.axisBottom(xScale)
        .ticks(10)
        .tickFormat(timeFormat)
        .tickSize(0)
        .tickPadding(5);

    const yAxis = d3.axisLeft(yScale)
        .tickSize(0)
        .ticks(5)
        .tickFormat(d => d === 0 ? '' : d)
        .tickPadding(5);

    const xAxisGroup = mainGroup.append("g")
        .call(xAxis)
        .attr("transform", `translate(0, ${innerHeight})`)
        .style("color", chartAxisColor)
    // .selectAll(".tick text")
    // .style("color", "red");

    xAxisGroup.append("path")
        .attr("d", `M${innerWidth},0V0`)
        .attr("marker-end", "url(#arrow)")
        .attr("stroke", chartAxisColor)
        .attr("fill", "none");

    xAxisGroup.selectAll(".tick text")
        .style("color", chartTextColor);

    const yAxisGroup = mainGroup.append("g")
        .call(yAxis)
        .style("color", chartAxisColor)



    yAxisGroup.append("path")
        .attr("d", `M0,${innerHeight}V0`).attr("marker-end", "url(#arrow)");

    yAxisGroup.selectAll(".tick text")
        .style("color", chartTextColor);





    const line = d3.line()
        .x(d => xScale(d.t))
        .y(d => yScale(d.i));

    // console.log(line);

    line.curve(d3.curveLinear);

    const path0 = mainGroup.append("path").datum(data0)
        .attr("fill", "none")
        .attr("d", d => line(d.raw))
        .attr("stroke", color1.value)
        .attr("stroke-width", 1.5)
        .on("mouseover", function (event, d) {
            d3.select(this)
                .attr("stroke", "orange")
                .attr("stroke-width", 3);
            // console.log("d.id: ", d.id);

            chartStore.setHoverId(d.id);
        }).on("mouseout", function (event, d) {
            d3.select(this)
                .attr("stroke", color1.value)
                .attr("stroke-width", 1.5);
            chartStore.setHoverId(-1);
        });

    const path1 = mainGroup.append("path").datum(data1)
        .attr("fill", "none")
        .attr("d", d => line(d.raw))
        .attr("stroke", color2.value)
        .attr("stroke-width", 1.5)
        .on("mouseover", function (event, d) {
            d3.select(this)
                .attr("stroke", "orange")
                .attr("stroke-width", 3);

            chartStore.setHoverId(d.id);

        }).on("mouseout", function (event, d) {
            d3.select(this)
                .attr("stroke", color2.value)
                .attr("stroke-width", 1.5);
            chartStore.setHoverId(-1);
        });

    const legendData = [
        { name: name1.value, color: color1.value },
        { name: name2.value, color: color2.value }
    ];

    const legendX = 300;
    const legendY = -5;
    const legendSpace = 70;

    const legend = mainGroup.selectAll(".legend")
        .data(legendData)
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", (d, i) => `translate(${legendX + i * legendSpace}, ${legendY})`);

    legend.append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 20)
        .attr("y2", 0)
        .attr("stroke", d => d.color)
        .attr("stroke-width", 2);

    legend.append("text")
        .attr("x", 25)
        .attr("y", 0)
        .attr("dy", "0.35em")
        .style("font-size", "12px")
        .text(d => d.name)
        .style("fill", chartTextColor);
}




onMounted(() => {
    if (props.batchData && props.batchData.length > 0) {
        // console.log("onMounted")
        // console.log(props.batchData[0].data[0]);
        num1.value = props.batchData[0].length;
        num2.value = props.batchData[1].length;
        line1.value = 0;
        line2.value = 0;


        drawDataLineChart(props.batchData[0][line1.value], props.batchData[1][line2.value]);

    }

    watchEffect(() => {
        if (chartStore.chooseId >= 0) {
            if (chartStore.chooseId < num1.value) {
                choose1(chartStore.chooseId);
            } else {
                choose2(chartStore.chooseId);
            }
            chartStore.setChooseId(-1);
        }

        if (props.batchData && props.batchData.length > 0) {
            d3.select(dataLineChart.value).selectAll("*").remove();
            num1.value = props.batchData[0].length;
            num2.value = props.batchData[1].length;
            drawDataLineChart(props.batchData[0][line1.value], props.batchData[1][line2.value]);
        }
    })

})
</script>

<style lang="scss" scoped>
.chart-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;

    border-radius: 10px;
    margin: 5px 15px;

    position: relative;

    .options {
        display: flex;
        align-items: center;
        justify-content: center;

        position: absolute;
        top: 2px;
        right: 10px;

        .background {
            position: relative;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            color: #4d4d4d;
            background-color: #fff;
            transition: all 0.3s ease-in-out;

            margin-left: 3px;

            svg {
                position: relative;
                z-index: 1;
                width: 20px;
                height: 20px;
            }

            .filled {
                position: absolute;
                top: auto;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 0;
                background-color: #000;
                transition: all 0.3s ease-in-out;
                background-color: var(--fillColor, #6499AF);
            }
        }

        .background:hover,
        .active-mode {
            box-shadow: 3px 2px 45px 0px rgb(0 0 0 / 12%);
            color: white;

            .filled {
                height: 100%;
            }
        }

    }


    .dataline-header {
        width: 90%;
        height: 20px;
        border-radius: 10px;
        margin-top: 10px;
        background-color: #6499AE;
        padding: 0 10px;

        color: white;
        //    text-align: center;
        font-weight: bold;
        line-height: 20px;
    }


    .chart-option {
        width: 100%;
        // background-color: red;
        // margin-bottom: 10px;
        // padding-bottom: 20px;

        ul {

            list-style: none;

        }

        .chart-option-line {
            display: flex;


            .icon-content {
                margin: 10px 3px;

                .background {
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    color: #4d4d4d;
                    background-color: #fff;
                    transition: all 0.3s ease-in-out;

                    svg {
                        position: relative;
                        z-index: 1;
                        width: 20px;
                        height: 20px;
                    }

                    .filled {
                        position: absolute;
                        top: auto;
                        bottom: 0;
                        left: 0;
                        width: 100%;
                        height: 0;
                        background-color: #000;
                        transition: all 0.3s ease-in-out;
                        // background-color: #0274b3;
                        // background-color: red;
                    }

                    .filled-type1 {
                        background-color: #0274b3;
                    }

                    .filled-type2 {
                        background-color: red;
                    }
                }

                .background:hover,
                .active-mode {
                    box-shadow: 3px 2px 45px 0px rgb(0 0 0 / 12%);
                    color: white;

                    .filled {
                        height: 100%;
                    }
                }
            }
        }
    }
}
</style>