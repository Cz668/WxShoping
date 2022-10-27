<template>
  <view>
    <view class="goods-list">
      <view class="goods-item" v-for="(item, index) in goodsList" :key="index">
        <view class="left-box">
          <img :src="item.goods_small_logo" class="left-img">
        </view>
        <view class="right-box">
          <text>{{item.goods_name}}</text>
          <text class="goods-price">￥{{item.goods_price}}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 请求参数对象
        queryObj: {
        query: '',// 查询关键词
        cid: '',// 商品分类Id
        pagenum: 1,// 页码值
        pagesize: 10// 每页显示多少条数据
        },
        // 商品列表数据
        goodsList: [],
        
      }
    },
    onLoad(options) {
      // console.log('options',options)
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      this.getGoodsList()
    },
    
    methods: {
      async getGoodsList() {
        const {data: res} = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
        // const data = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
        // console.log('res',res)
        this.goodsList = res.message.goods
        console.log('this.goodsList',this.goodsList)
      }
    }
  }
</script>

<style lang="scss">
  .goods-list {
    .goods-item {
      display: flex;
      padding: 10px 7px;
      border-bottom: 1px solid #f0f0f0;
      .left-box {
        margin-right: 5px;
        .left-img {
          width: 100px;
          height: 100px;
          display: block;
        }
      }
      .right-box {
        display: flex;
        font-size: 13px;
        flex-direction: column;
        justify-content: space-between;
        .goods-price {
          font-size: 16px;
          color: #c00000;
        }
      }
    }
  }
</style>
