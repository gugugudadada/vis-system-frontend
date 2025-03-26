<template>
    <div class="matrix-body" @wheel="scrollMatrix">
        <div v-if="!showMerged" class="matrix-head">
            实际
        </div>

        <div v-if="!showMerged" class="matrix-head">
            <div v-for="(name, index) in nameConfig">
                {{ name }}
            </div>
        </div>
        <div class="matrix" ref="content">

            <div v-if="!showMerged" class="matrix-column column0">
                预测
            </div>
            <div v-if="!showMerged" class="matrix-column column1">
                <div v-for="(name, index) in nameConfig">
                    {{ name }}
                </div>
            </div>
            <div v-if="mode == 1" class="row-template">
                <div v-for="(row, rowIndex) in props.matrix" class="row">
                    <div v-for="(cell, colIndex) in matrix[rowIndex]" :key="colIndex" class="lattice" :style="{
                        backgroundColor: getBackgroundColor(cell),
                        width: getWidth,
                        height: getHeight,
                    }" @click="chooseLattice(rowIndex, colIndex)">
                        {{ cell }}
                    </div>

                </div>

            </div>
            <div v-if="mode == 2" class="row-template">


                <div v-for="(row, rowIndex) in props.matrixLine" :key="rowIndex" class="row">
                    <div v-for="(cell, colIndex) in props.matrixLine[rowIndex]" :key="colIndex" class="lattice" :class="{
                        'selected': isSelected(rowIndex, colIndex),
                        'unSelected': selectedCells.length > 0 && !isSelected(rowIndex, colIndex)
                    }" @click="toggleSelection(rowIndex, colIndex)" :style="{
                        backgroundColor: getBackgroundColor(matrix[rowIndex][colIndex]),
                        width: getWidth,
                        height: lastTry,
                    }">
                        <cellLine :data="cell" :ref="el => setCellRef(el, rowIndex, colIndex)" :is-merged="false"
                            :w="getWidth" :h="lastTry" />
                    </div>
                </div>

                <div v-if="showMerged" class="merged">
                    <div ref="mergedSvg"></div>
                </div>

            </div>

            <div v-if="mode == 3" class="row-template">
                <div v-for="(row, rowIndex) in props.matrixScatter" :key="rowIndex" class="row">
                    <div v-for="(cell, colIndex) in props.matrixScatter[rowIndex]" :key="colIndex" class="lattice"
                        :class="{
                            'selected': isSelected(rowIndex, colIndex),
                            'unSelected': selectedCells.length > 0 && !isSelected(rowIndex, colIndex)
                        }" @click="toggleSelection(rowIndex, colIndex)" :style="{
                            backgroundColor: getBackgroundColor(matrix[rowIndex][colIndex]),
                            width: getWidth,
                            height: lastTry,
                        }">
                        <cellScatter :data="cell" :dataAll="props.matrixScatterAll" is-merged="false" :w="getWidth"
                            :h="lastTry" />
                    </div>
                </div>

                <div v-if="showMerged" class="merged">
                    <div ref="mergedSvg2"></div>
                </div>

            </div>







            <div v-if="mode == 4" v-for="(row, rowIndex) in props.matrix" :key="rowIndex" class="row">
                <div v-for="(cell, colIndex) in matrix[rowIndex]" :key="colIndex" class="lattice" :style="{
                    backgroundColor: getBackgroundColor(cell),
                    width: getWidth,
                    height: getHeight,
                }">
                    <!-- <cellLine :data="cell" /> -->
                    no Data
                </div>
            </div>
        </div>




        <div class="options">
            <ul class="modes">
                <li class="icon-content">
                    <div class="background" @click="mode1" :class="{ 'active-mode': mode == 1 }">
                        <div class="filled"></div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-1-square" viewBox="0 0 16 16" xml:space="preserve">
                            <path d="M9.283 4.002V12H7.971V5.338h-.065L6.072 6.656V5.385l1.899-1.383z" />
                        </svg>
                    </div>
                    <!-- <div class="tooltip">mode1</div> -->
                </li>

                <li class="icon-content">
                    <div class="background" @click="mode2" :class="{ 'active-mode': mode == 2 }">
                        <div class="filled"></div>
                        <svg t="1740904465901" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="5253" width="200" height="200">
                            <!-- <path d="M912 848H144V144c0-17.6-14.4-32-32-32s-32 14.4-32 32v736c0 17.6 14.4 32 32 32h800c17.6 0 32-14.4 32-32s-14.4-32-32-32z" fill="#333333" p-id="5254"></path> -->
                            <path
                                d="M246.4 636.8L440 443.2l158.4 158.4c6.4 6.4 16 9.6 24 9.6s16-3.2 22.4-9.6l276.8-278.4c11.2-12.8 11.2-32 0-43.2s-32-12.8-43.2 0L624 536 464 376c-8-4.8-16-8-24-8s-16 3.2-22.4 9.6L201.6 592c-12.8 12.8-12.8 32 0 44.8 12.8 12.8 32 12.8 44.8 0z"
                                p-id="5255" fill="currentColor"></path>
                        </svg>

                    </div>
                    <!-- <div class="tooltip">mode1</div> -->
                </li>

                <li class="icon-content">
                    <div class="background" @click="mode3" :class="{ 'active-mode': mode == 3 }">
                        <div class="filled"></div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            viewBox="0 0 16 16">

                            <circle cx="8" cy="6" r="1.5" fill="currentColor" /> <!-- 顶部圆点 -->
                            <circle cx="5" cy="10" r="1.5" fill="currentColor" /> <!-- 左下圆点 -->
                            <circle cx="11" cy="10" r="1.5" fill="currentColor" />
                        </svg>
                    </div>
                    <!-- <div class="tooltip">mode1</div> -->
                </li>

                <li class="icon-content">
                    <div class="background" @click="mode4" :class="{ 'active-mode': mode == 4 }">
                        <div class="filled"></div>
                        <svg t="1740921397933" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="2778" width="200" height="200">
                            <path
                                d="M896 160H128c-17.67 0-32 14.33-32 32v640c0 17.67 14.33 32 32 32h768c17.67 0 32-14.33 32-32V192c0-17.67-14.33-32-32-32z m-32 64v472.01l-227.2-170.4c-16.97-12.72-40.62-12.72-57.59 0l-98.58 73.92L349.2 494.39c-16.47-13.19-39.27-14.19-56.81-2.39L160 581.02V224h704zM160 800V658.16l158.36-106.48 161.02 128.8L608 584l256 192v24H160z"
                                fill="currentColor" p-id="2779"></path>
                            <path
                                d="M704 480c52.94 0 96-43.06 96-96s-43.06-96-96-96-96 43.06-96 96 43.06 96 96 96z m0-128c17.64 0 32 14.36 32 32s-14.36 32-32 32-32-14.36-32-32 14.36-32 32-32z"
                                fill="currentColor" p-id="2780"></path>
                        </svg>
                    </div>
                    <!-- <div class="tooltip">mode1</div> -->
                </li>
            </ul>

            <ul class="modes">
                <li class="icon-content">
                    <div class="background" @click="mergeCharts">
                        <div class="filled"></div>
                        <svg t="1742265983438" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="2653" width="16" height="16">
                            <path
                                d="M892.064 261.888a31.936 31.936 0 0 0-45.216 1.472L421.664 717.248l-220.448-185.216a32 32 0 1 0-41.152 48.992l243.648 204.704a31.872 31.872 0 0 0 20.576 7.488 31.808 31.808 0 0 0 23.36-10.112L893.536 307.136a32 32 0 0 0-1.472-45.248z"
                                p-id="2654" fill="currentColor"></path>
                        </svg>
                    </div>
                    <!-- <div class="tooltip">mode1</div> -->
                </li>

                <li class="icon-content">
                    <div class="background" @click="quitMerge">
                        <div class="filled"></div>
                        <svg t="1742266292910" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="3634" width="16" height="16">
                            <path
                                d="M806.4 263.2l-45.6-45.6L512 467.2 263.2 217.6l-45.6 45.6L467.2 512 217.6 760.8l45.6 45.6L512 557.6l248.8 248.8 45.6-45.6L557.6 512z"
                                p-id="3635" fill="currentColor"></path>
                        </svg>

                    </div>

                </li>
            </ul>
        </div>

    </div>
