<template>
	<vxe-modal :id='id' v-bind='modalConfig' @close='closeModal'>
		<template v-slot:title>
			<a>
				{{ modalConfig['title'] }}
			</a>
		</template>
		<el-scrollbar>
			<div class='modal-container'>
				<Upload ref='upLoadRef' v-bind='upLoadConfig'>
					<SvgIcon icon-class='upload2' height='5rem' width='5rem'/>
					<div class='tip'>
						支持拖拽上传，支持复制粘贴上传，支持取消上传，支持真实进度条
					</div>
				</Upload>
				<List v-bind='listConfig'>
					<template v-slot:header>
						<div class='list-header-slot'>
							<span>
								待上传列表
							</span>
							<span class='tool-group'>
								<vxe-button
									content='清空列表' type='text' status='danger'
									size='mini' @click='emptyList'/>
								<vxe-checkbox
									v-model='mergeUploadCheckBox'
									content='合并上传' size='mini'/>
								<vxe-button
									content='开始上传' type='text' status='primary'
									size='mini' @click='submitUpLoad(props,emits)'/>
							</span>
						</div>
					</template>
					<template v-for='(item,index) in waitForUploadFileList'>
						<ListItem>
							<ListItemMeta :title='item["name"]'>
								<template v-slot:avatar>
									<span class='ivu-avatar ivu-avatar-circle ivu-avatar-default'>
										<SvgIcon icon-class='text' width='32px' height='32px'
												 font-size='2rem'/>
									</span>
								</template>
								<template v-slot:description>
									<Progress v-bind='progressConfig' :percent='item["percent"]'
											  :stroke-color='item["strokeColor"]' :status='item["status"]'/>
									<!--<el-progress v-bind='progressConfig' :percentage='item["percent"]'/>-->
								</template>
							</ListItemMeta>
							<template v-slot:action>
								<li>
									<ClassIcon icon-class='fa fa-close' @click='spliceRow(index)'/>
								</li>
							</template>
						</ListItem>
					</template>
				</List>
				<vxe-grid
					ref='uploadFileGridRef' v-bind='gridConfig'
					@page-change='changePage' @form-submit='queryCondition'>
					<template v-slot:toolbar_buttons>
						<!--<vxe-button
							content='预留' icon='fa fa-plus success' round/>-->
					</template>
					<template v-slot:toolbar_tools>
						<div class='vxe-custom--wrapper'>
							<vxe-button
								circle icon='fa fa-refresh' title='刷新'
								@click='initGridTable(gridConfig["queryParams"])'/>
							<!--<vxe-button
								circle icon='fa fa-download' title='导出Excel'
								@click='exportExcel'/>-->
						</div>
					</template>
					<template v-slot:operate='{ row }'>
						<vxe-button
							icon='fa fa-remove' round title='删除'
							@click='remove(row)'/>
					</template>
				</vxe-grid>
			</div>
		</el-scrollbar>
	</vxe-modal>
