<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <ManageTasks v-if="role === 'EMPLOYEE' || role === 'EMPLOYER' || role === 'ADMIN'" />
  </div>
</template>

<script>
// @ is an alias to /src
import ManageTasks from '@/components/ManageTasks.vue'

export default {
  name: 'tasks',
  components: {
    ManageTasks
  },
  computed: {
    role: function () {
      return this.$store.getters['auth/userRole']
    }
  }
}
</script>
