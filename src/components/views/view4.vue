<template>
    <div class="container-view4">
        
        <div class="option-view">
            <el-select v-model="recordData" placeholder="请选择" popper-class="mySelectStyle" size="small" clearable>
                <el-option v-for="item in recordList" :key="item.id" :label="item.label" :value="item.value"
                    :disabled="item.disabled" />
            </el-select>
        </div>

        
        <lineInteration @save-record="insertRecord"/>
    </div>
</template>

<script setup>
import { ref, watchEffect, onMounted } from 'vue';
import { useChartStore } from '@/store/chart';

const chartStore = useChartStore();

import lineInteration from '@/components/charts/dataLineInteraction.vue';



let recordList = ref([])
let recordData = ref(null)

const insertRecord = (record) => {
    console.log("insertRecord: ", record);
    let recordOption = {
        label: record.label,
        value: record.data
    }
    console.log("recordOption: ", recordOption);
    recordList.value.push(recordOption);
    
}

onMounted(() => {
    watchEffect(() => {
        if (recordData.value !== null) {
            console.log("recordData: ", recordData.value);
            chartStore.setSample(recordData.value);
        }
    })
})
</script>

<style lang="scss" scoped>

.container-view4 {
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

       .el-select {
            width: 150px; 
       }
    }
     
}



</style>