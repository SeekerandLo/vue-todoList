<template>
  <div class="item-tabs">
    <!-- 待完成数 -->
    <div class="tabs-num">{{unCompletedNum}} items</div>
  
    <!-- 按钮组 -->
    <!-- 接收一个filter 初始为all -->
    <span>
      <button v-for="(status,index) in statuses" 
      :key="index" 
      :class="['tabs-button',filter === status ? 'status-actived':'']"
      @click="toggleStatus(status)"
      >{{status}}</button>
    </span>
  
    <!-- 删除按钮 -->
    <el-button type="danger" class="tabs-clear" @click="deleteItem">clear</el-button>
  </div>
</template>

<script>
export default {
  data(){
    return{
      // item 有三种状态
      statuses:['all','actived','completed']
    }
  },
  computed:{
    unCompletedNum(){
      // 过滤器的使用
      // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素
      return this.todos.filter(todo => !todo.completed).length
    }
  },
  // 注意传参就要绑定
  props:{
    todos:{
      type:Array,
      required:true
    },
    filter:{
      type:String,
      required:true
    }
  },
  methods:{
    toggleStatus(status){
      this.$emit('toggle',status)
    },
    deleteItem(){
      this.$emit('clear')
    }
  }
}
</script>

<style>
.tabs-num{
  float: left;
  font-size: 13px;
  color: white;
  background-color: #7fa6f5;
  border-radius: 4px;
  padding: 12px 20px
}
.tabs-clear{
  float: right;
}
.tabs-button{
  margin:0 10px;
  line-height: 1;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  text-align: center;
  /* 设置outline为0 */
  outline: 0;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}
.tabs-button:hover{
  background: rgba(156, 207, 255, 0.301);
  color: #6ab7ff;
  border: 1px solid #94b2f7;
  border-radius: 4px;
}
.status-actived{
  background: rgba(156, 207, 255, 0.301);
  color: #6ab7ff;
  border: 1px solid #94b2f7;
  border-radius: 4px;
}
</style>
