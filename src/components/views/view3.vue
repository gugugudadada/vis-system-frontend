<template>
    <div class="container-view3" ref="view3Container">
        <!-- <Slider/> -->
        <div class="option-view">

            
            <!-- 批次大小&nbsp;&nbsp; -->
            <span class="demonstration">批次大小&nbsp;</span>
            <div class="slider">
                
                <el-slider v-model="sliderValue" :min="5" :max="50" :step="5"/>
                <!-- <Slider2/> -->
                <!-- <Slider v-model:value="sliderValue" :min="5" :max="50" :step="1" /> -->
            </div>

            <!-- <div class="slider-value">
                {{ sliderValue }}
            </div> -->

            


            <el-select v-model="type1" placeholder="type1" popper-class="my-popper-class" size="small" clearable>
                <el-option v-for="item in optionType" :key="item.id" :label="item.label" :value="item.value"
                    :disabled="item.disabled" />
            </el-select>

            <!-- <div class="background" @click="copy1">
                <div class="filled filled-type1" :style="{ '--fillColor': fill1 }"></div>
                <svg t="1740921665978" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="3787" width="200" height="200">
                    <path
                        d="M394.666667 106.666667h448a74.666667 74.666667 0 0 1 74.666666 74.666666v448a74.666667 74.666667 0 0 1-74.666666 74.666667H394.666667a74.666667 74.666667 0 0 1-74.666667-74.666667V181.333333a74.666667 74.666667 0 0 1 74.666667-74.666666z m0 64a10.666667 10.666667 0 0 0-10.666667 10.666666v448a10.666667 10.666667 0 0 0 10.666667 10.666667h448a10.666667 10.666667 0 0 0 10.666666-10.666667V181.333333a10.666667 10.666667 0 0 0-10.666666-10.666666H394.666667z m245.333333 597.333333a32 32 0 0 1 64 0v74.666667a74.666667 74.666667 0 0 1-74.666667 74.666666H181.333333a74.666667 74.666667 0 0 1-74.666666-74.666666V394.666667a74.666667 74.666667 0 0 1 74.666666-74.666667h74.666667a32 32 0 0 1 0 64h-74.666667a10.666667 10.666667 0 0 0-10.666666 10.666667v448a10.666667 10.666667 0 0 0 10.666666 10.666666h448a10.666667 10.666667 0 0 0 10.666667-10.666666v-74.666667z"
                        fill="currentColor" p-id="3788"></path>
                </svg>
            </div> -->

            <el-select v-model="type2" placeholder="type2" popper-class="my-popper-class" size="small"
                style="margin-left: 3px;" clearable>
                <el-option v-for="item in optionType" :key="item.id" :label="item.label" :value="item.value"
                    :disabled="item.disabled" />
            </el-select>

            <!-- <div class="background" @click="copy2">
                <div class="filled filled-type2" :style="{ '--fillColor': fill2 }"></div>
                <svg t="1740921665978" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="3787" width="200" height="200">
                    <path
                        d="M394.666667 106.666667h448a74.666667 74.666667 0 0 1 74.666666 74.666666v448a74.666667 74.666667 0 0 1-74.666666 74.666667H394.666667a74.666667 74.666667 0 0 1-74.666667-74.666667V181.333333a74.666667 74.666667 0 0 1 74.666667-74.666666z m0 64a10.666667 10.666667 0 0 0-10.666667 10.666666v448a10.666667 10.666667 0 0 0 10.666667 10.666667h448a10.666667 10.666667 0 0 0 10.666666-10.666667V181.333333a10.666667 10.666667 0 0 0-10.666666-10.666666H394.666667z m245.333333 597.333333a32 32 0 0 1 64 0v74.666667a74.666667 74.666667 0 0 1-74.666667 74.666666H181.333333a74.666667 74.666667 0 0 1-74.666666-74.666666V394.666667a74.666667 74.666667 0 0 1 74.666666-74.666667h74.666667a32 32 0 0 1 0 64h-74.666667a10.666667 10.666667 0 0 0-10.666666 10.666667v448a10.666667 10.666667 0 0 0 10.666666 10.666666h448a10.666667 10.666667 0 0 0 10.666667-10.666666v-74.666667z"
                        fill="currentColor" p-id="3788"></path>
                </svg>
            </div> -->

            <div class="background refresh" @click="refresh">
                <div class="filled filled-type2"></div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-arrow-repeat" viewBox="0 0 16 16">
                    <path
                        d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z">
                    </path>
                    <path fill-rule="evenodd"
                        d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z">
                    </path>
                </svg>
            </div>

        </div>


        <scatterChart :allData="scatterData" :batchData="batchData" :type1="type1" :type2="type2" />
        <lineChart :batchData="batchData" ref="lineChartRef" :type1="type1" :type2="type2" :h="containerHeight" />

    </div>
