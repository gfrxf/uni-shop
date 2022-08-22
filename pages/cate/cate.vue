<template>
	<view>
		<!-- 使用自定义的搜索组件 -->
		<my-search @click="gotoSearch" :radius="18"></my-search>
		<view class="scroll-view-container">
			<!-- 左侧的滑动区域v -->
			<scroll-view scroll-y="true" :style="{height: wh+ 'px'}"  class="left-scroll-view">
				<block v-for="(item,i) in cateList " :key="i">
					<view :class="['left-scroll-view-item',i === active ? 'active' : '']" @click="changeActive(i)">
						{{item.cat_name}}
					</view>
				</block>
			</scroll-view>
			<!-- 右侧的滑动区域 -->
			<scroll-view scroll-y="true"  :style="{height: wh+ 'px'}" class="right-scroll-view"  :scrollTop="scrollTop">
				<view class="cate-level2" v-for="(item2 , i2) in cateLevel2 " :key="i2">
					<!-- 二级分类的标题 -->
					<view class="cate-level2-title">
					/	{{item2.cat_name}}   /
					</view>
					<!-- 三级分类的盒子 -->
					<view class="cate-level3-box">
						<view class="cate-level3-item" v-for="(item3,i3) in item2.children " :key="i3" @click="gotoGoodslist(item3)">
							<!-- 三级分类的图片 -->
							<image :src="item3.cat_icon" mode=""></image>
							<!-- 三级分类的文字 -->
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import badgeMix from '../../mixins/tabbar-badge.js'
	export default {
		mixins:[badgeMix],
		data() {
			return {
				// 当前设备可用高度
				wh: 0,
				cateList:[],
				active:0,
				cateLevel2:[],
				scrollTop:0
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
				// 为二级分类赋值
				this.cateLevel2 = res.message[0].children
				uni.$showMsg('数据请求成功')
			},
			// 重新为二级分类赋值
			changeActive(i){
				this.active = i;
				this.cateLevel2 = this.cateList[i].children
				this.scrollTop =  this.scrollTop === 0 ? 1: 0
				
			},
			// 跳转到商品列表页面
			gotoGoodslist(item){
				console.log(item);
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?cid='+item.cat_id
				})
			},
			// 跳转到搜索页面
			gotoSearch() {
				// console.log(11);
			uni.navigateTo({
				url:'/subpkg/search/search'
			})
				
			}
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
	.cate-level2-title{
		font-size: 12px;
		font-weight: bold;
		text-align: center;
		padding: 15px 0;
	}
	.cate-level3-box{
		display: flex;
		flex-wrap: wrap;
	
		.cate-level3-item{
				width: 33.33%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				margin-bottom: 10px;
			image{
				width: 60px;
				height: 60px;
			}
			text{
				font-size: 12px;
			}
		}
	}
}
</style>
