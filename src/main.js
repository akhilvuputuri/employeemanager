import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'
import './components/firebaseInit'

Vue.config.productionTip = false

// to ensure that when reload, will check for user role
// ** NEED TO EXPLORE MORE
let app
firebase.auth().onAuthStateChanged(user => {
  if(!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')    
  }
})