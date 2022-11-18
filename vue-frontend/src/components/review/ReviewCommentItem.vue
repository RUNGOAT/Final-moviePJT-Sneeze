<template>
  <div>
    <div v-if="update">
      {{ comment.userName }}: 
      {{ comment.content }}
      <button @click="updateForm">UPDATE</button>
      <button @click="deleteComment">DELETE</button>
    </div>
    <div v-else>
      <form @submit.prevent="updateComment">
        <label for="content">댓글: </label>
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
    }
  },
  methods: {
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
    }
  },
}
</script>

<style>

</style>