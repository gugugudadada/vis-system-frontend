import { defineStore } from "pinia";
import { ref } from "vue";

export const useDatasetStore = defineStore("dataset", () => {
	// // 定义状态
	// const backendData = ref(null);
	// const loading = ref(false);
	// const error = ref(null);

	const datasetVal = ref();

	// // 定义方法：从后端获取数据
	// const fetchData = async () => {
	// 	loading.value = true;
	// 	error.value = null;
	// 	try {
	// 		const response = await axios.get("https://api.example.com/data"); // 替换为你的后端 API
	// 		backendData.value = response.data;
	// 	} catch (err) {
	// 		error.value = err.message || "Failed to fetch data";
	// 	} finally {
	// 		loading.value = false;
	// 	}
	// };

	// return {
	// 	backendData,
	// 	loading,
	// 	error,
	// 	fetchData,
	// };

	return {
		datasetVal,	
	}
});
