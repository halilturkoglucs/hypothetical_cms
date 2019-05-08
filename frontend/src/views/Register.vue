<template>
  <div class="register">
    <img alt="Vue logo" src="../assets/logo.png">
    <RegisterForm/>
  </div>
</template>

<script>
// @ is an alias to /src
import RegisterForm from '@/components/RegisterForm.vue'

export default {
  name: 'register',
  components: {
    RegisterForm
  }
}
</script>
