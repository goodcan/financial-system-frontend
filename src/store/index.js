import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userObj: null,
    token: window.sessionStorage.getItem('token')
  },
  mutations: {
    updateToken(state, token) {
      this.state.token = token;
      window.sessionStorage.setItem('token', token);
    },
    updateUserObj(state, userObj) {
      console.log(userObj);
      this.state.userObj = userObj;
    }
  }
})
