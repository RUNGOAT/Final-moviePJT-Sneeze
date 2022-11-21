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
                      <div v-for="(follow, idx) in user.followings" :key="idx" style="cursor:pointer" class="content-font form-group floating-label-form-group controls mb-0 pb-2">
                          <MyFollower :follow="follow" />
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
                      <div v-for="(follower, idx) in user.followers" :key="idx" style="cursor:pointer" class="content-font form-group floating-label-form-group controls mb-0 pb-2">
                          <!-- <MyFollower :follow="follower" /> -->
                      </div>
                  </div>
                </div>
            </div>
        </div>
      </section>
      <div class="text-white st-font form-group"><button @click="close" class="btn btn-secondary btn-xl" id="sendMessageButton" type="submit">창 닫기</button></div>
    </b-modal>
    <!-- 절취선 -->
      <h3 class="my-2 title-font">내가 좋아요 한 영화</h3>
      <ul v-if="myMovies">
        <!-- <MovieCard 
          :movies="myMovies"
        /> -->
      </ul>
  </div>
</template>

<script>
import axios from 'axios'
// import VueJwtDecode from "vue-jwt-decode"

// import MovieCard from "@/components/MovieCard"
// import MyFollower from "@/components/MyFollower"

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
    }
  },
  created() {
    this.getMe()
  },
  components: {
    // MovieCard,
    // MyFollower,
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