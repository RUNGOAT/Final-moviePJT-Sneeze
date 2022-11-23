<template>
  <div>
<<<<<<< HEAD
    <!-- <CarouselItem
      v-for="movie in backgroundMovies"
      :key="movie.id"
      :movie="movie"
    > -->

    
      <CarouselList/>
      <br>
      <h3 class="content-font" v-if="my_users_like_movies.length > 0">{{user.username}} 님의 취향저격 베스트 콘텐츠</h3>
      <h2 v-else >리뷰와 좋아요를 눌러주시면 취향저격 콘텐츠를 추천해드립니다!</h2>
      <HomeRecoCard :movies="my_users_like_movies"/>
      <br>
      <br>
      <h3 class="content-font">현재 인기 영화</h3>
      <HomeRecoCard :movies="popularity_movies"/>
      <br>
      <br>
      <h3 class="content-font" v-if="favorite_movies.length === 30">높은 평점을 받은 영화</h3>
      <HomeRecoCard :movies="favorite_movies"/>
      <br>
      <br>
      <h3 class="content-font" v-if="shortest_movies.length === 30">짧은 러닝타임, 가볍게 볼 수 있는 영화</h3>
      <HomeRecoCard :movies="shortest_movies"/>
      <br>
      <br>
      <h3 class="content-font" v-if="users_movies.length === 20">SSAFLIX 유저들이 많이 리뷰한 영화</h3>
      <HomeRecoCard v-if="users_movies.length === 20" :movies="users_movies"/>
=======
    <!-- <h1>HOME</h1> -->
    <CarouselList/>
    <br>
    <h3 class="content-font" v-if="my_users_like_movies.length > 0">{{user.username}} 님의 취향저격 베스트 콘텐츠</h3>
    <h2 v-else >리뷰와 좋아요를 눌러주시면 취향저격 콘텐츠를 추천해드립니다!</h2>
    <HomeRecoCard :movies="my_users_like_movies"/>
    <br>
    <br>
    <h3 class="content-font">현재 인기 영화</h3>
    <HomeRecoCard :movies="popularity_movies"/>
    <br>
    <br>
    <h3 class="content-font" v-if="favorite_movies.length === 30">높은 평점을 받은 영화</h3>
    <HomeRecoCard :movies="favorite_movies"/>
    <br>
    <br>
    <h3 class="content-font" v-if="shortest_movies.length === 30">짧은 러닝타임, 가볍게 볼 수 있는 영화</h3>
    <HomeRecoCard :movies="shortest_movies"/>
    <br>
    <br>
    <h3 class="content-font" v-if="users_movies.length === 30">SSAFLIX 유저들이 많이 리뷰한 영화</h3>
    <HomeRecoCard v-if="users_movies.length === 30" :movies="users_movies"/>
>>>>>>> 1123lunch
  </div>
</template>

<script>
import CarouselList from '@/components/CarouselList'
// import CarouselItem from '@/components/CarouselItem'

import HomeRecoCard from '@/components/HomeRecoCard.vue'
import axios from 'axios'
// import _ from 'lodash'

const API_URL = 'http://127.0.0.1:8000'
export default {
  name: 'HomeView',
  data() {
    return {
      movies: this.$store.state.recommendations,
      movie: '',
      favorite_movies: [],
      shortest_movies: [],
      users_movies: [],
      my_like_users_movies: [],
      user: '',
      my_users_like_movies: [],
      popularity_movies: [],
    }
  },
  components: {
    CarouselList,
    // CarouselItem,
    HomeRecoCard,
  },
  created() {
    this.getPopularityMovies()
    this.getMovies()
    this.getTop5Movies()
    this.getMe()
  },
  computed: {
    backgroundMovies() {
      return this.$store.state.top5Movies
    }
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
    getRecommended() {
      this.$store.dispatch('getRecommended')
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
    getPopularityMovies() {
      axios({
        method: 'get',
        url: `${API_URL}/movies/current_popularity/`,
      })
        .then(res => {
          this.popularity_movies = res.data
        })
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
          // console.log(res)

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
                // console.log(res)
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
/* .home {
  background-image: url(backgroundMovie);
} */
</style>