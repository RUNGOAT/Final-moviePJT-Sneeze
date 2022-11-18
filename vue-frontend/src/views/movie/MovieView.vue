<template>
  <div class="popular-list row row-cols-1 row-cols-md-5 gy-3">
    <MovieCardView
      v-for="movie in movies"
      :key="movie.created_at"
      :movie="movie"
    />
  </div>
</template>

<script>
import MovieCardView from '@/views/movie/MovieCardView'


export default {
  name: 'MovieView',
  components: {
    MovieCardView
  },
  data () {
    return {
      page: 1,
    }
  },
  computed: {
    movies() {
      const movies = this.$store.state.movies
      return movies.slice(0, 20)
    }
  },
}
</script>

<style>
  .popular-list {
    display: flex;
    margin-left: 5rem;
    margin-right: 5rem;
  }
</style>