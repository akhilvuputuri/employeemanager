<template>
  <div id="dashboard">
    <ul class="collection with-header">
      <li class="collection-header"><h4>Employees</h4></li>
      <!-- need to bind a unique id to each item in the for loop; in this case it is the doc id-->
      <li v-for="employee in employees" v-bind:key="employee.id" class="collection-item">
        <div class="chip">{{employee.dept}}</div>
        {{employee.employee_id}} : {{employee.name}}

        <!-- Here not just going to a static router link but to the specific employee id's hence need to use v-bind; need pass in params as the router.js needs the params -->
        <router-link class="secondary-content" v-bind:to="{name: 'view-employee', params: {employee_id: employee.employee_id}}">
          <i class="fa fa-eye"></i>
        </router-link>
      </li>
    </ul>

    <div class="fixed-action-btn">
      <router-link to="/new" class="btn-floating btn-large red">
        <i class="fa fa-plus"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from './firebaseInit'
export default {
  name: 'dashboard',
  data () {
    return {
      // this is the property that we want to fill;
      employees: []
    }
  },
  // runs when the component is created
  // doc will just give a querySnapshot, need to run .data function to obtain the actual data
  // here need to set the data objects as there are several of each variable
  created () {
    console.log('Database' + firebase.auth().currentUser.email)
    db.collection('users').doc(firebase.auth().currentUser.email).collection('employees').orderBy('dept').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        console.log(doc.data())
        const data = {
          'id': doc.id,
          'employee_id': doc.data().employee_id,
          'name':doc.data().name,
          'dept':doc.data().dept,
          'position':doc.data().position
        }
        this.employees.push(data)
      })
    })
  }
}
</script>
