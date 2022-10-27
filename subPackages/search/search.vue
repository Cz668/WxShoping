<template>
  <view>
    <my-search 
      :isShow="isShow" 
      @getSearchResults="getSearchResults"
      @getLocalSearchResults="getLocalSearchResults"
      @back="back">
    </my-search>
    <!-- 搜索建议列表 -->
    <view class="sugg-list" v-if="searchResults.length !== 0">
      <view 
        class="sugg-item" 
        v-for="(item, i) in searchResults" 
        :key="i" >
        <view class="goods-name">{{item.goods_name}}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    
    <!-- 搜索历史 -->
    <view class="history-box" v-else>
      <!-- 标题区域 -->
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17"></uni-icons>
      </view>
      <!-- 列表区域 -->
      <view class="history-list">
        <view 
        class="history-item" 
        v-for="(item, index) in getSortHistory" 
        :key="index"
        @click="toGoodsList(item)">
          <uni-tag :text="item" class="text"></uni-tag>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    props:{
      },
    data() {
      return {
        isShow: true,
        // 搜索结果数据列表
        searchResults: [],
        // 搜索历史记录
        historyList: JSON.parse(uni.getStorageSync('localSearchResults') || '[]'),
        // 排顺序历史记录
        sortHistoryList: []
      }
    },
    computed: {
      getSortHistory(){
        return this.sortHistoryList = this.historyList.reverse()
      }
    },
    methods: {
      async getSearchResults(ipt){
        if(!ipt.trim()) return this.searchResults = []
        const {data: res} = await uni.$http.get('/api/public/v1/goods/qsearch',{query: ipt})
        // console.log('res',res)
        if(res.meta.status !==200) return 
        this.searchResults = res.message
        // console.log('search',this.localSearchResults)
      },
      getLocalSearchResults() {
        this.historyList = JSON.parse(uni.getStorageSync('localSearchResults') || '[]')
      },
      
      back() {
        wx.navigateBack()
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
.sugg-list {
  padding: 0 5px;
    .sugg-item {
      font-size: 12px;
      padding: 13px 0;
      border-bottom: 1px solid #efefef;
      display: flex;
      align-items: center;
      justify-content: space-between;
    .goods-name {
      // 文字不允许换行（单行文本）
      white-space: nowrap;
      // 溢出部分隐藏
      overflow: hidden;
      // 文本溢出后，使用 ... 代替
      text-overflow: ellipsis;
      margin-right: 3px;
    }
  }
}
.history-box {
  padding: 0 10px;
  .history-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    font-size: 13px;
    border-bottom: 1px solid #efefef;
  }
}
.history-list {
  display: flex;
  .history-item {
    margin-right: 10px;
  }
}
</style>
