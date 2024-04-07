import request from '@/utils/request'
import {UserInfo } from './types'
/**
 * User Api
 */
export function UserApi() {
	return {
		addUser: (data: UserInfo) => {
			return request({
				url: '/api/v1/fullstructure/synthesize/features/recognition',
				method: 'post',
				data,
			});
		},
		getDevices: (params?: object) => {
			return request({
				url: '/nebula/vap/api/v1/device/query',
				method: 'get',
				params,
			});
		},
	};
}
