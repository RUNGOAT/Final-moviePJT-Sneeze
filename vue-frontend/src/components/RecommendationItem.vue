<template>
  <swiper-slide>
    <img :src="poster_path + movie.poster_path" :alt="movie.title">
  </swiper-slide>
  
</template>

<script>
import { SwiperSlide } from "vue-awesome-swiper";
  import "swiper/css/swiper.min.css";
export default {
 name: 'RecommendationItem',
 props: {
  movie: Object,
 },
 data() {
    return {
      SwiperSlide,
      poster_path: `https://image.tmdb.org/t/p/original/`,
    }
  }
}
</script>

<style>
img {
  width: 20%;
}
</style>