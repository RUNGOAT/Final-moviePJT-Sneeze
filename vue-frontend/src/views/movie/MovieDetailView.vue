<template>
  <div class="movie-detail-card">
    <!-- <div class="movie-detail-toolbar">
      <v-btn
        icon
        dark
        @click="dialog = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <img id="logo-image" src="@/assets/images/logo.png"/>
    </div> -->
    <div class="movie-detail-body">
      <div class="movie-detail-poster">
        <img :src="this.imageUrl + movie?.poster_path" alt="포스터 없음">
      </div>
      <div class="movie-detail-info">
        <!-- info header -->
        <div class="movie-detail-upper">
          <div class="movie-detail-info-header">
            <div class="movie-detail-info-header-left">
              <div class="movie-detail-title d-flex align-items-center">
                <p>{{ movie?.title }}</p>
                <div class="d-flex align-items-baseline ms-2 heart-box p-2" @click="like">
                  <i v-if="isLiked" class="bi bi-heart-fill heart"></i>
                  <i v-else class="bi bi-heart heart"></i>
                  <p class="ps-2">{{ this.likeNumber }}개</p>
                </div>
              </div>
              <div v-if="movie?.release_date" class="movie-release-date">
                개봉 : {{ movie.release_date }}
              </div>
              <div v-if="movie?.genre_ids">
                <!-- {{ movie.genre_ids }} -->
              </div>
            </div>

            <div class="movie-detail-info-header-right">
              <div class="movie-vote">
                {{ movie?.vote_average }}
              </div>
              <img id="movie-star" src="@/assets/star.png">
            </div>
          </div>
          
          <!-- info overview -->
          <div class="movie-detail-overview-header">
            줄거리
          </div>
          <hr>
          <div v-if="movie?.overview" class="movie-detail-overview-body">
            {{ movie?.overview }}
          </div>
          <div v-else class="movie-detail-overview-body">
            해당 영화는 줄거리가 제공되지 않습니다.
          </div>
          <button @click="searchYoutube">Youtube Video</button>
        </div>
        <div class="movie-detail-lower">
          <!-- youtube -->
          <!-- <div class="movie-youtube-area">
            관련 영상
            <hr>
            <YoutubeList :title="movie.title"/>
          </div> -->
        </div>
      </div>
    </div>
    <br>
      <div v-if="movie"
      style="background-color: rgb(255, 255, 255, 0.4);"
      class="rounded"
      >
        <ReviewList 
          :movieId="movieId"
          :movie="movie"
          class="m-3"
        />
      </div>
  </div>

</template>

<script>
import ReviewList from '@/views/movie/ReviewList'
import axios from 'axios'


const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'MovieDetailView',
  components: {
    ReviewList,
  },
  data() {
    return {
      imageUrl: 'https://image.tmdb.org/t/p/original',
      movieId: this.$route.params.movie_id.toString(),
      movie: null,
      isLiked: false,
      me: null,
      likeNumber: '',
    }
  },
  computed: {
    recoMovies() {
      return this.$store.state.cosMovies
    },
    youtubeVideos() {
      return this.$store.state.youtubeVideos
    }    
  },
  created() {
    this.getCosMovie()
    this.getMovie()
    this.getSimilarMovie()
    this.getMe()
    // this.islike()
  },
  methods: {
    getCosMovie() {
      this.$store.dispatch('getCosMovie', this.movieId)  // 디테일 페이지의 영화 id
    },
    getSimilarMovie() {
      this.$store.dispatch('getSimilarMovie', this.movieId)
    },
    getMovie() {
      axios({
        method: 'get',
        url: `${API_URL}/movies/${this.movieId}/`,
        data: {
          movie_id: this.movieId
        }
      })
        .then(res => {
          // console.log(res.data)
          this.movie = res.data
          this.likeNumber = this.movie.like_users.length
        })
    },
    searchYoutube() {
      this.$store.dispatch('searchYoutube', this.movieId)
    },
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
          this.islike()
        })
    },
    like() {
      axios({
        method: 'post',
        url: `${API_URL}/movies/${this.me.pk}/${this.movieId}/like/`,
        data: {
          myId: this.me.id,
          movieId: this.movie.id,
        },
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        },
      })
        .then(res => {
          // console.log(res)
          this.isLiked = res.data
          if (this.isLiked === false) {
            this.likeNumber -= 1
          } else {
            this.likeNumber += 1
          }
        })
    },
    islike() {
      axios({
        method: 'post',
        url: `${API_URL}/movies/${this.me.pk}/${this.movieId}/is_liked/`,
        data: {
          myId: this.me.id,
          movieId: this.movieId,
        },
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        },
      })
        .then(res => {
          // console.log(res)
          this.isLiked = res.data
        })
    }
  },

}
</script>

<style>

.movie-detail-card {
  font-family: 'Noto Sans KR', sans-serif;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  padding: 2rem;
  min-height: 100%;
  height: auto;
  background-color: #000000;
  color: white;
}

.movie-detail-toolbar {
  height: 56px;
}

.movie-detail-body {
  display: flex;
  flex-flow: row wrap;
  margin: 1rem;
}

.movie-detail-info {
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  margin: 1rem 0 0 4rem;
  width: 60%;
}

.movie-detail-info-header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  height: 80px;
}

.movie-detail-poster>img {
  width: 400px;
}

.movie-detail-title {
  font-size: 40px;
}

.movie-detail-info-header-right {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}

.movie-vote {
  font-size: 30px;
}

#movie-star {
  height: 50%;
  margin-left: 1rem;
}

.movie-detail-overview-header {
  margin-top: 5rem;
  padding-top: 5rem;
  font-size: 32px;
}

.movie-detail-overview-body {
  font-size: 20px;
}
.heart {
  color: crimson;
  margin: 0px auto;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
}

.heart-box {
  cursor: pointer;
}

</style>







<!-- 동작 x 보류 -->
      <!-- <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
          <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button"
            role="tab" aria-controls="nav-home" aria-selected="true">Home</button>
          <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button"
            role="tab" aria-controls="nav-profile" aria-selected="false">Profile</button>
          <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button"
            role="tab" aria-controls="nav-contact" aria-selected="false">Contact</button>
          <button class="nav-link" id="nav-disabled-tab" data-bs-toggle="tab" data-bs-target="#nav-disabled" type="button"
            role="tab" aria-controls="nav-disabled" aria-selected="false" disabled>Disabled</button>
        </div>
      </nav>
      <div class="tab-content" id="nav-tabContent">
        <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
          ...</div>
        <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">...
        </div>
        <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" tabindex="0">...
        </div>
        <div class="tab-pane fade" id="nav-disabled" role="tabpanel" aria-labelledby="nav-disabled-tab" tabindex="0">...
        </div>
      </div> -->