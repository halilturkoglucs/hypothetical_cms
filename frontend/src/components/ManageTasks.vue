<template>
  <div class="hello">
    <h2>
      MANAGE TASKS
    </h2>
    <div v-if="userRole == 'ADMIN' || userRole == 'EMPLOYER'">
      <h5>New Task</h5>
      <b-container>
        <b-row>
          <b-col></b-col>
          <b-col cols="8">
            <NewTaskForm />
          </b-col>
          <b-col></b-col>
        </b-row>
      </b-container>
    </div>
    <div>
      <h5>Tasks List</h5>
      <b-container>
        <b-row>
          <b-col></b-col>
          <b-col cols="8">
            <b-table striped hover :items="tasks" :fields="tasks_fields">
              <template slot="actions" scope="taskRow">
                <b-button variant="outline-primary" v-b-modal="'modal-task-' + taskRow.item.id"
                          @click="edit(taskRow.item)">
                  Edit
                </b-button>
                <!-- Employee Edit Window -->
                <div>
                  <b-modal v-bind:id="'modal-task-' + taskRow.item.id"
                           size="lg" title="Edit Task" ok-only no-stacking>
                    <b-container>
                      <b-row>
                        <b-col></b-col>
                        <b-col>
                          <b-form @submit.prevent="saveTask">
                            <b-form-group
                              label="Task Description"
                              label-for="description"
                            >
                              <b-form-input type="text" v-model="taskRow.item.description" name="description" class="form-control" />
                            </b-form-group>
                            <b-form-group
                              label="Employee"
                              label-for="employee"
                            >
                              <b-form-select v-model="taskRow.item.employee.id" :options="employees" name="employee" class="form-control">
                              </b-form-select>
                            </b-form-group>
                            <b-form-group
                              label="Status"
                              label-for="status"
                            >
                              <b-form-select v-model="taskRow.item.status" :options="statuses" name="status" class="form-control">
                              </b-form-select>
                            </b-form-group>
                            <b-form-group>
                              <b-button v-b-modal="'modal-task-second-' + taskRow.item.id"
                                        v-on:click="saveTask(taskRow.item)">Save</b-button>
                            </b-form-group>
                          </b-form>
                        </b-col>
                        <b-col></b-col>
                      </b-row>
                    </b-container>
                  </b-modal>
                  <b-modal v-bind:id="'modal-task-second-' + taskRow.item.id" title="Success" ok-only>
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
import NewTaskForm from './NewTaskForm'

export default {
  components: { NewTaskForm },
  data () {
    return {
      statuses: [
        {
          value: 'TODO',
          text: 'TODO'
        },
        {
          value: 'IN PROGRESS',
          text: 'IN PROGRESS'
        },
        {
          value: 'DONE',
          text: 'DONE'
        }
      ],
      tasks_fields: {
        'employee.user.first_name': {
          sortable: true,
          label: 'First Name'
        },
        'employee.user.last_name': {
          sortable: true,
          label: 'Last Name'
        },
        'employee.employer.company_name': {
          label: 'Company'
        },
        'description': {

        },
        'status': {

        },
        'actions': {
          label: 'Actions'
        }
      }
    }
  },

  name: 'ManageTasks',

  props: {
  },

  computed: {
    userRole: function () { return this.$store.getters['auth/userRole'] },
    ...mapState({
      tasks: state => state.task.tasks,
      employees: state => {
        let employees = state.admin.employees

        employees = employees.map((employee) => {
          return {
            value: employee,
            text: employee.user.first_name + ' ' + employee.user.last_name
          }
        })

        return employees
      }
    })
  },

  methods: {
    edit: function (user) {
      console.log(user)
    },

    saveTask: function (task) {
      const taskObservable = JSON.parse(JSON.stringify(task))
      let payload = {
        id: taskObservable.id,
        employee: taskObservable.employee.id,
        description: taskObservable.description,
        status: taskObservable.status
      }

      this.$store.dispatch('task/saveTask', payload)
        .catch(err => console.log(err))
    }
  },

  mounted () {
    this.$store.dispatch('admin/getEmployees')
    this.$store.dispatch('task/getTasks')
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
