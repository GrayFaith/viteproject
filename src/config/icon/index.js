// 全局注册svg-icon
import index from '@/config/vue';
import { defineAsyncComponent } from 'vue';
import 'virtual:svg-icons-register';
index.vue.component('SvgIcon', defineAsyncComponent(() => import('@/components/customComponents/icon/SvgIcon.vue')));
index.vue.component('ClassIcon', defineAsyncComponent(() => import('@/components/customComponents/icon/ClassIcon.vue')));