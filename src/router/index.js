import Vue from 'vue'
import Router from 'vue-router'
import Main from '../views/Main'
import CreateOrder from '../components/orders/CreateOrder'
import Register from '../components/user/Register'
import Login from '../components/user/Login'

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
