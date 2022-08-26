<template>
	<view class="my-container">
<!-- 用户未登录时，显示登录组件 -->
<my-login v-if="!token"></my-login>
<!-- 用户登录后，显示用户信息组件 -->
<my-userinfo v-else></my-userinfo>
	</view>
</template>

<script>
	import badgeMix from '../../mixins/tabbar-badge.js'
	import { mapState } from 'vuex'
	export default {
		mixins:[badgeMix],
		data() {
			return {
				
			};
		},
		computed: {
		// 2. 从 m_user 模块中导入需要的 token 字符串
		...mapState('m_user', ['token']),
		},
	}
</script>

<style lang="scss">
page, .my-container{
		height: 100%;
		.my-userinfo-container {
		height: 100%;
		// 为整个组件的结构添加浅灰色的背景
		background-color: #f4f4f4;
		.top-box {
		height: 400rpx;
		background-color: #c00000;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.avatar {
		display: block;
		width: 90px;
		height: 90px;
		border-radius: 45px;
		border: 2px solid white;
		box-shadow: 0 1px 5px black;
		}
		.nickname {
		color: white;
		font-weight: bold;
		font-size: 16px;
		margin-top: 10px;
		}
		}
		}
	}

</style>
