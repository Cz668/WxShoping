export default ({
  namespaced: true,
  state: () => ({
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
  }),
  mutations: {
    saveAddress(state) {
      uni.setStorageSync('address',JSON.stringify(state.address))
    },
    upAddress(state,address) {
      state.address = address
      this.commit('userAbout/saveAddress')
    }
  },
  getters: {
    addstr(state) {
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
    }
  }
})