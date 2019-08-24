<template>
	<div>
		<mt-tab-container v-model="active">
			<mt-tab-container-item id="movie">
				<my-city></my-city>
				<!-- 这里再次进行分屏切换 -->
				<h2 @click="activeTwo_now">正在热映</h2>
				<h2 @click="activeTwo_soon">即将上映</h2>
				<mt-tab-container v-model="activeTwo">
						<mt-tab-container-item id="now">
						<!-- -----轮播---- -->
						<van-swipe :autoplay="3000" indicator-color="white">
						<van-swipe-item v-for="(item,i) of list" :key="i">
							<img :src="`http://127.0.0.1:5050/${item.img_url}`" alt="">
						</van-swipe-item>
						</van-swipe>	

						<!-- 这里是正在热映的内容 -->
						<movie-list :is_show="1"></movie-list>
					</mt-tab-container-item>
					<mt-tab-container-item id="soon">
						<!-- 这里是即将上映的内容 -->
						<movie-list :is_show="0"></movie-list>
					</mt-tab-container-item>
				</mt-tab-container>
			</mt-tab-container-item>
			<mt-tab-container-item id="cinema">
				<my-city></my-city>
				影院
			</mt-tab-container-item>
			<mt-tab-container-item id="my">
				<my-login></my-login>
			</mt-tab-container-item>
		</mt-tab-container>

		<mt-tabbar v-model="active" fixed>
			<mt-tab-item id="movie" data-cid="movie" @click.native="changeActive">热映</mt-tab-item>
			<mt-tab-item id="cinema" data-cid="cinema" @click.native="changeActive">影院</mt-tab-item>
			<mt-tab-item id="my" data-cid="my" @click.native="changeActive">我的</mt-tab-item>
		</mt-tabbar>
	</div>
</template>
<script>
import movieList from "./movie/MovieList";
export default {
	data(){
		return {
			list:[],
			active:"movie",
			activeTwo:"now",
			// showList:[],
			// notShowList:[],
		}
	},
	methods:{
		onload(){
			var url="movie/v1/carousel"
			this.axios.get(url).then(res=>{
				if(res.data.code==1){
					this.list=res.data.data;
					console.log(this.list);
				}
			})
		},
		// 改变vuex的active 点击时，保存住当前页面的active(有效果)
		changeActive(e){
			this.$store.commit("changeActive",this.active)
		},
		//切换（正在热映）-（即将上映）
		activeTwo_now(){
			this.activeTwo="now";
			this.$store.commit("changeActiveTwo",this.activeTwo)
		},
		activeTwo_soon(){
			this.activeTwo="soon";
			this.$store.commit("changeActiveTwo",this.activeTwo)
		},
		// loadList(is_show){
		// 	var arr=[this.notShowList,this.showList]
		// 	var url="movie/v1/movie_is_show";
		// 	var obj={is_show};
		// 	console.log(obj);
		// 	this.axios.get(url,{params:obj}).then(res=>{
		// 		if(res.data.code==-1){
		// 			console.log("没有电影")
		// 		}else{
		// 			arr[is_show]=res.data.data;
		// 		}
		// 	})
		// }
	},
	created(){
		this.onload();
		//组件刷新，获取vuex里的active；
		this.active=this.getActive;
		this.activeTwo=this.getActiveTwo;
		// //创建时运行loadList;
		// this.loadList(0);
		// this.loadList(1);
	},
	computed:{
		//计算属性，获取vuex里的active；
		getActive(){
			return this.$store.state.active;
		},
		//计算属性，获取vuex里的activeTwo；
		getActiveTwo(){
			return this.$store.state.activeTwo;
		},
	},
	components:{
		movieList,
	}
	// methods:{
	// 	getActive(val){
	// 		this.active=val;
	// 	}
	// }
}
</script>	
<style>
	tabbarTwo{
		float:right;
	}
</style>
