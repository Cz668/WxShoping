<template>
  <view>
    <!-- 商品结算区域 -->
    <view class="settlement-container">
      <view class="settlement-box">
        <view class="select-box">
          <radio
            :checked="isCheckAll" 
            color="#C00000" 
            @click="allSelect">
          </radio>
          <text>全选</text>
        </view>
        <view class="total-box">
          <text>合计：</text><text class="summation-text">￥{{summation | tofixed}}</text>
          <view class="btn-payment" @click="settlement">
            结算({{selectGoodsAmount}})
          </view>
        </view>
      </view>     
    </view>
  </view>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
  export default {
    name:"my-setter",
    data() {
      return {
        
      }
    },
    filters: {
      // 把数字处理为带两位小数点的数字
      tofixed(num) {
      return Number(num).toFixed(2)
      }
    },
    computed: {
      ...mapState('cartAbout',['goodsDetail']),
      ...mapGetters('cartAbout',['allGoodsAmount','selectGoodsAmount','summation']),
      ...mapState('userAbout',['address','token']),
      isCheckAll(){
        return this.allGoodsAmount === this.selectGoodsAmount
      }
    },
    methods: {
      ...mapMutations('cartAbout',['upAllState']),
      allSelect() {
        this.upAllState(this.isCheckAll)
      },
      
      // 点击结算
      settlement() {
        // 1. 先判断是否勾选了要结算的商品
        if (!this.selectGoodsAmount) return uni.$showMsg('请选择要结算的商品！')
        // 2. 再判断用户是否选择了收货地址
        if (!this.address) return uni.$showMsg('请选择收货地址！')
        // 3. 最后判断用户是否登录了
        // if (!this.token) return uni.$showMsg('请先登录！')
        if (!this.token) return uni.$showMsg('请先登录！')
        // 4. 实现微信支付功能
        this.payOrder()
      },
      
      // 微信支付
      async payOrder() {
        // 1. 创建订单
        // 1.1 组织订单的信息对象
        const orderInfo = {
          // 开发期间，注释掉真实的订单价格，
          // order_price: this.checkedGoodsAmount,
          // 写死订单总价为 1 分钱
          order_price: 0.01,
          consignee_addr: this.address,
          goods: this.goodsDetail.filter(x => x.goods_state).map(x => ({ goods_id:
          x.goods_id, goods_number: x.goods_count, goods_price: x.goods_price }))
        }
        // 1.2 发起请求创建订单
        const { data: res } = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)
        console.log('res',res)
        if (res.meta.status !== 200) return uni.$showMsg('创建订单失败！')
        // 1.3 得到服务器响应的“订单编号”
        const orderNumber = res.message.order_number
        // 2. 订单预支付
        // 2.1 发起请求获取订单的支付信息
        const { data: res2 } = await
        uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', {
        order_number: orderNumber })
        // 2.2 预付订单生成失败
        if (res2.meta.status !== 200) return uni.$showError('预付订单生成失败！')
        // 2.3 得到订单支付相关的必要参数
        const payInfo = res2.message.pay
        // 3. 发起微信支付
        // 3.1 调用 uni.requestPayment() 发起微信支付
        const [err, succ] = await uni.requestPayment(payInfo)
        // 3.2 未完成支付
        if (err) return uni.$showMsg('订单未支付！')
        // 3.3 完成了支付，进一步查询支付的结果
        const { data: res3 } = await uni.$http.post('/api/public/v1/my/orders/chkOrder', { order_number: orderNumber })
        // 3.4 检测到订单未支付
        if (res3.meta.status !== 200) return uni.$showMsg('订单未支付！')
        // 3.5 检测到订单支付完成
        uni.showToast({
          title: '支付完成！',
          icon: 'success'
        })
      }
    }
  }
</script>

<style lang="scss">

</style>