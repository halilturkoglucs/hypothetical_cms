<template>
  <div class="hello">
    <h2>
      MANAGE EMPLOYERS
    </h2>
    <div>
      <h5>Register New Employer</h5>
      <b-container>
        <b-row>
          <b-col></b-col>
          <b-col cols="8">
            <RegisterEmployerForm />
          </b-col>
          <b-col></b-col>
        </b-row>
      </b-container>
    </div>
    <div>
      <h5>Employers List</h5>
      <b-container>
        <b-row>
          <b-col></b-col>
          <b-col cols="8">
            <b-table striped hover :items="employers" :fields="employers_fields">
              <template slot="actions" scope="employerRow">
                <b-button variant="outline-primary" v-b-modal="'modal-employer-' + employerRow.item.id"
                          @click="edit(employerRow.item)">
                  Edit
                </b-button>
                <!-- Employee Edit Window -->
                <div>
                  <b-modal v-bind:id="'modal-employer-' + employerRow.item.id"
                           size="lg" title="Edit Employer" ok-only no-stacking>
                    <b-container>
                      <b-row>
                        <b-col></b-col>
                        <b-col>
                          <b-form @submit.prevent="saveEmployer">
                            <b-form-group
                              label="Company Name"
                              label-for="company_name"
                            >
                              <b-form-input type="text" v-model="employerRow.item.company_name" name="company_name" class="form-control" />
                            </b-form-group>
                            <b-form-group
                              label="User"
                              label-for="user"
                            >
                              <b-form-select v-model="employerRow.item.user.id" :options="users" name="user" class="form-control">
                              </b-form-select>
                            </b-form-group>
                            <b-form-group>
                              <b-button v-b-modal="'modal-employer-second-' + employerRow.item.id"
                                        v-on:click="saveEmployer(employerRow.item)">Save</b-button>
                            </b-form-group>
                          </b-form>
                        </b-col>
                        <b-col></b-col>
                      </b-row>
                    </b-container>
                  </b-modal>
                  <b-modal v-bind:id="'modal-employer-second-' + employerRow.item.id" title="Success" ok-only>
                    <p class="my-2">Please close the window</p>
                  </b-modal>
                </div>
              </template>
            </b-table>
          </b-col>
          <b-col></b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import RegisterEmployerForm from './RegisterEmployerForm'

export default {
  components: { RegisterEmployerForm },
  data () {
    return {
      userRolesList: ['USER', 'EMPLOYER', 'EMPLOYEE'],
      employers_fields: {
        'user.id': {
          sortable: true,
          label: 'User Id'
        },
        'company_name': {

        },
        'actions': {
          label: 'Actions'
        }
      }
    }
  },

  name: 'ManageEmployers',

  props: {
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
      },
      employers: state => state.admin.employers
    })
  },

  methods: {
    edit: function (user) {
      console.log(user)
    },

    saveEmployer: function (employer) {
      const employerObservable = JSON.parse(JSON.stringify(employer))
      let payload = {
        id: employerObservable.id,
        user: employerObservable.user.id,
        company_name: employerObservable.company_name
      }

      this.$store.dispatch('employer/saveEmployer', payload)
        .catch(err => console.log(err))
    }
  },

  mounted () {
    this.$store.dispatch('admin/getUsers')
    this.$store.dispatch('admin/getEmployees')
    this.$store.dispatch('admin/getEmployers')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
