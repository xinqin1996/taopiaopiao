<template>
  <div class="root" id="seat">
    <div class="content">
      <div class="dy-list-item">
        <div class="cinema-info">
          <div class="dy-list-title">哪吒之魔童降世</div>
          <div class="dy-list-brief">今天 08-20 20:05~21:55(国语 3D)</div>
        </div>
      </div>
      <div id="J_xseat">
        <div class="seat-legend">
          <ul>
            <li>
              <i class="tpp-i i-normal core"></i>可选
            </li>
            <li>
              <i class="tpp-i i-sold core"></i>已售
            </li>
            <li>
              <i class="tpp-i i-best-area"></i>最佳观影区
            </li>
          </ul>
        </div>
        <div class="hall-name">
          <p class="i-screen">彩虹厅 银幕</p>
        </div>
      </div>
      <div></div>
    </div>
    <div class="list_bg">
      <div class="seat_list" @click="choose">
        <div class="row" v-for="(item,index) of list" :key="index">
          <div class="col" v-for="(elem,index2) of item" :key="index2">
            <!-- show==0 代表座位已经出售，显示为红色   -->
            <span :data-j="elem.j" :data-i="elem.i" :data-show="elem.show" :data-choose="elem.choose" :class="{'is_show':elem.show==0,green:elem.choose==1}"></span>          
          </div>
        </div>
      </div>     
    </div>
    <div class="choose_main">
      <ul>
        <li class="choose_item" v-for="(elem,i) of buyList" :data-j="elem.j" :data-i="elem.i" :key="i" @click="del">
          <h3>{{elem.j+1}}排{{elem.i+1}}座</h3>
          <h4>72.7元</h4>
        </li>        
      </ul>
    </div>
    <div class="jus" :class="{show:buyList.length>0}" @click="toPayment">
      <span class="tpp-btn">请选座位</span>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      id:[1,3,4,6],
      list:[],      //座位列表  这种形式  [ {i:7,j:3},{i:7,j:4} ]   全部的座位列表
      soldList:[ {i:8,j:5},{i:8,j:3},{i:8,j:4},{i:6,j:5},{i:7,j:3},{i:7,j:4} ],  //已售位置
      // buyList:[],   //${el.dataset.j}排${el.dataset.i}座  这种形式的名字 ,显示在底部
    }
  },
  created(){
    this.createList();
  },
  computed:{   //使用计算属性，计算出一个数组，里面包含了，choose==1的对象，可以（强行监听数组 list=[] 的变化）
    buyList(){  
      var list=[];
      for(var j=0;j<this.list.length;j++){
        for(var i=0;i<this.list[j].length;i++){
          if(this.list[j][i].choose==1){
            list[list.length]=this.list[j][i];
          }
        }
      }
      return list;
    },
  },  
  methods:{
    toPayment(){
      
    },
    //删除位置
    del(e){ 
      console.log(e.currentTarget);
      var el=e.currentTarget;
      var j=el.dataset.j;
      var i=el.dataset.i;
      //找到对应的元素 删除      
      this.list[j][i].choose=0;
    },
    //选座位
    choose(e){
      var el=e.target;
      if(el.nodeName=="SPAN"){ 
        var s=el.dataset.show;
        if(s!=0){         //在s!=0 是操作
          // var list=this.list;
          var j=el.dataset.j;
          var i=el.dataset.i;      
          if(el.dataset.choose==0){   //没有选中，让其选中
            this.list[j][i].choose=1;     
          }else{                           //否则让其不选中
            this.list[j][i].choose=0;
          }      
        }
      } 
    },
    //创建座位list，
    createList(){
      var soldList=this.soldList;
      var list = [];
      for(var a=0;a<9;a++){
        var li=[]
        for(var b=0;b<14;b++){
          var num=0;
          for(var z=0;z<soldList.length;z++){
            if((soldList[z].i==b) && (soldList[z].j==a)){
              num++;
            }
          }
          if(num>0){
            var obj={i:b,j:a,show:0,choose:0}  //show:0 位置出售    
          }else{
            var obj={i:b,j:a,show:1,choose:0}  //show:1 位置未出售
          }
          li[b]=obj;
        }
        list[a]=li;
      }
      this.list=list;
    },
    //load
    load(){
      var url="cinema/seat"
      // var cmid=
    },
  }
}
</script>
<style>
    @import url("../../assets/css/seat.css");
</style>