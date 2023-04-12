import axios from 'axios';
import router from '@/config/router';
axios['defaults']['timeout'] = 240000;
axios['defaults']['headers']['get']['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios['defaults']['headers']['post']['Content-Type'] = 'application/json;charset=UTF-8';
axios['defaults']['headers']['put']['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios['defaults']['headers']['delete']['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios['defaults']['baseURL'] = '/api';
// 添加请求拦截器
axios['interceptors']['request'].use(
	(config: unknown) => {
		// 在第一次请求的时候(登录),是不会拥有x-auth-token的,必须第一次请求过后服务器才会分配一个
		// 每次请求/user/login地址的时候直接清空掉x-auth-token
		if ('/user/login' === config['url']) {
			delete config['headers']['x-auth-token'];
		} else {
			config['headers']['x-auth-token'] = sessionStorage.getItem('x-auth-token');
		}
		return config;
	},
	(error: unknown) => {
		return Promise.reject(error);
	}
);
// 添加响应拦截器
axios['interceptors']['response'].use(
	(response: unknown) => {
		if (200 === response['status']) {
			if ('pleaseLogin' === response['data']) {
				if ('/login' !== router['currentRoute']['value']['fullPath']) {
					router.push('/login');
				}
				return {
					status     : false,
					isRedirect : true,
					location   : '/login',
					msg        : '请先登录!'
				};
			}
			// 每次获取服务器的响应的时候都需要将x-auth-token(无论认证与否)存放到4种请求方式的head中
			// 如果存在的话才放入sessionStorage中
			// x-auth-token
			// TestMock-x-auth-token
			if (response['headers']['x-auth-token']) {
				sessionStorage.setItem('x-auth-token', response['headers']['x-auth-token']);
			}
			return response['data'];
		}
		return response['data'];
	},
	(error: unknown) => {
		return Promise.reject(error);
	}
);
export default axios;