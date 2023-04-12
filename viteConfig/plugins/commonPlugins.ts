import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Components from 'unplugin-vue-components/vite';
import ElementPlus from 'unplugin-element-plus/vite';
import Icons from 'unplugin-icons/vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';
export function setupCommonPlugins() {
	return [
		vue(),
		vueJsx(),
		AutoImport({
			eslintrc  : {
				enabled : false
			},
			resolvers : [
				// 自动导入图标
				IconsResolver({
					prefix : 'Icon'
				})
			]
		}),
		Components({
			resolvers : [
				// 自动注册图标
				IconsResolver({
					enabledCollections : ['ep']
				})
			]
		}),
		// element+自动按需导入
		ElementPlus({
			useSource     : true,
			format        : 'esm',
			defaultLocale : 'zh-cn'
		}),
		Icons({
			autoInstall : true
		}),
		createSvgIconsPlugin({
			// 指定需要缓存的图标文件夹
			iconDirs : [
				path.resolve(process.cwd(), 'src/assets/icons/svg'),
				path.resolve(process.cwd(), 'node_modules/@sicons/ionicons5')
			],
			// 指定symbolId格式
			symbolId : 'icon-[name]'
		})
	];
}