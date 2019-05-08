<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld v-if="!role || role === 'USER'" msg="Welcome to Your Vue.js App"/>
    <AdminHome v-if="role === 'ADMIN'" />
    <EmployeeHome v-if="role === 'EMPLOYEE'" />
    <EmployerHome v-if="role === 'EMPLOYER'" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import AdminHome from '@/components/AdminHome.vue'
import EmployeeHome from '@/components/EmployeeHome.vue'
import EmployerHome from '@/components/EmployerHome.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    AdminHome,
    EmployeeHome,
    EmployerHome
  },
  computed: {
    role: function () {
      console.log(this.$store.getters['auth/userRole'])
      return this.$store.getters['auth/userRole']
    }
  }
}
</script>
