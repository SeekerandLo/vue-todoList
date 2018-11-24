import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const STORAGE_KEY = "todos"
var todos = []
// 我想从localStorge中取数据，如果没有就创建
if(window.localStorage.todos == undefined){
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}else{
  todos = JSON.parse(localStorage.getItem(STORAGE_KEY))
}
// console.log(1)
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