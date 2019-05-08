<template>
  <div class="hello">
    <h2>
      ADMIN HOME
    </h2>
    <div>
      <h5>Users List</h5>
      <b-container>
        <b-row>
          <b-col></b-col>
          <b-col cols="8">
            <b-table striped hover :items="users" :fields="fields">
              <template slot="actions" scope="userRow">
                <b-button variant="outline-primary" v-b-modal="'modal-multi-' + userRow.item.id" @click="edit(userRow.item)">
                  Edit
                </b-button>
                <!-- User Edit Window -->
                <div>
                  <b-modal v-bind:id="'modal-multi-' + userRow.item.id" size="lg" title="Edit User" ok-only no-stacking>
                    <b-container>
                      <b-row>
                        <b-col></b-col>
                        <b-col>
                          <b-form @submit.prevent="saveUser">
                            <b-form-group
                              label="email"
                              label-for="email"
                            >
                              <b-form-input type="text" v-model="userRow.item.email" name="email" class="form-control" />
                            </b-form-group>
                            <b-form-group
                              label="Password"
                              label-for="password"
                            >
                              <b-form-input type="password" v-model="userRow.item.password" name="password" class="form-control" />
                            </b-form-group>
                            <b-form-group
                              label="role"
                              label-for="role"
                            >
                              <b-form-select v-model="userRow.item.role" :options="userRolesList" class="form-control">
                              </b-form-select>
                            </b-form-group>
                            <b-form-group>
                              <b-button v-b-modal="'modal-multi-second-' + userRow.item.id" v-on:click="saveUser(userRow.item)">Save</b-button>
                            </b-form-group>
                          </b-form>
                        </b-col>
                        <b-col></b-col>
                      </b-row>
                    </b-container>
                  </b-modal>

                  <b-modal v-bind:id="'modal-multi-second-' + userRow.item.id" title="Success" ok-only>
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
    <div>
      <h5>Employers List</h5>
      <b-container>
        <b-row>
          <b-col></b-col>
          <b-col cols="8">
            <b-table striped hover :items="employers" :fields="employers_fields">
              <template slot="actions" scope="employerRow">
                <b-button variant="outline-primary" v-b-modal="'modal-multi-employer-' + employerRow.item.id" @click="edit(employeeRow.item)">
                  Edit
                </b-button>
                <!-- User Edit Window -->
                <div>
                  <b-modal v-bind:id="'modal-multi-employer' + employerRow.item.id" size="lg" title="Edit Employer" ok-only no-stacking>
                    <b-container>
                      <b-row>
                        <b-col></b-col>
                        <b-col>
                          <b-form @submit.prevent="saveUser">
                            <b-form-group
                              label="email"
                              label-for="email"
                            >
                              <b-form-input type="text" v-model="employerRow.item.email" name="email" class="form-control" />
                            </b-form-group>
                            <b-form-group
                              label="Password"
                              label-for="password"
                            >
                              <b-form-input type="password" v-model="employerRow.item.password" name="password" class="form-control" />
                            </b-form-group>
                            <b-form-group
                              label="role"
                              label-for="role"
                            >
                              <b-form-select v-model="employerRow.item.role" :options="userRolesList" class="form-control">
                              </b-form-select>
                            </b-form-group>
                            <b-form-group>
                              <b-button v-b-modal="'modal-multi-employer-second-' + userRow.item.id" v-on:click="saveUser(employerRow.item)">Save</b-button>
                            </b-form-group>
                          </b-form>
                        </b-col>
                        <b-col></b-col>
                      </b-row>
                    </b-container>
                  </b-modal>

                  <b-modal v-bind:id="'modal-multi-employer-second-' + employerRow.item.id" title="Success" ok-only>
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
        'user': {
          sortable: true
        },
        'employer': {

        }
      },
      employers_fields: {
        'user': {
          sortable: true
        },
        'company_name': {

        }
      }
    }
  },

  name: 'AdminHome',

  props: {
  },

  computed: {
    ...mapState({
      users: state => state.admin.users,
      employees: state => state.admin.employees,
      employers: state => state.admin.employers
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
