<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> <span v-if="isLoggedIn"> | </span>
      <router-link to="/about" v-if="isLoggedIn">About</router-link> <span v-if="!isLoggedIn"> | </span>
      <router-link to="/login" v-if="!isLoggedIn">Login</router-link> <span v-if="!isLoggedIn"> | </span>
      <router-link to="/register" v-if="!isLoggedIn">Register</router-link> <span v-if="isLoggedIn"> | </span>
      <router-link to="/employers" v-if="userRole == 'ADMIN'">
        Manage Employers
      </router-link> <span v-if="userRole == 'ADMIN'"> | </span>
      <router-link to="/employees" v-if="userRole == 'ADMIN' || userRole == 'EMPLOYER'">
        Manage Employees
      </router-link> <span v-if="userRole == 'ADMIN' || userRole == 'EMPLOYER'"> | </span>
      <router-link to="/tasks" v-if="userRole == 'ADMIN' || userRole == 'EMPLOYER' || userRole == 'EMPLOYEE'">
        Manage Tasks
      </router-link> <span v-if="userRole == 'ADMIN' || userRole == 'EMPLOYER' || userRole == 'EMPLOYEE'"> | </span>
      <router-link to="/login" @click.native="logout" v-if="isLoggedIn">Logout</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn: function () { return this.$store.getters['auth/isLoggedIn'] },
    userRole: function () { return this.$store.getters['auth/userRole'] }
  },
  methods: {
    logout: function () {
      this.$store.dispatch('auth/logout')
    }
  },
  created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch('auth/logout')
        }
        throw err
      })
    })
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
