import Vue from 'vue'
import Vuex from 'vuex'

import auth from '@/store/modules/auth'
import admin from '@/store/modules/admin'
import employer from '@/store/modules/employer'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    admin,
    employer
  },
  strict: process.env.NODE_ENV !== 'production'
})
