import { TagProps } from '@/../types/tag.d.ts';
import { pinia } from '@/config/store/index.js';
import { useMenusStore } from '@/config/store/menus.store.js';
import { defineStore } from 'pinia';
import VXETable from '@/config/vxe-table/modal.ts';
const menusStore = useMenusStore(pinia);
export const useTagsStore = defineStore('tagsStore', {
	state   : () => {
		return {
			// Tag框的数组
			tags : [] as Array<TagProps>,
			// 当前选中的Tag['code']
			currentActivateTag : '' as string,
			// 当前右键选择的Tag框
			currentSelectedTag : null as TagProps
		};
	},
	actions : {
		// TODO 添加至tags标签
		async addTag(tag: TagProps) {
			// 检查tags是否存在15个,已有15个则提醒用户关闭掉一些
			if (!15 > this['tags'].length) {
				await VXETable.modal.message(
					{
						content : '您已开启15个标签了,为了浏览器的流畅度着想,请您先关闭掉一些不用的标签',
						status  : 'warning',
						id      : 'tagTooManyMessage'
					}
				);
				return;
			}
			this.pushTag(tag).then((addedTag) => {
				// 放置组件的实例上去
				// addedTag['component'] = getComponent(addedTag['url']);
				// 添加完Tag之后设置浏览器当前展示的组件
				menusStore.currentActivateComponent = addedTag;
			});
		},
		async pushTag(tag: TagProps) {
			// 从tags中寻找相同code的标签
			const existingTag: TagProps = this['tags'].find((item: TagProps) => item['code'] === tag['code']);
			// 检查标签是否已存在
			if (existingTag) {
				// 如果已经存在且[需要]强制刷新
				if (tag['forceFlush']) {
					// 在key后面添加0-10000之间的随机数,让组件自行刷新
					existingTag['key'] = `${existingTag['code']}_${Math.ceil(Math.random() * 10000)}`;
					// 将已激活Tag设置为该Tag
					this['currentActivateTag'] = tag['code'];
				} else {
					// 如果已经存在且[不需要]强制刷新
					// 那就直接把已有Tag前置
					this['currentActivateTag'] = tag['code'];
				}
				return Promise.resolve(existingTag);
			} else {
				// 如果不存在,那么直接添加一个新的Tag
				const newTag: TagProps = {
					key          : tag['code'],
					code         : tag['code'],
					title        : tag['title'],
					url          : tag['url'],
					menuIconType : tag['menuIconType'] ? tag['menuIconType'] : 'i',
					menuIcon     : tag['menuIcon'] ? tag['menuIcon'] : '',
					tagIconType  : tag['tagIconType'] ? tag['tagIconType'] : 'i',
					tagIcon      : tag['tagIcon'] ? tag['tagIcon'] : '',
					params       : tag['params'] ? tag['params'] : null,
					keepAlive    : tag['keepAlive'] ? tag['keepAlive'] : false,
					forceFlush   : tag['forceFlush'] ? tag['forceFlush'] : false
				};
				this['tags'].push(newTag);
				// 把当前激活的Tag设置为新添加的标签
				this['currentActivateTag'] = tag['code'];
				return Promise.resolve(newTag);
			}
		}
	},
	getters : {
		getCurrentActivateTag : (state) => state['currentActivateTag']
	}
});