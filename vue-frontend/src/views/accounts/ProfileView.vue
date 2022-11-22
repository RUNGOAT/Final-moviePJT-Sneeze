<template>
  <div class="container">
    <!-- {{ user }}
    {{ usersMovies }}
    <button @click="follow">팔로우</button> -->
    <div class="container" style="margin-bottom:30px">
      <div class="row">
          <div class="well profile">
                <div class="col-sm-12">
                    <div class="col-xs-12 col-sm-8 center" style="margin-bottom:20px">
                        <h2 class="title-font" style="margin-bottom: 30px">{{ user.username }}님의 Profile</h2>
                        <p class="content-font" style="font-size: 20px"><strong>Email: </strong> {{ user.email }} </p>
                        <p class="content-font" style="font-size: 20px"><strong>Info: </strong>
                            <span class="tags" style="margin-right:5px">{{user.age}}</span> 
                            <span class="tags" style="margin-right:5px">{{user.sex}}</span>
                        </p>
                        <p v-if="isFollowing" class="st-font">{{ user.username }}님을 팔로우 중 입니다.</p>
                        <p v-else><br></p>
                    </div>
                    <br>             
                    <div class="col-xs-12 col-sm-4 text-center">
                        <figure>
                            <img src="@/assets/logo.png" alt="" class="img-circle img-responsive">
                        </figure>
                    </div>
                </div>            
                <div class="col-xs-12 divider text-center">
                    <div class="col-xs-12 col-sm-4 emphasis">
                        <h2><strong>{{followersLength}}</strong></h2>                    
                        <p><small>Follower</small></p>
                    </div>
                    <div class="col-xs-12 col-sm-4 emphasis">
                        <h2><strong>{{followingsLength}}</strong></h2>                    
                        <p><small>Following</small></p>
                    </div>
                    <div class="col-xs-12 col-sm-4 emphasis">
                        <h2><strong v-if="user.followings">{{user.like_movies.length}}</strong></h2>                    
                        <p><small>'좋아요'한 영화 수</small></p>
                    </div>
                </div>
                <div v-if="me.username === user.username">
                  <br>
                </div>
                <div v-else>
                  <button v-if="isFollowing" @click="follow" class="btn btn-secondary btn-block"><span class="fa fa-plus-circle"></span> UnFollow </button>
                  <button v-else @click="follow" class="btn btn-primary btn-block"><span class="fa fa-plus-circle"></span> Follow </button>
                </div>
          </div>                 
      </div>
    </div>
    <h2 class="title-font">{{ user.username }}님이 좋아요 한 영화</h2>    
    <ul v-if="usersMovies" class="row">
      <MovieCardView
        v-for="movie in usersMovies"
        :key="movie.created_at"
        :movie="movie"
      />
    </ul>
    <br>
    <h2 class="title-font">{{ user.username }}님이 리뷰한 영화</h2>    
    <ul v-if="usersMovies" class="row">
      <MovieCardView
        v-for="movie in reviewMovies"
        :key="movie.created_at"
        :movie="movie"
      />
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
// import HomeRecoCard from '@/components/HomeRecoCard.vue'
import MovieCardView from '../movie/MovieCardView.vue'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: "ProfileView",

  components: {
    // HomeRecoCard,
    MovieCardView,
  },
  data() {
    return {
      me: [],
      user: [],
      usersMovies: [],
      reviewMovies: [],
      user_pk: this.$route.params.user_pk,
      movies: this.$store.state.movies,
      isFollowing: false,
    }
  },
  created() {
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
          this.me = res.data
          this.getMyName()
          this.isFollow()
        })
    },
    getMyName() {
      axios({
        method: 'post',
        url: `${API_URL}/userinfo/user/${this.user_pk}/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        },
      })
        .then(res => {
          this.user = res.data
          this.getUserMovies(res.data.like_movies, res.data.reviews)
        })
    },
    getUserMovies(like_movies, reviews) {
      axios({
        method: 'post',
        url: `${API_URL}/movies/${this.user_pk}/like/review/`,
        data: {
          like_movies,
          reviews,
        },
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        },
      })
        .then(res => {
          this.usersMovies = res.data[0]
          this.reviewMovies = res.data[1]
        })
    },
    follow() {
      axios({
        method: 'post',
        url: `${API_URL}/userinfo/follow/${this.me.pk}/${this.user_pk}/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        },
      })
        .then((res) => {
          this.isFollowing = res.data
          this.getMyName()
        })
    },
    isFollow() {
      axios({
        method: 'post',
        url: `${API_URL}/userinfo/is_follow/${this.me.pk}/${this.user_pk}/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        },
      })
        .then((res) => {
          this.isFollowing = res.data
        })
    }
    
  },
  computed: {
    // isFollowing: function () {
    //   return this.following
    // },
    followingsLength: function () {
      if (this.user.followings) {
        return this.user.followings.length
      } else {
        return 0
      }
    },
    followersLength: function () {
      if (this.user.followers) {
        return this.user.followers.length
      } else {
        return 0
      }
    },
  },

}
</script>

<style>
@import url(http://fonts.googleapis.com/css?family=Lato:400,700);
.center {
    position: relative;
    top: 50px;
}

.profile 
{
min-height: 355px;
display: inline-block;
}
.divider 
{
border-top:1px solid rgba(0,0,0,0.1);
}
.emphasis 
{
border-top: 4px solid transparent;
}
.emphasis:hover 
{
border-top: 4px solid #1abc9c;
}
.emphasis h2
{
margin-bottom:0;
}
span.tags 
{
background: #404242;
border-radius: 2px;
color: #f5f5f5;
font-weight: bold;
padding: 4px 6px;
}

</style>