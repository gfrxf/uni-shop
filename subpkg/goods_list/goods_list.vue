<template>
	<view>
<view class="goods-list">
	<view v-for="(item,i) in goodsList" :key="i" @click="gotoDetail(item)" >
		<my-goods :goods="item" ></my-goods>
	</view>
	
</view>		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 请求参数对象
				queryObj:{
					query: '',
					cid: '',
					pagenum:1,
					pagesize:10
				},
				goodsList:[],
				total:0,
				// 节流阀
				isloading:false,
				
				
			};
		},
		onLoad(options){
			// console.log(11);
			// console.log(options);
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			// console.log(this.queryObj.cid);
			console.log(this.queryObj);
			this.getGoodsList()
			
		},
		methods:{
			// 获取商品列表数据的方法
		async getGoodsList(cd){
			
			    this.isloading = true
				 const{data:res} = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
				// console.log(res);
				// 关闭节流阀，以及调用关闭下拉刷新的
				this.isloading = false
				cd && cd()
				if(res.meta.status !== 200){
					return uni.$showMsg()
				}
				this.goodsList =  [...this.goodsList,...res.message.goods]
				this.total = res.message.total
				
			},
			gotoDetail(goods){
				uni.navigateTo({
					url:'/subpkg/goods_details/goods_details?goods_id=' + goods.goods_id
				})
			}
		},
		onReachBottom() {
			if(this.queryObj.pagenum * this.queryObj.pagenum > this.total) return uni.$showMsg("数据加载完毕")
			if(this.isloading) return
			
			// 让页面值自增加1
			this.queryObj.pagenum++
			this.getGoodsList()
		},
		onPullDownRefresh(){
			// 重置关键数据
			this.queryObj.pagenum = 1,
			this.total = 0,
			this.isloading = false,
			this.goodsList = [],
			// 重新发起数据请求
			this.getGoodsList(()=>{
				uni.stopPullDownRefresh()
			})
			
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
