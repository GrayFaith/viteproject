<template>
	<div class='userMaintain_container'>
		<div class='userMaintain_container_left'>
			<el-tree
				ref='treeRef' v-bind='leftTree'
				:load='initLeftTree'
				@node-click='nodeClick'/>
		</div>
		<div class='userMaintain_container_right'>
			<vxe-grid
				ref='userMaintainGridRef' v-bind='tableConfig'
				@page-change='changePage' @form-submit='queryCondition'>
				<template v-slot:toolbar_buttons>
					<vxe-button
						content='新增' icon='fa fa-plus success' round
						@click='showAddModal'/>
				</template>
				<template v-slot:toolbar_tools>
					<div class='vxe-custom--wrapper'>
						<vxe-button
							circle icon='fa fa-refresh' title='刷新'
							@click='initRightTable(tableConfig["queryParams"])'/>
						<!--<vxe-button
							circle icon='fa fa-download' title='导出Excel'
							@click='exportExcel'/>-->
					</div>
				</template>
				<template v-slot:userStatus='{ row }'>
					<vxe-switch
						:modelValue='row["status"]' open-label='启用' :open-value='"1"'
						close-label='禁用' :close-value='"0"' @change='toggleStatus(row["status"])'/>
				</template>
				<template v-slot:operate='{ row }'>
					<vxe-button
						icon='fa fa-edit' round title='编辑'
						@click='showEditModal(row)'/>
					<vxe-button
						icon='fa fa-remove' round title='删除'
						@click='remove(row)'/>
				</template>
			</vxe-grid>
		</div>
		<addModal ref='addModalRef' :belong-dept='currentSelectedDept'
				  @init-table='initRightTable(tableConfig["queryParams"])'/>
		<editModal ref='editModalRef' :belong-dept='currentSelectedDept'
				   @init-table='initRightTable(tableConfig["queryParams"])'/>
		<!--<export-excel
			:id='"userMaintainExportExcel"' ref='exportExcel'
			:columns='columns'
			:pager-config='tableConfig["pagerConfig"]'
			:query-condition='tableConfig["formConfig"]["data"]' :query-id='"selectUserListByCommonPage"'/>-->
	</div>
