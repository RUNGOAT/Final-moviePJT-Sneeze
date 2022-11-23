<template>

  <div>
    <form @submit.prevent="searchMovie" class="form row mb-5 px-5 py-2">
      <!-- <label for="search" class="h1">영화 검색</label> -->
      <input type="search" id="search" v-model="title" @input="searchMovie" class="form-control col" placeholder="영화제목을 입력하세요.">
      <button class="btn btn-primary col-1 ms-3">검색</button>
    </form>
    <!-- <div class="popular-list row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-6 g-4 text-center px-5 mx-5 d-flex flex-wrap"
      v-if="movies"
    > -->
    <div class="popular-list row gy-4 ms-2"
      v-if="movies"
    >
        <MovieCardView
          v-for="movie in movies"
          :key="movie.created_at"
          :movie="movie"
        />
    </div>
    <br><br><br><br>
    <div v-show="!title">
      <b-pagination
        @input="getList"
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
    getList() {
      // console.log(this.currentPage)
      axios({
        methods: 'get',
        url: `${API_URL}/movies/list/?page=${this.currentPage}`,
      })
        .then(res => {
          // console.log(res)
          this.movies = res.data.results
          this.total_row = parseInt(res.data.count / 20)
          this.searchCardMovie()
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
    },
    cardSearch() {
      if ( this.$route.params.title ) {
        this.title = this.$route.params.title
      }
    },
    searchCardMovie() {
      if ( this.$route.params.title ) {
        this.title = this.$route.params.title
        const moviedata = this.$store.state.movies
        if (this.title) {
          const searchMovies = moviedata.filter(movie => {
            return movie.title.includes(this.title)
          })
          this.movies = searchMovies
        } 
      }
    },
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