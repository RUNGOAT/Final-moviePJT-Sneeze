<template>
  <div>
    <h1>HOME</h1>
    <CarouselList/>
    <HomeRecoCard :movies="shortest_movies"/>
    <RecommendationView/>
  
  </div>
</template>

<script>
import CarouselList from '@/components/CarouselList'
import RecommendationView from '@/views/home/RecommendationView'
import HomeRecoCard from '@/components/HomeRecoCard.vue'
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'HomeView',
  data() {
    return {
      movies: [],
      movie: '',
      favorite_movies: [],
      shortest_movies: [],
      users_movies: [],
      my_like_users_movies: [],
      user: '',
      my_users_like_movies: [],
    }
  },
  components: {
    CarouselList,
    RecommendationView,
    HomeRecoCard,
  },
  created() {
      this.getMovies()
      this.getTop5Movies()
      this.getMe()
    },
  methods: {
    getMe() {
      axios({
        method: 'get',
        url: `${API_URL}/accounts/user/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        },
      })
        .then(res => {
          this.user = res.data
          this.getRecommendMovies()
        })
    },
    getMovies() {
      // if (this.isLogin) {
        this.$store.dispatch('getMovies')
      // } else {
        //   alert('로그인이 필요한 서비스 입니다.')
      //   this.$router.push({ name: 'LogInView'})
    },
    getTop5Movies() {
      // if (this.isLogin) {
        this.$store.dispatch('getTop5Movies')
      // } else {
        //   alert('로그인이 필요한 서비스 입니다.')
      //   this.$router.push({ name: 'LogInView'})
    },
    getRecommendMovies() {
      axios({
        method: 'post',
        url: `${API_URL}/movies/${this.user.pk}/like/users/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        },
      })
        .then(res => {
          console.log(res)

          axios({
            method: 'post',
            url: `${API_URL}/movies/info/`,
            data: {
              users: res.data,
            },
            headers: {
              Authorization: `Token ${this.$store.state.token}`
            },
          })
          .then(res => {
            this.my_like_users_movies = res.data
            console.log(res.data)
            axios({
              method: 'post',
              url: `${API_URL}/movies/recommend/`,
              data: {
                like_movies: this.my_like_users_movies
              },
              headers: {
                Authorization: `Token ${this.$store.state.token}`
              },
            })
              .then(res => {
                console.log(res)
                this.favorite_movies = res.data[0]
                this.shortest_movies = res.data[1]
                this.users_movies = res.data[2]
                this.my_users_like_movies = res.data[3]
              })
              .catch(err => console.log(err))
          })
          .catch(err => console.log(err))
        })
        .catch(err => console.log(err))

    },
  },

    
  }
    
// }

</script>

<style>

</style>