import axios from 'axios'
import {
  GET_TASKS_URL,
  TASK_DETAILS_URL
} from '../../helpers/urls'

const task = {
  namespaced: true,

  state: {
    tasks: []
  },

  mutations: {
    get_tasks (state, payload) {
      state.tasks = payload
    }
  },
  actions: {
    getTasks ({ commit }) {
      let TASKS_URL = GET_TASKS_URL

      axios({ url: TASKS_URL, method: 'GET' })
        .then(resp => {
          const { data } = resp
          commit('get_tasks', data)

          return resp
        })
        .catch(err => {
          console.log('Tasks could not be fetched: ' + err)
        })
    },

    save ({ commit }, task) {
      return new Promise((resolve, reject) => {
        task.employee = task.employee.id

        axios({ url: GET_TASKS_URL, data: task, method: 'POST' })
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    saveTask ({ commit }, task) {
      let employerUpdateUrlById = TASK_DETAILS_URL.replace('{id}', task.id)

      task.employee = task.employee.id

      return new Promise((resolve, reject) => {
        axios({ url: employerUpdateUrlById, data: task, method: 'PUT' })
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

export default task
