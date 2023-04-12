<template>
	<div class='componentNotFound_container'>
		<n-result status='500' title='500 服务器错误' description='可能该雇更多程序员了'>
			<template #footer>
			</template>
		</n-result>
	</div>
</template>
<style lang='scss' scoped>
.componentNotFound_container{
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