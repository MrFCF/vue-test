// 封装的axios请求
import axios from 'axios'
import {
	Message,
	Loading
} from 'element-ui';

const api = 'https://api.apiopen.top/'
axios.defaults.headers.post['content-Type'] = 'application/json;charset=UTF-8';

// 自定义判断元素类型JS
function toType(obj) {
	return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
/** 参数过滤函数*/
function filterNull(o) {
	for (var key in o) {
		if (o[key] === null) {
			delete o[key]
		}
		if (toType(o[key]) === 'string') {
			o[key] = o[key].trim()
		} else if (toType(o[key]) === 'object') {
			o[key] = filterNull(o[key])
		} else if (toType(o[key]) === 'array') {
			o[key] = filterNull(o[key])
		}
	}
	return o
}
/**添加headers,可以动态添加header参数*/
function setHeaders(headers) {
	axios.defaults.headers.school_id = headers.school_id;
	axios.defaults.headers.token = headers.token;
}

function apiAxios(method, url, headers, params, success, failure) {
	// 创建遮罩层
	let loadingInstance = Loading.service({
		fullscreen: true,
		lock: true,
		text: 'Loading',
		spinner: 'el-icon-loading',
		background: 'rgba(0, 0, 0, 0.7)',
	});
	if (headers) {
		headers = filterNull(headers);
		setHeaders(headers)
	}
	if (params) {
		params = filterNull(params)
	}

	axios({
			method: method,
			url: url,
			data: method === 'GET' || method === 'PUT' ? params : null,
			params: method === 'POST' || method === 'DELETE' ? params : null,
			baseURL: api,
			withCredentials: false
		})
		.then(function(res) {
			// 关闭遮罩层
			loadingInstance.close();
			// 判断返回的状态码是否成功
			if (res.data.code === 200) {
				if (success) {
					// 登录成功显示提示信息
					Message.success({
						message: '登录成功'
					})
					//使用success(data)方法
					success(res.data)
				} else {
					failure(res.data)
				}
			} else {
				Message({
					type: 'error',
					message: res.data.message
				})
			}
		})
		.catch(function(err) {
			let res = err.response
			if (err) {
				// 提示报错信息
				window.alert('api error, HTTP CODE: ' + res.data.message)
			}
		})
}

// 返回在vue模板中的调用接口
export default {
	get: function(url, headers, params, success, failure) {
		return apiAxios('GET', url, headers, params, success, failure)
	},
	post: function(url, headers, params, success, failure) {
		return apiAxios('POST', url, headers, params, success, failure)
	},
	put: function(url, headers, params, success, failure) {
		return apiAxios('PUT', url, headers, params, success, failure)
	},
	delete: function(url, headers, params, success, failure) {
		return apiAxios('DELETE', url, headers, params, success, failure)
	}
}
