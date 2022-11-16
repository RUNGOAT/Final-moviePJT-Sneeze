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
  props: {
    movie: Object,
  },
  components: {
    ReviewList,
  },
  data() {
    return {
      imageUrl: 'https://image.tmdb.org/t/p/w1280'
    }
  },
  computed: {
    recoMovies() {
      return this.$store.state.cosMovies
    }
  },
  methods: {
    getCosMovie() {
	    this.$store.dispatch('getCosMovie', this.movie.id)  // 디테일 페이지의 영화 id
    }
  },
  created() {
    this.getCosMovie()
  },
}
</script>

<style>

</style>