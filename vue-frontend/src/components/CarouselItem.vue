<template>
  <slide>
      <img class="d-block w-100" :src="backdrop_path + movie.backdrop_path" :alt="movie.title">
      <!-- <div class="carousel-caption d-none d-md-block">
        <h5>{{ movie.title }}</h5>
        <p>{{ movie.overview }}</p>
      </div> -->
  </slide>
</template>

<script>
import { Slide } from 'vue-carousel';
// import MovieDetailView from '@/views/movie/MovieDetailView'

export default {
  name: 'CarouselItem',
  components: {
    // MovieDetailView,
    Slide,
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