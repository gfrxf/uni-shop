<template>
	<view class="my-search-container" :style="{'background-color':bgcolor}" @click="searchBoxHandeler">
<view class="my-search-box" :style="{'border-radius':radius + 'px'}">
	<!-- 使用uni-ui提供的图标组件 -->
	<uni-icons type="contact" size="17"></uni-icons>
	<text class="placeholder">搜索</text>
</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		props:{
			// 背景颜色
			bgcolor:{
				type:String,
				default:'#C00000'
			},
			// 圆角尺寸
			radius:{
				type:String,
				default:'18'
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			searchBoxHandeler(){
				console.log(22);
				this.$emit('click')
			},
		},
	}
</script>

<style lang="scss">
.my-search-container{
	height: 50px;
	// background-color: #c00000;
	display: flex;
	// width: 100%;
	align-items: center;
	.my-search-box{
		width: 100%;
		height: 36px;
		background-color: #fff;
		// border-radius: 18px;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 10px;
		.placeholder{
			font-size: 15px;
			margin-left: 15px;
		}
	}
}
</style>