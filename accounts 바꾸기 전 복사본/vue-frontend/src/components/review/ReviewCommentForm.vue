<template>
  <div>
    <form @submit.prevent="createReviewComment">
      <label for="content">댓글: </label>
      <input type="text" id="content" v-model.trim="content">
      <button>작성</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'ReviewCommentForm',
  props: {
    review: Object,
  },
  data() {
    return {
      content: null,
    }
  },
  methods: {
    createReviewComment() {
      const content = this.content
      if (!content) {
        alert('내용을 입력해주세요!')
        return
      }
      axios({
        method: 'post',
        url: `${API_URL}/movies/${this.review.id}/review_comment/`,
        data: {
          content,
        },
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        }
      })
        .then(() => {
          this.$emit('reviewCommentAdd')
          this.content = ''
        })
        .catch(err => console.log(err))
    },
  }
}
</script>

<style>

</style>