<template>
    <div class="app-login">
        <!-- 1：头像 -->
        <div class="imgstyle">
            <img :src="imgurl" >
        </div>
        <div class="am-list">
            <!-- 2：用户名输入框（手机号）  -->
            <mt-field :placeholder="unameholder" v-model="uphone" class="am-list-item"></mt-field>
            <!-- 3：密码输入框 -->
            <mt-field :placeholder="upwdholder" v-model="upwd" class="am-list-item"></mt-field>
            <!-- 4：登录按钮 -->
            <div class="btnstyle">
                <mt-button @click="login">登 录</mt-button>
            </div>
            <!-- 5:免费注册 -->
            <router-link to="/reguser" class="fontstyle">没有账号?免费注册</router-link>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            imgurl:"http://127.0.0.1:5050/01.png",
            unameholder:"请输入您的手机号",
            upwdholder:"请输入您的密码",
            uphone:"",
            upwd:""
        }
    },
    computed:{
        toLoginPath(){ return this.$store.state.toLoginPath;},
        cid(){return this.$store.state.cid; },
        mid(){return this.$store.state.mid; },
    },
    methods:{
        login(){
            //完成用户登录操作
            //1：获取用户输入号码
            var u=this.uphone;
            //2：获取用户输入密码
            var p=this.upwd;
            // console.log(u+":"+p)测试
            //3:创建正则表达式验证用户名和密码
            var ureg=/^1[3-9][0-9]{9}$/;
            var preg=/^\w{6}$/;
            // 4：用户名验证失败，提示短消息
            if(!ureg.test(u)){
                this.$toast("用户名格式不正确");
                return;
            }
            // 5：密码验证失败，提示短消息
            if(!preg.test(p)){
                this.$toast("密码格式不正确");
                return;
            }
            // 6：发送ajax请求 axios
            var url="user/v1/login";
            var obj={uphone:u,upwd:p}
            this.axios.get(url,{params:obj}).then
            (res=>{
                // 7：获取服务器返回结果
                // console.log(res);
                // 7.1登录失败  提示  17816899467
                if(res.data.code==-1){
                    console.log(1);
                    this.$toast("用户名或密码错误")
                }else{
                    //这里进行判断
                      //1 在买票时被迫登录,返回登录完返回上一页（选择了电影获取电影院时，没有登录，被迫登录）   
                      if(this.mid!="" || this.cid!=""){
                          this.$router.push(this.toLoginPath);
                      }else{     
                        //2 直接登录,没有浏览过就会直接跳转到主页
                        //    1: 先设置主页面的active=movie  跳转到首页组件
                        this.$store.commit("changeActive",'movie');  
                        this.$router.push("/")          
                        // window.history.go(0); 该方法不可用，
                        //刷新页面，会清除掉前面改变过得vuex 
                    }      
                }
                }
            )
        }
    }
}
</script>
<style scoped>
    /* 图片样式 */
    .imgstyle{
        width:5rem;height: 5rem;
        margin: 3rem auto;
    }
    .imgstyle>img{border-radius: 5rem}
    /* 输入框样式 */
    .am-list-item{
        width:20rem;
        border: 0;
        border-bottom: 1px solid #ff2e62;
        margin: 1.8rem auto;
        font-size: .1rem;
    }
    /* 按钮样式 */
    .btnstyle{
        width:20rem; height: 2.8rem;
        margin: 2rem auto;
        margin-bottom: 1rem;
    }
    .btnstyle>button{
        width: 100%;height: 100%;
        background: linear-gradient(45deg,#ff47a8,#ff2e62);
        border-radius: 2rem;
        font-size: 1.1rem;
        color: #ffffff;
    }
    /* 注册文字样式 */
    .fontstyle{
        display: inline-block;
        width: 20rem;
        font-size:.8rem;
        text-align: center;
        color: #333333;
    }
</style>