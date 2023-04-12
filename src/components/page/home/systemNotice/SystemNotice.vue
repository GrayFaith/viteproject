<template>
	<div class='system-notice-container'>
		<vxe-grid v-bind='tableConfig' @cell-click='goToDetail'>
			<template v-slot:toolbar_tools>
				<vxe-button
					circle icon='fa fa-refresh' title='刷新'
					@click='initTableData'/>
				<vxe-button
					circle icon='fa fa-list' title='更多'
					@click='more'/>
			</template>
		</vxe-grid>
	</div>
</template>
<script lang='ts' setup>
import { defineAsyncComponent, reactive, ref, onMounted, nextTick } from 'vue';
import axios from '@/config/axios';
import { useStore } from 'vuex';
import '@/config/vxe-table/index.ts';
import VXETable from '@/config/vxe-table/modal.ts';
const props = defineProps({
	params : {
		type    : Object,
		require : true,
		default : () => {
			return {};
		}
	}
});
const store = useStore();
const tableConfig = reactive({
	loading        : true,
	rowId          : 'id',
	height         : 'auto',
	align          : 'center',
	showHeader     : false,
	keyboardConfig : { isArrow : true },
	pagerConfig    : {
		enabled : false
	},
	toolbarConfig  : {
		slots  : {
			tools : 'toolbar_tools'
		},
		custom : {
			icon : 'fa fa-cog'
		}
	},
	extParams      : {
		// 只查询用户能看到的
		flag : true,
		// 只查询启用的公告
		status : '1',
		// 降序排序
		orders : [
			{ releaseDate : false }
		]
	},
	columns        : [
		{
			field        : 'id',
			width        : '10%',
			showOverflow : true
		},
		{
			width        : '70%',
			showOverflow : true,
			formatter    : (cell: unknown) => {
				return `${cell['row']['title']}`;
			}
		},
		{
			width     : '20%',
			formatter : (cell: unknown) => {
				return `${cell['row']['releaseDate']}`;
			}
		}
	],
	data           : []
});
onMounted(() => {
	initTableData();
});
const initTableData = () => {
	tableConfig['loading'] = true;
	axios({
		method : 'POST',
		url    : '/notice/selectSysNoticeListBySelf',
		data   : {
			pageNum  : 1,
			pageSize : 15,
			...tableConfig['extParams']
		}
	}).then((jsonResult: unknown) => {
		if (jsonResult['status']) {
			tableConfig['data'] = jsonResult['data']['records'];
		} else {
			VXETable.modal.message({
				content : jsonResult['msg'],
				status  : 'warning',
				id      : 'failedMessage'
			});
		}
		tableConfig['loading'] = false;
	}).catch((errorObj: unknown) => {
		tableConfig['loading'] = false;
		console.error(errorObj);
		VXETable.modal.message({ content : '系统异常,请稍后再试', status : 'error', id : 'errorMessage' });
	});
};
const goToDetail = ({ row }: { row: unknown }) => {
	nextTick(() => {
		store.dispatch('tabs/addTab',
			{
				tab    : {
					code         : `systemNoticeDetail_${row['id']}`,
					title        : '公告明细',
					url          : 'page/home/systemNotice/SystemNoticeDetail',
					menuIcon     : null,
					menuIconType : null,
					tabIcon      : 'fa fa-bell',
					tabIconType  : 'i',
					keepAlive    : false,
					params       : {
						id : row['id']
					}
				},
				vueObj : this
			}
		);
	});
};
const more = () => {
	nextTick(() => {
		store.dispatch('tabs/addTab',
			{
				tab    : {
					code         : `systemNoticeManager`,
					title        : '公告维护',
					url          : 'page/systemManager/noticeMaintain/index',
					menuIcon     : 'fa fa-bell',
					menuIconType : 'i',
					tabIcon      : 'fa fa-bell',
					tabIconType  : 'i',
					keepAlive    : false,
					params       : null
				},
				vueObj : this
			}
		);
	});
};
</script>
<style lang='scss' scoped>
.system-notice-container{
	box-sizing :border-box;
	margin     :0;
	padding    :0;
	border     :0;
	height     :100%;
	width      :100%;
	overflow   :auto;
}
</style>