</template>

<script setup>

import { ref, onMounted, watchEffect, computed, watch } from 'vue';

import scatterChart from '@/components/charts/dataScatter.vue';
import lineChart from '@/components/charts/dataLine.vue';

import { GetModelView3 } from '@/api/model';

import { useModelStore } from '@/store/model';
const modelStore = useModelStore();
import { useTypeStore } from '@/store/type';

const typeStore = useTypeStore();

import { colorConfig } from '@/conf/color'
import Slider from '@/components/gadgets/slider.vue';
import Slider2 from '@/components/gadgets/slider2.vue';
const sliderValue = ref(10);

const view3Container = ref(null);

const fill1 = computed(() => {

    if (type1.value != null) {

        return colorConfig[type1.value];
    }
    return '#6499AF'
})

const fill2 = computed(() => {

    if (type2.value != null) {

        return colorConfig[type2.value];
    }
    return '#6499AF'
})



const lineChartRef = ref(null);

const copy1 = () => {
    if (lineChartRef.value != null) {
        lineChartRef.value.copy1();
    }
}

const copy2 = () => {
    if (lineChartRef.value != null) {
        lineChartRef.value.copy2();
    }
}

const optionType = ref([
    {
        label: '正常',
        value: 0,
    }, {
        label: '两串',
        value: 1,
    }, {
        label: '断路',
        value: 2,
    }, {
        label: '短路',
        value: 3,
    }, {
        label: '热斑',
        value: 4,
    }
])

const type1 = ref(null);
const type2 = ref(null);
const scatterType = ref(0);
const containerHeight = ref(1000);

const inputValue = ref(10);
    const minValue = ref(0);
    const maxValue = ref(20);

const getView3 = () => {
    GetModelView3(modelStore.modelVal, type1.value, type2.value, scatterType.value, sliderValue.value).then(res => {
        // console.log(res.data);

        scatterData.value = res.data.ScatterData;
        let batch1 = res.data.BatchData.Batch1;
        let batch2 = res.data.BatchData.Batch2;
        batch1.forEach((item, index) => {
            item.raw = item.raw.map((i, index) => {
                return {
                    i: i,
                    t: index + 8 + ':00'
                }
            })
        })

        batch2.forEach((item, index) => {
            item.raw = item.raw.map((i, index) => {
                return {
                    i: i,
                    t: index + 8 + ':00'
                }
            })
        })
        batchData.value = [batch1, batch2];

    })
}

const refresh = () => {
    if (type1.value != null && type2.value != null && modelStore.modelVal != null && scatterType.value != null) {
        getView3();
    }
}

onMounted(() => {


    const containerRect = view3Container.value.getBoundingClientRect();
    containerHeight.value = containerRect.height;
    // console.log(containerHeight.value);


    watch([type1, type2], ([newType1, newType2], [oldType1, oldType2]) => {

        if (newType1 != null && newType2 != null && modelStore.modelVal != null) {
            if (newType1 != typeStore.type1 || newType2 != typeStore.type2) {
                //   console.log("change from view3")
                typeStore.setType1(newType1);
                typeStore.setType2(newType2);
                getView3();
            }
        }


    });

    typeStore.$subscribe((mutation, state) => {


        if (state.type1 != type1.value || state.type2 != type2.value || state.scatterType != scatterType.value) {
            // console.log("change from view2")
            type1.value = state.type1;
            type2.value = state.type2;
            scatterType.value = state.scatterType;

            if (modelStore.modelVal != null) {
                getView3();
            }


        }
    });
})

let scatterData = ref([])


