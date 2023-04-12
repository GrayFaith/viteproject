<template>
	<svg :style='{width:width,height:height,fontSize:fontSize}' aria-hidden='true' class='svg_icon'>
		<use :xlink:href='iconName'/>
	</svg>
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
const iconName = computed(() => `#icon-${props.iconClass}`);
</script>
<style lang='scss' scoped>
.svg_icon{
	font-size      :16px;
	vertical-align :-0.15em;
	fill           :currentColor;
	overflow       :hidden;
}
</style>