</template>

<script setup>

import cellLine from "@/components/charts/cellLine.vue";
import cellScatter from "@/components/charts/cellScatter.vue";

import { useTypeStore } from "@/store/type";
import { ref, nextTick, onMounted, computed, watch } from "vue";
import * as d3 from 'd3';
const typeStore = useTypeStore();


import { colorConfig, chartAxisColor, chartTextColor } from '@/conf/color'
import { nameConfig } from '@/conf/name'
const props = defineProps({
    matrix: {
        type: Array,
        required: true,
        validator: (value) => {
            // 确保传入的是一个 5x5 的二维数组
            return value.length === 5 && value.every(row => row.length === 5);
        }
    },
    matrixLine: {
        type: Array,
    },
    matrixScatter: {
        type: Array,
    },
    matrixScatterAll: {
        type: Array,
    }
});


const scrollMatrix = (e) => {
    if (showMerged.value) {
        return
    }

    selectedCells.value = []

    let delta = e.deltaY;

    if (delta > 0) {
        mode.value = mode.value + 1;
        if (mode.value == 5) {
            mode.value = 1;
        }
    } else {
        mode.value = mode.value - 1;
        if (mode.value == 0) {
            mode.value = 4;
        }
    }
}

const lastTry = ref('130px')

// watch content.value.offsetHeight


