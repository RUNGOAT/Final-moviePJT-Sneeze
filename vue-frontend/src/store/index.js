import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const API_URL = 'http://127.0.0.1:8000'
const API_KEY = 'c12ca67b05f1378e09cf647da6b26b3e'
const YOUTUBE_URL = 'https://www.googleapis.com/youtube/v3/search'
const YOUTUBE_KEY = 'AIzaSyDCNryclud9PWXHtYc9Nw8xnal3K4_9U00'


export default new Vuex.Store({
  state: {
    movies: [],
    movieGenre: [],
    cosMovies: [],
    similarMovies: [],
    youtubeVideos: [],
    top5Movies: [],
    recommendations: [],
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
    },
    SEARCH_YOUTUBE: function (state, res) {
      state.youtubeVideos = res.data.items
    },
    GET_TOP5_MOVIES(state, top5Movies) {
      state.top5Movies = top5Movies
    },
    GET_RECOMENDED(state, recommendations) {
      state.recommendations = recommendations
    },
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
    },
    // YOUTUBE ACTIONS
    searchYoutube(context, searchText) {
      const params = {
        q: searchText+'movie',
        key: YOUTUBE_KEY,
        part: 'snippet',
        type: 'video'
      }
      axios({
        method: 'get',
        url: YOUTUBE_URL,
        params,
      })
      .then(res => {
        // console.log(res.data.items)
        context.commit('SEARCH_YOUTUBE', res)
      })
      .catch(err => console.log(err))
    },
    // 인기도 탑 5
    getTop5Movies(context) {
      axios({
        method: 'get',
        url: `${API_URL}/movies/`,
        // headers: {
        //   Authorization: `Token ${context.state.token}`
        // },
      })
        .then((res) => {
          console.log(res)
          const movies = res.data
          _.sortBy(movies, 'popularity').reverse()
          const top5Movies = movies.slice(0, 5)
          console.log(top5Movies)
          context.commit('GET_TOP5_MOVIES', top5Movies)
        })
        .catch(err => console.log(err))
    },
    getRecommended(context) {
      axios({
        method: 'get',
        url: `${API_URL}/movies/recommended/`,
        // headers: {
        //   Authorization: `Token ${context.state.token}`
        // },
      })
        .then((res) => {
          console.log(res)
          console.log('recommendation sucess')
          context.commit('GET_RECOMENDED', res.data)
        })
        .catch(err => console.log(err))
    }
  },
  modules: {
  }
})
