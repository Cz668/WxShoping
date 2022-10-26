export default {
  namespaced: true,
  state: () => ({
    // 获取本地数据
    localSearchResults: JSON.parse(uni.getStorageSync('localSearchResults') || '[]')
    // localSearchResults: []
  }),
  mutations: {
    // 搜索历史保存在本地
    saveToStorage(state,info) {
      uni.setStorageSync('localSearchResults', JSON.stringify(info))
      // this.commit('shAbout/getLocalSearchResults')
    },
  },
  getters: {
    getLocalSearchResults(state) {
      // state.localSearchResults = JSON.parse(uni.getStorageSync('localSearchResults')
      return state.localSearchResults
    }
  }
  
}