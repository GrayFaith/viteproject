import vitePluginCompression from 'vite-plugin-compression';
export function setupCompress() {
	return vitePluginCompression({
		ext                : '.gz',
		algorithm          : 'gzip',
		threshold          : 1024,
		deleteOriginFile   : false,
		verbose            : true,
		disable            : false,
		compressionOptions : {
			level : 9
		},
		info               : false,
		success            : () => {
			console.log('资源压缩完毕,点击爆炸');
		}
	});
}