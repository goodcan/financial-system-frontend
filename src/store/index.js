import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userObj: {},
    token: window.sessionStorage.getItem('token'),
    userPms: {},// 用户权限
  },
  mutations: {
    updateToken(state, token) {
      this.state.token = token;
      window.sessionStorage.setItem('token', token);
    },
    updateUserObj(state, userObj) {
      this.state.userObj = userObj;
      if (userObj) {
        this.state.userPms = userObj.permissions
      }
    },
    updateNavCollapse(state, collapse) {
      this.state.userObj.navCollapse = collapse;
    }
  },
})
