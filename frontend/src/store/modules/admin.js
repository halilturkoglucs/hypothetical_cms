import axios from 'axios'
import {
  GET_USERS_URL, USER_DETAILS_URL
} from '../../helpers/urls'

const admin = {
  namespaced: true,

  state: {
    users: []
  },

  mutations: {
    get_users (state, payload) {
      state.users = payload
    }
  },
  actions: {
    getUsers ({ commit }) {
      let USERS_URL = GET_USERS_URL

      axios({ url: USERS_URL, method: 'GET' })
        .then(resp => {
          const { data } = resp
          commit('get_users', data)

          return resp
        })
        .catch(err => {
          console.log('Users could not be fetched: ' + err)
        })
    },

    saveUser ({ commit }, user) {
      let userUpdateUrlById = USER_DETAILS_URL.replace('{id}', user.id)

      return new Promise((resolve, reject) => {
        axios({ url: userUpdateUrlById, data: user, method: 'PUT' })
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
  }
}

export default admin
