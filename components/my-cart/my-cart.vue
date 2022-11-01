<template>
  <view>
    <view class="cart-goods-item">
      <view class="left-box">
        <radio 
          :checked="goods.goods_state" 
          color="#C00000" 
          @click="changeState(goods)">
        </radio>
        <img :src="goods.goods_small_logo || defaultPic" class="goods-img" @click="toGoodsDetail(goods.goods_id)">
      </view>
      <view class="right-box">
        <text class="goods-title" @click="toGoodsDetail(goods.goods_id)">{{goods.goods_name}}</text>
        <view class="price">
          <text class="goods-price" @click="toGoodsDetail(goods.goods_id)">￥{{goods.goods_price}}</text>
          <view >
            <uni-number-box
              :min="1" 
              :value="goods.goods_count" 
              @change="numChangeHandler">
            </uni-number-box>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {mapMutations} from 'vuex'
  export default {
    name:"my-cart",
    props: {
      goods: {
        type: Object,
        default: []
      }
    },
    data() {
      return {
        // 默认的图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
      }
    },
    methods: {
      ...mapMutations('cartAbout',['upDateState','upDateAmount']),
      
      changeState(goods) {
        // console.log('goods',goods)
        this.upDateState(goods)
      },
      
      changeAmount(item) {
        this.goods_id = item.goods_id
        // console.log('item',item)
      },
      
      numChangeHandler(e) {
        const goods_amount = {
          goods_id: this.goods.goods_id,
          goods_count: e
        }
        this.upDateAmount(goods_amount)
      },
      
      toGoodsDetail(goods_id) {
        // console.log('goods',goods_id)
        wx.navigateTo({
          url: '/subPackages/goods_detail/goods_detail?goods_id=' + goods_id
        })
      }
    }
  }
</script>

<style lang="scss">
  
  .cart-goods-item{
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #EFEFEF;
    .left-box {
      display: flex;
      align-items: center;
      .goods-img {
        width: 100px;
        height: 100px;
        display: block;
        margin-right: 5px;
      }
    }
  }
  .right-box {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
  }
  .goods-title {
    font-size: 12px;
  }
  .price {
    display: flex;
    bottom: 0;
    justify-content: space-between;
  }
  
  .goods-price {
    color: #C00000;
  }
</style>