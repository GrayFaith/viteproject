/*main.ts不加载太多资源,这样会导致首屏加载奇迹般的缓慢*/
import index from '@/config/vue/index.ts';
/*高亮皮肤*/
//import highlightJS from 'highlight.js/lib/core';
//import xml         from 'highlight.js/lib/languages/xml.js';
//import json        from 'highlight.js/lib/languages/json.js';
//highlightJS.registerLanguage('xml', xml);
//highlightJS.registerLanguage('json', json);
//Vue.use(highlightJS.vuePlugin);
import { createApp, defineAsyncComponent } from 'vue';
const AppContainer = defineAsyncComponent(() => import( './App.vue'));
const app = createApp(AppContainer);
/*app.config.productionTip = 'development' === process.env.NODE_ENV;*/
import { pinia } from '@/config/store/index.ts';
app.use(pinia);
import router from '@/config/router/index.ts';
app.use(router);
// 挂载到.vue-container
app.mount('.vue-container');
// 保存变量
index.vue = app;