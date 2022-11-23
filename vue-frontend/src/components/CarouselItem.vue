<template>
  <div :class="[movie.id == 1 ? 'carousel-item active' : 'carousel-item']" data-bs-interval="2000">
    <img :src="backdrop_path + movie.backdrop_path" class="d-block w-100" alt="movie.title" id="carouselImg">
    <div class="carousel-caption d-none d-md-block text-left">
      <h1 style="font-weight: bold;">{{ movie.title }}</h1>
      <p class="fs-4">{{ movie.overview }}</p>
    </div>
       <div :style="{ 'background-image': 'url(' + backdrop_path + movie.backdrop_path + ')' }">
  </div>
</template>

<script>
// import { Slide } from 'vue-carousel';
// import MovieDetailView from '@/views/movie/MovieDetailView'

export default {
  name: 'CarouselItem',
  components: {
    // MovieDetailView,
    // Slide,
  },
  props: {
    movie: Object,
  },
  data() {
    return {
      backdrop_path: `https://image.tmdb.org/t/p/original`
    }
  }
}
</script>

<style>

</style>