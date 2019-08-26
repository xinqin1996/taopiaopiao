<template>
  <div id="movie_detail">
    <!-- 1 video -->
    <div class="detail_video" :style="{height:videoHeight+'px'}">
      <video :src="`http://127.0.0.1:5050/${list.video}`" controls ></video>
      <div class="video_bottom"></div>
    </div>
    <!-- 2 中间详情 -->
    <div class="detail_middle">
      <!-- 图片和名字 -->
      <div class="middle_one cf">
        <!-- 图片 -->
        <div class="one_left">
          <img :src="`http://127.0.0.1:5050/${list.pic}`" alt="">
          <div class="icon">{{list.pic_label}}</div>
        </div>
        <!-- 名字 -->
        <div class="one_right">
          <div class="right_1">{{list.mname}}</div>
          <div class="right_2">{{list.eng_name}}</div>
          <div class="right_3">{{list.label}}</div>
          <div class="right_4">{{list.show_time}} 中国大陆上映</div>
          <div class="right_5" :class="{orange:!is_show}">{{list.wish}}人想看</div>
        </div>
      </div>
       <!-- 评分 -->     
      <div class="middle_two" :class="{'d-none':!is_show}">
        <div class="two_left">
          <div>{{list.score}}</div>
          <div class="start">
            <div class="start_inner" :style="{width:start_width}"></div>
          </div>
          <div>淘票票评分</div>
          <div>{{list.score_num}}人评</div>

          <div></div>
        </div>
        <div class="two_right">
          <img src="../../../public/img/score_scale1.png" alt="">
        </div>
      </div>
    </div>
    <div class="detail_blank"></div>
    <!-- 3 简介 -->
    <div class="detail_bottom">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">简介</mt-tab-item>
        <mt-tab-item id="2">影评</mt-tab-item>
        <mt-tab-item id="3">更多</mt-tab-item>
      </mt-navbar>
      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
         <div class="intro" :class="{height:isHeight}">
           {{list.intro}}
            <div class="show" @click="show">展开</div>
          </div> 
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
         <div class="film">观众热评</div> 
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
         <div class="more">电影动态</div> 
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <!-- 4 选座购票 -->
    <h3 class="detail_seat" @click="find_cinema">
      选座购票
    </h3>
  </div>  
</template>
<script>
// import movieLi from "./MovieLi";
export default {
  data(){
    return {
      list:{},
      videoHeight:window.innerHeight*0.35,
      start_width:'0px',
      selected:"1",
      isHeight:true,  //有一个固定高度
    }
  },
  methods:{
    find_cinema(){
      //把mid的值传给findCinema;
      this.$router.push({
        path:'/findCinema',
        query:{mid:this.mid}
      })
    },
    //show 点击展开更多
    show(){
      this.isHeight=false;
      var show=document.getElementsByClassName("show")[0];
      console.log(show);
      show.style.display='none';
    },
    //评分控制start
    get_start_width(){
      var num=parseFloat(this.list.score);
      var width=num/10*80;
      this.start_width = width+'px';
    },
    //获取电影信息的axios
    load(){
      var url="movie/v1/movie_detail";
      var obj={mid:this.mid};
      this.axios.get(url,{params:obj}).then(res=>{
        if(res.data.code==0){
          console.log("电影不存在，或者查询失败")
        }else{
          // 从数组中，去除list
          this.list=res.data.data[0];
          console.log(this.list);
          //查询成功
          //在list获取到数据时，在执行这个操作；
          this.get_start_width();
        }
      })
    },
  },
  created(){
    this.load();
  },
  computed:{
    is_show(){    //多少人想看控制显示
      return (this.list.is_show==1) ? true : false;
    }
  },
  props:{
      mid:{default:""},
  }
}
</script>
<style>
    @import url('../../assets/css/movieDetail.css');
</style>