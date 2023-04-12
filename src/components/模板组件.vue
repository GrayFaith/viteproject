<template>
	<div class='template_container'>
	</div>
</template>
<script lang='ts' setup>
import {
	ref, reactive,
	// 生命周期
	onBeforeMount, onMounted,
	onBeforeUpdate, onUpdated,
	onBeforeUnmount, onUnmounted,
	onActivated,
	onDeactivated, onErrorCaptured,
	// 计算属性
	computed,
	// 监听属性
	watch
} from 'vue';
// axios
import axios from '@/config/axios';
// 状态管理
import { useStore } from 'vuex';
import { useRoute, useRouter, useLink } from 'vue-router';
// 模态框和打印组件
import '@/config/vxe-table/index.ts';
import VXETable from '@/config/vxe-table/modal.ts';
// 字典组件
import loadDict from '@/config/dictionary/dictionary.ts';
// 接收的参数
const props = defineProps({
	params : {
		type    : [Object],
		require : true,
		default : () => {}
	}
});
// 预置的字典变量
const dict = reactive({});
// 变量
const store = useStore();
const route = useRoute();
const router = useRouter();
const link = useLink();
// 计算属性
const xxx = computed(() => {
	return null;
});
watch(xxx, (newValue, oldValue) => {
	// xxx
}, {
	deep      : true,
	immediate : true
});
onBeforeMount(() => {});
onMounted(() => {
	// 加载字典
	loadDict(['']).then((jsonResult: any) => {
		// 合并字典
		Object.assign(dict, jsonResult);
	});
});
onBeforeUpdate(() => {});
onUpdated(() => {});
onBeforeUnmount(() => {});
onUnmounted(() => {});
onActivated(() => {});
onDeactivated(() => {});
onErrorCaptured(() => {});
// 导出方法
defineExpose({});
</script>
<style scoped lang='scss'>
.template_container{
	padding    :0;
	margin     :0;
	border     :0;
	box-sizing :border-box;
	height     :100%;
	width      :100%;
}
</style>