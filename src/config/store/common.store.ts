import { defineStore } from 'pinia';
import { pinia } from '@/config/store/index.ts';
import { useMenusStore } from '@/config/store/menus.store.ts';
import { useRouterStore } from '@/config/store/router.store.ts';
import { useTagsStore } from '@/config/store/tags.store.ts';
const menusStore = useMenusStore(pinia);
const routerStore = useRouterStore(pinia);
const tagsStore = useTagsStore(pinia);
export const useCommonStore = defineStore('commonStore', {
	/*namespaced : true,*/
	state   : () => {
		return {
			dynamicAsyncCustomComponentIsReady : false as boolean,
			theme                              : 'light' as string
		};
	},
	actions : {
		async emptyStore() {
			this.$reset();
			menusStore.$reset();
			routerStore.$reset();
			tagsStore.$reset();
			// 清空浏览器会话内存中的数据
			sessionStorage.clear();
		},
		async triggerTheme() {
			if ('light' === this['theme']) {
				this['theme'] = 'dark';
			} else if ('dark' === this['theme']) {
				this['theme'] = 'light';
			}
		},
		async componentReady() {
			this['dynamicAsyncCustomComponentIsReady'] = true;
		}
	},
	getters : {
		getDynamicAsyncCustomComponentIsReady : (state) => state['dynamicAsyncCustomComponentIsReady'],
		getTheme                              : (state) => state['theme']
	}
});