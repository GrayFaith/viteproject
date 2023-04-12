import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
const components = import.meta.glob('../../components/**/**.vue');
export const useRouterStore = defineStore('routerStore', {
	state   : () => {
		return {
			routes : [] as Array<RouteRecordRaw>
		};
	},
	actions : {
		async addRoutes(data: Array<any>, router: any) {
			// 清空数据,从data里重新解析
			this['routes'].length = 0;
			// 递归搜索路由
			this.routerRecursion(data, router);
			this['routes'].forEach(item => {
				router.addRoute('Index', item);
			});
		},
		routerRecursion(data: Array<any>, router: any) {
			data.forEach(item => {
				if ('MENU' === item['menuType']) {
					this['routes'].push({
						path      : `${item['menuPath']}`,
						name      : item['id'],
						component : components[`../../components/${item['menuPath']}.vue`],
						meta      : {
							keepAlive : '1' === item['isCache']
						}
					});
				}
				if (item['children']) {
					this.routerRecursion(item['children'], router);
				}
			});
		}
	},
	getters : {
		getRoutes : (state) => state['routes']
	}
});