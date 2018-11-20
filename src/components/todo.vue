<template>
  <div class="todo-main">
      <!-- 介绍 v-model 属性 -->
      <div>
        <el-input v-model="msg" placeholder="To do " @keyup.enter.native="addItem" class="todo-input"/>
        <!-- <img src="@/assets/select.png" class="todo-img"/> -->
        <!-- <item :todo="todo" class="todo-item"/> -->
      </div>
      <item v-for="(todo,index) in getCurrentData" :key="index"  :todo="todo" class="todo-item" 
        @del="deleteItem" 
        @edit="editItem"
        @toggle="toggleItem"
        @detailed="detailedItem"
        />     
      
      <!-- 需要传什么： 需要一个未完成item的数量，传进一个数组在里面判断他的completed与否，显示出来
            绑定的事件 切换状态 清楚已经完成
       -->
      <tabs :todos="todos" :filter="filter" class="todo-tabs"
        @toggleStatus="toggleStatus"
        @clear="clearCompleted"
      />
      <pages :todos="todos" :currentPage="curPage" @gotoPage="gotoPage"/>
     
  </div>
</template>

<script>
let id = 0;
const STORAGE_KEY = "todos"
import Item from "./item";
import Tabs from "./tabs";
import Pages from "./pages";

export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "",
      todos: this.$store.state.todos,
      filter: "all",
      pageIndex:1,
      curTodos:[],
      curPage:1,
      maxSize:5
    };
  },
  components: {
    Item,
    Tabs,
    Pages
  },
  computed: {
    getCurrentData(){
      // 获取当前页应该的数据 为了防止重复的添加 每次 都把它置空
      this.curTodos = []
      for(let i= this.curPage*this.maxSize-this.maxSize;i<this.curPage*this.maxSize;i++){
        if(this.todos[i]!=null && this.todos[i]!=undefined)
        this.curTodos.push(this.todos[i])
      }
      // 同时判断是否完成 这里 设计的不太好
      if (this.filter === "all") {
        return this.curTodos;
      }
      const completed = this.filter === "completed";
      return this.curTodos.filter(todo => completed === todo.completed);
    }
  },
  methods: {
    // filterTodos() { 
    //   if (this.filter === "all") {
    //     return this.curTodos;
    //   }
    //   const completed = this.filter === "completed";
    //   return this.curTodos.filter(todo => completed === todo.completed);
    // },
    setLocalStorage() {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos));
    },
    addItem() {
      const todo = {
        id: id++,
        text: this.msg.trim(),
        completed: false,
        time:new Date()
      }
      this.todos.unshift(todo);
      this.setLocalStorage();
      this.msg = "";
    },
    deleteItem(id) {
      this.todos.splice(
        this.todos.findIndex(function(todo) {
          return todo.id == id;
        }),
        1
      );
      this.setLocalStorage();
      // this.todos.splice(this.todos.findIndex(todo => (todo.id === id)),1)
    },
    toggleStatus(status) {
      this.filter = status;
    },
    toggleItem(val) {
      val.done = !val.done;
      this.setLocalStorage();
    },
    clearCompleted() {
      // 清除已经完成的
      this.todos = this.todos.filter(todo => !todo.completed);
      this.setLocalStorage();
    },
    editItem({ todo, value }) {
      todo.text = value;
      this.setLocalStorage();
    },
    gotoPage(pageNum){
      this.curPage = pageNum
    },
    detailedItem(todo){
      
      // console.log(todo)
    }
  }
};
</script>

<style >
.todo-main {
  width: 35%;
  margin: 30px auto;
}
.todo-item {
  height: 40px;
}
.todo-tabs {
  /* margin:50px auto; */
  margin-top: 50px;
  margin-bottom: 35px;
}
.todo-img{
  margin-left: 500px;
  margin-bottom: 0;
  max-width: 40px;
  max-height: 40px;
  /* display: inline */
}
.todo-input{
  display: inline;
}
</style>
