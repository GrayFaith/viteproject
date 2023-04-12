<template>
	<Spin fix class='loading-spin-col'>
		<Icon type='ios-loading' size='20' class='loading-spin-icon-load'/>
		<div>加载中...</div>
	</Spin>
</template>
<style lang='scss' scoped>
.loading-spin-col{
	width    :100%;
	height   :100%;
	position :relative;
	border   :1px solid #EEEEEE;
	.loading-spin-icon-load{
		animation :ani-loading-spin 1s linear infinite;
	}
	@keyframes ani-loading-spin{
		from{
			transform :rotate(0deg);
		}
		50%{
			transform :rotate(180deg);
		}
		to{
			transform :rotate(360deg);
		}
	}
}
</style>