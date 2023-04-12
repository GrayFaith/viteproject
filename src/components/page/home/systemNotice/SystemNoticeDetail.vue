<template>
	<div class='system-notice-detail-container'>
		<div class='system-notice-detail-container-content'>
			<div class='system-notice-detail-container-header-content'>
				<h1>{{ systemNotice['title'] }}</h1>
				<span>发布日期:{{ systemNotice['releaseDate'] }}</span>
				<span>过期日期:{{ systemNotice['endDate'] }}</span>
				<span>发布人:<FormatText v-model='systemNotice["releaseUser"]' :dict='["fullUserOptions"]'/></span>
				<span>
					<vxe-button
						content='查看附件' round status='success'
						type='button' @click='showModal'/>
				</span>
			</div>
			<hr class='disableEvent style-two'>
			<div class='system-notice-detail-container-body'>
				<!--需要设置为不可编辑-->
				<!--<vue-editor v-model='systemNotice["htmlContent"]' :editor-toolbar='editorOption' disabled/>-->
				<Editor api-key='no-api-key' :init='tinymceOption'/>
			</div>
		</div>
	</div>
	<FileUpload ref='systemNoticeFileUpLoadRef'/>
</template>
<script lang='ts' setup>
import { defineAsyncComponent, reactive, ref, onMounted } from 'vue';
import axios from '@/config/axios';
import { useStore } from 'vuex';
import tinymce from 'tinymce/tinymce.js';
import Editor from '@tinymce/tinymce-vue/lib/cjs/main/ts/index.js';
import '@/static/tinymce/langs/zh-Hans.js';
import '@/static/tinymce/skins/ui/oxide/content.css';
import '@/static/tinymce/skins/ui/oxide/content.inline.css';
import '@/static/tinymce/skins/ui/oxide/skin.css';
import '@/static/tinymce/skins/ui/oxide/skin.shadowdom.css';
import '@/static/tinymce/skins/content/default/content.css';
import '@/static/tinymce/themes/silver/theme.js';
import '@/static/tinymce/icons/default/icons.js';
import '@/static/tinymce/models/dom/model.js';
// ------------------------------------------------------
import '@/static/tinymce/plugins/table/plugin.js';
import '@/static/tinymce/plugins/lists/plugin.js';
import '@/static/tinymce/plugins/wordcount/plugin.js';
import '@/static/tinymce/plugins/code/plugin.js';
import '@/config/vxe-table/index.ts';
import VXETable from '@/config/vxe-table/modal.ts';
const FormatText = defineAsyncComponent(() => import('@/components/customComponents/dict/FormatText.vue'));
const FileUpload = defineAsyncComponent(() => import('@/components/customComponents/fileUpLoad/FileUpLoad.vue'));
const props = defineProps({
	params : {
		type    : Object,
		require : true,
		default : () => {
			return {};
		}
	}
});
const store = useStore();
const tinymceOption = reactive({
	language : 'zh_CN',
	/*language_url          : 'static/tinymce/langs/zh-Hans.js',
	 skin_url              : 'static/tinymce/skins/ui/oxide',
	 content_css           : 'static/tinymce/skins/content/default/content.css',*/
	selector : '#tinymceEditor',
	/*plugins               : [
	 'advlist autolink lists link image charmap print preview anchor', 'searchreplace visualblocks code fullscreen',
	 'insertdatetime media table contextmenu paste code'
	 ],*/
	toolbar               : 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
	images_upload_handler : function(blobInfo, success, failure) { success(blobInfo.blobUri()); },
	images_upload_url     : ''
});
const systemNotice = reactive({
	id          : '',
	title       : '',
	releaseDate : '',
	endDate     : '',
	releaseUser : '',
	htmlContent : ''
});
const systemNoticeFileUpLoadRef = ref<unknown>();
onMounted(() => {
	tinymce.init({});
	initData();
});
const initData = () => {
	axios({
		method : 'POST',
		url    : `/notice/sysNoticeInfoById/${props['params']['id']}`
	}).then((jsonResult: unknown) => {
		if (jsonResult['status']) {
			Object.assign(systemNotice, jsonResult['data']);
		} else {
			VXETable.modal.message({ content : jsonResult['msg'], status : 'warning', id : 'failedMessage' });
		}
	}).catch((errorObj: unknown) => {
		console.error(errorObj);
		VXETable.modal.message({ content : '系统异常,请稍后再试', status : 'error', id : 'errorMessage' });
	});
};
const showModal = () => {};
</script>
<style lang='scss' scoped>
.system-notice-detail-container{
	box-sizing :border-box;
	margin     :0;
	padding    :50px;
	border     :0;
	height     :100%;
	width      :100%;
	font-size  :16px;
	.system-notice-detail-container-content{
		margin  :5px;
		padding :0;
		width   :100%;
		height  :12%;
		.system-notice-detail-container-header-content{
			text-align :center;
			margin     :20px;
			padding    :0;
			span{
				text-align :center;
				margin     :20px;
				padding    :0;
			}
		}
		.system-notice-detail-container-body{
			width :100%;
		}
	}
}
:deep(.ql-toolbar.ql-snow){
	border-width :0;
	box-sizing   :border-box;
	font-family  :'楷体', 'Microsoft YaHei', '微软雅黑', Arial, '文泉驿正黑', serif;
	padding      :8px;
}
:deep(.ql-container.ql-snow){
	border-width :0;
}
</style>