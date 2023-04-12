import { defineConfig, loadEnv } from 'vite';
import viteBasicSslPlugin from '@vitejs/plugin-basic-ssl';
import {
	setupCommonPlugins, setupCompress, setupPostcss, setupRollup, setupServer, setupTerser, setupVisualizer,
	setupVitePwa
} from './viteConfig';
// 详细请查看https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig((configEnv) => {
	// 可以获取当前系统运行环境变量
	// const systemEnv = loadEnv(configEnv['mode'], configEnv['command'],'');
	// 可以获取当前目录下的环境变量
	const env = loadEnv(configEnv['mode'], process.cwd());
	console.log(`正在使用[${configEnv['mode']}]模式`);
	console.log(env);
	const config = {
		// 重新定义index.html的初始位置
		/*root      : `${process.cwd()}/public/`,*/
		base      : './',
		publicDir : 'public',
		appType   : 'spa',
		cacheDir  : `${process.cwd()}/viteCache/`,
		// 预览地址
		server  : setupServer(),
		resolve : {
			alias : {
				'@' : '/src/'
			}
		},
		// CSS处理
		css     : {
			devSourcemap : true,
			modules      : {
				scopeBehaviour : 'global',
				// 局部变量转换
				localsConvention : null
			}
		},
		plugins : setupCommonPlugins(),
		build   : {
			cssTarget                : 'chrome61',
			outDir                   : 'dist',
			assetsInlineLimit        : 512,
			cssCodeSplit             : true,
			manifest                 : true,
			rollupOptions            : setupRollup(),
			reportCompressedSize     : false,
			chunkSizeWarningLimit    : 200,
			commonjsOptions          : {},
			dynamicImportVarsOptions : {}
		},
		// 开发模式下会预构建模块
		optimizeDeps : {
			include : [
				// 因为手动按需导入View-UI-Plus的原因,必须手动预构建下列两样依赖,精确到文件!
				'popper.js/dist/umd/popper.js',
				'element-resize-detector'
			]
		}
	};
	if ('development' === configEnv['mode']) {
		// 开发模式配置
		// 开发模式下使用esbuild优化器,提升调试速度,甚至可以关闭
		config['build']['minify'] = 'esbuild';
		// 开发模式下打开sourcemap以提升开发体验
		config['build']['sourcemap'] = 'inline';
		config['plugins'].push(viteBasicSslPlugin());
	} else if ('production' === configEnv['mode']) {
		// 生产模式配置
		// 生产模式下需要优化CSS的体积
		config['css']['postcss'] = setupPostcss();
		// 生产模式下使用terser优化器,极致缩小JS体积
		config['build']['minify'] = 'terser';
		// 生产模式下不写出sourcemap以降低体积
		config['build']['sourcemap'] = false;
		// 提供给terser优化器的参数
		config['build']['terserOptions'] = setupTerser();
		// 生产模式下需要压缩项目的体积
		// 使用br仅支持https模式下使用
		// 使用gzip兼容性更好,且支持非https模式
		config['plugins'].push(setupCompress());
		// 生产模式下启用打包视图,用于分析打包之后的区块
		config['plugins'].push(setupVisualizer());
		// 生产模式下启用pwa,用于优化浏览器缓存机制
		config['plugins'].push(setupVitePwa());
	}
	return config;
});