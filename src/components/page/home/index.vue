<template>
	<div class='home_container'>
		<div class='top'>
			<div class='left'>
				<Suspense>
					<template v-slot>
						<!--<SystemNotice/>-->
						1
					</template>
					<template v-slot:fallback>
						<Loading2/>
					</template>
				</Suspense>
			</div>
			<div class='right'>
				<Suspense>
					<template v-slot>
						<!--木有东西-->1
					</template>
					<template v-slot:fallback>
						<Loading2/>
					</template>
				</Suspense>
			</div>
		</div>
		<div class='home_container_height'/>
		<div class='bottom'>
			<div class='left'><!--还是木有东西--></div>
			<div class='right'><!--嗷呜,你把东西藏哪了?--></div>
		</div>
	</div>
</template>
<script lang='ts' setup>
import { defineAsyncComponent, onDeactivated } from 'vue';
const Loading2 = defineAsyncComponent(() => import('@/components/customComponents/loading/Loading2.vue'));
const SystemNotice = defineAsyncComponent(() => import('@/components/page/home/systemNotice/SystemNotice.vue'));
/*'backlog'       : defineAsyncComponent(() => import('@/components/page/home/center/left/Backlog.vue')),
 'navMenu'       : defineAsyncComponent(() => import('@/components/page/home/center/right/navMenu.vue')),
 'line-charts'   : defineAsyncComponent(() => import('@/components/page/home/bottom/LineCharts.vue')),
 'pie-charts'    : defineAsyncComponent(() => import('@/components/page/home/bottom/PieCharts.vue'))*/
onDeactivated(() => {});
</script>
<style lang='scss' scoped>
.home_container{
	box-sizing            :border-box;
	margin                :0;
	padding               :.5%;
	border                :0;
	border-radius         :8px;
	height                :100%;
	width                 :100%;
	font-size             :20px;
	/*从左到右,从上到下*/
	display               :flex;
	flex-direction        :column;
	align-items           :flex-start;
	justify-content       :flex-start;
	flex-wrap             :nowrap;
	align-content         :flex-start;
	background-color      :rgba(229, 246, 253, .9);
	background-attachment :fixed;
	background-repeat     :no-repeat;
	background-size       :100% 100%;
	.home_container_height{
		height :1%;
		width  :100%;
	}
	.top{
		box-sizing      :border-box;
		margin          :0;
		padding         :0;
		border          :0;
		border-radius   :8px;
		height          :39.50%;
		width           :100%;
		/*background-color :rgba(255, 255, 255, .8);*/
		display         :flex;
		flex-direction  :row;
		justify-content :space-between;
		align-items     :center;
		flex-wrap       :nowrap;
		align-content   :center;
		.left{
			box-sizing    :border-box;
			margin        :0;
			padding       :0;
			border        :0;
			border-radius :8px;
			height        :100%;
			/*中间留空隙*/
			width         :49.75%;
		}
		.right{
			box-sizing       :border-box;
			margin           :0;
			padding          :.5%;
			border           :0;
			border-radius    :8px;
			height           :100%;
			/*中间留空隙*/
			width            :49.75%;
			background-color :rgba(255, 255, 255, .8);
		}
	}
	.bottom{
		box-sizing       :border-box;
		margin           :0;
		padding          :0;
		border           :0;
		border-radius    :8px;
		height           :59.50%;
		width            :100%;
		display          :flex;
		flex-direction   :row;
		justify-content  :space-between;
		align-items      :center;
		flex-wrap        :nowrap;
		align-content    :center;
		background-color :rgba(255, 255, 255, 0);
		.left{
			box-sizing       :border-box;
			margin           :0;
			padding          :.5%;
			border           :0;
			border-radius    :8px;
			height           :100%;
			width            :49.75%;
			background-color :rgba(255, 255, 255, .8);
		}
		.right{
			box-sizing       :border-box;
			margin           :0;
			padding          :.5%;
			border           :0;
			border-radius    :8px;
			height           :100%;
			width            :49.75%;
			background-color :rgba(255, 255, 255, .8);
		}
	}
}
/*滚动条样式*/
::-webkit-scrollbar{
	display :none;
}
::-webkit-scrollbar-thumb{
	display :none;
}
::-webkit-scrollbar-track{
	display :none;
}
</style>