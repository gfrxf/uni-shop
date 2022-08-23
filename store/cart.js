export default{
	namespaced:true,
	state:() =>({
		// 购物车的数组，用来存储购物车中每个商品的信息对象
		// 每个商品的信息对象，都包含如下 6 个属性：
		// { goods_id, goods_name, goods_price, goods_count,goods_small_logo, goods_state }
		cart:JSON.parse(uni.getStorageSync('cart') || '[]') 
	}),
	
	mutations:{
		
		addToCart(state,goods){
		const findResult =	state.cart.find(x => x.goods_id === goods.goods_id)
		if(!findResult){
			state.cart.push(goods)
		}
		else{
			findResult.goods_count ++
		}
		
		this.commit('m_cart/saveToStorage')
		},
		saveToStorage(state){
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
		// 更新购物车中商品的勾选状态
		updateGoodsState(state,goods){
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if(findResult) {
				findResult.goods_state = goods.goods_state
				this.commit('m_cart/saveToStorage')
			}
		},
		// 更新购物车中商品数量
		updateGoodsNum(state,goods){
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if(findResult){
				findResult.goods_count = goods.goods_count
				this.commit('m_cart/saveToStorage')
			}
		},
		// 根据ID删除对应的商品
		removeGoodsByid(state,goods){
			state.cart = state.cart.filter(x=> x.goods_id !== goods.goods_id)
			this.commit('m_cart/saveToStorage')
		
		},
		// 更新购物车所有勾选状态
		updateAllState(state,newState){
			state.cart.forEach(x=>x.goods_state =newState)
			this.commit('m_cart/saveToStorage')
		},
		
	},
	getters:{
		total(state){
			// let c =0;
			// state.cart.forEach(x => c += x.goods_count)
			// return c
			return state.cart.reduce((total,item)=>total += item.goods_count,0)
		},
		checkdCount(state){
			return state.cart.filter(x => x.goods_state).reduce((total,item)=>total += item.goods_count ,0)
		},
		checkGoodsAmount(state){
			return state.cart.filter(x => x.goods_state).reduce( (total,item)=> total += item.goods_count *item.goods_price,0).toFixed(2)
		},
		
	},
	
}