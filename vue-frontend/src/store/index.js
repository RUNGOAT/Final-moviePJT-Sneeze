import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const API_URL = 'http://127.0.0.1:8000'
const API_KEY = 'c12ca67b05f1378e09cf647da6b26b3e'



export default new Vuex.Store({
  state: {
    movies: [],
    movieGenre: [],
    cosMovies: [],
    similarMovies: [],
  },
  getters: {
  },
  mutations: {
    GET_MOVIES(state, movies) {
      state.movies = movies
    },
    GET_COS_MOVIE(state, cosMovies) {
      state.cosMovies = cosMovies
    },
    GET_SIMILAR_MOVIE(state, similarMovies) {
      state.similarMovies = similarMovies
    }
  },
  actions: {
    getMovies(context) {
      axios({
        method: 'get',
        url: `${API_URL}/movies/`,
        // headers: {
        //   Authorization: `Token ${context.state.token}`
        // },
      })
        .then((res) => {
          console.log(res)
          context.commit('GET_MOVIES', res.data)
        })
        .catch(err => console.log(err))
    },
    getCosMovie(context, movie_id){
      axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=${API_KEY}&language=ko-KR&page=1`
      })
        .then(res => {
          // console.log(res.data.results)
          context.commit('GET_COS_MOVIE', res.data.results)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getSimilarMovie(context, movie_id){
      axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${API_KEY}&language=ko-KR&page=1`
      })
      .then(res => {
        // console.log(res.data.results)
        context.commit('GET_SIMILAR_MOVIE', res.data.results)
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  modules: {
  }
})
