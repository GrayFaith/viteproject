import index from '@/config/vue/index.ts';
import 'view-ui-plus/dist/styles/viewuiplus.css';
import '@/static/style/view-ui-plus/custom.scss';
/*import Tabs from 'view-ui-plus/src/components/tabs/index.js';
import TabPane from 'view-ui-plus/src/components/tab-pane/index.js';
import Dropdown from 'view-ui-plus/src/components/dropdown/index.js';
import DropdownMenu from 'view-ui-plus/src/components/dropdown-menu/index.js';
import DropdownItem from 'view-ui-plus/src/components/dropdown-item/index.js';*/
import Spin from 'view-ui-plus/src/components/spin/index.js';
import Icon from 'view-ui-plus/src/components/icon/index.js';
import Space from 'view-ui-plus/src/components/space/index.js';
import Upload from 'view-ui-plus/src/components/upload';
/*import Exception from 'view-ui-plus/src/components/exception/index.js';*/
import List from 'view-ui-plus/src/components/list/index.js';
import ListItem from 'view-ui-plus/src/components/list-item/index.js';
import ListItemMeta from 'view-ui-plus/src/components/list-item-meta/index.js';
import Progress from 'view-ui-plus/src/components/progress/index.js';
import lineClamp from 'view-ui-plus/src/directives/line-clamp.js';
const config = {
	transfer : true,
	size     : 'large',
	capture  : true,
	select   : {
		arrow     : 'md-arrow-dropdown',
		arrowSize : 20
	}
};
/*index.vue.component('Tabs', Tabs, config);
index.vue.component('TabPane', TabPane, config);
index.vue.component('Dropdown', Dropdown, config);
index.vue.component('DropdownMenu', DropdownMenu, config);
index.vue.component('DropdownItem', DropdownItem, config);*/
index.vue.component('Spin', Spin, config);
index.vue.component('Icon', Icon, config);
index.vue.component('Space', Space, config);
index.vue.component('Upload', Upload, config);
/*index.vue.component('Exception', Exception, config);*/
index.vue.component('List', List, config);
index.vue.component('ListItem', ListItem, config);
index.vue.component('ListItemMeta', ListItemMeta, config);
index.vue.component('Progress', Progress, config);
// 注册文本自动省略directive,可以使用v-line-clamp指令
index.vue.directive('lineClamp', lineClamp);