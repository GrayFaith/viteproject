import '@/static/style/vxe-table/vxe-table.scss';
import XEUtils from 'xe-utils';
import index from '@/config/vue/index.ts';
// 图标库和图标组件
import 'vxe-table/es/icon/style/iconfont.1679360988448.ttf';
import 'vxe-table/es/icon/style/iconfont.1679360988448.woff';
// 通过查看源码,发现它的样式表里已经用base64的方式写入了woff2的内容
// node_modules/vxe-table/es/icon/style.css
// 第565行 @font-face {
// import 'vxe-table/es/icon/style/iconfont.1679360988448.woff2';
import Icon from 'vxe-table/es/icon/index';
// 表单组件
/*import Form from 'vxe-table/es/form/index';
 import FormGather from 'vxe-table/es/form-gather/index';
 import FormItem from 'vxe-table/es/form-item/index';
 import Validator from 'vxe-table/es/validator/index';*/
// -------------------------------------------------------
import Button from 'vxe-table/es/button/index';
/*import Radio from 'vxe-table/es/radio/index';
 import RadioButton from 'vxe-table/es/radio-button/index';
 import RadioGroup from 'vxe-table/es/radio-group/index';
 import Checkbox from 'vxe-table/es/checkbox/index';
 import CheckboxGroup from 'vxe-table/es/checkbox-group/index';
 import Switch from 'vxe-table/es/switch/index';
 import List from 'vxe-table/es/list/index';
 import Input from 'vxe-table/es/input/index';
 import Textarea from 'vxe-table/es/textarea/index';
 import Select from 'vxe-table/es/select/index';
 import Option from 'vxe-table/es/option/index';
 import Optgroup from 'vxe-table/es/optgroup/index';
 import Pulldown from 'vxe-table/es/pulldown/index';*/
