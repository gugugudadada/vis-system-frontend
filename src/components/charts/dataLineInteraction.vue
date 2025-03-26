<template>
    <div class="chart-container">
        <div ref="dataLineChart"></div>

        <div class="options">
            <button @click="validateData" class="button">
                <svg height="16" width="16" fill="#787878" viewBox="0 0 24 24" data-name="Layer 1" id="Layer_1"
                    class="sparkle">
                    <path
                        d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z">
                    </path>
                </svg>


                validate
            </button>



            <button @click="openModal" class="button">
                <svg t="1741019186414" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="2627" width="16" height="16" fill="#787878">
                    <path
                        d="M204.8 102.4H153.6a51.2 51.2 0 0 0-51.2 51.2v716.8a51.2 51.2 0 0 0 51.2 51.2h51.2v-307.2a102.4 102.4 0 0 1 102.4-102.4h409.6a102.4 102.4 0 0 1 102.4 102.4v307.2h51.2a51.2 51.2 0 0 0 51.2-51.2V400.7936a51.2 51.2 0 0 0-15.0016-36.1984L659.456 117.4016A51.2 51.2 0 0 0 623.2064 102.4H256v153.6a76.8 76.8 0 0 0 76.8 76.8h307.2a25.6 25.6 0 1 1 0 51.2h-307.2A128 128 0 0 1 204.8 256V102.4z m418.4064-51.2a102.4 102.4 0 0 1 72.3968 30.0032l247.1936 247.1936A102.4 102.4 0 0 1 972.8 400.7936V870.4a102.4 102.4 0 0 1-102.4 102.4H153.6a102.4 102.4 0 0 1-102.4-102.4V153.6a102.4 102.4 0 0 1 102.4-102.4h469.6064zM256 921.6h512v-307.2a51.2 51.2 0 0 0-51.2-51.2H307.2a51.2 51.2 0 0 0-51.2 51.2v307.2z"
                        p-id="2628"></path>
                </svg>
                save
            </button>

            <div class="modal fade" :class="{ show: isModalVisible, 'd-block': isModalVisible }" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">新建测试样本</h5>
            
          </div>
          <div class="modal-body">
            
            <input v-model="inputText" class="form-control" placeholder="请输入样本名字" />
            
            <div v-if="showError" class="text-danger mt-2">输入内容不能为空！</div>
          </div>
          <div class="modal-footer">
            
            <button type="button" class="btn btn-primary" @click="handleConfirm">确认</button>
            
            <button type="button" class="btn btn-secondary" @click="closeModal">取消</button>
          </div>
        </div>
      </div>
    </div>
            <div
      v-if="isModalVisible"
      class="modal-backdrop fade show"
      @click="closeModal"
    ></div>



        </div>

    </div>


    <div v-if="resultData" class="result-container">

        <div class="result-text">模型预测结果:

            <span v-if="resultData.data.PredictionResult == 0">正常</span>
            <span v-else-if="resultData.data.PredictionResult == 1">单口接两串</span>
            <span v-else-if="resultData.data.PredictionResult == 2">断路</span>
            <span v-else-if="resultData.data.PredictionResult == 3">短路</span>
            <span v-else-if="resultData.data.PredictionResult == 4">热斑</span>
        </div>

        <div class="result-detail">
            <div class="detail-item">

                <div class="item-value">
                    <waterBall :data="resultData.data.PredictionArray[0]" />
                </div>
                <div class="item-name">
                    正常
                </div>

            </div>
            <div class="detail-item">

                <div class="item-value">
                    <waterBall :data="resultData.data.PredictionArray[1]" />
                </div>
                <div class="item-name">
                    单口接两串
                </div>

            </div>
            <div class="detail-item">
                <div class="item-value">
                    <waterBall :data="resultData.data.PredictionArray[2]" />
                </div>
                <div class="item-name">
                    断路
                </div>

            </div>
            <div class="detail-item">
                <div class="item-value">
                    <waterBall :data="resultData.data.PredictionArray[3]" />
                </div>
                <div class="item-name">
                    短路
                </div>

            </div>
            <div class="detail-item">
                <div class="item-value">
                    <waterBall :data="resultData.data.PredictionArray[4]" />
                </div>
                <div class="item-name">
                    热斑
                </div>

            </div>
        </div>
    </div>

