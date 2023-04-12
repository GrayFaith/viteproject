<template>
	<div v-if='commonStore.getDynamicAsyncCustomComponentIsReady' class='tag-pane-container'>
		<div class='tag-list'>
			<TagList/>
		</div>
		<div v-if='currentActivateComponent' class='view-content'>
			<keep-alive>
				<component :key='`currentActivateComponent_keepAlive_component_${key}`'
						   :is='getComponent(currentActivateComponent["url"])'
						   :params='params'/>
			</keep-alive>
		</div>
	</div>
</template>
<script lang='ts' setup>
import { computed, defineAsyncComponent } from 'vue';
import { pinia } from '@/config/store/index.ts';
import { useCommonStore } from '@/config/store/common.store.ts';
import { useMenusStore } from '@/config/store/menus.store.js';
const commonStore = useCommonStore(pinia);
const menusStore = useMenusStore(pinia);
const TagList = defineAsyncComponent(() => import('@/components/index/right/TagList.vue'));
let key = computed(() => currentActivateComponent.value.key);
let currentActivateComponent = computed(() => menusStore.currentActivateComponent);
let params = computed(() => currentActivateComponent.value.params);
const components = import.meta.glob('/src/components/**/**.vue');
// /src/components/page/home/index.vue
const getComponent: Function = (path: string) => {
	// 判断访问的组件是否存在,如果不加判断,直接访问不存在的组件,
	// vue会爆炸,因此加入判断机制提升容错.
	// 如果存在直接跳到该页面
	if (components[`/src/components/${path}.vue`]) {
		return defineAsyncComponent({
			loader           : components[`/src/components/${path}.vue`],
			delay            : 1000,
			loadingComponent : components[`/src/components/customComponents/loading/Loading1.vue`],
			timeout          : 5000,
			errorComponent   : components[`/src/components/errorPage/error.vue`]
		});
	} else {
		// 如果不存在则跳到404页面
		return defineAsyncComponent({
			loader           : components[`/src/components/errorPage/404.vue`],
			delay            : 1000,
			loadingComponent : components[`/src/components/customComponents/loading/Loading1.vue`],
			timeout          : 5000,
			errorComponent   : components[`/src/components/errorPage/error.vue`]
		});
	}
};
</script>
<style lang='scss' scoped>
.tag-pane-container{
	margin         :0;
	padding        :0;
	border         :0;
	height         :100%;
	width          :100%;
	display        :flex;
	flex-direction :column;
	align-items    :stretch;
	align-content  :center;
	flex-wrap      :nowrap;
	.tag-list{
		min-height :45px;
		height     :45px;
		max-height :45px;
	}
	.view-content{
		margin  :0;
		padding :0;
		border  :0;
		height  :calc(100% - 45px);
		width   :100%;
	}
}
</style>