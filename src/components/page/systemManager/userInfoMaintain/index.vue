<template>
	<div class='userInfoManager-container'>
		<div class='left'>
			<div class='title'>
				<span>个人信息</span>
			</div>
			<div class='avatar'>
				<el-avatar
					class='img' shape='square' fit='cover'
					:src='showUserInfo["pictureStr"]' alt='用户头像'>
				</el-avatar>
			</div>
			<ul class='info-list'>
				<li>
					<span>登录账号：</span>{{ showUserInfo['userName'] }}
				</li>
				<li>
					<span>归属部门：</span>{{ showUserInfo['belongDept'] }}
				</li>
				<li>
					<span>👇角色列表👇</span>
				</li>
				<n-scrollbar trigger='hover'>
					<li>
						<template v-for='item in showUserInfo["roleNameListStr"]'>
							<div class='list-item'>{{ item }}</div>
						</template>
					</li>
				</n-scrollbar>
			</ul>
		</div>
		<div class='right'>
			<div class='title'>
				<span>基本资料</span>
			</div>
			<n-form
				ref='userInfoFormRef' v-bind='formConfig'
				:modal='formData' :rules='formRules'>
				<n-grid
					:x-gap='24' :y-gap='24' :cols='1'
					layout-shift-disabled>
					<n-form-item label='用户昵称' path='nickName'>
						<n-input
							v-model:value='formData["nickName"]'
							placeholder='请输入昵称' type='text' clearable/>
					</n-form-item>
					<n-form-item label='身份证号' path='idCard'>
						<n-input
							v-model:value='formData["idCard"]'
							placeholder='请输入身份证号' type='text' clearable/>
					</n-form-item>
					<n-form-item label='手机号码' path='phone'>
						<n-input
							v-model:value='formData["phone"]'
							placeholder='请输入手机号码' type='text' clearable/>
					</n-form-item>
					<n-form-item label='电子邮箱' path='eMail'>
						<n-input
							v-model:value='formData["eMail"]'
							placeholder='请输入电子邮箱' type='text' clearable/>
					</n-form-item>
					<n-form-item label='地址' path='address'>
						<n-input
							v-model:value='formData["address"]'
							placeholder='请输入地址' type='text' clearable/>
					</n-form-item>
					<n-form-item label='描述信息' path='remark'>
						<n-input
							v-model:value='formData["remark"]'
							placeholder='请输入描述信息' type='text' clearable/>
					</n-form-item>
					<n-space justify='center'>
						<n-button type='warning' @click='submit'
								  round strong>
							确认修改
						</n-button>
					</n-space>
				</n-grid>
			</n-form>
		</div>
	</div>
