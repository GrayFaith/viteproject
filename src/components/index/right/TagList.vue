<template>
	<n-space class='tag-list'>
		<n-tag
			v-for='(item,index) in tagsStore.tags'
			:key='`n-space_n-tag_${item["key"]}_${index}`'
			:bordered='false' strong :closable='showClose(item)'
			class='tag-item transition-all-300' size='medium'
			:class='[item["code"] === currentActivateTag ? "n-tag--checkable n-tag--checked": ""] '
			:trigger-click-on-close='false'
			@close='(event:MouseEvent)=>onClose(event,item)'
			@click='onClick(item)' @contextmenu='(event: MouseEvent)=>onRightClick(event,item)'>
			{{ item['title'] }}
			<template v-slot:icon>
				<n-icon :component='customIcon(item)'/>
			</template>
		</n-tag>
	</n-space>
	<n-dropdown v-bind='contextMenuConfig' :on-clickoutside='onClickOutSide' @select='handleSelect'/>
</template>
<script lang='ts' setup>
import { computed, h, nextTick, reactive, resolveComponent, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { pinia } from '@/config/store/index.ts';
import { useTagsStore } from '@/config/store/tags.store.ts';
const tagsStore = useTagsStore(pinia);
const route = useRoute(pinia);
const router = useRouter(pinia);
let currentActivateTag = computed(() => tagsStore.currentActivateTag);
const contextMenuConfig = reactive({
	show      : false,
	animated  : true,
	placement : 'bottom-start',
	trigger   : 'manual',
	x         : 0,
	y         : 0,
	options   : [
		{ label : '刷新', key : 'refreshTarget' },
		{ label : '关闭其他', key : 'closeOther' },
		{ label : '关闭所有', key : 'closeAll' }
	]
});
const customIcon: Function = (item: any) => {
	let val: unknown = '';
	if (item['tagIconType']) {
		if ('svg' === item['tagIconType']) {
			val = h(resolveComponent('SvgIcon'), { 'icon-class' : item['tagIcon'] });
		} else if ('i' === item['tagIconType']) {
			val = h(resolveComponent('ClassIcon'), { 'icon-class' : item['tagIcon'] });
		}
	}
	return val;
};
const showClose: Function = (item: any): Boolean => {
	return 'A000' !== item['code'];
};
const onClick: Function = (item: any) => {
	tagsStore.changeSelectTag(item);
};
const onClose: Function = (event: MouseEvent, item: any) => {
	tagsStore.removeTag(item);
};
const onRightClick: Function = (event: MouseEvent, item: any) => {
	// 阻止默认事件
	event.preventDefault();
	// 阻止传播
	event.stopPropagation();
	// 阻止即时传播
	event.stopImmediatePropagation();
	// 设置当前选中项
	tagsStore.contextData = item;
	// 根据event的X轴和Y轴设置菜单的位置
	nextTick().then(() => {
		Object.assign(contextMenuConfig, {
			show : true,
			x    : event['clientX'],
			y    : event['clientY']
		});
	});
};
const onClickOutSide: Function = (event: MouseEvent) => {
	nextTick().then(() => {
		contextMenuConfig['show'] = false;
	});
};
const handleSelect: Function = (key: string | number) => {
	switch (key) {
		case 'refreshTarget':
			refreshTarget();
			break;
		case 'closeOther':
			closeOther();
			break;
		case 'closeAll':
			closeAll();
			break;
	}
};
const refreshTarget: Function = (): void => {
	// 刷新当前选择的Tag
	const selectedTag = tagsStore.currentSelectedTag;
	console.log(selectedTag);
	console.log('123', router.currentRoute['value']);
	// 判断是否该页面需要每次点击都强制刷新
	if (!selectedTag['keepAlive']) {
		router.replace({ path : router.currentRoute['value']['fullPath'] });
		// 在key后面添加0-10000之间的随机数,让组件自行刷新
		// selectedTag['key'] = `${selectedTag['code']}_${Math.ceil(Math.random() * 10000)}`;
	}
};
const closeOther: Function = (): void => {
	tagsStore.removeOtherTags();
};
const closeAll: Function = (): void => {
	tagsStore.removeAllTags();
};
</script>
<style lang='scss' scoped>
.tag-list{
	padding         :0;
	margin          :0;
	border          :0;
	width           :100%;
	height          :100%;
	display         :flex;
	flex-flow       :row wrap;
	justify-content :flex-start;
	flex-direction  :row;
	flex-wrap       :nowrap;
	align-content   :center;
	align-items     :center;
	.tag-item{
		position        :relative;
		cursor          :pointer;
		white-space     :nowrap;
		justify-content :center;
		align-items     :center;
	}
}
.transition-all-300{
	transition-property        :all;
	transition-timing-function :cubic-bezier(.4, 0, .2, 1);
	transition-duration        :.3s;
}
</style>