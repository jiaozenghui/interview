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
		updateUser: (id:any, data: UserInfo) => {
			return request({
				url: `/api/update/${id}`,
				method: 'put',
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
