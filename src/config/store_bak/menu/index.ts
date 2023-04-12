export default {
	namespaced : true,
	state      : {
		isCollapsed : false
	},
	mutations  : {
		triggerCollapseStatus(state: unknown) {
			state['isCollapsed'] = !state['isCollapsed'];
		}
	},
	actions    : {},
	getters    : {
		getIsCollapsed(state: unknown) {
			return state['isCollapsed'];
		}
	}
};