/*modules*/
import tabs from '@/config/store/tabs';
import menu from '@/config/store/menu';
import router from '@/config/store/router';
import { createStore } from 'vuex';
const state = {
	dynamicAsyncCustomComponentIsReady : false,
	theme                              : 'light'
};
const mutations = {
	emptyState(state: unknown) {
		state['dynamicAsyncCustomComponentIsReady'] = false;
		state['tabs']['tabs'] = [];
		state['tabs']['selectedTab'] = '';
		state['tabs']['contextData'] = null;
		state['tabs']['isCollapsed'] = false;
		// 动态组件刷新增强
		// 设置浏览器会话内存中的当前选中页和当前打开页
		/*sessionStorage.removeItem('x-auth-token');
		 sessionStorage.removeItem('tabs');
		 sessionStorage.removeItem('selectedTab');
		 sessionStorage.removeItem('isNeedChangePassword');
		 sessionStorage.removeItem('lockReConnect');*/
		sessionStorage.clear();
	},
	toggleDynamicAsyncCustomComponentIsReady(state: unknown, flag: boolean) {
		state['dynamicAsyncCustomComponentIsReady'] = flag;
	},
	triggerTheme(state: unknown) {
		if ('light' === state['theme']) {
			state['theme'] = 'dark';
		} else if ('dark' === state['theme']) {
			state['theme'] = 'light';
		}
	}
};
const actions = {
	componentReady({ commit }: { commit: unknown }) {
		commit('toggleDynamicAsyncCustomComponentIsReady', true);
	}
};
const getters = {
	getDynamicAsyncCustomComponentIsReady(state: unknown) {
		return state['dynamicAsyncCustomComponentIsReady'];
	}
};
export default createStore({
	/*namespaced : true,*/
	state     : state,
	mutations : mutations,
	actions   : actions,
	getters   : getters,
	modules   : {
		tabs,
		menu,
		router
	}
});