import Vue from 'vue'
import Router from 'vue-router'
import Main from '../views/Main'
import CreateOrder from '../components/order/CreateOrder'
import SelfOrderList from '../components/order/SelfOrderList'
import CompanyOrderList from '../components/order/CompanyOrderList'
import Register from '../components/user/Register'
import Login from '../components/user/Login'
import CreateClass from '../components/option/CreateClass'
import CreateCustomer from '../components/option/CreateCustomer'
import CreateCompany from '../components/option/CreateCompany'
import CreateContact from '../components/option/CreateContact'
import UserList from '../components/user/UserList'
import EditUser from '../components/user/EditUser'
import SummaryAllOrder from '../components/summaryOrder/SummaryAllorder'
import CreateHelp from '../components/option/CreateHelp'
import CreateWorkClass from '../components/option/CreateWorkClass'
import StatisticContacts from '../components/statistics/StatisticContacts'
import LogList from '../components/log/LogList'

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
          path: '/logList/:logType',
          name: 'LogList',
          component: LogList
        },
        {
          path: '/statisticContacts/:userType',
          name: 'StatisticContacts',
          component: StatisticContacts
        },
        {
          path: '/createWorkClass',
          name: 'CreateWorkClass',
          component: CreateWorkClass
        },
        {
          path: '/createHelp',
          name: 'CreateHelp',
          component: CreateHelp
        },
        {
          path: '/summaryAllOrder',
          name: 'SummaryAllOrder',
          component: SummaryAllOrder
        },
        {
          path: '/editUser/:opsType/:userId/',
          name: 'EditUser',
          component: EditUser
        },
        {
          path: '/createOrder',
          name: 'CreateOrder',
          component: CreateOrder
        },
        {
          path: '/selfOrderList',
          name: 'SelfOrderList',
          component: SelfOrderList
        },
        {
          path: '/companyOrderList',
          name: 'CompanyOrderList',
          component: CompanyOrderList
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
          path: '/createCompany',
          name: 'CreateCompany',
          component: CreateCompany
        },
        {
          path: '/userList',
          name: 'UserList',
          component: UserList
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
