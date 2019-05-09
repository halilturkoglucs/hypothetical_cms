import axios from 'axios'
import {
  EMPLOYEE_DETAILS_URL,
  GET_EMPLOYEES_URL, GET_EMPLOYERS_URL
} from '../../helpers/urls'

const employee = {
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

    register ({ commit }, employee) {
      return new Promise((resolve, reject) => {
        // Manually change the role
        employee.user.role = 'EMPLOYEE'

        employee.user = employee.user.id
        employee.employer = employee.employer.id

        axios({ url: GET_EMPLOYEES_URL, data: employee, method: 'POST' })
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    saveEmployee ({ commit }, employee) {
      let employerUpdateUrlById = EMPLOYEE_DETAILS_URL.replace('{id}', employee.id)

      employee.user = employee.user.id
      employee.employer = employee.employer.id

      return new Promise((resolve, reject) => {
        axios({ url: employerUpdateUrlById, data: employee, method: 'PUT' })
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

export default employee
