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
        find_cinema(){
            //把mid的值传给findCinema;
            this.$router.push({
                path:'/findCinema',
                query:{mid:this.elem.mid},
            })
        },
    }
}
</script>