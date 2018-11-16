<template>
  <div class="todo-main">
      <!-- 介绍 v-model 属性 -->
      <el-input v-model="msg" placeholder="接下来做什么呢" @keyup.enter.native="addItem"/>

      <!-- <item :todo="todo" class="todo-item"/> -->
      <item v-for="(todo,index) in filterTodos" :key="index"  :todo="todo" class="todo-item" @del="deleteItem"/>
      
      <!-- 需要传什么： 需要一个未完成item的数量，传进一个数组在里面判断他的completed与否，显示出来
            绑定的事件 切换状态 清楚已经完成
       -->
      <tabs :todos="todos" :filter="filter" class="todo-tabs"
        @toggle="toggleStatus"
        @clear="clearCompleted"
      />
  </div>
</template>

<script>
let id = 0
import Item from './item'
import Tabs from './tabs'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '',
      todos:[],
      filter:'all'
    }
  },
  components:{
    Item,Tabs
  },
  computed:{
    filterTodos(){
      // console.log(this.filter)
      if(this.filter === 'all'){
        return this.todos
      }
      const completed = this.filter === 'completed'
      return this.todos.filter(todo => completed === todo.completed)
    }
  },
  methods:{
    addItem(){
      this.todos.unshift({
        id: id++,
        text: this.msg.trim(),
        completed:false
      })
      this.msg = ''
    },
    deleteItem(id){
      //  splice 参数 index位置，数量
      //  console.log(id) 
      //  id是传回来的 todo 的id的值，我们要根据id找到todo对象，然后删除它
      //  findIndex 方法 通过判断条件是返回一个符合条件的位置 
      //      里面的参数是一个判断条件 todo => todo.id === id
      //        箭头函数
      //        findIndex 接收一个函数 传入
      //      ===：用来检测两个操作数是否严格相等，包括类型; ==：会转化成一个相同类型后去判断value是否相等
      //        这里我们用哪个都行
      //      
      this.todos.splice(this.todos.findIndex(function(todo){
        // console.log(todo.id == id)
        // 如果 返回的结果是 true 那么findIndex方法会将这个item对应的id返回到外面接受
        return todo.id == id
      }),1)
      // this.todos.splice(this.todos.findIndex(todo => (todo.id === id)),1)
    },
    toggleStatus(status){
      this.filter = status
    },
    clearCompleted(){
      // 清除已经完成的
      this.todos = this.todos.filter(todo => !todo.completed)
    } 
  }
}
</script>

<style >
.todo-main{
  width: 35%;
  margin:50px auto;
}
.todo-item{
  
  height: 40px;
}
.todo-tabs{
  margin:50px auto;
}
</style>
