import Vue from 'vue'
import Vuex from 'vuex'
import searchHistory from '@/store/searchHistory.js'
import cart from '@/store/cart.js'
import user from '@/store/user.js'

Vue.use(Vuex)

const store = new Vuex.Store ({
  modules: {
    'shAbout': searchHistory,
    'cartAbout': cart,
    'userAbout': user
  }
})

export default store