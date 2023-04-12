<template>
	<!--修改密码模态框-->
	<vxe-modal
		id='userModifyPasswordModal'
		v-bind='modalConfig' @close='closeModal'>
		<template v-slot:title>
			<a>
				{{ modalConfig['title'] }}
			</a>
		</template>
		<n-form ref='formRef' v-bind='formConfig' :model='formData'>
			<n-grid
				:x-gap='24' :y-gap='24' :cols='1'
				layout-shift-disabled>
				<n-form-item label='旧密码' path='oldPassword'>
					<n-input
						v-model:value='formData["oldPassword"]'
						type='password' show-password-on='click' clearable/>
				</n-form-item>
				<n-form-item label='新密码' path='newPassword'>
					<n-input
						v-model:value='formData["newPassword"]'
						type='password' show-password-on='click' clearable/>
				</n-form-item>
				<n-form-item label='确认新密码' path='rePassword'>
					<n-input
						v-model:value='formData["rePassword"]'
						type='password' show-password-on='click' clearable/>
				</n-form-item>
				<n-space justify='center'>
					<n-button round strong type='info'
							  @click='submitEvent'>
						提交修改
					</n-button>
				</n-space>
			</n-grid>
		</n-form>
	</vxe-modal>
</template>
<script lang='ts' setup>
import { nextTick, ref, reactive } from 'vue';
import axios from '@/config/axios';
import { useRouter } from 'vue-router';
import '@/config/vxe-table/index.ts';
import VXETable from '@/config/vxe-table/modal.ts';
import {
	FormInst, FormItemInst, FormItemRule, FormRules, FormValidationError
} from 'naive-ui/es/form/src/interface.d.ts';
import { pinia } from '@/config/store/index.ts';
import { useCommonStore } from '@/config/store/common.store.ts';
const commonStore = useCommonStore(pinia);
const router = useRouter();
// 用户密码修改模态框配置
const modalConfig = reactive({
	modelValue : false,
	title      : '',
	width      : '',
	height     : '',
	showClose  : true
});
const formConfig = reactive({
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
	validateMessages     : undefined,
	// 表单校验规则
	rules : reactive<FormRules>({
		oldPassword : {
			required : true,
			trigger  : ['input', 'blur'],
			message  : '请输入旧密码'
		},
		newPassword : {
			required : true,
			trigger  : ['input', 'blur'],
			asyncValidator(rule: FormItemRule, value: string, callback: (error?: Error) => void) {
				const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[1-9])(?=.*[^a-zA-Z0-9]).{8,20}$/;
				return new Promise<void>((resolve, reject) => {
					if (!value) {
						reject(Error('请输入新密码'));
					}
					if (8 > value.length || 20 < value.length) {
						reject(Error('密码长度为8-20位'));
					}
					if (!passwordReg.test(value)) {
						// 新密码不符合规定
						reject(Error('密码必须包含数字、大小写字母、特殊字符'));
					}
					if (formData['oldPassword'] === value) {
						// 判断新旧密码是否一致
						reject(Error('新密码不能与旧密码一致,请重新输入'));
					}
					resolve();
				});
			}
		},
		rePassword  : {
			required : true,
			trigger  : ['input', 'blur'],
			asyncValidator(rule: FormItemRule, value: string, callback: (error?: Error) => void) {
				return new Promise<void>((resolve, reject) => {
					if (!value) {
						reject(Error('请再输入一遍新密码'));
					}
					// 判断新密码与确认密码是否一致;
					if (!(value === formData['newPassword'])) {
						reject(Error('两次输入的新密码不一致'));
					}
					resolve();
				});
			}
		}
	})
});
// 表单绑定数据
const formData = reactive({
	oldPassword : '',
	newPassword : '',
	rePassword  : ''
});
const formRef = ref<FormInst | null>();
const showForceChangePasswordModal = () => {
	resetEvent();
	Object.assign(modalConfig,
		{
			modelValue : true,
			height     : '380',
			width      : '500',
			title      : '强制修改密码',
			showClose  : false
		});
};
const showModal = () => {
	resetEvent();
	Object.assign(modalConfig,
		{
			modelValue : true,
			height     : '380',
			width      : '500',
			title      : '修改密码',
			showClose  : true
		});
};
const closeModal = ({ type, $event }: { type: unknown, $event: unknown }) => {
	// TODO 清除校验状态
	formRef.value.restoreValidation();
	modalConfig['modelValue'] = false;
};
const resetEvent = () => {
	Object.assign(formData, {
		// 旧密码
		oldPassword : '',
		// 新密码
		newPassword : '',
		// 确认新密码
		rePassword : ''
	});
};
// 修改密码
const submitEvent = () => {
	// 表单校验
	formRef.value?.validate((errors) => {
		if (!errors) {
			axios({
				method : 'POST',
				url    : '/user/changePassword',
				data   : formData
			}).then(jsonResult => {
				if (jsonResult['status']) {
					VXETable.modal.message({ content : jsonResult['msg'], status : 'success', id : 'successMessage' });
					modalConfig['modelValue'] = false;
					// 用户修改密码成功
					// 退出,重新登录
					nextTick(() => {
						commonStore.emptyStore();
						router.push('/login');
					});
				} else {
					VXETable.modal.message({ content : jsonResult['msg'], status : 'warning', id : 'modifyPSDFailed' });
				}
			}).catch((errorObj: unknown) => {
				console.error(errorObj);
				VXETable.modal.message({ content : '系统异常,请稍后再试', status : 'error', id : 'errorMessage' });
			});
		}
	});
};
// 暴露方法
defineExpose({ showModal, showForceChangePasswordModal });
</script>