onMounted(() => {
    // watch(content.value.offsetHeight, (newVal, oldVal) => {
    //     console.log("newVal", newVal);
    //     console.log("oldVal", oldVal);
    //     lastTry.value = `${newVal / 5}px`;
    //     console.log("lastTry", lastTry.value);
    // })

    lastTry.value = `${content.value.offsetHeight / 5}px`;
})

const selectedCells = ref([])
const showMerged = ref(false)
const cellRefs = ref(Array(5).fill().map(() => Array(5).fill(null)))
const mergedSvg = ref(null)
const mergedSvg2 = ref(null)
const mergedGroup = ref(null)
const base = ref(null)
const else1 = ref(null)
const mode = ref(1)


let resizeObserver = null;

const setCellRef = (el, row, col) => {
    cellRefs.value[row][col] = el
}

const isSelected = (row, col) => {
    return selectedCells.value.some(c => c.row === row && c.col === col)
}


const toggleSelection = (row, col) => {
    const index = selectedCells.value.findIndex(c => c.row === row && c.col === col)
    if (index === -1) {
        selectedCells.value.push({ row, col })
    } else {
        selectedCells.value.splice(index, 1)
    }
    // console.log("selectedCells", selectedCells.value);
}

const changeContentHeight = () => {

    const contentHeight = content.value.offsetHeight;
    console.log("contentHeight", contentHeight);
    content.value.style.height = `${contentHeight / 2}px`;

    // console.log("content.value.style.height", content.value.style.height);
    // lastTry.value = `${newVal / 5}px`;
    lastTry.value = `${contentHeight / 10}px`;
}

const mergeLineCharts = async () => {
    const selectedData = selectedCells.value.map(({ row, col }) => ({
        data: props.matrixLine[row][col],
        color: d3.interpolateRainbow(Math.random()),
        legend: `${nameConfig[row]}(${nameConfig[col]})`
    }))

    showMerged.value = true

    changeContentHeight()


    await nextTick();
    // if (!mergedSvg.value) {
    //     console.error("Target DOM element is not found!");
    //     return;
    // }
    drawMergedChart(selectedData);
}

const mergeScatterCharts = async () => {
    // console.log("selectedCells", selectedCells.value);
    const selectedData = selectedCells.value.map(({ row, col }) => ({
        data: props.matrixScatter[row][col],

        color: d3.interpolateRainbow(Math.random()),
        legend: `${nameConfig[row]}(${nameConfig[col]})`
    }))

    showMerged.value = true
    changeContentHeight()


    await nextTick();

    // console.log("selectedData", selectedData);
    drawMergedScatterChart(selectedData);

}



const mergeCharts = async () => {
    if (selectedCells.value.length == 0) {
        return
    }
    if (showMerged.value) {
        return
    }

    if (mode.value == 2) {
        mergeLineCharts()
    } else if (mode.value == 3) {
        mergeScatterCharts()
    }
}

const changeBackContentHeight = () => {
    const contentHeight = content.value.offsetHeight;
    // console.log("contentHeight", contentHeight);
    content.value.style.height = `${contentHeight * 2}px`;
    lastTry.value = `${contentHeight * 2 / 5}px`;
}

const quitMerge = () => {
    if (showMerged.value === false) {
        selectedCells.value = []
        return
    }

    showMerged.value = false
    selectedCells.value = []

    changeBackContentHeight()
    console.log("showMerged", showMerged.value);
}

