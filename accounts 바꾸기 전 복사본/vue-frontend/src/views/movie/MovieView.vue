<template>
  <div>
    <form @submit.prevent="searchMovie" class="form row mb-5">
      <label for="search" class="h1">영화 검색: </label>
      <input type="search" id="search" v-model="title" @input="searchMovie" class="form-control col">
      <button class="btn btn-primary col-1 ms-3">검색</button>
    </form>
    <div class="popular-list row gx-2 gy-4 text-center">
      <MovieCardView
        v-for="movie in movies"
        :key="movie.created_at"
        :movie="movie"
      />
    </div>
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
      title: null,
      movies: this.$store.state.movies.slice(0, 20)
    }
  },
  methods: {
    searchMovie() {
      const moviedata = this.$store.state.movies
      if (this.title) {
        const searchMovies = moviedata.filter(movie => {
          return movie.title.includes(this.title)
        })
        this.movies = searchMovies
      } else {
        this.movies = moviedata.slice(0, 20)
      }
    }
  }
}
</script>

<style>
  .popular-list {
    display: flex;
    margin-left: 5rem;
    margin-right: 5rem;
  }
</style>