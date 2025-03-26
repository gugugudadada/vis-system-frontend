<template>
    <div class="container-view2">

        <div class="option-view">
            <el-select v-model="modelVal" placeholder="模型..." popper-class="my-popper-class" size="small" clearable>
                <el-option v-for="item in modelList" :key="item.id" :label="item.label" :value="item.value"
                    :disabled="item.disabled" />
            </el-select>

            
        </div>

        <!-- <div class="model-info">
            模型相关信息:

        </div> -->

        <div class="confusion-matrix">

                <!-- <confusion-matrix :matrix="matrix" /> -->

                <cm1 :matrix="matrix" :matrixLine="matrixLine" :matrixScatter="matrixScatter" :matrixScatterAll="matrixScatterAll"/>
                
        </div>
    </div>
</template>

<script setup>

import cm1 from '@/components/charts/CM1.vue';

import { ref, watchEffect, computed, onMounted, watch } from 'vue';

import { GetModelCM } from '@/api/model';

// import { useDatasetStore } from '@/store/dataset';
import { useModelStore } from '@/store/model';
// const datasetStore = useDatasetStore();
const modelStore = useModelStore();

onMounted(() => {


    watch(modelVal, (newVal, oldVal) => {
        if (newVal != null && newVal != modelStore.modelVal) {
            modelStore.setModelVal(newVal);
            GetModelCM(newVal).then((res) => {
                // console.log(res.data);
                matrix.value = res.data.cm_number;
                matrixLine.value = res.data.cm_line;
                matrixScatter.value = res.data.cm_scatter;
                matrixScatterAll.value = res.data.cm_scatter_all;

            })
        }
    })

    modelStore.$subscribe((mutation, state) => {
       if (state.modelVal != null && state.modelVal!= modelVal.value) {
          modelVal.value = state.modelVal;
          GetModelCM(state.modelVal).then((res) => {
              // console.log(res.data);
              matrix.value = res.data.cm_number;
              matrixLine.value = res.data.cm_line;
              matrixScatter.value = res.data.cm_scatter;
              matrixScatterAll.value = res.data.cm_scatter_all;

          }) 
       }
    })


    // watchEffect(() => {
    //     if (modelVal.value && modelVal.value != modelStore.modelVal) {
    //         console.log("change from view2")
    //         modelStore.setModelVal(modelVal.value);
    //         GetModelCM(modelVal.value).then((res) => {
    //             console.log(res.data);
    //             matrix.value = res.data.cm_number;
    //             matrixLine.value = res.data.cm_line;
    //             matrixScatter.value = res.data.cm_scatter;
    //             matrixScatterAll.value = res.data.cm_scatter_all;

    //         })
    //     }

    //     if (modelStore.modelVal && modelVal.value != modelStore.modelVal) {
    //         console.log("change from view1")
    //         modelVal.value = modelStore.modelVal;
    //         GetModelCM(modelVal.value).then((res) => {
    //             // console.log(res.data);
    //             matrix.value = res.data.cm_number;
    //             matrixLine.value = res.data.cm_line;
    //             matrixScatter.value = res.data.cm_scatter;
    //             matrixScatterAll.value = res.data.cm_scatter_all;

    //         })
    //     }

    // })
})

const modelVal = ref(null);
const modelList = computed(() => {
    return modelStore.modelList;
});


let mode = ref(1);

let matrix = ref([
    [0.1, 0.3, 0.2, 0.2, 0.2],
    [0.2, 0.2, 0.2, 0.2, 0.2],
    [0.2, 0.2, 0.2, 0.2, 0.2],
    [0, 0, 0, 1, 0],
    [0.5, 0, 0, 0, 0.5]
]);

let matrixLine = ref([
    [[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[1,2,3,4,5,5,4,3,2,1], [1,2,3,4,5,5,4,3,2,1], [1,2,3,4,5,5,4,3,2,1], [1,2,3,4,5,5,4,3,2,1]],
    [[1,2,3,4,5,5,4,3,2,1],[1,2,3,4,5,5,4,3,2,1], [1,2,3,4,5,5,4,3,2,1], [1,2,3,4,5,5,4,3,2,1], [1,2,3,4,5,5,4,3,2,1]],
    [[1,2,3,4,5,5,4,3,2,1],[1,2,3,4,5,5,4,3,2,1], [1,2,3,4,5,5,4,3,2,1], [1,2,3,4,5,5,4,3,2,1], [1,2,3,4,5,5,4,3,2,1]],
    [[1,2,3,4,5,5,4,3,2,1],[1,2,3,4,5,5,4,3,2,1], [1,2,3,4,5,5,4,3,2,1], [1,2,3,4,5,5,4,3,2,1], [1,2,3,4,5,5,4,3,2,1]],
    [[1,2,3,4,5,5,4,3,2,1],[1,2,3,4,5,5,4,3,2,1], [1,2,3,4,5,5,4,3,2,1], [1,2,3,4,5,5,4,3,2,1], [1,2,3,4,5,5,4,3,2,1]]
]);

let matrixScatter = ref([
    [[[1,1],[2,2]],[[1,1],[2,2]],[[1,1],[2,2]],[[1,1],[2,2]],[[1,1],[2,2]]],
    [[[1,1],[2,2]],[[1,1],[2,2]],[[1,1],[2,2]],[[1,1],[2,2]],[[1,1],[2,2]]],
    [[[1,1],[2,2]],[[1,1],[2,2]],[[1,1],[2,2]],[[1,1],[2,2]],[[1,1],[2,2]]],
    [[[1,1],[2,2]],[[1,1],[2,2]],[[1,1],[2,2]],[[1,1],[2,2]],[[1,1],[2,2]]],
    [[[1,1],[2,2]],[[1,1],[2,2]],[[1,1],[2,2]],[[1,1],[2,2]],[[1,1],[2,2]]]
]);

let matrixScatterAll = ref([])

// const scrollMatrix = (e) => {
//     // console.log("wheel")
//     let delta = e.deltaY;
//     // console.log(delta)

//     if (delta > 0) {
//         mode.value = mode.value + 1;
//         if (mode.value == 5) {
//             mode.value = 1;
//         }
//     } else {
//         mode.value = mode.value - 1;
//         if (mode.value == 0) {
//             mode.value = 4;
//         }
//     }
// }


</script>

<style scoped>
.container-view2 {
    width: 100%;
    height: 100%;
    padding: 3px;

    .option-view {
        position: absolute;
        top: 5px;
        right: 5px;
        

        .el-select {
            width: 150px;
            
        }

        ul {
            list-style: none;
        }


        .mode-list {
            display: flex;
            justify-content: center;
            align-items: center;

            .icon-content {
                margin: 0 2px;
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

                .background:hover, .active-mode {
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
    }

    .model-info {
        margin-top: 30px;
        margin-left: var(--boxLeftPadding, 3px);
        height: 30px;

        display: flex;

        align-items: center;
    }

    .confusion-matrix {

        display: flex;
        justify-content: center;

        margin-top: 30px;

       
    }
}
</style>