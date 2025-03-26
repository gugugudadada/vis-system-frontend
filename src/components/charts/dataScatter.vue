<template>
    <div class="chart-container">
        <!-- <div class="dataline-header">
            header
        </div> -->

        <div class="options">
            <el-select v-model="scatterType" placeholder="投影方法" popper-class="my-popper-class" size="small"
                style="margin-left: 3px;" clearable>
                <el-option v-for="item in scatterTypes" :key="item.id" :label="item.label" :value="item.value"
                    :disabled="item.disabled" />
            </el-select>
        </div>
        <div ref="dataScatterChart" ></div>
    </div>
    
</template>

<script setup>
import * as d3 from 'd3';
import { onMounted, watchEffect, ref, watch, computed } from 'vue';

import { useChartStore } from '@/store/chart';
const chartStore = useChartStore();
import { colorConfig } from '@/conf/color'
import { nameConfig } from '@/conf/name';

import { useTypeStore } from '@/store/type';
const typeStore = useTypeStore();



const scatterTypes = ref([
    {
        label: "PCA",
        value: 0,
    }, {
        label: "temp",
        value: 1,
    }
])

const scatterType = ref(0);


let props = defineProps({
    allData: Array,
    batchData: Array,
    type1: Number,
    type2: Number
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
    if (props.type2!= null) {
        return nameConfig[props.type2]; 
    } else {
        return "type2";
    }
})

const dataScatterChart = ref(null);

const drawDataScatterChart = (allData, batchData) => {


    const w = 550
    const h = 250
    const margin = { top: 10, right: 20, bottom: 10, left: 20 }
    const innerWidth = w - margin.left - margin.right
    const innerHeight = h - margin.top - margin.bottom

    const svg = d3.select(dataScatterChart.value)
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .attr("id", "mainsvg")
        .attr("class", "svgs");

    const mainGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xExtent = d3.extent(allData, d => d.x);
    const yExtent = d3.extent(allData, d => d.y);
    const xMaxAbs = Math.max(Math.abs(xExtent[0]), Math.abs(xExtent[1]));
    const yMaxAbs = Math.max(Math.abs(yExtent[0]), Math.abs(yExtent[1]));

    const xScale = d3.scaleLinear()
       .domain(xExtent)
       .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
        .domain(yExtent)
        .range([innerHeight, 0]);

    const xAxis = d3
    .axisBottom(xScale)
       .tickSize(0)
       .tickFormat("")
       

    const yAxis = d3.axisLeft(yScale)
    .tickSize(0)
    .tickFormat("")

    const allcircles = mainGroup.selectAll(".allcircle")
        .data(allData)
        .join("circle")
        .attr("class", "allcircle")
        .attr("cx", d => xScale(d.x))
        .attr("cy", d => yScale(d.y))
        .attr("r", 1.5)
        .attr("fill", "gray")
       .attr("opacity", 0.5)

    const type2 = batchData[1][0].type;
    const batchcircles1 = mainGroup.selectAll(".batchcircle1")
        .data(batchData[0])
        .join("circle")
        .attr("class", "batchcircle1")
        .attr("cx", d => xScale(d.x))
        .attr("cy", d => yScale(d.y))
        .attr("r", 3)
        .attr("fill", color1.value)
        .attr("opacity", 0.8)
        .attr("stroke", d => {
            return d.predict == type2 ? color2.value : "none";
        })
        .on("mouseover", function (event, d) {

            d3.select(this).attr("r", 6)
                .attr('opacity', 1);
        }).on("mouseout", function (event, d) {
            d3.select(this).attr("r", 3).attr('opacity', 0.9);
        }).on("click", function (event, d) {
            console.log('d: ', d);
            chartStore.setChooseId(d.id);
        });

    batchcircles1.each(function (d, i) {
        if (d.id == chartStore.hoverId) {
            d3.select(this).attr("r", 8);
        } else {
            d3.select(this).attr("r", 3);
        }
    });


    const batchcircles2 = mainGroup.selectAll(".batchcircle2")
        .data(batchData[1])
        .join("circle")
        .attr("class", "batchcircle2")
        .attr("cx", d => xScale(d.x))
        .attr("cy", d => yScale(d.y))
        .attr("r", 3)
        .attr("fill", color2.value)
        .attr("opacity", 0.8)
        // .attr("stroke", "black")
        .on("mouseover", function (event, d) {

            d3.select(this).attr("r", 6)
                .attr('opacity', 1);
        }).on("mouseout", function (event, d) {
            d3.select(this).attr("r", 3).attr('opacity', 0.9);
        }).on("click", function (event, d) {
            console.log('d: ', d);
            chartStore.setChooseId(d.id);
        });

    batchcircles2.each(function (d, i) {
       if (d.id == chartStore.hoverId) {
           d3.select(this).attr("r", 6).attr('opacity', 1);
       } else {
           d3.select(this).attr("r", 3).attr('opacity', 0.9);
       }
    })

    const legendData = [
        { name: name1.value, color: color1.value, strokeColor: "none" },
        { name: name2.value, color: color2.value, strokeColor: "none" },
        { name: name1.value + "(" + name2.value + ")", color: color1.value, strokeColor: color2.value }
    ];

    const legendX = 450;
    const legendY = 30;
    const legendSpace = 20;

    const legend = mainGroup.selectAll(".legend")
       .data(legendData)
       .enter()
       .append("g")
       .attr("class", "legend")
       .attr("transform", (d, i) => `translate(${legendX }, ${legendY+ i * legendSpace})`);

    legend.append("circle")
         .attr("cx", 0)
         .attr("cy", 5)
         .attr("r", 4)
         .style("fill", d => d.color)
        .style("stroke", d => d.strokeColor);

    legend.append("text")
            .attr("x", 10)
            .attr("y", 5)
            .text(d => d.name)
            .style("font-size", "12px")
            .attr("alignment-baseline", "middle");
    

}

onMounted(() => {
    watchEffect(() => {
        if (props.allData && props.allData.length > 0) {
            d3.select(dataScatterChart.value).selectAll("*").remove();

            drawDataScatterChart(props.allData, props.batchData);
        } else {
            d3.select(dataScatterChart.value).selectAll("*").remove();
        }
    })

    watch(scatterType, (newVal) => {
        // console.log('scatterType: ', newVal);
        if (newVal != null) {
            // console.log('scatterType: ', newVal);
            typeStore.setScatterType(newVal);
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
    // box-shadow:  8px 8px 16px #e3e3e3,
    //          -8px -8px 16px #ffffff;
    border-radius: 10px;
    margin: 15px 15px;

    position: relative;

    .options {
        display: flex;
        justify-content: center;
        align-items: center;
        
        position: absolute;
        top: 5px;
        right: 5px;

        .el-select {
            width: 100px;
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
    
}

</style>