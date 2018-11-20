<template>
  <div :class="['page-font','todo-pages']">
    <button type="button" class="page-button"><i class="el-icon el-icon-arrow-left" @click="toPrevPage(currentPage)"></i></button>
    <button v-for="(pageNum,index) in getPages" :key="index" :class="['page-button',currentPage === index+1 ? 'actived' : '']" 
      @click="gotoPage(pageNum)"
      >{{pageNum}}</button>
    <button type="button" class="page-button" disabled="disabled"><i class="el-icon el-icon-arrow-right" @click="toLastPage(currentPage)"></i></button>
  </div>
</template>

<script>
export default {
  data(){
    return{
      pageNums:[],
      todoStore:[],
      maxSize:5,
      maxPage:''
      // 穿过来的属性在props中注册上就可以直接用了
      // currentPage:this.currentPage
    }
  },
  computed:{
    // 得到分多少页
    getPages(){
      this.pageNums = []
      let pageMax = Math.ceil(this.todos.length/this.maxSize)
      this.maxPage = pageMax
      for (let i = 1;i<=pageMax;i++){
        this.pageNums.push(i)       
      }
      return this.pageNums
    }
  },
  props:{
    todos:{
      type:Array,
      required:true
    },
    currentPage:{
      type:Number,
      required:true
    }
  },
  methods:{
    // 去前一页
    // 应该做详细的判断 如果当前页是第一页 
    // 就不能向前 是最后一页时判断不能再向后
    toPrevPage(pageNum){
      // console.log(pageNum)
      if(pageNum === 1){
        this.$notify({
          title: '已经是第一页了'
        })
        return 0
      }
      this.$emit('gotoPage',(pageNum-1))
    },
    // 去后一页
    toLastPage(pageNum){
      if(pageNum === this.maxPage){
        this.$notify({
          title: '已经是最后一页了'
        })
        return 0
      }
      this.$emit('gotoPage',(pageNum+1))
    },
    gotoPage(pageNum){
      this.$emit('gotoPage',pageNum)
    }
  }
}
</script>

<style>
.page-font{
  font-size: 15px;
}
.todo-pages{
  display: block;
}
.page-button{
  background: center center no-repeat #fff;
  outline: 0;
  background-size: 16px;
  cursor: pointer;
  margin: 0;
  color: #303133;
  border: none;
  padding: 0 6px;
  display: inline-block;
  font-size: 13px;
  min-width: 35.5px;
  height: 28px;
  line-height: 28px;
  vertical-align: top;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-weight: 700
}
.page-button:hover{
  color: rgb(0, 132, 255);
}
.actived{
  color: rgb(0, 132, 255);
}
</style>
