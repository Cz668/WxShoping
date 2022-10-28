export default {
  namespaced: true,
  state :() => ({
    // 每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    goodsDetail: JSON.parse(uni.getStorageSync('goodsDeatail') || '[]')
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
        // console.log('2',state.goodsDetail)
      }
      this.commit('cartAbout/saveToStorage')
      // console.log('goodsDetail',state.goodsDetail)
    },
    saveToStorage(state) {
      uni.setStorageSync('goodsDeatail',JSON.stringify(state.goodsDetail))
    },
    
  }
}