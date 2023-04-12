import axios from '@/config/axios';
import '@/config/vxe-table/index.ts';
import VXETable from '@/config/vxe-table/modal.ts';
export default function(type: string[]): Promise<unknown> {
	return new Promise((resolve) => {
		axios({
			method : 'POST',
			url    : 'sysDataDict/selectSysDataDictList',
			data   : type
		}).then((jsonResult: unknown): void => {
			if (jsonResult['status']) {
				const dict: unknown = {};
				for (const item of jsonResult['data']) {
					dict[item['type']] = item['dictionary'];
				}
				resolve(dict);
			} else {
				VXETable.modal.message({
					content : '字典加载失败',
					status  : 'warning',
					id      : 'failedMessage'
				});
			}
		}).catch((error: unknown) => {
			console.error(error);
			VXETable.modal.message({
				content : '网络异常,请稍后重试',
				status  : 'warning',
				id      : 'failedMessage'
			});
		});
	});
}