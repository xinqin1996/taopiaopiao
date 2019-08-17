<template>
  <div>
      <ul class="city_ul" @click="selectCity">
				<li data-id="1">北京</li>
				<li data-id="2">上海</li>
				<li data-id="3">深圳</li>
				<li data-id="4">广州</li>
				<li data-id="5">成都</li>
				<li data-id="6">武汉</li>
				<li data-id="7">杭州</li>
				<li data-id="8">重庆</li>          
      </ul>
			城市id{{$store.getters.getCity_id}}
			城市name{{$store.getters.getCity}}
			
			<van-button type="default">默认按钮</van-button>
<van-button type="primary">主要按钮</van-button>
<van-button type="info">信息按钮</van-button>
<van-button type="warning">警告按钮</van-button>
<van-button type="danger">危险按钮</van-button>
  </div>
</template>
<script>
export default {
  data(){
      return{
				cityInfor:[],
      }
  },
  methods:{
		//选择城市调回过来的页面，
		selectCity(e){
			if(e.target.nodeName=="LI"){
				 this.cityInfor[0]=e.target.dataset.id;//城市id
				// console.log(cityId)
				this.cityInfor[1]=e.target.innerHTML;//城市name
				this.$store.commit("selectCity",this.cityInfor);
				// this.$router.push("/home");
				//返回前一个页面
				window.history.go(-1);
			}
		}
	},
	//接受从home 传过来的active;
	// props:{
  //   active:{default:""},
  // }
}
</script>
<style scoped>

</style>