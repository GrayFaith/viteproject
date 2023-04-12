<template>
	<n-config-provider :theme='theme' :locale='locale' :date-locale='dateLocale'
					   preflight-style-disabled>
		<router-view/>
		<n-global-style/>
	</n-config-provider>
</template>
<script lang='ts' setup>
import { computed } from 'vue';
// 主题皮肤,语言和日期语言
import { lightTheme, darkTheme, dateZhCN, zhCN } from '@/config/naive-ui/index.js';
import { pinia } from '@/config/store/index.ts';
import { useCommonStore } from '@/config/store/common.store.ts';
const commonStore = useCommonStore(pinia);
const theme = computed(() => {
	switch (commonStore.theme) {
		case 'light':
			return lightTheme;
		case 'dark':
			return darkTheme;
		default:
			return lightTheme;
	}
});
const locale = zhCN;
const dateLocale = dateZhCN;
</script>
<style lang='scss'>
.n-config-provider{
	box-sizing :border-box;
	margin     :0;
	padding    :0;
	border     :0;
	height     :100vh;
	width      :100vw;
}
/*滚动条样式*/
::-webkit-scrollbar{
	display :block;
	width   :6px;
	height  :6px;
}
::-webkit-scrollbar-thumb{
	display            :block;
	box-shadow         :inset 0 0 6px rgba(76, 88, 112, .8);
	-webkit-box-shadow :inset 0 0 6px rgba(76, 88, 112, .8);
	border-radius      :1rem;
	background-color   :rgba(76, 88, 112, .8);
}
::-webkit-scrollbar-track{
	display            :none;
	-webkit-box-shadow :inset 0 0 5px rgba(0, 0, 0, .1);
	border-radius      :0;
	background         :rgba(0, 0, 0, 0.1);
	&:hover{
		display :block;
	}
}
</style>