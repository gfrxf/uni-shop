<template>
	<view>
		<view class="goods-item" >
		<!-- 左侧图片区域 -->
		<view class="goods-left-item">
			<radio   :checked="goods.goods_state" color="#c00000"  @click="radioclickHandler" v-if="showRadio"></radio>
		<image :src="goods.goods_small_logo || defaultPic" mode="" class="goods-item-img"></image>	
		</view>
		<!-- 右侧的盒子 -->
		<view class="goods-right-item">
			<view class="goods-name">
				{{goods.goods_name}}
			</view>	
			<view class="goods-info-box">
			<view class="goods-price">¥{{goods.goods_price | tofixed}}</view>	
			<uni-number-box @change="numChangeHandler" :min="1" :value="goods.goods_count" v-if="showNum"></uni-number-box>
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
				type:Boolean,
				default:false
			},
			showNum:{
				type:Boolean,
				default:false
			}
		},
		methods: {
			// 这是radio组件的点击处理函数
			radioclickHandler(){
				this.$emit('radioChange',{
					goods_id : this.goods.goods_id,
					goods_state: !this.goods.goods_state
					
				})
				// console.log(!(this.goods.goods_state));
			},
			// 这是处理num组件的变化函数
			numChangeHandler(val) {
				console.log(val);
				this.$emit('numChange',{
					goods_id : this.goods.goods_id,
					goods_count:val-0
				})
			}
			
			
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
	width: 750rpx;
	box-sizing: border-box;
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
		.goods-info-box{
			display: flex;
			justify-content: space-between;
			.goods-price{
				color: #c00000;
				font-size: 16px;
			}
		}
		
	}
}
</style>