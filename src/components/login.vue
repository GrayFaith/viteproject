<template>
	<div class='login_container'>
		<div class='flex_center'>
			<div class='login_panel'>
				<div class='flex_center'>
					<div class='login_form'>
						<div class='please_login_text'>
							<h4>
								<!--<img alt='logo' src='../assets/login/images/logo.png'/>-->
								<!--嗷呜喵管理系统-->
							</h4>
							<span>
								欢迎登录
							</span>
						</div>
						<n-form
							ref='naiveForm'
							v-bind='formConfig' :model='formData' :rules='formRules'>
							<n-grid
								:x-gap='24' :y-gap='24' :cols='1'
								layout-shift-disabled>
								<n-form-item label='' path='userName'>
									<n-input
										v-model:value='formData["userName"]'
										size='medium' placeholder='用户名' type='text'
										round clearable>
										<template #prefix>
											<i class='fa fa-user'/>
										</template>
									</n-input>
								</n-form-item>
								<n-form-item label='' path='password'>
									<n-input
										v-model:value='formData["password"]'
										show-password-on='click'
										size='medium' placeholder='密码' type='password'
										round clearable>
										<template #prefix>
											<i class='fa fa-lock'/>
										</template>
									</n-input>
								</n-form-item>
								<n-space justify='center'>
									<n-button :loading='isLoading' round strong
											  size='medium' type='warning' @click='login'>
										登录
									</n-button>
									<n-button round strong secondary
											  size='medium' type='tertiary'>
										重置
									</n-button>
								</n-space>
							</n-grid>
						</n-form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang='ts' setup>
/*分段式加载*/
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from '@/config/axios';
/*图标*/
import 'font-awesome/css/font-awesome.min.css';
/*vxe-table*/
import '@/config/vxe-table/index.ts';
import VXETable from '@/config/vxe-table/modal.ts';
import { formProps } from '@/config/naive-ui/index.js';
import { FormRules } from 'naive-ui/es/form/src/interface.js';
const router = useRouter();
const isLoading = ref(false);
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
const formData = reactive({
	userName : '',
	password : ''
});
const formRules = reactive<FormRules>({
	userName : {
		required : true,
		trigger  : ['input', 'blur'],
		message  : '请输入用户名'
	},
	password : {
		required : true,
		trigger  : ['input', 'blur'],
		message  : '请输入密码'
	}
});
const naiveForm = ref();
const login = () => {
	isLoading.value = true;
	sessionStorage.removeItem('x-auth-token');
	axios({
		method : 'POST',
		url    : '/user/login',
		data   : formData
	}).then((jsonResult: unknown) => {
		if (jsonResult['status']) {
			if (jsonResult['isRedirect']) {
				// 用户登录成功
				// 获取到地址后通过route跳转到首页
				router.push('/index');
			}
		} else {
			this.isLoading = false;
			VXETable.message({
				content : jsonResult['msg'],
				status  : 'warning',
				id      : 'doLoginFailed'
			});
		}
	}).catch((error: unknown) => {
		isLoading.value = false;
		console.error(error);
		VXETable.modal.message({
			content : '系统异常,请稍后再试',
			status  : 'error',
			id      : 'doLoginError'
		});
	});
};
</script>
<style lang='scss' scoped>
h4{
	font-size     :30px;
	font-weight   :unset;
	line-height   :1.5;
	margin-top    :0;
	margin-bottom :.5rem;
	color         :#CB151E;
	text-shadow   :1px 1px 6px rgba(96, 98, 102, .8);
}
.login_container{
	margin                :0;
	padding               :0;
	border                :0;
	height                :100%;
	width                 :100%;
	box-sizing            :border-box;
	overflow              :hidden;
	/*background-image      :url('../assets/login/images/bg1.png');*/
	background-attachment :fixed;
	background-repeat     :no-repeat;
	background-size       :100% 100%;
	position              :relative;
	/*z-index               :0;*/
	.flex_center{
		margin          :0;
		padding         :0;
		border          :0;
		height          :100%;
		width           :100%;
		box-sizing      :border-box;
		display         :flex;
		align-items     :center;
		justify-content :center;
		flex-wrap       :nowrap;
		flex-direction  :row;
		align-content   :center;
		.login_panel{
			margin     :0;
			padding    :0;
			border     :0;
			height     :100%;
			width      :calc(100% - 70%);
			text-align :center;
			.flex_center{
				margin          :0;
				padding         :0;
				border          :0;
				height          :100%;
				width           :100%;
				display         :flex;
				align-items     :center;
				flex-direction  :column;
				flex-wrap       :nowrap;
				align-content   :center;
				justify-content :center;
				.login_form{
					margin           :0;
					padding          :0;
					border           :0;
					width            :100%;
					box-shadow       :1px 1px 6px 3px rgba(96, 98, 102, .8);
					background-color :rgba(255, 255, 255, .3);
					border-radius    :8px;
					display          :flex;
					align-items      :center;
					flex-direction   :column;
					flex-wrap        :nowrap;
					align-content    :center;
					justify-content  :center;
					.please_login_text{
						margin        :0;
						padding       :0;
						border        :0;
						width         :100%;
						font-size     :25px;
						color         :#4B4848;
						font-weight   :bolder;
						border-bottom :#4B4848 3px solid;
					}
					.n-form{
						box-sizing :border-box;
						margin     :0;
						padding    :2% 5% 2%;
						border     :0;
						width      :100%;
						height     :100%;
					}
				}
			}
		}
	}
}
</style>