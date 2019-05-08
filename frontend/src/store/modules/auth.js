import axios from 'axios'
import {
  OBTAIN_TOKEN_URL, REFRESH_TOKEN_URL, REGISTERATION_URL
} from '../../helpers/urls'
import {initiateLogin} from '../../helpers/services'

const auth = {
  namespaced: true,

  state: {
    login: {
      username: null,
      password: null,
      loggingIn: false,
      submitted: false
    },
    register: {
      username: null,
      password: null,
      loggingIn: false,
      submitted: false
    },
    status: '',
    token: localStorage.getItem('token') || '',
    user: {}
  },

  mutations: {
    auth_request (state) {
      state.status = 'loading'
    },
    auth_success (state, token, user) {
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error (state) {
      state.status = 'error'
    },
    logout (state) {
      state.status = ''
      state.token = ''
    }
  },
  actions: {
    login ({ commit }, user) {
      let OBTAIN_TOKEN = OBTAIN_TOKEN_URL
      let REFRESH_TOKEN = REFRESH_TOKEN_URL

      initiateLogin(commit, OBTAIN_TOKEN, REFRESH_TOKEN, user)
    },
    register ({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: REGISTERATION_URL, data: user, method: 'POST' })
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            localStorage.removeItem('token')
            localStorage.removeItem('refresh_token')
            reject(err)
          })
      })
    },
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        localStorage.removeItem('refresh_token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  },
  getters: {
    username (state) {
      return state.username
    },
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  }
}

export default auth
