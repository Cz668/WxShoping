import Vue from 'vue'
import Vuex from 'vuex'
import searchHistory from '@/store/searchHistory.js'
import cart from '@/store/cart.js'

Vue.use(Vuex)

const store = new Vuex.Store ({
  modules: {
    'shAbout': searchHistory,
    'cartAbout': cart
  }
})

export default store