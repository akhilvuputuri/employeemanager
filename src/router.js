import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewEmployee from '@/components/NewEmployee'
import ViewEmployee from '@/components/ViewEmployee'
import EditEmployee from '@/components/EditEmployee'
import Login from '@/components/Login'
import Register from '@/components/Register'
import firebase from 'firebase'

Vue.use(Router)

// Any routes that we want to protect/restrict, we must add a meta object to it and set requiresAuth to true

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        // only can proceed if not logged in
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/new',
      name: 'new-employee',
      component: NewEmployee,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit/:employee_id',
      name: 'edit-employee',
      component: EditEmployee,
      meta: {
        requiresAuth: true
      }
    },
    {
      // need to pass in employee_id as params
      path: '/:employee_id',
      name: 'view-employee',
      component: ViewEmployee,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // Check for requiredAuth guard
  if(to.matched.some(record => record.meta.requiresAuth)) {
    console.log('In the requiresAuth if statement now')
    // check if NOT logged in
    if(!firebase.auth().currentUser){
      // Go to login
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      //Proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    console.log('In the requiresGuest if statement now')
    // check if logged in
    if(firebase.auth().currentUser){
      // Go to login
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      //Proceed to route
      next();
    }
  } else {
    //Proceed to route
    console.log('In the else statement now')
    next()
  }
})


export default router;