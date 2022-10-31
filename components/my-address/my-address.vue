<template>
  <view>
    <view class="address-container">
      <view class="address-box" v-if="!address.userName">
        <button 
          type="primary" 
          size="mini" 
          class="address-btn"
          @click="getUserAddress">
          请选择收货地址+
        </button>
      </view>
      <view 
        class="address-detail" 
        v-else
        @click="getUserAddress">
        <view class="name-phone">
          <text>收货人：{{address.userName}}</text>
          <text>电话：{{address.telNumber}}</text>
        </view>
        <view class="specific-addree">
          收货地址：{{fullAddress}}
        </view>
      </view>
      <img src="/static/cart_border@2x.png" class="address-box-border">
    </view>
  </view>
</template>

<script>
import { mapMutations, mapState , mapGetters} from 'vuex'
  export default {
    name:"my-address",
    data() {
      return {
        // address: []
      }
    },
    computed: {
      ...mapState('userAbout',['address']),
      ...mapGetters('userAbout',['addstr']),
      fullAddress(){
        if(!this.addstr) return ''
        // 拼接 省，市，区，详细地址 的字符串并返回给用户
        return  this.addstr
      }
    },
    methods: {
      ...mapMutations('userAbout',['upAddress']),
      // 选择收货地址
      async getUserAddress() {
        // 1. 调用小程序提供的 chooseAddress() 方法，即可使用选择收货地址的功能
        // 返回值是一个数组：第 1 项为错误对象；第 2 项为成功之后的收货地址对象
        const [err, succ] = await uni.chooseAddress().catch(err => err)
        // console.log('err',err)
        // console.log('succ',succ)
        // 2. 用户成功的选择了收货地址
        if (err === null && succ.errMsg === 'chooseAddress:ok') {
        // 为 data 里面的收货地址对象赋值
        // this.address = succ
        this.upAddress(succ)
        }
      }
    }
  }
</script>

<style lang="scss">
  .address-container {
    .address-box {
      height: 90px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .address-box-border {
      display: block;
      width: 100%;
      height: 5px;
    }
  }
  .address-detail {
    height: 90px;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 5px;
    .name-phone {
      display: flex;
      justify-content: space-between;
    }
    .specific-addree {
      margin-top: 10px;
    }
  }
</style>