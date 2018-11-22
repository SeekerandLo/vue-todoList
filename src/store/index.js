import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const STORAGE_KEY = "todos"
const todos = []
// 我想从localStorge中取数据，如果没有就创建
if(window.localStorage.todos == undefined){
  console.log(1)
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}
// completed:false
// des:""
// endTime:""
// id:0
// level:0
// starTime:"2018-11-22T04:04:21.729Z"
// text:"是"

// const todos = JSON.parse(window.localStorage.todos)


const store = new Vuex.Store({
  state:{
    todos:todos,
    // currentodos:[],
    offset:''
  },
  mutations:{
    
  }
})

export default store