export default {
  namespaced: true,
  state :() => ({
    // 每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    goodsDetail: JSON.parse(uni.getStorageSync('goodsDeatail') || '[]'),
    isAllSelect: false,
  }),
  mutations: {
    addToCart(state, goods) {
      // 此处.find 是将地址复制给 findResult 从而 findResult 可以修改 goodsDetail 中的值
      const findResult = state.goodsDetail.find(x => x.goods_id === goods.goods_id)
      // console.log('state.goodsDetail',state.goodsDetail)
      // console.log('findResult',findResult)
      // console.log('goods',goods)
      if (!findResult) {
        state.goodsDetail.push(goods)
        // console.log('goodsDetail',state.goodsDetail)
      } else {
        findResult.goods_count++
        // console.log('findResult.goods_count',findResult)
      }
      this.commit('cartAbout/saveToStorage')
      // console.log('goodsDetail',state.goodsDetail)
    },
    saveToStorage(state) {
      uni.setStorageSync('goodsDeatail',JSON.stringify(state.goodsDetail))
    },
    upDateState(state,info) {
      const findState = state.goodsDetail.find(x => x.goods_id === info.goods_id)
      findState.goods_state = !findState.goods_state
      this.commit('cartAbout/saveToStorage')
    },
    upDateAmount(state,info) {
      const findAmount = state.goodsDetail.find(x => x.goods_id === info.goods_id)
      findAmount.goods_count =  info.goods_count
      this.commit('cartAbout/saveToStorage')
    },
    upAllState(state,newState) {
      state.goodsDetail.forEach(x => x.goods_state = !newState)
      this.commit('cartAbout/saveToStorage')
      // console.log('state.goodsDetail',state.goodsDetail.length)
    },
    
    
  },
  getters: {
    allGoodsAmount(state) {
      return state.goodsDetail.reduce((total, item) => total += item.goods_count, 0)
    },
    selectGoodsAmount(state) {
      return state.goodsDetail.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
    },
    summation(state){
      return state.goodsDetail.filter(x => x.goods_state).reduce((total,item) => total += item.goods_count * item.goods_price, 0)
    }
  }
}