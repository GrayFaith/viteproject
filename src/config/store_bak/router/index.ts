import { RouteRecordRaw } from 'vue-router';
const components = import.meta.glob('../../../components/**/**.vue');
export default {
	namespaced : true,
	state      : {
		routes : [] as Array<RouteRecordRaw>
	},
	mutations  : {},
	actions    : {
		addRoutes({ dispatch, state }, { data, router }: { data: Array<any>, router: any }) {
			// 清空数据,从data里重新解析
			state['routes'].length = 0;
			// 递归搜索路由
			routerRecursion(state, data, router);
			state['routes'].forEach(item => {
				router.addRoute('Index', item);
			});
		}
	},
	getters    : {
		getRoutes(state) {
			return state['routes'];
		}
	}
};
function routerRecursion(state, data: Array<any>, router: any) {
	data.forEach(item => {
		if ('MENU' === item['menuType']) {
			state['routes'].push({
				path      : `${item['menuPath']}`,
				name      : item['id'],
				component : components[`../../../components/${item['menuPath']}.vue`],
				meta      : {
					keepAlive : '1' === item['isCache']
				}
			});
		}
		if (item['children']) {
			routerRecursion(state, item['children'], router);
		}
	});
}