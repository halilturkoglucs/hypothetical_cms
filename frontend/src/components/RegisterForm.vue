<template>
  <div>
    <b-container>
      <b-row>
        <b-col></b-col>
        <b-col>
          <b-form @submit.prevent="register">
            <b-form-group
              label="First Name"
              label-for="firstName"
            >
              <b-form-input type="text" v-model="firstName" name="firstName" class="form-control" :class="{ 'is-invalid': submitted && !email }" />
              <div v-show="submitted && !firstName" class="invalid-feedback">First Name is required</div>
            </b-form-group>
            <b-form-group
              label="Last Name"
              label-for="lastName"
            >
              <b-form-input type="text" v-model="lastName" name="lastName" class="form-control" :class="{ 'is-invalid': submitted && !email }" />
              <div v-show="submitted && !lastName" class="invalid-feedback">Last Name is required</div>
            </b-form-group>
            <b-form-group
              label="email"
              label-for="email"
            >
              <b-form-input type="text" v-model="email" name="email" class="form-control" :class="{ 'is-invalid': submitted && !email }" />
              <div v-show="submitted && !email" class="invalid-feedback">email is required</div>
            </b-form-group>
            <b-form-group
              label="Password"
              label-for="password"
            >
              <b-form-input type="password" v-model="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && !password }" />
              <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
            </b-form-group>
            <b-form-group>
              <b-button class="btn btn-primary" :disabled="loggingIn" v-on:click="register()">Register</b-button>
              <img alt="login loader img"
                   v-show="loggingIn" src="data:image/gifbase64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
              <router-link to="/login" class="btn btn-link">Login</router-link>
            </b-form-group>
          </b-form>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'RegisterForm',

  data () {
    return {
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    }
  },

  computed: {
    ...mapState({
      loggingIn: state => state.auth.register.loggingIn,
      submitted: state => state.auth.register.submitted
    })
  },

  methods: {
    register: function () {
      const { email, password, firstName, lastName } = this
      let data = {
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName
      }
      this.$store.dispatch('auth/register', data)
        .then(() => {
          // Initiate login since the user is registered now
          this.$store.dispatch('auth/login', data)
            .then(() => this.$router.push('/'))
            .catch(err => console.log(err))
        })
        .then(() => {
          this.$router.push('/')
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style>
  .form-elegant .font-small {
    font-size: 0.8rem }

  .form-elegant .z-depth-1a {
    -webkit-box-shadow: 0 2px 5px 0 rgba(55, 161, 255, 0.26), 0 4px 12px 0 rgba(121, 155, 254, 0.25);
    box-shadow: 0 2px 5px 0 rgba(55, 161, 255, 0.26), 0 4px 12px 0 rgba(121, 155, 254, 0.25) }

  .form-elegant .z-depth-1-half,
  .form-elegant .btn:hover {
    -webkit-box-shadow: 0 5px 11px 0 rgba(85, 182, 255, 0.28), 0 4px 15px 0 rgba(36, 133, 255, 0.15);
    box-shadow: 0 5px 11px 0 rgba(85, 182, 255, 0.28), 0 4px 15px 0 rgba(36, 133, 255, 0.15) }
</style>
