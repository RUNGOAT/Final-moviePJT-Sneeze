<template>
  <div>
    <form @submit.prevent="createReview">
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
  name: 'ReviewForm',
  data() {
    return {
      title: null,
      content: null,
      rank: null,
      movieId: this.$route.params.movie_id,
      moviePk: this.$route.params.movie_pk,
    }
  },
  methods: {
    createReview() {

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
        method: 'post',
        url: `${API_URL}/movies/${this.movieId}/review_list_create/`,
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
          this.$router.push({ name: 'MovieDetail', params: { movie_id: this.movieId }})
        })
    }
  }
}
</script>

<style>

</style>