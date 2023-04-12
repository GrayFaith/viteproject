<template>
	<vxe-modal id='userMaintainAddModal' v-bind='modalConfig' @close='closeModal'>
		<template v-slot:title>
			<a>
				{{ modalConfig['title'] }}
			</a>
		</template>
		<vxe-form
			ref='formRef' v-bind='formConfig'
			:data='formData' :rules='formRules'
			@submit='submitEvent'>
			<vxe-form-gather span='24'>
				<vxe-form-item field='userName' span='12' title='用户名'>
					<template v-slot='{data}'>
						<vxe-input v-model='data["userName"]' clearable type='text'/>
					</template>
				</vxe-form-item>
				<vxe-form-item field='nickName' span='12' title='姓名'>
					<template v-slot='{data}'>
						<vxe-input v-model='data["nickName"]' clearable type='text'/>
					</template>
				</vxe-form-item>
				<vxe-form-item field='phone' span='12' title='手机号码'>
					<template v-slot='{data}'>
						<vxe-input v-model='data["phone"]' clearable type='text'/>
					</template>
				</vxe-form-item>
				<vxe-form-item field='eMail' span='12' title='邮箱'>
					<template v-slot='{data}'>
						<vxe-input v-model='data["eMail"]' clearable type='text'/>
					</template>
				</vxe-form-item>
				<vxe-form-item field='address' span='12' title='地址'>
					<template v-slot='{data}'>
						<vxe-input v-model='data["address"]' clearable type='text'/>
					</template>
				</vxe-form-item>
				<vxe-form-item field='status' span='12' title='账号状态'>
					<template v-slot='{data}'>
						<vxe-select v-model='data["status"]' filterable clearable>
							<vxe-option label='请选择' value=''/>
							<template v-for='(item,index) in dict["userStatus"]'
									  :key='`userMaintain_addModal_userStatus_${index}`'>
								<vxe-option :label='item["label"]' :value='item["value"]'/>
							</template>
						</vxe-select>
					</template>
				</vxe-form-item>
				<vxe-form-item field='belongDept' span='12' title='归属部门'>
					<template v-slot='{data}'>
						<vxe-select v-model='data["belongDept"]' filterable clearable>
							<vxe-option label='请选择' value=''/>
							<template
								v-for='(item,index) in dict["shortDept"]'
								:key='`userMaintain_addModal_belongDept_${index}`'>
								<vxe-option :label='item["label"]' :value='item["value"]'/>
							</template>
						</vxe-select>
					</template>
				</vxe-form-item>
				<vxe-form-item field='idCard' span='12' title='身份证号'>
					<template v-slot='{data}'>
						<vxe-input v-model='data["idCard"]' clearable type='text'/>
					</template>
				</vxe-form-item>
				<vxe-form-item field='roleList' span='24' title='角色'>
					<template v-slot='{data}'>
						<vxe-select v-model='data["roleList"]' multiple filterable
									clearable>
							<template
								v-for='(item,index) in dict["userRole"]'
								:key='`userMaintain_addModal_userRole_${index}`'>
								<vxe-option
									:label='item["label"]' :value='item["value"]' :disabled='item["disabled"]'/>
							</template>
						</vxe-select>
					</template>
				</vxe-form-item>
				<vxe-form-item field='remark' span='24' title='备注'>
					<template v-slot='{data}'>
						<vxe-textarea v-model='data["remark"]'
									  :autosize='{minRows:3,maxRows:3}' clearable
									  maxlength='200' show-word-count/>
					</template>
				</vxe-form-item>
				<vxe-form-item span='24' align='right'>
					<template v-slot>
						<vxe-button content='提交' status='success' type='submit'/>
						<vxe-button content='重置' type='reset'/>
					</template>
				</vxe-form-item>
			</vxe-form-gather>
		</vxe-form>
	</vxe-modal>
</template>
<script lang='ts' setup>
import {
	ref, reactive,
	// 生命周期
	onMounted
} from 'vue';
// axios
import axios from '@/config/axios';
// 状态管理
import { useStore } from 'vuex';
// 模态框和打印组件
import '@/config/vxe-table/index.ts';
import VXETable from '@/config/vxe-table/modal.ts';
// 字典组件
import loadDict from '@/config/dictionary/dictionary.ts';
// 接收的参数
const props = defineProps({
	belongDept : {
		type    : [String],
		require : true,
		default : ''
	}
});
const emits = defineEmits(['initTable']);
// 预置的字典变量
const dict = reactive({});
// vuex变量
const store = useStore();
// 模态框的配置
const modalConfig = reactive({
	modelValue : false,
	title      : '',
	width      : '',
	height     : '',
	showClose  : true,
	resize     : true
});
// 表单配置
const formConfig = reactive({
	span          : 24,
	size          : 'medium',
	titleAlign    : 'center',
	titleWidth    : 100,
	titleColon    : true,
	titleOverflow : 'tooltip'
});
// 表单绑定数据
const formData = reactive({
	userName   : '',
	nickName   : '',
	phone      : '',
	eMail      : '',
	idCard     : '',
	address    : '',
	belongDept : '',
	status     : '',
	roleList   : [],
	remark     : ''
});
// 表单校验规则
const formRules = reactive({});
const formRef = ref();
onMounted(() => {
	// 加载字典
	loadDict(['userStatus', 'userRole', 'shortDept']).then((jsonResult: unknown) => {
		// 合并字典
		Object.assign(dict, jsonResult);
	});
});
const showModal = () => {
	resetEvent();
	// 添加当前选中的部门
	formData['belongDept'] = props['belongDept'];
	Object.assign(modalConfig,
		{
			modelValue : true,
			height     : '500',
			width      : '700',
			title      : '新增',
			showClose  : true
		});
};
const closeModal = () => {
	resetEvent();
	Object.assign(modalConfig,
		{
			modelValue : false,
			height     : '500',
			width      : '700',
			title      : '新增',
			showClose  : true
		});
};
const resetEvent = () => {
	// 清理表单数据
	Object.assign(formData, {
		userName   : '',
		nickName   : '',
		belongDept : '',
		phone      : '',
		eMail      : '',
		idCard     : '',
		address    : '',
		status     : '',
		roleList   : [],
		remark     : ''
	});
	// 去除表单校验提示
	formRef.value?.clearValidate();
};
const submitEvent = () => {
	// 提交数据
	axios({
		method : 'POST',
		url    : '/user/addUser',
		data   : formData
	}).then((jsonResult: unknown) => {
		if (jsonResult['status']) {
			// 提示用户
			VXETable.modal.message({
				content : jsonResult['msg'],
				status  : 'success',
				id      : 'successMessage'
			});
			// 刷新数据
			emits('initTable');
			closeModal();
		} else {
			VXETable.modal.message({
				content : jsonResult['msg'],
				status  : 'warning',
				id      : 'failedMessage'
			});
		}
	}).catch((error: unknown) => {
		console.error(error);
		VXETable.modal.message({
			content : '系统异常,请稍后再试',
			status  : 'error',
			id      : 'errorMessage'
		});
	});
};
// 导出方法
defineExpose({ showModal });
</script>