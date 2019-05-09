<template>
  <div>
    <b-container>
      <b-row>
        <b-col></b-col>
        <b-col>
          <b-form @submit.prevent="save">
            <b-form-group
              label="Select Employee"
              label-for="employee"
            >
              <b-form-select v-model="employee" :options="employees" class="form-control">
              </b-form-select>
            </b-form-group>
            <b-form-group
              label="Task Description"
              label-for="description"
            >
              <b-form-input type="text" v-model="description" name="description" class="form-control" />
            </b-form-group>
            <b-form-group>
              <b-button class="btn btn-primary" v-on:click="save()">Submit</b-button>
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
  name: 'NewTaskForm',

  data () {
    return {
      description: '',
      employee: null
    }
  },

  computed: {
    ...mapState({
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
    save: function () {
      const { employee, description } = this
      let data = {
        employee: employee,
        description: description
      }
      this.$store.dispatch('task/save', data)
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
