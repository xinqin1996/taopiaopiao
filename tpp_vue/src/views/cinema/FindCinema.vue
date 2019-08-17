<template>
  <div>
        <van-dropdown-menu>
           <van-dropdown-item v-model="value" :options="option" />         
          <van-dropdown-item v-model="value" :options="option" />
          <van-dropdown-item title="筛选" ref="item">
            <van-switch-cell v-model="switch1" title="包邮" />
            <van-switch-cell v-model="switch2" title="团购" />
            <van-button block type="info" @click="onConfirm">确认</van-button>
          </van-dropdown-item>
        </van-dropdown-menu>
    <my-city></my-city>
      <find-cinema-item v-for="(cinema,i) of list.cinema" :key="i" :cinema="cinema" :time="list.movie[i]"></find-cinema-item>  
      <div :class="{'d-none':isNone}">该城市没有影院在播放该电影，请重新选择城市</div>
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
            // 
            value: 0,
          switch1: false,
          switch2: false,
          option: [
            { text: '全部商品', value: 0 },
            { text: '新款商品', value: 1 },
            { text: '活动商品', value: 2 }
          ]
            // 
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
    //
        onConfirm() {
      this.$refs.item.toggle();
    },
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