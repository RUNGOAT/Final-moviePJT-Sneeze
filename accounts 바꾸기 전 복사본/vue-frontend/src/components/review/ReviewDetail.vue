<template>
  <div>
    {{ review }}
    <div v-if="this.me.username === review.userName">
      <button @click="updateReview">UPDATE</button>
      <button @click="deleteReview">DELETE</button>
    </div>
    <hr>
    <div v-if="review">
      <ReviewCommentForm
        @reviewCommentAdd="reviewCommentAdd"
        :review="review"
      />
      <br>
      <div v-if="comments">
        <ReviewCommentItem
          @delComment="delComment"
          @updateComment="updateComment"
          v-for="comment in comments"
          :key="comment.created_at"
          :comment="comment"
          :review="review"
        />
      </div>
      <router-link :to="{name: 'MovieDetail', params: { movie_id: movieId } }">[BACK]</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ReviewCommentItem from '@/components/review/ReviewCommentItem'
import ReviewCommentForm from '@/components/review/ReviewCommentForm'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'ReviewDetail',
  data() {
    return {
      review: null,
      reviewId: this.$route.params.review_pk,
      comments: null,
      movieId: this.$route.params.movie_id,
      moviePk: this.$route.params.movie_pk,
      me: [],
    }
  },
  components: {
    ReviewCommentItem,
    ReviewCommentForm,
  },
  created() {
    this.getMe()
    this.getReview()
    this.getReviewComments()
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
        })
    },
    getReview() {
      axios({
        method: 'get',
        url: `${API_URL}/movies/review_detail/${this.reviewId}/`
      })
        .then(res => {
          this.review = res.data
        })
    },
    getReviewComments() {
      axios({
        method: 'get',
        url: `${API_URL}/movies/review_comments/${this.reviewId}/`
      })
        .then(res => {
          this.comments = res.data
        })
    },
    reviewCommentAdd() {
      this.getReviewComments()
    },
    delComment() {
      this.getReviewComments()
    },
    updateComment() {
      this.getReviewComments()
    },
    deleteReview() {
      axios({
        method: 'delete',
        url: `${API_URL}/movies/review/${this.reviewId}/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        }
      })
        .then(() => {
          this.$router.push({ name: 'MovieDetail', params: { movie_id: this.movieId }})
        })
    },
    updateReview() {
      this.$router.push({ name: 'ReviewUpdate', params: {
        movie_id: this.movieId,
        movie_pk: this.moviePk,
        review_pk: this.reviewId
      }})
    }
  }
}
</script>

<style>

</style>