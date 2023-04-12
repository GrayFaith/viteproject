<template>
	<div class='_404_container'>
		<n-result status='404' title='404 组件不存在' description='请联系开发工程师'>
			<template #footer>
			</template>
		</n-result>
	</div>
</template>
<style lang='scss' scoped>
._404_container{
	box-sizing      :border-box;
	height          :100%;
	width           :100%;
	border          :0;
	padding         :0;
	margin          :0;
	font-family     :'楷体', 'Microsoft YaHei', '微软雅黑', Arial, '文泉驿正黑', serif;
	display         :flex;
	flex-direction  :column;
	flex-wrap       :nowrap;
	align-content   :center;
	justify-content :center;
	align-items     :center;
}
</style>