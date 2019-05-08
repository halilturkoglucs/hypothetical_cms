import axios from 'axios'
import {
  OBTAIN_TOKEN_URL, REFRESH_TOKEN_URL, REGISTERATION_URL, USER_DETAILS_URL
} from '../../helpers/urls'
import { initiateLogin } from '../../helpers/services'

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
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    role: localStorage.getItem('user_role') || null
  },

  mutations: {
    auth_request (state) {
      state.status = 'loading'
    },
    auth_success (state, payload) {
      state.status = 'success'
      state.token = payload.token
      state.user = payload.user
      state.role = payload.role
    },
    auth_error (state) {
      state.status = 'error'
    },
    logout (state) {
      state.status = ''
      state.token = undefined
      state.role = undefined
      state.user = undefined
    }
  },
  actions: {
    login ({ commit }, user) {
      let OBTAIN_TOKEN = OBTAIN_TOKEN_URL
      let REFRESH_TOKEN = REFRESH_TOKEN_URL
      let USER_DETAILS = USER_DETAILS_URL

      initiateLogin(commit, OBTAIN_TOKEN, REFRESH_TOKEN, USER_DETAILS, user)
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
            localStorage.removeItem('user')
            localStorage.removeItem('user_role')
            reject(err)
          })
      })
    },
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('user')
        localStorage.removeItem('user_role')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    userRole: state => state.role
  }
}

export default auth
