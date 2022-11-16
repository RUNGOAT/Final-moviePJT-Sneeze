<template>
  <div 
    :style="{ 'background-image':`url(${this.imageUrl + movie?.backdrop_path})`}" 
    style="background-size: cover"
  >
    <h2>Movie Detail</h2>
    <ReviewList />

    {{ movie?.title }}
    {{ movie?.overview }}
    <div class="movie-detail-upper">
            <div class="movie-detail-info-header">
              <div class="movie-detail-info-header-left">
                <div class="movie-detail-title">
                  {{ movie.title }}
                </div>
                <div
                v-if="movie.release_date"
                class="movie-release-date">
                  개봉  :  {{ movie.release_date }}
                </div>
                <div
                v-if="movie.genre_ids">
                  <!-- {{ movie.genre_ids }} -->
                </div>
              </div>
              <div class="movie-detail-info-header-right">
                <div class="movie-vote">
                  {{ movie.vote_average }}
                </div>
                <img id="movie-star" src="@/assets/star.png">
              </div>
            </div>
            <!-- info overview -->
            <div class="movie-detail-overview-header">
              줄거리
            </div>
            <hr>
            <div
              v-if="movie.overview"
              class="movie-detail-overview-body">
              {{ movie.overview }}
            </div>
            <div v-else
              class="movie-detail-overview-body">
              해당 영화는 줄거리가 제공되지 않습니다.
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
      movieId: this.$route.params.movie_id,
      movie: null,
    }
  },
  computed: {
    recoMovies() {
      return this.$store.state.cosMovies
    },
    // movie() {
    //   return this.movies.find(movie => movie.movie_id === this.movieId)
    // }
  },
  methods: {
    getCosMovie() {
      this.$store.dispatch('getCosMovie', this.movieId)  // 디테일 페이지의 영화 id
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
          console.log(this.movie)
        })
    }
  },
  created() {
    this.getCosMovie()
    this.getMovie()
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
.movie-detail-poster > img {
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