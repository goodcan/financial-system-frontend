import Vue from 'vue'
import Router from 'vue-router'
import Main from '../views/Main'
import CreateOrder from '../orders/CreateOrder'

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
    }
  ]
})
