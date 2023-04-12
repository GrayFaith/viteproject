<template>
	<Tabs
		v-if='store["state"]["dynamicAsyncCustomComponentIsReady"]'
		:model-value='store["state"]["tabs"]["selectedTab"]'
		type='card' animated
		@on-click='onClick' @on-tab-remove='removeTab'
		@on-contextmenu='handleContextMenu'>
		<TabPane
			v-for='(item,index) in store["state"]["tabs"]["tabs"]'
			:index='index'
			:label='(h)=>customLabel(h,item["title"],item["tabIcon"],item["tabIconType"])'
			:name='item["code"]'
			:closable='"A000" !== item["code"]' :context-menu='"A000" !== item["code"]'>
			<!--把需要缓存的页面缓存起来-->
			<keep-alive v-if='item["keepAlive"]'>
				<component
					:is='getComponent(item["url"])'
					v-if='store["state"]["tabs"]["selectedTab"] === item["code"] && item["keepAlive"]' :params='item["params"]'/>
			</keep-alive>
			<!--不需要的直接展示-->
			<component
				:is='getComponent(item["url"])'
				v-else-if='store["state"]["tabs"]["selectedTab"] === item["code"] && !item["keepAlive"]' :params='item["params"]'/>
		</TabPane>
		<template v-slot:contextMenu>
			<DropdownItem @click='reFreshTargetTab'>
				<SvgIcon icon-class='refresh'/>
				刷新该页
			</DropdownItem>
			<DropdownItem @click='removeOtherTabs'>
				<SvgIcon icon-class='close'/>
				关闭其他
			</DropdownItem>
			<DropdownItem @click='removeAllTabs'>
				<SvgIcon icon-class='close'/>
				关闭所有
			</DropdownItem>
		</template>
	</Tabs>
</template>
<script lang='ts' setup>
import { resolveComponent, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
// 使用渲染器自行渲染图标,修复只能使用TabPane的icon属性导致不能渲染图标的问题
// 支持渲染svg图标
const customLabel: Function = (h: unknown, title: string, iconName: string, iconType: string) => {
	if (iconType) {
		if ('svg' === iconType) {
			return h('span', [
				h(resolveComponent('SvgIcon'), { 'icon-class' : iconName }),
				h('span', title)
			]);
		} else if ('i' === iconType) {
			return h('span', [
				h(resolveComponent('ClassIcon'), { 'icon-class' : iconName }),
				h('span', title)
			]);
		}
	}
};
const getComponent: Function = (path: string) => {
	const components = import.meta.glob('../../**/**.vue');
	// 判断访问的组件是否存在,如果不加判断,直接访问不存在的组件,
	// vue会爆炸,因此加入判断机制提升容错.
	// 如果存在直接跳到该页面
	if (components[`../../${path}.vue`]) {
		return defineAsyncComponent({
			loader           : components[`../../${path}.vue`],
			delay            : 1000,
			loadingComponent : components[`../../customComponents/loading/Loading1.vue`],
			timeout          : 5000,
			errorComponent   : components[`../../errorPage/error.vue`]
		});
	} else {
		// 如果不存在则跳到404页面
		return defineAsyncComponent({
			loader           : components[`../../errorPage/404.vue`],
			delay            : 1000,
			loadingComponent : components[`../../customComponents/loading/Loading1.vue`],
			timeout          : 5000,
			errorComponent   : components[`../../errorPage/error.vue`]
		});
	}
};
const onClick: Function = (selectedName: unknown) => {
	// 标签已存在,并且点击后触发
	// 切换会话内存中的当前标签页
	store.commit('tabs/modifySessionSelectedTab', { selectedTab : selectedName });
	// 寻找vuex中tabs与selectedName相匹配的对象
	// 如果tab的code与selectedName相等,那么它们就是同一个标签页
	const item = store['state']['tabs']['tabs'].find((item: unknown) => item['code'] === selectedName);
	// TODO 需要该功能再解除注释
	/*if (item) {
	 // 判断是否该页面需要每次点击都强制刷新
	 if (!item['keepAlive']) {
	 // 在key后面添加0-10000之间的随机数,让组件自行刷新
	 item['key'] = `${item['code']}_${Math.ceil(Math.random() * 10000)}`;
	 }
	 }*/
};
const reFreshTargetTab: Function = () => {
	// 刷新当前选择的tab
	const selectedName = store['state']['tabs']['contextData']['name'];
	const item = store['state']['tabs']['tabs'].find((item: unknown) => item['code'] === selectedName);
	if (item) {
		// 判断是否该页面需要每次点击都强制刷新
		if (!item['keepAlive']) {
			// 在key后面添加0-10000之间的随机数,让组件自行刷新
			item['key'] = `${item['code']}_${Math.ceil(Math.random() * 10000)}`;
		}
	}
};
const removeTab: Function = (tabCode: string) => {
	store.dispatch('tabs/removeTab', tabCode);
};
const removeAllTabs: Function = () => {
	store.dispatch('tabs/removeAllTabs');
};
const removeOtherTabs: Function = () => {
	store.dispatch('tabs/removeOtherTabs');
};
const handleContextMenu: Function = (data, event, position) => {
	store.state['tabs']['contextData'] = data;
	event.stopPropagation();
	return false;
};
</script>