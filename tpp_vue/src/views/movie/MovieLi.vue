<template>
    <div data-mid="elem.mid">
        <hr/>
        <div @click="goMovieDetails">{{elem.mname}}</div>
        <div>{{elem.auteur}}</div>
        <div>{{elem.performer}}</div>
        <button @click="find_cinema">购票</button>
        <br/>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    props:{
        elem:{default:""},
    },
    methods:{
        goMovieDetails(){
            this.$router.push(`/movieDetail/${this.elem.mid}`)
        },
        //--------------------重点：在选好电影，跳转到电影院选择页面的时候，用vuex保存住mid的值----------------------
        find_cinema(){
            //把mid的值传给findCinema;
            this.$router.push({
                path:'/findCinema',
                query:{mid:this.elem.mid},
            })
            //  this.$store.commit("selectCity",this.cityInfor);
            // --------------------保存mid的值，重要部分-----------------
            this.$store.commit("changeMid",this.elem.mid)
            this.$store.commit("changeMname",this.elem.mname)
        },
    }
}
</script>