</template>
<script lang='ts' setup>
import { ref, reactive, onBeforeMount, onMounted, nextTick } from 'vue';
import '@/config/vxe-table/index.ts';
import VXETable from '@/config/vxe-table/modal.ts';
import axios from '@/config/axios/index.ts';
// 接收的参数
const props = defineProps({
	id : {
		type    : String,
		require : true,
		default : null
	},
	// 上传的URL
	url : {
		type    : String,
		require : true,
		default : null
	},
	// 上传时使用的headers
	headers : {
		type    : Object,
		require : false,
		default : null
	},
	// 上传超时时间
	timeout : {
		type    : Number,
		require : true,
		default : 60000
	},
	// 上传时使用的变量名
	fileNameFiled : {
		type    : String,
		require : true,
		default : null
	},
	// 上传时需要一起提交的表单信息
	data : {
		type    : Object,
		require : false,
		default : null
	},
	// 上传文件的时候检查的格式
	format : {
		type    : Array,
		require : false,
		default : () => []
	},
	// 上传文件的最大大小
	maxSize : {
		type    : Number,
		require : false,
		default : null
	},
	// 查询上传文件列表时使用的url
	queryUrl : {
		type    : String,
		require : false,
		default : null
	},
	// 查询上传文件列表时使用的参数
	queryParams : {
		type    : Object,
		require : false,
		default : null
	},
	// 删除已上传文件时使用的url
	removeUrl : {
		type    : String,
		require : false,
		default : null
	},
	// 删除已上传文件时使用的参数名称
	removeFieldName : {
		type    : String,
		require : false,
		default : null
	}
});
// 回调事件
const emits = defineEmits(['beforeUpload', 'afterUpload']);
// 上传列表
const upLoadRef = ref<unknown>();
// 已上传文件列表
const uploadFileGridRef = ref<unknown>();
onBeforeMount(() => {
	emptyList();
});
onMounted(() => {
});
// 清空待上传列表
const emptyList: Function = () => {
	// 先检查所有的文件,看是存在控制器
	for (const file of waitForUploadFileList) {
		// 如果控制器存在,则它正在上传中,在清空的清空下需要逐一终止请求
		if (file['controller']) {
			file['controller'].abort();
		}
	}
	// 最后将待上传列表清空
	waitForUploadFileList.length = 0;
};
// 删除待上传列表中的一行数据
const spliceRow: Function = (index: number) => {
	// 判断是否存在控制器
	if (waitForUploadFileList[index]['controller']) {
		// 终止请求
		waitForUploadFileList[index]['controller'].abort();
	}
	// 删除待上传列表中的内容
	waitForUploadFileList.splice(index, 1);
};
//---------------------------------------------------模态框类---------------------------------------------------------
const modalConfig = reactive({
	modelValue : false,
	title      : '文件上传',
	width      : '700',
	height     : '500',
	showClose  : true,
	resize     : true
});
// 打开模态框
const openModal: Function = (height: string, width: string, format: Array) => {
	Object.assign(modalConfig, {
		modelValue : true,
		title      : '文件上传',
		width      : width,
		height     : height,
		showClose  : true
	});
	// 转换format为accept
	let accept = '';
	format.forEach((item, index) => {
		if (index !== format.length) {
			accept += `.${item},`;
		} else {
			accept += `.${item}`;
		}
	});
	// 设置好文件类型
	upLoadConfig['accept'] = accept;
	upLoadConfig['format'] = format;
	nextTick(() => {
		initGridTable(gridConfig['queryParams']);
	});
};
// 关闭模态框
const closeModal: Function = () => {
	Object.assign(modalConfig, {
		modelValue : false
	});
	cleanModal();
};
// 清理模态框
const cleanModal: Function = () => {
	Object.assign(waitForUploadFileList, []);
	emptyList();
	mergeUploadCheckBox.value = false;
};
//---------------------------------------------------表格类-----------------------------------------------------------
const gridConfig = reactive({
	loading       : false,
	rowId         : 'id',
	height        : '500',
	align         : 'center',
	pagerConfig   : {
		currentPage : 1,
		pageSize    : 20,
		total       : 0
	},
	toolbarConfig : {
		size : 'small'
	},
	formConfig    : {
		data : {}
	},
	columns       : [
		{
			field        : 'fileName',
			title        : '文件名',
			showOverflow : true
		},
		{
			field        : 'fileSize',
			title        : '文件大小',
			showOverflow : true
		},
		{
			field        : 'uploadTime',
			title        : '上传时间',
			showOverflow : true
		},
		{
			title        : '操作',
			showOverflow : true,
			slots        : {
				// 使用 JSX 渲染
				default : 'operate'
			}
		}
	],
	queryParams   : {},
	data          : []
});
const initGridTable: Function = (searchCondition: any) => {
	gridConfig['loading'] = true;
	uploadFileGridRef.value.clearCurrentRow();
	gridConfig['queryParams'] = {
		...props['queryParams'],
		...searchCondition,
		pageNum  : gridConfig['pagerConfig']['currentPage'],
		pageSize : gridConfig['pagerConfig']['pageSize']
	};
	axios({
		method : 'POST',
		url    : props['queryUrl'],
		data   : gridConfig['queryParams']
	}).then(jsonResult => {
		if (jsonResult['status']) {
			gridConfig['pagerConfig']['total'] = jsonResult['data']['total'];
			gridConfig['data'] = jsonResult['data']['records'];
			gridConfig['loading'] = false;
		} else {
			VXETable.modal.message({ content : jsonResult['msg'], status : 'warning', id : 'failedMessage' });
		}
	}).catch(error => {
		console.error(error);
		VXETable.modal.message({ content : '系统异常,请稍后再试', status : 'error', id : 'errorMessage' });
	});
};
const changePage: Function = () => {};
const queryCondition: Function = () => {};
const remove: Function = (rowData: any) => {
	VXETable.modal.confirm({
		content : '您确定要删除该文件吗?',
		title   : '确认删除',
		id      : 'deleteModalUnique'
	}).then((type: any) => {
		if ('confirm' === type) {
			const data = props['queryParams'];
			data[props['removeFieldName']] = rowData['id'];
			axios({
				method : 'POST',
				url    : props['removeUrl'],
				data   : data
			}).then((jsonResult: any) => {
				if (jsonResult['status']) {
					VXETable.modal.message({
						content : jsonResult['msg'],
						status  : 'success',
						id      : 'successMessage'
					});
				} else {
					VXETable.modal.message({
						content : jsonResult['msg'],
						status  : 'warning',
						id      : 'failedMessage'
					});
				}
				initGridTable(gridConfig['queryParams']);
			}).catch(errorObj => {
				console.error(errorObj);
				VXETable.modal.message({
					content : '系统异常,请稍后再试',
					status  : 'error',
					id      : 'errorMessage'
				});
			});
		}
	});
};
//---------------------------------------------------上传类-----------------------------------------------------------
const listConfig = reactive({
	border     : true,
	itemLayout : 'horizontal',
	size       : 'small'
});
// 进度条的配置
const progressConfig = reactive({
	textInside  : true,
	strokeWidth : 24,
	status      : 'normal'
});
const upLoadConfig = reactive({
	action          : '',
	type            : 'drag',
	paste           : true,
	multiple        : true,
	webkitdirectory : false,
	showUploadList  : true,
	'max-size'      : 1024,
	accept          : '',
	format          : [],
	'before-upload' : (rawFile) => beforeUpload(rawFile)
});
const mergeUploadCheckBox = ref<boolean>(false);
// 待上传列表
const waitForUploadFileList = reactive([]);
// 文件上传部分
const beforeUpload: Function = (rawFile: any): boolean => {
	// 空文件检测
	if (0 >= rawFile['size']) {
		VXETable.modal.message({
			content : `${rawFile['name']} 内容为空`,
			status  : 'warning',
			id      : `fileSizeIsEmptyMessage_${rawFile['name']}`
		});
		return false;
	}
	// 文件大小检测
	if (rawFile['size'] > props['maxSize']) {
		VXETable.modal.message({
			content : `${rawFile['name']} 文件太大`,
			status  : 'warning',
			id      : `fileSizeTooLargeMessage_${rawFile['name']}`
		});
		return false;
	}
	waitForUploadFileList.push({
		name        : rawFile['name'],
		size        : rawFile['size'],
		file        : rawFile,
		percent     : 0,
		status      : 'normal',
		strokeColor : ['#409EFF', '#69EE2B'],
		controller  : null
	});
	// 返回false,就不会自动提交
	return false;
};
const submitUpLoad: Function = (): boolean => {
	// 判断待上传列表是否为空
	if (!waitForUploadFileList.length) {
		VXETable.modal.message({
			content : '请先选择一些文件!',
			status  : 'warning',
			id      : `failedMessage`
		});
		return false;
	}
	emits('beforeUpload');
	// 判断是否开启了合并上传模式
	if (mergeUploadCheckBox.value) {
		mergeUpload();
	} else {
		batchUpload();
	}
};
// 合并上传
const mergeUpload: Function = () => {
	// 合并上传将多个文件打包成一个FormData,然后一次性上传
	Object.assign(progressConfig, { status : 'active' });
	const data = new FormData();
	// 终止控制器,可以用于传输一部分的时候直接终止请求
	const abortController = new AbortController();
	// 添加文件
	for (const file of waitForUploadFileList) {
		Object.assign(file, {
			controller  : abortController,
			strokeColor : ['#409EFF', '#69EE2B'],
			status      : 'active'
		});
		// 将得到的文件流添加到FormData对象
		data.append(props.fileNameFiled, file['file'], file['name']);
	}
	// 添加用户自定义表单属性
	for (const dataKey in props.data) {
		if (Object.prototype.hasOwnProperty.call(props.data, dataKey)) {
			data.append(dataKey, props.data[dataKey]);
		}
	}
	axios({
		timeout : props.timeout,
		method  : 'POST',
		url     : props.url,
		headers : { ...props.headers, 'Content-Type' : 'multipart/form-data' },
		data    : data,
		signal  : abortController.signal,
		// 使用axios自带的进度条事件
		onUploadProgress : (progressEvent) => {
			// 多文件合并进度条和单文件进度条的写法不同
			// 多文件合并在一起上传只会有总进度条,所以下列把多个文件的进度条统一设置
			if (0 < progressEvent.total) {
				for (const file of waitForUploadFileList) {
					if (Object.prototype.hasOwnProperty.call(file, 'percent')) {
						// 进度条算法
						file['percent'] = Math.round(parseFloat(progressEvent['progress']) * 100);
					}
				}
			}
		}
	}).then(jsonResult => {
		if (jsonResult['status']) {
			// 成功提交时,清除待上传列表
			// 因为是把所有文件合并在一起上传的,所以一旦上传成功,那么就是全部成功
			// 所以清理全部列表是没有毛病的
			emptyList();
			// 调用父组件的回调方法
			emits('afterUpload');
		} else {
			VXETable.modal.message({
				content : jsonResult['msg'],
				status  : 'warning',
				id      : `failedMessage`
			});
		}
	}).catch(error => {
		for (const file of waitForUploadFileList) {
			Object.assign(file, {
				controller  : abortController,
				strokeColor : ['#FF8467', '#ED4014'],
				status      : 'wrong'
			});
		}
		console.error(error);
		if ('canceled' === error.message) {
			VXETable.modal.message({
				content : '请求已取消',
				status  : 'warning',
				id      : 'errorMessage'
			});
		} else {
			VXETable.modal.message({
				content : '系统异常,请稍后再试',
				status  : 'error',
				id      : 'errorMessage'
			});
		}
		/*emptyList();*/
	});
};
// 批量上传
const batchUpload: Function = () => {
	for (let i = 0; i < waitForUploadFileList.length; i++) {
		const file = waitForUploadFileList[i];
		// 将得到的文件流添加到FormData对象
		const data = new FormData();
		data.append(props.fileNameFiled, file['file'], file['name']);
		// 添加用户自定义表单属性
		for (const dataKey in props.data) {
			if (Object.prototype.hasOwnProperty.call(props.data, dataKey)) {
				data.append(dataKey, props.data[dataKey]);
			}
		}
		Object.assign(file, {
			controller  : new AbortController(),
			strokeColor : ['#409EFF', '#69EE2B'],
			status      : 'active'
		});
		axios({
			timeout : props.timeout,
			method  : 'POST',
			url     : props.url,
			headers : { ...props.headers, 'Content-Type' : 'multipart/form-data' },
			data    : data,
			signal  : file['controller'].signal,
			// 使用axios自带的进度条事件
			onUploadProgress : (progressEvent) => {
				// 多文件合并进度条和单文件进度条的写法不同
				// 多文件合并在一起上传只会有总进度条,所以下列把多个文件的进度条统一设置
				if (0 < progressEvent.total) {
					if (Object.prototype.hasOwnProperty.call(file, 'percent')) {
						// 进度条算法
						file['percent'] = Math.round(parseFloat(progressEvent['progress']) * 100);
					}
				}
			}
		}).then(jsonResult => {
			if (jsonResult['status']) {
				Object.assign(file, {
					status : 'success'
				});
				// 成功提交时,清除已上传完毕的
				waitForUploadFileList.splice(i, 1);
				// 调用父组件的回调方法
				emits('afterUpload');
			} else {
				Object.assign(file, {
					status      : 'wrong',
					strokeColor : ['#FF8467', '#ED4014']
				});
				VXETable.modal.message({
					content : jsonResult['msg'],
					status  : 'warning',
					id      : `failedMessage`
				});
			}
		}).catch(error => {
			Object.assign(file, {
				status      : 'wrong',
				strokeColor : ['#FF8467', '#ED4014']
			});
			console.error(error);
			if ('canceled' === error.message) {
				VXETable.modal.message({
					content : '请求已取消',
					status  : 'warning',
					id      : 'errorMessage'
				});
			} else {
				VXETable.modal.message({
					content : '系统异常,请稍后再试',
					status  : 'error',
					id      : 'errorMessage'
				});
			}
			// emptyList();
		});
	}
};
// 导出方法
defineExpose({ openModal });
</script>
<style scoped lang='scss'>
.modal-container{
	padding    :0;
	margin     :0;
	border     :0;
	box-sizing :border-box;
	height     :100%;
	width      :100%;
	.tip{
		padding         :0;
		margin          :0;
		border          :0;
		box-sizing      :border-box;
		height          :100%;
		width           :100%;
		display         :flex;
		flex-direction  :row;
		flex-wrap       :nowrap;
		align-content   :center;
		justify-content :center;
		align-items     :center;
	}
	.list-header-slot{
		padding         :0;
		margin          :0;
		border          :0;
		box-sizing      :border-box;
		height          :100%;
		width           :100%;
		display         :flex;
		flex-direction  :row;
		flex-wrap       :nowrap;
		align-content   :center;
		justify-content :space-between;
		align-items     :center;
		.tool-group{
			padding         :0;
			margin          :0;
			border          :0;
			box-sizing      :border-box;
			height          :100%;
			display         :flex;
			flex-direction  :row;
			flex-wrap       :nowrap;
			align-content   :center;
			justify-content :center;
			align-items     :center;
		}
	}
}
:deep( .vxe-button + .vxe-button, ){
	margin-left :0;
}
:deep(.el-scrollbar){
	overflow :hidden;
	position :relative;
	height   :auto;
}
</style>