<template>
  <view>
    <my-search  @search="search" :isSearch="isSearch"></my-search>
    <view class="scroll-box">
      <!-- 左侧的滚动视图区域 -->
      <scroll-view 
        class="left-scroll-view" 
        scroll-y="true" 
        :style="{height: wh + 'px'}">
        <!-- block跟template一样 -->
        <block v-for="(item, i) in cateList" :key="i">
          <view 
            :class="['left-scroll-view-item', i === active ? 'active' : '']"
            @click="changeActive(i)">
            {{item.cat_name}}
        </view>
      </block>
        
      </scroll-view>
      
      <!-- 右侧的滚动视图区域 -->
        <scroll-view 
        class="right-scroll-view" 
        scroll-y="true" 
        :style="{height: wh + 'px'}"
        :scroll-top="scrollTop">
        <view 
          v-for="(item1, index1) in cateList[active].children" 
          :key="index1" 
          class="right-scroll-view-item">
          <view class="item-title">
            /{{item1.cat_name}}/
          </view>
          <view class="item-cate" >
            <view 
            v-for="(item2, index2) in item1.children" 
            :key="index2" 
            class="item-cate-box"
            @click="toGoodsList(item2.cat_name)">
              <img :src="item2.cat_icon" class="img">
              <text>{{item2.cat_name}}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 分类数据列表
        cateList: [],
        // 左侧滚动区选择项
        active: 0,
        // 当前页面的高度
        wh: 0,
        // 切换导航栏时重置为0
        scrollTop: 0,
        isSearch: true
      }
    },
    onLoad() {
      this.getcateList()
      // 当前页面所剩的高度
      const sysInfo = uni.getSystemInfoSync()
      this.wh = sysInfo.windowHeight
    },
    methods: {
      async getcateList() {
        const { data: res} = await uni.$http.get('/api/public/v1/categories')
        this.cateList = res.message
        // console.log('this.cateList',this.cateList)
        // console.log('cateList[0].children',this.cateList[0].children)
      },
      
      changeActive(i) {
        this.active = i
        this.scrollTop = this.scrollTop === 0 ? 1 : 0
      },
      
      toGoodsList(query) {
        // console.log('query'query)
        wx.navigateTo({
          url: `/subPackages/goods_list/goods_list?query=${query}`
        })
      },
      
      search(){
        // console.log('search')
        wx.navigateTo({
          url: '/subPackages/search/search'
        })
      },
    }
  }
</script>

<style lang="scss">
  .scroll-box {
    display: flex;
    background-color: #FFFFFF;
    .left-scroll-view {
      width: 120px;
      ::-webkit-scrollbar {
         width: 0;
         height: 0;
         color: transparent;
      }
      // font-size: 12px;
      // display: flex;
      // justify-content: center;
      // align-items: center;
      .left-scroll-view-item {
        background-color: #F7F7F7;
        line-height: 60px;
        text-align: center;
        font-size: 12px;
        &.active {
          background-color: #FFFFFF;
        }
      }
    }
    .right-scroll-view {
      // margin-left: 10px;
      .right-scroll-view-item {
        .item-title {
          font-size: 12px;
          font-weight: bold;
          text-align: center;
          padding: 15px 0;
        } 
        .item-cate {
          // display: flex;
          display: flex;
          flex-wrap: wrap;
          .item-cate-box {
            width: 33.33%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-bottom: 10px;
            font-size: 12px;
            .img {
              width: 60px;
              height: 60px;
            }
          }
        }
      }
    }
  }
  
  
</style>
