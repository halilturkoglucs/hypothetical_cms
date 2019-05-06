const login = {
  namespaced: true,

  state: {
    username: null,
    password: null,
    loggingIn: false,
    submitted: false
  },
  mutations: {

  },
  actions: {

  },
  getters: {
    username (state) {
      return state.username
    }
  }
}

export default login
