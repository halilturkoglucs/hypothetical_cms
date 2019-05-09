<template>
  <div class="hello">
    <h2>
      MANAGE EMPLOYEES
    </h2>
    <div>
      <h5>Employees List</h5>
      <b-container>
        <b-row>
          <b-col></b-col>
          <b-col cols="8">
            <b-table striped hover :items="employees" :fields="employees_fields">
              <template slot="actions" scope="employeeRow">
                <b-button variant="outline-primary" v-b-modal="'modal-multi-employee-' + employeeRow.item.id" @click="edit(employeeRow.item)">
                  Edit
                </b-button>
                <!-- User Edit Window -->
                <div>
                  <b-modal v-bind:id="'modal-multi-employee' + employeeRow.item.id" size="lg" title="Edit Employee" ok-only no-stacking>
                    <b-container>
                      <b-row>
                        <b-col></b-col>
                        <b-col>
                          <b-form @submit.prevent="saveUser">
                            <b-form-group
                              label="email"
                              label-for="email"
                            >
                              <b-form-input type="text" v-model="employeeRow.item.email" name="email" class="form-control" />
                            </b-form-group>
                            <b-form-group
                              label="Password"
                              label-for="password"
                            >
                              <b-form-input type="password" v-model="employeeRow.item.password" name="password" class="form-control" />
                            </b-form-group>
                            <b-form-group
                              label="role"
                              label-for="role"
                            >
                              <b-form-select v-model="employeeRow.item.role" :options="userRolesList" class="form-control">
                              </b-form-select>
                            </b-form-group>
                            <b-form-group>
                              <b-button v-b-modal="'modal-multi-employee-second-' + employeeRow.item.id" v-on:click="saveUser(userRow.item)">Save</b-button>
                            </b-form-group>
                          </b-form>
                        </b-col>
                        <b-col></b-col>
                      </b-row>
                    </b-container>
                  </b-modal>

                  <b-modal v-bind:id="'modal-multi-employee-second-' + employeeRow.item.id" title="Success" ok-only>
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

export default {
  data () {
    return {
      userRolesList: ['USER', 'EMPLOYER', 'EMPLOYEE'],
      userEdit: {
        email: '',
        password: ''
      },
      fields: {
        'id': {
          sortable: true
        },
        'first_name': {

        },
        'last_name': {

        },
        'email': {

        },
        'actions': {
          label: 'Actions'
        }
      },
      employees_fields: {
        'user.id': {
          sortable: true,
          label: 'Id'
        },
        'employer.company_name': {
          label: 'Company Name'
        }
      },
      employers_fields: {
        'user.id': {
          sortable: true,
          label: 'Id'
        },
        'company_name': {

        }
      }
    }
  },

  name: 'ManageEmployees',

  props: {
  },

  computed: {
    ...mapState({
      users: state => state.admin.users,
      employees: state => state.admin.employees
    })
  },

  methods: {
    edit: function (user) {
      console.log(user)
    },

    saveUser: function (user) {
      console.log(user)
      this.$store.dispatch('admin/saveUser', user)
        .catch(err => console.log(err))
    }
  },

  mounted () {
    this.$store.dispatch('admin/getUsers')

    // Only get own employees
    let role = this.$store.getters['auth/userRole']

    if (role === 'EMPLOYER') {
      this.$store.dispatch('employer/getEmployees')
    } else if (role === 'ADMIN') {
      this.$store.dispatch('admin/getEmployees')
    }
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
