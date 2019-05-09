import Vue from 'vue'
import Vuex from 'vuex'

import auth from '@/store/modules/auth'
import admin from '@/store/modules/admin'
import employer from '@/store/modules/employer'
import employee from '@/store/modules/employee'
import task from '@/store/modules/task'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    admin,
    employer,
    employee,
    task
  },
  strict: process.env.NODE_ENV !== 'production'
})
