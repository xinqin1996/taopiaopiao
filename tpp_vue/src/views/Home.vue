<template>
	<div>
		<mt-tab-container v-model="active">
			<mt-tab-container-item id="movie">
				<div class="cityAndShow cf">
					<my-city class="city"></my-city>
					<!-- 这里再次进行分屏切换
					<van-tabs class="show">
  						<van-tab title="正在热映" @click.native="activeTwo_now">
							  <movie-list :is_show="1"></movie-list>
						</van-tab>
  						<van-tab title="即将上映" @click="activeTwo_soon">
								<movie-list :is_show="0"></movie-list>
						</van-tab>
					</van-tabs> -->
					<div class="changeh">
						<h2 @click="activeTwo_now" class="h2">正在热映</h2>
						<h2 @click="activeTwo_soon" class="h2">即将上映</h2>					
					</div>					
				</div>


				<van-swipe :autoplay="3000">
					<van-swipe-item v-for="(item,i) of list" :key="i" class="carouselImg">
     					<img :src="`http://127.0.0.1:5050/${item.img_url}`" alt="">
					</van-swipe-item>
				</van-swipe> 

				<mt-tab-container v-model="activeTwo">
					<mt-tab-container-item id="now">      
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
			<mt-tab-item id="movie" data-cid="movie" @click.native="changeState(0)">
				<tabaricon
				:selectedImage="require('../../public/img/电影active.png')"
                :normalImage="require('../../public/img/电影.png')"
                :focused="currentIndex[0].isSelect"></tabaricon>
				热映</mt-tab-item>
			<mt-tab-item id="cinema" data-cid="cinema" @click.native="changeState(1)">
				<tabaricon
				:selectedImage="require('../../public/img/影院active.png')"
                :normalImage="require('../../public/img/影院.png')"
                :focused="currentIndex[1].isSelect"></tabaricon>
				影院
			</mt-tab-item>
			<mt-tab-item id="my" data-cid="my" @click.native="changeState(2)">
				<tabaricon
				:selectedImage="require('../../public/img/我的active.png')"
                :normalImage="require('../../public/img/我的.png')"
                :focused="currentIndex[2].isSelect"></tabaricon>
				我的
			</mt-tab-item>
		</mt-tabbar>
	</div>
</template>
<script>
import movieList from "./movie/MovieList";
//1.2引入底部导航条的图片切换组件
import TabarIcon from "./movie/TabarIcon.vue"

export default {
	data(){
		return{
			//active保存的是一个字符串：子面板id
            active:"movie",
            //在data添加属性 currentIndex
            //集中保存按钮状态
            currentIndex:[
                {isSelect:true},//0保存第一个按钮的状态
                {isSelect:false},//1保存第一个按钮的状态
                {isSelect:false},//2保存第一个按钮的状态
            ],
			list:[],
			activeTwo:"soon",
			carouselimg:"http:127.0.0.1:5050"
			// showList:[],
			// notShowList:[],
		}
	},
	methods:{
		    changeState(idx){
            // 功能：指定当前按钮状态修改true
            //          其他按钮状态修改false
            console.log(idx)
            // 1：创建循环遍历状态数组
            for(var i=0;i<this.currentIndex.length;i++){
            // 2：获取用户点击下标
                var ui=idx;
            //   与当前下标比较
                if(ui==i){
            // 3.如果两个值相等当前状态true
                this.currentIndex[i].isSelect=true
                }else{
            // 4:其他元素状态false
                this.currentIndex[i].isSelect=false 
                }
            }
        },
		//轮播图
        onload(){
            var url="movie/v1/carousel"
            this.axios.get(url).then(res=>{
                if(res.data.code==1){
                    this.list=res.data.data;
                }
            })
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
		this.onload()
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
		//注册子组件
		movieList,
		"tabaricon":TabarIcon
	}
	// methods:{
	// 	getActive(val){
	// 		this.active=val;
	// 	}
	// }
}
</script>	
<style scoped>	
	.city{
		float:left;
	}
	.changeh{
		float:right;
		/* position:fixed; */
		top:13px;right:28px;
		width:130px;
		z-index:50;
		background-color:#fff;
		height:44px;
		line-height: 44px;
		display: flex;
		border-radius: 5px
	}
	.h2{
		font-size:15px;
		padding:2px;	
		cursor: pointer;
	}
	tabbarTwo{
		float:right;
	}
	.carouselImg img{
		width:100%;
	}
	.cityAndShow{
		display: flex;
		justify-content: space-between;
		padding: 1rem 2rem;
	}
	.mint-tabbar>.mint-tab-item{
    color: #2c2c2c;
}
	/* 4.修改组件默选中样式 */
	.mint-tabbar>.mint-tab-item.is-selected{
    background-color: transparent;
    color: #ff4d64;
}
</style>
