<template>
  <div>
    <h2>Movie Detail</h2>
    <MovieReviewView/>
  </div>
</template>

<script>
import MovieReviewView from '@/views/movie/MovieReviewView'

export default {
  name: 'MovieDetailView',
  components: {
    MovieReviewView,
  }
}
</script>

<style>

</style>