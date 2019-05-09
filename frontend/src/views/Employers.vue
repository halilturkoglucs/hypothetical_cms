<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <ManageEmployers v-if="role === 'ADMIN'" />
  </div>
</template>

<script>
// @ is an alias to /src
import ManageEmployers from '@/components/ManageEmployers.vue'

export default {
  name: 'employers',
  components: {
    ManageEmployers
  },
  computed: {
    role: function () {
      return this.$store.getters['auth/userRole']
    }
  }
}
</script>
