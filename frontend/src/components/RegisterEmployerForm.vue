<template>
  <div>
    <b-container>
      <b-row>
        <b-col></b-col>
        <b-col>
          <b-form @submit.prevent="register">
            <b-form-group
              label="Select User"
              label-for="user"
            >
              <b-form-select v-model="user" :options="users" class="form-control">
              </b-form-select>
            </b-form-group>
            <b-form-group
              label="Company Name"
              label-for="companyName"
            >
              <b-form-input type="text" v-model="companyName" name="companyName" class="form-control" />
            </b-form-group>
            <b-form-group>
              <b-button class="btn btn-primary" v-on:click="register()">Submit</b-button>
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
  name: 'RegisterEmployerForm',

  data () {
    return {
      companyName: '',
      user: null
    }
  },

  computed: {
    ...mapState({
      users: state => {
        let users = state.admin.users

        users = users.map((user) => {
          return {
            value: user,
            text: user.first_name + ' ' + user.last_name
          }
        })

        return users
      }
    })
  },

  methods: {
    register: function () {
      const { user, companyName } = this
      let data = {
        user: user,
        company_name: companyName
      }
      this.$store.dispatch('employer/register', data)
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
