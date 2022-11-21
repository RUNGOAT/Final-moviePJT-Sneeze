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
    <br><br><br>
    <b-pagination
      @input="changeList"
      v-model="currentPage"
      :total-rows="total_row"
      :per-page="perPage"
      aria-controls="my-table"
      align="center"
    ></b-pagination>

    <b-table
      id="my-table"
      :movies="movies"
      :per-page="perPage"
      :current-page="currentPage"
      small
    ></b-table>
  </div>
</template>

<script>
import MovieCardView from '@/views/movie/MovieCardView'
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'MovieView',
  components: {
    MovieCardView
  },
  data () {
    return {
      title: null,
      movies: this.$store.state.movies.slice(0, 20),
      // list: [],
      currentPage: 1,
      perPage: 5,
      total_row: 20,
    }
  },
  created() {
    this.getList()
  },
  methods: {
    changeList() {
      this.getList()
    },
    getList() {
      console.log(this.currentPage)
      axios({
        methods: 'get',
        url: `${API_URL}/movies/list/?page=${this.currentPage}`,
      })
        .then(res => {
          // console.log(res)
          this.movies = res.data.results
          this.total_row = parseInt(res.data.count / 20)
        })
    },
    searchMovie() {
      const moviedata = this.$store.state.movies
      if (this.title) {
        const searchMovies = moviedata.filter(movie => {
          return movie.title.includes(this.title)
        })
        this.movies = searchMovies
      } 
      else {
        this.getList()
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