<template>
  <div id="view-employee">
    <ul class="collection with-header">
      <li class="collection-header"><h4>{{name}}</h4></li>
      <li class="collection-item">Employee ID#: {{employee_id}}</li>
      <li class="collection-item">Department: {{dept}}</li>
      <li class="collection-item">Position: {{position}}</li>
    </ul>
    <router-link to="/" class="btn grey">Back</router-link>
    <button @click="deleteEmployee" class="btn red">Delete</button>
    
    <div class="fixed-action-btn">
      <!-- Here need to use v-bind as we are using a parameter-->
      <router-link v-bind:to="{name: 'edit-employee', params: {employee_id: employee_id}}" class="btn-floating btn-large red">
        <i class="fa fa-pencil"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from './firebaseInit'
import firebase from 'firebase'

export default {
  name: 'view-employee',
  data() {
    return {
      employee_id: null,
      name: null,
      dept: null,
      position: null
    }
  },
  // runs before entering the route; import all the details of the particular employee; reason we have the param employee_id is because in the router, we have the param employee_id; use next to access the instance as the component has not been created when the method is run
  beforeRouteEnter(to, from, next) {
    console.log('This is beforeRouteEnter')
     db.collection('users').doc(firebase.auth().currentUser.email).collection('employees').where('employee_id', "==", to.params.employee_id).get()
     .then(querySnapshot => {
       querySnapshot.forEach(doc => {
         next(vm => {
           vm.employee_id = doc.data().employee_id
           vm.name = doc.data().name
           vm.dept = doc.data().dept
           vm.position = doc.data().position
         }) 
       })
     })
  },
  watch: {
    // access route using '$route'
    '$route': 'fetchData'
  },
  // access params by using the route params.get()
  methods: {
    fetchData() {
      console.log("This is fetchData")
      db.collection('users').doc(firebase.auth().currentUser.email).collection('employees').where('employee_id', "==", this.$route.params.employee_id).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.employee_id = doc.data().employee_id
            this.name = doc.data().name
            this.dept = doc.data().dept
            this.position = doc.data().position
          })
        })
    },
    deleteEmployee() {
      if(confirm('Are you sure?')){
        db.collection('users').doc(firebase.auth().currentUser.email).collection('employees').where('employee_id', "==", this.$route.params.employee_id).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete() // deletes the employee
            this.$router.push('/') // redirects the user back to main page; to do a redirect use router instead of route
          })
        })
      }
    }
  }
}
</script>
