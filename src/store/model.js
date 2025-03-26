import { defineStore } from "pinia";
import { ref } from "vue";


export const useModelStore = defineStore("model", () => {
	// 定义状态
	const modelList = ref([]);
	const modelVal = ref();

	const setModelVal = (val) => {
		modelVal.value = val;
	};

	return {
		modelList, modelVal, setModelVal
	};
});