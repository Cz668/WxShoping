import Vue from 'vue'
import Vuex from 'vuex'
import searchHistory from '@/store/searchHistory.js'

Vue.use(Vuex)

const store = new Vuex.Store ({
  modules: {
    'shAbout': searchHistory,
  }
})

export default store