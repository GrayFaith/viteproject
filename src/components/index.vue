<template>
	<n-layout native-scrollbar class='layout' v-if='isReady'>
		<n-layout-header class='index-header'>
			<Suspense>
				<template v-slot>
					<TopHeader/>
				</template>
				<template v-slot:fallback>
					<Loading1/>
				</template>
			</Suspense>
		</n-layout-header>
		<n-layout has-sider native-scrollbar class='index-content'>
			<n-layout-sider class='sider' width='auto'>
				<Suspense>
					<template v-slot>
						<LeftMenus/>
					</template>
					<template v-slot:fallback>
						<Loading1/>
					</template>
				</Suspense>
			</n-layout-sider>
			<n-layout-content class='index-main'>
				<Suspense>
					<template v-slot>
						<RightContainer/>
					</template>
					<template v-slot:fallback>
						<Loading1/>
					</template>
				</Suspense>
			</n-layout-content>
		</n-layout>
	</n-layout>
</template>
<script lang='ts' setup>
import { onBeforeMount, onMounted, defineAsyncComponent, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import 'font-awesome/css/font-awesome.min.css';
/*ElementPlus*/
import '@/config/element-plus/index.js';
/*ViewUIPlus*/
import '@/config/view-ui-plus/index.js';
/*VxeTable*/
import '@/config/vxe-table/index.ts';
import VXETable from '@/config/vxe-table/modal.ts';
/*Icon*/
import '@/config/icon/index.js';
const TopHeader = defineAsyncComponent(() => import('@/components/index/top/TopHeader/index.vue'));
const LeftMenus = defineAsyncComponent(() => import('@/components/index/left/LeftMenus.vue'));
const RightContainer = defineAsyncComponent(() => import('@/components/index/right/RightContainer.vue'));
const Loading1 = defineAsyncComponent(() => import('@/components/customComponents/loading/Loading1.vue'));
const router = useRouter();
let isReady = ref(false);
onBeforeMount(() => {
	// 在节点挂载之前进行判断,更快速
	if (!sessionStorage.getItem('x-auth-token')) {
		// 如果没有x-auth-token代表着没登录,直接跳回登录页
		VXETable.modal.message({ content : '请先登录!', status : 'warning', id : 'failedMessage' });
		router.replace({
			path : '/login'
		});
	}
});
onMounted(() => {
	const browser = navigator.userAgent;
	if (browser.indexOf('Chrome') > -1) {
		isReady.value = true;
	} else {
		VXETable.modal.confirm({
			content : `您的浏览器为\n[${browser}],\n我们推荐使用Chrome/72以上的版本`,
			title   : '浏览器检测',
			id      : 'checkBrowserModalUnique'
		}).then((type: unknown) => {
			VXETable.modal.message({
				content : '不使用指定浏览器将无法使用系统!',
				status  : 'warning',
				id      : 'failedMessage'
			});
		});
	}
});
</script>
<style lang='scss' scoped>
.layout{
	box-sizing :border-box;
	margin     :0;
	padding    :0;
	border     :0;
	height     :100vh;
	width      :100vw;
	overflow   :hidden;
	.index-header{
		box-sizing :border-box;
		margin     :0;
		padding    :0;
		border     :0;
		height     :45px;
		width      :100%;
	}
	.index-content{
		box-sizing :border-box;
		margin     :0;
		padding    :0;
		border     :0;
		height     :calc(100% - 45px);
		width      :100%;
		.sider{
			box-sizing :border-box;
			height     :100%;
			width      :auto;
			font-size  :16px;
			overflow-x :hidden;
			overflow-y :auto;
		}
		.index-main{
			box-sizing :border-box;
			height     :100%;
			width      :100%;
			margin     :0;
			padding    :0;
			border     :0;
		}
	}
}
</style>