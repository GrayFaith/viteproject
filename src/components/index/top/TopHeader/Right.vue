<template>
	<template v-if='loginUserInfo["id"]'>
		<div class='index-header-container-right-flex1'>
			<n-ellipsis :line-clamp='1'>
				<span>登录用户:</span>
				<span class='nickname'>[{{ loginUserInfo['userName'] }}]</span>
				<span class='username'>{{ loginUserInfo['nickName'] }}</span>
			</n-ellipsis>
		</div>
		<div class='index-header-container-right-flex2'>
			<n-dropdown v-bind='dropdownConfig' @select='handleDropdownSelect'>
				<n-button text strong>
					<template v-slot:icon>
						<ClassIcon font-size='18px' icon-class='fa fa-user'/>
					</template>
					<template v-if='!screenTooSmall'>
						个人中心
					</template>
				</n-button>
			</n-dropdown>
		</div>
		<div class='index-header-container-right-flex3'>
			<n-button text strong @click='logOut'>
				<template v-slot:icon>
					<ClassIcon font-size='18px'
							   icon-class='fa fa-power-off'/>
				</template>
				<template v-if='!screenTooSmall'>
					退出登录
				</template>
			</n-button>
		</div>
	</template>
	<passwordModifyModal ref='passwordModify'/>
</template>
<script lang='ts' setup>
import { defineAsyncComponent, nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
// axios
import axios from '@/config/axios';
// 状态管理
import { pinia } from '@/config/store/index.ts';
import { useCommonStore } from '@/config/store/common.store.ts';
import { useTagsStore } from '@/config/store/tags.store.ts';
// 模态框和打印组件
import '@/config/vxe-table/index.ts';
import VXETable from '@/config/vxe-table/modal.ts';
import { useRouter } from 'vue-router';
const PasswordModifyModal = defineAsyncComponent(() => import('@/components/index/top/PasswordModifyModal.vue'));
const commonStore = useCommonStore(pinia);
const tagsStore = useTagsStore(pinia);
const router = useRouter();
const dropdownConfig = reactive({
	animated : true,
	trigger  : 'hover',
	options  : [
		{
			key   : 'editPassword',
			label : '修改密码'
		},
		{
			key   : 'editUserInfo',
			label : '信息维护'
		}
	],
	size     : 'medium'
});
const passwordModify = ref<InstanceType<typeof PasswordModifyModal>>();
// 登录用户信息
const loginUserInfo = reactive({
	id              : null,
	userName        : null,
	nickName        : null,
	salt            : null,
	password        : null,
	idCard          : null,
	phone           : null,
	email           : null,
	address         : null,
	belongDept      : null,
	pictureKey      : null,
	failLoginCount  : null,
	status          : null,
	createTime      : null,
	lastLoginTime   : null,
	lastUpdateTime  : null,
	remark          : null,
	needChangePwd   : true,
	roleIdList      : null,
	roleNameListStr : null
});
let screenTooSmall = ref(false);
let innerWidth: Function = (event) => {
	screenTooSmall.value = 650 >= window.innerWidth;
};
onMounted(() => {
	window.addEventListener('resize', innerWidth);
	initUserInfo();
});
onBeforeUnmount(() => {
	window.removeEventListener('resize', innerWidth);
});
const initUserInfo: Function = () => {
	// 通过服务器获取当前用户信息
	axios({
		method : 'POST',
		url    : '/user/selfInfoFromDataBase'
	}).then((jsonResult: unknown) => {
		if (jsonResult['status']) {
			// 成功获取用户数据,数据合并
			Object.assign(loginUserInfo, jsonResult['data']);
			if (loginUserInfo['needChangePwd']) {
				passwordModify.value.showForceChangePasswordModal();
			}
		} else {
			VXETable.modal.message({ content : jsonResult['msg'], status : 'warning', id : 'failedMessage' });
		}
	}).catch((errorObj: unknown) => {
		console.error(errorObj);
		VXETable.modal.message({ content : '系统异常,请稍后再试', status : 'error', id : 'errorMessage' });
	});
};
const handleDropdownSelect: Function = (key: string | number) => {
	switch (key) {
		case 'editPassword':
			passwordModify.value.showModal();
			break;
		case 'editUserInfo':
			showEditUserInfoTab();
			break;
	}
};
const logOut: Function = () => {
	VXETable.modal.confirm({
		id           : 'confirmLogOut',
		content      : '您确定要退出吗?',
		title        : '确认',
		escClosable  : true,
		maskClosable : true
	}).then((type: unknown) => {
		if ('confirm' === type) {
			axios({
				method : 'POST',
				url    : '/user/logOut'
			}).then((jsonResult: unknown) => {
				// 无论是否成功都要退出
				commonStore.emptyStore().then((() => {
					router.push('/login');
				}));
			}).catch((errorObj: unknown) => {
				console.error(errorObj);
				router.push('/login');
			});
		} else {
			return false;
		}
	});
};
const showEditUserInfoTab: Function = () => {
	tagsStore.addTag({
		code         : 'editUserInfo',
		title        : '个人信息维护',
		menuIcon     : null,
		menuIconType : null,
		tabIcon      : 'fa fa-user',
		tabIconType  : 'i',
		url          : 'page/systemManager/userInfoMaintain/index',
		keepAlive    : false,
		params       : null
	});
};
</script>
<style scoped lang='scss'>
.index-header-container-right-flex1{
	height          :100%;
	width           :calc(100% / 3);
	display         :flex;
	flex-direction  :row;
	flex-wrap       :nowrap;
	justify-content :center;
	align-items     :center;
	align-content   :center;
	.nickname{
	}
	.username{
	}
}
.index-header-container-right-flex2{
	height          :100%;
	width           :calc(100% / 3);
	display         :flex;
	flex-direction  :row;
	flex-wrap       :nowrap;
	justify-content :center;
	align-items     :center;
	align-content   :center;
}
.index-header-container-right-flex3{
	height          :100%;
	width           :calc(100% / 3);
	display         :flex;
	flex-direction  :row;
	flex-wrap       :nowrap;
	justify-content :center;
	align-items     :center;
	align-content   :center;
}
</style>