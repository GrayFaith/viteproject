import { visualizer } from 'rollup-plugin-visualizer';
export function setupVisualizer() {
	return visualizer({
		emitFile   : true,
		filename   : 'stats.html',
		open       : true,
		gzipSize   : true,
		brotliSize : true
	});
}