const drawMergedScatterChart = (data) => {
    // console.log("data", data);
    const w = 620, h = 400
    const margin = { top: 20, right: 150, bottom: 30, left: 40 }

    const width = w - margin.left - margin.right
    const height = h - margin.top - margin.bottom

    const svg = d3.select(mergedSvg2.value)
        .append('svg')
        .attr('width', w)
        .attr('height', h)
        .attr("id", "mainsvg")
        .attr("class", "svgs");

    // console.log("svg", svg);

    const mainGroup = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const allXValues = data.flatMap(item => item.data.map(d => d[0]));
    const allYValues = data.flatMap(item => item.data.map(d => d[1]));

    const xExtent = d3.extent(allXValues); // [minX, maxX]
    const yExtent = d3.extent(allYValues); // [minY, maxY]

    // console.log("xExtent", xExtent);
    // console.log("yExtent", yExtent);

    const xScale = d3.scaleLinear()
        .domain(xExtent)
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain(yExtent)
        .range([height, 0]);

    data.forEach((item, index) => {
        mainGroup.selectAll(`.dataCircle${index}`)
            .data(item.data)
            .enter()
            .append('circle')
            .attr('class', `dataCircle${index}`)
            .attr('cx', d => xScale(d[0]))
            .attr('cy', d => yScale(d[1]))
            .attr('r', 5)
            .attr('fill', item.color);
    });

    const legendX = 500
    const legendY = 20
    const legendSpace = 30

    const legend = mainGroup.selectAll(".legend")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", (d, i) => `translate(${legendX}, ${legendY + i * legendSpace})`);

    legend.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 5)
        .attr("fill", d => d.color);

    legend.append("text")
        .attr("x", 10)
        .attr("y", 0)
        .attr("dy", "0.35em")
        .style("font-size", "12px")
        .text(d => d.legend)
        .style("fill", chartTextColor);
}

const drawMergedChart = (lines) => {
    const w = 620, h = 400
    const margin = { top: 20, right: 30, bottom: 30, left: 40 }

    const width = w - margin.left - margin.right
    const height = h - margin.top - margin.bottom

    const svg = d3.select(mergedSvg.value)
        .append('svg')
        .attr('width', w)
        .attr('height', h)
        .attr("id", "mainsvg")
        .attr("class", "svgs");

    // console.log("svg", svg);

    const mainGroup = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const xLabels = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']

    const xScale = d3.scaleLinear()
        .domain([0, lines[0].data.length - 1])
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain([0, 20])
        .range([height, 0]);

    const xAxis = d3.axisBottom(xScale)
        .ticks(10)
        .tickSize(0)
        .tickFormat((d, i) => 8 + i + ":00")

    const yAxis = d3.axisLeft(yScale)
        .ticks(10)
        .tickSize(0)
        .tickFormat(d => d === 0 ? '' : d)


    const xAxisGroup = mainGroup.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis);

    const yAxisGroup = mainGroup.append('g')
        .call(yAxis);




    const line = d3.line()
        .x((d, i) => xScale(i))
        .y(d => yScale(d))
        .curve(d3.curveMonotoneX);

    lines.forEach(({ data, color }, i) => {
        mainGroup.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', color)
            .attr('stroke-width', 1.5)
            .attr('d', line);
    })

    // console.log("lines", lines);

    const legendX = 490
    const legendY = 20
    const legendSpace = 30

    const legend = mainGroup.selectAll(".legend")
        .data(lines)
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", (d, i) => `translate(${legendX}, ${legendY + i * legendSpace})`);

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
        .text(d => d.legend)
        .style("fill", chartTextColor);
}




const getBorderStyle = (rowIndex, colIndex) => {
    const style = {};
    if (colIndex === 0) {
        style.borderLeft = '1px solid transparent';
    }
    if (rowIndex === 0) {
        style.borderTop = '1px solid transparent';
    }
    style.borderRight = '1px solid transparent';
    style.borderBottom = '1px solid transparent';
    return style;
}

const getBackgroundColor = (cell) => {
    const startColor = { r: 255, g: 255, b: 255 };
    const endColor = { r: 173, g: 216, b: 230 };

    const r = Math.floor(startColor.r - (startColor.r - endColor.r) * cell);
    const g = Math.floor(startColor.g - (startColor.g - endColor.g) * cell);
    const b = Math.floor(startColor.b - (startColor.b - endColor.b) * cell);

    return `rgb(${r}, ${g}, ${b})`;
}
const content = ref(null);
const getWidth = computed(() => {
    // return `30px`;
    if (content.value) {
        const contentWidth = content.value.offsetWidth;
        console.log("contentWidth", contentWidth);
        return `${(contentWidth) / 5}px`;
    }
    return `30px`;
})

