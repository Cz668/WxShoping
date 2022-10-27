<template>
  <view>
   <!-- 轮播图区域 -->
   <swiper 
     :indicator-dots="true" 
     :autoplay="true" 
     :interval="3000"
     :duration="1000"
     :circular="true"
     class="detail-swiper">
   <!-- 循环渲染轮播图的 item 项 -->
     <swiper-item v-for="(item, index) in goodsDetail.pics" :key="index">
         <!-- 动态绑定图片的 src 属性 -->
         <image :src="item.pics_big_url" @click="preview(index)"></image>
     </swiper-item>
   </swiper>
   
   <!-- 商品信息区 -->
   <view class="goods-message" v-if="goodsDetail.goods_name">
     <text class="goods-price">￥{{goodsDetail.goods_price}}</text>
     <view class="message-box">
       <view class="left-box">
         <text>{{goodsDetail.goods_name}}</text>
       </view>
       <view class="right-box">
         <uni-icons type="star" size="18"></uni-icons>
         <text>收藏</text>
       </view>
     </view>
     <text class="expressage">快递免运费</text>
   </view>
   
   <!-- 商品详情信息 -->
   <rich-text :nodes="goodsDetail.goods_introduce"></rich-text>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 商品详情数据
        goodsDetail: []
      }
    },
    onLoad(options) {
      // console.log('option',options.goods_id)
      this.getGoodsDetailList(options.goods_id)
    },
    
    methods: {
      async getGoodsDetailList(goods_id) {
        const { data: res} = await uni.$http.get('/api/public/v1/goods/detail', { goods_id })
        // console.log('res',res)
        // 使用字符串的 replace() 方法，为 img 标签添加行内的 style 样式，从而解决图片底部空白间隙的问题
        res.message.goods_introduce = res.message.goods_introduce.replace(/<img/g, '<img style="display:block;" ').replace(/webp/g, 'jpg')
        this.goodsDetail = res.message
        // console.log('this.goodsDetail',this.goodsDetail)
      },
      
      preview(index) {
        uni.previewImage({
          current: index,
          urls: this.goodsDetail.pics.map( img => img.pics_big)
        })
      }
    }
  }
</script>

<style lang="scss">
  .detail-swiper {
    height: 700rpx;
    .swiper-item,
    image {
    width: 100%;
    height: 100%;
    }
  }
  
  .goods-message {
    padding: 10px;
    .goods-price {
      color: #c00000;
      font-size: 18px;
      margin: 10px 0;
    }
    .message-box {
      display: flex;
      justify-content: space-between;
      .left-box {
        font-size: 13px;
        padding-right: 10px;
      }
      .right-box {
        width: 120px;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-left: 1px solid #efefef;
        color: gray;
      }
    }
    .expressage {
      margin: 10px 0;
      font-size: 12px;
      color: gray;
    }
  }
</style>
