<template>
	<div class='_403_container'>
		<n-result status='403' title='403 你没有访问权限' description='请联系系统管理员添加'>
			<template #footer>
			</template>
		</n-result>
	</div>
</template>
<style lang='scss' scoped>
._403_container{
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