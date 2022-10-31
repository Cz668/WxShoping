<template>
  <view class="cart-margin">
    <my-address></my-address>
    <view class="cart-box">
      <view class="cart-top">
        <uni-icons type="shop" size="18"></uni-icons>
        <text class="cart-top-title">购物车</text>
      </view>
    </view>
    <view
      class="cart-goods-item" 
      v-for="(goods, index) in goodsDetail" 
      :key="index">
      <my-cart :goods="goods"></my-cart>
    </view>
    <!-- 商品结算区域 -->
    <view class="settlement-container">
      <view class="settlement-box">
        <view class="select-box">
          <radio
            :checked="isCheckAll" 
            color="#C00000" 
            @click="allSelect">
          </radio>
          <text>全选</text>
        </view>
        <view class="total-box">
          <text>合计：</text><text class="summation-text">￥{{summation | tofixed}}</text>
          <view class="btn-payment">
            结算({{selectGoodsAmount}})
          </view>
        </view>
      </view>     
    </view>
  </view>
</template>

<script>
  import { mapState, mapMutations, mapGetters} from 'vuex'
  export default {
    data() {
      return {
        options: [{
          text: '删除',
          style: {
            backgroundColor: '#C00000'
          }
        }],
      }
    },
    onLoad() {
      // console.log('isSeleter',this.isSeleter)
    },
    filters: {
      // 把数字处理为带两位小数点的数字
      tofixed(num) {
      return Number(num).toFixed(2)
      }
    },
    computed: {
      ...mapState('cartAbout',['goodsDetail','isAllSelect']),
      ...mapGetters('cartAbout',['allGoodsAmount','selectGoodsAmount','summation']),
      isCheckAll(){
        return this.allGoodsAmount === this.selectGoodsAmount
      }
    },
    methods: {
      ...mapMutations('cartAbout',['upAllState']),
      
      allSelect() {
        // console.log('e',e)
        this.upAllState(this.isCheckAll)
        // console.log('isSeleter',this.isSeleter)
      }
    }
  }
</script>
  
<style lang="scss">
  .cart-box {
    padding-left: 5px;
    .cart-top {
      height: 40px;
      display: flex;
      align-items: center;
      border-bottom: 2px solid #EFEFEF;
      .cart-top-title {
        font-size: 14px;
        margin-left: 10px;
      }
    }
  }
  .settlement-container {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: white;
  }
  .settlement-box {
    display: flex;
    height: 50px;
    line-height: 50px;
    justify-content: space-between;
    font-size: 14px;
    .select-box {
      margin-left: 5px;
    }
    .total-box {
      display: flex;
      .btn-payment {
        min-width: 100px;
        margin-left: 10px;
        background-color: #C00000;
        text-align: center;
        color: white;
      }
    }
  }
  .summation-text {
    color: #C00000;
  }
  .cart-margin {
    padding-bottom: 50px;
  }
</style>
