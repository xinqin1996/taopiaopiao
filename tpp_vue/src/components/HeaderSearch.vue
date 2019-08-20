<template>
    <div id="header_search">
      <!-- 放大镜 -->
      <div class="magnifier" @click="changeActive">
        <img src="../../public/img/header_search.svg" alt="">
      </div>
      <!-- 弹出的搜索页面 -->
      <div class="search_input" :class="{'d-none':isActive}">
        <!-- 搜索头部 -->
        <div class="input_top">
          <form action="/">
            <van-search
              v-model="inputValue"
              placeholder="影院名称或地址"
              show-action
              @search="onSearch"
              @cancel="changeActive"
            />
          </form>
        </div>
      </div>

    </div>
</template>
<script>
export default {
  data(){
    return {  
      isActive:true,
      inputValue:'',
    }
  },
  methods:{
    // 用户点击时触发
    onSearch(){

    },
    //切换input页面的显示隐藏
    changeActive(){
      this.isActive=!this.isActive;
    },
  }
}
</script>
<style>
  @import url('../assets/css/headerSearch.css');
</style>