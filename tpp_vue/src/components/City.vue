<template>
  <div>
    <h1 @click="selectCity">{{cityName}}</h1>
  </div>
</template>
<script>
export default {
  data(){
      return {

      }
  },
  computed:{
      //获取vuex中的城市名字
      cityName(){
          return this.$store.state.city;
      }
  },
  methods:{
    //跳转到城市选择页面
    selectCity(){
      this.$router.push("/selectCity")
    }
  },
}
</script>
<style scoped>
  .notFound{
    font-size:32px;
  }
</style>