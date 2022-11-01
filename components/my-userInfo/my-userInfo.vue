<template>
  <view>
    <view class="userInfo-container">
      <!-- 用户头像名称区域 -->
      <view class="userInfo-img-name-box">
        <image :src="userInfo.avatarUrl" class="user-avatar"></image>
        <text class="user-name">{{userInfo.nickName}}</text>
      </view>
      
      <!-- 面板区域 -->
      <view class="panel-list">
        <view class="panel-body">
          <view class="panel-item">
            <text>8</text>
            <text>收藏的店铺</text>
          </view>
          <view class="panel-item">
            <text>14</text>
            <text>收藏的商品</text>
          </view>
          <view class="panel-item">
            <text>18</text>
            <text>关注的商品</text>
          </view>
          <view class="panel-item">
            <text>84</text>
            <text>足迹</text>
          </view>
        </view>
        
        <!-- 订单面板 -->
        <view class="order-panel">
          <view class="my-order">
            <text>我的订单</text>
          </view>
          <view class="oredr-detail">
            <view class="order-item">
              <image src="/static/my-icons/icon1.png" class="icon"></image>
              <text>待付款</text>
            </view>
            <view class="order-item">
              <image src="/static/my-icons/icon2.png" class="icon"></image>
              <text>待收货</text>
            </view>
            <view class="order-item">
              <image src="/static/my-icons/icon3.png" class="icon"></image>
              <text>退款/退货</text>
            </view>
            <view class="order-item">
              <image src="/static/my-icons/icon4.png" class="icon"></image>
              <text>全部订单</text>
            </view>
          </view>
        </view>
        
        <!-- 其他面板区域 -->
        <view class="else-panel">
          <view class="else-item">
            <text>收货地址</text>
            <uni-icons type="arrowright" size="15"></uni-icons>
          </view>
          <view class="else-item">
            <text>联系客服</text>
            <uni-icons type="arrowright" size="15"></uni-icons>
          </view>
          <view class="else-item" @click="outLogin">
            <text>退出登录</text>
            <uni-icons type="arrowright" size="15"></uni-icons>
          </view>
        </view>
      </view>
      
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
  export default {
    name:"my-userInfo",
    data() {
      return {
        
      }
    },
    computed: {
      ...mapState('userAbout',['userInfo'])
    },
    methods: {
      ...mapMutations('userAbout',['upAddress','upDataToken','upDataUserInfo']),
      async outLogin() {
        const [err, succ] = await uni.showModal({
          title: '提示',
          content: '确认退出登录吗？'
        }).catch(err => err)
        // console.log('succ',succ)
        if(succ && succ.confirm) {
          this.upAddress('')
          this.upDataToken('')
          this.upDataUserInfo('')
        }
      }
    }
  }
</script>

<style lang="scss">
  .userInfo-container {
    height: 100%;
    background-color: #F4F4F4;
    .userInfo-img-name-box {
      height: 400rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #C00000;
      .user-avatar{
        width: 90px;
        height: 90px;
        border-radius: 45px;
        border: 1px solid #FFF;
        box-shadow: 0 1px 5px black;
      }
      .user-name {
        font-size: 16px;
        color: #FFF;
        font-weight: bold;
        margin-top: 10px;
      }
    }
  }
  
  .panel-list {
    padding: 0 10px;
    position: relative;
    top: -10px;
    .panel-body{
      display: flex;
      justify-content: space-around;
      border-radius: 3px;
      margin-bottom: 8px;
      background-color: white;
      padding: 8px 0;
      .panel-item{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 13px;
      }
    }
  }
  
  .order-panel {
    background-color: white;
    .my-order {
      height: 45px;
      line-height: 45px;
      padding-left: 10px;
      font-size: 15px;
      border-bottom: 1px solid #F4F4F4;
    }
    .oredr-detail {
      display: flex;
      justify-content: space-around;
      border-radius: 3px;
      margin-bottom: 8px;
      .order-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 10px 0;
        .icon {
          width: 35px;
          height: 35px;
        }
      }
    }
  }
  
  .else-panel {
    padding: 0 10px;
    background-color: white;
    .else-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid #F4F4F4;
    }
  }
</style>