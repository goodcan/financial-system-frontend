import Vue from 'vue'
import Router from 'vue-router'
import Main from '../views/Main'
import CreateOrder from '../components/orders/CreateOrder'
import Register from '../components/user/Register'
import Login from '../components/user/Login'
import CreateClass from '../components/orders/CreateClass'
import CreateCustomer from '../components/orders/CreateCustomer'
import CreateContact from '../components/orders/CreateContact'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/createOrder',
          name: 'CreateOrder',
          component: CreateOrder
        },
        {
          path: '/createClass',
          name: 'CreateClass',
          component: CreateClass
        },
        {
          path: '/createCustomer',
          name: 'CreateCustomer',
          component: CreateCustomer
        },
        {
          path: '/createContact',
          name: 'CreateContact',
          component: CreateContact
        }
      ]
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
