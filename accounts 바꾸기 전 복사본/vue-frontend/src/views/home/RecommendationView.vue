<template>
  <div>
    <h2>추천</h2>

    <!-- <swiper
      class="swiper"
      v-bind="swiperOptions"
      @swiper="setSwiperRef"
    >
      <swiper-slide
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
      >
        <img :src="poster_path + movie.poster_path" :alt="movie.title">
      </swiper-slide>
      
      
        class="swiper-pagination"
        slot="pagination"
      >
      </>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div> -->
    <!-- </swiper> -->

    
      
  </div>
</template>

<script>
  // import RecommendationItem from '@/components/RecommendationItem'
  // import { swiper, SwiperSlide } from "vue-awesome-swiper"
  
  // import SwiperCore, { Pagination, Navigation } from 'swiper'
  // import "swiper/css/swiper.min.css"
  // import 'swiper/components/pagination/pagination.scss'
  // import 'swiper/components/navigation/navigation.min.css'

  

  export default {
    name: "RecommendationView",
    components:	{
        // swiper,
        // SwiperSlide,
        // RecommendationItem,
    },
    props: {
      movie: Object,
    },
    data() {
      return {
        poster_path: `https://image.tmdb.org/t/p/original/`,
        // swiperOptions: { 
        //   navigation: true,
        //   pagination: true,
        //   slidesPerView: 6, 
        //   slidesPerGroup: 6,
        //   spaceBetween: 10, 
        //   breakpoints: {
        //     375: {
        //       slidesPerView: 1,
        //     },
        //     425: {
        //       slidesPerView: 2,
        //       slidesPerGroup: 2,
        //     },
        //     768: {
        //       slidesPerView: 3,
        //       slidesPerGroup: 3,
        //     },
        //     1024: {
        //       slidesPerView: 4,
        //       slidesPerGroup: 4,
        //     },
        //     1400: {
        //       slidesPerView: 5,
        //       slidesPerGroup: 5,
        //     },
        //   },
        // },
      }
    },
    methods: {
      // // getRecommended() {
      // //     // if (this.isLogin) {
      // //       this.$store.dispatch('getRecommended')
      // //     // } else {
      // //       //   alert('로그인이 필요한 서비스 입니다.')
      // //     //   this.$router.push({ name: 'LogInView'})
      // // },
      // getMovies() {
      //     // if (this.isLogin) {
      //       this.$store.dispatch('getMovies')
      //     // } else {
      //       //   alert('로그인이 필요한 서비스 입니다.')
      //     //   this.$router.push({ name: 'LogInView'})
      // },
    },
    computed: {
      movies() {
        console.log(this.$store.state.movies)
        return this.$store.state.movies
        // return movies._.orderBy('popularity')
      }
    }
  }
  

  


</script>

<style>
.swiper {
  width: 600px;
  height: 300px;
}
</style>