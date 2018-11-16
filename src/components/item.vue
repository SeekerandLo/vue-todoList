<template>
  <!-- 
    接收传过来的todo实体，用绑定class的方式，首先这个div有item的样式，
  然后判断todo.completed 如果是true 是显示completed样式，如果不是 不显示其他样式 
    -> 如果是完成状态 就把里面的文字变灰白 然后加一条 删除线
  -->
  <div :class="['item',todo.completed ? 'completed':'']">
    <el-checkbox label="完成" border class="item-checkbox" v-model="todo.completed"></el-checkbox>
    <span class="item-text">{{todo.text}}</span>
    <el-button type="danger" class="item-delete" @click="deleteItem">删除</el-button>
  </div>
</template>

<script>
export default {
  props:{
    // 用 v-bind 传进来的 todo 是一个对象， required 要求 必须传
    todo:{
      type:Object,
      required:true
    }
  },
  methods:{
    deleteItem(){
      // this.$emit 事件 绑定到上一层 把具体的逻辑放在todo.vue上 
      // 
      // console.log(this)
      this.$emit("del",this.todo.id)
    }
  }
}
</script>

<style>
 /* 1.确定整个item的形状 加上阴影 边框 圆角 */
.item{
  margin: 30px auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.027);
  padding: 10px;
  border: 1px solid #ebeef5;
  background-color: white;
  border-radius: 4px;

}
 /* 2.完成按钮 左浮动 */
.item-checkbox{
  float: left;
}
 /* 3.文本左浮动加间距 */
.item-text{
  float: left;
  margin:5.5px 20px;

}
 /* 4.删除按钮 右浮动 为了美观 我们想让他平时不显，当鼠标划过去的时候才显示。 删除按钮 平时 display:none 添加伪类选择器 */
.item-delete{
  float: right;
  display: none;
  background-color: rgb(255, 180, 180);
  color:rgb(255, 73, 73)
}
 /* 5.删除按钮 当鼠标移动到 item 上时显示 */
.item:hover .item-delete{
  display: block
}
 /* 6.添加完成状态的样式 */
.completed .item-text{
  text-decoration: line-through;
  color:rgb(145, 145, 145)
}
</style>
