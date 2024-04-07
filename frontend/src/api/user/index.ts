import request from '@/utils/request'
import {UserInfo } from './types'
/**
 * User Api
 */
export function UserApi() {
	return {
		addUser: (data: UserInfo) => {
			return request({
				url: '/api/add',
				method: 'post',
				data,
			});
		},
		getUsers: (params?: object) => {
			return request({
				url: '/api/list',
				method: 'get',
				params,
			});
		},
	};
}
