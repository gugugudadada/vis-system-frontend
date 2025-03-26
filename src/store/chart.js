import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useChartStore = defineStore('chart', () => {
    const hoverId = ref(-1)
    const chooseId = ref(-1)

    const sample = ref(null)

    const saveList = ref([])

    const setHoverId = (id) => {
        hoverId.value = id
        // console.log(hoverId.value)
    }

    const setChooseId = (id) => {
        chooseId.value = id
        // console.log(chooseId.value) 
    }

    const setSample = (data) => {
        sample.value = data
        
    }


    return { hoverId, setHoverId, chooseId, setChooseId, sample, setSample }

})