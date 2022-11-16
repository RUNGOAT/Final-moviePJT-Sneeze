<template>
  <div>
    <div :class=" movie.id === 1? 'carousel-item active' : 'carousel-item' " data-bs-interval="2000">
        <img class="d-block w-100" :src="backdrop_path + movie.backdrop_path" :alt="movie.title">
        <div class="carousel-caption d-none d-md-block">
          <h5>{{ movie.title }}</h5>
          <p>{{ movie.overview }}</p>
        </div>
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
      backdrop_path: `https://image.tmdb.org/t/p/original/`
    }
  }
}
</script>

<style>

</style>