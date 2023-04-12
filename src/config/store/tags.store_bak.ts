import { defineStore } from 'pinia';
import router from '@/config/router';
import VXETable from '@/config/vxe-table/modal.ts';
export const useTagsStore = defineStore('tagsStore', {
	state   : () => {
		return {
			// Tag框的数组
			tags : [],
			// 当前选中的Tag框
			selectedTag : '',
			// 当前右键选择的Tag框
			contextData : null
		};
	},
	actions : {
		copyDataToSession() {
			// 动态组件刷新增强
			// 设置浏览器会话内存中的当前选中页和当前打开页
			sessionStorage.setItem('tags', JSON.stringify(this['tags']));
			sessionStorage.setItem('selectedTag', JSON.stringify(this['selectedTag']));
		},
		/*添加Tag*/
		pushTag(tag: unknown) {
			// 判断是否存在
			const isExist = this['tags'].find((item: unknown) => item['code'] === tag['code']);
			if (isExist) {
				if (tag['forceFlush']) {
					// 如果已经存在且[需要]强制刷新
					// 在key后面添加0-10000之间的随机数,让组件自行刷新
					isExist['key'] = `${isExist['code']}_${Math.ceil(Math.random() * 10000)}`;
					this['selectedTag'] = tag['code'];
				} else {
					// 如果已经存在且[不需要]强制刷新
					// 那就直接把Tag前置就行
					this['selectedTag'] = tag['code'];
				}
			} else {
				// 如果不存在,那么直接添加一个新的tag
				this['tags'].push({
					key   : tag['code'],
					code  : tag['code'],
					title : tag['title'],
					url   : tag['url'],
					/*Menu组件显示的图标*/
					menuIcon     : tag['menuIcon'] ? tag['menuIcon'] : '',
					menuIconType : tag['menuIconType'] ? tag['menuIconType'] : 'i',
					/*Tag组件显示的图标*/
					tagIcon     : tag['tagIcon'] ? tag['tagIcon'] : '',
					tagIconType : tag['tagIconType'] ? tag['tagIconType'] : null,
					params      : tag['params'] ? tag['params'] : null,
					keepAlive   : tag['keepAlive'] ? tag['keepAlive'] : false,
					forceFlush  : tag['forceFlush'] ? tag['forceFlush'] : false
				});
				this['selectedTag'] = tag['code'];
			}
		},
		pushSessionTag({ tag }: { tag: unknown }) {
			// 从会话中获取信息
			const tags = JSON.parse(sessionStorage.getItem('tags') || '');
			let selectedTag = JSON.parse(sessionStorage.getItem('selectedTag') || '');
			// 判断是否存在
			// 如果tag['code']与item['code']相等,那么它们就是同一个标签页
			const isPushedTag = tags?.filter((item: unknown) => item['code'] === tag['code']);
			if (isPushedTag.length) {
				if (isPushedTag[0]) {
					// 已经存在该tag的话就直接将isPushed改为true
					if (tag['forceFlush']) {
						// 如果已经存在且[需要]强制刷新
						// 在key后面添加0-10000之间的随机数,让组件自行刷新
						isPushedTag[0]['key'] = `${isPushedTag[0]['code']}_${Math.ceil(Math.random() * 10000)}`;
						selectedTag = tag['code'];
					} else {
						// 如果已经存在且[不需要]强制刷新
						selectedTag = tag['code'];
					}
				}
			} else {
				// 如果不存在,那么直接添加一个新的tag
				tags?.push({
					key   : tag['code'],
					code  : tag['code'],
					title : tag['title'],
					url   : tag['url'],
					/*Menu组件显示的图标*/
					menuIcon     : tag['menuIcon'] ? tag['menuIcon'] : '',
					menuIconType : tag['menuIconType'] ? tag['menuIconType'] : 'i',
					/*Tag组件显示的图标*/
					tagIcon     : tag['tagIcon'] ? tag['tagIcon'] : '',
					tagIconType : tag['tagIconType'] ? tag['tagIconType'] : null,
					params      : tag['params'] ? tag['params'] : null,
					keepAlive   : tag['keepAlive'] ? tag['keepAlive'] : false
				});
				selectedTag = tag['code'];
			}
			// 动态组件刷新增强
			// 设置浏览器会话内存中的当前选中页和当前打开页
			sessionStorage.setItem('tags', JSON.stringify(tags));
			sessionStorage.setItem('selectedTag', JSON.stringify(selectedTag));
		},
		removeSessionTag(tagPanelName: string) {
			let tags = JSON.parse(sessionStorage.getItem('tags') || '');
			const selectedTag = JSON.parse(sessionStorage.getItem('selectedTag') || '');
			let activeName = selectedTag;
			if (activeName === tagPanelName) {
				tags?.forEach((tag: unknown, index: unknown) => {
					if (tag['code'] === tagPanelName) {
						const nextTag = tags[index + 1] || tags[index - 1];
						if (nextTag) {
							activeName = nextTag['code'];
						}
					}
				});
			}
			tags = tags.filter((item: unknown) => item['code'] !== tagPanelName);
			// 动态组件刷新增强
			// 设置浏览器会话内存中的当前选中页和当前打开页
			sessionStorage.setItem('tags', JSON.stringify(tags));
			sessionStorage.setItem('selectedTag', JSON.stringify(selectedTag));
		},
		removeSessionOtherTags() {
			let tags = JSON.parse(sessionStorage.getItem('tags') || '');
			const selectedTag = JSON.parse(sessionStorage.getItem('selectedTag') || '');
			tags = tags?.filter((item: unknown) => 'A000' === item['code'] || item['code'] === selectedTag);
			// 在会话中直接移除其他标签,不会重置当前已选的标签
			// 动态组件刷新增强
			// 设置浏览器会话内存中的当前选中页和当前打开页
			sessionStorage.setItem('tags', JSON.stringify(tags));
			sessionStorage.setItem('selectedTag', JSON.stringify(selectedTag));
		},
		removeSessionAllTags() {
			let tags = JSON.parse(sessionStorage.getItem('tags') || '');
			tags = tags?.filter((item: unknown) => 'A000' === item['code']);
			// 动态组件刷新增强
			// 设置浏览器会话内存中的当前选中页和当前打开页
			sessionStorage.setItem('tags', JSON.stringify(tags));
			sessionStorage.setItem('selectedTag', 'A000');
		},
		/*将会话中的Tag加入vuex*/
		async pushSessionTags() {
			// 动态组件刷新增强
			// 寻找浏览器会话内存中的当前选中页和当前打开页
			const tags = sessionStorage.getItem('tags');
			const selectedTag = sessionStorage.getItem('selectedTag');
			// 如果tags不为空的话
			if (tags) {
				this['tags'] = JSON.parse(tags);
			}
			// 如果selectedTag不为空的话
			if (selectedTag) {
				this['selectedTag'] = JSON.parse(selectedTag);
			}
		},
		/*修改会话中的当前选中Tag*/
		modifySessionSelectedTag({ selectedTag }: { selectedTag: unknown }) {
			this['selectedTag'] = selectedTag;
			sessionStorage.setItem('selectedTag', JSON.stringify(selectedTag));
		},
		changeSelectTag(tag: unknown) {
			this['selectedTag'] = tag['code'];
			this.copyDataToSession();
		},
		async addTag(tag: unknown) {
			// 判断是否已有15个Tag,有的话则提示用户关闭掉一些再开启
			if (!15 > this['tags'].length) {
				VXETable.modal.message(
					{
						content : '您已开启15个标签了,为了浏览器的流畅度着想,请您先关闭掉一些不用的标签',
						status  : 'warning',
						id      : 'tagTooManyMessage'
					}
				);
				return;
			}
			this.pushTag(tag);
			this.copyDataToSession();
		},
		addSessionTag({ tag, vueObj }: { tag: unknown, vueObj: unknown }) {
			// 判断是否已有15个Tag,有的话则提示用户关闭掉一些再开启
			if (!15 > this['tags'].length) {
				VXETable.modal.message(
					{
						content : '您已开启15个Tag框了,为了浏览器的流畅度着想,请您先关闭掉一些不用的Tag框',
						status  : 'warning',
						id      : 'tagTooManyMessage'
					});
				return;
			}
			this.pushSessionTag({ tag : tag });
			this.copyDataToSession();
		},
		/*移除单个Tag*/
		removeTag(item: string) {
			// 判断是否存在Tags,不存在的话就是调用的会话中的Tags
			if (this['tags'] && this['tags'].length) {
				// 如果关闭的是当前激活页
				if (this['selectedTag'] === item['code']) {
					// 遍历Tag列表
					this['tags'].forEach((tag1: unknown, index: number) => {
						if (tag1['code'] === item['code']) {
							// 关闭当前激活页后还需要让相邻的Tag来补位
							const nextTag = this['tags'][index + 1] || this['tags'][index - 1];
							if (nextTag) {
								// 设置当前激活的Tag
								this['selectedTag'] = nextTag['code'];
							}
							// 删除当前激活页
							this['tags'] = this['tags'].filter((tag2: unknown) => tag2['code'] !== item['code']);
							return;
						}
					});
				} else {
					// 如果关闭的不是当前激活页
					this['tags'].forEach((tag1: unknown, index: number) => {
						if (tag1['code'] === item['code']) {
							// 直接删除即可
							this['tags'] = this['tags'].filter((tag2: unknown) => tag2['code'] !== item['code']);
							return;
						}
					});
				}
			} else {
				this.removeSessionTag(item['code']);
			}
			this.copyDataToSession();
		},
		/*移除其他的Tag*/
		removeOtherTags() {
			// 判断是否存在Tags,不存在的话就是调用的会话中的Tags
			if (this['tags'] && this['tags'].length) {
				const contextTarget = this['contextData']['name'];
				this['tags'] =
					this['tags'].filter((item: unknown) => 'A000' === item['code'] || item['code'] === contextTarget);
				this['selectedTag'] = contextTarget;
			} else {
				this.removeSessionOtherTags();
			}
			this.copyDataToSession();
		},
		/*移除所有的Tag*/
		removeAllTags() {
			// 判断是否存在Tags,不存在的话就是调用的会话中的Tags
			if (this['tags'] && this['tags'].length) {
				this['tags'] = this['tags'].filter((item: unknown) => 'A000' === item['code']);
				this['selectedTag'] = 'A000';
			} else {
				this.removeSessionAllTags();
			}
			this.copyDataToSession();
		}
	},
	getters : {
		getSelectTag : (state) => state['selectedTag']
	}
});