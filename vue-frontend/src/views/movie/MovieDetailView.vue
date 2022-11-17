<template>
  <div v-if="movie">
    <div :style="{ 'background-image': `url(${this.imageUrl + movie.backdrop_path})` }" style="background-size: cover">
      <h2>Movie Detail</h2>

      <div class="movie-detail-upper">
        <div class="movie-detail-info-header">
          <div class="movie-detail-info-header-left">
            <div class="movie-detail-title">
              {{ movie?.title }}
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
      </div>
      <button @click="searchYoutube">Youtube Video</button>
      <br><br><br>
      <div v-if="movie">
        <ReviewList 
          :movieId="movieId"
          :movie="movie"
        />
      </div>
      
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
      // movies: this.$store.state.movies,
      movieId: this.$route.params.movie_id.toString(),
      movie: null,
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
          // console.log(this.movie)
        })
    },
    searchYoutube() {
      console.log(this.movie.title)
      this.$store.dispatch('searchYoutube', this.movieId)
    }
  },
  created() {
    this.getCosMovie()
    this.getMovie()
    this.getSimilarMovie()
  },
}
</script>

<style>
.movie-detail-info-header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  height: 80px;
}

.movie-detail-poster>img {
  width: 500px;
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
  font-size: 32px;
}

.movie-detail-overview-body {
  font-size: 20px;
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