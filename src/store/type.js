import { defineStore } from "pinia";
import { ref } from "vue";
export const useTypeStore = defineStore("type", () => {
    const type1 = ref(null);
    const type2 = ref(null);

    const scatterType = ref(0);

    const setScatterType = (type) => {
        scatterType.value = type; 
    }

    const setType1 = (type) => {
        type1.value = type;
    }
    const setType2 = (type) => {
        type2.value = type;
    }

    return {
        type1, type2, setType1, setType2,
        scatterType, setScatterType
    };
})