<template>
	<view>
	<view class="search-box">
		<uni-search-bar  @input="input" placeholder="请输入搜索内容" :radius="100" cancelButton="none">11111</uni-search-bar>
	</view>
	<!-- 搜索建议列表 -->
	<view class="sugg-list" v-if="searchResult.length != 0">
		<view class="sugg-item" v-for="(item,i) in searchResult " :key="i" @click="gotoDetail(item)">
			<view class="goods-name">
				{{item.goods_name}}
			</view>
			<uni-icons type="arrowright" size="16"></uni-icons>
			
		</view>
	</view>
	<!-- 搜索历史 -->
	<view class="history-box" v-else>
		<!-- 标题区域 -->
		<view class="history-tile">
			<text>搜索历史</text>
			<uni-icons type="trash" size="17" @click="clean"></uni-icons>
			
		</view>
		<!-- 列表区域 -->
		<view class="history-list">
			<uni-tag :text="item2" v-for="(item2,i2) in histories " :key="i2" @click="gotoGoodsList(item2)"></uni-tag>
			
		</view>
		
	</view>
	</view>
</template>

<script>
	export default {
		computed:{
			histories(){
				return [...this.historyList].reverse()
			}
		},
		onLoad(){
		this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')	
		},
		data() {
			return {
				timer:null,
				kw:'',
				searchResult:[],
				historyList:[],
			};
		},
		methods:{
			// input输入事件
			input(e){
				// 防抖
				// console.log(e);
				if(this.timer)
				clearTimeout(this.timer)
				this.timer = setTimeout(()=>{
				// console.log(e);
				this.kw = e
				this.getSearchList()
				},500)
				
			},
		async	getSearchList(){
				// 判断是否为kong
				if(this.kw.length === 0){
					this.searchResult = []
					return
				}
				const {data:res} = await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.kw})
				if(res.meta.status !== 200) return uni.$showMsg()
				this.searchResult = res.message
				this.saveSearchHistory()
			},
			gotoDetail(item){
				// console.log(item.goods_id);
				uni.navigateTo({
					url:'/subpkg/goods_details/goods_details?goods_id=' + item.goods_id
				})
			},
			saveSearchHistory(){
				//
				// this.historyList.push(this.kw)
				// this.historyList.unshift(this.kw)
				//解决关键词重复的问题 将Arrray数组转化为Set对象 该对象值唯一 
				const set = new Set(this.historyList)
				// 删除是为了添加重复的也能到前面去
				set.delete(this.kw)
				set.add(this.kw)
				// 将该对象转化为Array数组
				this.historyList = Array.from(set)
				// 将搜索记录持续话存储到本地
				uni.setStorageSync('kw',JSON.stringify(this.historyList))
				
			},
			// 清空
			clean(){
				this.historyList = [],
				uni.setStorageSync('kw','[]')
			},
			gotoGoodsList(kw){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?query=' + kw
				})
			},
		},
	}
</script>

<style lang="scss">
.search-box{
	position: sticky;
	top: 0%;z-index: 999;
}
.sugg-list{
	padding: 0 5px;
.sugg-item{
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 12px;
	padding: 13px 0;
	border-bottom: 1px solid #efefef;
	.goods-name{
		// 文字不让换行
		white-space: nowrap;
		// 超出部分英藏
		overflow: hidden;
		// 文本溢出后，使用...代替
		text-overflow: ellipsis;
	}
}
}
.history-box{
	padding: 0 5px;
	.history-tile{
		height: 40px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 13px;
		border-bottom: 1px solid #efefef;
	}
	.history-list{
		display: flex;
		flex-wrap: wrap;
		.uni-tag{
			margin-top: 5px;
			margin-left: 5px;
		}
	}
}
</style>
