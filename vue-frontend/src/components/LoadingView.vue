<template>
  <div>

  </div>
</template>

<script>
export default {
  name: 'LoadingView',
  data() {
    return {
      movieId: this.$route.params.movie_id
    }
  },
  created() {
    this.goDetail()
  },
  methods: {
    goDetail() {
      this.$router.push({ name: 'MovieDetail', params: { movie_id: this.movieId }})
    }
  },
}
</script>

<style>

</style>