<template>
  <div class="container">
    <h1 class="title-font" style="margin-bottom:40px">My Profile</h1>
    <div class="containter" style="margin-bottom:30px">
      <div class="row">
          <div class="well profile containerSpecial" style="position:relative;">
                <div class="col-sm-12">
                    <div class="col-xs-6 col-sm-8 center" style="margin-bottom:20px">
                        <h2 class="title-font" style="margin-bottom: 10px">My Profile</h2>
                        <div><button @click="open2" style="background-color:black; border:0px; color:white;" class="m-1 btn content-font">Following <span>{{ this.followingsLength }}명</span></button> <button @click="open1" style="background-color:black; border:0px; color:white;" class="m-1 btn content-font">Follower <span>{{ this.followesLength }}명</span></button></div>
                        <p class="content-font" style="font-size: 20px"><strong>username: </strong> {{ user.username }} </p>
                    </div>
                    <br>             
                    <!-- <div class="col-xs-12 col-sm-4 text-center">
                        <figure>
                            <img src="@/assets/logo.png" alt="" class="img-circle img-responsive">
                        </figure>
                    </div> -->
                  <!-- 절취선 -->
                  <!-- 절취선 -->
                </div>            
          </div>                 
      </div>
    </div>
    <b-modal
      hide-footer
      v-model="show2"
      id="review-modal"
      size="sm"
      title="My Follwings"
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      :body-bg-variant="bodyBgVariant"
      :body-text-variant="bodyTextVariant"
      :footer-bg-variant="footerBgVariant"
      :footer-text-variant="footerTextVariant"
    >
      <hr>
      <section class="page-section" id="contact">
        <div class="container">
            <!-- Contact Section Heading-->
            <h2 class="st-font page-section-heading text-center text-uppercase text-white mb-0">Followings</h2>
            <!-- Contact Section Form-->
            <div class="row">
                <div class="col-lg-8 mx-auto">
                    <!-- To configure the contact form email address, go to mail/contact_me.php and update the email address in the PHP file on line 19.-->
                  <div class="control-group">
                      <div v-for="(userId, idx) in user.followings" :key="idx" style="cursor:pointer" class="content-font form-group floating-label-form-group controls mb-0 pb-2">
                          <FollowingsView :userId="userId" />
                      </div>
                  </div>
                </div>
            </div>
        </div>
      </section>
      <div class="text-white st-font form-group"><button @click="close2" class="btn btn-secondary btn-xl" id="sendMessageButton" type="submit">창 닫기</button></div>
    </b-modal>
    <!-- 절취선 -->
    <b-modal
      hide-footer
      v-model="show1"
      id="review-modal"
      size="sm"
      title="My Follwers"
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      :body-bg-variant="bodyBgVariant"
      :body-text-variant="bodyTextVariant"
      :footer-bg-variant="footerBgVariant"
      :footer-text-variant="footerTextVariant"
    >
      <hr>
      <section class="page-section" id="contact">
        <div class="container">
            <!-- Contact Section Heading-->
            <h2 class="st-font page-section-heading text-center text-uppercase text-white mb-0">Followers</h2>
            <!-- Contact Section Form-->
            <div class="row">
                <div class="col-lg-8 mx-auto">
                    <!-- To configure the contact form email address, go to mail/contact_me.php and update the email address in the PHP file on line 19.-->
                  <div class="control-group">
                      <div v-for="(userId, idx) in user.followers" :key="idx" style="cursor:pointer" class="content-font form-group floating-label-form-group controls mb-0 pb-2">
                          <FollowersView :userId="userId" />
                      </div>
                  </div>
                </div>
            </div>
        </div>
      </section>
      <div class="text-white st-font form-group"><button @click="close" class="btn btn-secondary btn-xl" id="sendMessageButton" type="submit">창 닫기</button></div>
    </b-modal>
    <!-- 절취선 -->
    
    <!-- 탭 -->
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button"
          role="tab" aria-controls="home-tab-pane" aria-selected="true">좋아요 영화</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button"
          role="tab" aria-controls="profile-tab-pane" aria-selected="false">리뷰 영화</button>
      </li>

    </ul>
    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
        <br>
        <h2 class="title-font">{{ user.username }}님이 좋아요 한 영화</h2>    
        <ul v-if="likeMovies" class="row popular-list">
          <MovieCardView
            v-for="movie in likeMovies"
            :key="movie.created_at"
            :movie="movie"
          />
        </ul>

      </div>
      <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">        
        <br>
        <h2 class="title-font">{{ user.username }}님이 리뷰한 영화</h2>    
        <ul v-if="reviewMovies" class="row popular-list">
          <MovieCardView
            v-for="movie in reviewMovies"
            :key="movie.created_at"
            :movie="movie"
          />
        </ul>

      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
// import VueJwtDecode from "vue-jwt-decode"

import MovieCardView from "@/views/movie/MovieCardView"
// import MyFollower from "@/components/MyFollower"
import FollowersView from '@/components/FollowersView.vue'
import FollowingsView from '@/components/FollowingsView.vue'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: "MyProfile",
  data: function () {
    return {
      me: [],
      user: [],
      users: [],
      myFollowings: [],
      myMovies: [],
      show1: false,
      show2: false,
      variants: ["light", "dark"],
      headerBgVariant: "dark",
      headerTextVariant: "white",
      bodyBgVariant: "dark",
      bodyTextVariant: "white",
      footerBgVariant: "danger",
      footerTextVariant: "dark",
      likeMovies: [],
      reviewMovies: [],
    }
  },
  created() {
    this.getMe()
  },
  components: {
    MovieCardView,
    FollowersView,
    FollowingsView,
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
          this.getMyName(res.data.pk)
        })
    },
    getMyName(my_pk) {
      axios({
        method: 'post',
        url: `${API_URL}/userinfo/user/${my_pk}/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        },
      })
        .then(res => {
          this.user = res.data
          // console.log(res.data)
          this.getUserMovies(res.data.like_movies, res.data.reviews)
        })
    },
    getUserMovies(like_movies, reviews) {
      axios({
        method: 'post',
        url: `${API_URL}/movies/${this.user.id}/like/review/`,
        data: {
          like_movies,
          reviews,
        },
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        },
      })
        .then(res => {
          this.likeMovies = res.data[0]
          this.reviewMovies = res.data[1]
        })
    },
    open1: function () {
      this.show1 = true
    },
    open2: function () {
      this.show2 = true
    },
    close: function () {
      this.show1 = false
    },
    close2: function () {
      this.show2 = false
    },
  },
  computed: {
    followingsLength: function () {
      if (this.user.followings) {
        return this.user.followings.length
      } else {
        return 0
      }
    },
    followesLength: function () {
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
.containerSpecial{
  padding:1px;
  width:100%;
  margin:1px;
  text-align:center
}

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