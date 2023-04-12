import { VitePWA } from 'vite-plugin-pwa';
export function setupVitePwa() {
	return VitePWA({
		registerType  : 'autoUpdate',
		includeAssets : ['favicon.ico'],
		manifest      : {
			name        : 'GrayFaithAdmin',
			short_name  : 'GrayFaithAdmin',
			theme_color : '#FFFFFF',
			icons       : [
				{
					src   : '/favicon.png',
					sizes : '192x192',
					type  : 'image/png'
				},
				{
					src   : '/favicon.png',
					sizes : '512x512',
					type  : 'image/png'
				},
				{
					src     : '/favicon.png',
					sizes   : '512x512',
					type    : 'image/png',
					purpose : 'any maskable'
				}
			]
		},
		// 自定义缓存名称 
		cacheId : 'vite-pwa-cache',
		// 忽略html后面的参数，缓存有参数的html 
		ignoreURLParametersMatching : [/.*!/],
		// 增加一些文件的缓存
		globPatterns : ['**/*.{js,css,html,png,jpg,jpeg,gif,svg,ico,woff,woff2,ttf,eot}'],
		// 不设置回退url，依照实际情况配置
		navigateFallback : null,
		selfDestroying   : true
	});
}