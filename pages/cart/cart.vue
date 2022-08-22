<template>
	<view>
		<!-- 商品列表的标题
		 -->
		 <view class="cart-title">
		 	<!-- 左侧的图标 -->
			<uni-icons type="shop" size="18"></uni-icons>
			<!-- 右侧的文本 -->
			<text class="cart-title-text">购物车</text>
			
		 </view>
		 <!-- 循环渲染列表数据 -->
		 <block v-for="(goods,i) in cart" :key="i">
			 <my-goods :goods="goods">></my-goods>
		 </block>
	</view>
</template>

<script>
	import badgeMix from '../../mixins/tabbar-badge.js'
	import {mapState} from 'vuex'
	export default {
		mixins:[badgeMix],
		computed:{
			...mapState('m_cart',['cart'])
		},
		data() {
			return {
				
			};
		},
		
	}
</script>

<style lang="scss">
.cart-title {
	height: 40px;
	display: flex;
	align-items: center;
	padding-left: 5px;
	border-bottom: 1px solid #efefef;
	.cart-title-text{
		font-size: 14px;
		margin-left: 10px;
	}
}
</style>