// 表格组件
import Table from 'vxe-table/es/table/index';
import Grid from 'vxe-table/es/grid/index';
import Column from 'vxe-table/es/column/index';
import Colgroup from 'vxe-table/es/colgroup/index';
// 表格功能组件
import Edit from 'vxe-table/es/edit/index';
import Filter from 'vxe-table/es/filter/index';
import Keyboard from 'vxe-table/es/keyboard/index';
// import Menu from 'vxe-table/es/menu/index';
import Tooltip from 'vxe-table/es/tooltip/index';
import Toolbar from 'vxe-table/es/toolbar/index';
import Header from 'vxe-table/es/header/index';
import Pager from 'vxe-table/es/pager/index';
// 数据导出组件
// import Export from 'vxe-table/es/export/index';
// 通用组件
import Modal from 'vxe-table/es/modal/index';
// 表格配置主体
import VXETable from 'vxe-table/es/v-x-e-table/index';
import zhCN from 'vxe-table/lib/locale/lang/zh-CN';
// 按需加载的方式默认是不带国际化的,自定义国际化需要自行解析占位符'{0}'
VXETable.setup({
	i18n     : (key, args) => XEUtils.toFormatString(XEUtils.get(zhCN, key), args),
	size     : 'default', // 全局尺寸
	zIndex   : 2001, // 全局 zIndex 起始值,如果项目的z-index样式值过大时就需要跟随设置更大,避免被遮挡
	version  : 4, // 版本号,对于某些带数据缓存的功能有用到,上升版本号可以用于重置数据
	table    : {
		showHeader          : true,
		keepSource          : true,
		delayHover          : 250,
		showOverflow        : true,
		showHeaderOverflow  : true,
		showFooterOverflow  : true,
		size                : 'auto',
		resizable           : true,
		autoResize          : true,
		syncResize          : true,
		highlightHoverRow   : true,
		highlightCurrentRow : true,
		stripe              : true,
		border              : true,
		round               : true,
		emptyText           : '暂无数据',
		filterConfig        : {
			showIcon     : false,
			remote       : false,
			filterMethod : null
		},
		radioConfig         : {
			trigger : 'default'
		},
		checkboxConfig      : {
			strict    : true,
			highlight : true,
			range     : true,
			trigger   : 'default'
		},
		sortConfig          : {
			remote     : false,
			trigger    : 'default',
			orders     : ['ASC', 'DESC', null],
			sortMethod : null
		},
		expandConfig        : {
			trigger  : 'default',
			showIcon : true
		},
		treeConfig          : {
			children : 'CHILDREN',
			hasChild : 'hasChild',
			indent   : 30,
			showIcon : true
		},
		tooltipConfig       : {
			theme     : 'dark',
			enterable : false
		},
		menuConfig          : {
			visibleMethod() {
			}
		},
		// rowId: '_XID', // 行数据的唯一主键字段名
		// editConfig: {
		// 	mode: 'cell',
		// 	showAsterisk: true
		// },
		importConfig : {
			modes : ['insert', 'covering']
		},
		exportConfig : {
			modes       : ['current', 'selected'],
			sheetMethod : {
				options   : '',
				workbook  : '',
				worksheet : ''
			}
		},
		customConfig : {
			storage : true
		},
		scrollX      : {
			gt : 60
		},
		scrollY      : {
			gt : 100
		}
	},
	grid     : {
		size          : 'auto',
		resizable     : true,
		autoResize    : true,
		syncResize    : true,
		zoomConfig    : {
			escRestore : true
		},
		pagerConfig   : {
			enabled     : true,
			border      : true,
			perfect     : true,
			background  : true,
			currentPage : 1,
			pageSize    : 10,
			total       : 0,
			pagerCount  : 8,
			align       : 'center',
			pageSizes   : [10, 15, 20, 50, 100, 200, 500, 1000],
			layouts     : ['PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']
			// layouts     : ['PrevPage', 'NextPage', 'FullJump', 'Sizes', 'Total', 'PageCount']
		},
		toolbarConfig : {
			perfect : true,
			size    : 'medium',
			slots   : {
				buttons : 'toolbar_buttons',
				tools   : 'toolbar_tools'
			},
			custom  : {
				icon : 'fa fa-cog'
			}
			/*import  : {
			 icon : 'fa fa-upload',
			 mode : 'covering'
			 },
			 export  : {
			 icon  : 'fa fa-download',
			 types : ['xlsx ', 'csv', 'html', 'xml', 'txt']
			 },
			 print   : {
			 icon : 'fa fa-print'
			 },
			 custom  : {
			 icon     : 'fa fa-cog',
			 isFooter : true
			 },*/
			/*buttons : [],
			 tools   : []*/
		}
		// proxyConfig: {
		// 	autoLoad: true,
		// 	message: true,
		// 	props: {
		// 		list: null, // 用于列表,读取响应数据
		// 		result: 'result', // 用于分页,读取响应数据
		// 		total: 'page.total' // 用于分页,读取总条数
		// 	},
		// 	beforeItem: null,
		// 	beforeColumn: null,
		// 	beforeQuery: null,
		// 	afterQuery: null,
		// 	beforeDelete: null,
		// 	afterDelete: null,
		// 	beforeSave: null,
		// 	afterSave: null
		// }
	},
	pager    : {
		size        : null,
		autoHidden  : false,
		perfect     : true,
		border      : true,
		background  : true,
		currentPage : 1,
		pageSize    : 20,
		total       : 0,
		pagerCount  : 20,
		align       : 'center',
		pageSizes   : [10, 15, 20, 50, 100, 200, 500, 1000],
		layouts     : ['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']
	},
	form     : {
		preventSubmit : false,
		size          : null,
		colon         : true,
		titleAsterisk : true,
		titleColon    : true,
		titleOverflow : 'tooltip',
		validConfig   : {
			showMessage : true,
			autoPos     : true
		}
	},
	input    : {
		size        : null,
		transfer    : true,
		parseFormat : 'yyyy-MM-dd HH:mm:ss.SSS',
		labelFormat : 'yyyy-MM-dd HH:mm:ss',
		valueFormat : 'yyyy-MM-dd HH:mm:ss',
		startWeek   : 1,
		digits      : 2,
		controls    : true
	},
	textarea : {
		//   size: null
		//   autosize: {
		//     minRows: 1,
		//     maxRows: 10
		//   }
	},
	select   : {
		size              : 'medium',
		transfer          : true,
		multiCharOverflow : 10
	},
	toolbar  : {
		perfect : true,
		size    : 'medium',
		slots   : {
			buttons : 'toolbar_buttons',
			tools   : 'toolbar_tools'
		},
		import  : {
			icon : 'fa fa-upload',
			mode : 'covering'
		},
		export  : {
			icon  : 'fa fa-download',
			types : ['xlsx ', 'csv', 'html', 'xml', 'txt']
		},
		print   : {
			icon : 'fa fa-print'
		},
		custom  : {
			icon     : 'fa fa-cog',
			isFooter : true
		},
		buttons : [],
		tools   : []
	},
	button   : {
		size     : null,
		round    : true,
		transfer : true
	},
	// radio: {
	//   size: null
	// },
	// checkbox: {
	//   size: null
	// },
	// switch: {
	//   size: null
	// },
	modal : {
		size              : 'medium',
		showZoom          : true,
		resize            : true,
		transfer          : true,
		fullscreen        : false,
		minWidth          : 400,
		minHeight         : 200,
		lockView          : true,
		mask              : true,
		duration          : 3000,
		marginSize        : 0,
		draggable         : true,
		dblclickZoom      : true,
		remember          : false,
		showTitleOverflow : true,
		storage           : false
	}
	// list: {
	//   scrollY: {
	//     gt: 100
	//   }
	// }
});
index.vue.use(Icon);
// ----------------------------
/*index.vue.use(Form);
 index.vue.use(FormGather);
 index.vue.use(FormItem);
 index.vue.use(Validator);*/
// -----------------------------
index.vue.use(Button);
/*index.vue.use(Radio);
 index.vue.use(RadioButton);
 index.vue.use(RadioGroup);
 index.vue.use(Checkbox);
 index.vue.use(CheckboxGroup);
 index.vue.use(Switch);
 index.vue.use(List);
 index.vue.use(Input);
 index.vue.use(Textarea);
 index.vue.use(Select);
 index.vue.use(Optgroup);
 index.vue.use(Option);
 index.vue.use(Pulldown);*/
// -----------------------------
index.vue.use(Table);
index.vue.use(Grid);
index.vue.use(Column);
index.vue.use(Colgroup);
// -----------------------------
index.vue.use(Edit);
index.vue.use(Filter);
index.vue.use(Keyboard);
// index.vue.use(Menu);
index.vue.use(Tooltip);
index.vue.use(Toolbar);
index.vue.use(Header);
index.vue.use(Pager);
// -----------------------------
// index.vue.use(Export);
// -----------------------------
index.vue.use(Modal);
// 给vue实例挂载内部对象
index.vue.config.globalProperties.$XModal = VXETable.modal;
index.vue.config.globalProperties.$XPrint = VXETable.print;
/*export default VXETable;*/