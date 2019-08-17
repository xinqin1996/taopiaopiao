<template>
  <div>
    <my-city></my-city>
      <find-cinema-item v-for="(cinema,i) of list.cinema" :key="i" :cinema="cinema" :time="list.movie[i]"></find-cinema-item>  
      <div :class="{'d-none':isNone}">该城市不存在该电影，请重新选择城市</div>
  </div>
</template>
<script>
import findCinemaItem from "./FindCinemaItem";
//从movieLi 跳转过来时，要把 city_id (vuex获取),mid(movieLi)获取过来
export default {
  data(){
    return{
        mid:"",
        list:[],
        isNone:true,
    }
  },
  props:{

  },
  computed:{
    city_id(){
      //获取vuex保存的city_id
      return this.$store.state.city_id
    }
  },
  methods:{
    // 获取mid的函数
    routeMid(){
      this.mid = this.$route.query.mid
    },
    //ajax请求
    load(){
      var url="cinema/v1/find_cinema";
      var obj={city_id:this.city_id,mid:this.mid};
      console.log(obj)
      this.axios.get(url,{params:obj}).then(res=>{
        if(res.data.code==0){
          console.log(res.data.msg);
          this.isNone=false;
        }else{
          this.list=res.data.data;
          console.log(this.list)
        }
      })
    }
  },
  created(){
    // 在组件创建成功时，获取mid
    // console.log(this.$route.query);
    this.routeMid();
    this.load();
  },
  components:{
    findCinemaItem,
  }
}
</script>
<style>
  .d-none{
    display: none;
  }
</style>