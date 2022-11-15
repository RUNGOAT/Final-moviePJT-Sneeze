<template>
  <div>
    <H2>Movie Review</H2>
    <MovieReviewCommentView/>
  </div>
</template>

<script>
import MovieReviewCommentView from '@/components/MovieReviewCommentView'
export default {
  name: 'MovieReviewView',
  components: {
    MovieReviewCommentView,
  }
}
</script>

<style>

</style>