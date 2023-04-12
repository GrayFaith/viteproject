<template>
	<div class='test_container'>
		<vxe-button content='带进度条+取消请求的上传组件' status='primary' @click='openProgressFileUpLoadModal'/>
		<vxe-button content='带进度条+取消请求的上传组件(带列表)' status='primary'
					@click='openProgressFileUpLoadListModal'/>
		<ProgressCancelFileUpLoad ref='progressCancelFileUpLoadModalRef'
								  v-bind='progressFileLoadConfig'
								  @beforeUpload='beforeUpload' @afterUpload='afterUpload'/>
		<ProgressCancelFileUpLoadList ref='progressCancelFileUpLoadListModalRef'
									  v-bind='progressFileLoadListConfig'
									  @beforeUpload='beforeUpload' @afterUpload='afterUpload'/>
	</div>
</template>
<script lang='ts' setup>
import { defineAsyncComponent, reactive, ref } from 'vue';
const ProgressCancelFileUpLoad = defineAsyncComponent(
	() => import('../../customComponents/fileUpLoad/modal/ProgressCancelFileUpLoad.vue'));
const progressFileLoadConfig = reactive({
	id            : 'ProgressFileUpLoadModal',
	url           : 'file/upload',
	fileNameFiled : 'fileArray',
	data          : {
		businessId : '10085'
	},
	maxSize       : 1024 * 100
	/**
	 * 1024=1K
	 * 1024 * 10=10K
	 * 1024 * 100=100K
	 * 1024 * 1000=1MB
	 * 1024 * 10000=10MB
	 * 1024 * 100000=100MB
	 * 1024 * 1000000=1000MB
	 */
});
const progressCancelFileUpLoadModalRef = ref<unknown>();
// 打开ProgressFileUpLoad模态框
const openProgressFileUpLoadModal = () => {
	progressCancelFileUpLoadModalRef.value.openModal(
		'500', '700',
		['pdf', 'txt', 'doc', 'docx', 'xls', 'csv', 'ppt', 'zip', 'tar', 'gz', 'rar']
	);
};
// ----------------------------------------------------------------------------------------------------------
const ProgressCancelFileUpLoadList = defineAsyncComponent(
	() => import('../../customComponents/fileUpLoad/modal/ProgressCancelFileUpLoadList.vue'));
const progressFileLoadListConfig = reactive({
	id            : 'ProgressFileUpLoadListModal',
	url           : 'file/upload',
	fileNameFiled : 'fileArray',
	data          : {
		businessId : '10086'
	},
	maxSize       : 1024 * 1000,
	/**
	 * 1024=1K
	 * 1024 * 10=10K
	 * 1024 * 100=100K
	 * 1024 * 1000=1MB
	 * 1024 * 10000=10MB
	 * 1024 * 100000=100MB
	 * 1024 * 1000000=1000MB
	 */
	queryUrl        : 'file/list',
	queryParams     : {
		businessId : '10086'
	},
	removeUrl       : 'file/remove',
	removeFieldName : 'id'
});
const progressCancelFileUpLoadListModalRef = ref<unknown>();
// 打开ProgressFileUpLoadList模态框
const openProgressFileUpLoadListModal = () => {
	progressCancelFileUpLoadListModalRef.value.openModal(
		'500', '700',
		['pdf', 'txt', 'doc', 'docx', 'xls', 'csv', 'ppt', 'zip', 'tar', 'gz', 'rar']
	);
};
// ----------------------------------------------------------------------------------------------------------
const beforeUpload = () => {
	console.log('beforeUpload');
};
const afterUpload = () => {
	console.log('afterUpload');
};
</script>
<style scoped lang='scss'>
.test_container{
	padding    :0;
	margin     :0;
	border     :0;
	box-sizing :border-box;
	height     :100%;
	width      :100%;
}
</style>