</template>

<script setup>
import * as d3 from 'd3';
import generateButton from '@/components/gadgets/generate.vue';

import { onMounted, watchEffect, ref, watch, defineEmits } from 'vue';

import { GetValidationResult } from '@/api/model';

import { useChartStore } from '@/store/chart';
import { useModelStore } from '@/store/model';
import waterBall from '@/components/gadgets/waterBall.vue';

const chartStore = useChartStore();
const modelStore = useModelStore();

const emit = defineEmits(['save-record']);

let props = defineProps({
    data: Array
})

const dataLineChart = ref(null);

let data = null;
let validate = false;
let resultData = ref({ data: { PredictionResult: 0, PredictionArray: [0.2, 0.5, 0.5, 0.5, 0.5] } });
let PredictionArray = ref([0.33, 0.5, 0.5, 0.5, 0.5]);

const validateData = () => {
    if (!validate) {

        // console.log("data: ", data.raw);
        let sample = data.raw.map(d => d.i);
        // sample = sample.join(',');
        // 转换为字符串 并去除开始的回车符
        sample = sample.join(',');


        GetValidationResult(modelStore.modelVal, sample).then(res => {

            resultData.value = res;

            validate = true;
        })


    }
}

const isModalVisible = ref(false);
const inputText = ref('');
const showError = ref(false);
const openModal = () => {
      isModalVisible.value = true;
      inputText.value = ''; // 清空输入框
      showError.value = false; // 隐藏错误提示
    };

    const closeModal = () => {
      isModalVisible.value = false;
      showError.value = false;
    };

    
    const handleConfirm = () => {
      if (inputText.value.trim() === '') {
        
        showError.value = true;
      } else {
        
        callSpecificFunction(inputText.value);
        closeModal();
      }
    };

    
    const callSpecificFunction = (name) => {

      if (validate) {
        const sampleData = chartStore.sample;
        let record = {
          data: sampleData,
          model: modelStore.modelVal,
          result: resultData.value,
          label: name
        }
        emit('save-record', record);
      }
    };


