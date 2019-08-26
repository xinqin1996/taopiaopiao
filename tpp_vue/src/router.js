import Vue from 'vue'
import Router from 'vue-router'
import HelloContainer from "./components/HelloWorld.vue"



//对下面这些自己创建的组件进行路径的配置
// 每新建一个组件，就在这里导入，并为其创建一个接口
// import Index from './views/Index'
// import Lady from './views/Lady'
// import ShoppingCar from './views/ShoppingCar'
// import NotFound from './views/NotFound'
// import select from './views/select'
import Home from './views/Home'
import SelectCity from './views/city/SelectCity'
import MovieDetail from './views/movie/MovieDetail'
import FindCinema from './views/cinema/FindCinema'
import Cinema from './views/cinema/Cinema'
import Login from "./views/login/Login.vue"
import Reguser from "./views/reguser/Reguser.vue"

Vue.use(Router)

export default new Router({
  routes: [
    // {path:'/hello',component:HelloContainer},
    {path:'/',component:Home,meta:{keepAlive:false}},    //false 不需要缓存页面 true需要缓存页面
    {path:'/selectCity',component:SelectCity,meta:{keepAlive:false}},
    {path:'/movieDetail/:mid',component:MovieDetail,props:true,meta:{keepAlive:false}},
    {path:'/findCinema',component:FindCinema,meta:{keepAlive:false}},
    {path:'/cinema',component:Cinema,meta:{keepAlive:false}},
    {path:'/login',component:Login,meta:{keepAlive:false}},
    {path:'/reguser',component:Reguser,meta:{keepAlive:false}}
    // {path:'/',component:Index},
    // {path:'/lady',component:Lady},
    // {path:'/shoppingCar',component:ShoppingCar},
    // {path:'/select',component:select},
    // {path:'*',component:NotFound},
    
  ],
  // 缓存保存
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
  // this.$router.back();
  //1 获取路由地址
  // console.log(this.$route.path)
  // console.log(window.location.href)
  //2 返回前一个页面 
  // this.$router.back()
})
