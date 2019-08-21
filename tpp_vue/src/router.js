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
    {path:'/',component:Home},
    {path:'/selectCity',component:SelectCity},
    {path:'/movieDetail/:mid',component:MovieDetail,props:true},
    {path:'/findCinema',component:FindCinema},
    {path:'/cinema',component:Cinema},
    {path:'/login',component:Login},
    {path:'/reguser',component:Reguser}
    // {path:'/',component:Index},
    // {path:'/lady',component:Lady},
    // {path:'/shoppingCar',component:ShoppingCar},
    // {path:'/select',component:select},
    // {path:'*',component:NotFound},
    
  ]
})
