import { nextTick } from 'vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { pinia } from '@/config/store/index.ts';
import { useCommonStore } from '@/config/store/common.store.ts';
import { useRouterStore } from '@/config/store/router.store.ts';
import { useTagsStore } from '@/config/store/tags.store.ts';
import { useMenusStore } from '@/config/store/menus.store.ts';
import { getDynamicRoutes } from '@/components/api/index/left/index.js';
import VXETable from '@/config/vxe-table/modal.ts';
const commonStore = useCommonStore(pinia);
const routerStore = useRouterStore(pinia);
const tagsStore = useTagsStore(pinia);
const menusStore = useMenusStore(pinia);
const staticRoutes: Array<RouteRecordRaw> = [
	{
		path     : '/',
		redirect : '/login'
	},
	{
		path      : '/login',
		name      : 'Login',
		component : () => import('@/components/login.vue')
	},
	{
		path      : '/index',
		name      : 'Index',
		component : () => import('@/components/index.vue')
	},
	/*{
		path      : '/:pathMatch(.*)*',
		name      : '404',
		component : () => import('@/components/errorPage/404.vue'),
		meta      : {
			keepAlive : true
		}
	}*/
];
const router = createRouter({
	history : createWebHashHistory(/*import.meta.env.VUE_APP_BASE_URL*/),
	routes  : staticRoutes
});
/*router.beforeEach((to, from, next) => {
 console.log(to.path);
 // 判断是否是从/页跳转而来到/login
 if ('/' === from.path && '/login' === to.path) {
 console.log('从默认页跳转而来');
 next();
 }
 // 判断是否是从登录页跳转而来到/index
 if ('/login' === from.path && '/index' === to.path) {
 console.log('从登录页跳转而来');
 next();
 }
 // 判断是否是[/,/login,/index]这3个路径,是这些路径不需要查询
 if ('/' === to.path && '/login' === to.path && '/index' === to.path) {
 console.log('to.path检查');
 next();
 }
 // 斜杠结尾检查,自动将其末尾的/去除
 if (to.path.endsWith('/')) {
 console.log('斜杠结尾检查');
 const path: string = to.path.substring(0, to.path.length - 1);
 console.log(path);
 next(path);
 }
 if (to.path.startsWith('/index/')) {
 console.log('路径头检查');
 next();
 }
 // 判断是否已经有了路由,有路由不需要查询
 if (0 < routerStore.getRoutes.length) {
 console.log('routerStore.getRoutes.length检查', routerStore.getRoutes.length);
 next();
 }
 // 判断是否登录,不登录不查询路由信息
 if (!sessionStorage.getItem('x-auth-token')) {
 console.log('x-auth-token检查');
 next();
 }
 // 没有路由则从服务器拉取路由列表
 getDynamicRoutes().then(jsonResult => {
 if (jsonResult['status']) {
 if (jsonResult['data'].length) {
 // 设置左侧菜单树
 menusStore.menuList = jsonResult['data'];
 // 加载动态路由
 routerStore.addRoutes(jsonResult['data'], router).then(() => {
 next({ ...to, replace : true });
 });
 }
 } else {
 console.warn(jsonResult['msg']);
 VXETable.modal.message(
 { content : jsonResult['msg'], status : 'warning', id : 'failedMessage' });
 }
 }).catch((errorObj: unknown) => {
 console.error(errorObj);
 VXETable.modal.message(
 { content : '系统异常,请稍后再试', status : 'error', id : 'errorMessage' });
 next();
 });
 });*/
/*const addTab = (menu: unknown) => {
 nextTick(() => {
 /!*router.push({
 path  : menu['menuPath'],
 query : null
 });*!/
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
 };*/
export default router;