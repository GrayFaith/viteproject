<template>
	<div class='FileUpLoad_container'>
	</div>
</template>
<script lang='ts' setup>
const props = defineProps({
	params : {
		type    : Object,
		require : false
	}
});
</script>
<style scoped lang='scss'>
.FileUpLoad_container{
	padding    :0;
	margin     :0;
	border     :0;
	box-sizing :border-box;
	height     :100%;
	width      :100%;
}
</style>