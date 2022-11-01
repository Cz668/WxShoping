<template>
  <view>
    <view class="login-container">
      <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
      <!-- <button type="primary" class="btn-login" open-type="getUserInfo"
@click="login">一键登录</button> -->
      <button 
        type="primary" 
        class="btn-login" 
        @click="login">
      一键登录</button>
      <text class="login-text">登录后尽享更多权益</text>
    </view>
  </view>
</template> 

<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    name:"my-login",
    data() {
      return {
        
      }
    },
    computed: {
      ...mapState('userAbout',['token','userInfo']),
    },
    methods: {
      ...mapMutations('userAbout',['upDataUserInfo','upDataToken']),
      // getUserInfo(e) {
      //   // 判断是否获取用户信息成功
      //   if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权！')
      //   // 获取用户信息成功， e.detail.userInfo 就是用户的基本信息
      //   this.upDataUserInfo(e.detail.userInfo)
      //   // console.log('e.detail.userInfo',e)
      //   this.getToken(e.detail)
      // },
      
      async getToken(info) {
        // 调用微信登录接口
        const [err, res] = await uni.login().catch(err => err)
        // 判断是否 wx.login() 调用失败
        if (err || res.errMsg !== 'login:ok') return uni.$showError('登录失败！')
        // 准备参数对象
        const query = {
          code: res.code, //这个参数是 uni.login() 带来的
          encryptedData: info.encryptedData,
          iv: info.iv,
          rawData: info.rawData,
          signature: info.signature
        }
        // console.log('query',query)
        // 换取 token
        // 注意：因前端与后端所用的appId不同此代码暂不可用
        // const { data: loginResult } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
        // console.log('loginResult',loginResult)
        // if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败！')
        // 直接把 token 保存到 vuex 中
        // this.updateToken(loginResult.message.token)
        
        // 将 token 改为 code 模拟 token,并保存在本地
        this.upDataToken(query.code)
        console.log('query.code',query.code)
      },
      
      //授权登录
      login(){
        uni.getUserProfile({
          desc: '用于登录信息',//声明获取用户个人信息后的用途，后续会展示在弹窗中
          success:res =>{
            let user = res.userInfo
            // console.log('res',res)
            // 获取token
            this.getToken(user)
            //把用户信息缓存到本地
            this.upDataUserInfo(user)
            // console.log("用户信息",user)
          },
          fail: res=>{
            uni.$showMsg('登录失败！')
            // console.log('授权失败',res)
          }
        })
      },
    }
  }
</script>

<style lang="scss">
  .login-container {
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;
    height: 750rpx;
    .btn-login {
      width: 90%;
      border-radius: 100px;
      margin: 15px 0;
      background-color: #C00000;
    }
    .login-text {
      font-size: 12px;
      color: gray;
    }
  }
</style>