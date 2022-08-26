export default{
	namespaced:true,
	state:() =>({
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		// token: uni.getStorageSync('token') || '',
		token:'',
		// 用户的信息对象
		userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}') 
	}),
	mutations:{
		updateAddress(state,address){
			state.address = address
			this.commit('m_user/saveAddressToStorage')
		},
		// 持续话存储address
		saveAddressToStorage(state){
			uni.setStorageSync('address',JSON.stringify(state.address))
		},
		// 更行用户信息
		updateUserInfo(state,userinfo){
			 state.userinfo = userinfo
			 this.commit('m_user/saveUserInfoStroage')
			 
		},
		// 持久化存储userinfo
		saveUserInfoStroage(state){
			uni.setStorageSync('userinfo',JSON.stringify(state.userinfo))
		},
		// 更新 token 字符串
		updateToken(state, token) {
		state.token = token
		// 通过 this.commit() 方法，调用 m_user 模块下的 saveTokenToStorage 方法，
		// 将 token 字符串持久化存储到本地
		this.commit('m_user/saveTokenToStorage')
		},
		// 将 token 字符串持久化存储到本地
		saveTokenToStorage(state) {
		uni.setStorageSync('token', state.token)
		},
		
	},
	getters:{
		// 收货详细地址的计算属性
		addstr(state) {
		if (!state.address.provinceName) return ''
		// 拼接 省，市，区，详细地址 的字符串并返回给用户
		return state.address.provinceName + state.address.cityName +
		state.address.countyName + state.address.detailInfo
		}
	},
}