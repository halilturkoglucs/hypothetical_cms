<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <ManageEmployees v-if="role === 'EMPLOYEE' || role === 'EMPLOYER' || role === 'ADMIN'" />
  </div>
</template>

<script>
// @ is an alias to /src
import ManageEmployees from '@/components/ManageEmployees.vue'

export default {
  name: 'employees',
  components: {
    ManageEmployees
  },
  computed: {
    role: function () {
      return this.$store.getters['auth/userRole']
    }
  }
}
</script>
