<template>
    <div class="model-item">
        <div class="index-model">
            {{ props.data.name }}
        </div>
        <div class="index-data-list">
            <div class="index-data">
                <div class="index-fill fill1" :style="{width: wid1}"></div>
                <div class="index-text"> {{ wid1 }} </div>
            </div>
            <div class="index-data">
                <div class="index-fill fill2" :style="{width: wid2}"></div>
                <div class="index-text"> {{ wid2 }}</div>
            </div>
        </div>

    </div>
</template>

<script setup>


import { onMounted, watchEffect, computed } from 'vue'
import { chartAxisColor, chartTextColor } from '@/conf/color'
const props = defineProps({
    data: Object
})

const wid1 = computed(() => {
    if (props.data != null) {
        // return props.data.training_accuracy * 100 + '%'
        
        return (props.data.training_accuracy * 100).toFixed(1) + '%'
    }
    return '0%'
})

const wid2 = computed(() => {
    if (props.data!= null) {
        return (props.data.validation_accuracy * 100).toFixed(1) + '%'
    }
    return '0%'
})




// onMounted(() => {
//     watchEffect(() => {
//         console.log(props.data)

//     })
// })
</script>

<style lang="scss" scoped>
.model-item {
    display: flex;
    margin-top: 20px;
    margin-left: 10px;

    align-items: center;

    .index-model {
        margin-bottom: 3px;
        height: 12px;

        width: 50px;
        color: gray;
        /* // 逆时针旋转90度 */
        /* // transform: rotate(-90deg);
				// background-color: red; */


    }

    .index-data-list {
        height: 40px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        margin-left: 20px;

        .index-data {
            height: 15px;
            width: 200px;
            background-color: #F0F0F0;
            border: 1px solid gray;

            display: flex;

            .index-fill {
                height: 100%;
                width: 50%;
                border-right: 1px solid gray;
            }

            .fill1 {
                background-color: #fdcdac;
            }

            .fill2 {
                background-color: #b3e2cd;
            }

            .index-text {
               line-height: 15px;
               margin-left: 3px;
               color: #787878;
               font-size: 12px;
            }
        }

    }


}
</style>