const drawDataLineChart = (l) => {



    data = JSON.parse(JSON.stringify(l));


    const parseTime = d3.timeParse('%H:%M');

    const w = 550;
    const h = 135;
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
        .attr("id", "arrow2")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 0)
        .attr("refY", 0)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5") // 箭头的路径
        .attr("fill", "#AEAEAE"); // 箭头的颜色

    mainGroup.append("defs").append("pattern")
        .attr("id", "stripes2")
        .attr("patternUnits", "userSpaceOnUse")
        .attr("width", innerWidth) // 条纹宽度为整个图表的宽度
        .attr("height", innerHeight) // 条纹高度为整个图表的高度
        .append("rect")
        .attr("width", innerWidth)
        .attr("height", innerHeight)
        .attr("fill", "white");

    mainGroup.select("pattern#stripes2")
        .append("rect")
        .attr("width", innerWidth)
        .attr("height", stripeHeight)
        .attr("y", stripeHeight) // 第二道条纹（蓝色）
        .attr("fill", "#F6F8FB");

    mainGroup.select("pattern#stripes2")
        .append("rect")
        .attr("width", innerWidth)
        .attr("height", stripeHeight)
        .attr("y", stripeHeight * 3) // 第四道条纹（蓝色）
        .attr("fill", "#F6F8FB");

    mainGroup.append("rect")
        .attr("width", innerWidth)
        .attr("height", innerHeight)
        .attr("fill", "url(#stripes2)");

    const xScale = d3.scaleTime();
    const yScale = d3.scaleLinear();

    data.raw.forEach(d => {
        d.i = +d.i;
        d.t = parseTime(d.t);
    });
    // console.log(data);
    xScale.domain(d3.extent(data.raw, d => d.t))
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
        .ticks(5)
        .tickSize(0)
        .tickPadding(5)
        .tickFormat(d => d === 0 ? "" : d);

    const xAxisGroup = mainGroup.append("g")
        .call(xAxis)
        .attr("transform", `translate(0, ${innerHeight})`)
        .style("color", "#AEAEAE");

    xAxisGroup.append("path")
        .attr("d", `M${innerWidth},0V0`)
        .attr("marker-end", "url(#arrow2)")
        .attr("stroke", "#AEAEAE")
        .attr("fill", "none");

    xAxisGroup.selectAll(".tick text")
        .style("color", "#787878");

    const yAxisGroup = mainGroup.append("g")
        .call(yAxis)
        .style("color", "#AEAEAE");

    yAxisGroup.append("path")
        .attr("d", `M0,${innerHeight}V0`).attr("marker-end", "url(#arrow)");

    yAxisGroup.selectAll(".tick text")
        .style("color", "#787878");

    const line = d3.line()
        .x(d => xScale(d.t))
        .y(d => yScale(d.i));

    line.curve(d3.curveLinear);

    const path = mainGroup.append("path").datum(data)
        .attr("fill", "none")
        .attr("d", d => line(d.raw))
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5);

    // console.log("raw", data.raw);

    const circles = mainGroup.selectAll("circle")
        .data(data.raw).enter().append("circle")
        .attr("cx", d => xScale(d.t))
        .attr("cy", d => yScale(d.i))
        .attr("r", 5)
        .attr("fill", "steelblue")
        .attr("stroke", "white")
        .attr("stroke-width", 1)
        .call(d3.drag()
            .on("start", function (event, d) {
                // d3.select(this).attr("fill", "orange");
            })
            .on("drag", function (event, d) {

                const yDomain = yScale.domain();
                const yMin = yDomain[0], yMax = yDomain[1];
                let newY = yScale.invert(event.y);
                newY = Math.max(yMin, Math.min(yMax, newY));

                d.i = newY;


                d3.select(this)
                    .attr("cy", yScale(newY));

                path.attr("d", d => line(d.raw));
                console.log("Updated data:", data.raw);
            })
            .on("end", function (event, d) {
                validate = false;
                console.log("validate = false");
                resultData.value = null;

                for (let i = 0; i < data.raw.length; i++) {
                    chartStore.sample.raw[i].i = data.raw[i].i;
                }
            })
        )

    circles.on("mouseover", function (event, d) {
        d3.select(this)
            .attr("fill", "red")
            .attr("r", 8);


    }).on("mouseout", function () {
        d3.select(this)
            .attr("fill", "steelblue")
            .attr("r", 5);
        // chartStore.setSample(data);

    });
}



onMounted(() => {
    watch(() => chartStore.sample, (newValue) => {

        // resultData.value = null;


        validate = false;
        if (newValue !== null) {
            d3.select(dataLineChart.value).selectAll("*").remove();
            drawDataLineChart(newValue);
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
    // margin-top: 20px;
    // background-color: white;
    // box-shadow: 8px 8px 16px #e3e3e3,
    //     -8px -8px 16px #ffffff;
    // border-radius: 10px;
    margin: -10px 15px 0px 15px;
    // width: 100%;

    // background-color: red;

    .options {
        display: flex;
        align-items: center;
        justify-content: space-around;

        .button {
            width: 80px;
            height: 32px;
            color: #787878;
            border: 1px solid #6499AF;
            border-radius: 45px;
            transition: all 0.3s;
            cursor: pointer;
            background: white;
            font-size: 1em;
            // font-weight: bold;
            margin: 0 50px;

            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 7px;

            svg {
                margin-right: 5px;
            }
        }

        .button:hover {
            background: #6499AF;
            color: white;
            // font-size: 1.1em;
        }

        .button:hover svg {
            fill: white;
        }
    }
}

.result-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #787878;

    // background-color: red;
    margin-top: 20px;

    .result-text {
        display: flex;
        align-items: center;
        justify-content: center;

        .icon {
            position: relative;
            background: #fff;
            border-radius: 50%;
            margin: 10px;
            width: 30px;
            height: 30px;
            font-size: 18px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
            cursor: pointer;
            transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

    }


    .result-detail {
        display: flex;

        // margin-top: -20px;

        .detail-item {
            margin: 5px 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .item-name {
                margin-top: -5px;
            }
        }
    }
}
</style>