const batchData = ref([

    [
        {
            x: 10,
            y: 10,
            id: 0,
            type: 0,
            predict: 1,
            raw: [
                {
                    i: 1,
                    t: '8:00'
                },
                {
                    i: 1,
                    t: '9:00'
                },
                {
                    i: 1,
                    t: '10:00'
                },
                {
                    i: 1,
                    t: '11:00'
                },
                {
                    i: 1,
                    t: '12:00'
                },
                {
                    i: 1,
                    t: '13:00'
                },
                {
                    i: 1,
                    t: '14:00'
                }, {
                    i: 1,
                    t: '15:00'
                }, {
                    i: 1,
                    t: '16:00'
                }, {
                    i: 1,
                    t: '17:00'
                }
            ]
        }, {
            x: 11,
            y: 11,
            id: 1,
            type: 0,
            predict: 0,
            raw: [

                {
                    i: 1.1,
                    t: '8:00'
                },
                {
                    i: 1.1,
                    t: '9:00'
                },// 8:00 - 17:00
                {
                    i: 1.1,
                    t: '10:00'
                },
                {
                    i: 1.1,
                    t: '11:00'
                },
                {
                    i: 1.1,
                    t: '12:00'
                },
                {
                    i: 1.1,
                    t: '13:00'
                },
                {
                    i: 1.1,
                    t: '14:00'
                }, {
                    i: 1.1,
                    t: '15:00'
                }, {
                    i: 1.1,
                    t: '16:00'
                }, {
                    i: 1.1,
                    t: '17:00'
                }
            ]
        }
    ], [
        {
            x: 20,
            y: 20,
            id: 2,
            type: 1,
            predict: 1,
            raw: [
                {
                    i: 2,
                    t: '8:00'
                },
                {
                    i: 2,
                    t: '9:00'
                },
                {
                    i: 2,
                    t: '10:00'
                },
                {
                    i: 2,
                    t: '11:00'
                },
                {
                    i: 2,
                    t: '12:00'
                },
                {
                    i: 2,
                    t: '13:00'
                },
                {
                    i: 2,
                    t: '14:00'
                }, {
                    i: 2,
                    t: '15:00'
                }, {
                    i: 2,
                    t: '16:00'
                }, {
                    i: 2,
                    t: '17:00'
                }
            ]
        }, {
            x: 21,
            y: 21,
            id: 3,
            type: 1,
            predict: 0,

            raw: [
                {
                    i: 2.1,
                    t: '8:00'
                }, {
                    i: 2.1,
                    t: '9:00'
                }, {
                    i: 2.1,
                    t: '10:00'
                }, {
                    i: 2.1,
                    t: '11:00'
                }, {
                    i: 2.1,
                    t: '12:00'
                }, {
                    i: 2.1,
                    t: '13:00'
                }, {
                    i: 2.1,
                    t: '14:00'
                }, {
                    i: 2.1,
                    t: '15:00'
                }, {
                    i: 2.1,
                    t: '16:00'
                }, {
                    i: 2.1,
                    t: '17:00'
                }
            ]
        }
    ]


])

</script>

<style lang="scss" scoped>
.container-view3 {
    width: 100%;
    height: 100%;
    padding: 3px;

    .option-view {
        position: absolute;
        top: 5px;
        right: 5px;
        display: flex;
        align-items: center;
        justify-content: center;

        color: #aaa;

        .el-select {
            width: 80px;
        }

        .slider {
            
            width: 100px;
            // height: 10px;
            margin-right: 20px;
            
        }

        .slider-value {
            margin-left: 25px;
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

        // .refresh svg {
        //     display: inline;
        //     width: 1.3rem;
        //     height: 1.3rem;
        //     margin-right: 0.75rem;
        //     color: red;
        // }

        .refresh:hover svg {
            animation: spin_357 0.5s linear;
        }

        @keyframes spin_357 {
            from {
                transform: rotate(0deg);
            }

            to {
                transform: rotate(360deg);
            }
        }


    }


}


.flex-space-between {
  display: flex;
  justify-content: space-between;
}

.slider-wrapper {
  width: calc(100% - 100px);
}

.snapshot-value {
  width: 80px;
  margin-left: 20px;
}
</style>