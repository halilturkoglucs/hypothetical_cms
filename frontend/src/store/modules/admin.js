import axios from 'axios'
import {
  GET_USERS_URL, USER_DETAILS_URL,
  GET_EMPLOYEES_URL, GET_EMPLOYERS_URL
} from '../../helpers/urls'

const admin = {
  namespaced: true,

  state: {
    users: [],
    employees: [],
    employers: []
  },

  mutations: {
    get_users (state, payload) {
      state.users = payload
    },

    get_employees (state, payload) {
      state.employees = payload
    },

    get_employers (state, payload) {
      state.employers = payload
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

    getEmployees ({ commit }) {
      let EMPLOYEES_URL = GET_EMPLOYEES_URL

      axios({ url: EMPLOYEES_URL, method: 'GET' })
        .then(resp => {
          const { data } = resp
          commit('get_employees', data)

          return resp
        })
        .catch(err => {
          console.log('Employees could not be fetched: ' + err)
        })
    },

    getEmployers ({ commit }) {
      let EMPLOYERS_URL = GET_EMPLOYERS_URL

      axios({ url: EMPLOYERS_URL, method: 'GET' })
        .then(resp => {
          const { data } = resp
          commit('get_employers', data)

          return resp
        })
        .catch(err => {
          console.log('Employers could not be fetched: ' + err)
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
