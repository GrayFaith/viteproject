import router from '@/config/router';
export default {
	namespaced : true,
	state      : {
		// Tab框的数组
		tabs : [],
		// 当前选中的Tab框
		selectedTab : '',
		// 当前右键选择的Tab框
		contextData : null
	},
	mutations  : {
		/*跳路由*/
		pushRouter(state: any, tab: any) {
			// TODO 判断是不是存在这个路由记录,不存在则返回404
			if (router.hasRoute(tab['code'])) {
				router.push(`/index/${tab['url']}`);
			} else {
				router.push('/index/404');
			}
		},
		copyDataToSession(state: unknown) {
			// 动态组件刷新增强
			// 设置浏览器会话内存中的当前选中页和当前打开页
			sessionStorage.setItem('tabs', JSON.stringify(state['tabs']));
			sessionStorage.setItem('selectedTab', JSON.stringify(state['selectedTab']));
		},
		/*添加Tag*/
		pushTab(state: unknown, tab: unknown) {
			// 判断是否存在
			const isExist = state['tabs'].find((item: unknown) => item['code'] === tab['code']);
			if (isExist) {
				if (tab['forceFlush']) {
					// 如果已经存在且[需要]强制刷新
					// 在key后面添加0-10000之间的随机数,让组件自行刷新
					isExist['key'] = `${isExist['code']}_${Math.ceil(Math.random() * 10000)}`;
					state['selectedTab'] = tab['code'];
				} else {
					// 如果已经存在且[不需要]强制刷新
					// 那就直接把Tag前置就行
					state['selectedTab'] = tab['code'];
				}
			} else {
				// 如果不存在,那么直接添加一个新的tab
				state['tabs'].push({
					key   : tab['code'],
					code  : tab['code'],
					title : tab['title'],
					url   : tab['url'],
					/*Menu组件显示的图标*/
					menuIcon     : tab['menuIcon'] ? tab['menuIcon'] : '',
					menuIconType : tab['menuIconType'] ? tab['menuIconType'] : 'i',
					/*Tab组件显示的图标*/
					tabIcon     : tab['tabIcon'] ? tab['tabIcon'] : '',
					tabIconType : tab['tabIconType'] ? tab['tabIconType'] : null,
					params      : tab['params'] ? tab['params'] : null,
					keepAlive   : tab['keepAlive'] ? tab['keepAlive'] : false,
					forceFlush  : tab['forceFlush'] ? tab['forceFlush'] : false
				});
				state['selectedTab'] = tab['code'];
			}
		},
		pushSessionTab(state: unknown, { tab }: { tab: unknown }) {
			// 从会话中获取信息
			const tabs = JSON.parse(sessionStorage.getItem('tabs') || '');
			let selectedTab = JSON.parse(sessionStorage.getItem('selectedTab') || '');
			// 判断是否存在
			// 如果tab['code']与item['code']相等,那么它们就是同一个标签页
			const isPushedTab = tabs?.filter((item: unknown) => item['code'] === tab['code']);
			if (isPushedTab.length) {
				if (isPushedTab[0]) {
					// 已经存在该tab的话就直接将isPushed改为true
					if (tab['forceFlush']) {
						// 如果已经存在且[需要]强制刷新
						// 在key后面添加0-10000之间的随机数,让组件自行刷新
						isPushedTab[0]['key'] = `${isPushedTab[0]['code']}_${Math.ceil(Math.random() * 10000)}`;
						selectedTab = tab['code'];
					} else {
						// 如果已经存在且[不需要]强制刷新
						selectedTab = tab['code'];
					}
				}
			} else {
				// 如果不存在,那么直接添加一个新的tab
				tabs?.push({
					key   : tab['code'],
					code  : tab['code'],
					title : tab['title'],
					url   : tab['url'],
					/*Menu组件显示的图标*/
					menuIcon     : tab['menuIcon'] ? tab['menuIcon'] : '',
					menuIconType : tab['menuIconType'] ? tab['menuIconType'] : 'i',
					/*Tab组件显示的图标*/
					tabIcon     : tab['tabIcon'] ? tab['tabIcon'] : '',
					tabIconType : tab['tabIconType'] ? tab['tabIconType'] : null,
					params      : tab['params'] ? tab['params'] : null,
					keepAlive   : tab['keepAlive'] ? tab['keepAlive'] : false
				});
				selectedTab = tab['code'];
			}
			// 动态组件刷新增强
			// 设置浏览器会话内存中的当前选中页和当前打开页
			sessionStorage.setItem('tabs', JSON.stringify(tabs));
			sessionStorage.setItem('selectedTab', JSON.stringify(selectedTab));
		},
		removeTab(state: unknown, tabCode: string) {
			// 过滤掉已经关闭的当前Tag
			state['tabs'] = state['tabs'].filter((item: unknown) => item['code'] !== tabCode);
		},
		removeSessionTab(state: unknown, tabPanelName: string) {
			let tabs = JSON.parse(sessionStorage.getItem('tabs') || '');
			const selectedTab = JSON.parse(sessionStorage.getItem('selectedTab') || '');
			let activeName = selectedTab;
			if (activeName === tabPanelName) {
				tabs?.forEach((tab: unknown, index: unknown) => {
					if (tab['code'] === tabPanelName) {
						const nextTab = tabs[index + 1] || tabs[index - 1];
						if (nextTab) {
							activeName = nextTab['code'];
						}
					}
				});
			}
			tabs = tabs.filter((item: unknown) => item['code'] !== tabPanelName);
			// 动态组件刷新增强
			// 设置浏览器会话内存中的当前选中页和当前打开页
			sessionStorage.setItem('tabs', JSON.stringify(tabs));
			sessionStorage.setItem('selectedTab', JSON.stringify(selectedTab));
		},
		/*移除其他Tag*/
		removeOtherTabs(state: unknown) {
			const contextTarget = state['contextData']['name'];
			state['tabs'] =
				state['tabs'].filter((item: unknown) => 'A000' === item['code'] || item['code'] === contextTarget);
			state['selectedTab'] = contextTarget;
		},
		removeSessionOtherTabs() {
			let tabs = JSON.parse(sessionStorage.getItem('tabs') || '');
			const selectedTab = JSON.parse(sessionStorage.getItem('selectedTab') || '');
			tabs = tabs?.filter((item: unknown) => 'A000' === item['code'] || item['code'] === selectedTab);
			// 在会话中直接移除其他标签,不会重置当前已选的标签
			// 动态组件刷新增强
			// 设置浏览器会话内存中的当前选中页和当前打开页
			sessionStorage.setItem('tabs', JSON.stringify(tabs));
			sessionStorage.setItem('selectedTab', JSON.stringify(selectedTab));
		},
		/*移除所有Tag*/
		removeAllTabs(state: unknown) {
			state['tabs'] = state['tabs'].filter((item: unknown) => 'A000' === item['code']);
			state['selectedTab'] = 'A000';
		},
		removeSessionAllTabs() {
			let tabs = JSON.parse(sessionStorage.getItem('tabs') || '');
			tabs = tabs?.filter((item: unknown) => 'A000' === item['code']);
			// 动态组件刷新增强
			// 设置浏览器会话内存中的当前选中页和当前打开页
			sessionStorage.setItem('tabs', JSON.stringify(tabs));
			sessionStorage.setItem('selectedTab', 'A000');
		},
		/*将会话中的Tag加入vuex*/
		pushSessionTabs(state: unknown) {
			// 动态组件刷新增强
			// 寻找浏览器会话内存中的当前选中页和当前打开页
			const tabs = sessionStorage.getItem('tabs');
			const selectedTab = sessionStorage.getItem('selectedTab');
			// 如果tabs不为空的话
			if (tabs) {
				state['tabs'] = JSON.parse(tabs);
			}
			// 如果selectedTab不为空的话
			if (selectedTab) {
				state['selectedTab'] = JSON.parse(selectedTab);
			}
		},
		/*修改会话中的当前选中Tag*/
		modifySessionSelectedTab(state: unknown, { selectedTab }: { selectedTab: unknown }) {
			state['selectedTab'] = selectedTab;
			sessionStorage.setItem('selectedTab', JSON.stringify(selectedTab));
		}
	},
	actions    : {
		changeSelectTab({ commit, state }, tab: unknown) {
			state['selectedTab'] = tab['code'];
			commit('copyDataToSession');
			commit('pushRouter', tab);
		},
		addTab({ commit, state }: { commit: unknown, state: unknown },
			{ tab, vueObj }: { tab: unknown, vueObj: unknown }) {
			// 判断是否已有15个Tab,有的话则提示用户关闭掉一些再开启
			if (!15 > state['tabs'].length) {
				vueObj.$XModal.message(
					{
						content : '您已开启15个标签了,为了浏览器的流畅度着想,请您先关闭掉一些不用的标签',
						status  : 'warning',
						id      : 'tabTooManyMessage'
					}
				);
				return;
			}
			commit('pushTab', tab);
			commit('copyDataToSession');
			commit('pushRouter', tab);
		},
		addSessionTab({ commit, state }: { commit: unknown, state: unknown },
			{ tab, vueObj }: { tab: unknown, vueObj: unknown }) {
			// 判断是否已有15个Tab,有的话则提示用户关闭掉一些再开启
			if (!15 > state['tabs'].length) {
				vueObj.$XModal.message(
					{
						content : '您已开启15个Tag框了,为了浏览器的流畅度着想,请您先关闭掉一些不用的Tag框',
						status  : 'warning',
						id      : 'tabTooManyMessage'
					});
				return;
			}
			commit('pushSessionTab', { tab : tab });
			commit('copyDataToSession');
		},
		removeTab({ commit, state }: { commit: unknown, state: unknown }, item: string) {
			// 判断是否存在Tabs,不存在的话就是调用的会话中的Tabs
			if (state['tabs'] && state['tabs'].length) {
				// 如果关闭的是当前激活页
				if (state['selectedTab'] === item['code']) {
					// 遍历Tag列表
					state['tabs'].forEach((tab1: unknown, index: number) => {
						if (tab1['code'] === item['code']) {
							// 关闭当前激活页后还需要让相邻的Tag来补位
							const nextTab = state['tabs'][index + 1] || state['tabs'][index - 1];
							if (nextTab) {
								// 设置当前激活的Tag
								state['selectedTab'] = nextTab['code'];
								commit('pushRouter', nextTab);
							}
							// 删除当前激活页
							state['tabs'] = state['tabs'].filter((tab2: unknown) => tab2['code'] !== item['code']);
							return;
						}
					});
				} else {
					// 如果关闭的不是当前激活页
					state['tabs'].forEach((tab1: unknown, index: number) => {
						if (tab1['code'] === item['code']) {
							// 直接删除即可
							state['tabs'] = state['tabs'].filter((tab2: unknown) => tab2['code'] !== item['code']);
							return;
						}
					});
				}
			} else {
				commit('removeSessionTab', tabCode);
			}
			commit('copyDataToSession');
		},
		removeOtherTabs({ commit, state }: { commit: unknown, state: unknown }) {
			// 判断是否存在Tabs,不存在的话就是调用的会话中的Tabs
			if (state['tabs'] && state['tabs'].length) {
				commit('removeOtherTabs');
			} else {
				commit('removeSessionOtherTabs');
			}
			commit('copyDataToSession');
		},
		removeAllTabs({ commit, state }: { commit: unknown, state: unknown }) {
			// 判断是否存在Tabs,不存在的话就是调用的会话中的Tabs
			if (state['tabs'] && state['tabs'].length) {
				commit('removeAllTabs');
			} else {
				commit('removeSessionAllTabs');
			}
			commit('copyDataToSession');
		}
	},
	getters    : {
		getSelectTab(state) {
			return state['selectedTab'];
		}
	}
};