<template>
  <div class="container">
    <div v-if="update">
      <div class="row justify-content-between">
        <p 
          class="m-0 fw-bold fs-3 col-3 user"
          @click="goProfile"
        >{{ comment.userName }}</p>
        <div class="col-3 d-flex justify-content-end" v-if="this.me.username === comment.userName">
          <span class="mx-2" @click="updateForm" style="cursor: pointer">수정</span>
          <span class="mx-2" @click="deleteComment" style="cursor: pointer">삭제</span>
        </div>
      </div>
      <p id="commentContent">{{ comment.content }}</p>
    </div>

    <div v-else>
      <p id="commentUsername">{{ comment.userName }}</p>
      <form @submit.prevent="updateComment">
        <!-- <label for="content">댓글: </label> -->
        <input type="text" id="content" v-model.trim="updateContent">
        <button>작성</button>
        <button @click="cancelUpdate">취소</button>
      </form>
    </div>
    <hr>
  </div>
</template>

<script>
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'ReviewCommentItem',
  props: {
    comment: Object,
    review: Object,
  },
  data() {
    return {
      update: true,
      updateContent: null,
      me: [],
    }
  },
  created() {
    this.getMe()
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
    deleteComment() {
      axios({
        method: 'delete',
        url: `${API_URL}/movies/review_comment/${this.review.id}/${this.comment.id}/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        }
      })
        .then(() => {
          this.$emit('delComment')
        })
    },
    updateForm() {
      this.update = !this.update
    },
    cancelUpdate() {
      this.updateContent = ''
      this.update = !this.update
    },
    updateComment() {
      const updateContent = this.updateContent
      if (!updateContent) {
        alert('내용을 입력해주세요!')
        return
      }
      axios({
        method: 'put',
        url: `${API_URL}/movies/review_comment/${this.review.id}/${this.comment.id}/`,
        data: {
          content: updateContent,
        },
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        },
      })
        .then(() => {
          this.update = !this.update
          this.updateContent = ''
          this.$emit('updateComment')
        })
    },
    goProfile() {
      this.$router.push({ name: 'Profile', params: { user_pk: this.review.user }})
    },
  },
}
</script>

<style>

</style>