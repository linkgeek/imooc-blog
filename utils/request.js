import store from '../store';

//const BASE_URL = 'http://192.168.18.70:6060/api';
const BASE_URL = 'http://127.0.0.1:6060/api';

function request({
	url,
	data,
	method
}) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + url,
			data,
			method,
			header: {
				Authorization: store.state.user.token
			},
			success: ({
				data
			}) => {
				if (data.success) {
					resolve(data);
				} else {
					uni.showToast({
						title: data.message,
						icon: 'none',
						mask: true,
						duration: 3000
					});
					reject(data.message);
				}
			},
			fail: (error) => {
				reject(error);
			},
			complete: () => {
				// 关闭加载
				uni.hideLoading();
			}
		});
	});
}

export default request;