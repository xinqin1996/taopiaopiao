<template>
  <div>
    <movie-li v-for="(elem,i) of list" :key="i" :elem="elem">
      
    </movie-li>
  </div>  
</template>
<script>
import movieLi from "./MovieLi";
export default {
  data(){
    return {
      list:[],
    }
  },
  methods:{
    //ajax请求函数
    loadList(is_show){
      // var arr=[this.notShowList,this.showList]
      // console.log(arr);
      // console.log(this.showList);
			var url="movie/v1/movie_is_show";
			var obj={is_show:is_show};
			// console.log(obj);
			this.axios.get(url,{params:obj}).then(res=>{
				if(res.data.code==-1){
					console.log("没有电影")
				}else{
          this.list=res.data.data;
          // console.log(this.list);
				}
			})
		}
  },
  created(){
    this.loadList(this.is_show);
  },
  props:{
    is_show:{default:1},
  },
  components:{
   movieLi, 
  }
}
</script>
<style>

</style>