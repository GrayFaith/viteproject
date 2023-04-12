import index from '@/config/vue/index.ts';
import '@/static/style/element-plus/index.scss';
import {
	ElAvatar,
	ElTree, ElTooltip, ElScrollbar, ElIcon
} from 'element-plus';
index.vue.use(ElAvatar);
/*index.vue.use(ElCollapse);
 index.vue.use(ElBadge);
 index.vue.use(ElProgress);
 index.vue.use(ElDescriptions);*/
/*index.vue.use(ElAside);
 index.vue.use(ElContainer);
 index.vue.use(ElHeader);
 index.vue.use(ElMain);
 index.vue.use(ElMenu);
 index.vue.use(ElMenuItem);
 index.vue.use(ElSubMenu);
 index.vue.use(ElMenuItemGroup);*/
index.vue.use(ElTree);
index.vue.use(ElTooltip);
index.vue.use(ElScrollbar);
index.vue.use(ElIcon);
/*index.vue.use(ElConfigProvider);*/
