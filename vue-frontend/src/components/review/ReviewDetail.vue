<template>
  <div>
    {{ review }}
    <hr>
    <ReviewCommentList
      :review="review"
    />
  </div>
</template>

<script>
import axios from 'axios'
import ReviewCommentList from '@/components/review/ReviewCommentList'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'ReviewDetail',
  data() {
    return {
      review: null,
      reviewId: this.$route.params.review_pk
    }
  },
  components: {
    ReviewCommentList,
  },
  created() {
    this.getReview()
  },
  methods: {
    getReview() {
      axios({
        method: 'get',
        url: `${API_URL}/movies/review_detail/${this.reviewId}/`
      })
        .then(res => {
          this.review = res.data
        })
    }
  }
}
</script>

<style>

</style>