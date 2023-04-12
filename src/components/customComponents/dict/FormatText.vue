<template>
	{{ dictLabel }}
</template>
<script lang='ts' setup>
import { computed } from 'vue';
import { showDictValueByKey } from '@/static/js/dict/format.js';
const props = defineProps({
	modelValue : {
		type    : String,
		require : true,
		default : ''
	},
	dict       : {
		type    : Array,
		require : true,
		default : () => []
	}
});
let dictLabel = computed(() => showDictValueByKey(props.dict, props.modelValue));
</script>