<template>
	<view>
	<!-- 最外层的容器 -->
	<view class="my-settle-container">
	<!-- 全选区域 -->
	<label class="radio" @click="changeAllState">
	<radio color="#C00000" :checked="isFullcheck" /><text>全选</text>
	</label>
	<!-- 合计区域 -->
	<view class="amount-box">
	合计:<text class="amount">￥{{checkGoodsAmount}}</text>
	</view>
	<!-- 结算按钮 -->
	<view class="btn-settle"  @click="settlement">结算{{checkdCount}}</view>
	</view>
	</view>
</template>

<script>
	import {mapGetters,mapMutations,mapState} from 'vuex'
	export default {
		name:"my-settle",
		data() {
			return {
				
			};
		},
		methods:{
			...mapMutations('m_cart',['updateAllState']),
			changeAllState(){
			
				this.updateAllState(!this.isFullcheck)
			},
			// 点击了结算按钮
			settlement() {
			// 1. 先判断是否勾选了要结算的商品
			if (!this.checkdCount) return uni.$showMsg('请选择要结算的商品！')
			// 2. 再判断用户是否选择了收货地址
			if (!this.addstr) return uni.$showMsg('请选择收货地址！')
			// 3. 最后判断用户是否登录了
			if (!this.token) return uni.$showMsg('请先登录！')
			}
			
		},
		computed:{
			...mapGetters('m_cart',['checkdCount','total','checkGoodsAmount']),
			...mapGetters('m_user', ['addstr']),
			...mapState('m_user',['token']),
			isFullcheck(){
			return	this.total ===this.checkdCount
			}
		}
	}
</script>

<style lang="scss">
.my-settle-container {
position: fixed;
bottom: 0;
left: 0;
width: 100%;
height: 50px;
// 将背景色从 cyan 改为 white
background-color: white;
display: flex;
justify-content: space-between;
align-items: center;
padding-left: 5px;
font-size: 14px;
.radio {
display: flex;
align-items: center;
}
.amount {
color: #c00000;
}
.btn-settle {
height: 50px;
min-width: 100px;
background-color: #c00000;
color: white;
line-height: 50px;
text-align: center;
padding: 0 10px;
}
}
</style>