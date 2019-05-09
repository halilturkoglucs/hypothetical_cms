import axios from 'axios'
import {
  EMPLOYER_DETAILS_URL,
  GET_EMPLOYEES_URL, GET_EMPLOYERS_URL
} from '../../helpers/urls'

const employer = {
  namespaced: true,

  state: {
    employees: [],
    employers: []
  },

  mutations: {
    get_employees (state, payload) {
      state.employees = payload
    },

    get_employers (state, payload) {
      state.employers = payload
    }
  },
  actions: {
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

    register ({ commit }, employer) {
      return new Promise((resolve, reject) => {
        // Manually change the role
        employer.user.role = 'EMPLOYER'

        employer.user = employer.user.id

        axios({ url: GET_EMPLOYERS_URL, data: employer, method: 'POST' })
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    saveEmployer ({ commit }, employer) {
      let employerUpdateUrlById = EMPLOYER_DETAILS_URL.replace('{id}', employer.id)

      employer.user = employer.user.id

      return new Promise((resolve, reject) => {
        axios({ url: employerUpdateUrlById, data: employer, method: 'PUT' })
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}

export default employer
