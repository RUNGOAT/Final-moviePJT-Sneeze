<template>
  <div>
    <h2>Movie Detail</h2>
    <ReviewList />
  </div>
</template>

<script>
import ReviewList from '@/views/movie/ReviewList'

export default {
  name: 'MovieDetailView',
  components: {
    ReviewList,
  },
  data() {
    return {
      imageUrl: 'https://image.tmdb.org/t/p/w1280',
      movies: this.$store.state.movies,
      movieId: this.$route.params.movie_id
    }
  },
  computed: {
    recoMovies() {
      return this.$store.state.cosMovies
    },
    movie() {
      return this.movies.find(movie => movie.id === this.movieId)
    }
  },
  methods: {
    getCosMovie() {
      this.$store.dispatch('getCosMovie', this.movieId)  // 디테일 페이지의 영화 id
    }
  },
  created() {
    this.getCosMovie()
  },
}
</script>

<style>

</style>