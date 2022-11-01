<template>
  <view>
    <my-login v-if="!token"></my-login>
    <my-userInfo v-else></my-userInfo>
  </view>
</template>

<script>
   import { mapState } from 'vuex'
  export default {
    data() {
      return {
        
      }
    },
    onLoad() {
      console.log('userInfo',this.userInfo)
    },
    computed: {
      ...mapState('userAbout',['token','userInfo']),
    }
  }
</script>

<style lang="scss">

</style>
