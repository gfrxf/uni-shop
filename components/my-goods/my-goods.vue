<template>
	<view>
		<view class="goods-item" >
		<!-- 左侧图片区域 -->
		<view class="goods-left-item">
			<radio checked color="#c00000"></radio>
		<image :src="goods.goods_small_logo || defaultPic" mode="" class="goods-item-img"></image>	
		</view>
		<!-- 右侧的盒子 -->
		<view class="goods-right-item">
			<view class="goods-name">
				{{goods.goods_name}}
			</view>	
			<view class="goods-info-box">
			<view class="goods-price">¥{{goods.goods_price | tofixed}}</view>	
			</view>
			
		</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		props:{
			goods:{
				type:Object,
				dedault:{},
			},
			showRadio:{
				type:Boolean
			},
		},
		methods: {
			clickItem(){
				this.$emit('click')
			},
			
		},
		data() {
			return {
			// 默认的空图片
			defaultPic:'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'	
			};
		},
	
		
		filters:{
			tofixed(num){
				return Number(num).toFixed(2)
			}
		},
	}
</script>

<style lang="scss">
.goods-item{
	display: flex;
	padding: 10px 5px;
	border-bottom: 1px solid #f0f0f0;
	.goods-left-item{
		margin-right: 5px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.goods-item-img{
			width: 100px;
			height: 100px;
			display: block;
			
		}
	}
	.goods-right-item{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.goods-name{
			font-size: 13px;
		}
		.goods-price{
			color: #c00000;
			font-size: 16px;
		}
	}
}
</style>