</template>
<script lang='ts' setup>
import { onMounted, reactive, ref, nextTick } from 'vue';
import axios from '@/config/axios';
import '@/config/vxe-table/index.ts';
import VXETable from '@/config/vxe-table/modal.ts';
import { FormInst, FormItemRule, FormRules } from 'naive-ui/es/form/src/interface.js';
import { formProps } from '@/config/naive-ui/index.js';
interface ShowUserInfo {
	userName: string | null,
	belongDept: string | null,
	roleNameListStr: string | null,
	pictureKey: string | null,
	pictureStr: string | null
}
interface UserInfo {
	id: string | null,
	nickName: string | null,
	idCard: string | null,
	phone: string | null,
	eMail: string | null,
	address: string | null,
	remark: string | null
}
const userInfoFormRef = ref<InstanceType<typeof FormInst>>();
const showUserInfo = reactive<ShowUserInfo>({
	userName        : null,
	belongDept      : null,
	roleNameListStr : null,
	pictureKey      : null,
	pictureStr      : null
});
const formConfig = reactive<formProps>({
	disabled             : false,
	inline               : false,
	labelWidth           : 'auto',
	labelAlign           : 'left',
	labelPlacement       : 'left',
	showFeedback         : true,
	showLabel            : true,
	showRequireMark      : true,
	requireMarkPlacement : 'left',
	size                 : 'medium',
	validateMessages     : undefined
});
const formData = reactive<UserInfo>({
	id       : null,
	nickName : null,
	idCard   : null,
	phone    : null,
	eMail    : null,
	address  : null,
	remark   : null
});
const formRules = reactive<FormRules>({
	nickName : {
		required : true,
		trigger  : ['input', 'blur'],
		message  : '请输入昵称'
	},
	address  : {
		required : false
	},
	eMail    : {
		required : false,
		trigger  : ['input', 'blur'],
		asyncValidator(rule: FormItemRule, value: string, callback: (error?: Error) => void) {
			return new Promise<void>((resolve, reject) => {
				// 如果没填写任何字符,那就不检测
				if (!value) {
					resolve();
				}
				const regExp = /^\w+@[a-z0-9]+\.[a-z]{2,4}$/;
				if (!regExp.test(value)) {
					reject(Error('邮箱格式不对'));
				}
				resolve();
			});
		}
	},
	phone    : {
		required : false,
		trigger  : ['input', 'blur'],
		asyncValidator(rule: FormItemRule, value: string, callback: (error?: Error) => void) {
			return new Promise<void>((resolve, reject) => {
				if (!value) {
					resolve();
				}
				if (11 !== !value.length) {
					reject(Error('长度是11个数字'));
				}
				resolve();
			});
		}
	},
	idCard   : {
		required : true,
		trigger  : ['input', 'blur'],
		asyncValidator(rule: FormItemRule, value: string, callback: (error?: Error) => void) {
			return new Promise<void>((resolve, reject) => {
				if (!value) {
					reject(Error('请输入身份证号'));
				}
				if (18 !== !value.length) {
					reject(Error('长度是18个字符'));
				}
				resolve();
			});
		}
	},
	remark   : {
		required : false
	}
});
const uploadFile = reactive({});
onMounted(() => {
	initData();
});
const initData = () => {
	axios({
		method : 'POST',
		url    : '/user/selfInfoFromDataBase'
	}).then((jsonResult: unknown) => {
		if (jsonResult['status']) {
			Object.assign(showUserInfo, jsonResult['data']);
			Object.assign(formData, jsonResult['data']);
		} else {
			VXETable.modal.message({ content : jsonResult['msg'], status : 'warning', id : 'failedMessage' });
		}
	}).catch((errorObj: unknown) => {
		console.error(errorObj);
		VXETable.modal.message({ content : '系统异常,请稍后再试', status : 'error', id : 'errorMessage' });
	});
};
const upLoadAvatar = (file: unknown) => {
	if ((file['size'] > 1024000 * 2)) {
		VXETable.modal.message({
			content : `${file['name']}太大`,
			status  : 'warning',
			id      : `fileSizeTooLargeMessage${file['name']}`
		});
	} else if (0 >= file['size']) {
		VXETable.modal.message({
			content : `${file['name']}内容为空`,
			status  : 'warning',
			id      : `fileSizeIsEmptyMessage${file['name']}`
		});
	} else {
		/*uploadFile = {
		 file     : file,
		 fileName : file['name'],
		 fileSize : file['size']
		 };*/
	}
	const data = new FormData();
	data.append('file', uploadFile['file'], uploadFile['name']);
	axios({
		method  : 'POST',
		url     : '/fjgl/uploadFile',
		headers : { 'Content-Type' : 'multipart/form-data' },
		data    : data
	}).then((jsonResult: unknown) => {
		if (jsonResult['status']) {
			formData['pictureKey'] = jsonResult['data']['pictureKey'];
			formData['pictureStr'] = jsonResult['data']['pictureStr'];
		} else {
			VXETable.modal.message({ content : jsonResult['msg'], status : 'warning', id : 'failedMessage' });
		}
		// uploadFile = null;
	}).catch((errorObj: unknown) => {
		console.error(errorObj);
		VXETable.modal.message({ content : '系统异常,请稍后再试', status : 'error', id : 'errorMessage' });
		// uploadFile = null;
	});
	return false;
};
const submit = () => {
	userInfoFormRef.value.validate(errors => {
		if (!errors) {
			axios({
				method : 'POST',
				url    : '/user/onlyUpdateUserInfo',
				data   : formData
			}).then((jsonResult: unknown) => {
				if (jsonResult['status']) {
					VXETable.modal.message({ content : jsonResult['msg'], status : 'success', id : 'successMessage' });
					nextTick(() => {
						initData();
					});
				} else {
					VXETable.modal.message({ content : jsonResult['msg'], status : 'warning', id : 'failedMessage' });
				}
			}).catch((errorObj: unknown) => {
				console.error(errorObj);
				VXETable.modal.message({ content : '系统异常,请稍后再试', status : 'error', id : 'errorMessage' });
			});
		}
	});
};
</script>
<style lang='scss' scoped>
.userInfoManager-container{
	height          :100%;
	width           :100%;
	border          :0;
	margin          :0;
	padding         :0;
	display         :flex;
	flex-direction  :row;
	flex-wrap       :nowrap;
	align-content   :center;
	justify-content :center;
	align-items     :center;
	.left{
		height          :100%;
		width           :25%;
		border          :0;
		margin          :0;
		padding         :0;
		display         :flex;
		flex-direction  :column;
		flex-wrap       :nowrap;
		align-content   :center;
		justify-content :flex-start;
		align-items     :center;
		.title{
			height          :10%;
			width           :100%;
			border          :0;
			margin          :0;
			padding         :0;
			display         :flex;
			text-align      :center;
			align-content   :center;
			align-items     :center;
			flex-direction  :row;
			flex-wrap       :nowrap;
			justify-content :center;
			span{
				border      :0;
				margin      :0;
				padding     :0;
				font-size   :1.5rem;
				font-weight :600;
			}
		}
		.avatar{
			height          :40%;
			width           :100%;
			border          :0;
			margin          :0;
			padding         :0;
			display         :flex;
			flex-direction  :row;
			flex-wrap       :nowrap;
			align-content   :center;
			justify-content :center;
			align-items     :center;
			.img{
				height  :95%;
				width   :95%;
				border  :0;
				margin  :0;
				padding :0;
			}
		}
		.info-list{
			height          :50%;
			width           :100%;
			border          :0;
			margin          :0;
			padding         :0;
			list-style-type :none;
			display         :flex;
			flex-direction  :column;
			flex-wrap       :nowrap;
			align-content   :center;
			justify-content :flex-start;
			align-items     :stretch;
			li{
				font-size   :1.25rem;
				font-weight :400;
				text-align  :center;
			}
		}
	}
	.right{
		height  :100%;
		width   :75%;
		border  :0;
		margin  :0;
		padding :0;
		.title{
			height          :10%;
			width           :100%;
			border          :0;
			margin          :0;
			padding         :0;
			display         :flex;
			text-align      :center;
			align-content   :center;
			align-items     :center;
			flex-direction  :row;
			flex-wrap       :nowrap;
			justify-content :center;
			span{
				border      :0;
				margin      :0;
				padding     :0;
				font-size   :1.5rem;
				font-weight :600;
			}
		}
	}
}
</style>