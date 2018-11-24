<template>
  <div class="todo-main">
      <!-- 介绍 v-model 属性 -->
      <div>
        <el-input v-model="msg" placeholder="To do " @keyup.enter.native="addItem" class="todo-input"/>
        <!-- <img src="@/assets/select.png" class="todo-img"/> -->
        <!-- <item :todo="todo" class="todo-item"/> -->
      </div>
      <div class="todo-fun">
        <div class="todo-search">搜索:
          <input class="input" v-model="search" @keyup.enter="searchItem">
        </div>
        <div class="todo-sort">排序:
          <el-checkbox label="▼" v-model="isSortBig"></el-checkbox>
          <el-checkbox label="▲" v-model="isSortSmall"></el-checkbox>
        </div>
      </div>
      <div class="todo-items">
      <item v-for="(todo,index) in getCurrentData" :key="index"  :todo="todo" class="todo-item" 
        @del="deleteItem" 
        @edit="editItem"
        @toggle="toggleItem"
        @detailed="detailedItem"
        />     
      </div>
      <!-- 需要传什么： 需要一个未完成item的数量，传进一个数组在里面判断他的completed与否，显示出来
            绑定的事件 切换状态 清楚已经完成
       -->
       <div class="todo-footer">
        <tabs :todos="todos" :filter="filter" class="todo-tabs"
          @toggleStatus="toggleStatus"
          @clear="clearCompleted"
        />
        <pages :todos="todos" :currentPage="curPage" @gotoPage="gotoPage" class="todo-page"/>
       </div>
  </div>
</template>

<script>
// console.log(this)

let id = 0;
const STORAGE_KEY = "todos"
import Item from "./item";
import Tabs from "./tabs";
import Pages from "./pages";
import {pagging} from './page.js';
export default {
  name: "todo",
  data() {
    return {
      msg: "",
      todos: this.$store.state.todos,
      filter: "all",
      pageIndex:1,
      curTodos:[],
      curPage:1,
      maxSize:5,
      search:'',
      searchArray:[],
      sortArray:[],
      isSortBig:false,
      isSortSmall:false
    };
  },
  components: {
    Item,
    Tabs,
    Pages
  },
  created(){
    // console.log(this)
    // console.log(this.$data)
    // console.log(this.$data.filter)
    // console.log(this.filter)
    // this.setLocalStorage()
  },
  computed: {
    getCurrentData(){
      // 获取当前页应该的数据 为了防止重复的添加 每次 都把它置空
      // this.curTodos = []
      let curTodos = []
      let isSortBig = this.isSortBig
      let isSortSmall = this.isSortSmall
      if(isSortBig || isSortSmall){
        if(isSortBig){
          curTodos = this.sortItemBig()           
        }
        if(isSortSmall){
          curTodos = this.sortItemSmall()
        }
      }else{
        curTodos = this.searchItem()
      }

      // for(let i= this.curPage*this.maxSize-this.maxSize;i<this.curPage*this.maxSize;i++){
      //   if(curTodos[i]!=null && curTodos[i]!=undefined)
      //   this.curTodos.push(curTodos[i])
      // }
      // 同时判断是否完成 这里 设计的不太好
      if (this.filter === "all") {
        return curTodos;
      }
      const completed = this.filter === "completed";
      return curTodos.filter(todo => completed === todo.completed);
    },
    
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
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
    },
    addItem() {
      const todo = {
        id: id++,
        text: this.msg.trim(),
        completed: false,
        starTime:new Date(),
        des:'',
        endTime:'',
        level:0
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
    editItem(todo) {
      // todo.text = value;
      todo = todo
      this.setLocalStorage();
    },
    gotoPage(pageNum){
      this.curPage = pageNum
    },
    detailedItem(todo){
      this.setLocalStorage();
      // console.log(todo)
    },
    searchItem(){
      this.curTodos = []
      this.searchArray = []
      if(this.search!=''){
        for(let i=0;i<this.todos.length;i++){
          if(this.todos[i].text.indexOf(this.search)!=-1){
            this.curTodos.push(this.todos[i])
          }
        }
        return pagging(this.curTodos,this.searchArray,this.curPage,this.maxSize)
      }else{
        for(let i= this.curPage*this.maxSize-this.maxSize; i<this.curPage*this.maxSize; i++){
          if(this.todos[i]!=null && this.todos[i]!=undefined)
          this.curTodos.push(this.todos[i])
        }
        return this.curTodos
      }
      this.search = ''
    },
    sortItemBig(){ 
      let tempArray = []
      if(this.isSortBig){
        this.sortArray = this.todos
        for(let j=0;j<this.sortArray.length-1;j++){
          for(let i=0;i<this.sortArray.length-j-1;i++){
            if(this.sortArray[i].level<this.sortArray[i+1].level){
              let temp = this.sortArray[i]
              this.sortArray[i] = this.sortArray[i+1]
              this.sortArray[i+1] = temp
            }
          }
        }
        for(let j= this.curPage*this.maxSize-this.maxSize;j<this.curPage*this.maxSize; j++){
            if(this.sortArray[j]!=null && this.sortArray[j]!=undefined){
             tempArray.push(this.sortArray[j])
            }
        }  
        return tempArray      
      }else{
        this.sortArray = this.searchItem()
        return this.sortArray
      }
    },
    sortItemSmall(){
      let tempArray = []
      if(this.isSortSmall){
        this.sortArray = this.todos
        for(let j=0;j<this.sortArray.length-1;j++){
          for(let i=0;i<this.sortArray.length-j-1;i++){
            if(this.sortArray[i].level>this.sortArray[i+1].level){
              let temp = this.sortArray[i]
              this.sortArray[i] = this.sortArray[i+1]
              this.sortArray[i+1] = temp
            }
          }
        }
        for(let j= this.curPage*this.maxSize-this.maxSize;j<this.curPage*this.maxSize; j++){
            if(this.sortArray[j]!=null && this.sortArray[j]!=undefined){
             tempArray.push(this.sortArray[j])
            }
        }  
        return tempArray      
      }else{
        this.sortArray = this.searchItem()
        return this.sortArray
      }
    }
  }
}
</script>

<style >
.todo-main {
  width: 35%;
  margin: 30px auto 20px  auto;
}
.todo-fun{
  padding-top:10px;
  padding-bottom: 43px;
  font-size: 15px;
  color:rgb(196, 196, 196)
}
.todo-item {
  height: 40px;
}
.todo-items{
  height: 430px;
  width: 100%;
  /* margin-top:50px; */
  /* text-align: center */
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
.todo-footer{
  margin-top: 80px;
  /* margin-bottom: 20px; */
}
.todo-page{
  margin-top:5px;
}
.todo-sort{
  float: left;
}
.todo-sort .el-checkbox__label{
  color:#b9b9b9
}

.todo-search{
  float: left;
  
}
.todo-search input{
  width: 200px;
  border: 0;
  border-bottom: 1px solid #ddd;
  border-radius: 0;
  margin-right: 20px;
}
.todo-search input:focus{
  outline: 0;
  border-bottom: 1px solid #7fa6f5;
}
.sort-button{
  cursor: pointer;
}
</style>
