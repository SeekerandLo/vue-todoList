<template>
  <!-- 
    接收传过来的todo实体，用绑定class的方式，首先这个div有item的样式，
  然后判断todo.completed 如果是true 是显示completed样式，如果不是 不显示其他样式 
    -> 如果是完成状态 就把里面的文字变灰白 然后加一条 删除线
  -->
  <div class="item-main">
    <div :class="['item-card',todo.level === '1' ? 'item-card-level1':'',
                              todo.level === '3' ? 'item-card-level3':'',
                              todo.level === '2' ? 'item-card-level2':'']" >
      <el-scrollbar style="height:100%">
        <div class="item-card-div">
          <div class="item-card-txt">详细说明:</div>
          <input v-model="todo.des" class="item-card-input" @keyup.enter="detailed(todo)">
        </div>  
        <div class="item-card-div"> 
          <div class="item-card-txt">紧急状态:</div>
             <el-radio-group v-model="todo.level" 
                size="medium" class="item-card-radio" 
                @change="detailed(todo)"
                text-color="white"
                fill="#a8c5ff">
              <el-radio-button label="3" />
              <el-radio-button label="2"/>
              <el-radio-button label="1"/>
            </el-radio-group>
        </div>
        <div class="item-card-div">
          <div class="item-card-txt">完成时间:</div>
          <el-time-select v-model="todo.endTime" class="item-card-time" @blur="detailed(todo)"></el-time-select>
        </div>
      </el-scrollbar>
    </div>

    <div :class="['item',todo.completed ? 'completed':'','item-editing']"  >
      <el-checkbox label="ok" border class="item-checkbox" v-model="todo.completed" @change="toggleItem(todo)"/>
      <span class="item-text" @dblclick="editing = true">{{todo.text}}</span>     
      <el-button type="danger" class="item-delete" @click="deleteItem">del</el-button>
      <el-input v-model="todo.text" v-show="editing" 
                class="item-editing" 
                @keyup.enter.native="doneEdit"/>  
    </div>

  </div>
</template>

<script>
// console.log(this)
// console.log(this)
export default {
  name:'item',
  data(){
    return{
      editing:false,
      // detailed:true
      des:''
    }
  },
  // directives: {
  //   focus(el, { value }, { context }) {
  //     if (value) {
  //       context.$nextTick(() => {
  //         el.focus()
  //       })
  //     }
  //   }
  // },
  // created(){
  //     const {todo} = this
  //     console.log(todo) 
  // },
  props:{
    // 用 v-bind 传进来的 todo 是一个对象， required 要求 必须传
    todo:{
      type:Object,
      required:true
    }
  },
  methods:{
    toggleItem(todo){
      // console.log(todo)
      this.$emit('toggle',todo)
    },  
    deleteItem(){
      // this.$emit 事件 绑定到上一层 把具体的逻辑放在todo.vue上 
      // 
      // console.log(this)
      this.$emit("del",this.todo.id)
    },
    editItem(todo){
      this.$emit("edit",todo)
    },
    doneEdit(){
      // todo 是这个item
      const  todo  = this.todo
      // console.log(this)
      // console.log(todo)
      // const value = todo.text
      this.editItem(todo)
      this.editing = false  
    },
    detailed(todo){
      this.$emit("detailed",todo)
    }
  }
}
</script>

<style scoped>



@import "../assets/css/item.css";
.item-main >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
