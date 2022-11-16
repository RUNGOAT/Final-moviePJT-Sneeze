<template>
  <div>
    <h1>Movie</h1>
    <MovieCardView/>
  </div>
</template>

<script>
import MovieCardView from '@/views/movie/MovieCardView'
export default {
  name: 'MovieView',
  components: {
    MovieCardView
  },
}
</script>

<style>

</style>