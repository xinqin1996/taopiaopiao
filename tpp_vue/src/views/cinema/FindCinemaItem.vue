<template>
  <div>
    <div>{{cinema.cname}}</div>
    <div>{{cinema.caddress}}</div>
    <button v-for="(elem,i) of time" :key="i">
      <span> {{elem.time_start}}</span>
      <span> {{elem.price_e}}元 </span>
    </button>
    <br>
    <hr>
  </div>
</template>
<script>
//从movieLi 跳转过来时，要把 city_id (vuex获取),mid(movieLi)获取过来
export default {
  data(){
    return{
        
    }
  },
  computed:{

  },
  methods:{

  },
  created(){

  },  
  props:{
    cinema:{default:""},
    time:{default:""}
  },
}
</script>
<style>

</style>