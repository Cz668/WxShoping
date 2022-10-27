<template>
  <view>
    <my-search @search="search" :isShow="isShow"></my-search>
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000"
    :duration="1000" :circular="true">
    <!-- 循环渲染轮播图的 item 项 -->
      <swiper-item v-for="(item1, i) in swiperList" :key="i">
        <view class="swiper-item">
          <!-- 动态绑定图片的 src 属性 -->
          <image :src="item1.image_src"></image>
        </view>
      </swiper-item>
    </swiper>
    
    <!-- 分类导航区域 -->
    <view class="nav-list">
       <view class="nav-list-item" v-for="(item2, index) in navList" :key="index">
         <img :src="item2.image_src" class="nav-img">
       </view>
    </view>
    
    <!-- 楼层区域 -->
    <view class="floor-list">
      <view class="floor-list-item" v-for="(item3, index) in floorList" :key="index">
        <view>
            <img :src="item3.floor_title.image_src" class="floor-title" >
        </view>
        <view class="floor-img-box" >
          <view @click="toGoodsList(item3.product_list[0].name)">
            <img :src="item3.product_list[0].image_src" class="img-left"  mode="widthFix">
          </view>
          <view class="right-img-box">
            <view 
              class="img-right-item"
              v-for="(item4, i) in item3.product_list" 
              :key="i"
              @click="toGoodsList(item4.name)">
              <img :src="item4.image_src" v-if="i !== 0"  :style="{width:
              item4.image_width + 'rpx'}"
              mode="widthFix">
            </view>
          </view>
        </view>
        </view>
      </view>
      
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 1. 轮播图的数据列表，默认为空数组
        swiperList: [],
        // 2.分类导航列表数据
        navList: [],
        // 3.楼层列表数据
        floorList: [],
        // 4.控制标题和返回符的显示与隐藏
        isShow: false,
        // 
        query: []
      }
    },
    onLoad() {
    // 2. 在小程序页面刚加载的时候，调用获取轮播图数据的方法
    this.getSwiperList()
    // 3.获取分类导航数据
    this.getNavList()
    // 4.获取楼层数据
    this.getFloorList()
    },
    methods: {
      // 3. 获取轮播图数据的方法
      async getSwiperList() {
      // 3.1 发起请求
      const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata')
      // 3.2 请求失败
      if (res.meta.status !== 200) {
        // 这里是 uni.$showMsg的原型
      return uni.showToast({
      title: '数据请求失败！',
      duration: 1500,
      icon: 'none',
      })
      }
      // 3.3 请求成功，为 data 中的数据赋值
      this.swiperList = res.message
      },
      async getNavList(){
        const {data: res} = await uni.$http.get('/api/public/v1/home/catitems')
        // console.log('res',res)
        if(res.meta.status !==200) return this.uni.$showMsg()
        this.navList = res.message
      },
      
      async getFloorList(){
        const {data: res} = await uni.$http.get('/api/public/v1/home/floordata')
        console.log('res',res)
        if(res.meta.status !==200) return this.uni.$showMsg()
        this.floorList = res.message
        // 只使用一次 map
        // this.query = this.floorList.map( item => item.product_list)
        // 使用两次 map
        // this.query = this.floorList.map( item => {
        //   return item.product_list.map(itemName => itemName.name)
        // })
      },
      
      search(){
        console.log('search')
        wx.navigateTo({
          url: '/subPackages/search/search'
        })
      },
      
      toGoodsList(query) {
        // console.log('query',query)
        wx.navigateTo({
          url: `/subPackages/goods_list/goods_list?query=${query}`
        })
      }
    }
  }
</script>

<style lang="scss">
  swiper {
    height: 330rpx;
    .swiper-item,
    image {
    width: 100%;
    height: 100%;
    }
  }
  
  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;
    .nav-img {
      // display: none;
      width: 128rpx;
      height: 140rpx;
    }
  }
  
  .nav{
    display: flex;
    .nav1 {
      height: 50px;
      width: 50px;
      background-color: pink;
    }
    .nav2 {
      height: 50px;
      width: 50px;
      background-color: skyblue;
    }
  }
  
  .floor-list {
    padding: 0 5px;
    .floor-list-item {
      .floor-title {
        height: 60rpx;
        width: 100%;
      }
      .floor-img-box {
        display: flex;
        .img-left {
          width: 232rpx;
          // margin-right: 5px;
        }
        .right-img-box {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
        }
      }
    }
  }
</style>
