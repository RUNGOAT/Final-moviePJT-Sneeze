<template>
  <div>
    <img :src="poster_path" class="d-block w-100" :alt="movie.title ">
    <div class="carousel-caption d-none d-md-block">
      <h5>{{ movie.title }}</h5>
      <p>{{ movie.overview }}</p>
    </div>
  </div>
</template>

<script>
// import MovieDetailView from '@/views/movie/MovieDetailView'

export default {
  name: 'CarouselItem',
  components: {
    // MovieDetailView,
  },
  props: {
    movie: Object,
  },
  data() {
    return {
      poster_path: `https://image.tmdb.org/t/p/original/${ this.movie.poster_path }`
    }
  }
}
</script>

<style>

</style>