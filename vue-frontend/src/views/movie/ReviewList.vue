<template>
  <div>
    <H2>Movie Review</H2>
    <button @click="reviewForm">리뷰 작성</button>
    <ReviewCommentForm/>
    <ReviewItem
      v-for="review in this.reviews"
      :key="review.created_at"
      :review="review"
      :movie="movie"
    />
  </div>
</template>

<script>
import ReviewCommentForm from '@/components/review/ReviewCommentForm'
import ReviewItem from '@/components/review/ReviewItem.vue'
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'MovieReviewView',
  data() {
    return {
      reviews: null,
    }
  },
  props: {
    movieId: String,
    movie: Object,
  },
  components: {
    ReviewCommentForm,
    ReviewItem,
  },
  created() {
    this.getReviews()
  },
  methods: {
    reviewForm() {
      this.$router.push({ name: 'ReviewForm', params: {
        movie_id: this.movieId,
        movie_pk: this.movie.id
       }})
    },
    getReviews() {
      axios({
        method: 'get',
        url: `${API_URL}/movies/${this.movie.id}/review_list_create/`,
      })
      .then(res => {
        // console.log(res)
        this.reviews = res.data
      })
    },

  }
}
</script>

<style>

</style>