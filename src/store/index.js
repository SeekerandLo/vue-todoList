import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    todos:JSON.parse(window.localStorage.todos),
    // currentodos:[],
    offset:''
  },
  mutations:{
    
  }
})

export default store