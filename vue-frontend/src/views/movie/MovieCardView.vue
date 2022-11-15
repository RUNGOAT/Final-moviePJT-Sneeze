<template>
  <div>
    <h1>Movie Card</h1>
    <MovieDetailView/>
  </div>
</template>

<script>
import MovieDetailView from '@/views/movie/MovieDetailView'
export default {
  name: 'MovieCardView',
  components: {
    MovieDetailView,
  }
}
</script>

<style>

</style>