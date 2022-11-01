<template>
    <view class="cart-margin" v-if="goodsDetail.length !== 0">
      <my-address></my-address>
      <view class="cart-box">
        <view class="cart-top">
          <uni-icons type="shop" size="18"></uni-icons>
          <text class="cart-top-title">购物车</text>
        </view>
      </view>
      
      <!-- 商品列表区域 -->
      <!-- uni-swipe-action 是最外层包裹性质的容器 -->
      <uni-swipe-action>
        <block 
          v-for="(goods, index) in goodsDetail" 
          :key="index">
          <uni-swipe-action-item :right-options="options"  @click="swipeItemClickHandler(goods)">
            <my-cart :goods="goods"></my-cart>
          </uni-swipe-action-item>
        </block>
      </uni-swipe-action>
      
      <!-- 商品结算区域 -->
      <my-setter></my-setter>
    </view>
    
    <!-- 空白购物车的区域 -->
    <view class="empty-cart" v-else>
      <image src="/static/cart_empty@2x.png" class="empty-img"></image>
      <text class="tip-text">空空如也~</text>
    </view>

</template>

<script>
  import { mapState, mapMutations } from 'vuex'
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
    computed: {
      ...mapState('cartAbout',['goodsDetail']),
    },
    methods: {
      ...mapMutations('cartAbout',['removeGoodsById']),
      swipeItemClickHandler(goods) {
        this.removeGoodsById(goods.goods_id)
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
  
  .empty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;
    .empty-img {
      width: 90px;
      height: 90px;
    }
    .tip-text {
      font-size: 12px;
      color: gray;
      margin-top: 15px;
    }
  }

</style>