</template>
<script lang='ts' setup>
import { ref, reactive, onMounted, watch, defineAsyncComponent } from 'vue';
import axios from '@/config/axios';
import { useStore } from 'vuex';
import '@/config/vxe-table/index.ts';
import VXETable from '@/config/vxe-table/modal.ts';
import { showDictValueByKey } from '@/static/js/dict/format.js';
import loadDict from '@/config/dictionary/dictionary.ts';
const store = useStore();
const dict = reactive({});
const leftTree = reactive({
	data    : [],
	props   : {
		label    : 'label',
		children : 'children',
		disabled : 'disabled',
		isLeaf   : 'isLeaf'
	},
	nodeKey : 'id',
	/*defaultExpandedKeys : ['0000000000'],*/
	expandOnClickNode   : false,
	highlightCurrent    : true,
	checkOnClickNode    : true,
	accordion           : true,
	lazy                : true,
	currentClickNodeKey : null
});
const tableConfig = reactive({
	loading        : false,
	rowId          : 'id',
	height         : 'auto',
	align          : 'center',
	keyboardConfig : { isArrow : true },
	pagerConfig    : {
		currentPage : 1,
		pageSize    : 20,
		total       : 0
	},
	toolbarConfig  : {
		/*export : {
		 icon : 'fa fa-download'
		 },*/
		print  : {
			icon : 'fa fa-print'
		},
		custom : {
			icon : 'fa fa-cog'
		}
	},
	formConfig     : {
		data : {
			id           : '',
			userName     : '',
			nickName     : '',
			phone        : '',
			eMail        : '',
			idCard       : '',
			address      : '',
			belongDept   : '',
			status       : '',
			roleList     : [],
			textRoleList : '',
			remark       : ''
		}
	},
	columns        : [
		{
			field        : 'userName',
			title        : '用户名',
			showOverflow : true
		},
		{
			field        : 'nickName',
			title        : '员工姓名',
			showOverflow : true
		},
		{
			field        : 'phone',
			title        : '手机号',
			showOverflow : true
		},
		{
			field        : 'belongDept',
			title        : '归属部门',
			showOverflow : true,
			formatter    : (cell: unknown) => {
				return showDictValueByKey(dict['shortDept'], cell['cellValue']);
			}
		},
		{
			field        : 'status',
			title        : '账号状态',
			showOverflow : true,
			formatter    : (cell: unknown) => {
				return showDictValueByKey(dict['userStatus'], cell['cellValue']);
			},
			slots        : {
				// 使用 JSX 渲染
				default : 'userStatus'
			}
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
	queryParams    : {},
	data           : []
});
const currentSelectedDept = ref('');
// 新增模态框组件引入
const addModal = defineAsyncComponent(() => import('./addModal.vue'));
// 编辑模态框组件引入
const editModal = defineAsyncComponent(() => import('./editModal.vue'));
// 树引用
const treeRef = ref<unknown>();
// 右侧表格引用
const userMaintainGridRef = ref();
// 新增模态框引用
const addModalRef = ref<unknown>();
// 编辑模态框引用
const editModalRef = ref<unknown>();
onMounted(() => {
	// 加载字典
	loadDict(['shortDept', 'userStatus']).then((jsonResult: unknown) => {
		// 合并字典
		Object.assign(dict, jsonResult);
		initRightTable(tableConfig['queryParams']);
	});
});
const initLeftTree = (node: unknown, resolve: unknown) => {
	let url;
	if (node['key']) {
		url = `/department/list/${node['key']}`;
	} else {
		url = `/department/list`;
	}
	axios({
		method : 'POST',
		url    : url
	}).then((jsonResult: unknown) => {
		if (jsonResult['status']) {
			resolve(jsonResult['data']);
		} else {
			VXETable.modal.message({
				content : jsonResult['msg'],
				status  : 'warning',
				id      : 'failedMessage'
			});
		}
	}).catch((error: unknown) => {
		console.error(error);
		VXETable.modal.message({
			content : '系统异常,请稍后再试',
			status  : 'error',
			id      : 'errorMessage'
		});
	});
};
const nodeClick = (currentNode: unknown, nodeProps: unknown, treeNode: unknown, $event: unknown) => {
	leftTree['currentClickNodeKey'] = currentNode['id'];
	currentSelectedDept.value = currentNode['id'];
	tableConfig['queryParams']['deptId'] = currentNode['id'];
	initRightTable(tableConfig['queryParams']);
};
const initRightTable = (queryParams: unknown) => {
	tableConfig['loading'] = true;
	userMaintainGridRef.value.clearCurrentRow();
	tableConfig['queryParams'] = {
		...queryParams,
		pageNum  : tableConfig['pagerConfig']['currentPage'],
		pageSize : tableConfig['pagerConfig']['pageSize']
	};
	axios({
		method : 'POST',
		url    : '/user/list',
		data   : tableConfig['queryParams']
	}).then((jsonResult: unknown) => {
		if (jsonResult['status']) {
			tableConfig['pagerConfig']['total'] = jsonResult['data']['total'];
			tableConfig['data'] = jsonResult['data']['records'];
			tableConfig['loading'] = false;
		} else {
			VXETable.modal.message({
				content : jsonResult['msg'],
				status  : 'warning',
				id      : 'failedMessage'
			});
		}
	}).catch((error: unknown) => {
		console.error(error);
		VXETable.modal.message({
			content : '系统异常,请稍后再试',
			status  : 'error',
			id      : 'errorMessage'
		});
	});
};
const queryCondition = () => {
	initRightTable(tableConfig['queryParams']);
};
const changePage = ({ currentPage, pageSize }: { currentPage: unknown, pageSize: unknown }) => {
	tableConfig['pagerConfig']['currentPage'] = currentPage;
	tableConfig['pagerConfig']['pageSize'] = pageSize;
	initRightTable(tableConfig['queryParams']);
};
const toggleStatus = (status: unknown) => {
	const userStatus = '0' === status ? '1' : '0';
	axios({
		method : 'PUT',
		url    : `user/toggleUserStatus/${userStatus}`
	}).then((jsonResult: unknown) => {
		if (jsonResult['status']) {
			initRightTable(tableConfig['queryParams']);
		} else {
			VXETable.modal.message({
				content : jsonResult['msg'],
				status  : 'warning',
				id      : 'failedMessage'
			});
		}
	}).catch((error: unknown) => {
		console.error(error);
		VXETable.modal.message({
			content : '系统异常,请稍后再试',
			status  : 'error',
			id      : 'errorMessage'
		});
	});
};
const showAddModal = () => {
	addModalRef.value.showModal();
};
const showEditModal = (row: unknown) => {
	editModalRef.value.showModal(row);
};
const remove = (row: unknown) => {
	VXETable.modal.confirm({
		content : '您确定要删除该数据吗?',
		title   : '确认删除',
		id      : 'deleteModalUnique'
	}).then((type: unknown) => {
		if ('confirm' === type) {
			axios({
				method : 'DELETE',
				url    : '/user/removeUser',
				data   : { id : row['id'] }
			}).then((jsonResult: unknown) => {
				if (jsonResult['status']) {
					// 提示用户
					VXETable.modal.message({
						content : jsonResult['msg'],
						status  : 'success',
						id      : 'successMessage'
					});
					// 刷新数据
					initRightTable(tableConfig['queryParams']);
				} else {
					VXETable.modal.message({
						content : jsonResult['msg'],
						status  : 'warning',
						id      : 'failedMessage'
					});
				}
			}).catch((error: unknown) => {
				console.error(error);
				VXETable.modal.message({
					content : '系统异常,请稍后再试',
					status  : 'error',
					id      : 'errorMessage'
				});
			});
		}
	});
};
</script>
<style lang='scss' scoped>
.userMaintain_container{
	margin  :0;
	padding :0;
	border  :0;
	width   :100%;
	height  :100%;
	display :flex;
	.userMaintain_container_left{
		width      :20%;
		height     :100%;
		padding    :10px;
		text-align :center;
		overflow-y :auto;
	}
	.userMaintain_container_right{
		width  :80%;
		height :100%;
	}
}
</style>