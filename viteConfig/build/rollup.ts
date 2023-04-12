export function setupRollup() {
	return {
		output : {
			format  : 'es',
			compact : true,
			// 静态资源打包做处理
			chunkFileNames : 'static/chunk/[name]-[hash].js',
			entryFileNames : 'static/entry/[name]-[hash].js',
			assetFileNames : 'static/asset/[name]-[hash].[ext]',
			generatedCode  : {
				arrowFunctions : true,
				constBindings  : true
			},
			// 生成包后会重新检验包是否可用
			validate : true,
			// 手动拆分所有依赖包
			manualChunks(id) {
				// 可以手动拆包装包
				/*if (id.includes('vxe-table')) {
				 // node_modules/|vxe-table/es/tooltip/index.js
				 const arr = id.toString().split('node_modules/')[1];
				 // vxe-table/es/icon/style/iconfont.1676040467680.ttf
				 // vxe-table/es/icon/style/iconfont.1676040467680.woff
				 // vxe-table/lib/locale/lang/zh-CN.js
				 // vxe-table/es/button/index.js-214d66c2.js
				 console.log(arr);
				 if (arr) {
				 // vxe-table/es/button/src/button.js-dc3ea67d.js
				 if (arr.includes('src')) {
				 // vxe-table/es/button/button.js-dc3ea67d.js
				 return arr.split('/src/')[0];
				 } else {
				 // 不包含src/和style/路径的直接打包在一起
				 if (!arr.includes('src/')
				 && !arr.includes('style/')
				 && !arr.includes('lib/')) {
				 return 'vxe-table/index';
				 } else if (arr.includes('lib/locale/lang')) {
				 // 语言文件
				 return 'vxe-table/lang';
				 } else if (arr.includes('/es/icon/style/iconfont')) {
				 return;
				 }
				 return arr;
				 }
				 }
				 }*/
				if (id.includes('node_modules')) {
					return id.toString().split('node_modules/')[1].split('/')[0].toString();
				}
			}
		}
	};
}