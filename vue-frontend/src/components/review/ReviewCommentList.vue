<template>
  <div>
    <div v-if="comments">
      <ReviewCommentItem
        v-for="comment in comments"
        :key="comment.created_at"
        :comment="comment"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ReviewCommentItem from '@/components/review/ReviewCommentItem'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'ReviewCommentList',
  props: {
    review: Object,
  },
  data() {
    return {
      comments: null,
    }
  },
  components: {
    ReviewCommentItem,
  },
  methods: {
    getReviewComments() {
      axios({
        method: 'get',
        url: `${API_URL}/movies/review_comments/${this.review.id}/`
      })
        .then(res => {
          this.comments = res.data
        })
    }
  },
}
</script>

<style>

</style>