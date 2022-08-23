import App from './App'
import store from '../uni-shop/store/store.js'
// #ifndef VUE3
import Vue from 'vue'
// 导入网络请求的包
import { $http } from '@escook/request-miniprogram'

// 在 uni-app 项目中，可以把 $http 挂载到 uni 顶级对象之上，方便全局调用
uni.$http = $http
// 这是请求更路径
$http.baseUrl = 'https://api-hmugo-web.itheima.net'

// 配置请求拦截器
$http.beforeRequest = function (options) {
	uni.showLoading({
		title:'数据加载中'
	})
}

// 配置响应拦截器
// 请求完成之后做一些事情
$http.afterRequest = function () {
  uni.hideLoading()
}

// 封装弹窗的方法
uni.$showMsg = function (title = '数据请求失败',duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon:'none'
	})
}
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
	
  }
}
// #endif