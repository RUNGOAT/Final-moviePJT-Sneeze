<template>
  <div>
    <h1>HOME</h1>
    <MovieCardView/>
  </div>
</template>

<script>
import MovieCardView from '@/views/movie/MovieCardView'
export default {
  name: 'HomeView',
  components: {
    MovieCardView,
  }
}
</script>

<style>

</style>