<template>
  <div>
    <form @submit.prevent="createComment">
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
  name: 'CommunityCommentForm',
  data() {
    return {
      content: null,
    }
  },
  methods: {
    createComment() {
      axios({
        method: 'get',
        url: `${API_URL}/community/comments/${this.communityId}`
      })
    }
  }
}
</script>

<style>

</style>