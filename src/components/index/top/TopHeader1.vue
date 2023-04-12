<template>
	<div class='index-header-container'>
		<div class='index-header-container-left'>
			<n-ellipsis :line-clamp='1'>
				<SvgIcon icon-class='tupian2'/>
				----------------------------------------
				<template v-slot:tooltip>
					----------------------------------------
				</template>
			</n-ellipsis>
		</div>
		<div class='index-header-container-center'>
			<n-button strong aria-label='triggerCollapse' @click='store.commit("menu/triggerCollapseStatus")'>
				<ClassIcon icon-class='fa fa-bars'/>
			</n-button>
		</div>
		<div class='index-header-container-right'>
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
						<n-ellipsis :line-clamp='1' :tooltip='false'>
							<n-button text strong style='width:100%;height:100%;'>
								<template v-slot:icon>
									<ClassIcon font-size='18px'
											   icon-class='fa fa-user'/>
								</template>
								个人中心
							</n-button>
						</n-ellipsis>
					</n-dropdown>
				</div>
				<div class='index-header-container-right-flex3'>
					<vxe-button
						v-line-clamp='1' type='text' content='退出登录' icon='fa fa-power-off'
						@click='logOut'/>
					<!--<n-ellipsis :line-clamp='1' :tooltip='false'>
						<span class='analogTextButton' @click='logOut'>
							<span class='n-button n-button&#45;&#45;default-type n-button&#45;&#45;medium-type'>
								<ClassIcon font-size='18px' style='margin:6px 6px 6px 0;' icon-class='fa fa-power-off'/>
								退出登录
							</span>
						</span>
					</n-ellipsis>-->
				</div>
			</template>
		</div>
	</div>
	<PasswordModifyModal ref='passwordModify'/>
</template>
<script lang='ts' setup>
import { defineAsyncComponent, onMounted, nextTick, ref, reactive } from 'vue';
import axios from '@/config/axios';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import '@/config/vxe-table/index.ts';
import VXETable from '@/config/vxe-table/modal.ts';
const PasswordModifyModal = defineAsyncComponent(() => import('@/components/index/top/PasswordModifyModal.vue'));
const store = useStore();
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
onMounted(() => {
	initUserInfo();
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
				nextTick(() => {
					store.commit('emptyState');
					router.push('/login');
				});
			}).catch((errorObj: unknown) => {
				console.error(errorObj);
				nextTick(() => {
					router.push('/login');
				});
			});
		} else {
			return false;
		}
	});
};
const showEditUserInfoTab: Function = () => {
	store.dispatch('tabs/addTab', {
		tab    : {
			code         : 'editUserInfo',
			title        : '个人信息维护',
			menuIcon     : null,
			menuIconType : null,
			tabIcon      : 'fa fa-user',
			tabIconType  : 'i',
			url          : 'page/systemManager/userInfoMaintain/index',
			keepAlive    : false,
			params       : null
		},
		vueObj : this
	});
};
</script>
<style lang='scss' scoped>
.index-header-container{
	height            :100%;
	width             :100%;
	padding           :0;
	margin            :0;
	border            :0;
	background-color  :rgba(54, 131, 211, 0);
	/*background-image  :url('../../../assets/index/images/header_logo_bg.jpg');*/
	background-repeat :no-repeat;
	background-size   :100% 100%;
	display           :flex;
	justify-content   :space-between;
	align-items       :center;
	.index-header-container-left{
		font-family :'楷体', 'Microsoft YaHei', '微软雅黑', Arial, '文泉驿正黑', serif;
		height      :100%;
		width       :20%;
		overflow    :hidden;
		font-size   :34px;
		font-weight :500;
		display     :flex;
		align-items :center;
	}
	.index-header-container-center{
		height          :100%;
		width           :40%;
		padding         :0;
		margin          :0;
		border          :0;
		overflow        :hidden;
		display         :flex;
		flex-direction  :row;
		flex-wrap       :nowrap;
		align-content   :center;
		justify-content :flex-start;
		align-items     :center;
	}
	.index-header-container-right{
		height          :100%;
		width           :40%;
		padding         :0;
		margin          :0;
		border          :0;
		overflow        :hidden;
		display         :flex;
		justify-content :flex-end;
		align-items     :center;
		flex-direction  :row;
		flex-wrap       :nowrap;
		align-content   :center;
		.analogTextButton{
			cursor    :pointer;
			font-size :14px;
			border    :none;
			&:hover{
				color :#36AD6A;
			}
		}
		.index-header-container-right-flex1{
			height          :100%;
			width           :calc(100% / 3);
			display         :flex;
			flex-direction  :column;
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
			flex-direction  :column;
			flex-wrap       :nowrap;
			justify-content :center;
			align-items     :center;
			align-content   :center;
			:deep(.vxe-button.type--button){
				font-size        :14px;
				background-color :rgba(0, 0, 0, 0);
				font-family      :inherit;
				height           :100%;
				width            :100%;
				border           :0;
			}
		}
		.index-header-container-right-flex3{
			height          :100%;
			width           :calc(100% / 3);
			display         :flex;
			flex-direction  :column;
			flex-wrap       :nowrap;
			justify-content :center;
			align-items     :center;
			align-content   :center;
			:deep(.vxe-button.type--button){
				font-size        :14px;
				background-color :rgba(0, 0, 0, 0);
				font-family      :inherit;
				height           :100%;
				width            :100%;
				border           :0;
			}
		}
	}
}
/*:deep(.n-button){
	margin                :0;
	font-weight           :var(--n-font-weight);
	line-height           :1;
	font-family           :inherit;
	padding               :var(--n-padding);
	height                :var(--n-height);
	font-size             :var(--n-font-size);
	border-radius         :var(--n-border-radius);
	color                 :var(--n-text-color);
	background-color      :var(--n-color);
	width                 :var(--n-width);
	white-space           :nowrap;
	outline               :none;
	position              :inherit;
	z-index               :auto;
	border                :none;
	display               :inline-grid;
	!*把行数分成一份*!
	grid-template-rows    :1fr;
	!*把列数平均分成两份*!
	grid-template-columns :1fr 1fr;
	justify-items         :end;
	align-content         :center;
	text-align            :center;
	align-items           :center;
	justify-content       :center;
	user-select           :none;
	-webkit-user-select   :none;
	cursor                :pointer;
	text-decoration       :none;
	transition            :color .3s var(--n-bezier), background-color .3s var(--n-bezier), opacity .3s var(--n-bezier), border-color .3s var(--n-bezier);
}*/
</style>