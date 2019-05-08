import axios from 'axios'

export function initiateLogin (commit, loginUrl, refreshTokenUrl, payload) {
  return new Promise((resolve, reject) => {
    commit('auth_request')
    axios({ url: loginUrl, data: payload, method: 'POST' })
      .then(resp => {
        const token = resp.data.token
        const user = resp.data.user

        if (!token) {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(new Error('No token provided by server'))
        }
        localStorage.setItem('token', token)
        axios.defaults.headers.common['Authorization'] = token

        commit('auth_success', token, user)
        return resp
      })
      .then(resp => {
        // Obtain refresh token
        const token = resp.data.token

        axios({ url: refreshTokenUrl, data: { 'token': token }, method: 'POST' })
          .then(resp => {
            const refreshToken = resp.data.token

            if (!refreshToken) {
              commit('auth_error')
              localStorage.removeItem('token')
              localStorage.removeItem('refresh_token')
              reject(new Error('No token provided by server'))
            }
            localStorage.setItem('refresh_token', refreshToken)

            resolve(resp)
          })
        resolve(resp)
      })
      .catch(err => {
        commit('auth_error')
        localStorage.removeItem('token')
        localStorage.removeItem('refresh_token')
        reject(err)
      })
  })
}
