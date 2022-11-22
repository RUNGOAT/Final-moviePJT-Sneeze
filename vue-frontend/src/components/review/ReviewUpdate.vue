<template>
  <div class="container" id="communityUpdate">
    <div class="row">
      <router-link class="col-1" :to="{ name : 'ReviewDetail', params: { movie_id: movieId, review_pk: reviewId} }">
        <img src="@/assets/back.png" style="width:25px;" alt="back">
      </router-link>
      <span class="col-10" style="text-align: center;">리뷰 수정</span>
    </div>
    <br>
    <form @submit.prevent="updateReview">
      <div class="mb-3 py-3">
        <!-- <label for="title" class="form-label">제목</label> -->
        <input type="text" class="form-control" id="title1" aria-describedby="titleHelp" v-model.trim="title" placeholder="제목">
        <div id="titleHelp" class="form-text">100자 이하</div>
      </div>
      <div class="mb-3 py-3">
        <!-- <label for="content" class="form-label">내용</label> -->
        <textarea type="text" class="form-control" id="content" v-model.trim="content" placeholder="내용" style="height: 200px;"></textarea>
      </div>
      <div class="mb-3 py-3" style="width:100px;">
        <!-- <label for="content" class="form-label">내용</label> -->
        <input type="number" class="form-control" id="content" min="0" max="10" v-model.trim="rank" placeholder="평점" >
      </div>
      
      <button type="submit" class="btn btn-primary">수정</button>
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