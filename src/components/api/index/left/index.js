import axios from '@/config/axios/index.ts';
export function getDynamicRoutes() {
	return axios({
		method : 'POST',
		url    : '/menu/menuTreeByPermission'
	});
}