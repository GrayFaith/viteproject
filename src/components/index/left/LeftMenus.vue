<template>
	<n-layout has-sider style='height:100%;'>
		<n-layout-sider v-bind='siderConfig' :collapsed='menusStore["isCollapsed"]'
						:native-scrollbar='false'>
			<n-menu ref='menus' v-bind='menuConfig'
					:value='tagsStore["currentActivateTag"]'
					:collapsed='menusStore["isCollapsed"]'/>
		</n-layout-sider>
	</n-layout>
</template>
<script lang='ts' setup>
import { h, resolveComponent, nextTick, onBeforeMount, reactive, computed, watch } from 'vue';
import { getDynamicRoutes } from '@/components/api/index/left/index.js';
import { pinia } from '@/config/store/index.ts';
import { useCommonStore } from '@/config/store/common.store.ts';
import { useTagsStore } from '@/config/store/tags.store.ts';
import { useMenusStore } from '@/config/store/menus.store.ts';
import { useRouterStore } from '@/config/store/router.store.ts';
import { useRouter } from 'vue-router';
import '@/config/vxe-table/index.ts';
import VXETable from '@/config/vxe-table/modal.ts';
import { menuProps } from '@/config/naive-ui/index.js';
import { MenuOption, MenuGroupOption, MenuDividerOption, MenuNodeProps, MenuInst } from 'naive-ui/es/menu/index.d.ts';
// 状态存储
const commonStore = useCommonStore(pinia);
const tagsStore = useTagsStore(pinia);
const menusStore = useMenusStore(pinia);
const routerStore = useRouterStore(pinia);
const router = useRouter();
let menuList = computed(() => menusStore.menuList);
const siderConfig = reactive({
	bordered       : true,
	collapseMode   : 'width',
	collapsedWidth : 65,
	width          : 250,
	position       : 'static'
	/*onCollapse     : store.commit('menu/triggerCollapseStatus'),
	 onExpand       : store.commit('menu/triggerCollapseStatus')*/
});
const menuConfig = reactive<menuProps>({
	accordion         : true,
	mode              : 'vertical',
	iconSize          : 20,
	collapsedIconSize : 24,
	collapsedWidth    : 65,
	keyField          : 'id',
	labelField        : 'menuName',
	childrenField     : 'children',
	disabledField     : 'disabled',
	options           : reactive(menuList),
	renderLabel       : (option: MenuOption | MenuGroupOption) => renderLabel(option),
	renderIcon        : (option: MenuOption) => renderIcon(option),
	renderExtra       : (option: MenuOption | MenuGroupOption) => renderExtra(option),
	onUpdateValue     : (key: string, item: MenuOption) => addTab(item)
	/*expandIcon        : (option: MenuOption) => expandIcon(option),*/
});
// 挂载前
onBeforeMount(() => {
	initAll();
});
// 方法
const renderLabel: Function = (option: MenuOption | MenuGroupOption) => {
	if ('href' in option) {
		return h(
			'a',
			{ href : option.href, target : '_blank' },
			option['menuName'] as string
		);
	}
	return option['menuName'] as string;
};
const renderIcon: Function = (option: MenuOption) => {
	const icon = option['menuIcon'] && option['tagIcon'];
	// 渲染图标占位符以保持缩进
	if (option['menuIconType'] && !icon) {
		return true;
	}
	if ('i' === option['menuIconType']) {
		return h(resolveComponent('ClassIcon'), {
			'icon-class' : option['menuIcon']
		});
	} else if ('svg' === option['menuIconType']) {
		return h(resolveComponent('SvgIcon'), {
			'icon-class' : option['menuIcon']
		});
	}
};
const renderExtra: Function = (option: MenuOption | MenuGroupOption) => {};
/*const expandIcon: Function = (option: MenuOption) => {
 return h(resolveComponent('n-icon'), null, { default : () => h(resolveComponent('n-caret-down-outline')) });
 };*/
const initAll = () => {
	if (sessionStorage.getItem('x-auth-token')) {
		// 如果有x-auth-token代表着已登录,直接请求菜单
		initSysMenuTree();
	}
};
const initSysMenuTree = () => {
	getDynamicRoutes().then((jsonResult: unknown) => {
		if (jsonResult['status']) {
			menusStore.menuList = jsonResult['data'];
			if (jsonResult['data'].length) {
				nextTick(() => {
					// 左侧菜单树加载完毕,右侧的Tags才加载
					commonStore.componentReady().then(() => {
						// 初始化首页展示
						initHomePage(jsonResult['data'].find((menu: unknown) => 'A000' === menu['id']));
					});
				});
			}
		} else {
			VXETable.modal.message({ content : jsonResult['msg'], status : 'warning', id : 'failedMessage' });
		}
	}).catch((errorObj: unknown) => {
		console.error(errorObj);
		VXETable.modal.message({ content : '系统异常,请稍后再试', status : 'error', id : 'errorMessage' });
	});
};
const initHomePage = (homeMenu: unknown) => {
	// TODO 动态组件刷新增强
	// TODO 寻找浏览器会话内存中的当前选中页和当前打开页
	const tags = sessionStorage.getItem('tags');
	const selectedTab = sessionStorage.getItem('selectedTab');
	addTab(homeMenu);
};
const addTab = (menu: unknown) => {
	nextTick(() => {
		/*router.push({
		 path  : menu['menuPath'],
		 query : null
		 });*/
		tagsStore.addTag({
			code         : menu['id'],
			title        : menu['menuName'],
			url          : menu['menuPath'],
			menuIcon     : menu['menuIcon'],
			menuIconType : menu['menuIconType'],
			tagIcon      : menu['tagIcon'],
			tagIconType  : menu['tagIconType'],
			keepAlive    : '1' === menu['isCache'],
			params       : null
		});
	});
};
</script>