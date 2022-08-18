<template>
	<view>
		<view class="scroll-view-container">
			<!-- 左侧的滑动区域v -->
			<scroll-view scroll-y="true" :style="{height: wh+ 'px'}"  class="left-scroll-view">
				<view class="left-scroll-view-item active">xxx</view>
				<view class="left-scroll-view-item">xxx</view>
				<view class="left-scroll-view-item">xxx</view>
				<view class="left-scroll-view-item">xxx</view>
				<view class="left-scroll-view-item">xxx</view>
			</scroll-view>
			<!-- 右侧的滑动区域 -->
			<scroll-view scroll-y="true"  :style="{height: wh+ 'px'}" class="right-scroll-view">
				<!-- <view class="left-scroll-view-item">zzz</view>
				<view class="left-scroll-view-item">zzz</view>
				<view class="left-scroll-view-item">zzz</view>
				<view class="left-scroll-view-item">zzz</view> -->
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 当前设备可用高度
				wh: 0,
				cateList:[]
			};
		},
		onLoad() {
			const  sysInfo =  uni.getSystemInfoSync()
			// console.log(sysInfo);
			this.wh = sysInfo.windowHeight
			this.getCateList()
			
		},
		methods:{
			async getCateList () {
				const {data:res} = await uni.$http.get('/api/public/v1/categories');
				console.log(res);
				if(res.meta.status == !200){
					return uni.$showMsg()
				}
				// 请求成功，为data中的数据赋值
				this.cateList = res.message
				uni.$showMsg('数据请求成功')
			},
		}
	}
</script>

<style lang="scss">
.scroll-view-container{
	display: flex;
	.left-scroll-view{
		width: 240rpx;
		.left-scroll-view-item{
			background-color: #f7f7f7;
			line-height: 60px;
			text-align: center;
			font-size: 12px;
			&.active{
				background-color: #ffffff;
				position: relative;
				&::before{
					content: ' ';
					display: block;
					width: 3px;
					height: 30px;
					background-color: #c00000;
					position: absolute;
					top: 50%;left: 0;
					transform: translateY(-50%)
				}
			}
		}
	}
}
</style>
