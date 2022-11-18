<template>
  <div>
    <form @submit.prevent="updateReview">
      <label for="title">title: </label>
      <input type="text" id="title" v-model.trim="title">
      <label for="content">content: </label>
      <textarea v-model.trim="content" id="content" cols="30" rows="10"></textarea>
      <label for="rank">평점: </label>
      <input type="number" id="rank" v-model.trim="rank">
      <button>제출</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'ReviewUpdate',
  data() {
    return {
      title: null,
      content: null,
      rank: null,
      reviewId: this.$route.params.review_pk,
      movieId: this.$route.params.movie_id,
      moviePk: this.$route.params.movie_pk,
    }
  },
  methods: {
    updateReview() {
      
      const title = this.title
      const content = this.content
      const rank = this.rank
      if (!title) {
        alert('제목을 입력해주세요!')
        return
      } else if (!content) {
        alert('내용을 입력해주세요!')
        return
      } else if (!rank) {
        alert('평점을 입력해주세요!')
        return
      }
      axios({
        method: 'put',
        url: `${API_URL}/movies/review/${this.reviewId}/`,
        data: {
          title,
          content,
          rank,
          movie: this.moviePk,
        },
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        }
      })
        .then(() => {
          this.$router.push({ name: 'ReviewDetail', params: {
            movie_id: this.movieId,
            review_pk: this.reviewId,
          }})
        })
        .catch(err => console.log(err))
    },
  }
}
</script>

<style>

</style>