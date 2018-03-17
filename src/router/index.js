import Vue from 'vue'
import Router from 'vue-router'
import Main from '../views/Main'
import CreateOrder from '../components/order/CreateOrder'
import OrderList from '../components/order/OrderList'
import Register from '../components/user/Register'
import Login from '../components/user/Login'
import CreateClass from '../components/order/CreateClass'
import CreateCustomer from '../components/order/CreateCustomer'
import CreateDpt from '../components/order/CreateDpt'
import CreateContact from '../components/order/CreateContact'

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
          path: '/orderList',
          name: 'OrderList',
          component: OrderList
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
        },
        {
          path: '/createDpt',
          name: 'CreateDpt',
          component: CreateDpt
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
