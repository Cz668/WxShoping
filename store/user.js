export default ({
  namespaced: true,
  state: () => ({
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
    // token: JSON.parse(uni.getStorageSync('token') || '{}'),
    token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo',
    userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}'),
  }),
  mutations: {
    saveAddress(state) {
      uni.setStorageSync('address',JSON.stringify(state.address))
    },
    saveToken(state) {
      uni.setStorageSync('token',JSON.stringify(state.token))
    },
    saveUserInfo(state) {
      uni.setStorageSync('userInfo',JSON.stringify(state.userInfo))
    },
    
    upAddress(state,address) {
      state.address = address
      this.commit('userAbout/saveAddress')
    },
    upDataToken(state,token) {
      state.token = token
      this.commit('userAbout/saveToken')
    },
    upDataUserInfo(state,userInfo) {
      state.userInfo = userInfo
      this.commit('userAbout/saveUserInfo')
    },
  
  },
  getters: {
    addstr(state) {
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
    }
  }
})