const getHeight = computed(() => {

    if (content.value) {
        const contentHeight = content.value.offsetHeight;
        return `${(contentHeight) / 5}px`;
    } else {
        return `30px`;
    }
})

// const getHeight = () => {

//     // console.log("showMerged", showMerged.value);
//     const originValue = showMerged.value===true? `20px` : `40px`;
//     // console.log("originValue", originValue);

//     if (content.value) {
//         const contentHeight = content.value.offsetHeight;
//         // console.log("ret", contentHeight);
//         return `${(contentHeight) / 5}px`;
//     } else {
//         // console.log("originValue", originValue);
//         return originValue;
//     }


//     // const ret = content.value == null? originValue : `${(content.value.offsetHeight) / 5}px`;
//     // console.log("ret", ret);
//     // return ret;
// }

const chooseLattice = (rowIndex, colIndex) => {
    // console.log(`You choose the lattice at (${rowIndex}, ${colIndex})`);

    typeStore.type1 = rowIndex;
    typeStore.type2 = colIndex;
    // console.log("typeStore.type1", typeStore.type1);
    // console.log("typeStore.type2", typeStore.type2);
}



</script>

<style scoped>
:root {
    /* 定义新拟态常用变量 */
    --primary-bg: #e0e0e0;
    --light-shadow: 8px 8px 16px rgba(190, 190, 190, 0.6);
    --dark-shadow: -8px -8px 16px rgba(255, 255, 255, 0.8);
}

.matrix-body {


    width: 100%;
    height: 80vh;

    /* background-color: green; */


    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */

    /* background: linear-gradient(135deg, #f9f9f9, #f9f9f9); */
    padding: 0px;

    color: #787878;

    position: relative;

    .options {


        position: absolute;
        top: 35px;
        right: 10px;

        .modes {
            display: flex;
            flex-direction: column;

            align-items: center;
            /* justify-content: center; */
            margin-left: 10px;
            margin-bottom: 30px;


            .icon-content {
                margin: 2px 0px;
                position: relative;

                .tooltip {
                    position: absolute;
                    top: -30px;
                    left: 50%;
                    transform: translateX(-50%);
                    color: #fff;
                    padding: 4px 7px;
                    border-radius: 5px;
                    opacity: 0;
                    visibility: hidden;
                    font-size: 12px;
                    transition: all 0.3s ease;
                    background-color: #6499AF;
                }

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
                        background-color: #6499AF;
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

            .icon-content:hover {
                .tooltip {
                    opacity: 1;
                    visibility: visible;
                    top: 50px;
                }
            }


        }

        ul {
            list-style: none;
        }
    }




}

.matrix-head {
    width: 85%;
    display: flex;
    justify-content: space-around;

    /* background-color: blue; */
}

.matrix {

    display: flex;
    flex-direction: column;
    align-items: center;
    /* background-color: red; */

    position: relative;
    height: 90%;
    width: 85%;
    transition: height 0.3s ease;
    /* 添加过渡效果 */

    /* .matrix-head {
        width: 100%;
        display: flex;
        justify-content: space-around;
    } */

    .matrix-column {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 100%;

        position: absolute;

        /* background-color: green; */

    }

    .column0 {
        left: -55px;
        top: 0px;
        /* 逆时针旋转90° */
        transform: rotate(-90deg);
    }

    .column1 {
        left: -30px;
        top: 0px;
    }

    /* background-color: red; */

    .row-template {
        /* display: flex; */
        /* width: 96.5%; */


        .row {
            display: flex;

            /* background-color: blue; */


        }


        .merged {

            margin-top: 20px;
            /* height: 50%; */
            background-color: white;

        }
    }
}



.lattice {
    /* height: 140px; */
    /* width: 130px; */
    background: var(--primary-bg);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    color: #787878;
    font-size: 20px;
    /* 新拟态阴影 */
    box-shadow: var(--light-shadow), var(--dark-shadow);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    transition: height 0.3s ease;

    padding: 0;
}

.selected {
    border: 1px solid #6499AF;
    /* box-shadow:  20px 20px 60px #bebebe,
             -20px -20px 60px #ffffff; */
}


.lattice:hover {
    transform: translateY(-5px);
    /* box-shadow: 12px 12px 24px rgba(190, 190, 190, 0.6),
        -12px -12px 24px rgba(255, 255, 255, 0.8); */
}
</style>