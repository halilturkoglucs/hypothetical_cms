import Vue from 'vue'
import Vuex from 'vuex'

import auth from '@/store/modules/auth'
import admin from '@/store/modules/admin'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    admin
  },
  strict: process.env.NODE_ENV !== 'production'
})
