export function setupServer() {
	return {
		host  : '0.0.0.0',
		port  : 8080,
		https : true,
		http2 : true,
		// 是否开启热更新
		hot : true,
		// 是否开启压缩
		compress : true,
		cors     : true,
		hmr      : true,
		proxy    : {
			'/api' : {
				/*target : 'http://127.0.0.1:4523/m1/2363213-0-default',*/
				target       : 'https://mock.apifox.cn/m1/2363213-0-default',
				changeOrigin : true,
				rewrite      : (path) => path.replace(/^\/api/, '')
			},
			'/ws'  : {
				/*target : 'http://127.0.0.1:4523/m1/2363213-0-default',*/
				target       : 'https://mock.apifox.cn/m1/2363213-0-default',
				changeOrigin : true,
				rewrite      : (path) => path.replace(/^\/ws/, '')
			}
		}
	};
}