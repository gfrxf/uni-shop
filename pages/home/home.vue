<template>
	<view>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,i) in swiperList" :key="i">
				
				<navigator class="swiper-item" :url="'/subpkg/goods_details/goods_details?goods_id=' + item.goods_id">
					<!-- 动态绑定图片的src属性 -->
					<img :src="item.image_src" alt="">
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 分类导航区域 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item,i) in navList " :key="i" @click="navClickHandler(item)">
				<image :src="item.image_src" mode="" class="nav-img"></image>
			</view>
		</view>
		<!-- 楼层区域 -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item,i) in floorList  " :key="i">
				<image :src="item.floor_title.image_src" mode="" class="floor-title"></image>
				<view class="floor-img-box">
					<!-- 左侧大盒子的图片 -->
					<navigator class="left-img-box" :url='item.product_list[0].url'>
						<img mode="widthFix" :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width + 'rpx'}" alt="">
					</navigator>
					<!-- 右侧大盒子 -->
					<view class="right-img-box">
						<navigator :url='item2.url' class="right-img-item" v-for="(item2, i2) in item.product_list"  :key="i2" v-show="i2 != 0">
							<img :src="item2.image_src" alt="" :style="{width:item2.image_width + 'rpx'}" mode="widthFix">
						</navigator>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 这是轮播图的数据列表
				swiperList:[], 
				navList:[],
				floorList:[],
			};
		},
		onLoad() {
		// 调用方法，获取轮播图的数据
		this.getSwiperList()
		this.getnavList()
		this.getFloorList()
		},
		methods: {
			// 获取轮播图
			async getSwiperList () {
				const {data:res} = await uni.$http.get('/api/public/v1/home/swiperdata');
				console.log(res);
				if(res.meta.status == !200){
					return uni.$showMsg()
				}
				// 请求成功，为data中的数据赋值
				this.swiperList = res.message
				uni.$showMsg('数据请求成功')
			},
			// 获取分类
		async getnavList(){
			const {data:res} = await uni.$http.get('/api/public/v1/home/catitems');
			console.log(res);
			if(res.meta.status == !200){
				return uni.$showMsg()
			}
			// 请求成功，为data中的数据赋值
			this.navList = res.message
			uni.$showMsg('数据请求成功')
		},
		// 获取楼层数据
		async getFloorList(){
			const {data:res} = await uni.$http.get('/api/public/v1/home/floordata');
			console.log(res);
			if(res.meta.status == !200){
				return uni.$showMsg()
			}
			// 对楼层数据惊醒处理
			res.message.forEach(floor =>{
				floor.product_list.forEach(item => {
					item.url= '/subpkg/goods_list/goods_list?' + item.navigator_url.split('?')[1]
				})
			})
			// 请求成功，为data中的数据赋值
			this.floorList = res.message
			uni.$showMsg('数据请求成功')
		},
		navClickHandler(item){
			console.log(item);
			if(item.name === '分类'){
				uni.switchTab({
					url:'/pages/cate/cate'
				})
			}
		},
			
		},
	}
</script>

<style lang="scss">
swiper{
	height: 330rpx;
	.swiper-item,image{
		width: 100%;
		height: 100%;
	}
}
.nav-list{
	display: flex;
	// flex-direction: column;
	justify-content: space-around;
	margin: 15px 0;
	.nav-img{
		width: 128rpx;
		height: 140rpx;
	}
}
.floor-list{
	
	// display: flex;
	.floor-title{
		width: 100%;
		// height: ;
		height: 60rpx;
	}
	.floor-img-box{
		display: flex;
		padding-left: 10rpx;
		.right-img-box{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			
		}
	}
}
</style>
