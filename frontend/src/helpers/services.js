import axios from 'axios'

export function initiateLogin (commit, loginUrl, refreshTokenUrl, userdetailsUrl, payload) {
  return new Promise((resolve, reject) => {
    commit('auth_request')
    axios({ url: loginUrl, data: payload, method: 'POST' })
      .then(resp => {
        const token = resp.data.token

        if (!token) {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(new Error('No token provided by server'))
        }
        localStorage.setItem('token', token)
        axios.defaults.headers.common['Authorization'] = token
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
              localStorage.removeItem('user')
              reject(new Error('No token provided by server'))
            }
            localStorage.setItem('refresh_token', refreshToken)

            // append token to resp as well
            resp.token = token
            return resp
          })
          .then(resp => {
            // Get User details
            const username = payload.username
            let userdetailsUrlById = userdetailsUrl.replace("{id}", "1")

            axios({ url: userdetailsUrlById, method: 'GET' })
              .then(resp => {
                let role

                let user = resp.data
                if (user.is_superuser) {
                  role = 'ADMIN'
                } else {
                  role = user.role
                }

                let auth_success_data = {
                  token,
                  user,
                  role
                }

                let userJSONString = JSON.stringify(user)
                localStorage.setItem('user', userJSONString)
                localStorage.setItem('user_role', role)
                commit('auth_success', auth_success_data)

                resolve(resp)
              })
            resolve(resp)
          })
      })
      .catch(err => {
        commit('auth_error')
        localStorage.removeItem('token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('user')
        reject(err)
      })
  })
}
