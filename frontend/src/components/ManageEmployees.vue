<template>
  <div class="hello">
    <h2>
      MANAGE EMPLOYEES
    </h2>
    <div>
      <h5>Register New Employee</h5>
      <b-container>
        <b-row>
          <b-col></b-col>
          <b-col cols="8">
            <RegisterEmployeeForm />
          </b-col>
          <b-col></b-col>
        </b-row>
      </b-container>
    </div>
    <div>
      <h5>Employees List</h5>
      <b-container>
        <b-row>
          <b-col></b-col>
          <b-col cols="8">
            <b-table striped hover :items="employees" :fields="employers_fields">
              <template slot="actions" scope="employeeRow">
                <b-button variant="outline-primary" v-b-modal="'modal-employer-' + employeeRow.item.id"
                          @click="edit(employeeRow.item)">
                  Edit
                </b-button>
                <!-- Employee Edit Window -->
                <div>
                  <b-modal v-bind:id="'modal-employer-' + employeeRow.item.id"
                           size="lg" title="Edit Employer" ok-only no-stacking>
                    <b-container>
                      <b-row>
                        <b-col></b-col>
                        <b-col>
                          <b-form @submit.prevent="saveEmployee">
                            <b-form-group
                              label="Company Name"
                              label-for="company_name"
                            >
                              <b-form-input type="text" v-model="employeeRow.item.company_name" name="company_name" class="form-control" />
                            </b-form-group>
                            <b-form-group
                              label="User"
                              label-for="user"
                            >
                              <b-form-select v-model="employeeRow.item.user.id" :options="users" name="user" class="form-control">
                              </b-form-select>
                            </b-form-group>
                            <b-form-group>
                              <b-button v-b-modal="'modal-employer-second-' + employeeRow.item.id"
                                        v-on:click="saveEmployee(employeeRow.item)">Save</b-button>
                            </b-form-group>
                          </b-form>
                        </b-col>
                        <b-col></b-col>
                      </b-row>
                    </b-container>
                  </b-modal>
                  <b-modal v-bind:id="'modal-employer-second-' + employeeRow.item.id" title="Success" ok-only>
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
import RegisterEmployeeForm from './RegisterEmployeeForm'

export default {
  components: { RegisterEmployeeForm },
  data () {
    return {
      userRolesList: ['USER', 'EMPLOYER', 'EMPLOYEE'],
      employers_fields: {
        'user.id': {
          sortable: true,
          label: 'User Id'
        },
        'employer.company_name': {
          label: 'Company Name'
        },
        'actions': {
          label: 'Actions'
        }
      }
    }
  },

  name: 'ManageEmployees',

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
      employees: state => state.admin.employees
    })
  },

  methods: {
    edit: function (user) {
      console.log(user)
    },

    saveEmployee: function (employer) {
      const employerObservable = JSON.parse(JSON.stringify(employer))
      let payload = {
        id: employerObservable.id,
        user: employerObservable.user.id,
        company_name: employerObservable.company_name
      }

      this.$store.dispatch('employee/saveEmployee', payload)
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
