<template>
	<i :style='{width:width,height:height,fontSize:fontSize}' :class='iconName'/>
</template>
<script lang='ts' setup>
import { computed } from 'vue';
const props = defineProps({
	iconClass : {
		type     : String,
		required : true
	},
	width     : {
		type    : String,
		require : false,
		default : '1em'
	},
	height    : {
		type    : String,
		require : false,
		default : '1em'
	},
	fontSize  : {
		type    : String,
		require : false,
		default : 'inherit'
	}
});
const iconName = computed(() => `class_icon ${props.iconClass}`);
</script>
<style lang='scss' scoped>
.class_icon{
	vertical-align :-0.15em;
	fill           :currentColor;
	overflow       :hidden;
}
</style>