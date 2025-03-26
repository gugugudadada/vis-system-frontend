<template>
    <div class="container-view1">
        <!-- view1 -->


        <!-- 选择数据集: -->
        <div class="option-view">
            <el-select v-model="datasetVal" placeholder="数据集..." popper-class="my-popper-class" size="small" clearable>
                <el-option v-for="item in datasetList" :key="item.id" :label="item.label" :value="item.value"
                    :disabled="item.disabled" />
            </el-select>
        </div>


        <tip1 v-if="!datasetVal" />

        <div v-else>
            <datasetBar :data="datasetMeta" />


            <div style="height: 2px; background-color: #f0f0f0; margin-top: 20px; margin-left: 2px; margin-right: 2px">
            </div>

            <div class="modelMeta">
                <div class="index-name">
                    <div class="index-name1">

                    </div>
                    准确率
                    <div class="index-name2">

                    </div>
                    误报率
                </div>

                <modelMeta v-for="(item, index) in modelMetadata" :data="item" @click="chooseModel(item)"/>
            </div>


            <div style="height: 2px; background-color: #f0f0f0; margin-top: 20px; margin-left: 2px; margin-right: 2px">
            </div>

            <modelPCP :data="modelattr" />
        </div>



    </div>
</template>

<script setup>
import datasetBar from '@/components/charts/datasetBar.vue'
import modelMeta from '@/components/charts/modelIndex.vue'
import modelPCP from '@/components/charts/modelPCP.vue'
import tip1 from '@/components/gadgets/waiting.vue'



import { ref, onMounted } from 'vue'
import { watchEffect } from 'vue'
import { GetDatasetList } from '@/api/dataset'
import { GetModelMeta } from '@/api/model'

// import { useDatasetStore } from '@/store/dataset'
import { useModelStore } from '@/store/model'
// const datasetStore = useDatasetStore()
const modelStore = useModelStore()

// let datasetVal = ref(null)
let datasetVal = ref()
const datasets = ref([])
const datasetList = ref([])
const datasetMeta = ref([])

let modelMetadata = ref([])
let modelattr = ref([])

const chooseModel = (item) => {
    console.log(item)
    modelStore.modelVal = item.ID
}


const fetchData = async () => {
    const dt = await GetDatasetList()
    datasets.value = dt.data
    datasetList.value = dt.data.map(item => ({
        label: item.name,
        value: item.ID
    }))
}


onMounted(() => {
    watchEffect(() => {
        datasetMeta.value = datasets.value.find(item => item.ID === datasetVal.value)

        if (datasetVal.value) {

            GetModelMeta(datasetVal.value).then(res => {

                console.log(res.data)
                modelMetadata.value = res.data

                const test = res.data.map(item => {
                    return {
                        label: item.name,
                        value: item.ID
                    }
                })
                // console.log(test)
                modelStore.modelList = test

                modelattr.value = res.data.map(item => {
                    return {
                        损失: item.attribute_a,
                        训练时间: item.attribute_b,
                        推断时间: item.attribute_c,
                        模型尺寸: item.attribute_d,
                    }
                })

                modelattr.value[0]['损失'] = 0.6
                modelattr.value[0]['训练时间'] = 6.2
                modelattr.value[0]['推断时间'] = 5.5
                modelattr.value[0]['模型尺寸'] = 3.6


            })

        } else {
            modelMetadata.value = []
            modelattr.value = []
        }
    })
    fetchData()
})

</script>

<style scoped>
.container-view1 {
    width: 100%;
    height: 95%;
    padding: 3px;
    padding-left: 5px;
    box-sizing: border-box;

    margin-top: 10px;

    .option-view {
        
        position: absolute;
        top: 5px;
        right: 5px;


        .el-select {

            width: 150px;

        }

    }


    .modelMeta {

        min-height: 280px;

        .index-name {
            display: flex;
            height: 12px;
            margin-top: 10px;
            margin-left: var(--boxLeftPadding, 3px);

            color: #AEAEAE;
            line-height: 12px;

            .index-name1 {
                height: 100%;
                width: 12px;
                background-color: #fdcdac;
                margin-left: 15px;
                margin-right: 5px;
                
            }

            .index-name2 {
                height: 100%;
                width: 12px;
                background-color: #b3e2cd;
                margin-right: 5px;
                margin-left: 20px;
            }


        }
    }






}
</style>