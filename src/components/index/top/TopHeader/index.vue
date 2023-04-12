<template>
	<div class='index-header-container'>
		<div class='index-header-container-left'>
			<Left/>
		</div>
		<div class='index-header-container-center'>
			<Center/>
		</div>
		<div class='index-header-container-right'>
			<Right/>
		</div>
	</div>
</template>
<script lang='ts' setup>
import { defineAsyncComponent } from 'vue';
const Left = defineAsyncComponent(() => import('@/components/index/top/TopHeader/Left.vue'));
const Center = defineAsyncComponent(() => import('@/components/index/top/TopHeader/Center.vue'));
const Right = defineAsyncComponent(() => import('@/components/index/top/TopHeader/Right.vue'));
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
		font-family  :'楷体', 'Microsoft YaHei', '微软雅黑', Arial, '文泉驿正黑', serif;
		height       :100%;
		width        :20%;
		overflow     :hidden;
		font-size    :34px;
		font-weight  :500;
		padding-left :20px;
		display      :flex;
		align-items  :center;
	}
	.index-header-container-center{
		height          :100%;
		width           :40%;
		padding         :0 1%;
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
		justify-content :space-evenly;
		align-items     :center;
		flex-direction  :row;
		flex-wrap       :nowrap;
		justify-items   :end;
		text-align      :center;
	}
}
</style>