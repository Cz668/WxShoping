<template>
  <view>
    <view
      class="search-box" >
      <view :style="{'height': statusBarHeight + 'px'}"></view>
      <view class="my-search-container"
      :style="{ 'height': titleBarHeight + 'px'}">
      <view style="margin-right: 10px;" class="right-box">
        <uni-icons type="back" size="20" v-if="isShow"></uni-icons>
        <text class="nav-title" v-else>黑马优购</text>
      </view>
        <view class="my-search-box" @click="searchBoxHandler()" v-if="!isShow">
          <!-- 使用 uni-ui 提供的图标组件 -->
          <uni-icons type="search" size="17"></uni-icons>
          <text class="placeholder">搜索</text>
        </view>
        <uni-search-bar 
          @input="input" 
          @confirm="search"
          :radius="100" 
          cancelButton="none" 
          v-else>
        </uni-search-bar>
        <!-- <view class="search-box">
          <uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
        </view> -->
      </view>
    </view>
    <view :style="{ 'height': topPlaceHolder + 'px'}"></view>
  </view>
</template>

<script>
import { mapState, mapMutations} from 'vuex'
  export default {
    props: {
      // 背景颜色
      bgcolor: {
        type: String,
        default: '#C00000'
      },
      // 圆角尺寸
      radius: {
        type: Number,
        default: 18 // px
      },
      // 控制标题和返回符的显示与隐藏
      isShow: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        // isShow: false,
        statusBarHeight: 0,   
        titleBarHeight: 0,
        aTitleBarHeight: 0,
        aStatusBarHeight: 0,
        topPlaceHolder: 0,
        // 防抖
        osi: null,
        // 搜索历史记录
        historyList: [],
      }
    },
    mounted(){
      let menuButtonObject = uni.getMenuButtonBoundingClientRect() 
      //获取菜单按钮（右上角胶囊按钮）的布局位置信息。坐标信息以屏幕左上角为原点。
      uni.getSystemInfo({//获取系统信息
          success: res => {
            let navHeight = menuButtonObject.height + (menuButtonObject.top - res.            statusBarHeight)*2//导航栏高度=菜单按钮高度+（菜单按钮与顶部距离-状态栏高度）*2
            this.titleBarHeight = navHeight
            this.statusBarHeight = res.statusBarHeight
            this.aTitleBarHeight = navHeight 
            this.aStatusBarHeight = res.statusBarHeight
            this.topPlaceHolder = this.statusBarHeight + this.titleBarHeight
          },
      })
        },
    computed: {
      ...mapState('shAbout',['localSearchResults']),
      // ...mapGetters('shAbout',['getLocalSearchResults'])
    },
    methods: {
      ...mapMutations('shAbout',['saveToStorage']),
      searchBoxHandler() {
        this.$emit('search')
      },
      input(e) {
        // console.log("e",e)
        clearTimeout(this.osi)
        this.osi = setTimeout(() => {
          this.$emit('getSearchResults',e)
        } , 500)
      },
      search(e){
        // console.log('e',e.value)
        const set = new Set(this.historyList)
        set.delete(e.value)
        set.add(e.value)
        this.historyList = Array.from(set)
        console.log('history',this.historyList)
        // this.historyList.push(e)
        this.saveToStorage(this.historyList)
        this.$emit('getLocalSearchResults')
      }
    }
  }
</script>

<style lang="scss">
  .search-box {
    position: fixed;
    width: 100%;
    z-index: 999;
    background-color: #C00000;
  }
  .my-search-container {
    // background-color: #C00000;
    padding: 0 10px;
    display: flex;
    align-items: center;

    .my-search-box {
      background-color: #FFFFFF;
      // border-radius: 18px;
      width: 56%;
      height: 70%;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;

      .placeholder {
        font-size: 15px;
        margin-left: 5px;
      }
    }
  }
  
  .right-box {
    display: flex;
    justify-content: center;
    align-items: center;
    .nav-title{
      font-size: 12px;
      color: whitesmoke;
    }
  }
  
</style>
