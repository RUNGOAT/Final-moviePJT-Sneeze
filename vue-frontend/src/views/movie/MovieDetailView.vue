<template>
  <div>
    <h2>Movie Detail</h2>
    <ReviewList/>
  </div>
</template>

<script>
import ReviewList from '@/views/movie/ReviewList'

export default {
  name: 'MovieDetailView',
  components: {
    ReviewList,
  }
}
</script>

<style>

</style>