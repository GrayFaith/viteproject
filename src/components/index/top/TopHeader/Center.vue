<template>
	<n-space align='center'>
		<!--菜单栏伸缩开关-->
		<n-button strong aria-label='triggerCollapse' @click='menusStore.triggerCollapseStatus'>
			<ClassIcon :icon-class='"fa fa-bars"'/>
		</n-button>
		<!--暗黑模式开关-->
		<n-button strong @click='commonStore.triggerTheme'>
			<template v-if='"dark"===commonStore.theme'>
				<SvgIcon icon-class='SunnyOutline'/>
			</template>
			<template v-if='"light"===commonStore.theme'>
				<SvgIcon icon-class='SunnyOutline'/>
			</template>
		</n-button>
	</n-space>
</template>
<script lang='ts' setup>
import { computed, watch } from 'vue';
import { pinia } from '@/config/store/index.ts';
import { useCommonStore } from '@/config/store/common.store.ts';
import { useMenusStore } from '@/config/store/menus.store.ts';
let commonStore = useCommonStore(pinia);
let menusStore = useMenusStore(pinia);
/*let collapsedClass = computed(() => {
 console.log(store['state']['menu/isCollapsed']);
 if (store['state']['menu/isCollapsed']) {
 return 'fa fa-bars';
 } else {
 return 'fa fa-user';
 }
 });*/
let isCollapsed = computed(() => menusStore.getIsCollapsed);
watch(isCollapsed, (newValue, oldValue) => {
	console.log(newValue);
}, {
	deep      : true,
	immediate : false
});
</script>