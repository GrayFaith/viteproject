import { TagProps } from '@/../types/tag.d.ts';
import { defineStore } from 'pinia';
export const useMenusStore = defineStore('menusStore', {
	state   : () => {
		return {
			isCollapsed              : false as boolean,
			menuList                 : [] as Array,
			currentActivateComponent : null as TagProps
		};
	},
	actions : {
		triggerCollapseStatus() {
			this['isCollapsed'] = !this['isCollapsed'];
		}
	},
	getters : {
		getIsCollapsed : (state) => state['isCollapsed']
	}
});