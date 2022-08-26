<template>
	<view>
	<view class="login-container">
	<!-- 提示登录的图标 -->
	<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
	<!-- 登录按钮 -->
	 <button type="primary" class="btn-login" @click="getUserProfile">一键登录</button>
	<!-- 登录提示 -->
	<view class="tips-text">登录后尽享更多权益</view>
	</view>
	</view>
</template>

<script>
	import {mapMutations} from 'vuex'
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		},
		methods:{
			...mapMutations('m_user',['updateUserInfo','updateToken']),
			// 用户授权之后，获取用户的基本信息
			  getUserProfile(e){
			              uni.getUserProfile({
			                desc: '用于完善个人资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
			                success: (res) => {
			                  // 3. 将用户的基本信息存储到 vuex 中
			                this.updateUserInfo(res.userInfo)
			                console.log(res);
			                // 获取登录成功后的 Token 字符串
			                this.getToken(res)
			                },
			                 fail: (res) => {
			                      return uni.$showMsg('您取消了登录授权')
			                    }
			              })
						  },
			async	getToken(info){
					// 获取code值
					const [err,res] = await uni.login().catch(err => err)
					console.log(res);
					if(  err|| res.errMsg !== 'login:ok') returnuni.$showMsg('登陆失败')
					// 准备参数
					const query ={
						
						code: res.code,
						encryptedData: info.encryptedData,
						iv: info.iv,
						rawData: info.rawData,
						signature: info.signature
					}
				// console.log(query);
				// const {data:loginResult} = await uni.$http.post('/api/public/v1/users/wxlogin',query)
					// if(loginResult.meta.status !== 200) return uni.$showMsg('登陆失败')
					// 接口失效，获取token失败，假token 
					this.updateToken('11111')
					uni.$showMsg('登陆成功')
				},
	         },
	}
</script>

<style lang="scss">
.login-container {
// 登录盒子的样式
height: 750rpx;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background-color: #f8f8f8;
position: relative;
overflow: hidden;
// 绘制登录盒子底部的半椭圆造型
&::after {
content: ' ';
display: block;
position: absolute;
width: 100%;
height: 40px;
left: 0;
bottom: 0;
background-color: white;
border-radius: 100%;
transform: translateY(50%);
}
// 登录按钮的样式
.btn-login {
width: 90%;
border-radius: 100px;
margin: 15px 0;
background-color: #c00000;
}
// 按钮下方提示消息的样式
.tips-text {
font-size: 12px;
color: gray;
}
}
</style>